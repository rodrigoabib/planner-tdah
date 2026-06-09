# Escopo e Handoff — Etapa de Pesquisa, Cruzamento e Análise de Dados

**Projeto:** Planner TDAH
**Fase:** Pesquisa qualitativa, inteligência de mercado e análise estratégica de dados
**Status geral:** Corpus coletado e estruturado; próxima etapa é análise sistemática, classificação por arquétipos e cruzamento estratégico.
**Uso previsto:** Documento de contexto para Codex, Claude Code, agentes IA e execução dirigida por Rodrigo.

---

## 1. Objetivo deste documento

Este documento consolida o escopo, o estado atual, os artefatos existentes, as etapas concluídas e as próximas etapas da fase de pesquisa do projeto **Planner TDAH**.

Ele funciona como um documento híbrido de:

- escopo da fase de pesquisa;
- handoff para agentes de IA;
- visão de progresso;
- guia de próximos passos;
- referência para planejamento de execução com Codex e Claude Code.

O objetivo desta fase não é criar o planner final ainda. O objetivo é transformar dados reais, especialmente comentários e threads do Reddit, em inteligência estratégica para orientar:

- validação dos arquétipos;
- estrutura do planner;
- páginas e módulos por perfil;
- copy de venda;
- perguntas e resultados do quiz;
- posicionamento do produto;
- diferenciação em relação a planners genéricos;
- mecanismos antiabandono;
- onboarding e retenção.

---

## 2. Contexto do projeto

O projeto **Planner TDAH** é um infoproduto voltado para pessoas com TDAH, vendido através de um funil baseado em quiz de arquétipos comportamentais.

A premissa central é que planners genéricos falham com frequência para pessoas com TDAH porque normalmente exigem:

- constância linear;
- disciplina diária perfeita;
- baixa fricção cognitiva;
- previsibilidade emocional;
- tolerância a páginas em branco;
- manutenção prolongada do mesmo sistema;
- planejamento abstrato sem mecanismo de execução.

A pesquisa busca validar, com dados reais, como pessoas com TDAH se relacionam com planners, apps, bullet journals, templates e sistemas de organização.

A tese central da fase de pesquisa é:

> O melhor planner para TDAH não deve prometer organização perfeita.
> Ele deve reduzir atrito, aceitar inconsistência, permitir recomeços e adaptar a estrutura ao perfil comportamental do usuário.

---

## 3. Corpus e fontes consideradas

### 3.1 Corpus principal

O corpus principal desta fase é composto por **40 arquivos CSV** extraídos de threads e comentários reais do Reddit.

Esses CSVs foram gerados a partir de arquivos JSON completos de threads, mas a análise deve priorizar os CSVs, pois eles já contêm uma extração mais limpa, enxuta e útil para IA.

Local esperado no repositório:

```text
research/reddit_data/csvs/
```

O notebook do NotebookLM usado nesta fase foi formado por esses 40 CSVs.

As fontes principais incluem comunidades como:

- `r/adhdwomen`;
- `r/ADHD`;
- `r/AutisticWithADHD`;
- `r/ADHDUK`;
- `r/planners`;
- `r/PlannerAddicts`;
- `r/ProductivityApps`;
- `r/Notion`;
- `r/PKMS`;
- `r/AskAcademia`;
- `r/Frugal`.

Essas comunidades fornecem dados qualitativos especialmente ricos sobre:

- planners que não funcionam;
- compra e abandono de planners;
- vergonha e culpa por inconsistência;
- busca por novidade;
- ferramentas de produtividade;
- apps de organização;
- bullet journal;
- Notion;
- planners digitais e físicos;
- sobrecarga mental;
- disfunção executiva;
- dificuldade de iniciar tarefas;
- camuflagem e burnout;
- necessidades específicas de mulheres, mães, estudantes e profissionais com TDAH.

---

### 3.2 Corpus complementar

Além dos CSVs do Reddit, o repositório contém pesquisas e dossiês produzidos por diferentes agentes/ferramentas de IA, incluindo arquivos gerados por:

- ChatGPT Deep Research;
- ChatGPT Agent Mode;
- Manus;
- Perplexity;
- Kimi;
- DeepSeek;
- Grok.

Esses materiais aparecem principalmente na pasta:

```text
research/
```

Exemplos de arquivos relevantes:

