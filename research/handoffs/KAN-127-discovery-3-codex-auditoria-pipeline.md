# Handoff - KAN-127 - Auditar reprodutibilidade e robustez do pipeline

> **Ticket:** [KAN-127 / DISCOVERY-3](https://the-abib-company.atlassian.net/browse/KAN-127)  
> **Status:** Pronto para execução por Codex  
> **Responsável esperado:** `agent-codex`  
> **Dependências:** KAN-124, `research/generate_research_outputs.py`, `research/outputs/00_corpus_manifest.md`  
> **Sumário:** Prompt de execução para auditar tecnicamente o pipeline de geração dos outputs de pesquisa, reforçando validações e reprodutibilidade.

---

## 1. Papel do agente

Você é o Codex atuando como auditor técnico do pipeline de pesquisa. Sua tarefa é reforçar a confiabilidade operacional dos outputs sem modificar o corpus e sem introduzir dependências externas.

Não faça scraping novo. Não leia amplamente JSON bruto. Não altere quiz, produto ou copy.

## 2. Arquivos obrigatórios de leitura

1. `foundation/handoff-agentes-ia.md`
2. `docs/backlog-funil-vendas-2026-05-11.md`
3. `foundation/oferta-mvp.md`
4. `foundation/posicionamento-etico.md`
5. `research/generate_research_outputs.py`
6. `research/outputs/00_corpus_manifest.md`
7. `research/outputs/reddit_evidence_consolidated.csv`
8. `research/outputs/reddit_qualitative_findings.csv`
9. `research/outputs/reddit_archetype_classification.csv`

## 3. Tarefa

1. Criar ou melhorar validações reproduzíveis para contagem, schema, unicidade de `record_id` e presença de campos críticos.
2. Confirmar que `analysis_text` prioriza `body_clean` e contexto curto.
3. Confirmar que o pipeline não depende de NotebookLM nem de dossiês complementares como evidência primária.
4. Documentar comandos de validação em `research/outputs/08_auditoria_pipeline_codex.md`.
5. Se criar script auxiliar, usar stdlib Python e manter escopo em `research/`.

## 4. Critérios de aceite

- Validação reproduzível cobre os três CSVs finais.
- Campos críticos confirmados: `source_file_stem`, `record_id`, `thread_url`, `comment_url`, `analysis_text`, `text_for_ai_truncated`.
- `record_id` sem duplicidade.
- Não há alteração em `research/reddit_data/csvs/`.
- Não há dependência nova.

## 5. Validações

| Comando / verificação | Resultado esperado |
|---|---|
| `python -m py_compile research/generate_research_outputs.py` | Sintaxe válida |
| Validador de outputs | 2.252 linhas nos três CSVs e headers críticos presentes |
| `git status --short` | Apenas artefatos do ticket atual e mudanças esperadas |

## 6. Entrega Jira/Git

Commit esperado:

```text
[KAN-127] Auditar pipeline de pesquisa Reddit
```

Após push, comentar no Jira usando o template da seção 7 de `foundation/handoff-agentes-ia.md` e mover para transição 31, `Em análise`.

## 7. Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-06-06 | 1.0 | Handoff inicial para auditoria técnica por Codex | Codex |

