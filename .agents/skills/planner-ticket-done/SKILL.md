---
name: planner-ticket-done
description: Use antes de fechar, commitar, publicar, comentar Jira ou transicionar qualquer ticket KAN do planner-tdah. Faz checklist final em DRY-RUN por padrao, conferindo diff, escopo, validacoes, evidencias, commit sugerido, comentario Jira sugerido e transicao sugerida.
---

# Planner Ticket Done

Siga `docs/agent-workflows/planner-ticket-done.md`.

## Regras

- Modo padrao: `DRY-RUN`.
- Nunca comente Jira, faca commit, push ou transicao sem pedido explicito.
- Nunca transicione para `Concluido`.
- Antes de sugerir fechamento, confira arquivos proibidos e validacoes aplicaveis.
- Se faltar evidencia, retorne `NOT READY` ou `BLOCKED`.
