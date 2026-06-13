# Context pack: funil React/Vite

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `quiz/package.json`, `quiz/components/`, `quiz/coupon.js`
> **Sumario:** contexto minimo para rotas, landing, cupom, paginas legais e build do app.

---

## 1. Quando ler

Leia quando o ticket tocar rotas, landing por arquetipo, quiz UI, `CouponCountdown`, `/obrigado`, paginas legais, cupom, mobile, acessibilidade ou build.

## 2. Fontes obrigatorias

- Ticket Jira KAN.
- `quiz/main.jsx`.
- `quiz/components/Quiz.jsx`.
- `quiz/components/Landing.jsx`.
- `quiz/components/CouponCountdown.jsx`.
- `quiz/components/Obrigado.jsx`.
- `quiz/components/Termos.jsx`, `Privacidade.jsx`, `Reembolso.jsx` quando o ticket tocar legal.
- `quiz/coupon.js`.
- `quiz/data/archetypes.js`.

## 3. Validacoes

- `cd quiz && npx vite build` para qualquer mudanca no app.
- Screenshots 320px/768px para mudanca visual.
- A11y com `run-a11y-audit.js` quando houver UI/foco/ARIA.
- Revisao etica se houver copy nova.

## 4. Estado atual conhecido

O projeto nao e mais apenas um componente unico. O app usa Vite, React Router, componentes em `quiz/components/`, dados em `quiz/data/archetypes.js` e cupom em `quiz/coupon.js`.

## 5. Riscos

- README ou docs antigos ainda podem mencionar arquitetura de arquivo unico.
- Mudancas de rota podem quebrar CTA do quiz para landing.
- Cupom nao pode reiniciar artificialmente ao recarregar.

## 6. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Context pack inicial de funil React/Vite | Codex |
