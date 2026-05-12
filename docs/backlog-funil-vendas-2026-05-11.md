# Backlog do Funil Completo — Planner TDAH v1

**Data:** 2026-05-11
**Status:** Aprovado e instanciado no Jira (`the-abib-company.atlassian.net`, projeto `KAN` — "Planner TDAH")
**Validade:** Documento vivo — atualizar conforme decisões evoluem
**Autoria:** Sessão de brainstorming Rodrigo Abib + Claude (Opus 4.7)

---

## Sumário

1. [Resumo executivo](#1-resumo-executivo)
2. [Decisões estratégicas validadas](#2-decisões-estratégicas-validadas)
3. [Roadmap em 12 dias úteis + 3 buffer](#3-roadmap)
4. [Mapeamento Jira: chave KAN-XX ↔ código conceitual](#4-mapeamento-jira)
5. [Caminho crítico de receita](#5-caminho-crítico-de-receita)
6. [O que NÃO entra no escopo da v1](#6-o-que-não-entra-no-escopo-da-v1)
7. [Critérios de "pronto para tráfego pago" (gate ACQ-11)](#7-critérios-de-pronto-para-tráfego-pago)
8. [Stack técnica consolidada](#8-stack-técnica-consolidada)
9. [Operação com agentes de IA](#9-operação-com-agentes-de-ia)
10. [Próximas decisões esperadas após v1](#10-próximas-decisões-esperadas-após-v1)

---

## 1. Resumo executivo

Este projeto entrega o **funil completo de vendas** de um infoproduto chamado provisoriamente "Planner TDAH" — um PDF imprimível premium personalizado por padrão de atenção (6 arquétipos + 1 variação lowSeverity), comercializado no Brasil via Hotmart/Kiwify a R$ 29,90, com aquisição via anúncios pagos no Instagram.

O **quiz interativo** já existe (~95% pronto, build Vite + React, hospedado em `quiz/quiz-tdah-v1.jsx`), com 15 perguntas, 6 arquétipos validados, gamificação (XP + marcos), radar chart e analytics estruturado. O bloqueador único atual é a inexistência da landing page de venda e do produto digital em si.

**Objetivo:** validar o funil completo em 10-15 dias com qualidade alavancada por IA (Claude Code, Codex, IA de imagem/copy), realizando primeiras vendas reais e tomando decisão data-driven de escala/iteração/pivot.

**Orçamento de teste:** R$ 300-750 em ads (R$ 20-50/dia) para 20-50 conversões iniciais.

---

## 2. Decisões estratégicas validadas

| # | Decisão | Resposta validada |
|---|---|---|
| 1 | **Banda de execução** | Solo + IA (Codex, Claude Code, IA de imagem/copy/conteúdo); sem terceiros humanos |
| 2 | **Audiência prévia** | Zero — tráfego pago via Instagram é o único canal de aquisição inicial |
| 3 | **Prazo alvo** | 10-15 dias para funil completo, com qualidade alavancada por IA |
| 4 | **Escopo do produto MVP** | 1 planner base sólido + 2-4p de personalização leve por arquétipo. Arquitetura modular para evoluir para 6 planners totalmente personalizados sem refatoração |
| 5 | **Formato de entrega** | PDF imprimível premium (Goodnotes/Notability/papel A4) |
| 6 | **Preço** | R$ 29,90 (preço cheio R$ 49,90 - cupom QUIZ24H de R$ 20) — validação de funil; LTV depende de upsell/SaaS futuro |
| 7 | **Estratégia de oferta** | Cupom pós-quiz com validade real de 24-48h (timestamp-based, sem reinício ao recarregar). Cupom único compartilhado na Kiwify; urgência construída no frontend |
| 8 | **Plataforma de checkout** | Kiwify (taxa ~9-10%, UX mobile excelente, API/webhooks) |
| 9 | **Marca/nome do produto** | Provisório ("Planner TDAH — perfil [arquétipo]"); marca refinada depois das primeiras vendas |
| 10 | **Identidade visual** | Refinar a paleta atual do quiz, sem rework; ticket P2 paralelo (FOUNDATION-6) |
| 11 | **Orçamento de ads** | R$ 300-750 para soft test (R$ 20-50/dia × ~2 semanas); decide escala com base em CAC/ROAS |
| 12 | **Stack técnica da LP** | Mesma app Vite do quiz, com `react-router-dom`; refactor leve do arquivo único atual |

### Premissas técnicas adicionais (default)

- **Analytics:** PostHog (tier gratuito) + Pixel da Meta + Pixel Kiwify
- **Hospedagem:** Vercel (deploy automático via git push)
- **Domínio:** comprar `.com.br` no Registro.br ou `.app` em Namecheap
- **LGPD/CDC:** termos de uso + política de privacidade + política de reembolso publicados como rotas da aplicação
- **Modalidade fiscal:** começar como Pessoa Física na Kiwify; migrar para MEI ao passar de R$ 2.500/mês

---

## 3. Roadmap

**Cronograma 12 dias úteis (+ 3 buffer):**

| Dia | Foco | Tickets ativos | Marco visível |
|---|---|---|---|
| **D1** | Fundação estratégica | FOUNDATION-1, FOUNDATION-2, FOUNDATION-4, DATA-5, ACQ-1 | Estratégia documentada + git ativo |
| **D2** | Arquitetura técnica + Kiwify | FUNNEL-1, PRODUCT-1, COMMERCE-1, FOUNDATION-5 | App Vite com rotas; estrutura do planner mapeada |
| **D3** | Landing + analytics base | FUNNEL-2, **PRODUCT-2 (inicia)**, COMMERCE-2, DATA-1, ACQ-8 | Landing renderizando 6 arquétipos; PostHog instalado |
| **D4** | Cupom + tracking | FUNNEL-3, PRODUCT-2 (continua), DATA-2, ACQ-10 | Cupom pós-quiz funcionando; eventos quiz → PostHog |
| **D5** | Integração quiz↔landing + termos legais | FUNNEL-4, **PRODUCT-3 (inicia)**, COMMERCE-3, FOUNDATION-3, DATA-3 | CTA do quiz → landing real; termos legais no ar |
| **D6** | Deploy + criativo conceito | FUNNEL-7, PRODUCT-3 (continua), DATA-4, ACQ-2 | Funil em domínio próprio; 2 conceitos visuais escolhidos |
| **D7** | Design PDF + Pixel Meta | PRODUCT-3 (finaliza), **PRODUCT-4 (inicia)**, ACQ-3, ACQ-7 | Variantes prontas; Pixel Meta operacional |
| **D8** | Criativos + webhook | PRODUCT-4 (continua), ACQ-4, ACQ-5, COMMERCE-5, DATA-6 | Webhook Kiwify→PostHog; criativos prontos |
| **D9** | Produto finalizado + entrega | PRODUCT-4 (finaliza), PRODUCT-5, PRODUCT-6, COMMERCE-4, FUNNEL-5 | 7 PDFs na Kiwify; e-mails configurados |
| **D10** | QA end-to-end | **COMMERCE-6 (3 compras)**, FUNNEL-6, FUNNEL-8, PRODUCT-7 | Compras testadas; polish UX |
| **D11** | Correção + gate | Bugs do D10, **ACQ-11 (checklist gate)** | Checklist pré-tráfego pago verde |
| **D12** | 🚀 Subir ads | **ACQ-9** | Campanha no ar com R$ 20-50/dia |
| **D13-15** | Soft launch + iteração | Monitorar CAC/ROAS; FOUNDATION-6 em paralelo | Primeiras vendas + decisão matar/escalar |

### Riscos identificados

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Produção de conteúdo (PRODUCT-2/3) leva mais que o estimado | **Alta** | Começar no D3, ter 5 dias de folga; reduzir escopo de variantes para 1p por arquétipo se atrasar |
| Design do PDF trava em iteração visual | Média | Limitar a 1 iteração por capa; aceitar "B+" no D9, polir em paralelo |
| Aprovação do anúncio pela Meta demora 48h | Média | Subir anúncio em rascunho no D11, não no D12 |
| Cupom dinâmico Kiwify com limitação técnica | Baixa | Plano B em COMMERCE-3 (cupom fixo + frontend timestamp) |
| Webhook Kiwify→Vercel com cold start | Baixa | Testar early no D8; usar Pipedream/Zapier como alternativa |

---

## 4. Mapeamento Jira

**Projeto Jira:** `the-abib-company.atlassian.net` › Projeto "Planner TDAH" › chave `KAN` › estilo Kanban

### Epics (6 issues)

| Chave | Epic | Cor de área |
|---|---|---|
| **KAN-1** | FUNDAÇÃO — Estratégia, Ética e Operação | Estratégia |
| **KAN-2** | FUNIL — Funil Técnico (Quiz + Landing Page de Venda) | Frontend/React |
| **KAN-3** | PRODUTO — Produto Digital Planner (PDF) | Conteúdo/Design |
| **KAN-4** | CHECKOUT — Checkout e Plataforma de Vendas (Kiwify) | Pagamento |
| **KAN-5** | AQUISIÇÃO — Anúncio Instagram e Tráfego Pago | Marketing |
| **KAN-6** | DADOS — Analytics e Tracking End-to-End | Analytics |

### Tickets — código conceitual ↔ chave KAN-XX

**FOUNDATION (6 tickets) — vinculados ao Epic KAN-1**

| Código | Chave | Título resumido | Prioridade |
|---|---|---|---|
| FOUNDATION-1 | KAN-7 | Documentar oferta MVP, preço, garantia e termos comerciais | P0 |
| FOUNDATION-2 | KAN-8 | Posicionamento ético: termos proibidos vs permitidos | P0 |
| FOUNDATION-3 | KAN-9 | Termos de Uso, Política de Privacidade e Reembolso (LGPD/CDC) | P0 |
| FOUNDATION-4 | KAN-10 | Inicializar Git e publicar repositório privado no GitHub | P0 |
| FOUNDATION-5 | KAN-11 | Padrão de handoff de tickets para Codex e Claude Code | P1 |
| FOUNDATION-6 | KAN-12 | Refinar identidade visual do quiz/landing (P2 paralelo) | P2 |

**FUNNEL (8 tickets) — vinculados ao Epic KAN-2**

| Código | Chave | Título resumido | Prioridade |
|---|---|---|---|
| FUNNEL-1 | KAN-13 | Reestruturar Vite para múltiplas páginas (react-router-dom) | P0 |
| FUNNEL-2 | KAN-14 | Estrutura visual e conteúdo da landing por arquétipo | P0 |
| FUNNEL-3 | KAN-15 | Cupom pós-quiz com validade real 24-48h (timestamp-based) | P0 |
| FUNNEL-4 | KAN-16 | Conectar CTA do quiz à landing real do arquétipo | P0 |
| FUNNEL-5 | KAN-17 | Polish: radar parcial no Marco 2 | P1 |
| FUNNEL-6 | KAN-18 | Bug: foco por teclado nas perguntas Q2-Q14 | P1 |
| FUNNEL-7 | KAN-19 | Comprar domínio + deploy Vercel/Netlify em produção | P0 |
| FUNNEL-8 | KAN-20 | Página `/obrigado` pós-checkout | P2 |

**PRODUCT (7 tickets) — vinculados ao Epic KAN-3**

| Código | Chave | Título resumido | Prioridade |
|---|---|---|---|
| PRODUCT-1 | KAN-21 | Estrutura modular do planner (índice + BASE/VARIANTE) | P0 |
| PRODUCT-2 | KAN-22 | Conteúdo base do planner ([BASE]) com IA + curadoria | P0 |
| PRODUCT-3 | KAN-23 | 6 módulos de personalização por arquétipo + lowSeverity | P0 |
| PRODUCT-4 | KAN-24 | Design visual do PDF (7 capas + miolo diagramado) | P1 |
| PRODUCT-5 | KAN-25 | Exportar 7 PDFs finais e carregar na Kiwify | P0 |
| PRODUCT-6 | KAN-26 | E-mail boas-vindas (D0) + onboarding (D+1) | P1 |
| PRODUCT-7 | KAN-27 | Bônus "Comece em 15 minutos" (4-6 páginas) | P2 |

**COMMERCE (6 tickets) — vinculados ao Epic KAN-4**

| Código | Chave | Título resumido | Prioridade |
|---|---|---|---|
| COMMERCE-1 | KAN-28 | Criar conta Kiwify (PJ/CPF) e validar dados bancários | P0 |
| COMMERCE-2 | KAN-29 | Configurar produto MVP na Kiwify (preço + checkout) | P0 |
| COMMERCE-3 | KAN-30 | Criar cupom QUIZ24H com R$ 20 de desconto | P0 |
| COMMERCE-4 | KAN-31 | Entrega automática dos 7 PDFs com instrução por arquétipo | P0 |
| COMMERCE-5 | KAN-32 | Webhook Kiwify → PostHog (purchase_confirmed) + Meta CAPI | P1 |
| COMMERCE-6 | KAN-33 | **GATE:** 3 compras de teste end-to-end | P0 |

**ACQUISITION (11 tickets) — vinculados ao Epic KAN-5**

| Código | Chave | Título resumido | Prioridade |
|---|---|---|---|
| ACQ-1 | KAN-34 | Definir promessa principal + 3 framings alternativos | P0 |
| ACQ-2 | KAN-35 | Gerar 5-8 conceitos visuais com IA e escolher 2 | P1 |
| ACQ-3 | KAN-36 | Criativo estático (Feed + Stories/Reels) | P1 |
| ACQ-4 | KAN-37 | Criativo carrossel 3-5 cards | P2 |
| ACQ-5 | KAN-38 | Copy + 3 variações de headline para A/B | P1 |
| ACQ-6 | KAN-39 | Legenda longa para post orgânico (futuro) | P3 |
| ACQ-7 | KAN-40 | Pixel da Meta + Conversion API no site | P0 |
| ACQ-8 | KAN-41 | Padronizar UTMs e nomenclatura de campanha | P0 |
| ACQ-9 | KAN-42 | 🚀 Subir campanha de soft launch (R$ 20-50/dia) | P0 |
| ACQ-10 | KAN-43 | Critério de matar/escalar/iterar (CAC + ROAS) | P0 |
| ACQ-11 | KAN-44 | **GATE:** Checklist pré-tráfego pago | P0 |

**DATA (6 tickets) — vinculados ao Epic KAN-6**

| Código | Chave | Título resumido | Prioridade |
|---|---|---|---|
| DATA-1 | KAN-45 | Conta PostHog + instalação do SDK | P0 |
| DATA-2 | KAN-46 | Conectar `trackQuizEvent` ao PostHog (8 eventos do quiz) | P0 |
| DATA-3 | KAN-47 | Capturar UTMs e propagar até o checkout | P0 |
| DATA-4 | KAN-48 | 5 eventos da landing (view, scroll, CTA, expirado) | P1 |
| DATA-5 | KAN-49 | Documentar 12 KPIs com benchmarks-alvo | P0 |
| DATA-6 | KAN-50 | Dashboard de funil completo no PostHog | P1 |

### Estatísticas

- **Total:** 50 issues (6 Epics + 44 Tickets)
- **Por prioridade:** P0 = 27 · P1 = 11 · P2 = 5 · P3 = 1
- **Dependências:** 57 links "Blocks" / "is blocked by" criados

---

## 5. Caminho crítico de receita

Sequência mínima de tickets para sair de "nada existe" para "primeira venda real":

```
FOUNDATION-1 (oferta) ──┐
FOUNDATION-2 (ética)    ├─→ FUNNEL-1 (rotas) ──→ FUNNEL-2 (landing) ──→ FUNNEL-3 (cupom) ──→ FUNNEL-4 (CTA)
FOUNDATION-4 (git)      ─→ FUNNEL-7 (deploy)
                           
PRODUCT-1 → PRODUCT-2 → PRODUCT-3 → PRODUCT-4 → PRODUCT-5

COMMERCE-1 → COMMERCE-2 → COMMERCE-3 → COMMERCE-4 → COMMERCE-6 (GATE)

DATA-1 → DATA-2 → DATA-3

ACQ-1 → ACQ-7 → ACQ-8 → ACQ-3 + ACQ-5 + ACQ-10 → ACQ-11 (GATE) → ACQ-9 🚀
```

---

## 6. O que NÃO entra no escopo da v1

### v1.5 (após primeiras vendas, se ROAS positivo)

- 6 planners totalmente personalizados por arquétipo (não 1 base + variantes)
- Refinamento profundo de identidade visual e marca (nome próprio, logo, manual)
- Página de membros / área logada na Kiwify
- Sequência de e-mails pós-compra automatizada (drip de 5-7 e-mails)
- A/B test estruturado de preço (R$ 29 vs R$ 47 vs R$ 67)
- Pesquisa pós-compra (NPS)
- Página de afiliados
- SEO orgânico do quiz

### v2 (3-6 meses após v1 validada)

- Template Notion como produto complementar
- Comunidade fechada (WhatsApp/Discord/Circle)
- Aula gravada como upsell
- Versão imprimível premium via Correios
- Multi-arquétipo combinado
- Internacionalização

### v3 (SaaS — visão de longo prazo)

- Aplicação web interativa (planner online com login)
- Planos de assinatura mensal/anual
- Conteúdos de apoio: sono, alimentação, protocolos
- Acompanhamento de progresso com histórico e lembretes
- Comunidade integrada
- Integração com Google Calendar, Apple Reminders

### Para sempre fora (incompatível com posicionamento ético)

- Urgência artificial com contador que reinicia ao recarregar
- "Apenas X unidades disponíveis" para produto digital
- Promessas de cura, tratamento, diagnóstico
- Prova social falsa, depoimentos não-coletados, números inflados
- "Antes R$ 997 por R$ 29,90" sem base real
- Quiz como "teste de TDAH" ou "diagnóstico online"
- Linguagem clínica vendida como autoridade

---

## 7. Critérios de "pronto para tráfego pago"

Gate obrigatório (ACQ-11 / KAN-44) antes de gastar o primeiro real em ads:

### Funil técnico
- [ ] Quiz funciona em mobile (iPhone + Android reais)
- [ ] Quiz completável apenas com teclado
- [ ] CTA do quiz leva à landing correta com cupom
- [ ] Landing renderiza os 6 arquétipos + lowSeverity sem bug
- [ ] Cupom dinâmico: timestamp respeitado, recarregar não reseta
- [ ] Página `/obrigado` configurada

### Checkout
- [ ] Checkout Kiwify abre com preço correto
- [ ] PIX + Cartão funcionam
- [ ] Cupom QUIZ24H aplica desconto correto
- [ ] 3 compras de teste validadas end-to-end (COMMERCE-6)
- [ ] PDFs chegam no e-mail em < 5min após compra
- [ ] Estorno funcionou nas 3 compras de teste

### Tracking
- [ ] Pixel Meta registra 4 eventos custom + Purchase via CAPI
- [ ] PostHog registra 8+ eventos do quiz com payloads completos
- [ ] PostHog registra 5 eventos da landing
- [ ] UTMs preservadas do anúncio até `purchase_confirmed`
- [ ] Dashboard PostHog operacional

### Legal e ético
- [ ] Termos de Uso publicados e linkados
- [ ] Política de Privacidade publicada e linkada
- [ ] Política de Reembolso publicada e linkada
- [ ] Disclaimer não-diagnóstico visível em quiz + landing
- [ ] Sem texto placeholder em produção
- [ ] Sem prova social falsa
- [ ] Copy do anúncio passou pela validação de FOUNDATION-2

### Decisão e contingência
- [ ] ACQ-10 (critério matar/escalar) documentado e aprovado
- [ ] Você sabe pausar campanha rapidamente se algo der errado

---

## 8. Stack técnica consolidada

| Camada | Tecnologia | Custo v1 |
|---|---|---|
| **Frontend** | Vite 6 + React 18 + react-router-dom + recharts | Gratuito |
| **Hospedagem** | Vercel (deploy automático via git) | Tier gratuito |
| **Domínio** | Registro.br (.com.br) ou Namecheap (.com/.app) | ~R$ 40-100/ano |
| **Checkout** | Kiwify | ~9-10% por venda |
| **Analytics** | PostHog Cloud (free tier) | Gratuito até 1M eventos/mês |
| **Atribuição ads** | Pixel Meta + Conversion API | Gratuito |
| **Webhook handler** | Vercel Serverless Functions | Gratuito até 100k invocações/mês |
| **Versionamento** | Git + GitHub privado | Gratuito |
| **Anúncios** | Meta Ads (Instagram + Facebook) | R$ 300-750 soft test |
| **Total infraestrutura mensal v1** | — | ~R$ 0-30 (só domínio) |

---

## 9. Operação com agentes de IA

### Responsáveis (por código nos tickets)

- 🤖 **Codex (OpenAI)** — implementações pontuais, scripts, configurações
- 🧠 **Claude Code (Anthropic)** — refactor, mudanças no arquivo único Vite, integração de funcionalidades
- 🎯 **Você (orquestrando IA)** — produção de conteúdo, copy, design, decisões estratégicas
- 🔄 **Misto** — você decide e dirige IA, agente executa

### Padrão de handoff (definido em FOUNDATION-5)

1. Agente lê o ticket completo no Jira
2. Lê arquivos listados em "Dependências de leitura"
3. Lê `foundation/oferta-mvp.md` e `foundation/posicionamento-etico.md` se for ticket de copy
4. Implementa respeitando critérios de aceite
5. Roda comandos de validação listados
6. Atualiza ticket com resultado (print, comando rodado, status)

### Arquivos sempre relevantes

- `quiz/quiz-tdah-v1.jsx` (ou nova estrutura pós-FUNNEL-1)
- `quiz/quiz-tdah-especificacao-completa.md`
- `foundation/posicionamento-etico.md` (após FOUNDATION-2)
- `audits/ux-ui-adhd-funnel-audit-2026-05-09.md` (referência de polish)

---

## 10. Próximas decisões esperadas após v1

Decisões que ficaram para depois da primeira validação:

1. **Modalidade fiscal definitiva** (CPF → MEI → PJ): decidir ao passar de R$ 2.500/mês
2. **Nome próprio + identidade visual completa**: contratar designer ou continuar com IA
3. **A/B test de preço** (R$ 29 vs R$ 47 vs R$ 67): após 200+ vendas com R$ 29,90
4. **Plataforma de e-mail marketing** (para drip pós-compra): Resend, SendGrid, Mailerlite
5. **6 planners totalmente personalizados** (v1.5): se feedback indicar fricção em "1 base + variantes"
6. **Estratégia de SaaS** (v2/v3): após validar produto v1 com >500 compradores

---

## Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-05-11 | 1.0 | Documento inicial após brainstorming + criação no Jira | Rodrigo + Claude |

---

**Fim do documento.** Para detalhes de cada ticket, consultar diretamente no Jira (`https://the-abib-company.atlassian.net/jira/software/projects/KAN/boards`).
