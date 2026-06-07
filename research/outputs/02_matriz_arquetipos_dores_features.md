# Matriz Arquétipos x Dores x Features - Planner TDAH

> **Ticket:** Pesquisa interna / sem ticket Jira atribuído  
> **Status:** Gerado em 2026-06-05  
> **Dependências:** reddit_archetype_classification.csv; quiz/data/archetypes.js; quiz/quiz-tdah-especificacao-completa.md  
> **Sumário:** Classifica sinais textuais do Reddit contra os arquétipos existentes do quiz, com confiança e risco de ambiguidade.

---

## 1. Método e cautela

A classificação por arquétipo é heurística. Ela aproxima sinais textuais de fricção, comportamento e feature desejada aos arquétipos do quiz. Ela não diagnostica TDAH e não substitui revisão humana.

## 2. Distribuição geral

| Arquétipo | Nome | Registros | % do corpus |
| --- | --- | --- | --- |
| indeterminado | Indeterminado | 999 | 44.4 |
| nomade | O Nômade Quântico | 450 | 20.0 |
| arquiteto | O Arquiteto do Caos | 310 | 13.8 |
| reator | O Reator em Cadeia | 196 | 8.7 |
| furacao | O Furacão | 172 | 7.6 |
| manutencao | Perfil de Manutenção | 61 | 2.7 |
| vulcao | O Vulcão Silencioso | 42 | 1.9 |
| camaleao | O Camaleão Exausto | 22 | 1.0 |

## 3. Nível de confiança

| Confiança | Registros |
| --- | --- |
| baixa | 1467 |
| média | 633 |
| alta | 152 |

## 4. Matriz dor x arquétipo

| Dor | Arquétipo | Registros |
| --- | --- | --- |
| Função executiva e organização externa | O Nômade Quântico | 148 |
| Função executiva e organização externa | O Arquiteto do Caos | 127 |
| Impulsividade e decisões rápidas | O Reator em Cadeia | 93 |
| Cegueira temporal, atrasos e prazos | O Nômade Quântico | 84 |
| Esquecimento, memória de trabalho e fora do campo visual | O Nômade Quântico | 64 |
| Excesso de ideias e projetos pela metade | O Arquiteto do Caos | 52 |
| Sobrecarga cognitiva e excesso de etapas | O Furacão | 44 |
| Função executiva e organização externa | O Furacão | 43 |
| Impulsividade e decisões rápidas | O Nômade Quântico | 34 |
| Função executiva e organização externa | O Reator em Cadeia | 30 |
| Rotinas rígidas que quebram quando um dia falha | O Nômade Quântico | 29 |
| Função executiva e organização externa | Perfil de Manutenção | 29 |
| Motivação, novidade e dopamina | O Reator em Cadeia | 25 |
| Bagunça visual, estética e legibilidade | O Furacão | 24 |
| Bagunça visual, estética e legibilidade | O Nômade Quântico | 23 |
| Rotinas rígidas que quebram quando um dia falha | O Arquiteto do Caos | 18 |
| Rotinas rígidas que quebram quando um dia falha | O Furacão | 17 |
| Priorização e decisão do que fazer primeiro | O Arquiteto do Caos | 17 |
| Cegueira temporal, atrasos e prazos | O Arquiteto do Caos | 17 |
| Regulação emocional, ansiedade e estresse | O Vulcão Silencioso | 16 |
| Motivação, novidade e dopamina | O Nômade Quântico | 16 |
| Bagunça visual, estética e legibilidade | O Arquiteto do Caos | 15 |
| Iniciação de tarefas e procrastinação | O Arquiteto do Caos | 15 |
| Função executiva e organização externa | O Vulcão Silencioso | 13 |
| Cegueira temporal, atrasos e prazos | O Furacão | 12 |
| Bagunça visual, estética e legibilidade | O Reator em Cadeia | 11 |
| Sobrecarga cognitiva e excesso de etapas | O Arquiteto do Caos | 11 |
| Excesso de ideias e projetos pela metade | O Nômade Quântico | 10 |
| Rotinas rígidas que quebram quando um dia falha | O Reator em Cadeia | 10 |
| Rotinas rígidas que quebram quando um dia falha | Perfil de Manutenção | 9 |

## 5. Matriz arquétipo x feature sugerida

