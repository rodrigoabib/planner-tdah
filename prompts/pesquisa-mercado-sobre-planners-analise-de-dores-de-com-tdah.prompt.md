# Pesquisa de Mercado: Infoproduto - Planners para Pessoas com TDAH

**Pesquisador:** Especialista em infoprodutos, comportamento de consumidores neurodivergentes e análise de dores de clientes com TDAH adulto.

**Capacidades:** Use toda sua expertise em raciocínio, pesquisa, análise de dados e todas as Skills, Connectors, Plugins e Agents disponíveis para máxima profundidade, granularidade e qualidade.

---

## 🎯 Objetivo

Realizar uma pesquisa ampla, profunda e rastreável para coletar URLs públicas que revelem dores, desejos, frustrações, elogios, reclamações, linguagem emocional e padrões de comportamento de pessoas com TDAH em relação a:

- Planners físicos
- Planners digitais
- Bullet journals
- Notion templates
- Apps de produtividade
- Sistemas de organização
- Rotina e organização
- Procrastinação
- Função executiva
- Gestão do tempo
- Dificuldade de começar tarefas
- Abandono de planners
- Culpa por não manter rotina
- Sobrecarga com planejamento
- Planejamento para mulheres adultas com TDAH
- Organização para mães, profissionais, estudantes e empreendedoras com TDAH

**Objetivo final:** Alimentar a criação de um infoproduto — um planner para pessoas com TDAH, vendido após um quiz de arquétipos. Priorize fontes que ajudem a descobrir dores reais, linguagem de venda, falhas de concorrentes, oportunidades de diferenciação e possíveis recursos para o planner.

---

## ⚠️ Regras Críticas

✅ **Não invente URLs**  
✅ **Não inclua fontes genéricas demais**  
✅ **Não traga apenas artigos explicativos sobre TDAH**  
✅ **Priorize fontes com evidências de voz do cliente:**
  - Reviews
  - Comentários
  - Relatos pessoais
  - Discussões espontâneas
  - Páginas de venda
  - Fotos de páginas de planners
  - Avaliações de usuários
  - Reclamações

✅ **Use apenas conteúdo público e acessível** — Não tente burlar paywalls, logins, permissões, robots.txt ou restrições de plataforma  
✅ **Quando não for acessível:** Colete a URL e indique que exige extração posterior via Apify, exportação manual autorizada ou API oficial

---

## 📍 Fontes Prioritárias

### 1. Marketplaces e Produtos Concorrentes

- Etsy
- Amazon
- Gumroad
- Payhip
- Creative Market
- Notion templates
- Shopify stores
- Hotmart
- Kiwify
- Eduzz
- App Store
- Google Play
- Product Hunt

### 2. Comunidades e Relatos Espontâneos

- Reddit
- Quora
- Medium
- Substack
- Fóruns sobre TDAH
- Grupos/comunidades públicas
- Comentários públicos em YouTube
- Posts públicos de Instagram/TikTok (quando acessíveis)

### 3. Conteúdo Psicológico e Comportamental

- CHADD
- ADDA
- CDC
- NIMH
- NICE
- PubMed/NCBI
- Artigos sobre função executiva
- Artigos sobre ADHD coaching
- Artigos sobre time blindness
- Artigos sobre procrastinação em TDAH

### 4. Anúncios, Criativos e Páginas de Venda

- Meta Ad Library
- TikTok Creative Center
- Google Ads Transparency Center
- Landing pages de planners
- Páginas de venda de cursos/produtos para TDAH
- Páginas de venda de planners para mulheres, mães e adultos com TDAH

---

## 🔍 Termos de Busca Sugeridos

Pesquise em **português e inglês**.

### Português

- planner TDAH
- planner para TDAH
- planner para quem tem TDAH
- organização TDAH
- rotina TDAH
- procrastinação TDAH
- função executiva TDAH
- como se organizar com TDAH
- planner para neurodivergentes
- agenda TDAH
- bullet journal TDAH
- TDAH não consigo manter rotina
- TDAH abandono planner
- TDAH esqueci de usar planner
- TDAH dificuldade de começar tarefas
- TDAH planejamento semanal
- TDAH mulheres adultas organização
- TDAH mães rotina organização
- TDAH culpa procrastinação
- TDAH sobrecarga planejamento

### Inglês

- ADHD planner
- ADHD digital planner
- ADHD printable planner
- ADHD planner reviews
- ADHD planner doesn't work
- ADHD planner abandoned
- ADHD productivity system failed
- ADHD bullet journal failed
- ADHD overwhelmed by planning
- ADHD time blindness planner
- ADHD executive function planner
- planner for ADHD women
- planner for neurodivergent adults
- ADHD Notion planner
- ADHD routine planner
- ADHD task initiation planner
- ADHD procrastination planner
- ADHD self compassion planner
- ADHD habit tracker reviews
- ADHD productivity tools reviews
- ADHD app reviews planning
- ADHD organization system reviews

---

## 📊 O Que Coletar

Para cada URL encontrada, retorne uma linha estruturada com os seguintes campos:

