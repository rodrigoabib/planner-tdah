---
name: planner-validation-runner
description: Use quando precisar decidir, executar ou registrar validacoes aplicaveis a um ticket KAN do planner-tdah. Cobre build Vite, scoring, conteudo do quiz, a11y/mobile, copy etica, analytics, checkout, PDF, docs e diff review sem rodar checks irrelevantes.
---

# Planner Validation Runner

Siga `docs/agent-workflows/planner-validation-runner.md`.

## Regras

- Rode apenas validacoes aplicaveis ao escopo.
- Para docs-only, nao rode build do quiz.
- Para mudancas em quiz/scoring, use os scripts de `.agents/skills/tdah-ux-audit/scripts/`.
- Registre validacoes nao aplicaveis com motivo curto.
