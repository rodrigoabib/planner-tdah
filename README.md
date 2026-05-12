# Quiz TDAH v1 — Como sua atenção funciona?

Quiz interativo de 15 perguntas que identifica o padrão de atenção do usuário entre 6 arquétipos comportamentais. Construído como componente React de arquivo único com gamificação (XP, marcos), radar chart e foco em UX ADHD-friendly.

---

## Stack técnica

| Tecnologia | Versão | Papel |
|---|---|---|
| React | 18.3.x | UI, estado, efeitos |
| Vite | 6.x | Dev server, build, preview |
| Recharts | 2.13.x | Radar chart na tela de resultado |
| Node.js | 18+ | Scripts de validação |
| Playwright + axe-core | (raiz) | Auditoria de acessibilidade |

---

## Estrutura do projeto

```
planner-tdah/
├── quiz/                          ← Projeto do quiz (Vite + React)
│   ├── quiz-tdah-v1.jsx           ← Componente único — ÚNICO arquivo a editar
│   ├── main.jsx                   ← Entry point do Vite
│   ├── index.html                 ← HTML root com dark bg global e favicon SVG
│   ├── vite.config.js
│   ├── package.json
│   ├── GUIA-IMPLEMENTACAO.md      ← Guia de implementação por achado de auditoria
│   └── quiz-tdah-especificacao-completa.md
│
├── audits/
│   └── ux-ui-adhd-funnel-audit-2026-05-09.md  ← Auditoria UX/UI completa (fonte de verdade)
│
├── .agents/skills/tdah-ux-audit/
│   ├── scripts/
│   │   ├── score-archetype-paths.js   ← Valida os 6 arquétipos (similarity 10/10)
│   │   ├── extract-quiz-content.js    ← Extrai perguntas, opções e eventos analytics
│   │   └── run-a11y-audit.js          ← Auditoria axe-core via Playwright
│   └── references/                    ← Checklists UX, a11y, copy, personas
│
├── node_modules/                  ← Playwright + axe-core (para auditoria a11y)
├── package.json                   ← Dependências raiz (Playwright)
├── CLAUDE.md                      ← Instruções para o Claude Code
└── quiz-menu.bat                  ← Menu interativo (Windows)
```

---

## Arquétipos identificados

| Slug | Nome | Símbolo |
|---|---|---|
| `nomade-quantico` | O Nômade Quântico | ∞ |
| `reator-em-cadeia` | O Reator em Cadeia | ⚡ |
| `vulcao-silencioso` | O Vulcão Silencioso | 🌋 |
| `arquiteto-do-caos` | O Arquiteto do Caos | 🏗 |
| `furacao` | O Furacão | 🌀 |
| `camaleao-exausto` | O Camaleão Exausto | 🦎 |

A CTA de resultado aponta para `/planner?perfil=<slug>` — substitua quando a landing de venda existir.

---

## Setup

### Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

### Instalação

```bash
# Instalar dependências do quiz
cd quiz
npm install

# (Opcional) Instalar dependências da raiz — necessário para auditoria a11y
cd ..
npm install
```

---

## Comandos principais

### Desenvolvimento

```bash
cd quiz
npm run dev
# Abre em http://localhost:5173
```

### Build de produção

```bash
cd quiz
npm run build
# Saída em quiz/dist/
```

### Preview do build

```bash
cd quiz
npm run preview
# Serve quiz/dist/ em http://localhost:4173
```

---

## Validações

### Validar 6 arquétipos (sem servidor necessário)

```bash
node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js
# Esperado: 6/6 arquétipos com similarity 10/10
```

### Extrair conteúdo do quiz (análise estática)

```bash
node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js
# Lista perguntas, opções, arquétipos e eventos analytics detectados
```

### Auditoria de acessibilidade axe-core (requer servidor rodando)

```bash
# Terminal 1: iniciar o quiz
cd quiz && npm run dev

# Terminal 2: rodar a auditoria
QUIZ_URL=http://localhost:5173 node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js
```

---

## Arquitetura do componente (`quiz-tdah-v1.jsx`)

O arquivo é estruturado em seções lineares — edite apenas dentro do bloco indicado:

| Linhas (aprox.) | Conteúdo |
|---|---|
| 1–5 | Imports (`react`, `recharts`) |
| 6–45 | Constante `CSS` (template literal com todos os estilos) |
| 46–90 | Array `Q` — 15 perguntas com opções e scores por dimensão |
| 92–130 | Objeto `ARC` — 6 arquétipos com thresholds, copy e ctaUrl |
| 132–160 | Funções puras: `calcScores`, `sev`, `findArc`, `trackQuizEvent` |
| 161–200 | Componente `Confetti` |
| 200–250 | Componente `Landing` |
| 250–290 | Componente `Header` (barra de progresso + XP) |
| 290–340 | Componente `QuestionCard` |
| 340–390 | Componente `MilestoneCard` |
| 390–430 | Componente `Processing` |
| 430–500 | Componente `Result` |
| 500–fim | Componente `App` (estado central + handlers) |

### Dimensões de scoring

| Dimensão | Código | Max | Descrição |
|---|---|---|---|
| Desatenção | D | 11 | Dificuldade de foco e organização |
| Hiperatividade | H | 9 | Inquietação, excesso de energia |
| Impulsividade | I | 9 | Ação sem reflexo prévio |
| Afeto/Regulação | A | 11 | Regulação emocional e humor |
| Executivo | E | 11 | Planejamento e controle executivo |

### Analytics (`trackQuizEvent`)

Eventos disparados (via `console.log` + `window.quizAnalytics?.track`):

| Evento | Quando |
|---|---|
| `quiz_started` | Clique em "Começar agora" |
| `question_answered` | Nova resposta (não reanswer) |
| `milestone_reached` | Marco 1, 2 ou 3 |
| `quiz_completed` | Processamento concluído |
| `archetype_revealed` | Resultado exibido |
| `cta_clicked` | Clique no CTA de resultado |
| `quiz_abandoned` | Aba oculta por 30s+ (deduplicado) |

---

## Regras de modificação

1. **Não criar arquivos `.jsx`/`.css` novos** — todo CSS vai no final da constante `CSS`
2. **Não instalar dependências** — sem `framer-motion`, `canvas-confetti`, etc.
3. **Sempre rodar `score-archetype-paths.js`** após mudanças em scoring ou `findArc`
4. **Prioridade de mudanças**: P0 → P1 → P2 → P3
5. **Entrega completa**: nunca pseudocódigo, sempre código funcional

---

## Status da implementação

Auditoria UX/UI ADHD (2026-05-09) implementada integralmente em 2026-05-10.

- Build Vite: ✅ sem erros
- 6/6 arquétipos validados: ✅ similarity 10/10
- Contrast AA: ✅ todos os tokens auditados
- Acessibilidade: ✅ landmarks, skip-link, foco programático, headings visually-hidden
- Analytics: ✅ 7 eventos, dedup de abandon, timer 30s
- Scoring: ✅ cap por dimensão, denominadores corretos no Marco 2

**Único bloqueador remanescente:** landing de venda em `/planner?perfil=<slug>`.
