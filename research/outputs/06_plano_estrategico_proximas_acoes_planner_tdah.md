# Plano Estratégico de Próximas Ações - Planner TDAH

> **Projeto:** `planner-tdah`
> **Data:** 2026-06-10
> **Ticket:** Planejamento estratégico / sem ticket Jira atribuído (origem: `prompts/claude-fable-5-plano-estrategico-proximas-acoes.prompt.md`)
> **Objetivo do documento:** consolidar, com evidência rastreável, o estado real do funil, cruzá-lo com a pesquisa Reddit e produzir um backlog priorizado e executável que leve o projeto do estado atual até o soft launch com tráfego pago.
> **Escopo:** produto (planner/PDF), quiz, landing, UX/UI, funil, checkout, analytics, legal, Jira/GitHub, pesquisa.
> **Fontes principais:** `foundation/*`, `docs/backlog-funil-vendas-2026-05-11.md`, `research/outputs/00–05` + 3 CSVs consolidados, `product/planner-structure.md` + `product/content/`, `quiz/` (código completo), `audits/*`, `acquisition/*`, `data/kpis.md`, `design/design-system-planner-tdah.md`, Jira KAN (130 issues via JQL), git log local. Validações executadas nesta sessão: `vite build` ✅ (2.21s), `score-archetype-paths.js` ✅ (6/6), grep de placeholders ✅.
> **Não escopo / não validado:** nenhuma mudança de produto/quiz/landing/copy foi implementada; API do GitHub inacessível nesta sessão (evidência de PRs veio do git log local); auditoria axe-core navegada não foi re-executada após as mudanças de D3–D6; conteúdo de `.env`/`.env.local` não inspecionado (sensível); `quiz/quiz-tdah-especificacao-completa.md` lido apenas via auditorias derivadas.

---

## Sumário

