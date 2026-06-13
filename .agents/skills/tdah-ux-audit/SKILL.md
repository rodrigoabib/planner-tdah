---
name: tdah-ux-audit
description: Use esta skill quando a tarefa envolver auditoria de UX/UI, conteúdo, gamificação, retenção de atenção, dopamina, funil de venda ou conversão em quizzes para pessoas com TDAH.
---

<!-- NOTA DE COMPATIBILIDADE
  Este SKILL.md continua sendo a fonte completa da skill de auditoria TDAH para Codex.
  Claude Code usa o wrapper fino em .claude/skills/tdah-ux-audit/SKILL.md, que aponta
  para esta skill e para os context packs em docs/agent-context/.

  Fontes operacionais compartilhadas:
    - foundation/operacao-agentes-ia.md
    - docs/agent-workflows/
    - docs/agent-context/quiz-scoring-context.md

  Os recursos abaixo continuam validos para ambos os agentes:
    - references/         -> checklists de UX, copy, acessibilidade, personas
    - scripts/            -> extract-quiz-content.js, score-archetype-paths.js, run-a11y-audit.js
-->

# TDAH UX Audit Skill

Você deve auditar o quiz considerando adultos com TDAH no Brasil.

## Objetivo

Identificar problemas de UX, UI, conteúdo, copy, acessibilidade, gamificação, fluxo emocional, scoring, arquétipos, retenção e conversão.

## Referências obrigatórias

Antes de auditar, leia:

- `.agents/skills/tdah-ux-audit/references/checklist-tdah-ux.md`
- `.agents/skills/tdah-ux-audit/references/checklist-copy-funil.md`
- `.agents/skills/tdah-ux-audit/references/checklist-acessibilidade.md`
- `.agents/skills/tdah-ux-audit/references/persona-matrix.md`

## Restrições obrigatórias

- **Não** reescreva código por preferência estética
- **Não** proponha mudanças visuais sem explicar impacto comportamental em usuários com TDAH
- **Não** trate o quiz como diagnóstico clínico definitivo
- **Não** altere código nesta etapa sem ordem explícita
- **Prove cada crítica com evidência** — trecho de código, comportamento observado ou referência ao escopo

## Scripts disponíveis

Execute quando necessário:

```bash
# Extrair conteúdo estruturado do quiz (perguntas, opções, scoring, validações)
node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js

# Simular caminhos de resposta e verificar arquétipos gerados
node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js

# Rodar auditoria de acessibilidade automatizada com axe-core
node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js
```

## Checklist essencial (antes de qualquer achado)

### Perguntas e alternativas
1. A pergunta tem no máximo 12 palavras?
2. As alternativas são específicas e comportamentais (não vagas)?
3. Cada opção tem no máximo 8 palavras?
4. A opção A é a de maior severidade e mais reconhecível?
5. As 4 opções cobrem o espectro completo de forma mutuamente exclusiva?

### Micro-validações
6. A micro-validação tem no máximo 15 palavras?
7. O tom é empático e nunca condescendente?
8. Ela cria sensação de ser compreendido, não diagnosticado?
9. Ela planta curiosidade sobre o resultado?

### Progresso e gamificação
10. O progresso está sempre visível (fração + barra + porcentagem)?
11. O XP segue exatamente a regra: +10/pergunta, +5 velocidade, +25 Marco 1/2, +50 Marco 3?
12. Os marcos aparecem no momento correto (após Q5, Q10, Q15)?
13. O radar parcial do Marco 2 é narrativamente correto e logicamente honesto?
14. Os teasers progressivos aparecem nas perguntas corretas (Q3, Q7, Q9, Q12, Q14)?

### Ritmo e engajamento
15. A recompensa visual é imediata após cada resposta?
16. O botão "Próxima" aparece após delay adequado (1s)?
17. As animações ajudam o foco ou competem pela atenção?
18. O ritmo entre resposta → validação → próxima pergunta mantém dopamina?
19. A tela de processamento dura 4-5 segundos?

### Resultado e conversão
20. O resultado gera reconhecimento profundo ("isso fui feito para mim")?
21. A ponte de venda conecta naturalmente o arquétipo ao planner específico?
22. O CTA final tem texto claro, link real e tracking?
23. As objeções são respondidas antes do CTA?
24. A urgência, se usada, é genuína e não manipulativa?

### Ética e confiança
25. O quiz evita parecer diagnóstico clínico definitivo?
26. Alguma frase usa vocabulário patologizante ("transtorno", "deficit", "sintoma")?
27. O resultado inclui disclaimer de "mapeamento de perfil, não diagnóstico médico"?

## Saída obrigatória

Gere um relatório de handoff em Markdown com:

1. Resumo executivo com nota por categoria
2. Mapa do fluxo real (como implementado)
3. Matriz escopo vs implementação
4. Simulações por persona
5. Achados priorizados (P0/P1/P2/P3)
6. Problemas de UX/UI
7. Problemas de conteúdo/copy
8. Problemas de marketing/conversão
9. Problemas de scoring/arquétipos
10. Problemas de acessibilidade/performance
11. Problemas de analytics
12. Backlog recomendado com esforço e impacto
13. Critérios de aceite por item
14. Plano de validação pós-ajustes

Salve em: `quiz/audits/quiz-tdah-v1-handoff.md`