```text
research/chatgpt-deep-research-pesquisa_tdah_planners_completa.csv
research/chatgpt-agent-mode-dossie_pesquisa_mercado_tdah_planner.md
research/kimi-dossie_pesquisa_mercado_tdah_planner.md
research/kimi-pesquisa_tdah_planners_completa.csv
research/manus-pesquisa_tdah_planners_completa.csv
research/deepseek-pesquisa_tdah_planners_completa.csv
research/grok-pesquisa_tdah_planners_completa.csv
research/research_perplexity.md
```

Esses arquivos devem ser usados como **fonte complementar**, principalmente para:

- mapear concorrentes;
- identificar páginas de venda;
- observar linguagem de mercado;
- mapear claims e promessas;
- identificar fontes psicológicas/científicas;
- validar se os padrões do Reddit aparecem também no mercado;
- mapear oportunidades de copy e posicionamento.

O núcleo de voz do cliente, entretanto, deve permanecer nos CSVs do Reddit.

---

## 4. Artefatos existentes e função de cada um

### 4.1 Prompt mestre de scraping e análise

Local esperado:

```text
prompts/prompt_scraping_planner_tdah_com_guia_arquetipos.prompt.md
```

Função:

- define objetivo geral da pesquisa;
- orienta coleta, scraping e análise;
- estabelece regras éticas;
- define schemas esperados;
- incorpora guia de arquétipos;
- instrui classificação de evidências por dores, sentimentos, funcionalidades e arquétipos.

Esse prompt é a principal referência metodológica da fase.

---

### 4.2 Script de conversão Reddit JSON → CSV

Local esperado:

```text
research/reddit_json_to_csv.py
```

Função:

- processa arquivos JSON de threads do Reddit;
- gera um CSV por thread;
- extrai comentários e replies;
- preserva contexto de thread, comentário pai e comentário raiz;
- limpa texto;
- anonimiza autores;
- calcula sinais simples de relevância;
- identifica termos de planner, dor, feature e recomendação;
- cria o campo `text_for_ai`, útil para análise posterior por LLM.

Esse script permitiu transformar dados brutos grandes em uma camada enxuta e analisável.

---

### 4.3 CSVs do Reddit

Local esperado:

```text
research/reddit_data/csvs/
```

Função:

- corpus principal da análise;
- contém comentários, posts e contexto;
- deve ser a base da classificação qualitativa;
- deve alimentar matrizes de dor, arquétipo, feature e copy.

Campos especialmente importantes:

- `thread_url`;
- `subreddit`;
- `thread_title`;
- `thread_selftext_clean`;
- `record_type`;
- `body_clean`;
- `body_excerpt_280`;
- `parent_body_excerpt`;
- `root_body_excerpt`;
- `planner_terms_found`;
- `pain_terms_found`;
- `feature_terms_found`;
- `signal_tags`;
- `relevance_score_0_100`;
- `text_for_ai`.

---

### 4.4 NotebookLM — “The ADHD Planner Dilemma”

O NotebookLM atual atua como um repositório de análise qualitativa baseado nos 40 CSVs do Reddit.

Ele já está estruturado em torno de 7 pilares:

1. dores práticas;
2. linguagem emocional;
3. comportamentos;
4. soluções e recursos;
5. reclamações do mercado;
6. mapeamento de arquétipos;
7. oportunidades comerciais.

Artefatos já produzidos no NotebookLM:

- 1 resumo em vídeo;
- 2 infográficos estratégicos;
- 1 mapa mental conectando arquétipos, dores e funil.

Esses artefatos são úteis como síntese exploratória, mas ainda não substituem uma análise estruturada e rastreável.

---

## 5. Status macro das etapas

