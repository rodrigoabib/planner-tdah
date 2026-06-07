# Handoff - KAN-126 - Curar classificação por arquétipos e ambiguidades

> **Ticket:** [KAN-126 / DISCOVERY-2](https://the-abib-company.atlassian.net/browse/KAN-126)  
> **Status:** Pronto para execução por Claude Code  
> **Responsável esperado:** `agent-claude-code`  
> **Dependências:** KAN-124, KAN-125, `quiz/data/archetypes.js`, `research/outputs/reddit_archetype_classification.csv`  
> **Sumário:** Prompt de execução para revisar a classificação por arquétipos, separar sinais fortes de inferências frágeis e propor ajustes sem alterar o quiz.

---

## 1. Papel do agente

Você é o Claude Code atuando como revisor crítico de modelo de arquétipos. Sua tarefa é avaliar se a classificação heurística do Codex sustenta os arquétipos atuais do quiz e onde há ambiguidade.

Você não deve alterar `quiz/data/archetypes.js`, `components`, landing, copy ou produto. Esta entrega é documental.

## 2. Arquivos obrigatórios de leitura

1. `foundation/handoff-agentes-ia.md`
2. `docs/backlog-funil-vendas-2026-05-11.md`
3. `foundation/oferta-mvp.md`
4. `foundation/posicionamento-etico.md`
5. `quiz/quiz-tdah-especificacao-completa.md`
6. `quiz/data/archetypes.js`
7. `research/outputs/02_matriz_arquetipos_dores_features.md`
8. `research/outputs/reddit_archetype_classification.csv`
9. `research/outputs/reddit_evidence_consolidated.csv`

## 3. Tarefa

1. Revisar registros classificados com confiança alta e média por arquétipo.
2. Revisar uma amostra dos registros `indeterminado` para confirmar se devem continuar indeterminados.
3. Mapear arquétipos com bom suporte, suporte fraco e sinais transversais.
4. Identificar conflitos entre achados e `quiz/data/archetypes.js`.
5. Produzir `research/outputs/07_revisao_arquetipos_claude_code.md`.

## 4. Critérios de aceite

- Arquétipos secundários só aparecem quando há sinal textual real.
- Baixa confiança e indeterminado não são forçados em categoria.
- Recomendações são apresentadas como hipóteses de produto/quiz, não como mudança automática.
- Todas as evidências citadas preservam `record_id` e origem.
- O relatório evita inferência clínica e respeita `foundation/posicionamento-etico.md`.

## 5. Validações

| Verificação | Como validar |
|---|---|
| Amostragem | Conferir manualmente exemplos por arquétipo no CSV consolidado |
| Consistência com quiz | Comparar contra `quiz/data/archetypes.js` e especificação completa |
| Ética | Confirmar que não há linguagem de diagnóstico, cura ou tratamento |

## 6. Entrega Jira/Git

Commit esperado:

```text
[KAN-126] Curar matriz de arquétipos Reddit
```

Após push, comentar no Jira usando o template da seção 7 de `foundation/handoff-agentes-ia.md` e mover para transição 31, `Em análise`.

## 7. Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-06-06 | 1.0 | Handoff inicial para curadoria de arquétipos por Claude Code | Codex |

