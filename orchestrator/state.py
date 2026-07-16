"""Read and mutate loop-state.yml — the single source of truth for the loop.

The repo is the memory (LOOP.md rule 4): every fact the orchestrator or an
agent session needs between runs lives here or in the step notes files, never
in a long-running conversation.
"""

from __future__ import annotations

from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent
STATE_FILE = REPO_ROOT / "loop-state.yml"

ACTIVE_STATUSES = ("pending", "in_progress", "awaiting_validation")


def load() -> dict:
    return yaml.safe_load(STATE_FILE.read_text())


def save(state: dict) -> None:
    STATE_FILE.write_text(
        yaml.safe_dump(state, sort_keys=False, allow_unicode=True, width=88)
    )


def get_step(state: dict, step_id: int) -> dict | None:
    for step in state["steps"]:
        if step["id"] == step_id:
            return step
    return None


def next_step(state: dict) -> dict | None:
    """First step that isn't done. Steps are strictly sequential (LOOP.md rule 1)."""
    for step in state["steps"]:
        if step["status"] in ACTIVE_STATUSES:
            return step
    return None


def notes_file(step: dict) -> Path:
    step_dir = REPO_ROOT / step["dir"]
    step_dir.mkdir(parents=True, exist_ok=True)
    return step_dir / "notes.md"


def append_note(step: dict, heading: str, body: str) -> None:
    path = notes_file(step)
    existing = path.read_text() if path.exists() else f"# Notes — {step['name']}\n"
    path.write_text(f"{existing}\n## {heading}\n\n{body.strip()}\n")


def set_question(state: dict, qtype: str, step_id: int, question: str) -> None:
    state["pending_question"] = {
        "type": qtype,  # blocked | improvement | validation
        "step": step_id,
        "question": question,
    }
    save(state)
