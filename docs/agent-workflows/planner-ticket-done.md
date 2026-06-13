# Workflow: planner-ticket-done

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `foundation/handoff-agentes-ia.md`, `docs/agent-workflows/planner-validation-runner.md`, `docs/agent-workflows/planner-jira-github-sync.md`
> **Sumario:** fechamento em dry-run por padrao antes de commit, push, comentario Jira ou transicao.

---

## 1. Objetivo

Verificar se um ticket esta pronto para handoff sem executar mutacoes por padrao.

## 2. Modo padrao

`DRY-RUN`. Neste modo o agente apenas apresenta evidencias, riscos e textos sugeridos.

## 3. Passos

1. Reexecutar ou conferir o preflight.
2. Checar `git status --short --branch`.
3. Resumir arquivos alterados e escopo observado.
4. Confirmar se o escopo observado corresponde ao ticket.
5. Rodar ou registrar validacoes aplicaveis via `planner-validation-runner`.
6. Verificar se ha arquivos proibidos no diff ou staged.
7. Preparar mensagem de commit sugerida.
8. Preparar comentario Jira sugerido.
9. Preparar transicao sugerida, normalmente `31 — Em analise`.
10. Emitir veredito `READY`, `NOT READY` ou `BLOCKED`.

## 4. Saida obrigatoria

````markdown
# Ticket Done Dry-run

## Ticket
- KAN:
- Branch:
- Commit sugerido:
- Status Jira atual:

## Mudancas detectadas
- Arquivos alterados:
- Escopo esperado:
- Escopo observado:

## Validacoes
| Validacao | Aplicavel? | Executada? | Resultado | Evidencia |
|---|---|---|---|---|

## Riscos pendentes
- Se nao houver risco pendente, registrar: Nenhum risco pendente identificado.

## Comentario Jira sugerido
```text
Gerar o comentario completo apenas quando todos os campos de evidencia estiverem preenchidos.
```

## Transicao sugerida
- Para:
- Justificativa:
- Requer confirmacao humana: Sim

## Veredito
READY / NOT READY / BLOCKED
````

## 5. Modo execute

O modo execute so pode ocorrer quando o usuario pede explicitamente para commitar, publicar, comentar Jira ou transicionar.

Mesmo em execute:

- nunca transicionar para `Concluido`;
- nunca comentar Jira sem evidencias;
- nunca stagear arquivos fora do escopo;
- nunca incluir `.env*`, `node_modules/`, `quiz/dist/`, `.codex/config.toml` ou `.claude/settings.local.json`.

## 6. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Workflow inicial de ticket done dry-run | Codex |
