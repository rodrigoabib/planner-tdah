# Handoff - KAN-128 - Validar achados contra produto existente e priorizar ajustes

> **Ticket:** [KAN-128 / DISCOVERY-4](https://the-abib-company.atlassian.net/browse/KAN-128)  
> **Status:** Pronto para execução por Claude Code  
> **Responsável esperado:** `agent-claude-code`  
> **Dependências:** KAN-125, KAN-126, `product/planner-structure.md`, `product/content/`, `research/outputs/05_relatorio_final_product_discovery_planner_tdah.md`  
> **Sumário:** Prompt de execução para comparar a pesquisa revisada com o produto existente e priorizar ajustes editoriais sem reescrever o planner automaticamente.

---

## 1. Papel do agente

Você é o Claude Code atuando como estrategista de produto e revisor editorial. Sua tarefa é transformar achados de pesquisa em recomendações priorizadas para planner, quiz, copy, onboarding e antiabandono.

Não faça alteração direta no produto, quiz ou copy de produção nesta tarefa. A entrega é um relatório de validação e priorização.

## 2. Arquivos obrigatórios de leitura

1. `foundation/handoff-agentes-ia.md`
2. `docs/backlog-funil-vendas-2026-05-11.md`
3. `foundation/oferta-mvp.md`
4. `foundation/posicionamento-etico.md`
5. `product/planner-structure.md`
6. `product/content/`
7. `research/outputs/03_matrizes_estrategicas_planner_tdah.md`
8. `research/outputs/05_relatorio_final_product_discovery_planner_tdah.md`
9. Outputs de KAN-125 e KAN-126 quando estiverem disponíveis.

## 3. Tarefa

1. Comparar dores/features revisadas com a estrutura modular do planner.
2. Identificar lacunas de produto, onboarding e antiabandono.
3. Separar recomendações em P0, P1 e P2.
4. Indicar quais ajustes pertencem a BASE, VARIANTE ou backlog futuro.
5. Produzir `research/outputs/09_validacao_produto_discovery_claude_code.md`.

## 4. Critérios de aceite

- Recomendações são acionáveis e rastreadas para achados de pesquisa.
- Não há alteração automática de arquivos em `product/content/`.
- Copy angles são revisados contra o posicionamento ético.
- Próximos tickets sugeridos têm escopo claro e dependência indicada.
- O relatório diferencia decisão estratégica de implementação.

## 5. Validações

| Verificação | Como validar |
|---|---|
| Alinhamento com oferta | Conferir contra `foundation/oferta-mvp.md` |
| Ética de copy | Conferir contra `foundation/posicionamento-etico.md` |
| Escopo produto | Conferir contra `product/planner-structure.md` |

## 6. Entrega Jira/Git

Commit esperado:

```text
[KAN-128] Validar pesquisa contra produto
```

Após push, comentar no Jira usando o template da seção 7 de `foundation/handoff-agentes-ia.md` e mover para transição 31, `Em análise`.

## 7. Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-06-06 | 1.0 | Handoff inicial para validação de produto por Claude Code | Codex |

