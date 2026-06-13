# AGENTS.md - Planner TDAH · Operacao do funil de vendas

> Compatibilidade de agentes
>
> Este arquivo e lido automaticamente pelo Codex (OpenAI).
> O Claude Code le `CLAUDE.md` na raiz. Ambos apontam para o mesmo contrato
> mestre: [`foundation/handoff-agentes-ia.md`](foundation/handoff-agentes-ia.md).
> A infraestrutura operacional v1.1 fica em
> [`foundation/operacao-agentes-ia.md`](foundation/operacao-agentes-ia.md).

---

## Papel neste projeto

Voce e um agente executor de tickets do backlog **KAN (Planner TDAH)** no Jira
`the-abib-company.atlassian.net`. O projeto entrega o funil completo de venda de
um infoproduto PDF imprimivel personalizado por arquetipo de atencao, com quiz,
landing, checkout Kiwify, analytics e aquisicao via Instagram/Meta Ads.

A execucao deve ser sistematica, incremental e rastreavel. O padrao de handoff
esta em `foundation/handoff-agentes-ia.md`; o complemento v1.1 de operacao com
skills, context packs e gates esta em `foundation/operacao-agentes-ia.md`.

---

## Antes de qualquer acao, leia

1. [`foundation/handoff-agentes-ia.md`](foundation/handoff-agentes-ia.md) - workflow mestre, validacoes, template de handoff
2. [`foundation/operacao-agentes-ia.md`](foundation/operacao-agentes-ia.md) - complemento operacional v1.1 para Codex e Claude Code
3. [`docs/backlog-funil-vendas-2026-05-11.md`](docs/backlog-funil-vendas-2026-05-11.md) - mapeamento KAN, dependencias e roadmap
4. [`foundation/oferta-mvp.md`](foundation/oferta-mvp.md) - preco, escopo, garantia e oferta canonica
5. [`foundation/posicionamento-etico.md`](foundation/posicionamento-etico.md) - filtro obrigatorio de copy

Para tickets que tocam quiz, scoring ou arquetipos, leia tambem:

- [`docs/agent-context/quiz-scoring-context.md`](docs/agent-context/quiz-scoring-context.md)
- [`quiz/quiz-tdah-especificacao-completa.md`](quiz/quiz-tdah-especificacao-completa.md)
- [`audits/quiz-tdah-v1-handoff.md`](audits/quiz-tdah-v1-handoff.md) como referencia historica

---

## Infraestrutura operacional v1.1

As fontes duraveis sao:

- `docs/agent-workflows/` - workflows compartilhados por Codex e Claude Code
- `docs/agent-context/` - context packs canonicos por area do funil
- `.agents/skills/planner-*` - skills P0 para Codex
- `.claude/skills/planner-*` - wrappers finos para Claude Code

Skills P0 disponiveis para Codex:

| Skill | Uso |
|---|---|
| `.agents/skills/planner-ticket-preflight/SKILL.md` | Preflight read-only antes de iniciar ticket |
| `.agents/skills/planner-context-pack/SKILL.md` | Escolher o menor pacote de contexto necessario |
| `.agents/skills/planner-validation-runner/SKILL.md` | Rodar validacoes por categoria, sem testes irrelevantes |
| `.agents/skills/planner-ethics-copy-review/SKILL.md` | Revisar copy contra posicionamento etico |
| `.agents/skills/planner-gate-pre-trafego/SKILL.md` | Emitir veredito GO, NO-GO ou GO COM RISCO antes de trafego pago |
| `.agents/skills/planner-jira-github-sync/SKILL.md` | Detectar divergencias Jira/GitHub; mutacao so com confirmacao |
| `.agents/skills/planner-ticket-done/SKILL.md` | Fechamento em modo dry-run por padrao |

Use skills antes de subagentes. Os subagentes em `.codex/agents/` continuam
P2/read-only e devem ser usados apenas para auditorias ou revisoes focadas.

---

