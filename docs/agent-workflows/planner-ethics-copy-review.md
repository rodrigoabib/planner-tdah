# Workflow: planner-ethics-copy-review

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `foundation/posicionamento-etico.md`, `foundation/oferta-mvp.md`
> **Sumario:** revisao etica obrigatoria para copy, produto, funil, checkout e anuncios.

---

## 1. Objetivo

Revisar copy contra o posicionamento etico do projeto antes de publicar ou entregar handoff.

## 2. Quando usar

Use para:

- anuncio;
- landing;
- resultado do quiz;
- e-mail;
- checkout;
- descricao Kiwify;
- PDF;
- termos de garantia/reembolso;
- CTA ou urgencia.

## 3. Passos

1. Ler `foundation/posicionamento-etico.md`.
2. Ler `foundation/oferta-mvp.md` se houver promessa, preco, garantia, cupom ou escopo.
3. Identificar o canal da copy.
4. Procurar termos proibidos, promessa clinica, prova social falsa, urgencia artificial e risco legal.
5. Separar achado real de falso positivo em disclaimer, exemplo negativo ou comentario tecnico.
6. Sugerir reescrita somente quando houver problema real.

## 4. Saida obrigatoria

```markdown
# Revisao etica de copy

## Escopo

## Fontes

## Achados
| Severidade | Trecho | Criterio violado | Recomendacao |
|---|---|---|---|

## Falsos positivos descartados
| Trecho | Motivo |
|---|---|

## Veredito
APROVADO / APROVADO COM AJUSTES / BLOQUEADO
```

## 5. Guardrails

- Nao tratar todo uso de termo sensivel como violacao; verificar contexto.
- Nao sugerir autoridade clinica.
- Nao aceitar urgencia que reinicia artificialmente.
- Nao aceitar prova social sem fonte real.

## 6. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Workflow inicial de revisao etica | Codex |