| Arquétipo | Feature | Registros |
| --- | --- | --- |
| O Nômade Quântico | Âncoras visuais e lembretes contextuais | 218 |
| O Arquiteto do Caos | Captura rápida / inbox de ideias | 153 |
| O Reator em Cadeia | Speed bumps para impulso e decisões | 94 |
| O Nômade Quântico | Templates simples de baixo atrito | 70 |
| O Nômade Quântico | Revisão semanal e planejamento leve | 64 |
| Perfil de Manutenção | Templates simples de baixo atrito | 58 |
| O Nômade Quântico | Tracking gentil sem streak punitivo | 57 |
| O Furacão | Templates simples de baixo atrito | 49 |
| O Arquiteto do Caos | Micro-ações e próximo passo físico | 47 |
| O Reator em Cadeia | Templates simples de baixo atrito | 42 |
| O Furacão | Limite de 1 a 3 prioridades | 36 |
| O Furacão | Tracking gentil sem streak punitivo | 31 |
| O Arquiteto do Caos | Revisão semanal e planejamento leve | 30 |
| O Arquiteto do Caos | Tracking gentil sem streak punitivo | 29 |
| O Reator em Cadeia | Revisão semanal e planejamento leve | 28 |
| O Arquiteto do Caos | Templates simples de baixo atrito | 28 |
| O Furacão | Revisão semanal e planejamento leve | 26 |
| O Vulcão Silencioso | Check-in de humor/energia | 21 |
| O Reator em Cadeia | Tracking gentil sem streak punitivo | 19 |
| O Furacão | Âncoras visuais e lembretes contextuais | 15 |
| O Nômade Quântico | Captura rápida / inbox de ideias | 13 |
| O Nômade Quântico | Micro-ações e próximo passo físico | 12 |
| O Camaleão Exausto | Templates simples de baixo atrito | 12 |
| O Arquiteto do Caos | Estrutura flexível e modular | 9 |
| O Camaleão Exausto | Reset sem culpa e retomada curta | 7 |
| O Vulcão Silencioso | Revisão semanal e planejamento leve | 7 |
| O Furacão | Captura rápida / inbox de ideias | 6 |
| O Furacão | Check-in de humor/energia | 6 |
| O Arquiteto do Caos | Check-in de humor/energia | 5 |
| O Nômade Quântico | Estrutura flexível e modular | 5 |

## 6. Leituras por arquétipo

### O Nômade Quântico

Registros classificados: **450**. Ângulo ético de copy: trazer o plano de volta para o campo de visão sem depender só da memória.

| record_id | confiança | dor central | feature | evidência curta |
| --- | --- | --- | --- | --- |
| reddit-ADHD-adhd_planner_what_works_what_doesnt:comment:lz8y0eu | alta | Excesso de ideias e projetos pela metade | Âncoras visuais e lembretes contextuais | Sadly... you could buy me the worlds most sophisticated and effective planner only to come by and find me using it as a coaster for my coffee cup or buried u... |
| reddit-ADHDUK-what_adhd_apps_do_you_use:comment:li2efbb | alta | Esquecimento, memória de trabalho e fora do campo visual | Tracking gentil sem streak punitivo | I have a bad habit of overcomplicating things and spending hours setting up and then re-setting up 'productivity stacks' but in reality simplicity is best Ch... |
| reddit-adhdwomen-does_anyone_here_successfully_use:comment:nx5ibra | alta | Função executiva e organização externa | Âncoras visuais e lembretes contextuais | My executive function strength is organization so I love to talk about this stuff!! I’ll give my current stuff below that I’ve figured out works for me over... |

### O Reator em Cadeia

Registros classificados: **196**. Ângulo ético de copy: transformar energia inicial em continuidade com pausas e checkpoints simples.