## Workflow resumido

Detalhes completos estao em `foundation/handoff-agentes-ia.md` secao 3.

1. Ler o ticket KAN-XX no Jira.
2. Rodar preflight read-only com `planner-ticket-preflight`.
3. Selecionar context pack minimo com `planner-context-pack`.
4. Validar bloqueantes no Jira antes de implementar.
5. Implementar criterios de aceite em ordem P0 -> P1 -> P2 -> P3.
6. Rodar validacoes aplicaveis com `planner-validation-runner`.
7. Preparar fechamento com `planner-ticket-done` em dry-run.
8. Somente depois de revisar o dry-run, fazer commit, push, comentario Jira e transicao 31.

Agente IA nunca move ticket direto para `Concluido`; a transicao final e humana.

---

## Comandos de validacao por categoria

| Categoria | Comando |
|---|---|
| Scoring/arquetipos do quiz | `node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js` |
| Conteudo do quiz | `node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js` |
| Build quiz/LP | `cd quiz && npx vite build` |
| Acessibilidade | `QUIZ_URL=http://localhost:PORT node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js` |
| Copy | Revisao manual contra `foundation/posicionamento-etico.md` secoes 2 e 4 |
| Analytics | DevTools -> console -> completar acao -> verificar evento |
| Mobile | Screenshot 320px e 768px quando houver mudanca visual |
| Documentacao/skills | `git -c safe.directory=C:/Projects/Web/planner-tdah diff --check` |

Nao rode build do quiz quando o ticket alterar apenas documentacao ou skills.

---

## Context packs principais

| Area | Context pack |
|---|---|
| Quiz, scoring, arquetipos | `docs/agent-context/quiz-scoring-context.md` |
| Landing/funil React Vite | `docs/agent-context/funil-react-vite-context.md` |
| Copy etica | `docs/agent-context/copy-etica-context.md` |
| Analytics/PostHog/Meta | `docs/agent-context/analytics-posthog-meta-context.md` |
| Kiwify/checkout | `docs/agent-context/kiwify-checkout-context.md` |
| Produto PDF | `docs/agent-context/produto-pdf-context.md` |
| Gate pre-trafego pago | `docs/agent-context/gate-pre-trafego-context.md` |
| Humano-only e humano+IA | `docs/agent-context/humano-only-humano-ia-context.md` |

---

## Regras gerais

1. Prioridade de execucao: P0 -> P1 -> P2 -> P3.
2. Mudancas devem ser completas; nunca entregar pseudocodigo.
3. Nao introduzir bibliotecas ou dependencias sem autorizacao.
4. Nao tocar `node_modules/`, builds, caches, `.env*`, `.codex/config.toml` ou `.claude/settings.local.json`.
5. Documentos `.md` novos seguem cabecalho padrao do projeto.
6. Toda copy passa pelo filtro de `foundation/posicionamento-etico.md`.
7. Mutacoes em Jira/GitHub feitas por skills de sync/done exigem confirmacao explicita, salvo pedido direto do humano na tarefa atual.

---

## Atalhos de descoberta

| Pergunta | Onde esta a resposta |
|---|---|
| Como entregar um ticket? | `foundation/handoff-agentes-ia.md` |
| Como operar skills/context packs/gates? | `foundation/operacao-agentes-ia.md` |
| Qual o preco, cupom, garantia? | `foundation/oferta-mvp.md` |
| O que pode ou nao escrever em copy? | `foundation/posicionamento-etico.md` |
| Qual a sequencia de tickets? | `docs/backlog-funil-vendas-2026-05-11.md` |
| Quais KPIs / benchmarks? | `data/kpis.md` |
| Qual a promessa do anuncio? | `acquisition/promessa.md` |

---

Em caso de conflito, `foundation/handoff-agentes-ia.md` prevalece. Para temas
de operacao agentic v1.1, use `foundation/operacao-agentes-ia.md` como
complemento, sem contrariar o documento mestre.