| Fase | Nome | Status | Observação |
|---|---|---:|---|
| 1 | Definição metodológica da pesquisa | ✅ Concluída | Prompt mestre e critérios já existem. |
| 2 | Descoberta ampla de fontes | ✅ Concluída | Não estender nesta fase. Corpus deve ser congelado. |
| 3 | Coleta de dados do Reddit | ✅ Concluída | JSONs e CSVs já existem. |
| 4 | Limpeza e estruturação dos dados | ✅ Concluída para Reddit | CSVs enxutos prontos para IA. |
| 5 | Ingestão no NotebookLM | ✅ Concluída | 40 CSVs carregados. |
| 6 | Sínteses exploratórias | ✅ Parcialmente concluída | Vídeo, infográficos e mapa mental já produzidos. |
| 7 | Análise qualitativa sistemática | 🔶 Próxima etapa | Precisa gerar achados rastreáveis. |
| 8 | Classificação por arquétipos | 🔶 Próxima etapa | Precisa classificar padrões/evidências. |
| 9 | Cruzamento estratégico | 🔜 Próxima etapa | Dor x arquétipo x feature x copy. |
| 10 | Relatório decisório final | 🔜 Entrega principal | Fecha a fase de pesquisa. |
| 11 | Escopo final do planner | ⏭️ Posterior | Depende do relatório decisório. |
| 12 | Refinamento de quiz/copy/funil | ⏭️ Posterior | Depende da validação dos arquétipos. |

---

## 6. Marco atual do projeto

O projeto deve ser considerado no seguinte ponto:

```text
[Pesquisa e coleta] ✅ concluída
[Organização dos dados] ✅ concluída
[NotebookLM com corpus Reddit] ✅ concluído
[Primeiras sínteses visuais] ✅ iniciadas/concluídas
[Classificação sistemática] 🔶 agora
[Cruzamentos estratégicos] 🔜 próximo
[Documento decisório] 🔜 próximo
[Escopo final do planner] ⏭️ depois
```

Em termos práticos:

> O projeto saiu da etapa de garimpo e entrou na etapa de lapidação.
> A prioridade agora é transformar os dados coletados em decisões de produto.

---

## 7. Escopo das próximas etapas

### 7.1 Etapa A — Fechamento oficial do corpus

**Objetivo:** declarar que a coleta está encerrada e que os dados atuais serão usados como base da análise.

#### Tarefas

- Confirmar que os 40 CSVs do Reddit são o corpus principal.
- Confirmar que novas coletas não serão feitas nesta rodada.
- Registrar a limitação: corpus majoritariamente Reddit, qualitativo, não estatístico.
- Separar dados principais e dados complementares.
- Criar um manifesto simples do corpus analisado.

#### Saída esperada

```text
research/outputs/00_corpus_manifest.md
```

Conteúdo mínimo:

- quantidade de CSVs;
- comunidades representadas;
- tipo de dado;
- critérios de uso;
- limitações;
- escopo fechado da análise.

---

### 7.2 Etapa B — Consolidação dos CSVs do Reddit

**Objetivo:** unir os CSVs em uma base consolidada para análise.

#### Tarefas

- Ler todos os CSVs de `research/reddit_data/csvs/`.
- Padronizar encoding e colunas.
- Remover linhas vazias ou irrelevantes.
- Manter posts principais e comentários úteis.
- Criar campo de origem preservado.
- Deduplicar registros se necessário.
- Gerar versão consolidada.

#### Saída esperada

```text
research/outputs/reddit_evidence_consolidated.csv
```

Colunas mínimas recomendadas:

- `source_file_stem`;
- `thread_url`;
- `subreddit`;
- `thread_title`;
- `record_id`;
- `record_type`;
- `comment_url`;
- `depth`;
- `score`;
- `body_clean`;
- `body_excerpt_280`;
- `parent_body_excerpt`;
- `root_body_excerpt`;
- `planner_terms_found`;
- `pain_terms_found`;
- `feature_terms_found`;
- `signal_tags`;
- `relevance_score_0_100`;
- `text_for_ai`.

---

### 7.3 Etapa C — Análise qualitativa estruturada

**Objetivo:** extrair os achados principais dos comentários.

#### Tarefas

- Identificar dores práticas recorrentes.
- Identificar dores emocionais.
- Identificar comportamentos.
- Identificar reclamações contra planners existentes.
- Identificar soluções tentadas.
- Identificar por que soluções falham.
- Identificar features desejadas.
- Identificar dicas espontâneas.
- Extrair frases curtas representativas.
- Separar evidência direta, inferência e hipótese.

#### Saídas esperadas

```text
research/outputs/01_mapa_qualitativo_dores_reddit.md
research/outputs/reddit_qualitative_findings.csv
```

Categorias mínimas:

- dor principal;
- dor secundária;
- sentimento;
- emoção;
- comportamento;
- solução tentada;
- motivo de falha;
- feature desejada;
- reclamação;
- elogio;
- evidência textual curta;
- nível de confiança.

