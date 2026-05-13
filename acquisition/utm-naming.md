# UTMs e nomenclatura de campanha — Planner TDAH v1

> **Documento vivo · Versão 1.0 · 2026-05-12**
> **Ticket:** [KAN-41 / ACQ-8](https://the-abib-company.atlassian.net/browse/KAN-41)
> **Status:** Aprovado e em vigor
> **Dependência:** [acquisition/promessa.md](./promessa.md), [acquisition/copy-ads.md](./copy-ads.md), [quiz/coupon.js](../quiz/coupon.js) (helpers captureUtmsFromLocation/getStoredUtms/buildCheckoutUrl)
> **Bloqueia:** KAN-42 (ACQ-9 — subir campanha), KAN-47 (DATA-3 — propagar UTMs até checkout)
> **Fonte de verdade:** este arquivo. URLs do anúncio só são geradas com base nas convenções aqui.

---

## Sumário

1. Objetivo da padronização
2. Os 5 parâmetros UTM e seu significado neste funil
3. Convenções de escrita
4. Catálogo de valores oficiais (Planner TDAH v1)
5. Exemplos de URL completa
6. Como atribuir conversão (UTM → KPI)
7. Erros comuns a evitar
8. Como gerar uma URL nova (passo a passo)
9. Onde os UTMs são processados no código
10. Validação operacional (checklist antes de publicar)

---

## 1. Objetivo da padronização

UTMs são a camada mínima de rastreio entre anúncio, quiz, landing, checkout e
PostHog. Sem um padrão consistente, os dados ficam fragmentados: a mesma origem
aparece com nomes diferentes, criativos deixam de ser comparáveis e a leitura de
públicos vira trabalho manual.

Este documento define os valores oficiais para que a performance possa ser
comparada por plataforma, campanha, criativo e público. A consequência prática é
conseguir medir CAC e ROAS por agrupamento, especialmente em `utm_content` e
`utm_term`, sem depender de interpretação posterior.

O padrão aqui é entrada obrigatória para ACQ-9 (subir campanha) e DATA-3
(propagar UTMs até checkout). Qualquer URL criada fora desta convenção deve ser
corrigida antes de entrar no Gerenciador de Anúncios da Meta.

---

## 2. Os 5 parâmetros UTM e seu significado neste funil

| Parâmetro | Valor possível | Significado neste funil | Exemplo |
|---|---|---|---|
| `utm_source` | `instagram` \| `facebook` | Plataforma de origem do clique. | `instagram` |
| `utm_medium` | `paid` \| `organic` | Tipo de tráfego: mídia paga ou canal orgânico. | `paid` |
| `utm_campaign` | Nome fixo da campanha | Identifica o lançamento, fase ou teste em execução. | `quiz-tdah-v1-soft-launch` |
| `utm_content` | ID curto do criativo | Identifica hook, visual, formato e versão do anúncio. | `static-a-hook1` |
| `utm_term` | ID curto do público | Identifica segmentação, lookalike, retargeting ou audiência orgânica. | `interest-tdah-25-45` |

---

## 3. Convenções de escrita

- Usar kebab-case: palavras separadas por hífen `-`.
- Usar sempre minúsculas.
- Não usar acentos nem cedilha: `tdah` em vez de `tdáh`; `nomade` em vez de `nômade`.
- Não usar espaços, underscores ou caracteres especiais: apenas letras `a-z`, dígitos `0-9` e hífen.
- Respeitar máximo de 50 caracteres por parâmetro.
- Números são permitidos: `v1`, `v2`, `hook1`, `25-45`.
- Não usar nome do arquétipo do produto em `utm_content`: `utm_content` descreve o anúncio, não o resultado do quiz.
- Não alterar valores já publicados em anúncios ativos; criar uma nova variação quando precisar medir algo diferente.

---

## 4. Catálogo de valores oficiais (Planner TDAH v1)

### 4.1 Campanhas (`utm_campaign`)

| Valor | Quando usar |
|---|---|
| `quiz-tdah-v1-soft-launch` | Soft launch inicial (D12-D15 do roadmap). |
| `quiz-tdah-v1-escala` | Após ROAS positivo no soft launch, escala de orçamento. |
| `quiz-tdah-v1-retarget` | Campanha de retargeting: audiência que já interagiu com o funil. |
| `quiz-tdah-v1-organico` | Links orgânicos, como bio do Instagram, post no feed ou stories sem mídia paga. |

### 4.2 Criativos (`utm_content`)

Padrão: `<formato>-<framing>-<variacao>`.

| Parte | Valores oficiais | Observação |
|---|---|---|
| `formato` | `static`, `reels`, `carousel` | Formato do criativo na Meta. |
| `framing` | `a`, `b`, `c` | Mapeado de `promessa.md` §2: A identificação, B funcional, C curiosidade. |
| `variacao` | `hook1`, `hook2`, `hook3`, `v1`, `v2`, `v3`, `1`, `2`, `3` | Usar `hook#` para estáticos, `v#` para vídeo/reels e `1/2/3` para sequências de carrossel. |

Exemplos oficiais para v1:

| Valor | Interpretação |
|---|---|
| `static-a-hook1` | Estático, Framing A, hook 1. |
| `static-a-hook2` | Estático, Framing A, hook 2. |
| `static-b-hook1` | Estático, Framing B, hook 1. |
| `static-b-hook2` | Estático, Framing B, hook 2. |
| `static-c-hook1` | Estático, Framing C, hook 1. |
| `static-c-hook2` | Estático, Framing C, hook 2. |
| `reels-a-v1` | Reels, Framing A, versão 1. |
| `reels-b-v1` | Reels, Framing B, versão 1. |
| `reels-b-v2` | Reels, Framing B, versão 2. |
| `reels-c-v1` | Reels, Framing C, versão 1. |
| `carousel-a-1` | Carrossel, Framing A, sequência 1. |
| `carousel-b-1` | Carrossel, Framing B, sequência 1. |
| `carousel-c-1` | Carrossel, Framing C, sequência 1. |

### 4.3 Públicos (`utm_term`)

| Valor | Significado |
|---|---|
| `interest-tdah-25-45` | Interesse em TDAH, 25-45 anos. |
| `interest-produtividade-25-45` | Interesse em produtividade/organização, 25-45 anos. |
| `interest-neurodivergencia-25-45` | Interesse em neurodivergência, 25-45 anos. |
| `lookalike-1pct-quiz` | Lookalike 1% baseado em quem completou o quiz. |
| `lookalike-1pct-compra` | Lookalike 1% baseado em compradores; usar após primeiras vendas. |
| `retarget-quiz-iniciou` | Visitou o quiz, mas não completou. |
| `retarget-quiz-completou` | Completou o quiz, mas não comprou. |
| `retarget-landing-viewed` | Visitou a landing, mas não clicou no CTA. |
| `audiencia-organica` | Audiência orgânica do Instagram ou Facebook. |

---

## 5. Exemplos de URL completa

1. Framing A, estático, hook1, interesse TDAH:

```text
https://seudominio.com.br/?utm_source=instagram&utm_medium=paid&utm_campaign=quiz-tdah-v1-soft-launch&utm_content=static-a-hook1&utm_term=interest-tdah-25-45
```

2. Framing B, reels, v2, lookalike quiz:

```text
https://seudominio.com.br/?utm_source=instagram&utm_medium=paid&utm_campaign=quiz-tdah-v1-soft-launch&utm_content=reels-b-v2&utm_term=lookalike-1pct-quiz
```

3. Framing C, carrossel, sequência 1, retargeting landing:

```text
https://seudominio.com.br/?utm_source=facebook&utm_medium=paid&utm_campaign=quiz-tdah-v1-retarget&utm_content=carousel-c-1&utm_term=retarget-landing-viewed
```

4. Orgânico: post no Instagram, sem mídia paga:

```text
https://seudominio.com.br/?utm_source=instagram&utm_medium=organic&utm_campaign=quiz-tdah-v1-organico&utm_content=post-feed-1&utm_term=audiencia-organica
```

---

## 6. Como atribuir conversão (UTM → KPI)

Cada parâmetro responde uma pergunta operacional diferente. A análise deve cruzar
UTMs com os KPIs de [`data/kpis.md`](../data/kpis.md), especialmente CAC e ROAS
por agrupamento.

| UTM | Pergunta respondida | Uso na decisão |
|---|---|---|
| `utm_source` | O clique veio de Instagram ou Facebook? | Comparar plataforma de origem e custo por resultado. |
| `utm_campaign` | Qual fase do lançamento gerou a conversão? | Manter série histórica por soft launch, escala, retargeting ou orgânico. |
| `utm_content` | Qual hook, visual e formato gerou o resultado? | Medir hook × visual; entrada do critério ACQ-10 de pausar criativo se CTR < 0.8% por 3 dias. |
| `utm_term` | Qual público converteu melhor? | Medir segmentação; entrada do critério ACQ-10 para escalar lookalike vencedor. |
| `utm_medium` | Foi mídia paga ou orgânica? | Separar CAC/ROAS de tráfego pago da leitura de canal orgânico. |

O ciclo fecha quando a compra confirmada recebe os mesmos UTMs capturados no topo
do funil. O webhook Kiwify previsto em COMMERCE-5 (KAN-32) deve reenviar esses
campos ao PostHog no evento `purchase_confirmed`, permitindo relacionar anúncio,
quiz, landing, checkout e compra em uma mesma jornada.

---

## 7. Erros comuns a evitar

- Misturar maiúsculas e minúsculas: `Instagram` e `instagram` viram valores diferentes na Meta.
- Usar espaços, acentos ou cedilha: isso quebra leitura de URL e o PostHog não normaliza automaticamente.
- Mudar `utm_campaign` no meio de um teste: a série histórica do PostHog fica fragmentada.
- Esquecer `utm_term`: sem ele, não há análise por público.
- Duplicar parâmetro na mesma URL: em `?utm_source=instagram&utm_source=facebook`, só um valor prevalece.
- Misturar `paid` e `organic` com o mesmo `utm_campaign`: usar `quiz-tdah-v1-organico` para orgânico.
- Usar nome do arquétipo do produto em `utm_content`: arquétipo é resultado do quiz, não dado do anúncio.
- Esquecer de aplicar UTMs no link orgânico em bio do Instagram.
- Reaproveitar `utm_content` entre criativos diferentes: isso apaga a comparação entre versões.

---

## 8. Como gerar uma URL nova (passo a passo)

1. Identificar o framing: A, B ou C, conforme [`promessa.md` §2](./promessa.md#2-3-framings-alternativos-para-ab).
2. Identificar o formato e a variação do criativo: `static`, `reels` ou `carousel`, mais `hook#`, `v#` ou sequência.
3. Identificar o público-alvo e selecionar o valor de `utm_term` no catálogo da §4.3.
4. Identificar a campanha: usar uma única `utm_campaign` por fase do lançamento.
5. Identificar plataforma e tipo: `utm_source` + `utm_medium`.
6. Montar a URL em kebab-case, em minúsculas e sem espaços.
7. Validar contra o checklist da §10.
8. Subir no Gerenciador de Anúncios da Meta no campo "URL do site".

---

## 9. Onde os UTMs são processados no código

- [`quiz/coupon.js:88`](../quiz/coupon.js#L88) — `buildCheckoutUrl(baseUrl, { session, utms })` monta a URL do checkout e anexa cupom e UTMs.
- [`quiz/coupon.js:108`](../quiz/coupon.js#L108) — `UTM_KEYS` define as 5 chaves capturadas: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
- [`quiz/coupon.js:110`](../quiz/coupon.js#L110) — `captureUtmsFromLocation()` lê `window.location.search` e persiste os valores em `localStorage`.
- [`quiz/coupon.js:125`](../quiz/coupon.js#L125) — a chave de storage usada é `quizUtmParams`.
- [`quiz/coupon.js:133`](../quiz/coupon.js#L133) — `getStoredUtms()` retorna o objeto salvo para uso posterior na landing.
- [`quiz/components/Quiz.jsx:560`](../quiz/components/Quiz.jsx#L560) — `utmsCapturedRef` impede captura duplicada no mesmo mount.
- [`quiz/components/Quiz.jsx:564`](../quiz/components/Quiz.jsx#L564) — `useEffect` no mount chama `captureUtmsFromLocation()` uma vez.
- [`quiz/components/Landing.jsx:285`](../quiz/components/Landing.jsx#L285) — `CtaSection` recebe `utms` junto com `arc` e `session`.
- [`quiz/components/Landing.jsx:290`](../quiz/components/Landing.jsx#L290) — `buildCheckoutUrl` monta o link final da Kiwify com sessão e UTMs.
- [`quiz/components/Landing.jsx:389`](../quiz/components/Landing.jsx#L389) — `useState(() => getStoredUtms())` recupera UTMs persistidos.
- [`quiz/components/Landing.jsx:429`](../quiz/components/Landing.jsx#L429) — `Landing` passa `utms` para `CtaSection`.
- DATA-2 (KAN-46 — em andamento) plugará `posthog.capture` e enriquecerá payloads com UTMs.
- DATA-3 (KAN-47 — em andamento) garantirá captura e propagação completa até checkout.
- COMMERCE-5 (KAN-32 — pendente humano-Kiwify) configurará webhook do Kiwify para reenviar UTMs em `purchase_confirmed` ao PostHog.

---

## 10. Validação operacional (checklist antes de publicar)

- [ ] URL respeita kebab-case e minúsculas.
- [ ] Os 5 UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) estão presentes.
- [ ] `utm_campaign` é idêntico em todos os criativos da mesma campanha.
- [ ] `utm_content` é único por criativo e não se repete entre variações de hook.
- [ ] `utm_term` é único por público.
- [ ] URL passa em <https://ga-dev-tools.web.app/campaign-url-builder/> ou parser equivalente.
- [ ] URL aponta para o domínio definitivo após FUNNEL-7 / KAN-19.
- [ ] URL foi testada manualmente em modo anônimo.
- [ ] Ao chegar no quiz, DevTools → console confirma que `localStorage.getItem('quizUtmParams')` retorna JSON com os 5 valores.
- [ ] Anúncio foi aprovado pela Meta antes do start.

---

## Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-05-12 | 1.0 | Documento inicial — padronização dos 5 UTMs + catálogo de valores v1 + checklist operacional | Rodrigo Abib + Codex |

---

**Fim do documento.** Qualquer ticket de aquisição que monte uma URL de anúncio (ACQ-2 a ACQ-9) deve referenciar este arquivo no critério de aceite.
