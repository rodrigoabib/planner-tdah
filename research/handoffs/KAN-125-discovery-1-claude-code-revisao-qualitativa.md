# Handoff - KAN-125 - Revisar qualitativamente dores e features prioritárias

> **Ticket:** [KAN-125 / DISCOVERY-1](https://the-abib-company.atlassian.net/browse/KAN-125)  
> **Status:** Pronto para execução por Claude Code  
> **Responsável esperado:** `agent-claude-code`  
> **Dependências:** KAN-124, `research/outputs/reddit_qualitative_findings.csv`, `research/outputs/reddit_evidence_consolidated.csv`, `foundation/posicionamento-etico.md`  
> **Sumário:** Prompt de execução para revisar manualmente os achados qualitativos do corpus Reddit e transformar sinais heurísticos em inteligência de produto mais confiável.

---

## 1. Papel do agente

Você é o Claude Code atuando como revisor qualitativo de pesquisa. Sua função é revisar criticamente a classificação heurística já gerada pelo Codex, separar evidência direta de inferência e produzir uma síntese priorizada de dores, emoções, comportamentos, soluções tentadas, motivos de abandono e features desejadas.

Não trate comentários do Reddit como diagnóstico clínico. Não faça scraping novo. Não altere quiz, produto ou copy de produção.

## 2. Arquivos obrigatórios de leitura

1. `foundation/handoff-agentes-ia.md`
2. `docs/backlog-funil-vendas-2026-05-11.md`
3. `foundation/oferta-mvp.md`
4. `foundation/posicionamento-etico.md`
5. `research/outputs/00_corpus_manifest.md`
6. `research/outputs/01_mapa_qualitativo_dores_reddit.md`
7. `research/outputs/reddit_qualitative_findings.csv`
8. `research/outputs/reddit_evidence_consolidated.csv`

## 3. Tarefa

1. Revisar uma amostra priorizada dos registros com `confidence_level` alta e média em `reddit_qualitative_findings.csv`.
2. Conferir cada amostra no `reddit_evidence_consolidated.csv` usando `record_id`.
3. Separar, em tabela, o que é evidência direta, inferência provável e recomendação.
4. Identificar dores/features que parecem superestimadas pela regra heurística.
5. Identificar lacunas que exigem revisão humana ou nova taxonomia.
6. Produzir um documento final em `research/outputs/06_revisao_qualitativa_claude_code.md`.

## 4. Critérios de aceite

- A revisão usa `source_file_stem`, `record_id`, `thread_url` e `comment_url` para rastreabilidade.
- Nenhuma conclusão depende apenas de `text_for_ai` quando `text_for_ai_truncated=true`.
- O relatório distingue evidência, interpretação e recomendação.
- Dores/features são priorizadas em P0/P1/P2 com justificativa.
- Copy angles são avaliados contra `foundation/posicionamento-etico.md`.
- O relatório não usa linguagem de cura, tratamento ou diagnóstico.

## 5. Validações

Rodar validações aplicáveis:

| Verificação | Como validar |
|---|---|
| Rastreabilidade | Amostrar registros citados e confirmar presença no CSV consolidado |
| Ética | Revisão manual contra `foundation/posicionamento-etico.md` seções 2 e 4 |
| Consistência de outputs | Conferir que `06_revisao_qualitativa_claude_code.md` tem cabeçalho, sumário, seções numeradas e histórico |

## 6. Entrega Jira/Git

Commit esperado:

```text
[KAN-125] Revisar achados qualitativos Reddit
```

Após push, comentar no Jira usando o template da seção 7 de `foundation/handoff-agentes-ia.md` e mover para transição 31, `Em análise`.

## 7. Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-06-06 | 1.0 | Handoff inicial para revisão qualitativa por Claude Code | Codex |

