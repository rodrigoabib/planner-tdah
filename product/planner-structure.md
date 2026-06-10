# Estrutura modular do planner - Planner TDAH v1

> **Documento vivo · Versão 1.0 · 2026-05-12**  
> **Ticket:** [KAN-21 / PRODUCT-1](https://the-abib-company.atlassian.net/browse/KAN-21)  
> **Status:** Aprovado  
> **Dependência:** [KAN-7 / FOUNDATION-1](../foundation/oferta-mvp.md)  
> **Fonte de verdade:** este arquivo define a arquitetura editorial do PDF v1 e guia PRODUCT-2, PRODUCT-3, PRODUCT-4 e PRODUCT-5.

---

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Índice completo de capítulos](#2-índice-completo-de-capítulos)
3. [Personalização leve na v1](#3-personalização-leve-na-v1)
4. [Matriz arquétipo × seção VARIANTE](#4-matriz-arquétipo--seção-variante)
5. [Critérios de aceite atendidos](#5-critérios-de-aceite-atendidos)

---

## 1. Visão geral

O produto v1 é um PDF imprimível premium em A4, compatível com uso em papel e em apps de anotação digital. A meta editorial é entregar um planner de **40 a 60 páginas**, com um miolo comum forte e uma camada de personalização leve por perfil de funcionamento.

A estrutura modular separa o conteúdo em dois tipos:

| Tipo | Definição | Uso na v1 |
|---|---|---|
| **[BASE]** | Página igual em todos os PDFs. Define método, templates e instruções comuns. | Garante produção rápida, consistência visual e reaproveitamento para os 7 arquivos finais. |
| **[VARIANTE]** | Página ajustada por arquétipo. Muda tom, exemplos e pequenas regras de uso. | Gera 6 versões por arquétipo + 1 versão lowSeverity, sem exigir 7 planners inteiros distintos. |

A v1 deve sair como **um sistema base sólido + 3 a 5 páginas únicas por arquétipo, além da capa**. Isso mantém o escopo dentro do MVP definido em FOUNDATION-1, preserva a promessa de adaptação ao padrão de atenção e prepara a v1.5 para personalização mais profunda sem refazer a arquitetura.

---

## 2. Índice completo de capítulos

| Seção | Tipo [BASE]/[VARIANTE] | Páginas estimadas |
|---|---|---:|
| Capa personalizada por arquétipo | [VARIANTE] | 1 |
| Página de identificação do planner e dados do leitor | [BASE] | 1 |
| Boas-vindas + apresentação do arquétipo | [VARIANTE] | 1 |
| Mapa rápido do planner | [BASE] | 2 |
| Como usar este planner | [BASE] | 3 |
| Comece em 15 minutos dentro do planner | [BASE] | 2 |
| Ritual de captura: inbox de ideias, tarefas e pendências | [BASE] | 4 |
| Ritual diário: template principal | [BASE] | 4 |
| Ajustes do ritual diário por arquétipo | [VARIANTE] | 1-2 |
| Ritual semanal: revisão, escolha e reset | [BASE] | 4 |
| Ritual mensal: visão, energia e próximos blocos | [BASE] | 3 |
| Insights e atalhos para o arquétipo | [VARIANTE] | 1 |
| Templates diários reutilizáveis | [BASE] | 12 |
| Templates semanais reutilizáveis | [BASE] | 6 |
| Templates mensais reutilizáveis | [BASE] | 3 |
| Banco de capturas soltas | [BASE] | 3 |
| Modo Recomeço: retomada depois de dias parado + banco de micro-ações | [BASE] | 3 |
| Página de fechamento: como continuar usando | [BASE] | 1 |
| **Total estimado por PDF** |  | **52-53** |

**Decisão editorial:** o bônus separado "Comece em 15 minutos" continua pertencendo ao escopo de PRODUCT-7, mas a v1 do planner inclui uma versão curta interna de 2 páginas para reduzir fricção no primeiro uso.

---

## 3. Personalização leve na v1

Na v1, "personalização leve" significa que cada PDF mantém o mesmo método e os mesmos templates principais, mas troca uma camada pequena e relevante de orientação. Cada arquétipo recebe **exatamente 3 a 5 páginas de conteúdo único**, além da capa:

| Bloco único | Páginas | O que muda |
|---|---:|---|
| Boas-vindas do arquétipo | 1 | Tom, reconhecimento do padrão de atenção e modo recomendado de começar. |
| Ajustes do ritual diário | 1-2 | Regras pequenas para usar o template diário sem brigar com o próprio modo de funcionamento. |
| Insights e atalhos | 1 | Lista curta de práticas, alertas úteis e atalhos de retomada. |

Diretrizes fixas por arquétipo:

| Arquétipo | Ajuste central do ritual diário |
|---|---|
| O Nômade Quântico | Usar âncoras visuais e lembretes contextuais para trazer o plano de volta ao campo de visão. |
| O Reator em Cadeia | Inserir speed bumps antes de decisões maiores e checkpoints de consistência. |
| O Vulcão Silencioso | Fazer check-in de humor antes de escolher o tamanho realista do dia. |
| O Arquiteto do Caos | Quebrar visões grandes em micro-ações e capturar ideias sem abandonar o plano atual. |
| O Furacão | Limitar o dia a 3 prioridades absolutas e usar reset fácil quando o plano estourar. |
| O Camaleão Exausto | Permitir dias mínimos, pausas e retomadas sem transformar falhas pontuais em abandono. |
| lowSeverity | Usar estrutura leve de manutenção, com foco em constância simples e baixa carga de preenchimento. |

---

## 4. Matriz arquétipo × seção VARIANTE

| Arquétipo | Capa [VARIANTE] | Boas-vindas [VARIANTE] | Ajustes do ritual diário [VARIANTE] | Insights e atalhos [VARIANTE] |
|---|---|---|---|---|
| O Nômade Quântico | Nome, símbolo ∞, paleta roxa e subtítulo "Presente em todos os lugares. Em nenhum ao mesmo tempo." | Texto acolhe a sensação de tempo escapando e posiciona o planner como estrutura externa visível. | 1. Marcar uma âncora visual do dia. 2. Usar caixas de captura rápida antes de detalhar tarefas. 3. Reposicionar o planner em local impossível de ignorar. | Atalhos para voltar ao plano: gatilho visual, bloco de 10 minutos, lista "voltar para agora" e revisão rápida de compromissos. |
| O Reator em Cadeia | Nome, símbolo △, paleta vermelha e subtítulo "Energia infinita. Freio é opcional." | Texto reconhece energia alta e decisões rápidas, sem culpar o leitor por oscilar entre impulso e queda de ritmo. | 1. Criar uma pausa obrigatória antes de decisões com impacto. 2. Definir uma ação de continuidade para projetos iniciados. 3. Revisar o dia antes de aceitar novas demandas. | Atalhos: pergunta de freio, regra das 24 horas para escolhas grandes, checkpoint de meio do dia e lista "não começo antes de fechar". |
| O Vulcão Silencioso | Nome, símbolo ◆, paleta âmbar e subtítulo "Por fora: calma. Por dentro: lava." | Texto valida o custo interno invisível e orienta o leitor a ajustar o tamanho do dia pelo estado emocional percebido. | 1. Fazer check-in de humor no início. 2. Escolher versão mínima, média ou completa do dia. 3. Incluir buffer de retomada após erro ou crítica. | Atalhos: escala de energia emocional, frase de retomada, tarefa pequena de reentrada e caixa "o que não precisa ser resolvido hoje". |
| O Arquiteto do Caos | Nome, símbolo ⬡, paleta verde e subtítulo "Mil ideias. Zero andaimes." | Texto reconhece criatividade intensa e transforma o planner em andaime para tirar ideias do campo abstrato. | 1. Converter visão em micro-ação física. 2. Separar inbox de ideias do plano de execução. 3. Limitar novas frentes abertas por dia. | Atalhos: pergunta "qual é o próximo tijolo?", lista de estacionamento de ideias, regra de uma entrega visível e revisão de escopo. |
| O Furacão | Nome, símbolo ✦, paleta rosa e subtítulo "Tudo ao máximo. Sempre." | Texto reduz exigência, reforça simplicidade radical e apresenta o planner como ponto de aterrissagem para dias intensos. | 1. Escolher 3 prioridades absolutas. 2. Definir uma versão mínima de cada prioridade. 3. Usar reset sem punição quando o dia sair do eixo. | Atalhos: página de reset de 5 minutos, filtro "essencial hoje", lista de descarte temporário e marcação de vitória mínima. |
| O Camaleão Exausto | Nome, símbolo ◑, paleta ciano e subtítulo "Parece que dá conta. Por dentro, é outra história." | Texto reconhece o custo de sustentar desempenho externo e autoriza um planejamento mais leve e sustentável. | 1. Planejar dias mínimos sem culpa. 2. Marcar tarefas que podem esperar. 3. Separar obrigação real de expectativa absorvida. | Atalhos: permissão de pular dias, retomada sem compensação excessiva, bloco "fazer menos melhor" e lista de sinais de sobrecarga. |
| lowSeverity | Capa própria com "Perfil de manutenção" e associação visual ao Camaleão Exausto sem repetir a mesma promessa. | Texto explica que o padrão apareceu com baixa intensidade no quiz e propõe usar o planner como manutenção preventiva de rotina. | 1. Manter ritual diário em versão curta. 2. Usar templates apenas nos dias que pedem mais estrutura. 3. Revisar semanalmente sem excesso de preenchimento. | Atalhos: checklist leve de semana, marcador de atrito recorrente, rotina de 15 minutos e regra "estrutura suficiente, não perfeita". |

---

## 5. Critérios de aceite atendidos

| Critério | Como foi atendido |
|---|---|
| Documento `product/planner-structure.md` criado e versionado | Este arquivo define o artefato único de PRODUCT-1 no caminho solicitado. |
| Cada seção marcada `[BASE]` ou `[VARIANTE]` | A seção 2 classifica todas as partes do PDF e a seção 4 detalha as variações. |
| Volume estimado por seção documentado | A seção 2 traz estimativa por capítulo e total por PDF de 49-50 páginas. |
| Definição clara do que é "personalização leve" para a v1 | A seção 3 fixa 3 a 5 páginas únicas por arquétipo, além da capa, com conteúdo de cada bloco. |

---

## Histórico de revisões

| Data | Versão | Mudança | Autor |
|---|---|---|---|
| 2026-05-12 | 1.0 | Documento inicial da estrutura modular do planner v1 | Rodrigo Abib + Codex |
| 2026-06-10 | 1.1 | Adicionado capítulo [BASE] "Modo Recomeço" (retomada pós-pausa + banco de micro-ações por energia/tempo/contexto), sustentado pelo discovery Reddit (rotina rígida que quebra: 127 registros; culpa após falha: 39; antiabandono transversal em `research/outputs/03` §7 e `05` §4). Total por PDF: 49-50 → 52-53. | Claude Code |

---

**Fim do documento.**
