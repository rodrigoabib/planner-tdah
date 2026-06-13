# Workflow: planner-ticket-preflight

> **Ticket:** KAN-135 / AGENT-OPS-1
> **Status:** Em analise
> **Dependencias:** `foundation/handoff-agentes-ia.md`, `foundation/operacao-agentes-ia.md`, `docs/backlog-funil-vendas-2026-05-11.md`
> **Sumario:** preflight read-only para qualquer ticket KAN antes de planejar ou executar.

---

## 1. Objetivo

Montar o estado minimo confiavel de um ticket KAN sem alterar arquivos, Jira ou GitHub.

## 2. Entradas

- Chave do ticket KAN.
- Estado local do Git.
- Fontes canonicas do projeto.
- Context packs aplicaveis.

## 3. Passos

1. Ler o ticket no Jira.
2. Registrar status, prioridade, labels, responsavel esperado e criterios de aceite.
3. Verificar dependencias e bloqueadores.
4. Ler `foundation/handoff-agentes-ia.md`.
5. Ler `docs/backlog-funil-vendas-2026-05-11.md`.
6. Ler `foundation/oferta-mvp.md` se o ticket tocar preco, cupom, garantia, checkout, produto ou gate.
7. Ler `foundation/posicionamento-etico.md` se tocar copy, anuncio, e-mail, PDF, landing, checkout ou termos sensiveis.
8. Selecionar context packs aplicaveis em `docs/agent-context/`.
9. Checar `git status --short --branch` e separar alteracoes existentes do escopo do ticket.
10. Definir executor recomendado: Codex, Claude Code, humano ou humano+IA.

## 4. Saida obrigatoria

```markdown
# Preflight

## Estado
- KAN:
- Status Jira:
- Branch:
- Alteracoes locais fora do escopo:

## Fontes lidas
- Jira:
- Docs canonicos:
- Context packs:

## Escopo
- Fazer:
- Nao fazer:

## Riscos
- Tecnico:
- Produto:
- Etico/legal:
- Analytics:
- Checkout:
- Humano-only:

## Validacoes aplicaveis
- [ ] Build
- [ ] Scoring
- [ ] Conteudo quiz
- [ ] A11y/mobile
- [ ] Copy etica
- [ ] Analytics
- [ ] Checkout
- [ ] PDF
- [ ] Diff review

## Veredito
READY / BLOCKED / NEEDS HUMAN DECISION
```

## 5. Guardrails

- Nao comentar Jira.
- Nao transicionar ticket.
- Nao criar branch.
- Nao editar arquivos.
- Nao usar memoria como estado atual sem revalidar Jira/GitHub.

## 6. Historico

| Data | Versao | Mudanca | Autor |
|---|---|---|---|
| 2026-06-13 | 1.0 | Workflow inicial de preflight | Codex |
