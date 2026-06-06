# Plano de Ação - Fechamento da Fase de Pesquisa Planner TDAH

> **Ticket:** Pesquisa interna / sem ticket Jira atribuído  
> **Status:** Gerado em 2026-06-05  
> **Dependências:** escopo_handoff_pesquisa_analise_dados_planner_tdah.md; research/reddit_data/csvs/; foundation/posicionamento-etico.md  
> **Sumário:** Define a execução rastreável para transformar o corpus Reddit congelado em inteligência de produto sem alterar quiz, copy de produção ou planner.

---

## 1. Resumo executivo

A próxima entrega desta fase é este plano formal, seguido por manifesto de corpus, base consolidada, classificação qualitativa, classificação por arquétipos, matrizes estratégicas, validação contra quiz/produto e relatório final de discovery.

A coleta permanece congelada: não houve scraping novo, não houve leitura ampla de JSONs brutos e não houve alteração de quiz, copy de produção ou produto. A evidência primária vem dos CSVs locais em `research/reddit_data/csvs/`.

## 2. Estado confirmado

| Área | Estado confirmado | Observação |
| --- | --- | --- |
| Corpus Reddit local | 65 CSVs / 2252 registros | 65 posts/thread rows e 2187 comentários. |
| research/outputs/ | Criado nesta execução | Antes da execução não havia artefatos finais. |
| text_for_ai | Disponível, mas não canônico para registros longos | 144 registros chegaram a >= 5.900 caracteres; `analysis_text` usa `body_clean` com contexto curto. |
| NotebookLM | Contexto complementar | Não é dependência desta rodada; outputs são reproduzíveis localmente. |
| Quiz/produto | Somente leitura | Comparação documental contra `quiz/data/archetypes.js` e estrutura do planner. |

## 3. Artefatos entregáveis

| Ordem | Artefato | Função |
| --- | --- | --- |
| 1 | research/outputs/00_plano_acao_fechamento_pesquisa.md | Plano formal da fase. |
| 2 | research/outputs/00_corpus_manifest.md | Congela corpus e limitações. |
| 3 | research/outputs/reddit_evidence_consolidated.csv | Base única rastreável. |
| 4 | research/outputs/01_mapa_qualitativo_dores_reddit.md | Mapa de dores e oportunidades. |
| 5 | research/outputs/reddit_qualitative_findings.csv | Classificação qualitativa linha a linha. |
| 6 | research/outputs/02_matriz_arquetipos_dores_features.md | Matriz arquétipo x dor x feature. |
| 7 | research/outputs/reddit_archetype_classification.csv | Classificação heurística por arquétipo. |
| 8 | research/outputs/03_matrizes_estrategicas_planner_tdah.md | Matrizes de decisão de produto/copy. |
| 9 | research/outputs/04_validacao_quiz_vs_pesquisa.md | Validação documental contra quiz. |
| 10 | research/outputs/05_relatorio_final_product_discovery_planner_tdah.md | Recomendações decisórias. |

## 4. Método de execução

1. Congelar e documentar inventário de CSVs.
2. Consolidar os registros preservando `source_file_stem`, `record_id`, `thread_url` e `comment_url`.
3. Criar `analysis_text` priorizando `body_clean` e contexto curto de thread/pai/raiz.
4. Marcar truncamento provável de `text_for_ai` e duplicação textual por conteúdo limpo.
5. Classificar dores, emoções, soluções tentadas, falhas e features desejadas com regras heurísticas transparentes.
6. Classificar arquétipos como hipótese de discovery; usar `indeterminado` quando o sinal textual for fraco.
7. Separar evidência, inferência e recomendação em todos os documentos.

## 5. Critérios de aceite

| Critério | Como será validado |
| --- | --- |
| Contagem dos CSVs bate com manifesto | Validação automática pós-geração. |
| `record_id` sem duplicidade | Validação automática no consolidado. |
| `text_for_ai` não é usado sozinho quando truncado | Campo `analysis_text` criado com `body_clean` + contexto. |
| Achados rastreáveis | CSV e Markdown preservam identificadores e URLs. |
| Sem diagnóstico clínico | Relatórios usam linguagem de comportamento e fricção, não diagnóstico. |
| Copy ética | Ângulos são descritos como oportunidades e evitam promessa de cura/tratamento. |

## 6. Riscos e limites

- A divergência entre 40 CSVs citados em handoff antigo e 65 CSVs locais fica registrada no manifesto.
- Os dossiês complementares entram apenas como contexto, não como evidência primária.
- A classificação é triagem heurística e exige revisão humana antes de decisão final de produto ou copy.
- Citações diretas devem ser curtas, anonimizadas e sempre rastreáveis.

## Histórico de revisões

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| 2026-06-05 | 1.0 | Plano formal gerado e conectado aos outputs desta fase. | Codex |
