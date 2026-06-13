---
name: planner-ticket-preflight
description: Use quando precisar iniciar, planejar, revisar ou executar qualquer ticket KAN do planner-tdah. Faz preflight read-only de Jira, Git, docs canonicos, bloqueadores, context packs, executor recomendado e validacoes aplicaveis antes de qualquer edicao ou mutacao externa.
---

# Planner Ticket Preflight

Siga `docs/agent-workflows/planner-ticket-preflight.md`.

## Regras

- Comece pelo ticket Jira KAN quando houver chave.
- Leia `foundation/handoff-agentes-ia.md` antes de recomendar execucao.
- Selecione context packs em `docs/agent-context/` conforme o dominio.
- Retorne `READY`, `BLOCKED` ou `NEEDS HUMAN DECISION`.
- Nao edite arquivos, nao comente Jira, nao transicione ticket e nao crie branch neste workflow.
