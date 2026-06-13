# Context pack: humano-only e humano+IA

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `foundation/handoff-agentes-ia.md`, `docs/backlog-funil-vendas-2026-05-11.md`
> **Sumario:** contexto minimo para separar preparo por IA de decisoes ou acoes humanas.

---

## 1. Quando ler

Leia quando o ticket envolver conta, credenciais, pagamento, Kiwify, Meta Ads, campanha, aprovacao legal, aprovacao de PDF, dominio, compra teste, estorno ou decisao comercial.

## 2. Classificacao

| Tipo | Definicao |
|---|---|
| Humano-only | O agente so prepara/revisa; Rodrigo executa a acao externa |
| Humano+IA | Rodrigo decide ou opera ferramenta externa com apoio de IA |
| IA autonomo | Agente pode executar no repo/Jira/Git dentro do fluxo autorizado |

## 3. O agente pode

- Preparar checklist.
- Revisar copy, risco e consistencia.
- Sugerir passos.
- Preparar comentario Jira.
- Registrar bloqueios e decisoes pendentes.
- Conferir evidencias fornecidas pelo humano.

## 4. O agente nao pode

- Solicitar ou armazenar credenciais em chat.
- Fazer pagamento.
- Operar conta Kiwify ou Meta Ads sem direcao humana.
- Declarar compra teste ou estorno sem evidencia.
- Aprovar juridico ou campanha final.
- Mover ticket para `Concluido`.

## 5. Saida recomendada

```markdown
# Operacao humano-only / humano+IA

## Decisao humana necessaria

## O que a IA preparou

## Evidencia exigida

## Riscos se avancar sem humano

## Proximo passo seguro
```

## 6. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Context pack inicial de humano-only/humano+IA | Codex |
