# Workflows operacionais de agentes — Planner TDAH

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `foundation/operacao-agentes-ia.md`, `foundation/handoff-agentes-ia.md`
> **Sumario:** indice dos workflows duraveis usados pelas skills Codex e pelos wrappers Claude Code.

---

## 1. Como usar

Os arquivos desta pasta sao a fonte duravel dos workflows. Skills em `.agents/skills/` e `.claude/skills/` devem apontar para estes documentos em vez de duplicar instrucoes longas.

## 2. Workflows P0

| Workflow | Quando usar |
|---|---|
| `planner-ticket-preflight.md` | Antes de planejar ou executar qualquer ticket KAN |
| `planner-ticket-done.md` | Antes de commit, comentario Jira, push ou transicao |
| `planner-validation-runner.md` | Para decidir e registrar validacoes aplicaveis |
| `planner-context-pack.md` | Para escolher contexto minimo por dominio |
| `planner-ethics-copy-review.md` | Para revisar copy, anuncios, landing, e-mail, PDF ou checkout |
| `planner-jira-github-sync.md` | Para comparar Jira, Git local, branch, PR e commits |
| `planner-gate-pre-trafego.md` | Para avaliar readiness antes de trafego pago |

## 3. Regras comuns

1. Comecar por leitura do ticket KAN quando houver ticket.
2. Consultar GitHub/Jira para estado atual quando isso influenciar a decisao.
3. Usar context packs sob demanda.
4. Separar fatos, inferencias, lacunas e decisoes humanas.
5. Nao executar mutacao externa quando o workflow pede dry-run.
6. Registrar validacoes aplicaveis e validacoes nao aplicaveis com motivo curto.

## 4. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Indice inicial dos workflows P0 | Codex |
