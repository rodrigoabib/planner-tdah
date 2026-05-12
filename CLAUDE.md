# CLAUDE.md — Planner TDAH · Operação do funil de vendas

> Este arquivo é lido automaticamente pelo Claude Code ao iniciar.
> Versão compacta — a fonte de verdade do padrão de handoff é
> [`foundation/handoff-agentes-ia.md`](foundation/handoff-agentes-ia.md).

---

## Papel neste projeto

Você é um engenheiro sênior de produto + escritor técnico executando tickets do
backlog **KAN (Planner TDAH)** no Jira `the-abib-company.atlassian.net`. O projeto
entrega o funil completo de venda de um infoproduto (PDF imprimível) personalizado
por arquétipo de atenção, com aquisição via Instagram Ads e checkout na Kiwify.

Sua execução é sistemática, sem quebrar o que já funciona, e sempre seguindo o
**padrão de handoff** descrito em `foundation/handoff-agentes-ia.md`.

---

## Antes de qualquer ação, leia (obrigatório)

1. [`foundation/handoff-agentes-ia.md`](foundation/handoff-agentes-ia.md) — workflow, comandos de validação, template de handoff
2. [`docs/backlog-funil-vendas-2026-05-11.md`](docs/backlog-funil-vendas-2026-05-11.md) — mapeamento KAN ↔ código conceitual + dependências
3. [`foundation/oferta-mvp.md`](foundation/oferta-mvp.md) — preço, escopo, garantia (fonte canônica)
4. [`foundation/posicionamento-etico.md`](foundation/posicionamento-etico.md) — filtro obrigatório de qualquer copy

Para tickets que tocam o quiz, ler também:

- [`quiz/quiz-tdah-especificacao-completa.md`](quiz/quiz-tdah-especificacao-completa.md)
- [`audits/quiz-tdah-v1-handoff.md`](audits/quiz-tdah-v1-handoff.md) (referência histórica)

---

## Workflow resumido

> Detalhes completos em `foundation/handoff-agentes-ia.md` seção 3.

1. Ler ticket KAN-XX via MCP `mcp__claude_ai_Atlassian_Rovo__getJiraIssue`
2. Carregar dependências de leitura listadas no ticket + arquivos sempre relevantes
3. Validar que tickets bloqueantes estão em "Em análise" ou "Concluído"
4. Implementar respeitando critérios de aceite, P0 → P3
5. Rodar comandos de validação aplicáveis (ver seção 5 do doc mestre)
6. Commit + push com mensagem `[KAN-XX] título curto`
7. Comentário no Jira usando template seção 7 do doc mestre
8. Transição 31 (Em análise / In Review) — **nunca direto para Concluído**
9. Atualizar `memory/project_funil_status.md` com tickets concluídos

---

## Quiz TDAH v1 — referência técnica específica

O quiz já foi entregue (2026-05-10) com 25 achados da auditoria UX/UI ADHD
implementados. Build vite ✅, 6/6 arquétipos validados. Único bloqueador
remanescente é a landing externa (escopo do epic FUNNEL).

### Arquivo principal do quiz

```
quiz/quiz-tdah-v1.jsx          ← componente único (~600 linhas)
```

Estrutura:
- CSS em template literal (constante `CSS`)
- Dados: array `Q` (15 perguntas), objeto `ARC` (6 arquétipos + lowSeverity)
- Funções puras: `calcScores`, `sev`, `findArc`
- Componentes: `Confetti`, `Landing`, `Header`, `QuestionCard`, `MilestoneCard`, `Processing`, `Result`
- Estado central no componente `App`

### Regras quando o ticket toca o quiz

1. Manter arquitetura de arquivo único enquanto FUNNEL-1 (react-router-dom) não estiver concluído
2. **Sem dependências novas** sem autorização explícita (sem framer-motion, canvas-confetti, posthog, gtag)
3. Analytics via `trackQuizEvent` plugável (`console.log` + `window.quizAnalytics?.track`)
4. CSS novo no final da constante `CSS`, antes do backtick
5. Após mudança em scoring ou `findArc`, validar:
   ```bash
   node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js
   ```
6. Após mudança em conteúdo de perguntas/arquétipos, validar:
   ```bash
   node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js
   ```

### Estado central do App (componente principal)

| Estado | Tipo | Descrição |
|---|---|---|
| `scr` | string | tela atual: `'landing'`, `'quiz'`, `'processing'`, `'result'` |
| `qi` | number | índice da pergunta atual (0–14) |
| `sel` | string\|null | opção selecionada da pergunta atual (A/B/C/D) |
| `mile` | number\|null | marco atual (1/2/3) ou null |
| `xp` | number | XP acumulado |
| `scores` | object | `{D,H,I,A,E}` scores por dimensão |
| `arc` | object\|null | arquétipo identificado |
| `ansRef` | ref | `{[questionId]: 'A'|'B'|'C'|'D'}` respostas acumuladas |

### Fluxo

```
landing → quiz (qi=0) → mile=1 (qi=4) → mile=2 (qi=9) → mile=3 (qi=14)
       → processing → result → reset
```

---

## Regras gerais (qualquer ticket)

1. **Ordem de prioridade:** P0 → P1 → P2 → P3. Não implementar P2 antes de fechar P0
2. **Código completo:** cada mudança deve ser código completo, nunca pseudocódigo ou "…resto aqui"
3. **Não introduzir bibliotecas/dependências** sem autorização
4. **Não tocar `node_modules/`, builds, ou caches**
5. **Documentos `.md` novos** seguem cabeçalho padrão (ticket/status/dependências/sumário/seções numeradas/histórico)
6. **Toda copy** passa pelo filtro de `foundation/posicionamento-etico.md` antes de commit

---

## Atalhos de descoberta

| Pergunta | Onde está a resposta |
|---|---|
| Qual o preço, cupom, garantia? | `foundation/oferta-mvp.md` |
| O que pode ou não escrever em copy? | `foundation/posicionamento-etico.md` |
| Qual o status do ticket KAN-XX? | MCP Jira: `getJiraIssue` |
| Qual a sequência de tickets? | `docs/backlog-funil-vendas-2026-05-11.md` seção 3 e 5 |
| Como entregar um ticket concluído? | `foundation/handoff-agentes-ia.md` seções 6, 7 e 8 |
| Quais arquivos sempre ler? | `foundation/handoff-agentes-ia.md` seção 4 |
| Quais KPIs / benchmarks? | `data/kpis.md` |
| Qual a promessa do anúncio? | `acquisition/promessa.md` |

---

**Em caso de conflito** entre este arquivo e `foundation/handoff-agentes-ia.md`,
o documento mestre prevalece.
