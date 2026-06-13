# .codex/agents/ - Subagentes do Codex

> Estes arquivos sao especificos do Codex (OpenAI) e nao sao usados pelo
> Claude Code.

Os arquivos `.toml` nesta pasta definem subagentes especializados para auditoria
do funil e do Quiz TDAH. Na infraestrutura operacional v1.1 eles sao recursos
P2/read-only: use apenas quando uma revisao focada justificar o custo de
orquestracao.

A camada P0 para execucao de tickets e:

- `foundation/operacao-agentes-ia.md`
- `docs/agent-workflows/*`
- `docs/agent-context/*`
- `.agents/skills/planner-*`

Claude Code usa wrappers em `.claude/skills/*`; ele ignora estes `.toml`.

---

## Subagentes disponiveis

| Arquivo | Papel |
|---|---|
| `quiz-code-mapper.toml` | Mapear estrutura do codigo e divergencias com o escopo |
| `adhd-ux-reviewer.toml` | Avaliar carga cognitiva, atencao, ritmo e dopamina |
| `marketing-funnel-reviewer.toml` | Avaliar copy, CTA, prova social e conversao |
| `browser-journey-auditor.toml` | Rodar o app e simular personas, quando Playwright for necessario |
| `accessibility-performance-reviewer.toml` | Axe, Lighthouse, mobile e teclado |
| `handoff-synthesizer.toml` | Consolidar achados em relatorio priorizado |

---

## Quando usar

Use subagentes quando:

- o ticket for uma auditoria ampla ou comparativa;
- houver escopos disjuntos que possam ser revisados em paralelo;
- a tarefa pedir explicitamente avaliacao de UX, funil, acessibilidade ou
  mapeamento tecnico com maior cobertura.

Nao use subagentes para:

- preflight comum de ticket;
- selecao de contexto;
- fechamento e handoff;
- validacoes mecanicas ja cobertas por scripts.

---

## Validacoes compartilhadas

Os scripts de validacao continuam funcionando com qualquer agente:

```bash
node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js
node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js
QUIZ_URL=http://localhost:PORT node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js
```
