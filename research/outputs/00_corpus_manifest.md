# Manifesto do Corpus Reddit - Fechamento de Pesquisa Planner TDAH

> **Ticket:** Pesquisa interna / sem ticket Jira atribuído  
> **Status:** Gerado em 2026-06-05  
> **Dependências:** research/reddit_data/csvs/; research/reddit_json_to_csv.py; escopo_handoff_pesquisa_analise_dados_planner_tdah.md  
> **Sumário:** Congela o corpus primário usado na análise e explicita divergências, limites e regras de rastreabilidade.

---

## 1. Regra de congelamento

O corpus padrão desta fase é composto por todos os CSVs locais em `research/reddit_data/csvs/`. Nenhum scraping novo foi executado e nenhum JSON bruto foi necessário para a geração destes outputs.

A referência antiga a 40 fontes deve ser tratada como desatualizada para esta rodada. O inventário local confirmou **65 CSVs Reddit**.

## 2. Contagem consolidada

| Métrica | Valor |
| --- | --- |
| CSVs Reddit primários | 65 |
| Registros totais | 2252 |
| Thread posts | 65 |
| Comentários | 2187 |
| Subreddits únicos | 18 |
| Schemas únicos nos CSVs primários | 1 |
| Duplicidades de `record_id` | 0 |
| Registros com `text_for_ai` >= 5.900 caracteres | 144 |
| Clusters de texto duplicado por `body_clean` | 3 |
| Registros em clusters duplicados | 6 |

## 3. Distribuição por subreddit

| Subreddit | Registros |
| --- | --- |
| adhdwomen | 903 |
| planners | 302 |
| ADHD | 251 |
| nederlands | 195 |
| ProductivityApps | 145 |
| notebooklm | 104 |
| PKMS | 59 |
| productivity | 59 |
| AskAcademia | 52 |
| PlannerAddicts | 43 |
| ADHDUK | 42 |
| Notion | 34 |
| RemarkableTablet | 22 |
| southpaws | 17 |
| Frugal | 13 |
| AutisticWithADHD | 5 |
| bulletjournal | 5 |
| ADHDgradANDdocSCHOOL | 1 |

## 4. Campos preservados

Os CSVs primários compartilham o mesmo schema. O consolidado preserva campos essenciais de origem, thread, comentário, contexto, score, data, texto limpo e sinais já extraídos, além de campos novos de análise.

| Campo novo | Descrição |
| --- | --- |
| analysis_text | Texto de análise criado a partir de `body_clean`, título e contexto curto de pai/raiz. |
| text_for_ai_truncated | Marca provável truncamento quando `text_for_ai` tem 5.900+ caracteres. |
| duplicate_text_cluster | Cluster de duplicidade baseado em hash do `body_clean` normalizado. |

## 5. Textos longos e truncamento

`text_for_ai` existe em todos os registros, mas não deve ser usado sozinho.

| Métrica | body_clean | text_for_ai |
| --- | --- | --- |
| Média de caracteres | 329.03 | 1673.84 |
| P95 de caracteres | 1258 | 5999 |
| Máximo de caracteres | 7687 | 6000 |

## 6. Dossiês e CSVs complementares

Arquivos CSV fora de `research/reddit_data/csvs/` foram inventariados apenas como contexto complementar. Eles não entram nas contagens primárias nem substituem evidência rastreável do Reddit.

| Arquivo | Linhas | Colunas | Status |
| --- | --- | --- | --- |
| chatgpt-agent-mode-pesquisa_tdah_planners_completa.csv | 84 | 17 | ok |
| chatgpt-deep-research-pesquisa_tdah_planners_completa.csv | 56 | 0 | schema inconsistente ou sem cabeçalho detectável |
| deepseek-pesquisa_tdah_planners_completa.csv | 271 | 17 | ok |
| grok-pesquisa_tdah_planners_completa.csv | 39 | 17 | ok |
| kimi-pesquisa_tdah_planners_completa.csv | 68 | 17 | ok |
| manus-pesquisa_tdah_planners_completa.csv | 50 | 17 | ok |
| perplexity-pesquisa_tdah_planners_completa.csv | 49 | 17 | ok |
| reddit-adhdwomen-i_have_seen_so_many_adhd_planners_that_just_dont_1.csv | 153 | 66 | ok |

## 7. Limitações

- A classificação é heurística e serve para triagem de discovery.
- Comentários do Reddit não são evidência clínica nem substituem avaliação profissional.
- Excertos devem ser curtos e usados apenas com `record_id`/URL para rastreabilidade.
- Autores públicos não são necessários para a análise e não foram promovidos nos outputs.
- NotebookLM pode ser usado como contexto por Rodrigo, mas estes outputs não dependem dele.

## Histórico de revisões

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| 2026-06-05 | 1.0 | Manifesto de corpus criado a partir dos 65 CSVs locais. | Codex |
