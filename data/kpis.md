# KPIs do funil completo — Planner TDAH v1

> **Documento vivo · Versão 1.0 · 2026-05-12**
> **Ticket:** [KAN-49 / DATA-5](https://the-abib-company.atlassian.net/browse/KAN-49)
> **Status:** Aprovado e em vigor
> **Bloqueia:** KAN-43 (ACQ-10 — critério matar/escalar), KAN-50 (DATA-6 — dashboard)
> **Dependência:** [foundation/oferta-mvp.md](../foundation/oferta-mvp.md) (preço e margem)
> **Fonte de verdade:** este arquivo. Em conflito com qualquer outra fonte (planilha, ticket, dashboard), este documento prevalece.

---

## Sumário

1. [Princípios de leitura](#1-princípios-de-leitura)
2. [Tabela mestre — 12 KPIs quantitativos](#2-tabela-mestre--12-kpis-quantitativos)
3. [Métricas qualitativas (medir junto)](#3-métricas-qualitativas-medir-junto)
4. [Cadência de revisão](#4-cadência-de-revisão)
5. [Como esses KPIs alimentam ACQ-10 e DATA-6](#5-como-esses-kpis-alimentam-acq-10-e-data-6)

---

## 1. Princípios de leitura

**Janela de medição padrão:** 7 dias móveis (rolling) com volume mínimo de 50 cliques/dia ou 100 visualizações de quiz. Volumes menores produzem ruído e não devem disparar decisões.

**Por que "benchmark" e não "meta":** estes são valores **alvo realistas** para infoproduto digital de R$ 29,90 no Brasil em 2026. São referências para diagnosticar problemas, não promessas. Volume real do soft launch (R$ 300-750 em ads) pode produzir variância alta nos primeiros dias.

**Por que "gatilho de alarme" e não "kill switch":** os números na coluna "Quando alarmar" não pausam a campanha automaticamente — eles disparam **revisão manual** do funil. A decisão final de matar/escalar/iterar segue a regra do ACQ-10.

**Custo unitário de referência:**
- Preço líquido pós-Kiwify (~9-10%): **R$ 26,90/venda**
- CAC máximo aceitável para break-even (ROAS = 1.0): **R$ 26,90**
- CAC alvo para ROAS = 1.5x: **R$ 17,93**

---

## 2. Tabela mestre — 12 KPIs quantitativos

> Ordem: do topo do funil (anúncio) ao fundo (compra). Os 12 KPIs cobrem as 4 grandes etapas: aquisição → quiz → landing → checkout.

| # | KPI | Cálculo | Fonte | Benchmark v1 (soft launch) | Quando alarmar |
|---|---|---|---|---|---|
| **K1** | **CTR do anúncio** | Cliques no link / Impressões | Meta Ads Manager | **≥ 1.5%** | < 0.8% |
| **K2** | **CPC (Custo por Clique)** | Gasto / Cliques | Meta Ads Manager | **< R$ 2,00** | > R$ 4,00 |
| **K3** | **Taxa de início do quiz** | `quiz_started` / Cliques no anúncio | PostHog ÷ Meta | **≥ 70%** | < 50% |
| **K4** | **Taxa de conclusão do quiz** | `quiz_completed` / `quiz_started` | PostHog | **≥ 50%** | < 30% |
| **K5** | **CTR resultado → landing** | `cta_clicked` / `result_viewed` | PostHog | **≥ 25%** | < 15% |
| **K6** | **Taxa de visualização da landing** | `lp_viewed` / `cta_clicked` | PostHog | **≥ 95%** | < 80% |
| **K7** | **Taxa de scroll completo na landing** | `lp_scrolled_100` / `lp_viewed` | PostHog | **≥ 30%** | < 15% |
| **K8** | **Conversão landing → checkout** | `InitiateCheckout` / `lp_viewed` | Pixel Meta + PostHog | **≥ 8%** | < 3% |
| **K9** | **Conversão checkout → compra** | `purchase_confirmed` / `InitiateCheckout` | Webhook Kiwify → PostHog | **≥ 30%** | < 15% |
| **K10** | **CAC (Custo de Aquisição)** | Gasto total / Compras confirmadas | Meta Ads ÷ Kiwify | **< R$ 17,93** (ROAS 1.5x) | > R$ 26,90 (ROAS < 1.0x) |
| **K11** | **ROAS (Return on Ad Spend)** | Receita líquida / Gasto | Kiwify ÷ Meta Ads | **≥ 1.5x** | < 1.0x |
| **K12** | **Ticket médio** | Receita / Compras | Kiwify | **R$ 29,90** (fixo na v1) | qualquer desvio > R$ 0,10 (indica cupom errado) |

### Por que cada KPI importa

| KPI | O que ele diagnostica quando alarma |
|---|---|
| K1 (CTR ad) | Criativo / promessa não atrai — trocar criativo (ver KAN-35/ACQ-2) ou framing (KAN-34/ACQ-1) |
| K2 (CPC) | Mercado quente ou segmentação mal calibrada — revisar audiência |
| K3 (início quiz) | Landing do quiz não converte clique em começo — testar headline ou velocidade de carregamento |
| K4 (conclusão quiz) | Quiz muito longo, fricção em alguma pergunta, ou bug — identificar pergunta de drop (ver métrica qualitativa Q1) |
| K5 (CTR resultado→LP) | Bridge text do arquétipo não vende, oferta não percebida como relevante |
| K6 (visualização LP) | Erro técnico — URL quebrada, slug do arquétipo errado, redirect com perda |
| K7 (scroll LP) | LP longa demais ou abre com objeção; primeiro bloco não engaja |
| K8 (LP → checkout) | Oferta não está clara, cupom não está aplicado, preço percebido alto |
| K9 (checkout → compra) | Atrito no checkout — método de pagamento, exigência de dado, bug na Kiwify |
| K10 (CAC) | Métrica de **decisão**: matar/iterar/escalar (ver ACQ-10) |
| K11 (ROAS) | Métrica de **viabilidade do funil** — abaixo de 1.0x queima dinheiro |
| K12 (ticket médio) | Sanity check — qualquer desvio indica cupom aplicado errado ou produto duplicado |

---

## 3. Métricas qualitativas (medir junto)

> Não viram benchmark numérico, mas são sinais que precisam ser monitorados manualmente toda semana.

### Q1 — Pergunta com maior drop-off

**Como medir:** PostHog → funil `question_answered` por questionId (Q1..Q15).
**Interpretação:**
- Se uma pergunta perde > 15% acima da média das outras → revisar redação, opção, ou ordem
- Drop concentrado em Q1-Q3 sugere problema no preâmbulo / Landing; em Q12-Q15 sugere fadiga

### Q2 — Frequência média do anúncio

**Como medir:** Meta Ads Manager → coluna "Frequência".
**Interpretação:**
- ≤ 2.0 = audiência saudável
- 2.0 a 3.5 = monitorar, criativo começando a saturar
- ≥ 4.0 = trocar criativo (saturação confirmada — CTR vai cair)

### Q3 — Distribuição de arquétipos

**Como medir:** PostHog → evento `archetype_revealed` agrupado por `archetype`.
**Interpretação:**
- Se 1 arquétipo concentra > 40% dos resultados → revisar scoring (pode ter viés)
- Distribuição saudável: nenhum arquétipo < 8% ou > 25%
- Variação `lowSeverity` típica: < 15% (público de anúncio é autosselecionado)

### Q4 — Taxa de reembolso

**Como medir:** Kiwify → painel de pedidos → filtro "Reembolsado".
**Interpretação:**
- < 5% = saudável
- 5-10% = revisar promessa (quebra de expectativa entre anúncio e produto)
- ≥ 10% = alarme: pausar campanhas e revisar promessa + produto

### Q5 — Tempo médio até compra após `cta_clicked`

**Como medir:** PostHog → tempo entre `cta_clicked` e `purchase_confirmed` por `distinct_id`.
**Interpretação:**
- < 5min = compra impulsiva (cupom funcionando)
- 5-60min = compra deliberada (saudável também)
- > 60min sem comprar = lead frio, possível candidato a retargeting (ver v1.5)

---

## 4. Cadência de revisão

| Periodicidade | O que olhar | Por quem |
|---|---|---|
| **Diária** (5 min) | K1, K2, K10, K11 — anúncio queima dinheiro? | Rodrigo |
| **A cada 3 dias** (15 min) | K3-K9, Q1, Q2 — onde está o gargalo? | Rodrigo |
| **Semanal** (30 min) | Tabela completa + Q3, Q4, Q5 — decisão matar/iterar/escalar | Rodrigo |
| **Mensal** (1h) | Tendências, comparação com benchmark, atualização do doc se preciso | Rodrigo |

**Princípio:** não revisar mais frequentemente que isso. Decisões em volume baixo é viés.

---

## 5. Como esses KPIs alimentam ACQ-10 e DATA-6

### 5.1 ACQ-10 (matar / escalar / iterar)

ACQ-10 documenta a regra de decisão sobre a campanha. Os gatilhos vêm desta tabela:

| Decisão | Gatilho (KPIs aqui) |
|---|---|
| **Matar** (pausar campanha) | K11 < 1.0x sustentado por 5 dias **OU** Q4 (reembolso) ≥ 10% |
| **Iterar** (trocar criativo/oferta sem pausar) | Q2 (frequência) ≥ 4.0 **OU** qualquer KPI primário < benchmark por 3 dias seguidos |
| **Escalar** (subir orçamento em 20% a cada 3 dias) | K11 ≥ 1.5x sustentado por 5 dias **E** K10 < R$ 17,93 **E** Q4 < 5% |

### 5.2 DATA-6 (dashboard PostHog)

O dashboard no PostHog deve renderizar todos os 12 KPIs em cards + os 5 qualitativos em widgets separados. Layout sugerido:

1. **Linha 1 — Aquisição:** K1, K2 (cards)
2. **Linha 2 — Quiz:** K3, K4, Q1, Q3 (funil + cards)
3. **Linha 3 — Landing/Checkout:** K5, K6, K7, K8, K9 (funil completo)
4. **Linha 4 — Economia:** K10, K11, K12, Q4, Q5 (cards)

**Filtros padrão do dashboard:** período = 7 dias rolling; segmentação por arquétipo (opcional).

---

## Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-05-12 | 1.0 | Documento inicial — 12 KPIs + 5 métricas qualitativas + cadência + integração ACQ-10/DATA-6 | Rodrigo Abib + Claude (Opus 4.7) |

---

**Fim do documento.** Antes de tomar qualquer decisão de campanha, este é o ponto de referência canônico.
