# Critério de decisão — Matar, Iterar ou Escalar

> **Documento vivo · Versão 1.0 · 2026-05-12**
> **Ticket:** [KAN-43 / ACQ-10](https://the-abib-company.atlassian.net/browse/KAN-43)
> **Status:** Aprovado e em vigor
> **Dependência:** [`../data/kpis.md`](../data/kpis.md) (DATA-5 — KPIs e benchmarks), [`promessa.md`](promessa.md) (ACQ-1 — promessa + framings)
> **Bloqueia:** KAN-44 (ACQ-11 — gate pré-tráfego pago)
> **Fonte de verdade:** este arquivo. Em conflito com qualquer outra fonte (planilha, ticket, dashboard), este documento prevalece.

---

## Sumário

1. [Por que esse documento existe](#1-por-que-esse-documento-existe)
2. [Janela de avaliação](#2-janela-de-avaliação)
3. [Regra principal — matriz CAC × ROAS](#3-regra-principal--matriz-cac--roas)
4. [Regras adicionais — gatilhos de iteração específica](#4-regras-adicionais--gatilhos-de-iteração-específica)
5. [Como "iterar" — protocolo de uma variável por vez](#5-como-iterar--protocolo-de-uma-variável-por-vez)
6. [Cadência de revisão](#6-cadência-de-revisão)
7. [Responsável pela decisão](#7-responsável-pela-decisão)
8. [Registro de decisões](#8-registro-de-decisões)

---

## 1. Por que esse documento existe

Decisão de escala/morte/iteração tomada sem critério pré-definido vira **"deixa rodar mais um pouquinho"** — o que queima orçamento sem produzir aprendizado. Este documento define a regra **antes** de subir os ads, para que a emoção não dirija o cofre.

Os números aqui derivam diretamente de [`../data/kpis.md`](../data/kpis.md) (KPIs do funil completo) e [`../foundation/oferta-mvp.md`](../foundation/oferta-mvp.md) (preço R$ 29,90, líquido pós-Kiwify de R$ 26,90).

---

## 2. Janela de avaliação

Avaliar a campanha quando **um dos dois** for atingido primeiro:

| Gatilho de avaliação | Valor |
|---|---|
| **Tempo decorrido** | 7 dias corridos desde a subida da campanha |
| **Gasto acumulado** | R$ 300,00 (orçamento mínimo do soft launch) |

**Mínimo estatístico:** se a janela de 7 dias OU R$ 300 produzir **menos de 10 conversões totais**, manter a campanha rodando por mais 3 dias antes de decidir — volume baixo gera ruído que contamina o veredito. Se permanecer abaixo de 10 conversões em 10 dias, escalar para a coluna 🟡 (iterar) automaticamente: o problema é antes do checkout.

---

## 3. Regra principal — matriz CAC × ROAS

| Cenário | CAC | ROAS | Ação | Quem aprova |
|---|---|---|---|---|
| 🟢 **Bom** | **< R$ 17,93** | **≥ 1,5x** | **ESCALA** — aumentar budget em 30% por semana, mantendo criativo e copy vencedores. Reavaliar em 7 dias. | Rodrigo |
| 🟡 **Médio** | **R$ 17,93 – R$ 26,90** | **1,0x – 1,5x** | **ITERA** — trocar **apenas uma variável** (ver §5). Reavaliar em 7 dias. | Rodrigo |
| 🔴 **Ruim** | **> R$ 26,90** | **< 1,0x** | **MATA** — pausar a campanha. Diagnosticar antes de tentar de novo: produto, preço, oferta ou promessa precisam de revisão estrutural antes de gastar de novo. | Rodrigo |

### Por que esses cortes

- **R$ 17,93** = CAC máximo para ROAS de 1,5x sobre o líquido pós-Kiwify de R$ 26,90 (R$ 26,90 ÷ 1,5).
- **R$ 26,90** = **break-even** após taxa Kiwify (~9-10%). Acima disso, cada venda **queima dinheiro**.
- **ROAS 1,5x** é o piso para escalar sem comprometer reinvestimento e margem de erro.
- **ROAS < 1,0x** significa que para cada R$ 1 gasto em ads, retornam menos de R$ 1 em receita líquida — modelo insustentável em qualquer prazo.

**Fonte das premissas:** `data/kpis.md` §1 e K10/K11.

---

## 4. Regras adicionais — gatilhos de iteração específica

Estes gatilhos são **anteriores** à regra principal — disparam iteração mesmo se CAC ainda estiver na faixa 🟢 ou 🟡, porque indicam **risco iminente** de degradação.

| Sinal observado | KPI relacionado (kpis.md) | Causa provável | Ação |
|---|---|---|---|
| **Frequência > 3** (mesma pessoa viu o anúncio 3+ vezes) | — (painel Meta) | Saturação da audiência | Trocar criativo (rodar próximo conceito em ACQ-2/KAN-35) |
| **CTR < 0,8%** | K1 | Criativo não para o scroll OU promessa fora do alvo | Trocar criativo (KAN-36/37) ou trocar framing da promessa (KAN-34) |
| **CPC > R$ 4,00** | K2 | Segmentação mal calibrada ou mercado saturado | Revisar audiência no Meta Ads Manager |
| **Taxa de início do quiz < 50%** | K3 | Promessa do anúncio não conecta com expectativa pós-clique | Trocar copy do anúncio (KAN-38) ou velocidade de carregamento |
| **Taxa de conclusão do quiz < 30%** | K4 | Fricção interna do quiz, drop em pergunta específica | Identificar pergunta de drop via PostHog (métrica qualitativa Q1) — bug ou conteúdo |
| **CTR resultado → landing < 15%** | K5 | Bridge text do arquétipo não vende | Revisar copy do bridge text por arquétipo |
| **LP → checkout < 3%** | K8 | Oferta confusa, cupom não aplicado, preço percebido alto | Revisar landing, cupom QUIZ24H, posicionamento |
| **Checkout → compra < 15%** | K9 | Atrito no checkout — método, dado, bug Kiwify | Investigar logs Kiwify, testar fluxo manualmente |
| **Quiz → compra < 1%** (taxa final) | derivada (K3·K4·K5·K8·K9) | Problema estrutural — produto, preço ou ponte | Revisão profunda; pode justificar matar mesmo dentro da janela |

**Princípio:** o gatilho dispara **revisão manual**, não pausa automática. Rodrigo decide caso a caso, mas o gatilho exige que a decisão aconteça em até 24h.

---

## 5. Como "iterar" — protocolo de uma variável por vez

Iteração descontrolada (mudar criativo + copy + público ao mesmo tempo) destrói a capacidade de aprender o que funcionou. Protocolo obrigatório:

1. **Identifique o KPI mais fraco** na tabela §4 que ainda não foi tratado.
2. **Troque apenas uma das variáveis abaixo**, deixando as outras iguais:
   - Criativo (imagem/vídeo do anúncio) — primeiro a testar se CTR baixo
   - Copy (texto do anúncio) — segundo a testar se CTR baixo persiste após criativo novo
   - Hook/headline (primeira linha) — testar 3 hooks em paralelo (ver `acquisition/copy-ads.md` quando existir)
   - Audiência (segmentação Meta) — só após esgotar criativo e copy
   - Preço (R$ 29,90 → outro valor) — só após exaustão de variáveis acima; v1.5
3. **Roda nova janela de 7 dias ou R$ 300** com a variável trocada.
4. **Compara**: se KPI melhorou e CAC/ROAS subiram de faixa, escalar. Se piorou, reverter e tentar próxima variável. Se ficou estável, a variável anterior não era o gargalo — voltar para §4 e identificar o próximo KPI fraco.

**Limite de iterações antes de matar:** 3 iterações consecutivas sem mover CAC/ROAS de faixa = matar. Após o terceiro fracasso, o problema não é tático — é estrutural (produto, preço ou ponte de venda).

---

## 6. Cadência de revisão

| Fase | Frequência | O que olhar |
|---|---|---|
| **Primeiros 7 dias após subir ads** | Diária (manhã) | K1 (CTR), K2 (CPC), Frequência, K3 (início quiz), volume de conversões |
| **Dias 8-30** | A cada 7 dias | Todos os 12 KPIs + métricas qualitativas Q1-Q5 do `kpis.md` §3 |
| **Após 30 dias** | Quinzenal | Tendência de CAC/ROAS; saturação por audiência; rotação de criativo |

**Painel de referência:** PostHog Dashboard "Funil — Planner TDAH v1" (a ser configurado em DATA-6/KAN-50 após DATA-2 e COMMERCE-5 estarem prontos). Enquanto não existir, planilha manual com export de Meta Ads + Kiwify alimenta a decisão.

---

## 7. Responsável pela decisão

**Decisor único:** Rodrigo (operação solo + IA, conforme `docs/backlog-funil-vendas-2026-05-11.md` §2 decisão 1).

A IA (Claude Code ou Codex) pode:
- ✅ Apontar quando um KPI cruza o limiar de alarme
- ✅ Resumir os números da semana
- ✅ Sugerir qual variável trocar conforme §5
- ❌ **Não** pausar/escalar/trocar campanha sem aprovação humana explícita

Aprovação humana é gravada no §8 deste documento (registro de decisões) e/ou no ticket Jira correspondente (ACQ-9/KAN-42 = subir/manter; ACQ-2/3/4/5 = trocar criativo/copy).

---

## 8. Registro de decisões

Toda decisão de matar/iterar/escalar deve ser logada aqui (e/ou em comentário do ticket Jira correspondente):

| Data | Janela avaliada | Cenário (🟢/🟡/🔴) | CAC | ROAS | Decisão | Variável trocada (se iteração) |
|---|---|---|---|---|---|---|
| _aguardando primeira avaliação_ | _D+7 ou R$ 300_ | _—_ | _—_ | _—_ | _—_ | _—_ |

---

## Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-05-12 | 1.0 | Versão inicial — matriz CAC×ROAS alinhada com `data/kpis.md` (K10/K11), 9 gatilhos adicionais, protocolo de iteração e cadência | Rodrigo Abib + Claude (Opus 4.7) |

---

**Fim do documento.** Quando o gate ACQ-11 (KAN-44) rodar, este é o item "ACQ-10 documentado e aprovado" do checklist em `docs/backlog-funil-vendas-2026-05-11.md` §7.