---

### 7.4 Etapa D — Classificação por arquétipos

**Objetivo:** mapear evidências e padrões aos arquétipos do projeto.

#### Arquétipos de referência

- Nômade Quântico;
- Reator em Cadeia;
- Vulcão Silencioso;
- Arquiteto do Caos;
- Furacão;
- Camaleão Exausto;
- Manutenção / lowSeverity.

#### Tarefas

- Classificar evidências por arquétipo principal.
- Identificar arquétipos secundários.
- Registrar nível de confiança.
- Mapear dor central por arquétipo.
- Mapear motivo de abandono por arquétipo.
- Mapear linguagem emocional por arquétipo.
- Mapear feature ideal por arquétipo.
- Identificar sobreposição entre arquétipos.
- Apontar arquétipos fortes, fracos ou ambíguos nos dados.

#### Saídas esperadas

```text
research/outputs/02_matriz_arquetipos_dores_features.md
research/outputs/reddit_archetype_classification.csv
```

Colunas mínimas recomendadas:

- `record_id`;
- `thread_url`;
- `subreddit`;
- `body_excerpt_280`;
- `arquetipo_principal`;
- `arquetipos_secundarios`;
- `nivel_confianca`;
- `dor_central`;
- `sinais_textuais`;
- `motivo_classificacao`;
- `feature_sugerida`;
- `copy_angle`.

---

### 7.5 Etapa E — Cruzamento estratégico

**Objetivo:** transformar achados em decisões acionáveis.

#### Matrizes obrigatórias

1. Dor x Frequência.
2. Dor x Intensidade emocional.
3. Dor x Arquétipo.
4. Dor x Feature.
5. Dor x Copy.
6. Arquétipo x Módulo do planner.
7. Reclamação x Oportunidade.
8. Solução tentada x Falha.
9. Emoção x Funil.
10. Padrão comportamental x Mecanismo antiabandono.

#### Saída esperada

```text
research/outputs/03_matrizes_estrategicas_planner_tdah.md
```

---

### 7.6 Etapa F — Validação do quiz contra os dados

**Objetivo:** comparar os arquétipos e perguntas do quiz atual com os padrões encontrados.

#### Tarefas

- Ler especificação do quiz.
- Identificar arquétipos atuais.
- Comparar cada arquétipo com evidências do Reddit.
- Verificar se dores relevantes estão capturadas.
- Verificar se há arquétipos sobrepostos.
- Verificar se falta algum perfil comportamental.
- Apontar ajustes em nomes, descrições, promessas ou perguntas.
- Sugerir melhorias sem alterar código neste momento.

#### Saída esperada

```text
research/outputs/04_validacao_quiz_vs_pesquisa.md
```

---

### 7.7 Etapa G — Relatório decisório final

**Objetivo:** encerrar a fase de pesquisa com recomendações claras.

#### Conteúdo obrigatório

- resumo executivo;
- corpus utilizado;
- principais dores;
- principais emoções;
- principais comportamentos;
- principais reclamações contra planners;
- principais desejos/features;
- classificação dos arquétipos;
- matrizes estratégicas;
- recomendações para o planner;
- recomendações para o quiz;
- recomendações para copy;
- riscos e limitações;
- próximos passos.

#### Saída esperada

```text
research/outputs/05_relatorio_final_product_discovery_planner_tdah.md
```

Este é o principal entregável da fase.

---

## 8. Critérios de aceite da fase de análise

A fase de análise será considerada concluída quando existirem, no mínimo:

```text
research/outputs/00_corpus_manifest.md
research/outputs/reddit_evidence_consolidated.csv
research/outputs/01_mapa_qualitativo_dores_reddit.md
research/outputs/reddit_qualitative_findings.csv
research/outputs/02_matriz_arquetipos_dores_features.md
research/outputs/reddit_archetype_classification.csv
research/outputs/03_matrizes_estrategicas_planner_tdah.md
research/outputs/04_validacao_quiz_vs_pesquisa.md
research/outputs/05_relatorio_final_product_discovery_planner_tdah.md
```

E quando esses documentos responderem claramente:

