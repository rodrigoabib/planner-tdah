# Padrão de handoff de tickets para agentes IA — Planner TDAH v1

> **Documento vivo · Versão 1.0 · 2026-05-12**
> **Ticket:** [KAN-11 / FOUNDATION-5](https://the-abib-company.atlassian.net/browse/KAN-11)
> **Status:** Aprovado e em vigor
> **Dependência:** [oferta-mvp.md](oferta-mvp.md), [posicionamento-etico.md](posicionamento-etico.md)
> **Fonte de verdade:** este arquivo. `CLAUDE.md` e `AGENTS.md` na raiz são versões compactas que referenciam este documento.

---

## Sumário

1. [Por que esse documento existe](#1-por-que-esse-documento-existe)
2. [Agentes envolvidos e quando usar cada um](#2-agentes-envolvidos)
3. [Workflow padrão: como pegar um ticket](#3-workflow-padrão-como-pegar-um-ticket)
4. [Arquivos sempre relevantes](#4-arquivos-sempre-relevantes)
5. [Comandos de validação por categoria de ticket](#5-comandos-de-validação-por-categoria-de-ticket)
6. [Formato de Pull Request esperado](#6-formato-de-pull-request-esperado)
7. [Template de comentário de conclusão no Jira](#7-template-de-comentário-de-conclusão-no-jira)
8. [Transições de status no Jira](#8-transições-de-status-no-jira)
9. [Critérios para considerar o handoff completo](#9-critérios-para-considerar-o-handoff-completo)

---

## 1. Por que esse documento existe

Codex (OpenAI) e Claude Code (Anthropic) são os dois agentes de IA executando tickets neste projeto, além do humano (Rodrigo) e da composição "humano + IA dirigida". Sem padrão único de handoff:

- Cada ticket vira reorientação manual (perde a alavancagem de IA)
- Critérios de aceite são reinterpretados a cada execução
- Comentários de conclusão ficam inconsistentes — dificulta revisão
- Rastreabilidade do que foi feito, em qual commit, com qual validação se perde

Este documento define o **contrato único** entre humano-pedinte e agente-executor para qualquer ticket KAN-XX.

---

## 2. Agentes envolvidos

| Símbolo | Agente | Lê automaticamente | Melhor para |
|---|---|---|---|
| 🧠 | **Claude Code** (Anthropic) | `CLAUDE.md` | Refactor, mudanças no arquivo único Vite, integração de features, escrita técnica em PT-BR, revisão crítica de documentos |
| 🤖 | **Codex** (OpenAI) | `AGENTS.md` | Scripts pontuais, configurações, transformações mecânicas de dados, geração de boilerplate |
| 🎯 | **Humano** (Rodrigo) | — | Decisões estratégicas, produção de imagens/vídeo, validação visual final, aprovações comerciais |
| 🔄 | **Humano + IA dirigida** | — | Copy de anúncio/landing, conteúdo do PDF, decisões com componente subjetivo (Rodrigo decide o framing, IA gera variações) |

**Label do Jira que identifica responsável esperado:**
- `agent-claude-code` — Claude Code executa autonomamente após handoff
- `agent-codex` — Codex executa autonomamente após handoff
- `agent-humano` — Rodrigo executa (apenas decisão/estratégia)
- `agent-humano-ia` — Rodrigo dirige IA (qualquer IA), resultado é misto

---

## 3. Workflow padrão: como pegar um ticket

> Este workflow vale para qualquer agente IA pegando um ticket KAN-XX. Para tickets com label `agent-humano`, apenas Rodrigo executa.

### Passo 1 — Carregar contexto

1. **Ler o ticket completo** no Jira via MCP `mcp__claude_ai_Atlassian_Rovo__getJiraIssue` (cloudId `the-abib-company.atlassian.net`, issueIdOrKey `KAN-XX`)
2. **Ler `docs/backlog-funil-vendas-2026-05-11.md`** para entender posição do ticket no roadmap e dependências
3. **Ler `foundation/oferta-mvp.md`** — fonte canônica de oferta/preço/escopo
4. **Ler `foundation/posicionamento-etico.md`** — filtro obrigatório se o ticket envolve **qualquer copy** (anúncio, landing, e-mail, conteúdo do PDF)
5. **Ler arquivos listados em "Dependências de leitura"** do ticket (se houver)

### Passo 2 — Validar pré-requisitos

- Verificar que tickets bloqueantes (`is blocked by` no Jira) estão em "Em análise" (In Review) ou "Concluído"
- Se um bloqueante está em "Pendente" ou "Em andamento", **não iniciar** — comentar no ticket pedindo desbloqueio

### Passo 3 — Implementar respeitando critérios de aceite

- Trabalhar do P0 → P3
- Não introduzir dependências não previstas
- Para mudanças em código, manter convenções do arquivo (CSS no template literal do quiz, estrutura modular do PDF, etc.)
- Para documentos, seguir formato dos documentos vizinhos em `foundation/` (cabeçalho com ticket/status/dependências, sumário, seções numeradas, histórico de revisões)

### Passo 4 — Rodar comandos de validação aplicáveis

Ver seção 5 deste documento. Capturar saída relevante para incluir no comentário.

### Passo 5 — Commit + push

Commit message no formato:

```
[KAN-XX] título curto descrevendo a mudança

Resumo do que mudou em 1-3 linhas.

Critérios de aceite cumpridos:
- ✅ critério 1
- ✅ critério 2
```

### Passo 6 — Atualizar Jira

1. Adicionar comentário usando o **template da seção 7**
2. Transicionar status: **31 — In Review (Em análise)**
3. Esperar OK do humano antes de qualquer mudança adicional

### Passo 7 — Atualizar memória do projeto (Claude Code apenas)

Após handoff, atualizar `~/.claude/projects/.../memory/project_funil_status.md` com:
- Tickets concluídos nesta sessão (chave + caminho do artefato)
- Pendências geradas (se houver)
- Próximos desbloqueados

---

## 4. Arquivos sempre relevantes

| Arquivo | Quando consultar |
|---|---|
| `docs/backlog-funil-vendas-2026-05-11.md` | Todo ticket (mapeamento KAN ↔ código conceitual, dependências, posição no roadmap) |
| `foundation/oferta-mvp.md` | Qualquer ticket que toque preço, escopo, garantia, reembolso, critério de tráfego pago |
| `foundation/posicionamento-etico.md` | **Qualquer copy** em qualquer canal (filtro obrigatório) |
| `foundation/handoff-agentes-ia.md` | Este documento — sempre, antes de iniciar |
| `foundation/legal/*.md` | Tickets que mexem em rodapé, termos, fluxo de checkout, ou expõem dados pessoais |
| `acquisition/promessa.md` | Tickets de ACQ (criativo, copy, headline, framings) |
| `data/kpis.md` | Tickets de DATA, ACQ-10 (matar/escalar), DATA-6 (dashboard) |
| `quiz/quiz-tdah-v1.jsx` (ou nova estrutura pós-FUNNEL-1) | Tickets de FUNNEL ou que tocam o quiz |
| `quiz/quiz-tdah-especificacao-completa.md` | Tickets que tocam scoring, arquétipos ou conteúdo do quiz |
| `audits/quiz-tdah-v1-handoff.md` | Referência histórica — não modificar |

---

## 5. Comandos de validação por categoria de ticket

| Categoria | Quando | Comando | O que valida |
|---|---|---|---|
| **Scoring / arquétipos** | Mudou `calcScores`, `findArc`, array `Q` ou objeto `ARC` | `node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js` | 6/6 caminhos com similarity 10/10 |
| **Conteúdo do quiz** | Mudou perguntas, opções ou microvalidações | `node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js` | 15 perguntas, 6 arquétipos, eventos analytics |
| **Build do quiz/LP** | Qualquer mudança em arquivo `.jsx`, `.html`, `.css` | `cd quiz && npx vite build` | Build passa sem erros JSX |
| **Acessibilidade** | Mudança visual ou ARIA | `QUIZ_URL=http://localhost:PORT node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js` | Sem violações axe-core sérias |
| **Copy (anúncio/LP/e-mail/PDF)** | Qualquer texto novo em produção | Revisão manual contra `foundation/posicionamento-etico.md` seção 2 e 4 | Nenhum termo proibido; texto se enquadra em padrão ✅ |
| **Analytics** | Adicionou ou mudou `trackQuizEvent` | Abrir DevTools → console → completar ação → verificar log com payload completo | Evento dispara com nome correto e payload conforme spec |
| **Mobile** | Mudança visual | Screenshot 320px (iPhone SE) e 768px (tablet) | Sem layout quebrado, sem overflow, sem clique morto |
| **Documento `.md`** | Criação ou edição de doc | Revisão manual: cabeçalho padrão, sumário, seções numeradas, histórico de revisões | Coerente com docs vizinhos em `foundation/` |

**Convenção:** se um comando não se aplica ao ticket, **não rodar e não citar**. Não inflar o handoff com validações irrelevantes.

---

## 6. Formato de Pull Request esperado

> Aplicável quando o ticket envolve mudança em código. Para tickets que só criam/editam `.md` em branch `main`, **commit direto** é aceitável (e mais leve operacionalmente para esta fase do projeto).

### Título

```
[KAN-XX] título curto descrevendo a mudança
```

Exemplo: `[KAN-13] FUNNEL-1: rotas Vite com react-router-dom`

### Descrição

```markdown
## Resumo
1-3 linhas descrevendo o que mudou e por quê.

## Critérios de aceite cumpridos
- [x] critério 1 (do ticket)
- [x] critério 2
- [x] critério 3

## Validações executadas
| Comando | Resultado |
|---|---|
| `node ...` | ✅ ... |
| `vite build` | ✅ ... |

## Prints / evidências
- Mobile 320px: <link ou anexo>
- Desktop: <link ou anexo>

## Notas
Decisões não-óbvias, riscos identificados, follow-ups gerados.
```

### Onde apontar

- **Base:** `main`
- **Branch:** `kan-XX-descricao-curta` (ex.: `kan-13-rotas-vite`)

---

## 7. Template de comentário de conclusão no Jira

> **Formato em markdown** (passar `contentFormat: "markdown"` ao MCP `mcp__claude_ai_Atlassian_Rovo__addCommentToJiraIssue`).

```markdown
## ✅ Entrega — [CÓDIGO-CONCEITUAL] (Claude Code / Codex / Humano · YYYY-MM-DD)

**Artefato(s):** `caminho/relativo.md` (commit `abc1234`)

### Critérios de aceite — verificação

- ✅ critério 1 do ticket — [como foi cumprido em 1 linha]
- ✅ critério 2 do ticket — [como foi cumprido em 1 linha]
- ✅ critério N do ticket — [como foi cumprido em 1 linha]

### Validações executadas

| Comando / verificação | Resultado |
|---|---|
| comando 1 | ✅ resumo |
| revisão manual contra X | ✅ resumo |

### Aprovação pendente

Esperando seu **OK** no comentário para mover para **Concluído**. Se quiser ajuste em qualquer seção, responda neste ticket.

### Próximos desbloqueados

KAN-XX (CONCEITUAL-X — descrição curta), KAN-YY (CONCEITUAL-Y — descrição curta), …
```

**Variações permitidas:**
- Omitir "Próximos desbloqueados" se não houver
- Omitir "Validações executadas" se não houver comandos aplicáveis (mas explicar por quê em 1 linha)
- Adicionar seção "Notas / decisões não-óbvias" se houver algo que mereça ser registrado para auditoria futura

---

## 8. Transições de status no Jira

> IDs descobertos via `mcp__claude_ai_Atlassian_Rovo__getTransitionsForJiraIssue` no projeto KAN. Mantidos aqui para evitar fetch a cada handoff.

| Transition ID | Para o status | Quando usar |
|---|---|---|
| **11** | Pendente | Reverter ticket se descobrir que ele não deveria estar em andamento |
| **21** | Em andamento | Ao começar a executar o ticket (opcional para tickets curtos) |
| **31** | Em análise (In Review) | **Ao concluir a entrega, junto do comentário do template seção 7** |
| **41** | Concluído | **Somente após OK explícito** do humano no ticket |

**Princípio:** agente IA nunca move ticket direto para Concluído. A transição 31 → 41 é sempre humana.

---

## 9. Critérios para considerar o handoff completo

Checklist para o agente conferir antes de declarar "feito":

- [ ] **Artefato criado** no caminho correto e commitado
- [ ] **Commit + push** no remoto (`origin/main` ou branch da PR)
- [ ] **Comentário no Jira** seguindo template da seção 7
- [ ] **Status transicionado** para "Em análise" (transition 31)
- [ ] **Validações aplicáveis rodadas** e resultado anotado no comentário
- [ ] **Memória do projeto atualizada** (Claude Code apenas) com tickets concluídos + caminhos
- [ ] **Sem dependências introduzidas** sem autorização do humano
- [ ] **Sem campo TBD ou placeholder** no artefato entregue

Se algum item não foi cumprido, o ticket permanece **Em andamento**.

---

## Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-05-12 | 1.0 | Documento inicial — padrão de handoff consolidado | Rodrigo Abib + Claude (Opus 4.7) |

---

**Fim do documento.** `CLAUDE.md` e `AGENTS.md` na raiz são versões compactas que apontam para este arquivo.
