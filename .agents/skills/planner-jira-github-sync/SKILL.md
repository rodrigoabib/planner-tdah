---
name: planner-jira-github-sync
description: Use para sincronizar ou auditar estado entre Jira KAN, Git local, branch, commit, pull request e GitHub no planner-tdah. Faz leitura e compara escopo; mutacoes externas como comentario Jira, transicao, push ou PR exigem confirmacao explicita.
---

# Planner Jira GitHub Sync

Siga `docs/agent-workflows/planner-jira-github-sync.md`.

## Regras

- Leia Jira e Git antes de recomendar entrega.
- Compare escopo esperado com diff observado.
- Prepare comentario/transicao/PR como sugestao quando estiver em dry-run.
- Nao mova ticket para `Concluido`.
