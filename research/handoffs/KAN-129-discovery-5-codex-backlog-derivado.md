# Handoff - KAN-129 - Converter recomendações aprovadas em backlog KAN executável

> **Ticket:** [KAN-129 / DISCOVERY-5](https://the-abib-company.atlassian.net/browse/KAN-129)  
> **Status:** Pronto para execução por Codex após revisão dos cards anteriores  
> **Responsável esperado:** `agent-codex`  
> **Dependências:** KAN-125, KAN-126, KAN-128, `foundation/handoff-agentes-ia.md`, `docs/backlog-funil-vendas-2026-05-11.md`  
> **Sumário:** Prompt de execução para transformar recomendações aprovadas de discovery em tickets KAN executáveis, com labels, dependências e handoffs.

---

## 1. Papel do agente

Você é o Codex atuando como operador de backlog. Sua tarefa é pegar recomendações já revisadas e aprovadas e convertê-las em cards Jira claros, pequenos o suficiente para execução por Codex ou Claude Code.

Não crie tickets derivados antes de revisar os outputs de KAN-125, KAN-126 e KAN-128. Não implemente as recomendações dentro deste ticket.

## 2. Arquivos obrigatórios de leitura

1. `foundation/handoff-agentes-ia.md`
2. `docs/backlog-funil-vendas-2026-05-11.md`
3. `foundation/oferta-mvp.md`
4. `foundation/posicionamento-etico.md`
5. `research/outputs/06_revisao_qualitativa_claude_code.md`
6. `research/outputs/07_revisao_arquetipos_claude_code.md`
7. `research/outputs/09_validacao_produto_discovery_claude_code.md`
8. Este diretório `research/handoffs/`

## 3. Tarefa

1. Ler recomendações aprovadas e separar por área: planner, quiz, copy, onboarding e antiabandono.
2. Criar cards KAN apenas para recomendações com escopo executável.
3. Aplicar labels `agent-codex` ou `agent-claude-code` conforme o executor ideal.
4. Definir dependências entre cards usando links Jira quando necessário.
5. Criar handoff versionado para cada card novo se a tarefa for executável por agente.
6. Produzir `research/outputs/10_backlog_derivado_discovery_codex.md` com resumo dos cards criados.

## 4. Critérios de aceite

- Cada card novo tem objetivo, arquivos de leitura, critérios de aceite e validações.
- Cada card novo tem label de agente responsável quando aplicável.
- Cards derivados não duplicam tickets existentes do backlog do funil.
- Recomendações sensíveis ou estratégicas permanecem como decisão humana, não como implementação automática.
- O relatório final lista URLs Jira e caminhos dos handoffs.

## 5. Validações

| Verificação | Como validar |
|---|---|
| Duplicidade Jira | Buscar por resumo/área antes de criar card novo |
| Labels | Confirmar `agent-codex` ou `agent-claude-code` nos cards executáveis |
| Handoff | Conferir que cada card executável tem documento em `research/handoffs/` |
| Workflow | Cards concluídos por IA vão para `Em análise`, nunca direto para `Concluído` |

## 6. Entrega Jira/Git

Commit esperado:

```text
[KAN-129] Criar backlog derivado de discovery
```

Após push, comentar no Jira usando o template da seção 7 de `foundation/handoff-agentes-ia.md` e mover para transição 31, `Em análise`.

## 7. Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-06-06 | 1.0 | Handoff inicial para backlog derivado por Codex | Codex |

