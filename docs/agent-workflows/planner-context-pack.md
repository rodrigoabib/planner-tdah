# Workflow: planner-context-pack

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `docs/agent-context/README.md`, `foundation/operacao-agentes-ia.md`
> **Sumario:** escolha do menor pacote de contexto suficiente para uma tarefa.

---

## 1. Objetivo

Evitar prompts longos e leitura desnecessaria de documentos, carregando somente o contexto por dominio.

## 2. Passos

1. Ler a chave KAN ou objetivo da tarefa.
2. Classificar dominios afetados.
3. Escolher context packs em `docs/agent-context/`.
4. Ler apenas as fontes obrigatorias listadas nesses packs.
5. Registrar lacunas quando o ticket exigir fonte externa ou decisao humana.
6. Retornar um pacote curto para o agente executor.

## 3. Mapa rapido

| Sinal no ticket | Context pack |
|---|---|
| quiz, scoring, arquetipo, resultado | `quiz-scoring-context.md` |
| landing, rota, cupom frontend, Obrigado, legal pages | `funil-react-vite-context.md` |
| copy, promessa, anuncio, e-mail, PDF, disclaimer | `copy-etica-context.md` |
| PostHog, Pixel, CAPI, UTM, KPI | `analytics-posthog-meta-context.md` |
| Kiwify, checkout, cupom, compra teste, webhook | `kiwify-checkout-context.md` |
| planner, PDF, capa, miolo, variante | `produto-pdf-context.md` |
| ACQ-11, gate, ads, readiness | `gate-pre-trafego-context.md` |
| credencial, pagamento, campanha, aprovacao | `humano-only-humano-ia-context.md` |

## 4. Saida obrigatoria

```markdown
# Context Pack Selection

## Objetivo

## Context packs escolhidos

## Fontes obrigatorias

## Fontes nao lidas e motivo

## Riscos de contexto

## Proximo passo recomendado
```

## 5. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Workflow inicial de selecao de contexto | Codex |
