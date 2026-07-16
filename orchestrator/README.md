# LOOP.md Orchestrator

A small driver, built on the [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk),
that executes the design process defined in `LOOP.md`.

## How it maps to LOOP.md

| LOOP.md rule | Implementation |
|---|---|
| **1. Steps with deliverables + acceptance criteria** | `loop-state.yml` is the pipeline ledger; each step has a brief in `steps/NN-*/brief.md`. A step only advances after a read-only **verifier session** checks the deliverable against the acceptance criteria, *and* a human approves it. |
| **2. Pause for human input** (blocked / improvement / step validation) | The worker agent gets an `ask_human` tool. Calling it writes a `pending_question` into `loop-state.yml` and halts the loop. Completing a step always raises a `validation` question — only a human moves a step to `done`. |
| **3. Break steps down** | The worker edits its step's `substeps` list in `loop-state.yml`; the orchestrator just re-reads the file, so decomposition needs no special machinery. |
| **4. Persist state, clean up context** | Every step attempt runs in a **fresh agent session**. Nothing survives between sessions except files: `loop-state.yml`, `steps/NN-*/notes.md`, and the deliverables themselves. Context cleanup is structural, not voluntary. |

```
loop-state.yml ──> orchestrator/run.py ──> worker session (fresh context)
      ^                    │                    │ deliverables + notes + commits
      │                    v                    v
      └──── human ──── pending_question <── verifier session (read-only)
```

## Setup

```sh
pip install -r orchestrator/requirements.txt
```

The Agent SDK drives the Claude Code runtime, so you also need either an
`ANTHROPIC_API_KEY` in the environment or an authenticated Claude Code
install (`npm install -g @anthropic-ai/claude-code` + `claude` login).

## Usage

```sh
python -m orchestrator.run              # run the loop from the repo root
python -m orchestrator.run --status     # show pipeline state
python -m orchestrator.run --answer "approve"   # answer a pending question
```

The loop runs until it needs you:

- **blocked** — the worker lacked information; answer the question and rerun.
- **improvement** — the worker spotted an out-of-scope improvement; your answer
  is recorded in the step's notes.
- **validation** — a step passed verification; review the deliverable and reply
  `approve` (marks it done) or describe what to change (sent back as feedback).

Answers are appended to `steps/NN-*/notes.md` so future sessions see them.

## Design notes

- **The repo is the memory.** Restart the orchestrator anytime; it re-derives
  everything from `loop-state.yml`. The git history is the audit trail —
  workers commit their own deliverables (they never push).
- **Worker vs verifier.** The worker has write access (`Read/Write/Edit/Bash`
  + `ask_human`); the verifier is a separate fresh session with read-only
  tools, so "done" claims are checked against the actual files, not the
  worker's self-report.
- **Bounded retries.** A failing verification feeds its verdict back to a new
  worker session, at most `MAX_FIX_ROUNDS` times, then escalates to a human
  as a `blocked` question instead of looping forever.
