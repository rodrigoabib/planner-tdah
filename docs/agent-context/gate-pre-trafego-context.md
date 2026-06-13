# Context pack: gate pre-trafego pago

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** KAN-44, `foundation/oferta-mvp.md`, `docs/backlog-funil-vendas-2026-05-11.md`
> **Sumario:** contexto minimo para avaliar readiness antes de gastar em Meta Ads.

---

## 1. Quando ler

Leia para KAN-44, ACQ-11, ACQ-9, soft launch, readiness, ads, trafego pago ou qualquer pedido de publicar campanha.

## 2. Fontes obrigatorias

- Jira KAN-44.
- `foundation/oferta-mvp.md` secao 8.
- `docs/backlog-funil-vendas-2026-05-11.md` secao 7.
- Context packs de funil, Kiwify, analytics, copy etica e humano-only/humano+IA.

## 3. Areas do gate

| Area | Bloqueia quando |
|---|---|
| Funil tecnico | quiz/landing/cupom/Obrigado/mobile/teclado sem evidencia |
| Checkout | preco, cupom, compra, entrega ou estorno sem validacao |
| Tracking | PostHog, UTMs, Pixel, CAPI ou dashboard incompletos |
| Legal/etico | termos, privacidade, reembolso, disclaimers ou copy faltando |
| Decisao humana | orcamento, criativos, campanha ou contingencia sem aprovacao |

## 4. Veredito

Use `docs/agent-workflows/planner-gate-pre-trafego.md` e retorne `GO`, `NO-GO` ou `GO COM RISCO`.

## 5. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Context pack inicial de gate | Codex |
