"""Orchestrator implementing LOOP.md.

One iteration = one step attempt:

    read loop-state.yml
      -> if a question is pending, collect the human's answer (rule 2)
      -> pick the first not-done step (rule 1)
      -> run a FRESH worker agent session on it (rule 4: repo is the memory)
      -> run a read-only verifier session against the acceptance criteria
      -> on PASS, mark the step awaiting_validation and raise the
         "please validate" question for the human (rule 2.3)

Usage:
    python -m orchestrator.run              # run the loop (interactive pauses)
    python -m orchestrator.run --status     # print pipeline state and exit
    python -m orchestrator.run --answer "approve"   # answer the pending question
"""

from __future__ import annotations

import argparse
import asyncio
import sys

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ResultMessage,
    TextBlock,
    create_sdk_mcp_server,
    query,
    tool,
)

from orchestrator import prompts
from orchestrator import state as st

MAX_FIX_ROUNDS = 2  # verifier-failure retries before escalating to the human
WORKER_TOOLS = ["Read", "Write", "Edit", "Glob", "Grep", "Bash",
                "mcp__loop__ask_human"]
VERIFIER_TOOLS = ["Read", "Glob", "Grep"]


# --- The human gate as a first-class tool (LOOP.md rule 2) -------------------

@tool(
    "ask_human",
    "Pause the design loop and ask the human team a question. Use type "
    "'blocked' when you lack information to proceed, or 'improvement' to flag "
    "an opportunity outside the current step. The loop halts until a human "
    "answers.",
    {"type": str, "question": str},
)
async def ask_human(args):
    current = st.load()
    qtype = args["type"] if args["type"] in ("blocked", "improvement") else "blocked"
    st.set_question(current, qtype, current["current_step"], args["question"])
    return {"content": [{"type": "text", "text": (
        "Question recorded; the loop is paused for a human answer. Persist "
        "your progress to the step notes file now, then end the session."
    )}]}


LOOP_SERVER = create_sdk_mcp_server(name="loop", version="1.0.0", tools=[ask_human])


# --- Agent sessions ----------------------------------------------------------

async def run_session(prompt: str, allowed_tools: list[str],
                      permission_mode: str, max_turns: int) -> str:
    """Run one fresh agent session; return its final text output."""
    options = ClaudeAgentOptions(
        cwd=str(st.REPO_ROOT),
        permission_mode=permission_mode,
        allowed_tools=allowed_tools,
        mcp_servers={"loop": LOOP_SERVER},
        setting_sources=["project"],  # load CLAUDE.md conventions
        max_turns=max_turns,
    )
    final_text = ""
    async for message in query(prompt=prompt, options=options):
        if isinstance(message, AssistantMessage):
            for block in message.content:
                if isinstance(block, TextBlock):
                    final_text = block.text
                    print(f"  | {block.text.strip()}")
        elif isinstance(message, ResultMessage) and message.result:
            final_text = message.result
    return final_text


async def run_worker(step: dict, feedback: str | None) -> None:
    print(f"\n=== Worker session: step {step['id']} — {step['name']} ===")
    await run_session(
        prompts.worker(step, feedback),
        allowed_tools=WORKER_TOOLS,
        permission_mode="acceptEdits",
        max_turns=150,
    )


async def run_verifier(step: dict) -> tuple[bool, str]:
    print(f"\n=== Verifier session: step {step['id']} — {step['name']} ===")
    text = await run_session(
        prompts.verifier(step),
        allowed_tools=VERIFIER_TOOLS,
        permission_mode="default",
        max_turns=50,
    )
    for line in reversed(text.strip().splitlines()):
        if line.startswith("VERDICT:"):
            verdict = line[len("VERDICT:"):].strip()
            return verdict.upper().startswith("PASS"), verdict
    return False, "Verifier produced no VERDICT line; treating as FAIL."


# --- Human interaction -------------------------------------------------------

def collect_answer(question: dict, answer: str | None) -> str:
    print("\n" + "=" * 72)
    print(f"HUMAN INPUT NEEDED ({question['type']}, step {question['step']}):")
    print(question["question"])
    print("=" * 72)
    if answer is not None:
        return answer
    if not sys.stdin.isatty():
        print("Non-interactive run — answer with:\n"
              '  python -m orchestrator.run --answer "<your answer>"')
        sys.exit(0)
    return input("Your answer> ").strip()


def apply_answer(state: dict, answer: str) -> None:
    question = state["pending_question"]
    step = st.get_step(state, question["step"])
    st.append_note(step, f"Human answer ({question['type']})",
                   f"Q: {question['question']}\n\nA: {answer}")
    if question["type"] == "validation":
        if answer.strip().lower() in ("approve", "approved", "yes", "lgtm", "done"):
            step["status"] = "done"
            print(f"Step {step['id']} approved and marked done.")
        else:
            step["status"] = "in_progress"  # answer treated as revision feedback
            print(f"Step {step['id']} sent back for revision.")
    state["pending_question"] = None
    st.save(state)


# --- Main loop ---------------------------------------------------------------

async def main(answer: str | None) -> None:
    while True:
        state = st.load()

        if state.get("pending_question"):
            apply_answer(state, collect_answer(state["pending_question"], answer))
            answer = None  # a CLI-provided answer applies only once
            continue

        step = st.next_step(state)
        if step is None:
            print("All steps complete. The loop is done.")
            return

        # A step stuck in awaiting_validation with no question means the
        # validation ask was lost — re-raise it rather than re-running work.
        if step["status"] == "awaiting_validation":
            st.set_question(state, "validation", step["id"],
                            f"Step {step['id']} ({step['name']}) passed verification. "
                            "Please review the deliverable and reply 'approve', or "
                            "describe what to change.")
            continue

        state["current_step"] = step["id"]
        step["status"] = "in_progress"
        st.save(state)

        feedback = None
        for attempt in range(1 + MAX_FIX_ROUNDS):
            await run_worker(step, feedback)

            state = st.load()
            if state.get("pending_question"):
                break  # worker asked a question — pause for the human

            passed, verdict = await run_verifier(st.get_step(state, step["id"]))
            print(f"\nVerifier: {verdict}")
            if passed:
                current = st.get_step(state, step["id"])
                current["status"] = "awaiting_validation"
                st.set_question(state, "validation", step["id"],
                                f"Step {step['id']} ({step['name']}) passed "
                                "verification. Please review the deliverable and "
                                "reply 'approve', or describe what to change.")
                break
            feedback = verdict
        else:
            # Exhausted fix rounds without passing — escalate (rule 2.1).
            st.set_question(st.load(), "blocked", step["id"],
                            f"Step {step['id']} ({step['name']}) failed verification "
                            f"{1 + MAX_FIX_ROUNDS} times. Last verdict: {feedback} "
                            "How should we proceed?")


def cli() -> None:
    parser = argparse.ArgumentParser(description="LOOP.md orchestrator")
    parser.add_argument("--status", action="store_true",
                        help="print pipeline state and exit")
    parser.add_argument("--answer", metavar="TEXT",
                        help="answer the pending question, then continue")
    args = parser.parse_args()

    if args.status:
        state = st.load()
        question = state.get("pending_question")
        for step in state["steps"]:
            marker = {"done": "x", "in_progress": ">",
                      "awaiting_validation": "?"}.get(step["status"], " ")
            print(f"[{marker}] {step['id']:>2}. {step['name']} ({step['status']})")
        if question:
            print(f"\nPaused on a {question['type']} question for step "
                  f"{question['step']}:\n  {question['question']}")
        return

    asyncio.run(main(args.answer))


if __name__ == "__main__":
    cli()
