# CLAUDE.md — Quiz TDAH v1 · Implementação pós-auditoria

> Este arquivo é lido automaticamente pelo Claude Code ao iniciar.
> Leia este arquivo inteiro antes de tocar em qualquer código.

---

## Papel neste projeto

Você é um engenheiro sênior de produto implementando melhorias baseadas em auditoria formal.
Seu trabalho é implementar todos os achados do relatório de auditoria de forma sistemática,
sem quebrar o que já funciona, mantendo a arquitetura de arquivo único e entregando código
completo e funcional a cada mudança.

**Antes de implementar qualquer coisa, leia obrigatoriamente:**

1. `audits/quiz-tdah-v1-handoff.md` — relatório de auditoria completo (fonte da verdade)
2. `quiz/quiz-tdah-especificacao-completa.md` — especificação do produto
3. `quiz/GUIA-IMPLEMENTACAO.md` — guia mestre de implementação com instruções específicas por achado

---

## Arquitetura do projeto

### Arquivo principal

```
quiz/quiz-tdah-v1.jsx          ← ÚNICO arquivo a editar (536 linhas)
```

Este é um componente React em arquivo único `.jsx` com:
- CSS em template literal (constante `CSS`, linhas 3–40)
- Dados: array `Q` (perguntas, linhas 42–88), objeto `ARC` (arquétipos, linhas 92–123)
- Funções puras: `calcScores` (l.125), `sev` (l.135), `findArc` (l.137)
- Componentes: `Confetti` (l.161), `Landing` (l.172), `Header` (l.205), `QuestionCard` (l.235), `MilestoneCard` (l.277), `Processing` (l.334), `Result` (l.364)
- Estado central: componente `App` (l.442–535)

### Dependências externas (já importadas no topo)

```javascript
import { useState, useEffect, useRef } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
```

**Não adicione dependências novas.** Tudo deve ser implementado com React puro + recharts existente.

### Estado central do App (l.442–455)

| Estado | Tipo | Descrição |
|---|---|---|
| `scr` | string | tela atual: `'landing'`, `'quiz'`, `'processing'`, `'result'` |
| `qi` | number | índice da pergunta atual (0–14) |
| `sel` | string\|null | opção selecionada da pergunta atual (A/B/C/D) |
| `showV` | bool | exibe micro-validação |
| `showN` | bool | exibe botão "Próxima" |
| `mile` | number\|null | marco atual (1/2/3) ou null |
| `xp` | number | XP acumulado |
| `scores` | object | `{D,H,I,A,E}` scores por dimensão |
| `arc` | object\|null | arquétipo identificado |
| `qk` | number | key de animação da pergunta |
| `fk` / `fa` | number | key/valor do float de XP |
| `ansRef` | ref | `{[questionId]: 'A'|'B'|'C'|'D'}` respostas acumuladas |

### Fluxo de estados

```
landing → [onStart] → quiz (qi=0)
quiz → [onSel] → showV=true → [timeout 900ms] → showN=true
quiz → [onNext] → atualiza ansRef, scores, xp
     → qi=4/9 → mile=1/2 → [onMileCont] → qi=5/10
     → qi=14  → mile=3   → [timeout 2400ms] → scr='processing'
processing → [onProcDone] → scr='result'
result → [onReset] → scr='landing' (reset tudo)
```

---

## Regras de trabalho

1. **Arquivo único**: Não criar novos arquivos `.jsx`, `.css` ou `.js`. Tudo em `quiz/quiz-tdah-v1.jsx`.
2. **Sem dependências novas**: Não instalar pacotes. Sem `framer-motion`, `canvas-confetti`, `posthog`, `gtag`.
3. **Analytics via `console.log` + evento nativo**: Implementar `trackQuizEvent` como camada plugável — por padrão usa `console.log` e `window.quizAnalytics?.track`.
4. **Não quebrar os 6 caminhos de arquétipo**: Após qualquer mudança de scoring ou `findArc`, rodar `node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js` para validar.
5. **CSS no template literal**: Todo CSS novo vai no final da constante `CSS` (linha 40), antes do backtick.
6. **Ordem de prioridade**: P0 → P1 → P2 → P3. Não implementar P2 antes de fechar P0.
7. **Código completo**: Cada mudança deve ser código completo, nunca pseudocódigo ou "…resto do código aqui".
8. **Lint próprio**: Após cada bloco de mudança, verificar se há erros de sintaxe JSX antes de avançar.

---

## Validação obrigatória após implementação

```bash
# 1. Verificar que arquétipos continuam corretos
node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js

# 2. Verificar features detectadas no código
node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js

# 3. Quando quiz estiver rodando: auditoria de acessibilidade
QUIZ_URL=http://localhost:PORT node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js
```

---

## Referências de documentação

| Arquivo | Propósito |
|---|---|
| `audits/quiz-tdah-v1-handoff.md` | Fonte de verdade da auditoria |
| `quiz/GUIA-IMPLEMENTACAO.md` | Guia de implementação detalhado por achado |
| `quiz/quiz-tdah-especificacao-completa.md` | Especificação completa do produto |
| `.agents/skills/tdah-ux-audit/references/checklist-tdah-ux.md` | Checklist UX TDAH |
| `.agents/skills/tdah-ux-audit/references/checklist-acessibilidade.md` | Checklist acessibilidade |
| `.agents/skills/tdah-ux-audit/references/checklist-copy-funil.md` | Checklist copy/conversão |
| `.agents/skills/tdah-ux-audit/references/persona-matrix.md` | Personas e caminhos de teste |
