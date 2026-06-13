---
name: planner-gate-pre-trafego
description: Use to evaluate planner-tdah readiness before paid traffic, ACQ-9, soft launch, or KAN-44. Checks funnel, Kiwify checkout, PostHog/Meta tracking, legal/ethical copy, and human decisions.
---

# Planner Gate Pre-Trafego

Follow `docs/agent-workflows/planner-gate-pre-trafego.md`.

Claude Code notes:

- KAN-44 remains the operational gate.
- Return `GO`, `NO-GO`, or `GO COM RISCO`.
- Do not operate Meta Ads, Kiwify credentials, purchases or refunds autonomously.
