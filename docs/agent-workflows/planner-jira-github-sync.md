# Workflow: planner-jira-github-sync

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `foundation/handoff-agentes-ia.md`, GitHub, Jira KAN
> **Sumario:** sincronizacao segura entre ticket KAN, branch, commit, PR e comentario Jira.

---

## 1. Objetivo

Detectar divergencias entre Jira, Git local e GitHub antes de entregar um ticket.

## 2. Passos read-only

1. Ler ticket KAN no Jira.
2. Checar status, labels e criterios de aceite.
3. Checar branch local e `git status --short --branch`.
4. Checar remote `origin`.
5. Buscar PRs/commits relevantes no GitHub quando houver branch ou commit publicado.
6. Comparar escopo Jira com diff local/remoto.
7. Preparar recomendacao de proxima acao.

## 3. Antes de mutacao externa

Antes de comentar Jira, transicionar, criar PR ou fazer push:

- apresentar comentario sugerido;
- apresentar transicao sugerida;
- apresentar evidencias;
- confirmar que os arquivos staged sao do escopo;
- aguardar pedido explicito de execucao quando a conversa atual era apenas plano/revisao.

## 4. Saida obrigatoria

```markdown
# Sync Jira/GitHub

## Jira
- KAN:
- Status:
- Labels:
- Criterios:

## Git local
- Branch:
- Arquivos alterados:
- Arquivos fora do escopo:

## GitHub
- Branch remota:
- PR:
- Commits:

## Divergencias

## Proxima acao recomendada
```

## 5. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Workflow inicial de sincronizacao Jira/GitHub | Codex |
