---
name: planner-validation-runner
description: Use to decide, run, or document validations for planner-tdah KAN tickets across Vite build, quiz scoring, quiz content extraction, accessibility/mobile, ethics copy, analytics, checkout, PDF, docs and diff review.
---

# Planner Validation Runner

Follow `docs/agent-workflows/planner-validation-runner.md`.

Claude Code notes:

- Run only applicable validations.
- Do not run quiz build for docs-only changes.
- Use `.agents/skills/tdah-ux-audit/scripts/` for quiz-specific scripts.
