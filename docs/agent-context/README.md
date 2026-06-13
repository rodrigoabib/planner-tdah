# Context packs de agentes — Planner TDAH

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `foundation/operacao-agentes-ia.md`, `docs/agent-workflows/planner-context-pack.md`
> **Sumario:** indice dos pacotes de contexto sob demanda para Codex e Claude Code.

---

## 1. Como usar

Leia apenas os context packs necessarios para o ticket. O objetivo e reduzir contexto carregado sempre em `AGENTS.md` e `CLAUDE.md`.

## 2. Context packs disponiveis

| Context pack | Quando ler |
|---|---|
| `quiz-scoring-context.md` | Quiz, perguntas, scoring, arquetipos, resultado ou scripts de validacao |
| `funil-react-vite-context.md` | Rotas, landing, cupom, Obrigado, legal pages, build ou UX do app |
| `copy-etica-context.md` | Copy, promessa, anuncio, e-mail, PDF, landing, checkout ou disclaimers |
| `analytics-posthog-meta-context.md` | Eventos, UTMs, PostHog, Pixel Meta, CAPI ou KPIs |
| `kiwify-checkout-context.md` | Produto Kiwify, cupom, entrega, compra teste, reembolso ou webhook |
| `produto-pdf-context.md` | Conteudo, design, exportacao ou variantes do PDF por arquetipo |
| `gate-pre-trafego-context.md` | Readiness do funil antes de ACQ-9 / trafego pago |
| `humano-only-humano-ia-context.md` | Decisoes com credenciais, conta, pagamento, legal, campanha ou aprovacao final |

## 3. Regras

1. Jira/GitHub prevalecem para estado atual.
2. Context pack nao substitui o ticket.
3. Memoria local nao substitui fonte versionada.
4. Se um context pack parecer obsoleto, registrar a divergencia e checar fonte canonica.

## 4. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Indice inicial de context packs | Codex |
