# Planner TDAH v1 - Funil de venda, quiz e produto PDF

Projeto do funil de venda do Planner TDAH: quiz de arquetipos de atencao,
landing personalizada por resultado, oferta do PDF imprimivel, checkout Kiwify,
analytics e gate pre-trafego pago.

Este README e um snapshot operacional em 2026-06-13. Jira e GitHub sempre
prevalecem para estado atual de tickets, branches, PRs e entregas.

---

## 1. Visao geral

O funil atual cobre:

1. Captura do usuario no quiz.
2. Scoring em 6 arquetipos de atencao.
3. Resultado com CTA para landing personalizada.
4. Oferta MVP do planner PDF imprimivel.
5. Cupom/urgencia de 24h.
6. Checkout Kiwify.
7. Eventos PostHog e preservacao de UTMs para Meta/analytics.
8. Gate pre-trafego pago antes de escalar Instagram/Meta Ads.

Fontes canonicas:

- Oferta, preco, garantia e cupom: `foundation/oferta-mvp.md`
- Limites eticos de copy: `foundation/posicionamento-etico.md`
- Workflow de handoff: `foundation/handoff-agentes-ia.md`
- Operacao Codex/Claude: `foundation/operacao-agentes-ia.md`
- Backlog e dependencias: `docs/backlog-funil-vendas-2026-05-11.md`

---

## 2. Estado operacional

Snapshot de 2026-06-13:

| Item | Estado |
|---|---|
| KAN-132 | Concluido |
| KAN-133 | Concluido |
| KAN-134 | Concluido |
| KAN-24 | Em andamento em fluxo humano+IA |
| KAN-44 | Pendente como gate P0 antes de trafego pago |
| Infra agentic | v1.1 em analise no ticket KAN-135 |

Use Jira para confirmar qualquer mudanca posterior a este snapshot.

---

## 3. Stack atual

| Camada | Tecnologia | Uso |
|---|---|---|
| App | React 18 + Vite 6 | Quiz, landing e rotas do funil |
| Rotas | React Router 6 | `/`, `/planner/:slug`, `/obrigado`, legais |
| Analytics | PostHog (`posthog-js`) | Eventos do quiz/funil e enriquecimento com UTMs |
| Visualizacao | Recharts | Radar chart no resultado |
| Auditoria | Playwright + axe-core | A11y, jornada e validacao visual quando aplicavel |
| Checkout | Kiwify | Compra do PDF imprimivel |

---

## 4. Estrutura principal

```text
planner-tdah/
├── quiz/                         # App Vite/React do funil
│   ├── main.jsx                  # Entry point, rotas, PostHog e UTMs
│   ├── coupon.js                 # Cupom QUIZ24H, UTMs e URL de checkout
│   ├── components/
│   │   ├── Quiz.jsx              # Quiz, scoring, resultado e CTA
│   │   ├── Landing.jsx           # Landing personalizada por arquetipo
│   │   ├── CouponCountdown.jsx   # Urgencia/cupom da oferta
│   │   ├── Obrigado.jsx          # Pos-checkout/obrigado
│   │   ├── Termos.jsx
│   │   ├── Privacidade.jsx
│   │   └── Reembolso.jsx
│   ├── data/
│   │   └── archetypes.js         # Fonte canonica dos 6 arquetipos
│   └── quiz-tdah-v1.jsx          # Legado historico; nao e a arquitetura ativa
├── foundation/                   # Oferta, etica, handoff e operacao agentic
├── docs/agent-context/           # Context packs por area do funil
├── docs/agent-workflows/         # Workflows compartilhados Codex/Claude
├── .agents/skills/               # Skills Codex e scripts de auditoria
├── .claude/skills/               # Wrappers finos para Claude Code
└── .codex/agents/                # Subagentes Codex P2/read-only
```

Nao editar `quiz/dist/`, `node_modules/`, `.env*`, `.codex/config.toml` ou
`.claude/settings.local.json`.

---

## 5. Setup

Pre-requisitos:

- Node.js 18+
- npm 9+

Instalar dependencias do app:

```bash
cd quiz
npm install
```

Instalar dependencias de auditoria na raiz quando precisar de Playwright/axe:

```bash
npm install
npm run playwright:install
```

---

## 6. Comandos principais

Desenvolvimento:

```bash
cd quiz
npm run dev
```

Build:

```bash
cd quiz
npm run build
```

Preview:

```bash
cd quiz
npm run preview
```

Validacoes estaticas do quiz:

```bash
node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js
node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js
```

Auditoria de acessibilidade com servidor rodando:

```bash
QUIZ_URL=http://localhost:5173 node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js
```

Validacao documental/agentic:

```bash
git -c safe.directory=C:/Projects/Web/planner-tdah diff --check
Get-ChildItem -Recurse -Filter SKILL.md .agents/skills,.claude/skills |
  Select-String -Pattern '^name:|^description:' -Context 0,0
```

Nao rode build do quiz quando a mudanca for apenas documentacao ou skills.

---

## 7. Quiz, scoring e arquetipos

O quiz usa 15 perguntas e classifica o usuario em 6 arquetipos:

| Slug | Nome |
|---|---|
| `nomade-quantico` | O Nomade Quantico |
| `reator-em-cadeia` | O Reator em Cadeia |
| `vulcao-silencioso` | O Vulcao Silencioso |
| `arquiteto-do-caos` | O Arquiteto do Caos |
| `furacao` | O Furacao |
| `camaleao-exausto` | O Camaleao Exausto |

Arquivos principais:

- `quiz/components/Quiz.jsx`
- `quiz/data/archetypes.js`
- `quiz/quiz-tdah-especificacao-completa.md`
- `docs/agent-context/quiz-scoring-context.md`

Depois de mudar scoring, perguntas ou dados de arquetipo, rode as validacoes de
scoring e extracao de conteudo antes do handoff.

---

## 8. Operacao com agentes

Codex e Claude Code usam a mesma fonte operacional:

- Codex: `AGENTS.md` + `.agents/skills/planner-*`
- Claude Code: `CLAUDE.md` + `.claude/skills/planner-*`
- Fonte compartilhada: `docs/agent-workflows/*` e `docs/agent-context/*`

Skills P0:

- `planner-ticket-preflight`
- `planner-context-pack`
- `planner-validation-runner`
- `planner-ethics-copy-review`
- `planner-gate-pre-trafego`
- `planner-jira-github-sync`
- `planner-ticket-done`

`planner-ticket-done` e dry-run por padrao. Jira/GitHub so devem ser mutados
apos confirmacao explicita, exceto quando a propria tarefa atual ja pedir commit,
push, comentario ou transicao.

---

## 9. Gates e seguranca

- Toda copy passa por `foundation/posicionamento-etico.md`.
- Oferta e checkout devem permanecer coerentes com `foundation/oferta-mvp.md`.
- KAN-44 e o gate P0 antes de trafego pago.
- O gate pre-trafego deve emitir `GO`, `NO-GO` ou `GO COM RISCO`.
- Fluxos `humano-only` e `humano+IA` estao definidos em
  `docs/agent-context/humano-only-humano-ia-context.md`.

Para detalhes operacionais, use `foundation/operacao-agentes-ia.md`.