| record_id | confiança | dor central | feature | evidência curta |
| --- | --- | --- | --- | --- |
| reddit-adhdwomen-a_new_planner_will_not_change_your_life:comment:m4g389n | alta | Impulsividade e decisões rápidas | Templates simples de baixo atrito | you are going to hyper focus the stickers for the holidays of the upcoming year first, write in birthdays with fun cute colored pens, start a to-do list in i... |
| reddit-ADHD-my_diy_planner_is_helping_my_adhd_more_than_i:comment:d5dxrad | alta | Impulsividade e decisões rápidas | Speed bumps para impulso e decisões | When you are done with the .pdf you could sell these on Etsy! I searched ADHD planners on there recently and there was nothing. I would spend months on this... |
| reddit-adhdwomen-hyperfixated_on_hobinichi_and_planner_content:comment:omaq3c1 | alta | Impulsividade e decisões rápidas | Templates simples de baixo atrito | I am right there with you I firmly believe the right notebook will change my life and unfortunately the Hobonichi is the closest I’ve come to that happening... |

### O Vulcão Silencioso

Registros classificados: **42**. Ângulo ético de copy: planejar respeitando estado emocional e retomada após dias difíceis.

| record_id | confiança | dor central | feature | evidência curta |
| --- | --- | --- | --- | --- |
| reddit-adhdwomen-hyperfixated_on_hobinichi_and_planner_content:comment:om8h41d | alta | Função executiva e organização externa | Check-in de humor/energia | Haha welcome to the club! I've been using Hobonichis for a few years now and definitely went down the rabbit hole. I've used them to varying degrees of succe... |
| reddit-adhdwomen-is_there_actually_a_planner_an_adhder_like_myself:comment:m0lbkl0 | alta | Rotinas rígidas que quebram quando um dia falha | Tracking gentil sem streak punitivo | Planners, for us, aren’t really meant to be stuck to. They’re not like flossing or mowing the lawn. What a planner is, is a friend — a companion to help us g... |
| reddit-adhdwomen-i_have_seen_so_many_adhd_planners_that_just_dont:comment:lc4wxfw | alta | Culpa, vergonha e autocrítica | Templates simples de baixo atrito | my planner is designed to be picked up, put down, changed up and full of ADHD templates based on the actual research. The entire design is about not having s... |

### O Arquiteto do Caos

Registros classificados: **310**. Ângulo ético de copy: dar andaime para ideias virarem próximo passo concreto.

| record_id | confiança | dor central | feature | evidência curta |
| --- | --- | --- | --- | --- |
| reddit-ADHD-adhd_planner_what_works_what_doesnt:comment:lzdpkcl | alta | Função executiva e organização externa | Captura rápida / inbox de ideias | Choosing a planner FOR your student won't work - no matter how good your intentions are behind it and how much research you put into it. You may also need to... |
| reddit-AskAcademia-how_do_i_succeed_as_a_researcher_with_adhd:comment:kqsin57 | alta | Cegueira temporal, atrasos e prazos | Micro-ações e próximo passo físico | I’m sorry you’ve had such a hard time. ADHD is a bad hand to be dealt, I’m in the same boat. I am finishing up my PhD soon, and it has been rocky sometimes,... |
| reddit-notebooklm-i_finally_broke_my_adhd_digital_graveyard_cycle:post:1p50ldw | alta | Função executiva e organização externa | Captura rápida / inbox de ideias | I finally broke my ADHD "Digital Graveyard" cycle. Goodbye Notion/Roam/Tana, Hello NotebookLM (My "No-Admin" Setup) TL;DR: I switched from complex Notion/Obs... |

### O Furacão

Registros classificados: **172**. Ângulo ético de copy: reduzir o dia ao essencial e oferecer reset simples quando tudo sair do eixo.

| record_id | confiança | dor central | feature | evidência curta |
| --- | --- | --- | --- | --- |
| reddit-adhdwomen-a_new_planner_will_not_change_your_life:comment:m4gczh6 | alta | Priorização e decisão do que fazer primeiro | Revisão semanal e planejamento leve | I agree buuuuut - - it can change how you LOOK BACK on your life! ✨✨ I decided to create MY OWN CUSTOM journal/planner. 📒 Surprisingly less work than I thoug... |
| reddit-adhdwomen-how_many_of_you_bought_a_pretty_expensive_planner:comment:ny9b61i | alta | Função executiva e organização externa | Tracking gentil sem streak punitivo | You're definitely not alone. I've watched so many people (including myself) do this exact thing. Here's the thing, though - the planner isn't actually the pr... |
| reddit-adhdwomen-i_have_seen_so_many_adhd_planners_that_just_dont:comment:kj0m3bm | alta | Sobrecarga cognitiva e excesso de etapas | Tracking gentil sem streak punitivo | I just use Google Keep for my personal lists and notes, which I like because I can input things from my laptop or my phone and access my lists on either one.... |