1. [Resumo executivo](#1-resumo-executivo)
2. [Estado atual confirmado](#2-estado-atual-confirmado)
3. [Principais dores e sentimentos do público](#3-principais-dores-e-sentimentos-do-público)
4. [Matriz dor × cobertura atual × lacuna × ação](#4-matriz-dor--cobertura-atual--lacuna--ação)
5. [Auditoria do quiz](#5-auditoria-do-quiz)
6. [Auditoria da landing](#6-auditoria-da-landing)
7. [Auditoria do planner/PDF](#7-auditoria-do-plannerpdf)
8. [Auditoria UX/UI e design system](#8-auditoria-uxui-e-design-system)
9. [Funil, checkout, analytics e readiness para tráfego pago](#9-funil-checkout-analytics-e-readiness-para-tráfego-pago)
10. [Backlog estratégico priorizado](#10-backlog-estratégico-priorizado)
11. [Plano de execução por fases](#11-plano-de-execução-por-fases)
12. [Tickets Jira sugeridos ou atualizações sugeridas](#12-tickets-jira-sugeridos-ou-atualizações-sugeridas)
13. [Handoffs recomendados para próximos agentes](#13-handoffs-recomendados-para-próximos-agentes)
14. [Validações necessárias por tipo de mudança](#14-validações-necessárias-por-tipo-de-mudança)
15. [Riscos, trade-offs e decisões que exigem humano](#15-riscos-trade-offs-e-decisões-que-exigem-humano)
16. [Apêndice de evidências](#16-apêndice-de-evidências)
17. [Histórico de revisões](#17-histórico-de-revisões)

---

## 1. Resumo executivo

**O frontend do funil está pronto e validado. O que bloqueia o tráfego pago hoje é quase inteiramente trabalho humano-only ou humano+IA dirigida — não código.**

Estado em uma frase: quiz (15 perguntas, scoring 6/6, a11y, gamificação), landing por arquétipo (10 seções + seção de método), cupom 24h timestamp-based, página /obrigado, PostHog SDK + 13 eventos + UTMs estão implementados, commitados e com 23 tickets já aprovados como Concluído no Jira. O build passa e o scoring valida 6/6 nesta data.

**O que fazer primeiro (ordem recomendada):**

1. **Destravar a cadeia Kiwify** (humano): KAN-29 (produto) → KAN-30 (cupom QUIZ24H) → KAN-31 (entrega). A conta já existe (KAN-28 Concluído). Sem isso, o CTA da landing aponta para `https://pay.kiwify.com.br/PLACEHOLDER` (`quiz/data/archetypes.js:211`) e o funil não vende.
2. **Decidir 2 conflitos de escopo** (humano, ~30 min de decisão): (a) o bônus "Comece em 15 minutos" é **prometido** na oferta (§3.2) e na landing (`LANDING_BENEFITS`, FAQ), mas o ticket KAN-27 é P2 e nada foi produzido — vender sem ele é promessa não cumprida; (b) o e-mail D+1 de onboarding é prometido na oferta (§3.3) e não há ferramenta de e-mail definida. Ver seção 15.
3. **Finalizar o PDF** (humano+IA): KAN-24 (design, Em andamento, design system pronto em `design/design-system-planner-tdah.md`) → KAN-25 (exportar e subir 7 PDFs), incluindo o capítulo novo "Modo Recomeço" (KAN-130).
4. **Executar as correções P0 baratas de código** (Claude Code, ~1 sessão): remover nota de placeholder visível em `/obrigado`, alinhar disclaimers ao texto/posição canônicos de `posicionamento-etico.md` §4.5, adicionar rodapé legal no quiz, e — quando os dados chegarem — renderizar os documentos legais reais nas 3 rotas (hoje são páginas "PLACEHOLDER · FOUNDATION-3" visíveis ao usuário, violando o critério L3 do gate).
5. **Domínio + deploy + chave PostHog produção** (humano): KAN-19 e a parte humana de KAN-45.
6. Só então: webhook (KAN-32), Pixel/CAPI (KAN-40), criativos (KAN-35/36), 3 compras de teste (KAN-33) e gate (KAN-44).

**Sobre a pesquisa:** o discovery Reddit (2.252 registros, outputs 00–05) já produziu o ajuste de maior valor — o capítulo "Modo Recomeço" + banco de micro-ações + `METHOD_PILLARS` na landing (KAN-130, Concluído). Os 5 cards de síntese restantes (KAN-125–129) **não foram executados** e seus outputs prometidos (06–10) não existem; recomenda-se fechá-los com escopo reduzido ou descopá-los formalmente (seção 15, decisão D4). A cobertura do produto contra as dores priorizadas é boa (seção 4): nenhuma lacuna de pesquisa bloqueia o soft launch.

---

## 2. Estado atual confirmado

### 2.1 Código e artefatos (evidência direta: arquivos lidos + validações executadas nesta sessão)

| Área | Estado | Evidência |
|---|---|---|
| Rotas Vite + react-router | ✅ Completo | `quiz/main.jsx` — 6 rotas + fallback `*` → `/` |
| Quiz (15 Q, scoring, marcos, radar) | ✅ Completo, scoring 6/6 | `quiz/components/Quiz.jsx`; `score-archetype-paths.js` rodado em 2026-06-10: 6/6, 0 falhas |
| Landing por arquétipo (7 slugs) | ✅ Completo | `quiz/components/Landing.jsx` — Hero, YouAreLike, Cost, Proposal, Method, Benefits, Guarantee, FAQ, CTA, Disclaimer |
| Cupom 24h timestamp-based | ✅ Completo | `quiz/coupon.js` — localStorage, sem reset em reload, expiração honesta |
| Página /obrigado | ⚠️ Completo com ressalva | `quiz/components/Obrigado.jsx:131` exibe nota de placeholder ao usuário final |
| Rotas legais (3) | ❌ Placeholder visível | `Termos.jsx`/`Privacidade.jsx`/`Reembolso.jsx` renderizam "PLACEHOLDER · FOUNDATION-3" |
| Checkout | ❌ Placeholder | `quiz/data/archetypes.js:211` — `https://pay.kiwify.com.br/PLACEHOLDER` |
| PostHog SDK + eventos | ✅ Código completo; ❌ chave de produção pendente | `quiz/main.jsx` — init condicionado a `VITE_POSTHOG_KEY`; 8 eventos quiz + 5 landing + `thank_you_viewed` + `app_boot` |
| UTM capture → checkout | ✅ Completo | `quiz/coupon.js` (`captureUtmsFromLocation`, `buildCheckoutUrl`) |
| Conteúdo BASE do planner | ✅ 14 capítulos, 52-53 págs | `product/content/base/` (00–13, inclui `12-modo-recomeco.md`) |
| Variantes por arquétipo | ✅ 7 × 3 arquivos | `product/content/variants/` |
| Design system do PDF | ✅ Documentado; execução em andamento | `design/design-system-planner-tdah.md` ("Sistema Aurora de Retomada"); KAN-24 Em andamento |
| Docs legais (conteúdo) | ✅ Escritos; ❌ placeholders `[NOME, CPF, ...]` | `foundation/legal/*` + README com lista de campos |
| Build | ✅ | `npx vite build` 2026-06-10: ✓ built in 2.21s (warning conhecido: chunk > 500 kB) |

### 2.2 Jira (consulta JQL em 2026-06-10, 130 issues)

| Grupo | Status |
|---|---|
| **Concluído (24)** | KAN-7, 8, 10, 11, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 28, 34, 38, 41, 43, 45, 46, 47, 48, 49, 130 |
| **Em análise (2)** | KAN-9 (legal — aguarda placeholders), KAN-124 (fechamento do corpus) |
| **Em andamento (3)** | KAN-24 (design PDF), KAN-125, KAN-126 (discovery — sem outputs produzidos) |
| **Pendente — P0 humano-only** | KAN-19 (domínio/deploy, subtarefas 51–54), KAN-29/30/31 (Kiwify), KAN-25 (export PDFs, subtarefas 59–62), KAN-33 (3 compras), KAN-44 (gate, subtarefas 114–118), KAN-42 (campanha) |
| **Pendente — P0 misto** | KAN-40 (Pixel Meta + CAPI, subtarefas 106–109) |
| **Pendente — P1 agente** | KAN-32 (webhook, agent-claude-code), KAN-50 (dashboard PostHog, agent-codex) |
| **Pendente — P1/P2 humano-IA** | KAN-26 (e-mails), KAN-35/36/37 (criativos), KAN-27 (bônus), KAN-12 (FOUNDATION-6) |
| **Discovery pendente** | KAN-127, 128, 129 (e 125/126 em andamento sem entrega) |

Observações relevantes descobertas nesta sessão:
- **KAN-28 (conta Kiwify) está Concluído** — a memória do projeto ainda o listava como pendente. A cadeia COMMERCE está destravada para o humano configurar produto/cupom/entrega.
- O board ganhou **72 subtarefas (KAN-51–122)** quebrando os tickets humano-only em passos pequenos — bom para execução dirigida.
- Os handoffs de KAN-125–129 referenciam outputs `06_revisao_qualitativa…`, `07_revisao_arquetipos…`, `09_validacao_produto…`, `10_backlog_derivado…` que **não existem** em `research/outputs/` (verificado por glob). Este documento ocupa o número 06 com outro propósito; se KAN-125 for executado, renomear o output dele (ver seção 12).

### 2.3 Git/GitHub

- Branch `main` sincronizada com `origin/main`; working tree limpa exceto 2 prompts não versionados em `prompts/`.
- Últimos marcos: `9fcf369` (KAN-130), `d1f4df7`/`3b99bc3` (KAN-124, PR #2), `589c24a` (PR #1), `b6273d9` (KAN-24 design system), `a9f2246` (D5 analytics).
- **Lacuna:** `gh api` falhou por rede nesta sessão; estado de PRs abertas não confirmado (inferência a partir do git log: nenhuma pendente, últimos merges são #1 e #2).

---

## 3. Principais dores e sentimentos do público

Fonte primária: `research/outputs/01_mapa_qualitativo_dores_reddit.md` e `03_matrizes_estrategicas_planner_tdah.md` (corpus congelado de 2.252 registros, 18 subreddits — ver `00_corpus_manifest.md`). Classificação heurística de discovery, **não evidência clínica**.

### 3.1 Dores priorizadas (frequência × relevância média)

| # | Dor | Registros | Relev. média | Leitura estratégica |
|---|---|---:|---:|---|
| 1 | Função executiva / organização externa | 768 | 27.9 | Dor guarda-chuva: o planner é a "memória externa". Sustenta a promessa central. |
| 2 | Impulsividade e decisões rápidas | 240 | 20.6 | Sustenta variante Reator (speed bumps). |
| 3 | Cegueira temporal, atrasos e prazos | 170 | 38.6 | Alta intensidade. Cobertura atual é a mais frágil (ver §4). |
| 4 | Rotinas rígidas que quebram quando um dia falha | 127 | **43.2** | Maior intensidade do corpus. Diretamente respondida pelo Modo Recomeço (KAN-130). |
| 5 | Excesso de ideias e projetos pela metade | 125 | 24.7 | Sustenta captura rápida + variante Arquiteto. |
| 6 | Bagunça visual, estética e legibilidade | 112 | 39.6 | Recai sobre o **design do PDF** (KAN-24) — ainda não entregue. |
| 7 | Esquecimento / fora do campo visual | 98 | 42.6 | Sustenta âncoras visuais (variante Nômade + Modo Recomeço §6). |
| 8 | Motivação, novidade e dopamina | 75 | 25.5 | "Novidade acaba" (41 registros de falha) — mitigada por checkpoints leves, não por streaks. |
| 9 | Sobrecarga cognitiva / excesso de etapas | 74 | 43.1 | Exige baixa densidade por página no design do PDF. |
| 10 | Priorização / decisão do que fazer primeiro | 50 | 36.3 | Sustenta "até 3 prioridades" (`METHOD_PILLARS`). |

### 3.2 Por que as soluções anteriores falharam (motivos de falha classificados)

| Motivo de falha | Registros | Implicação para o produto |
|---|---:|---|
| Setup vira procrastinação | **361** | Onboarding de 15 min precisa ser real (e o bônus prometido precisa existir). |
| Rígido demais | 202 | Templates sem data fixa, dias puláveis, versão mínima de todo ritual. ✅ coberto no BASE. |
| Fora do campo visual | 125 | Instrução de posicionamento físico — coberta na variante Nômade e Modo Recomeço §6. |
| Manutenção alta / complexo demais | 102 | "Estrutura suficiente, não perfeita" — perfil manutenção. ✅ |
| Branco demais / novidade acaba | 85 | Recai sobre design (KAN-24): páginas com entrada óbvia, sem decoração excessiva. |
| Culpa após falha | 39 | Modo Recomeço + linguagem anti-culpa. ✅ |

### 3.3 Emoções dominantes

`esperanca_alivio` (982) e `curiosidade_busca` (483) dominam sobre `frustracao` (246) e `culpa_vergonha` (91). Implicação de copy: o tom atual (acolhimento + caminho concreto, sem exploração de vergonha) está alinhado com o que o público expressa — manter; não migrar para copy de dor agressiva.

---

## 4. Matriz dor × cobertura atual × lacuna × ação

Status: `OK` / `Parcial` / `Lacuna` / `Risco` / `Sem evidência suficiente`.

| Dor (registros) | Quiz | Planner | Landing | Cobertura geral | Ação (→ §10) |
|---|---|---|---|---|---|
| Função executiva (768) | OK — 5 dimensões mapeadas | OK — rituais + templates + captura | OK — promessa + método | **OK** | — |
| Rotina rígida quebra (127) | Parcial — Q14 capta | OK — Modo Recomeço + dias mínimos | OK — pilar "Modo Recomeço" | **OK** | — |
| Setup vira procrastinação (361 falhas) | OK — quiz de 5 min | Parcial — cap. 03 interno existe; **bônus prometido não existe** | Risco — landing promete bônus | **Risco** | A-04 (decisão bônus) |
| Cegueira temporal (170) | OK — Q de tempo | **Parcial** — âncoras temporais só na variante Nômade; templates diários não auditados quanto a time-anchors | Parcial | **Parcial** | B-06 (análise templates) |
| Excesso de ideias (125) | OK — Q6 | OK — captura + banco + variante Arquiteto | OK — pilar captura | **OK** | — |
| Bagunça visual (112) | OK — dark mode limpo | **Lacuna** — depende do design do PDF não finalizado | OK | **Lacuna** | A-03 (KAN-24/25) |
| Fora do campo visual (98) | — | OK — variante Nômade + Recomeço §6 | OK — bridge Nômade | **OK** | — |
| Novidade acaba (75/41) | OK — gamificação única | Parcial — checkpoint semanal leve; sem mecanismo de novidade pós-compra | Parcial | **Parcial** | C-04 (e-mail D+1) |
| Sobrecarga cognitiva (74) | OK — 1 pergunta/tela | OK no texto; **a confirmar no design** (densidade por página) | OK | **Parcial** | A-03 (critério de aceite do design) |
| Priorização (50) | — | OK — 1-3 prioridades + versão mínima | OK — pilar 1 | **OK** | — |
| Culpa/vergonha (13+39 falhas) | OK — microvalidações anti-culpa | OK — Recomeço, permissões explícitas | OK — "não foi falta de disciplina sua" | **OK** | — |
| Burnout/máscara (14) | OK — Q15 + Camaleão | OK — variante Camaleão (check-in energia, expectativa absorvida) | OK | **OK** | — |
| "Planner perfeito" como hiperfoco (16) | — | Parcial — implícito no tom; sem aviso direto | Parcial — FAQ não endereça | **Parcial** | D-02 (v1.5, copy) |
| Estética que distrai (112, sub-tema) | OK | Sem evidência suficiente — design não existe para auditar | OK | **Sem evidência** | A-03 |

**Conclusão da matriz:** nenhuma lacuna é de conteúdo editorial — as três células vermelhas (`Risco`/`Lacuna`) apontam para o mesmo gargalo: **finalizar design+export do PDF e honrar o bônus prometido**. A pesquisa não pede mais produto; pede entrega do que já foi especificado.

---

## 5. Auditoria do quiz

Base: leitura integral de `quiz/components/Quiz.jsx` (2026-06-10) cruzada com `audits/quiz-tdah-v1_1-handoff.md` (2026-05-04), `audits/ux-ui-adhd-funnel-audit-2026-05-09.md` e memória de implementação de 2026-05-10.

### 5.1 O que está comprovadamente resolvido (evidência: código atual)

| Achado histórico | Estado atual | Evidência |
|---|---|---|
| AUD-001 CTA placeholder `seusite.com.br` | ✅ Resolvido — `<Link>` interno para `/planner/:slug` | `Quiz.jsx:502-515` |
| AUD-003 Voltar corrompe XP/eventos | ✅ Resolvido — `xpDeltaRef` por pergunta, reanswer não refira evento | `Quiz.jsx:619-671` |
| AUD-004/005 scoring sem cap / radar `/11` | ✅ Resolvido — `DIM_MAX` + denominador por dimensão | `Quiz.jsx:124-135, 424-430` |
| AUD-006 Marco 2 `6/5` impossível | ✅ Resolvido — radar parcial com `partialMax={D:7,H:6,I:6}` e clamp | `Quiz.jsx:316-347` |
| AUD-010 prova social falsa | ✅ Resolvido — removida do quiz e omitida deliberadamente na landing | `Landing.jsx:572` (comentário) |
| AUD-011/012 teclado/landmarks | ✅ Resolvido — autofocus primeira opção (KAN-18), `<main>`, H1 `.vh`, skip-link | `Quiz.jsx:246-258, 729-734` |
| AUD-009 analytics incompletos | ✅ Resolvido — sessionId + UTMs + viewport enriquecidos em `main.jsx`; abandono com dedup + timer 30s | `main.jsx:86-113`, `Quiz.jsx:570-596` |
| Headline diagnóstica | ✅ Resolvido — "Como sua atenção funciona?" | `Quiz.jsx:184-187` |
| Copy ética por arquétipo | ✅ Revisada em KAN-130 ("diagnosticado"/"sintoma" removidos do Camaleão) | `quiz/data/archetypes.js` |

### 5.2 Pendências residuais do quiz

| # | Item | Severidade | Detalhe |
|---|---|---|---|
| Q-1 | **Disclaimer do resultado: posição e texto não-canônicos** | P1 (barato) | `posicionamento-etico.md` §4.5 exige "Esse resultado é um mapeamento de padrão de atenção, não um diagnóstico…" **acima do CTA**. Atual: texto diferente, **abaixo** do CTA (`Quiz.jsx:516-518`). |
| Q-2 | **Rodapé do quiz sem links legais** | P1 (barato) | Critério de KAN-9 e gate L1: links Termos/Privacidade/Reembolso "no rodapé da landing **e do quiz**". A rota `/` não os exibe (verificado em `Quiz.jsx` — ausentes). |
| Q-3 | Auditoria axe-core navegada não re-executada pós-D3–D6 | P1 (validação) | Última rodada full foi 2026-05-09, antes de Landing/MethodSection/CouponCountdown. Tokens atuais (`#897FC0` sobre `#0A0818`) não verificados. |
| Q-4 | Card de compartilhamento visual (AUD-015) | P3 | `navigator.share` simples; spec pedia card com radar. Não bloqueia. |
| Q-5 | Quiz não capta "custo de manutenção"/"retomada pós-falha" como pergunta dedicada | P3 (v1.5) | Recomendação do output 04 §5. Mexer em `Q` exige revalidação completa do scoring — não fazer antes do soft launch. |

**Ponte quiz → landing:** sólida. CTA preserva estado (Link interno), cupom é gerado em `onProcDone` antes do `result_viewed`, UTMs persistem em localStorage, slug `manutencao` cobre lowSeverity. Sem ação necessária.

---

## 6. Auditoria da landing

Base: leitura integral de `quiz/components/Landing.jsx`, `quiz/data/archetypes.js`, `CouponCountdown.jsx`.

### 6.1 Pontos fortes (evidência direta)

- **Estrutura completa e coerente por arquétipo:** Hero → reconhecimento ("Você é assim") → custo → proposta (bridge) → método (4 pilares BASE + ajuste por perfil) → benefícios → garantia → FAQ (9 itens honestos, incluindo "O quiz é um diagnóstico? Não.") → CTA com preço → disclaimer + nav legal.
- **Ética por construção:** prova social omitida deliberadamente; cupom com countdown real (`role="timer"`, recálculo por `Date.now()`, sem reset); estado expirado mostra preço cheio sem nova janela artificial; estado sem-quiz oferece link para fazer o quiz.
- **Conexão com a pesquisa:** `METHOD_PILLARS` responde diretamente às 4 features mais pedidas no corpus (baixo atrito 347, captura 276, revisão leve 227, reset sem culpa) — implementado em KAN-130.
- **Analytics:** 5 eventos com guards de disparo único (`lp_viewed`, `lp_scrolled_50/100`, `lp_cta_clicked`, `lp_coupon_expired`).

### 6.2 Pendências da landing

| # | Item | Severidade | Detalhe |
|---|---|---|---|
| L-1 | **CTA aponta para checkout placeholder** | **P0 (humano + código)** | `archetypes.js:211`. Depende de KAN-29; depois trocar a constante (1 linha) e validar `buildCheckoutUrl` com a URL real da Kiwify (formato do parâmetro `coupon` precisa ser confirmado no checkout real). |
| L-2 | **Disclaimer de venda: texto e posição não-canônicos** | P1 (barato, item do gate L2/L4) | §4.5 exige "Produto educacional. Não é substituto de tratamento, terapia ou medicação." **acima do botão de compra**. Atual: `DisclaimerSection` vem **depois** do CTA e com redação diferente (`Landing.jsx:426-446, 574-575`). |
| L-3 | Primeira dobra não sinaliza oferta/preço | P2 (experimento pós-launch) | O preço só aparece no fim. Benchmark K7 (scroll 100% ≥ 30%) é a aposta; se K8 (LP→checkout ≥ 8%) alarmar com K7 baixo, testar âncora "Ver oferta ↓" no hero (espelhando o que o Result já faz). Não mudar antes de ter dados. |
| L-4 | Benefício promete bônus que não existe ainda | **P0 (decisão)** | `LANDING_BENEFITS[4]` + FAQ + `OFFER.deliveryFormat` citam o bônus. Ver decisão D1 (§15). |
| L-5 | Mobile 320px da landing pós-MethodSection sem screenshot registrado | P1 (validação) | Validar junto com Q-3. |

---

## 7. Auditoria do planner/PDF

Base: `product/planner-structure.md` v1.1, leitura de capítulos BASE (README, 03, 12) e variante de amostra (Camaleão 02), README das variantes.

### 7.1 Avaliação

| Critério (prompt §7.6) | Avaliação | Evidência |
|---|---|---|
| Estrutura modular | **OK** — BASE forte (14 caps) + 3-5 págs/arquétipo; matriz completa | `planner-structure.md` §2-4 |
| Sequência dos capítulos | **OK** — identificação → mapa → como usar → 15 min → rituais → templates → capturas → Recomeço → fechamento | idem |
| Excesso de preenchimento | **OK por design** — "preenchimento opcional", versão mínima de cada ritual, dias puláveis | `base/README.md` §2; variante Camaleão |
| Modo Recomeço | **OK, destaque do produto** — 5 passos/10 min, 3 permissões explícitas, template, banco de micro-ações por energia×tempo+contexto | `base/12-modo-recomeco.md` |
| Micro-ações | **OK** — banco com 15+ ações classificadas | idem §5 |
| Banco de capturas | **OK** | `base/11` + ritual `base/04` |
| Variantes com regra operacional concreta | **OK** — critério "se duas pessoas trocassem os PDFs, perceberiam a diferença de uso" cumprido na amostra lida | `variants/README.md` §2-3; `camaleao-exausto/02` |
| Perfil manutenção | **OK** | `variants/manutencao/` |
| Consistência editorial / risco de prometer demais | **OK** — tom anti-culpa, sem cura/tratamento/diagnóstico | `base/README.md` §2 |
| Clareza Goodnotes/Notability/A4 | **Sem evidência suficiente** — é requisito do design (KAN-24), não do texto | — |
| Design do miolo e capas | **Lacuna (em andamento)** — design system documentado, execução pendente | KAN-24 + subtarefas 55-58 |

### 7.2 Pendências do produto

| # | Item | Severidade |
|---|---|---|
| P-1 | **Design + diagramação + export dos 7 PDFs** (KAN-24 → KAN-25), incluindo o cap. 12 novo no layout (alerta já registrado na memória do projeto) | **P0** |
| P-2 | **Bônus "Comece em 15 minutos" como PDF separado** (KAN-27) — prometido na oferta; conteúdo-fonte já existe (`base/03`), o esforço é diagramar 4-6 págs | **P0 condicionado à decisão D1** |
| P-3 | E-mails D0/D+1 (KAN-26) — D0 a Kiwify cobre nativamente com customização; D+1 exige ferramenta externa (decisão D2) | P1 |
| P-4 | Templates diários: confirmar âncoras temporais/time-blocking leve (cobertura da dor #3) — análise de 1 arquivo (`base/08`) antes do design congelar | P1 (análise rápida) |

---

## 8. Auditoria UX/UI e design system

- **Quiz + landing:** dark mode consistente (#0A0818/#120F2D), tokens AA aplicados no sweep de 2026-05-10, `prefers-reduced-motion` em ambos os arquivos CSS, focus-visible em CTAs e FAQ, skip-links nas duas telas. Estado bom; pendência única é **re-validação instrumentada** (axe + screenshots 320/768) após as mudanças de D3–D6, que nunca rodou de forma navegada (Q-3/L-5).
- **Design system do PDF** (`design/design-system-planner-tdah.md`): direção "Aurora de Retomada" bem fundamentada (WCAG 2.2, COGA, contraste 4.5:1, alvo 24px, página com "entrada óbvia"). É a peça que responde às dores #6 (bagunça visual, 112) e #9 (sobrecarga, 74). **Risco:** é o item de maior esforço restante e está no caminho crítico; o critério de aceite do design deve incluir teste de impressão P&B caseira e abertura em Goodnotes (já previsto na subtarefa KAN-58).
- **Consistência quiz ↔ landing ↔ PDF:** paletas por arquétipo já são canônicas em `archetypes.js` (cores/símbolos espelhados em `planner-structure.md` §4). O design do PDF deve consumir essa mesma tabela — incluir como critério de aceite em KAN-24.
- **Compatibilidade com usuário em sobrecarga:** quiz tem 1 ação por tela e a landing tem 1 CTA; o PDF tem "Modo Recomeço". Avaliação: **OK**, condicionada à execução do design.

---

## 9. Funil, checkout, analytics e readiness para tráfego pago

Leitura do gate ACQ-11 (KAN-44 / `oferta-mvp.md` §8) contra o estado atual:

| Item do gate | Estado | Bloqueio |
|---|---|---|
| F1 mobile real / F2 teclado | 🟡 Implementado; sem evidência registrada em devices reais | Validação (humano + agente) |
| F3 CTA quiz→landing com cupom | ✅ | — |
| F4 landing 7 slugs sem bug | 🟡 Implementado; smoke navegado pendente | Validação |
| F5 cupom timestamp | ✅ código; 🔴 cupom não existe na Kiwify (KAN-30) | Humano |
| F6 /obrigado configurada | 🟡 rota pronta; 🔴 não linkada na Kiwify (KAN-29/72) + nota placeholder visível | Humano + código |
| C1–C4 checkout/PIX/cartão/entrega | 🔴 KAN-29/30/31 pendentes | Humano |
| C5 3 compras de teste | 🔴 KAN-33 | Humano (após C1-C4) |
| T1 Pixel Meta + CAPI | 🔴 KAN-40 (+ KAN-32 para CAPI Purchase) | Misto |
| T2 eventos PostHog quiz | 🟡 código ✅; chave produção pendente (KAN-45 parte humana) | Humano |
| T3 UTMs até purchase_confirmed | 🟡 frontend ✅; depende do webhook (KAN-32) | Agente (após Kiwify) |
| L1 termos publicados + rodapé | 🔴 rotas são placeholders; rodapé ausente no quiz | Humano (dados) + agente |
| L2 disclaimers AA visíveis | 🟡 presentes, mas texto/posição divergem do canônico §4.5 | Agente (barato) |
| L3 sem placeholder em produção | 🔴 3 rotas legais + nota em /obrigado + URL de checkout | Humano + agente |
| L4 copy filtrada | ✅ ads (`copy-ads.md` §6) e landing revisadas; re-checar peça final montada | Validação |
| D1 critério matar/escalar | ✅ `acquisition/decisao-escala.md` aprovado | — |
| D2 saber pausar campanha | 🔴 operacional, junto de KAN-42 | Humano |

**Síntese de readiness: ~40% do gate verde, e nenhum item vermelho é de engenharia frontend.** O caminho crítico de receita é: Kiwify (29→30→31) + PDFs (24→25) + domínio/deploy (19) + legal (9) → 3 compras (33) → Pixel/webhook (40/32) → gate (44) → ads (42).

---

## 10. Backlog estratégico priorizado

> IDs deste plano: `A-xx` = Fase A (destravar), `B-xx` = Fase B (código/validação), `C-xx` = Fase C (montagem), `D-xx` = Fase D (lançamento/pós). Cada item referencia o ticket KAN existente quando há um — **só 4 tickets novos são propostos** (ver §12).

### [P0] A-01 — Configurar produto, cupom e entrega na Kiwify

**Área:** Checkout · **Tipo:** operação · **Agente sugerido:** Humano (Rodrigo) · **Status sugerido:** tickets existentes KAN-29, KAN-30, KAN-31 (subtarefas 70–80 já quebram o passo a passo)

**Dor ou oportunidade:** sem checkout real não há funil — todo o investimento até aqui fica sem retorno mensurável.
**Evidência:** `quiz/data/archetypes.js:211` (placeholder); KAN-28 Concluído (conta existe); gate C1–C4.
**Problema atual:** produto, cupom QUIZ24H e entrega por arquétipo não existem na plataforma.
**Mudança recomendada:** seguir subtarefas KAN-70–80; cadastrar produto único "Planner TDAH — Perfil Personalizado" a R$ 49,90, cupom QUIZ24H de R$ 20, anexar 7 PDFs + bônus com instrução de escolha (modelo de instrução em KAN-79).
**Arquivos prováveis:** nenhum (painel Kiwify); gera insumo para B-01.
**Critérios de aceite:**
- [ ] URL de checkout real abre com R$ 49,90; com `?coupon=QUIZ24H` aplica R$ 29,90
- [ ] Compra teste entrega e-mail com PDFs em < 5 min
- [ ] Página de redirect pós-compra configurada para `/obrigado` do domínio final
**Validações:** teste em aba anônima (KAN-73); print do checkout nos dois preços.
**Riscos e dependências:** formato do parâmetro de cupom na URL da Kiwify pode diferir de `?coupon=` — confirmar e reportar para B-01. Depende de KAN-24/25 apenas para o anexo final (pode ser configurado antes com PDF provisório, mas **não** liberar venda).

### [P0] A-02 — Domínio + deploy de produção (Vercel)

**Área:** Funil · **Tipo:** operação · **Agente sugerido:** Humano + IA dirigida · **Status sugerido:** ticket existente KAN-19 (subtarefas 51–54)

**Dor/oportunidade:** sem domínio não há URL para anúncio, Pixel, Kiwify redirect ou termos legais.
**Evidência:** KAN-19 pendente; stack definida no backlog §8 (Vercel + Registro.br/Namecheap).
**Mudança recomendada:** comprar domínio, conectar repo à Vercel, configurar SPA fallback (rewrites para `index.html` — necessário para rotas `/planner/:slug` em produção), DNS + HTTPS, variáveis `VITE_POSTHOG_KEY`/`VITE_POSTHOG_HOST`.
**Critérios de aceite:**
- [ ] `/`, `/planner/furacao`, `/obrigado`, 3 rotas legais respondem 200 no domínio final (deep-link direto, não só navegação interna)
- [ ] Deploy automático no push para `main`
**Validações:** acesso mobile real; checagem de deep-link (SPA rewrite é o erro clássico aqui).
**Riscos:** propagação DNS (24-48h) — fazer cedo.

### [P0] A-03 — Finalizar design e exportar os 7 PDFs

**Área:** Planner/Design · **Tipo:** design · **Agente sugerido:** Humano + IA dirigida · **Status sugerido:** tickets existentes KAN-24 (Em andamento, subtarefas 55–58) e KAN-25 (subtarefas 59–62)

**Dor/oportunidade:** dores #6 (bagunça visual, 112 reg.) e #9 (sobrecarga, 74 reg.) são respondidas pelo design, não pelo texto; é o item de maior esforço restante no caminho crítico.
**Evidência:** `design/design-system-planner-tdah.md` pronto; `planner-structure.md` v1.1 com 52-53 págs; alerta registrado: **incluir cap. 12 (Modo Recomeço) no layout**.
**Problema atual:** sem PDF final não há produto para entregar nem para fotografar em criativos.
**Mudança recomendada:** executar KAN-55–58 com o design system como fonte; depois KAN-59–62 (export + upload).
**Critérios de aceite:**
- [ ] 7 PDFs A4 com capa por arquétipo usando paleta/símbolo canônicos de `archetypes.js`
- [ ] Cap. 12 presente; densidade por página respeita princípio "entrada óbvia"
- [ ] Teste de impressão P&B caseira + abertura em Goodnotes (KAN-58)
**Validações:** revisão visual humana; checklist do design system §3.
**Riscos:** iteração visual infinita — limitar a 1 iteração por capa (mitigação já prevista no backlog §3); travar conteúdo editorial antes de diagramar (B-06 antes).

### [P0] A-04 — Decidir e resolver o bônus "Comece em 15 minutos"

**Área:** Produto/Oferta · **Tipo:** conteúdo + decisão · **Agente sugerido:** Humano decide; Humano+IA produz · **Status sugerido:** **atualizar ticket existente KAN-27 (hoje P2 — conflita com a oferta)**

**Dor/oportunidade:** "setup vira procrastinação" é o motivo de falha nº 1 do corpus (361 registros); o bônus é a resposta de onboarding e está **prometido** em 3 lugares do funil.
**Evidência:** `oferta-mvp.md` §3.2; `archetypes.js` `LANDING_BENEFITS[4]`, `OFFER.deliveryFormat`, FAQ; `Obrigado.jsx` STEPS[0]; output 05 §5 ("Comece em 15 minutos deve ser prioridade real, não bônus periférico"). KAN-27 está P2 e pendente.
**Problema atual:** vender hoje = promessa não cumprida (risco CDC + reputacional, exatamente o que `posicionamento-etico.md` §1 proíbe).
**Mudança recomendada (opção recomendada):** produzir o bônus derivando de `base/03-comece-em-15-minutos.md` (conteúdo já aprovado) — esforço é diagramação de 4-6 págs dentro do mesmo design system. Alternativa: remover o bônus da oferta/landing/FAQ (mais barato, enfraquece a oferta). **Decisão D1, §15.**
**Critérios de aceite:**
- [ ] Bônus existe como PDF anexado na Kiwify **ou** todas as menções a ele foram removidas de oferta/landing/obrigado/e-mails
**Validações:** grep por "Comece em 15" e "bônus" em `quiz/` + `foundation/` após a decisão.
**Riscos:** esquecê-lo e descobrir via pedido de reembolso.

### [P0] A-05 — Preencher dados legais e publicar os documentos reais nas 3 rotas

**Área:** Legal · **Tipo:** conteúdo + correção · **Agente sugerido:** Humano (dados) + Claude Code (render) · **Status sugerido:** ticket existente KAN-9 (Em análise)

**Dor/oportunidade:** gate L1/L3; LGPD/CDC; confiança do público (criterio de entrada, não diferencial).
**Evidência:** `foundation/legal/README.md` lista os 6 placeholders; `Termos.jsx`/`Privacidade.jsx`/`Reembolso.jsx` renderizam "PLACEHOLDER · FOUNDATION-3" ao usuário (grep 2026-06-10).
**Problema atual:** os textos legais existem e estão bons, mas não chegam ao usuário; as rotas atuais violariam L3 em produção.
**Mudança recomendada:** Rodrigo fornece NOME/CPF/e-mails/cidade/URL; Claude Code substitui os placeholders nos 3 `.md` e converte o conteúdo nos componentes JSX (transcrição direta para JSX — **sem** adicionar `react-markdown`, que exigiria autorização de dependência). Incluir rodapé legal também na rota `/` (quiz) — critério do próprio KAN-9 (ver B-02).
**Critérios de aceite:**
- [ ] 3 rotas renderizam o conteúdo integral, sem `[...]`, com data de vigência
- [ ] Grep por `PLACEHOLDER`/`[NOME`/`TBD` limpo em `quiz/` e `foundation/legal/`
**Validações:** build vite; revisão manual contra os `.md`; mobile 320px.
**Riscos:** publicar com CPF é decisão pessoal — confirmar com Rodrigo o nível de exposição desejado (alternativa: aguardar MEI).

### [P0] A-06 — Chave PostHog de produção

**Área:** Analytics · **Tipo:** operação · **Agente sugerido:** Humano · **Status sugerido:** parte humana do KAN-45 (código já Concluído)

**Evidência:** `main.jsx:57` — init é no-op sem `VITE_POSTHOG_KEY`; sem a chave, T2/T3 do gate ficam vermelhos e o soft launch fica cego.
**Mudança recomendada:** criar projeto PostHog, colar chave em `.env.local` (dev) e nas env vars do Vercel (produção, junto com A-02).
**Critérios de aceite:** evento `app_boot` com `posthogReady: true` visível no PostHog do domínio final.
**Validações:** Live Events no PostHog ao navegar o funil.

### [P0] B-01 — Substituir o checkout placeholder pela URL real

**Área:** Funil · **Tipo:** correção · **Agente sugerido:** Claude Code · **Status sugerido:** novo ticket pequeno (ou critério final de KAN-29) — ver §12

**Evidência:** `archetypes.js:211`; `coupon.js:88-105` (`buildCheckoutUrl`).
**Mudança recomendada:** trocar `kiwifyCheckoutPlaceholder` pela URL real (renomear a chave para `kiwifyCheckoutUrl`); confirmar com A-01 o formato real do parâmetro de cupom da Kiwify e ajustar `buildCheckoutUrl` se necessário; validar que UTMs sobrevivem ao redirect.
**Critérios de aceite:**
- [ ] CTA da landing abre checkout real com cupom aplicado quando sessão válida
- [ ] Com cupom expirado, abre preço cheio sem parâmetro de cupom
**Validações:** build; navegação manual nos 3 estados do cupom (válido/expirado/ausente).
**Riscos e dependências:** bloqueado por A-01.

### [P0] B-02 — Saneamento de placeholders visíveis + disclaimers canônicos + rodapé legal do quiz

**Área:** Quiz/Landing/Copy · **Tipo:** correção · **Agente sugerido:** Claude Code · **Status sugerido:** novo ticket (consolidado) — ver §12

**Dor/oportunidade:** itens L2/L3 do gate; risco regulatório barato de eliminar; público TDAH cético detecta "produto inacabado".
**Evidência:**
- `Obrigado.jsx:128-133` — "(Endereço definitivo será publicado… após FOUNDATION-3 / KAN-9 com placeholders preenchidos.)" visível ao comprador.
- `Landing.jsx:574` — `DisclaimerSection` **depois** do CTA; texto difere do canônico §4.5 ("Produto educacional. Não é substituto de tratamento, terapia ou medicação." **acima do botão de compra**).
- `Quiz.jsx:516-518` — disclaimer do resultado abaixo do CTA; §4.5 pede acima, com redação específica.
- Rota `/` sem links legais no rodapé (gate L1).
**Mudança recomendada:** (1) remover/reescrever a nota de `/obrigado` (apontar para o e-mail de suporte real definido em A-05); (2) inserir a linha canônica de disclaimer imediatamente acima do botão em `CtaSection` (mantendo a `DisclaimerSection` longa no rodapé); (3) idem no `Result` do quiz acima do CTA; (4) adicionar nav legal discreta ao fim do quiz (IntroScreen/Result).
**Critérios de aceite:**
- [ ] Nenhum texto meta/placeholder visível em nenhuma rota
- [ ] Disclaimers com redação da tabela §4.5 nas 4 posições exigidas, contraste ≥ 4.5:1
- [ ] Rodapé legal presente em `/` e `/planner/:slug`
**Validações:** build; grep ético; screenshot 320px das 4 telas; revisão manual contra §4.5.
**Riscos:** nenhum relevante; mudança pequena e isolada.

### [P0] C-01 — 3 compras de teste end-to-end + estorno (GATE)

**Área:** Checkout · **Tipo:** operação/QA · **Agente sugerido:** Humano · **Status sugerido:** ticket existente KAN-33 (subtarefas 85–89)

**Evidência:** gate C5; roteiro já quebrado em subtarefas (caminho feliz, cupom expirado/preço cheio, erro de pagamento).
**Dependências:** A-01, A-02, A-03, B-01.
**Critérios de aceite:** os do ticket + estorno processado validando o ciclo da garantia.

### [P0] C-02 — Pixel Meta + Conversion API

**Área:** Tracking · **Tipo:** tracking · **Agente sugerido:** Humano (Pixel ID, Events Manager) + Claude Code (instalação no site) · **Status sugerido:** ticket existente KAN-40 (subtarefas 106–109)

**Evidência:** gate T1; KAN-40 pendente; CAPI Purchase depende do webhook (C-03).
**Mudança recomendada:** humano cria Pixel ID; Claude instala base code + eventos client-side (`PageView`, `ViewContent` na landing, `InitiateCheckout` no clique do CTA); Purchase via CAPI entra com C-03; validar dedup (event_id) entre Pixel e CAPI.
**Critérios de aceite:** 4 eventos no Events Manager + Purchase dedupado.
**Riscos:** sem CAPI, otimização da campanha fica degradada — não subir ads antes de T1 completo.

### [P1] C-03 — Webhook Kiwify → PostHog (purchase_confirmed) + Meta CAPI

**Área:** Checkout/Analytics · **Tipo:** tracking · **Agente sugerido:** Claude Code · **Status sugerido:** ticket existente KAN-32 (subtarefas 81–84, label agent-claude-code)

**Evidência:** gate T3 e K9–K12 dos KPIs dependem de `purchase_confirmed`; subtarefas já definem contrato → endpoint → PostHog → CAPI.
**Mudança recomendada:** Vercel Serverless Function recebendo webhook da Kiwify (assinatura validada), emitindo `purchase_confirmed` no PostHog com UTMs do payload e Purchase via CAPI com `event_id` compartilhado com o Pixel.
**Critérios de aceite:** compra de teste gera 1 evento PostHog + 1 Purchase CAPI dedupado, com UTMs.
**Dependências:** A-01 (webhook configurável no painel), A-02 (URL pública), C-02 (Pixel ID/token).
**Riscos:** cold start (mitigação: testar cedo; alternativa Pipedream já mapeada no backlog §3).

### [P1] C-04 — E-mails D0 + D+1 (e decisão de ferramenta)

**Área:** Produto/Onboarding · **Tipo:** conteúdo + operação · **Agente sugerido:** Humano + IA dirigida · **Status sugerido:** ticket existente KAN-26 (subtarefas 63–66) — **precisa da decisão D2 (§15)**

**Dor/oportunidade:** dor #8 ("novidade acaba", 41 falhas) — o D+1 é o único mecanismo pós-compra de reengajamento da v1; e o D0 lembra a garantia (exigência da oferta §6).
**Evidência:** oferta §3.3 promete os dois e-mails; nenhuma ferramenta de e-mail definida (backlog §10.4 deixou para depois).
**Mudança recomendada:** D0 via template customizado da própria Kiwify (sem ferramenta nova); para D+1, decidir: (a) adiar D+1 para v1.5 **e ajustar a oferta** ou (b) configurar ferramenta mínima. Copy passa pelo filtro ético (§4.3 tem exemplos prontos).
**Critérios de aceite:** e-mails entregues em teste real; copy validada contra §4.3; garantia mencionada no D0.

### [P1] C-05 — Criativos: conceitos visuais + estático final

**Área:** Aquisição · **Tipo:** design/conteúdo · **Agente sugerido:** Humano + IA de imagem · **Status sugerido:** tickets existentes KAN-35 (subtarefas 93–96) e KAN-36 (97–99)

**Evidência:** promessa e copy prontas e aprovadas (`promessa.md`, `copy-ads.md` — 3 hooks com filtro ético validado); falta só o visual.
**Critérios de aceite:** 2 conceitos escolhidos (KAN-96 registra em `acquisition/conceitos-visuais.md`); exports Feed 1080×1350 + Stories com safe zone; revisão de termos proibidos na peça montada (texto sobre imagem incluído).
**Riscos:** aprovação Meta pode levar 48h — subir em rascunho no D11 (mitigação já prevista).

### [P1] B-03 — Re-auditoria instrumentada do funil (axe-core + mobile + teclado)

**Área:** Quiz/Landing/QA · **Tipo:** validação · **Agente sugerido:** Claude Code (Playwright MCP + scripts existentes) · **Status sugerido:** novo ticket — ver §12

**Dor/oportunidade:** as últimas auditorias navegadas (2026-05-04/09) precedem Landing, CouponCountdown, Obrigado, MethodSection e rotas legais; itens F1/F2/L2 do gate exigem evidência fresca.
**Evidência:** Q-3/L-5 (§5/§6); script `run-a11y-audit.js` existente em `.agents/skills/tdah-ux-audit/scripts/`.
**Mudança recomendada:** rodar axe-core em `/`, Q1, marco 2, resultado, `/planner/furacao` (cupom válido + expirado), `/obrigado` e rotas legais, em 320/390/768/desktop; screenshots; teclado end-to-end; consolidar achados em `audits/funnel-v1_2-handoff.md`. Corrigir o que for sério no mesmo ticket (tokens de cor são troca barata).
**Critérios de aceite:**
- [ ] Zero violações axe sérias nas telas auditadas
- [ ] Screenshots 320px arquivados para o gate F1
- [ ] Quiz completável só com teclado (evidência gravada)
**Dependências:** idealmente após B-02 (para auditar o estado final).

### [P1] B-04 — Fechar ou descopar o discovery KAN-125–129

**Área:** Pesquisa/Jira · **Tipo:** operação/pesquisa · **Agente sugerido:** Humano decide (D4); Claude Code/Codex executam · **Status sugerido:** atualizar tickets existentes

**Evidência:** KAN-125/126 "Em andamento" sem outputs; KAN-127–129 pendentes; outputs 06–10 prometidos pelos handoffs não existem; **porém** o achado central do discovery já foi incorporado (KAN-130) e este plano cumpre parte do papel de KAN-128/129.
**Mudança recomendada (recomendação: descopo parcial):** marcar KAN-128 como substituído por este documento (comentário com link); executar KAN-125/126 em versão enxuta (curadoria das amostras `alta`/`média` — valor real para copy de v1.5) **ou** movê-los para backlog v1.5; KAN-127 (auditoria de pipeline) só se a pesquisa for reaberta; KAN-129 vira "criar os 4 tickets novos da §12".
**Critérios de aceite:** nenhum card de discovery em estado ambíguo ("Em andamento" sem artefato).

### [P1] B-05 — Dashboard de funil no PostHog

**Área:** Analytics · **Tipo:** tracking · **Agente sugerido:** Codex (label existente) com guia humano · **Status sugerido:** ticket existente KAN-50 (subtarefas 119–122)

**Evidência:** layout já especificado em `data/kpis.md` §5.2 (12 KPIs + 5 qualitativos).
**Dependências:** A-06 + eventos reais em produção (idealmente pós C-01, com dados das compras de teste).

### [P1] B-06 — Verificar âncoras temporais nos templates diários (dor #3)

**Área:** Planner · **Tipo:** análise/conteúdo · **Agente sugerido:** Claude Code · **Status sugerido:** novo ticket pequeno (análise; mudança editorial só se houver lacuna) — ver §12

**Dor/oportunidade:** cegueira temporal é a 3ª dor (170 registros, relevância 38.6) e a única do top-5 cuja cobertura no BASE não está evidenciada (âncoras temporais hoje são regra da variante Nômade).
**Evidência:** matriz §4; `base/08-templates-diarios.md` (13.6KB) não auditado linha a linha nesta sessão.
**Mudança recomendada:** auditar `base/05` e `base/08`; se não houver campo de âncora temporal leve (ex.: "horário âncora do dia" / blocos de tempo opcionais), propor adição mínima **antes** do design congelar o miolo (senão, registrar como OK e fechar).
**Critérios de aceite:** parecer com evidência (linhas citadas); se mudança: 1 campo opcional, sem aumentar carga de preenchimento obrigatória.
**Riscos:** janela curta — precisa acontecer antes de A-03 diagramar o miolo.

### [P0] D-01 — Gate pré-tráfego + subir campanha

**Área:** Aquisição · **Tipo:** operação · **Agente sugerido:** Humano · **Status sugerido:** tickets existentes KAN-44 (subtarefas 114–118) e KAN-42 (110–113)

**Evidência:** checklist de 18 itens em `oferta-mvp.md` §8; critério de decisão pronto (`decisao-escala.md`).
**Critérios de aceite:** 18/18 verdes com evidência consolidada (KAN-118) antes de qualquer real gasto; campanha com UTMs conforme `acquisition/utm-naming.md`.

### [P2] D-02 — Melhorias pós-launch orientadas por dados

**Área:** Landing/Quiz/Produto · **Tipo:** melhoria/experimento · **Agente sugerido:** Humano decide com dados; agentes executam · **Status sugerido:** backlog (não criar tickets agora)

Itens, cada um condicionado a um KPI:
- **Âncora de oferta na primeira dobra da landing** (se K7 < 15% ou K8 < 3%) — L-3.
- **FOUNDATION-6 / KAN-12** (refinamento visual do quiz) — manter P2 paralelo.
- **Carrossel KAN-37** (se estático performar e precisar de variação de criativo).
- **Copy "anti-hiperfoco em planner perfeito"** na FAQ (dor de 16 registros; micro-ajuste).
- **Pergunta de retomada/manutenção no quiz** (v1.5 — mexe em scoring; exige revalidação completa).

### [P3] D-03 — Backlog futuro já mapeado

Card compartilhável do resultado (AUD-015), legenda orgânica (KAN-39), NPS/pesquisa pós-compra, A/B de preço (após 200+ vendas), drip de e-mails, área de membros — tudo já corretamente posicionado em v1.5/v2 pelo backlog mestre §6. Nenhuma ação agora.

---

## 11. Plano de execução por fases

```
FASE A — DESTRAVAR (humano no caminho crítico; agentes em paralelo)
  A-01 Kiwify produto+cupom+entrega ──┐
  A-02 Domínio + deploy + env vars ───┼─ paralelos entre si
  A-03 Design PDF → export (maior esforço; começa já) ─┤
  A-04 Decisão bônus (30 min) ────────┤
  A-05 Dados legais → render (humano fornece, Claude implementa)
  A-06 Chave PostHog
  [paralelo agente]: B-02 saneamento placeholders/disclaimers · B-06 análise templates

FASE B — CÓDIGO E VALIDAÇÃO (agentes; dependem de insumos da Fase A)
  B-01 checkout URL real (após A-01)
  B-03 re-auditoria axe/mobile/teclado (após B-02; reusar no gate)
  B-04 fechar discovery (após decisão D4)
  B-05 dashboard PostHog (após A-06)

FASE C — MONTAGEM COMERCIAL
  C-02 Pixel Meta (humano cria ID; Claude instala)
  C-03 webhook Kiwify→PostHog+CAPI (após A-01/A-02/C-02)
  C-04 e-mails D0/D+1 (após decisão D2)
  C-05 criativos (paralelo desde já — só depende de promessa/copy prontas)
  C-01 3 compras de teste end-to-end (após tudo acima)

FASE D — LANÇAMENTO
  D-01 gate ACQ-11 (18/18) → subir campanha (KAN-42) → cadência de kpis.md §4
       e decisao-escala.md §3 (matriz CAC × ROAS)
```

**Caminho crítico:** A-03 (design+export do PDF) é o item de maior duração; A-01/A-02/A-05/A-06 são rápidos mas 100% humanos. Recomendação operacional: Rodrigo dedica 1 sessão às operações de painel (Kiwify, domínio, PostHog, dados legais — meio dia) enquanto o design roda em paralelo; agentes executam B-02/B-06 imediatamente, sem dependências.

---

## 12. Tickets Jira sugeridos ou atualizações sugeridas

### 12.1 Tickets novos (4, apenas onde não há cobertura)

| # | Título sugerido | Epic | Prioridade | Label | Plano |
|---|---|---|---|---|---|
| N-1 | `FUNNEL · Substituir checkout placeholder pela URL real da Kiwify + validar parâmetro de cupom` | KAN-2 | P0 | agent-claude-code | B-01 |
| N-2 | `FUNNEL · Saneamento de placeholders visíveis + disclaimers canônicos (§4.5) + rodapé legal no quiz` | KAN-2 | P0 | agent-claude-code | B-02 |
| N-3 | `FUNNEL · Re-auditoria instrumentada do funil completo (axe-core + 320px + teclado) pós-D6` | KAN-2 | P1 | agent-claude-code | B-03 |
| N-4 | `PRODUCT · Auditar âncoras temporais nos templates diários (dor cegueira temporal, 170 reg.)` | KAN-3 | P1 | agent-claude-code | B-06 |

### 12.2 Atualizações em tickets existentes

| Ticket | Atualização sugerida | Por quê |
|---|---|---|
| **KAN-27** (bônus) | Elevar P2 → **P0** ou descopar da oferta (decisão D1) | Prometido em `oferta-mvp.md` §3.2 + landing; vender sem ele viola a própria oferta |
| **KAN-26** (e-mails) | Adicionar a decisão de ferramenta D+1 como bloqueio explícito (decisão D2) | Oferta §3.3 promete D+1; nenhuma ferramenta definida |
| **KAN-125/126** | Comentar: em andamento sem artefato; executar versão enxuta ou mover para v1.5 (decisão D4) | Estado ambíguo no board |
| **KAN-128** | Comentar: escopo coberto por `research/outputs/06_plano_estrategico_proximas_acoes_planner_tdah.md`; fechar ou redirecionar | Evitar trabalho duplicado |
| **KAN-129** | Reescopar para "criar tickets N-1..N-4 + aplicar atualizações da §12" | O backlog derivado de discovery é este documento |
| **KAN-9** | Registrar que os componentes de rota existem como placeholder e que a implementação final está descrita em A-05 | Alinhamento de handoff |
| **Memória do projeto** | Atualizar `project_funil_status.md`: 24 tickets Concluído (não "em In Review"), KAN-28 concluído, KAN-24 em andamento | Memória defasada vs. board |

> Nota de namespace: os handoffs de KAN-125 previam um output chamado `06_revisao_qualitativa_claude_code.md`. Este plano ocupa o prefixo `06_` com outro conteúdo. Se KAN-125 for executado, numerar o output dele como `07_` em diante e atualizar o handoff correspondente.

---

## 13. Handoffs recomendados para próximos agentes

| Ordem | Tarefa | Agente | Pré-requisitos | Instrução-chave |
|---|---|---|---|---|
| 1 | B-02 (N-2) saneamento + disclaimers | 🧠 Claude Code | nenhum | Usar tabela §4.5 do `posicionamento-etico.md` literalmente; não alterar estrutura das seções; validar com build + grep + screenshot 320px |
| 2 | B-06 (N-4) análise templates | 🧠 Claude Code | nenhum | Parecer com citação de linhas; só propor mudança se a lacuna for real; entregar antes do design congelar |
| 3 | A-05 render legal | 🧠 Claude Code | dados do Rodrigo | Transcrever `.md` → JSX sem dependência nova; rodapé legal nas rotas `/` e `/planner/:slug` |
| 4 | B-01 (N-1) checkout real | 🧠 Claude Code | URL Kiwify (A-01) | Confirmar formato do parâmetro de cupom no checkout real antes de mexer em `buildCheckoutUrl` |
| 5 | C-03 webhook | 🧠 Claude Code | A-01, A-02, Pixel token | Seguir subtarefas KAN-81–84; `event_id` compartilhado com Pixel p/ dedup CAPI |
| 6 | B-03 (N-3) re-auditoria | 🧠 Claude Code + Playwright | B-02 merged, app rodando | Reusar `run-a11y-audit.js`; entregar `audits/funnel-v1_2-handoff.md`; evidências servem ao gate KAN-114 |
| 7 | B-05 dashboard | 🤖 Codex | A-06 + eventos reais | Layout pronto em `data/kpis.md` §5.2 — não inventar métricas novas |
| 8 | C-04 copy e-mails | 🔄 Humano + IA | decisão D2 | Exemplos prontos em `posicionamento-etico.md` §4.3; D0 lembra garantia de 7 dias |

Todos seguem o workflow de `foundation/handoff-agentes-ia.md` (ler ticket → bloqueantes → implementar P0→P3 → validar → commit `[KAN-XX]` → comentário template §7 → transição 31 → atualizar memória). O padrão Claude+Codex paralelo validado nas sessões D2–D5 se aplica a (B-05 ∥ qualquer item Claude).

---

## 14. Validações necessárias por tipo de mudança

| Tipo de mudança | Validações obrigatórias |
|---|---|
| Scoring / arquétipos (`Q`, `ARC`, `calcScores`, `findArc`) | `node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js` (6/6) — **evitar antes do launch** |
| Conteúdo do quiz (perguntas/validações) | `extract-quiz-content.js` + contagem de palavras |
| Qualquer `.jsx`/`.css` | `cd quiz && npx vite build` + screenshot 320px e 768px |
| Copy (anúncio/landing/e-mail/PDF) | Diff manual contra `posicionamento-etico.md` §2/§4 + grep de termos proibidos; coerência com `promessa.md` §1.1 |
| Visual / ARIA | `run-a11y-audit.js` com app rodando (sem violações sérias) |
| Analytics | DevTools → ação → payload completo no console/PostHog; eventos únicos (guards) |
| Checkout/cupom | Navegação manual nos 3 estados (válido/expirado/sem sessão); aba anônima |
| Webhook | Compra de teste → 1 `purchase_confirmed` PostHog + 1 Purchase CAPI dedupado, com UTMs |
| Documento `.md` | Cabeçalho padrão, sumário, seções numeradas, histórico de revisões |
| Deploy | Deep-link direto em todas as rotas no domínio final (SPA rewrite) + mobile real |

---

## 15. Riscos, trade-offs e decisões que exigem humano (Rodrigo)

| ID | Decisão | Opções | Recomendação | Urgência |
|---|---|---|---|---|
| **D1** | Bônus "Comece em 15 minutos" prometido e inexistente | (a) produzir (diagramar `base/03` em 4-6 págs); (b) remover da oferta/landing/FAQ | **(a)** — responde ao motivo de falha nº 1 do corpus (setup, 361 reg.) e o conteúdo já existe; custo marginal dentro de A-03 | Antes de A-01 finalizar anexos |
| **D2** | E-mail D+1 prometido sem ferramenta | (a) ferramenta mínima (ex.: automação nativa Kiwify se disponível, ou Mailerlite free); (b) adiar p/ v1.5 **e editar oferta §3.3** | (a) se houver caminho nativo Kiwify; senão (b) com edição honesta da oferta — nunca vender prometendo o que não dispara | Antes do gate |
| **D3** | Exposição de CPF/cidade nos termos legais públicos | publicar agora como PF · acelerar MEI antes | publicar como PF (compliance mínimo já previsto na oferta §5.4); reavaliar no limiar de R$ 2.500/mês | Junto de A-05 |
| **D4** | Destino do discovery KAN-125–129 | executar tudo · versão enxuta · descopar p/ v1.5 | **versão enxuta**: 125/126 viram curadoria de 10-20 registros `alta` p/ copy v1.5; 128 fechado por este doc; 129 reescopado (§12); 127 só se reabrir pesquisa | Baixa — não bloqueia launch |
| **D5** | Quando travar conteúdo editorial do miolo | travar já · aguardar B-06 | aguardar **só** B-06 (1 análise pequena), depois congelar e diagramar — evita retrabalho de diagramação | Imediata |
| **D6** | Âncora de oferta na 1ª dobra da landing | mudar já · esperar dados | **esperar dados** (K7/K8) — mudança especulativa antes do volume contradiz o protocolo de 1 variável (`decisao-escala.md` §5) | Pós-launch |

**Riscos transversais:**
1. **Concentração no humano:** 100% dos bloqueadores P0 passam por Rodrigo (painéis, dados, decisões). Mitigação: a sessão única de "operações de painel" da §11.
2. **Design do PDF como gargalo:** maior esforço restante; risco de hiperfoco em polimento (ironia mapeada no próprio corpus). Mitigação: 1 iteração por capa, aceitar "B+" (regra já aprovada no backlog §3).
3. **Memória/board dessincronizados:** a memória do projeto dizia "24 em In Review" quando 24 já estão Concluído e KAN-28 fechado — handoffs que confiem nela sem checar o Jira tomarão decisões erradas. Mitigação: atualização registrada na §12.2 (executada junto deste plano).
4. **Webhook/CAPI tardios:** sem eles, K9–K12 ficam cegos e a Meta otimiza mal. Não subir ads com T1/T3 vermelhos, mesmo com pressa.
5. **Drift ético em peças montadas:** copy isolada já passou no filtro, mas a peça final (texto sobre criativo + legenda + botão) precisa de revisão consolidada (regra §7.2 do posicionamento) — incluído em C-05/D-01.

---

## 16. Apêndice de evidências

| Evidência | Fonte | Tipo |
|---|---|---|
| Build OK 2.21s; warning chunk > 500 kB | `npx vite build`, 2026-06-10 | Direta (comando) |
| Scoring 6/6, 0 falhas | `score-archetype-paths.js`, 2026-06-10 | Direta (comando) |
| Checkout placeholder | `quiz/data/archetypes.js:211` | Direta (código) |
| 3 rotas legais placeholder + nota /obrigado | grep `PLACEHOLDER|placeholder` em `quiz/`, 2026-06-10 (Termos/Privacidade/Reembolso.jsx:14; Obrigado.jsx:131) | Direta (comando) |
| Disclaimer landing abaixo do CTA / texto divergente | `Landing.jsx:426-446, 574`; exigência em `posicionamento-etico.md` §4.5 | Direta (código + doc) |
| Rodapé legal ausente no quiz | leitura integral de `Quiz.jsx` (sem nav legal) | Direta (código) |
| 24 tickets Concluído; KAN-28 Concluído; KAN-24 Em andamento; KAN-125/126 Em andamento sem outputs | JQL `project = KAN` (130 issues), 2026-06-10 | Direta (Jira) |
| Outputs 06–10 do discovery inexistentes | glob `research/outputs/*` vs. handoffs KAN-128/129 §2 | Direta (filesystem) |
| Dores e contagens (768/361/202/170/127/125/112/98…) | `research/outputs/01` §2/§5, `03` §1 | Direta (pesquisa consolidada; heurística) |
| Arquétipos sustentados por discovery (Nômade 450 … Camaleão 22) | `research/outputs/02` §2, `04` §2 | Direta (pesquisa; Camaleão = sinal fraco, revisar amostras) |
| Modo Recomeço responde rotina rígida/culpa | `base/12-modo-recomeco.md`; commit `9fcf369` (KAN-130, Concluído) | Direta |
| Correções da auditoria implementadas (caps, radar, Voltar, foco, landmarks) | `Quiz.jsx:124-135, 246-258, 316-347, 619-671, 729-734` vs. `audits/quiz-tdah-v1_1-handoff.md` AUD-002..012 | Direta (diff conceitual código × auditoria) |
| GitHub API inacessível na sessão | `gh pr list` → connectex timeout, 2026-06-10 | Direta (lacuna registrada) |
| "Bônus prometido" em 3 pontos do funil | `oferta-mvp.md` §3.2; `archetypes.js` LANDING_BENEFITS/OFFER/FAQ; `Obrigado.jsx` STEPS[0] | Direta |
| Inferências marcadas | §6.2 L-3 (efeito da 1ª dobra: inferência, confiança média); §4 linha "novidade acaba" (cobertura parcial: inferência); §11 estimativas de esforço (inferência, confiança média) | Inferência |

---

## 17. Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-06-10 | 1.0 | Plano estratégico inicial — 8 camadas de análise, backlog priorizado (11 P0 / 7 P1 / 1 P2 / 1 P3), 4 tickets novos propostos, 6 decisões humanas mapeadas | Claude Code (Fable 5) |

---

**Fim do documento.** Próximo agente: comece pela §1 (ordem de execução), confirme o estado dos tickets no Jira antes de agir (§2.2 é um snapshot de 2026-06-10) e siga o workflow de `foundation/handoff-agentes-ia.md`.
