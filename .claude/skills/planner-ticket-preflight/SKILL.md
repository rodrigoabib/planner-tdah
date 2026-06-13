---
name: planner-ticket-preflight
description: Use before planning, reviewing, or executing any planner-tdah KAN ticket. Performs read-only preflight across Jira, Git, canonical docs, blockers, context packs, executor type, and applicable validations.
---

# Planner Ticket Preflight

Follow `docs/agent-workflows/planner-ticket-preflight.md`.

Claude Code notes:

- Read `CLAUDE.md` and `foundation/handoff-agentes-ia.md` first.
- Use project context packs from `docs/agent-context/` instead of loading broad docs.
- Do not mutate Jira, GitHub or files in this workflow.
