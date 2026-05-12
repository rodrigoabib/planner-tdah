# AGENTS.md — Planner TDAH · Operação do funil de vendas

> ⚠️ **Compatibilidade de agentes**
>
> Este arquivo (`AGENTS.md`) é lido automaticamente pelo **Codex** (OpenAI).
> O **Claude Code** lê `CLAUDE.md` na raiz. Ambos referenciam o mesmo
> documento mestre: [`foundation/handoff-agentes-ia.md`](foundation/handoff-agentes-ia.md).

---

## Papel neste projeto

Você é um agente executor de tickets do backlog **KAN (Planner TDAH)** no Jira
`the-abib-company.atlassian.net`. O projeto entrega o funil completo de venda de
um infoproduto (PDF imprimível) personalizado por arquétipo de atenção, com
aquisição via Instagram Ads e checkout na Kiwify.

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

1. Ler ticket KAN-XX no Jira
2. Carregar dependências de leitura listadas no ticket + arquivos sempre relevantes
3. Validar que tickets bloqueantes estão em "Em análise" ou "Concluído"
4. Implementar respeitando critérios de aceite, P0 → P3
5. Rodar comandos de validação aplicáveis
6. Commit + push com mensagem `[KAN-XX] título curto`
7. Comentário no Jira usando template seção 7 do doc mestre
8. Transição 31 (Em análise / In Review) — **nunca direto para Concluído**

---

## Comandos de validação por categoria de ticket

> Tabela resumo. Versão completa em `foundation/handoff-agentes-ia.md` seção 5.

| Categoria | Comando |
|---|---|
| Scoring/arquétipos do quiz | `node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js` |
| Conteúdo do quiz | `node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js` |
| Build quiz/LP | `cd quiz && npx vite build` |
| Acessibilidade | `QUIZ_URL=http://localhost:PORT node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js` |
| Copy | Revisão manual contra `foundation/posicionamento-etico.md` seções 2 e 4 |
| Analytics | DevTools → console → completar ação → verificar log de evento |
| Mobile | Screenshot 320px (iPhone SE) e 768px (tablet) |

---

## Skills e subagentes herdados da fase de auditoria

Estes recursos continuam disponíveis e devem ser usados quando o ticket pedir
auditoria ou análise focada em UX TDAH:

- **Skill:** `.agents/skills/tdah-ux-audit/SKILL.md`
- **Checklists:** `.agents/skills/tdah-ux-audit/references/`
- **Scripts:** `.agents/skills/tdah-ux-audit/scripts/`

### Subagentes (em `.codex/agents/`)

| Agente | Função |
|---|---|
| `quiz-code-mapper` | Mapear estrutura do código e divergências com escopo |
| `adhd-ux-reviewer` | Avaliar carga cognitiva, atenção, ritmo e dopamina |
| `marketing-funnel-reviewer` | Avaliar copy, CTA, prova social e conversão |
| `browser-journey-auditor` | Rodar o app e simular personas |
| `accessibility-performance-reviewer` | Axe, Lighthouse, mobile, teclado |
| `handoff-synthesizer` | Consolidar achados em relatório priorizado |

---

## Regras gerais (qualquer ticket)

1. **Ordem de prioridade:** P0 → P1 → P2 → P3
2. **Código completo:** cada mudança é código completo, nunca pseudocódigo
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
| Qual a sequência de tickets? | `docs/backlog-funil-vendas-2026-05-11.md` seção 3 e 5 |
| Como entregar um ticket concluído? | `foundation/handoff-agentes-ia.md` seções 6, 7 e 8 |
| Quais KPIs / benchmarks? | `data/kpis.md` |
| Qual a promessa do anúncio? | `acquisition/promessa.md` |

---

**Em caso de conflito** entre este arquivo e `foundation/handoff-agentes-ia.md`,
o documento mestre prevalece.