| Campo | Descrição |
|-------|-----------|
| `url` | Link direto |
| `titulo` | Título da página/produto |
| `plataforma` | Plataforma onde encontrada |
| `tipo_de_fonte` | Classificação do tipo de fonte |
| `idioma` | PT ou EN |
| `pais_ou_contexto` | Brasil, EUA, Internacional, etc |
| `categoria` | Classificação de dor/oportunidade |
| `por_que_essa_fonte_importa` | Justificativa curta |
| `tipo_de_evidencia_esperada` | Que tipo de dado ela traz |
| `dores_potenciais` | Dores reveladas |
| `pode_conter_reviews_ou_comentarios` | Sim/Não |
| `pode_conter_fotos_de_paginas_do_planner` | Sim/Não |
| `pode_conter_linguagem_de_venda` | Sim/Não |
| `prioridade_de_analise` | Alta/Média/Baixa |
| `dificuldade_de_extracao` | Fácil/Média/Difícil/Especial |
| `observacao_de_acesso` | Restrições ou notas |
| `termos_de_busca_que_levaram_a_essa_fonte` | Palavras-chave usadas |

---

## ✓ Classificações Obrigatórias

### Tipos de Fonte

Use uma destas opções para `tipo_de_fonte`:

- review_produto
- pagina_venda
- marketplace
- artigo_psicologia
- artigo_cientifico
- comunidade
- reddit_thread
- youtube_video
- youtube_comentarios
- app_review
- anuncio
- landing_page
- forum
- post_social
- outro

### Categorias de Dor / Oportunidade

Use uma destas opções para `categoria`:

- dor_de_abandono
- dor_de_inicio_de_tarefa
- dor_de_priorizacao
- dor_de_esquecimento
- dor_de_sobrecarga
- dor_de_culpa
- dor_de_rotina
- dor_de_tempo
- dor_de_funcao_executiva
- concorrente_direto
- concorrente_indireto
- evidencia_psicologica
- oportunidade_de_copy
- oportunidade_de_feature
- linguagem_emocional
- prova_social
- objeção_de_compra

### Prioridade de Análise

Use uma destas opções para `prioridade_de_analise`:

- alta
- média
- baixa

### Dificuldade de Extração

Use uma destas opções para `dificuldade_de_extracao`:

- facil
- media
- dificil
- exige_ferramenta_especifica
- acesso_limitado

---

## 🎯 Critérios de Prioridade

Classifique como **prioridade alta** quando a fonte tiver pelo menos um destes elementos:

- ⭐ Reviews reais de compradores
- ⭐ Reclamações sobre planners
- ⭐ Relatos espontâneos de pessoas com TDAH
- ⭐ Comparação entre sistemas de organização
- ⭐ Comentários sobre abandono de planner
- ⭐ Fotos ou previews de páginas de planners
- ⭐ Produto concorrente com boa quantidade de avaliações
- ⭐ Linguagem emocional forte
- ⭐ Página de venda com promessa clara
- ⭐ Discussão sobre por que planners não funcionam para TDAH
- ⭐ Conteúdo sobre função executiva aplicado à organização

---

## 📈 Quantidade Desejada

Monte uma base inicial com pelo menos:

| Categoria | Quantidade | Descrição |
|-----------|-----------|-----------|
| **Produtos concorrentes** | 40 URLs | Planners, apps, templates em marketplaces |
| **Reviews e avaliações** | 40 URLs | Comentários, relatos, avaliações de usuários |
| **Comunidades e discussões** | 40 URLs | Reddit, fóruns, grupos, comunidades públicas |
| **Conteúdo psicológico** | 30 URLs | Artigos sobre função executiva, TDAH, procrastinação |
| **Apps e ferramentas** | 20 URLs | Avaliadas ou comentadas por pessoas com TDAH |
| **Anúncios e landing pages** | 20 URLs | Copy de venda, criativos, promessas |
| **Mulheres com TDAH** | 10 URLs | Foco específico em mulheres adultas |
| **Mães e vida adulta** | 10 URLs | Foco em mães, profissionais, empreendedoras |

**Nota:** Se não conseguir atingir esses números com qualidade, priorize qualidade sobre quantidade e explique onde houve limitação.

---

## 📤 Saída Esperada

Estruture sua entrega em **3 partes**:

### 1. Tabela Resumida (Top 20)
Entregue uma tabela com os **20 links mais importantes**, destacando URL, título, tipo de fonte e por que são prioritários.

### 2. Base Completa em CSV
Entregue a base completa em formato CSV dentro de um bloco de código, usando o seguinte cabeçalho:

```csv
url,titulo,plataforma,tipo_de_fonte,idioma,pais_ou_contexto,categoria,por_que_essa_fonte_importa,tipo_de_evidencia_esperada,dores_potenciais,pode_conter_reviews_ou_comentarios,pode_conter_fotos_de_paginas_do_planner,pode_conter_linguagem_de_venda,prioridade_de_analise,dificuldade_de_extracao,observacao_de_acesso,termos_de_busca_que_levaram_a_essa_fonte
```

### 3. Lista de Extração Especial
Entregue uma lista separada chamada **"Fontes que merecem extração posterior com Apify/n8n"**, contendo as URLs que parecem mais ricas em reviews, comentários ou dados estruturados.

---

## ✅ Regras de Qualidade

- **Não inclua links duplicados**
- **Não inclua páginas irrelevantes**
- **Não use apenas a primeira página do Google** — Aprofunde a busca
- **Procure variações em português e inglês** — Ampliar cobertura
- **Inclua fontes brasileiras e internacionais** — Perspectivas globais
- **Priorize fontes com sinais claros de dores reais, comentários ou reviews**
- **Sempre que possível, traga URLs específicas, não apenas domínios genéricos**
- **Quando uma fonte for potencialmente fraca, marque prioridade baixa**
- **Quando uma fonte for muito promissora, explique claramente por quê**