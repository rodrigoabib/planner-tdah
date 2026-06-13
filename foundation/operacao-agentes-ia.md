# Operacao de agentes IA — Planner TDAH v1.1

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `foundation/handoff-agentes-ia.md`, `foundation/oferta-mvp.md`, `foundation/posicionamento-etico.md`, `docs/backlog-funil-vendas-2026-05-11.md`
> **Sumario:** contrato operacional complementar para Codex e Claude Code, com abordagem skills-first, context packs e gates de validacao.

---

## 1. Papel deste documento

Este documento complementa `foundation/handoff-agentes-ia.md`. O documento de handoff continua sendo a fonte de verdade para executar tickets KAN, commits, comentarios Jira e transicoes.

Esta operacao v1.1 define como Codex e Claude Code devem escolher contexto, skills e validacoes sem criar complexidade prematura. A regra principal e:

```text
workflow duravel > skill > context pack > subagente read-only > hook warning-only > automacao mutavel
```

## 2. Principios obrigatorios

1. Comecar por preflight, nao por implementacao.
2. Usar o menor pacote de contexto suficiente.
3. Tratar Jira e GitHub como fonte de estado atual.
4. Tratar memoria local como apoio, nunca como fonte soberana.
5. Rodar apenas validacoes aplicaveis ao ticket.
6. Manter `planner-ticket-done` em dry-run por padrao.
7. Nunca comentar Jira, commitar, fazer push ou transicionar ticket sem escopo claro e evidencia.
8. Nunca mover ticket direto para `Concluido`; usar `Em analise` e aguardar OK humano.
9. Separar tarefas IA, humano-only e humano+IA antes de propor execucao.
10. Nao criar hooks bloqueantes ou subagentes novos antes das skills P0 amadurecerem.

## 3. Arquitetura operacional

| Camada | Artefatos | Uso |
|---|---|---|
| Contrato mestre | `foundation/handoff-agentes-ia.md` | fluxo Jira/Git/validacao/handoff |
| Complemento operacional | este documento | decisao entre skills, contexto, agentes e gates |
| Workflows duraveis | `docs/agent-workflows/` | passos reutilizaveis para Codex e Claude |
| Context packs | `docs/agent-context/` | contexto sob demanda por dominio do funil |
| Skills Codex | `.agents/skills/planner-*` | ativacao por Codex |
| Skills Claude | `.claude/skills/planner-*` | wrappers para Claude Code |
| Subagentes | `.codex/agents/*.toml` | P2, read-only, sob demanda |
| Hooks | nao criados nesta fase | P2, warning-only, command hooks |

## 4. Como escolher o recurso certo

| Necessidade | Recurso |
|---|---|
| Processo repetitivo, passo a passo | Skill |
| Contexto de uma area do produto | Context pack |
| Verificacao simples de checklist | Checklist dentro de workflow |
| Investigacao paralela sem escrita | Subagente read-only |
| Regra deterministica de seguranca | Hook warning-only |
| Decisao de prioridade ou escopo | Agente-orquestrador |

Se houver duvida, criar ou usar uma skill antes de criar agente novo.

## 5. Workflows P0

| Skill | Workflow duravel | Modo inicial |
|---|---|---|
| `planner-ticket-preflight` | `docs/agent-workflows/planner-ticket-preflight.md` | read-only |
| `planner-ticket-done` | `docs/agent-workflows/planner-ticket-done.md` | dry-run |
| `planner-validation-runner` | `docs/agent-workflows/planner-validation-runner.md` | validacao seletiva |
| `planner-context-pack` | `docs/agent-workflows/planner-context-pack.md` | read-only |
| `planner-ethics-copy-review` | `docs/agent-workflows/planner-ethics-copy-review.md` | read-only |
| `planner-jira-github-sync` | `docs/agent-workflows/planner-jira-github-sync.md` | dry-run antes de mutacao |
| `planner-gate-pre-trafego` | `docs/agent-workflows/planner-gate-pre-trafego.md` | checklist GO/NO-GO |

## 6. Context packs P1

| Dominio | Context pack |
|---|---|
| Quiz, scoring e arquetipos | `docs/agent-context/quiz-scoring-context.md` |
| Funil React/Vite | `docs/agent-context/funil-react-vite-context.md` |
| Copy etica | `docs/agent-context/copy-etica-context.md` |
| Analytics/PostHog/Meta | `docs/agent-context/analytics-posthog-meta-context.md` |
| Kiwify/checkout | `docs/agent-context/kiwify-checkout-context.md` |
| Produto PDF | `docs/agent-context/produto-pdf-context.md` |
| Gate pre-trafego | `docs/agent-context/gate-pre-trafego-context.md` |
| Humano-only / humano+IA | `docs/agent-context/humano-only-humano-ia-context.md` |

## 7. Compatibilidade Codex e Claude Code

Codex carrega `AGENTS.md` automaticamente e usa as skills em `.agents/skills/`. Claude Code carrega `CLAUDE.md` e descobre skills de projeto em `.claude/skills/`.

Para evitar divergencia:

- conteudo duravel fica em `foundation/`, `docs/agent-workflows/` e `docs/agent-context/`;
- `AGENTS.md` e `CLAUDE.md` ficam como adaptadores;
- wrappers Claude apontam para os mesmos workflows que as skills Codex;
- subagentes Codex `.toml` nao sao tratados como recurso do Claude;
- novos subagentes Claude ficam fora da fase KAN-135.

## 8. Operacao humano-only e humano+IA

Tarefas com conta, pagamento, credenciais, campanha, aprovacao legal, Kiwify, Meta Ads ou aprovacao final de PDF devem ser classificadas antes de qualquer execucao.

O agente pode preparar checklist, revisar risco, sugerir texto, validar evidencias e registrar bloqueios. O agente nao deve executar a decisao humana nem fingir que a acao externa foi realizada.

## 9. Gate pre-trafego pago

KAN-44 e a secao 8 de `foundation/oferta-mvp.md` sao a referencia do gate. O veredito permitido e:

- `GO`: todos os itens criticos estao verdes;
- `NO-GO`: falta qualquer item critico de funil, checkout, tracking, legal ou decisao humana;
- `GO COM RISCO`: somente para lacunas nao criticas explicitamente aceitas pelo humano.

## 10. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.1 | Infraestrutura operacional skills-first para Codex e Claude Code | Codex |