1. Quais são as dores mais fortes?
2. Quais dores mais aparecem?
3. Por que planners falham?
4. Quais soluções as pessoas tentam?
5. Por que essas soluções falham?
6. Quais features são desejadas?
7. Quais arquétipos são sustentados pelos dados?
8. Quais arquétipos precisam de ajuste?
9. Que módulos o planner precisa ter?
10. Que promessas de copy parecem mais fortes?
11. Que erros de mercado o produto deve evitar?
12. Que recomendações devem orientar a próxima etapa?

---

## 9. Uso esperado de Codex e Claude Code

### 9.1 Codex

Usar preferencialmente para:

- análise estrutural do repositório;
- leitura e inventário de arquivos;
- criação de scripts auxiliares;
- consolidação de CSVs;
- deduplicação;
- geração de arquivos intermediários;
- validação de schemas;
- criação de relatórios iniciais;
- automação de outputs.

### 9.2 Claude Code

Usar preferencialmente para:

- análise qualitativa profunda;
- síntese de padrões;
- leitura crítica dos achados;
- classificação por arquétipos;
- redação de relatórios estratégicos;
- revisão de coerência;
- identificação de lacunas e sobreposições;
- validação da linguagem emocional.

### 9.3 Superpowers Skill

Caso disponível, usar a skill do Superpowers para:

- planejar a execução antes de agir;
- dividir a tarefa em fases;
- criar checklist;
- controlar progresso;
- evitar dispersão;
- garantir que o agente não tente resolver tudo em uma única resposta;
- separar análise estrutural, plano e execução.

---

## 10. Restrições importantes

Durante esta fase:

- Não retomar scraping amplo sem justificativa clara.
- Não ler os JSONs grandes do Reddit como fonte principal, salvo para checagens pontuais.
- Priorizar os CSVs em `research/reddit_data/csvs/`.
- Não alterar o quiz ainda.
- Não alterar copy de produção ainda.
- Não criar design visual final ainda.
- Não tratar comentários como diagnóstico clínico.
- Não usar linguagem de promessa terapêutica.
- Não transformar inferência em fato.
- Sempre separar evidência, interpretação e recomendação.
- Preservar rastreabilidade por arquivo, thread e comentário.

---

## 11. Regras de classificação

Toda classificação deve considerar:

- texto original ou trecho limpo;
- contexto da thread;
- contexto do comentário pai quando relevante;
- subreddit;
- score/relevância como sinal auxiliar, não determinante;
- linguagem emocional;
- dor explícita;
- comportamento descrito;
- solução tentada;
- motivo de falha;
- feature desejada.

Cada classificação por arquétipo deve conter:

- arquétipo principal;
- arquétipo secundário, se houver;
- nível de confiança;
- evidência textual curta;
- motivo da classificação;
- risco de ambiguidade.

Se a evidência for fraca, marcar como `indeterminado`.

---

## 12. Regras para outputs

Todos os outputs da fase devem ficar em:

```text
research/outputs/
```

Os nomes sugeridos devem ser preservados sempre que possível.

Todo arquivo Markdown deve conter:

- título;
- data de geração;
- escopo;
- fontes usadas;
- metodologia resumida;
- achados;
- limitações;
- próximos passos.

Todo CSV deve:

- preservar `record_id` quando possível;
- preservar `source_file_stem`;
- preservar `thread_url`;
- permitir rastreamento até o comentário/thread original;
- evitar dados pessoais identificáveis.

---

## 13. Próxima ação recomendada

A próxima ação recomendada é pedir ao Codex que:

1. leia este documento;
2. leia os prompts em `prompts/`;
3. leia os dossiês e CSVs em `research/`;
4. faça inventário dos dados disponíveis;
5. confirme o estado atual;
6. elabore um plano de ação detalhado para concluir a fase;
7. proponha arquivos de saída;
8. proponha ordem de execução;
9. identifique riscos e lacunas;
10. não modifique arquivos ainda, salvo se explicitamente autorizado.

---

## 14. Síntese final

Esta fase deve ser encerrada quando o projeto tiver transformado:

```text
Comentários e threads reais do Reddit
+ pesquisas de mercado complementares
+ guia de arquétipos
+ dados estruturados em CSV
```

em:

```text
mapas de dor
+ classificação por arquétipos
+ matrizes estratégicas
+ validação do quiz
+ recomendações de produto
+ recomendações de copy
+ relatório decisório final
```

Em uma frase:

> Esta etapa transforma a voz real de pessoas com TDAH em decisões estratégicas para produto, quiz, copy e posicionamento.
