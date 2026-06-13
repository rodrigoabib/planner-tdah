---
name: planner-gate-pre-trafego
description: Use para avaliar readiness antes de trafego pago, ACQ-9, soft launch ou KAN-44 no planner-tdah. Verifica funil, checkout Kiwify, tracking PostHog/Meta, legal/copy etica e decisoes humanas, retornando GO, NO-GO ou GO COM RISCO.
---

# Planner Gate Pre-Trafego

Siga `docs/agent-workflows/planner-gate-pre-trafego.md`.

## Regras

- KAN-44 e a secao 8 de `foundation/oferta-mvp.md` sao obrigatorios.
- Use context packs de funil, Kiwify, analytics, copy etica e humano-only/humano+IA.
- Retorne `NO-GO` se faltar evidencia critica.
- Nao subir campanha, inserir credenciais ou declarar compra teste sem evidencia.
