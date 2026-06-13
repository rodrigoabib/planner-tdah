# Workflow: planner-gate-pre-trafego

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** KAN-44, `foundation/oferta-mvp.md`, `docs/backlog-funil-vendas-2026-05-11.md`
> **Sumario:** checklist de readiness antes de trafego pago e ACQ-9.

---

## 1. Objetivo

Evitar gasto em ads antes de o funil estar pronto em funil tecnico, checkout, tracking, legal/etico e decisao humana.

## 2. Fontes obrigatorias

- Jira KAN-44.
- `foundation/oferta-mvp.md` secao 8.
- `docs/backlog-funil-vendas-2026-05-11.md` secao 7.
- Context packs de funil, Kiwify, analytics, copy etica e humano-only/humano+IA.

## 3. Checklist

| Area | Exemplos de itens bloqueantes |
|---|---|
| Funil | quiz mobile, teclado, CTA, landing por arquetipo, cupom, Obrigado |
| Checkout | Kiwify, preco, PIX/cartao, cupom, compras de teste, entrega, estorno |
| Tracking | PostHog, UTMs, Pixel Meta, CAPI, dashboard |
| Legal/etico | termos, privacidade, reembolso, disclaimers, sem placeholder, copy aprovada |
| Decisao humana | criativos, orcamento, campanha, criterio matar/escalar, contingencia |

## 4. Veredito

- `GO`: todos os itens criticos estao verdes.
- `NO-GO`: qualquer item critico esta vermelho ou sem evidencia.
- `GO COM RISCO`: apenas lacunas nao criticas aceitas explicitamente pelo humano.

## 5. Guardrails

- A IA nao deve subir campanha.
- A IA nao deve inserir credenciais.
- A IA nao deve declarar compra, estorno ou entrega como testada sem evidencia humana ou tecnica real.
- KAN-44 permanece humano-only para decisao final.

## 6. Saida obrigatoria

```markdown
# Gate pre-trafego — KAN-44

## Veredito
GO / NO-GO / GO COM RISCO

## Bloqueios

## Evidencias verdes

## Decisoes humanas pendentes

## Proximo passo recomendado
```

## 7. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Workflow inicial de gate pre-trafego | Codex |
