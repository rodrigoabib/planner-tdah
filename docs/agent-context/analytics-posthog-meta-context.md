# Context pack: analytics, PostHog e Meta

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `data/kpis.md`, `docs/backlog-funil-vendas-2026-05-11.md`, `quiz/`
> **Sumario:** contexto minimo para eventos, UTMs, PostHog, Meta Pixel/CAPI e KPIs.

---

## 1. Quando ler

Leia quando o ticket mencionar PostHog, Pixel Meta, CAPI, UTMs, dashboard, KPIs, evento, payload, atribuição ou compra confirmada.

## 2. Fontes obrigatorias

- Ticket Jira KAN.
- `data/kpis.md`.
- `docs/backlog-funil-vendas-2026-05-11.md` secoes DATA, ACQ e COMMERCE.
- `quiz/components/Quiz.jsx`.
- `quiz/components/Landing.jsx`.
- `quiz/components/Obrigado.jsx`.
- `quiz/coupon.js`.

## 3. Eventos esperados por area

| Area | Exemplos |
|---|---|
| Quiz | inicio, resposta, marco, conclusao, arquetipo, CTA, abandono |
| Landing | view, scroll, CTA, cupom ativo/expirado |
| Checkout | initiate checkout, purchase, purchase_confirmed |
| Atribuicao | UTMs preservadas do anuncio ate compra |

## 4. Validacoes

- Revisar nomes e payloads.
- Reproduzir evento quando houver ambiente.
- Conferir UTMs em URL/localStorage quando aplicavel.
- Para CAPI/Purchase, registrar pendencia humano+IA se depender de painel externo ou credenciais.

## 5. Riscos

- Tracking incompleto antes de trafego pago.
- Decisao de campanha baseada em dados incompletos.
- Credenciais ou chaves expostas no chat ou commit.

## 6. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Context pack inicial de analytics | Codex |
