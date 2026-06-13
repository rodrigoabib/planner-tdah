# Context pack: quiz, scoring e arquetipos

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `quiz/quiz-tdah-especificacao-completa.md`, `.agents/skills/tdah-ux-audit/SKILL.md`
> **Sumario:** contexto minimo para tarefas que tocam quiz, scoring, arquetipos, resultado ou scripts de validacao.

---

## 1. Quando ler

Leia quando o ticket mencionar quiz, perguntas, opcoes, scoring, `ARC`, arquetipos, resultado, radar, microcopy do quiz ou validacao de caminhos.

## 2. Fontes obrigatorias

- Ticket Jira KAN.
- `quiz/quiz-tdah-especificacao-completa.md`.
- `quiz/data/archetypes.js`.
- `quiz/components/Quiz.jsx`.
- `.agents/skills/tdah-ux-audit/SKILL.md`.
- `audits/quiz-tdah-v1-handoff.md` como referencia historica.

## 3. Validacoes

| Mudanca | Validacao |
|---|---|
| scoring, arquetipos, thresholds ou resultado | `node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js` |
| perguntas, opcoes, microcopy ou eventos | `node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js` |
| UI do quiz | `cd quiz && npx vite build` e a11y/mobile se aplicavel |

## 4. Riscos

- Quebrar correspondencia entre quiz e landing por slug.
- Tratar quiz como diagnostico clinico.
- Alterar copy sem revisar posicionamento etico.
- Mudar scoring sem evidenciar 6/6 caminhos.

## 5. O que nao fazer

- Nao criar dependencia nova sem autorizacao.
- Nao forcar baixa confianca em arquetipo sem criterio.
- Nao alterar produto ou landing se o ticket e so auditoria.

## 6. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Context pack inicial de quiz/scoring | Codex |
