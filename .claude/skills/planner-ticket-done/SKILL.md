---
name: planner-ticket-done
description: Use before closing, committing, pushing, commenting Jira, or transitioning any planner-tdah KAN ticket. Runs the final checklist in dry-run by default and prepares evidence, commit text, Jira comment and transition suggestion.
---

# Planner Ticket Done

Follow `docs/agent-workflows/planner-ticket-done.md`.

Claude Code notes:

- Default mode is `DRY-RUN`.
- Do not transition directly to `Concluido`.
- Do not comment Jira, commit or push unless explicitly requested.
- Treat missing evidence as `NOT READY` or `BLOCKED`.
