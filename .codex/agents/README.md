# .codex/agents/ — Subagentes do Codex

> ⚠️ **Estes arquivos são específicos do Codex (OpenAI) e NÃO são usados pelo Claude Code.**

Os arquivos `.toml` nesta pasta definem subagentes para o Codex CLI.
Cada subagente tem um papel especializado na auditoria do Quiz TDAH v1.

---

## Subagentes disponíveis

| Arquivo | Papel |
|---|---|
| `quiz-code-mapper.toml` | Mapear estrutura do código e divergências com o escopo |
| `adhd-ux-reviewer.toml` | Avaliar carga cognitiva, atenção, ritmo e dopamina |
| `marketing-funnel-reviewer.toml` | Avaliar copy, CTA, prova social e conversão |
| `browser-journey-auditor.toml` | Rodar o app e simular personas (requer Playwright) |
| `accessibility-performance-reviewer.toml` | Axe, Lighthouse, mobile, teclado |
| `handoff-synthesizer.toml` | Consolidar em relatório final priorizado |

---

## Se você está usando Claude Code

O Claude Code ignora os arquivos `.toml`. Para Claude Code, leia:

- **`CLAUDE.md`** — instruções automáticas ao iniciar (lidas pelo Claude Code)
- **`quiz/GUIA-IMPLEMENTACAO.md`** — guia mestre de implementação com código completo
- **`audits/quiz-tdah-v1-handoff.md`** — relatório de auditoria (fonte da verdade)

Os scripts de validação continuam funcionando com qualquer agente:

```bash
node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js
node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js
QUIZ_URL=http://localhost:PORT node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js
```
