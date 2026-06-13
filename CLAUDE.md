# CLAUDE.md - Planner TDAH · Operacao do funil de vendas

> Este arquivo e lido automaticamente pelo Claude Code.
> A fonte mestre de handoff e [`foundation/handoff-agentes-ia.md`](foundation/handoff-agentes-ia.md).
> O complemento operacional v1.1 para skills, context packs e gates fica em
> [`foundation/operacao-agentes-ia.md`](foundation/operacao-agentes-ia.md).

---

## Papel neste projeto

Voce e um engenheiro senior de produto + escritor tecnico executando tickets do
backlog **KAN (Planner TDAH)** no Jira `the-abib-company.atlassian.net`.
O projeto entrega um funil de venda para um infoproduto PDF imprimivel
personalizado por arquetipo de atencao, com quiz, landing, checkout Kiwify,
analytics e aquisicao via Instagram/Meta Ads.

A execucao deve ser sistematica, incremental e rastreavel. `CLAUDE.md` e
`AGENTS.md` sao adaptadores; eles nao devem virar fontes concorrentes.

---

## Antes de qualquer acao, leia

1. [`foundation/handoff-agentes-ia.md`](foundation/handoff-agentes-ia.md) - workflow mestre, validacoes e template de handoff
2. [`foundation/operacao-agentes-ia.md`](foundation/operacao-agentes-ia.md) - complemento operacional v1.1
3. [`docs/backlog-funil-vendas-2026-05-11.md`](docs/backlog-funil-vendas-2026-05-11.md) - mapeamento KAN, dependencias e roadmap
4. [`foundation/oferta-mvp.md`](foundation/oferta-mvp.md) - preco, escopo, garantia e oferta canonica
5. [`foundation/posicionamento-etico.md`](foundation/posicionamento-etico.md) - filtro obrigatorio de copy

Para tickets que tocam quiz, scoring ou arquetipos, leia tambem:

- [`docs/agent-context/quiz-scoring-context.md`](docs/agent-context/quiz-scoring-context.md)
- [`quiz/quiz-tdah-especificacao-completa.md`](quiz/quiz-tdah-especificacao-completa.md)
- [`audits/quiz-tdah-v1-handoff.md`](audits/quiz-tdah-v1-handoff.md) como referencia historica

---

## Skills de projeto para Claude Code

Claude Code deve usar os wrappers finos em `.claude/skills/`. Eles apontam para
os mesmos workflows e context packs usados pelo Codex.

| Skill Claude | Fonte compartilhada |
|---|---|
| `.claude/skills/planner-ticket-preflight/SKILL.md` | `docs/agent-workflows/planner-ticket-preflight.md` |
| `.claude/skills/planner-context-pack/SKILL.md` | `docs/agent-workflows/planner-context-pack.md` |
| `.claude/skills/planner-validation-runner/SKILL.md` | `docs/agent-workflows/planner-validation-runner.md` |
| `.claude/skills/planner-ethics-copy-review/SKILL.md` | `docs/agent-workflows/planner-ethics-copy-review.md` |
| `.claude/skills/planner-gate-pre-trafego/SKILL.md` | `docs/agent-workflows/planner-gate-pre-trafego.md` |
| `.claude/skills/planner-jira-github-sync/SKILL.md` | `docs/agent-workflows/planner-jira-github-sync.md` |
| `.claude/skills/planner-ticket-done/SKILL.md` | `docs/agent-workflows/planner-ticket-done.md` |
| `.claude/skills/tdah-ux-audit/SKILL.md` | `.agents/skills/tdah-ux-audit/SKILL.md` |
| `.claude/skills/design-evaluation-audit/SKILL.md` | `.agents/skills/design-evaluation-audit/SKILL.md` |

Use skills antes de subagentes. Subagentes Codex em `.codex/agents/` continuam
especificos do Codex, P2 e preferencialmente read-only.

---

## Workflow resumido

Detalhes completos estao em `foundation/handoff-agentes-ia.md` secao 3.

1. Ler ticket KAN-XX no Jira.
2. Rodar preflight read-only com `planner-ticket-preflight`.
3. Escolher context pack minimo com `planner-context-pack`.
4. Validar bloqueantes no Jira antes de implementar.
5. Implementar criterios de aceite em ordem P0 -> P1 -> P2 -> P3.
6. Rodar validacoes aplicaveis com `planner-validation-runner`.
7. Preparar fechamento com `planner-ticket-done` em dry-run.
8. Depois do dry-run revisado, fazer commit, push, comentario Jira e transicao 31.
9. Se houver memoria Claude configurada para o projeto, registrar apenas resumo factual de tickets concluidos e pendencias.

Agente IA nunca move ticket direto para `Concluido`; a transicao final e humana.

---

## Contexto tecnico atual

Use context packs para carregar somente o necessario:

| Area | Context pack |
|---|---|
| Quiz, scoring, arquetipos | `docs/agent-context/quiz-scoring-context.md` |
| Funil React/Vite e landing | `docs/agent-context/funil-react-vite-context.md` |
| Copy etica | `docs/agent-context/copy-etica-context.md` |
| Analytics/PostHog/Meta | `docs/agent-context/analytics-posthog-meta-context.md` |
| Kiwify/checkout | `docs/agent-context/kiwify-checkout-context.md` |
| Produto PDF | `docs/agent-context/produto-pdf-context.md` |
| Gate pre-trafego pago | `docs/agent-context/gate-pre-trafego-context.md` |
| Humano-only e humano+IA | `docs/agent-context/humano-only-humano-ia-context.md` |

Arquitetura principal do funil:

- `quiz/main.jsx` - entrypoint React/Vite
- `quiz/components/Quiz.jsx` - experiencia do quiz e resultado
- `quiz/components/Landing.jsx` - landing/oferta
- `quiz/components/CouponCountdown.jsx` - cupom e urgencia da oferta
- `quiz/components/Obrigado.jsx` - pos-checkout/obrigado quando aplicavel
- `quiz/data/archetypes.js` - arquetipos, scoring e dados de resultado
- `quiz/coupon.js` - configuracao de cupom/oferta

Jira e GitHub sempre prevalecem sobre este snapshot para estado atual.

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
| Qual o status do ticket KAN-XX? | Jira |
| Qual a sequencia de tickets? | `docs/backlog-funil-vendas-2026-05-11.md` |
| Quais KPIs / benchmarks? | `data/kpis.md` |
| Qual a promessa do anuncio? | `acquisition/promessa.md` |

---

Em caso de conflito, `foundation/handoff-agentes-ia.md` prevalece. Para temas
de operacao agentic v1.1, use `foundation/operacao-agentes-ia.md` como
complemento, sem contrariar o documento mestre.
