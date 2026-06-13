# Workflow: planner-validation-runner

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `foundation/handoff-agentes-ia.md`, `.agents/skills/tdah-ux-audit/scripts/`
> **Sumario:** matriz de validacao seletiva por categoria de ticket.

---

## 1. Objetivo

Escolher e registrar apenas as validacoes aplicaveis ao escopo do ticket.

## 2. Matriz de validacao

| Categoria | Quando aplicar | Comando ou verificacao |
|---|---|---|
| Scoring/arquetipos | mudou perguntas, scores, `findArc`, arquetipos ou resultado | `node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js` |
| Conteudo do quiz | mudou perguntas, opcoes, microcopy ou eventos | `node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js` |
| Build quiz/LP | mudou `quiz/*.jsx`, `quiz/components/*`, `quiz/data/*`, CSS ou rota | `cd quiz && npx vite build` |
| Acessibilidade/mobile | mudou UI, foco, layout ou ARIA | axe com `run-a11y-audit.js` e screenshots 320/768 quando aplicavel |
| Copy etica | mudou copy de producao, PDF, e-mail, anuncio, landing ou checkout | revisao contra `foundation/posicionamento-etico.md` |
| Analytics | mudou eventos, UTMs, PostHog, Pixel ou payloads | reproducao ou revisao de payload/naming |
| Checkout/Kiwify | mudou URL, cupom, entrega, webhook ou compra teste | checklist humano+IA; sem credenciais no chat |
| Produto PDF | mudou conteudo, variantes, exportacao ou design | revisao contra oferta, arquetipos e posicionamento etico |
| Docs/skills | mudou docs, workflows, context packs ou skills | `git diff --check` e validacao de frontmatter |

## 3. Regras

1. Nao rodar comando irrelevante so para inflar handoff.
2. Explicar validacao nao aplicavel em uma linha.
3. Se uma validacao requer ambiente externo ou credencial humana, registrar como pendencia humano-only/humano+IA.
4. Para docs-only, nao rodar build do quiz.

## 4. Saida obrigatoria

```markdown
## Validacoes executadas

| Validacao | Aplicavel? | Resultado | Evidencia |
|---|---|---|---|

## Validacoes nao aplicaveis

| Validacao | Motivo |
|---|---|
```

## 5. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Workflow inicial de validacao seletiva | Codex |
