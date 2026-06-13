# Context pack: Kiwify, checkout e entrega

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `foundation/oferta-mvp.md`, `docs/backlog-funil-vendas-2026-05-11.md`
> **Sumario:** contexto minimo para checkout Kiwify, cupom, entrega digital, compras teste e webhook.

---

## 1. Quando ler

Leia para tickets COMMERCE, checkout, Kiwify, cupom, preco, entrega de PDF, webhook, compra teste, estorno ou pagina `/obrigado`.

## 2. Fontes obrigatorias

- Ticket Jira KAN.
- `foundation/oferta-mvp.md`.
- `docs/backlog-funil-vendas-2026-05-11.md` secoes COMMERCE e gate.
- `quiz/coupon.js` se tocar link/cupom.
- `quiz/components/Landing.jsx` se tocar CTA de compra.
- `quiz/components/Obrigado.jsx` se tocar pos-compra.

## 3. Regras

- Preco cheio: R$ 49,90.
- Preco com cupom QUIZ24H: R$ 29,90.
- Cupom real, sem reset artificial.
- Garantia e reembolso seguem a oferta MVP.
- Conta, pagamento, credenciais, compras reais e estorno sao humano-only ou humano+IA.

## 4. Validacoes

- Checklist de checkout quando houver credencial humana.
- Revisao de URL/cupom sem expor token.
- Compra teste real somente pelo humano.
- Webhook e Purchase/CAPI so com credenciais seguras.

## 5. Riscos

- Link placeholder em producao.
- Preco divergente entre landing e Kiwify.
- PDF errado entregue para arquetipo.
- Compra teste ou estorno declarados sem evidencia real.

## 6. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Context pack inicial de Kiwify/checkout | Codex |
