# Análise — Âncoras temporais nos templates diários (BASE)

> **Ticket:** [KAN-134 / PRODUCT-8](https://the-abib-company.atlassian.net/browse/KAN-134)
> **Status:** Entregue — Em análise · 2026-06-11
> **Origem:** item B-06 / N-4 do plano estratégico `research/outputs/06_plano_estrategico_proximas_acoes_planner_tdah.md` (§10)
> **Dependências de leitura:** `product/content/base/05-ritual-diario.md`, `product/content/base/08-templates-diarios.md`, `product/content/variants/nomade-quantico/02-ajustes-ritual-diario.md`, `research/outputs/01_mapa_qualitativo_dores_reddit.md` §2
> **Bloqueia:** congelamento editorial do miolo em KAN-24 (decisão D5 do plano)

---

## Sumário

1. [Pergunta da análise](#1-pergunta-da-análise)
2. [Evidência — o que já existia](#2-evidência--o-que-já-existia)
3. [Avaliação — lacuna pontual identificada](#3-avaliação--lacuna-pontual-identificada)
4. [Mudança mínima aplicada](#4-mudança-mínima-aplicada)
5. [Compatibilidade com a variante Nômade](#5-compatibilidade-com-a-variante-nômade)
6. [Impacto no design (KAN-24)](#6-impacto-no-design-kan-24)
7. [Validações](#7-validações)
8. [Histórico de revisões](#8-histórico-de-revisões)

---

## 1. Pergunta da análise

Cegueira temporal é a 3ª dor do corpus Reddit (170 registros, relevância média 38.6 — `research/outputs/01` §2) e a única do top-5 cuja cobertura no conteúdo BASE não estava evidenciada: a matriz do plano estratégico (§4) apontava âncoras temporais como regra apenas da variante Nômade. A pergunta: **os templates diários BASE oferecem âncora temporal leve, ou a dor #3 fica descoberta para os outros 6 perfis?**

## 2. Evidência — o que já existia

Cobertura **parcial** confirmada, com citações (numeração de linhas da v1.0, antes da mudança desta entrega):

| Evidência | Arquivo:linha | O que cobre |
|---|---|---|
| Estrutura do dia ancorada em períodos ("Manhã ou início do ciclo ativo / Tarde ou ponto de checagem / Noite ou fechamento") | `base/05:12-19` | Orientação temporal macro, sem hora fixa |
| Campo "Blocos de tempo opcionais" com instrução anti-rigidez ("Se horários rígidos travam seu ritmo, troque por blocos flexíveis: manhã, tarde, noite, antes do almoço, depois da reunião") | `base/05:35-36` | Time-blocking leve, opcional |
| Tabela de blocos (Manhã / Meio do dia / Tarde / Noite) no template preenchível | `base/05:100-107` | Idem, materializado na página |
| Mesma tabela de blocos repetida nos 12 templates diários | `base/08:22-29` (e equivalentes nos dias 2–12) | Idem, no miolo reutilizável |
| Ritual tolerante a horário de início ("Se você lembrar só depois do almoço, ainda vale") | `base/05:8` | Anti-culpa temporal |

## 3. Avaliação — lacuna pontual identificada

O que **não** existia em nenhum template BASE: um lugar para o **compromisso com hora marcada** do dia (consulta, reunião, horário de buscar alguém). Os blocos respondem a "como distribuo meu dia", mas não a "o que tem hora fixa e não pode sumir do radar" — que é exatamente a manifestação mais citada da dor #3 no corpus (atrasos e compromissos perdidos, não falta de planejamento por período).

Conclusão: **lacuna real, porém pontual** — resolvível com 1 campo opcional, sem redesenho.

## 4. Mudança mínima aplicada

Dentro do critério de aceite do ticket (máximo 1 campo opcional, sem aumentar preenchimento obrigatório):

1. **`base/05-ritual-diario.md`** — §2 ganhou a explicação do campo "Horário âncora (opcional)" (compromisso com hora marcada como ponto de referência do dia; em branco quando não há); §5 (template preenchível) ganhou a linha `**Horário âncora (opcional):** ________ h — ________________________________` antes da tabela de blocos.
2. **`base/08-templates-diarios.md`** — a mesma linha única foi adicionada nos 12 templates diários, antes da tabela de blocos.
3. Consolidados `_consolidated/base-consolidado.md` e `variants-consolidado.md` regenerados via `python consolidar_markdowns.py`.

O preenchimento obrigatório não mudou: em dia de baixa energia continua valendo "apenas data, intenção e uma prioridade real" (`base/08:6`).

## 5. Compatibilidade com a variante Nômade

A variante Nômade orienta "Troque horários rígidos por lembretes contextuais" (`variants/nomade-quantico/02:55-57`). Não há conflito: a orientação da variante trata de **horários autoimpostos** (agenda própria); o horário âncora trata de **compromissos externos com hora fixa**, que existem independentemente da preferência do perfil. O campo é opcional e a redação do §2 deixa explícito que fica em branco quando não há hora marcada.

## 6. Impacto no design (KAN-24)

- O layout da página diária do miolo deve incluir a linha "Horário âncora (opcional)" — 1 linha, antes da tabela de blocos. Sem mudança na contagem de páginas (52-53) nem em `planner-structure.md`.
- Sugestão para o design: dar a este campo um tratamento visual levemente destacado (ex.: ícone de relógio do design system), porque para o usuário com a dor #3 ele é o campo de maior valor da página — princípio "entrada óbvia" do design system.
- Com esta entrega, **o conteúdo editorial do miolo pode ser congelado** (decisão D5 do plano estratégico) após o OK humano neste ticket.

## 7. Validações

| Verificação | Resultado |
|---|---|
| Revisão da copy nova contra `posicionamento-etico.md` §2 (termos proibidos) | ✅ nenhum termo proibido; linguagem funcional, sem rótulo clínico |
| Carga de preenchimento obrigatória inalterada | ✅ campo explicitamente opcional, regra de dia mínimo intacta (`base/08:6`) |
| Consolidados regenerados e consistentes | ✅ `python consolidar_markdowns.py` |
| Formato deste documento (cabeçalho, sumário, seções numeradas, histórico) | ✅ |

## 8. Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-06-11 | 1.0 | Análise inicial + mudança mínima aplicada (horário âncora opcional) | Claude Code (Fable 5) |

---

**Fim do documento.**