### O Camaleão Exausto

Registros classificados: **22**. Ângulo ético de copy: fazer menos de forma sustentável sem transformar compensação em cobrança.

| record_id | confiança | dor central | feature | evidência curta |
| --- | --- | --- | --- | --- |
| reddit-ADHD-my_diy_planner_is_helping_my_adhd_more_than_i:comment:d5dp31l | média | Bagunça visual, estética e legibilidade | Templates simples de baixo atrito | Thanks! To your first question, I print it at home. I started w/ black and white on colored paper, then ended up needing a new printer so got a color laserje... |
| reddit-adhdwomen-i_have_seen_so_many_adhd_planners_that_just_dont:comment:kj0p298 | média | Manutenção do sistema e constância | Templates simples de baixo atrito | The only thing that's ever worked long term is bullet journaling. Not that I'm great at being consistent, sometimes it just looks like a regular planner - BU... |
| reddit-adhdwomen-i_have_seen_so_many_adhd_planners_that_just_dont:post:19cluwh | média | Compensação, máscara e burnout | Reset sem culpa e retomada curta | I have seen so many “ADHD planners” that just DON’T HELP. What are some things/features YOU would love to see incorporated that would actually benefit you? S... |

### Perfil de Manutenção

Registros classificados: **61**. Ângulo ético de copy: manter uma estrutura leve, suficiente e fácil de repetir.

| record_id | confiança | dor central | feature | evidência curta |
| --- | --- | --- | --- | --- |
| reddit-planners-specific_adhd_planner_recs_tips:comment:mwzv5wl | média | Bagunça visual, estética e legibilidade | Templates simples de baixo atrito | Hemlock & Oak is pretty, but they come with loads of extra. Even the minimalist ones. I think their daily planner is the only one without any "monthly recap"... |
| reddit-PKMS-settling_on_a_pkm_for_the_adhdriddled_student_who:comment:kt91tl9 | média | Função executiva e organização externa | Templates simples de baixo atrito | Can't say much about the other categories, but as far as Notion Upgrades, Tana has been nothing short of revolutionary to me. If you have the tendency to try... |
| reddit-adhdwomen-i_have_seen_so_many_adhd_planners_that_just_dont:comment:kj1bwn7 | média | Função executiva e organização externa | Templates simples de baixo atrito | I used a bullet journal for... roughly 6 years. It worked really well until it didn't. Once I started working remote it stopped working. Something in my brai... |

### Indeterminado

Registros classificados: **999**. Ângulo ético de copy: não usar como ângulo de copy sem revisão humana.

| record_id | confiança | dor central | feature | evidência curta |
| --- | --- | --- | --- | --- |
| reddit-planners-planners_for_my_adhd_enthusiasts:comment:lzk387b | baixa | Função executiva e organização externa | Revisão semanal e planejamento leve | I recently found on Amazon a time blocking planner by a brand called Refine Days. I use the spiral version and I love it. It has so much space and my issue w... |
| reddit-ProductivityApps-best_productivity_and_organizational_apps_for_adhd:post:1cq6u8y | baixa | Função executiva e organização externa | Indeterminado | Best productivity and organizational apps for ADHD I’ve been struggling to stay focused for long periods of time and feel extremely disorganized. Curious to... |
| reddit-planners-planners_for_folks_with_intense_adhd:comment:llwlldg | baixa | Função executiva e organização externa | Indeterminado | I do Bullet Journal in a Stalogy Editor's Series for work. I always end up fighting more structured planners but the timeline is great for time blocking. |

## 7. Recomendações de uso

- Usar classificações `alta` e `média` para priorização exploratória.
- Revisar manualmente registros `baixa` antes de transformar em copy ou regra de produto.
- Tratar `indeterminado` como lacuna ou contexto, não como validação negativa do arquétipo.
- Quando houver arquétipo secundário, priorizar feature transversal em vez de aumentar personalização textual.

## Histórico de revisões

| Data | Versão | Mudança | Autor |
| --- | --- | --- | --- |
| 2026-06-05 | 1.0 | Matriz de arquétipos gerada sem alterar quiz ou produto. | Codex |
