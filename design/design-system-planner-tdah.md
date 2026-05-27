# Design System — Planner TDAH

> Documento elaborado com base no prompt anexado, nos documentos reais do repositório `rodrigoabib/planner-tdah`, nos checklists internos de UX/acessibilidade/design cognitivo e em pesquisa externa sobre acessibilidade cognitiva, TDAH, legibilidade, contraste, conforto visual, impressão e uso em tablet. 

---

## 1. Visão geral da proposta

### Nome conceitual da direção visual

**Sistema Aurora de Retomada**

A ideia central é criar um planner que pareça uma **superfície de apoio viva**, não uma folha burocrática. O visual deve transmitir estrutura, movimento e acolhimento, mas sempre com uma hierarquia clara: primeiro o próximo passo, depois os detalhes.

### Frase-guia do sistema

> **“Organização que aparece antes da cobrança.”**

Essa frase nasce diretamente da promessa oficial do produto: **“Um planner que se adapta a como sua atenção realmente funciona — não a como ela deveria funcionar.”** A oferta MVP define essa promessa como a frase oficial do produto. 

### Objetivo emocional

Fazer a pessoa sentir:

> “Eu não preciso estar perfeita para começar. A página já me mostra o caminho.”

O planner deve reduzir a sensação de culpa, intimidação e fracasso comum em planners tradicionais. O usuário deve sentir que pode abrir em qualquer página e encontrar uma entrada possível.

### Objetivo funcional

Transformar cada página em uma unidade de ação clara:

* Onde estou?
* O que importa agora?
* Qual é a menor versão possível?
* O que posso capturar sem organizar?
* Como retomo se perdi o fio?

### Como diferencia o Planner TDAH de planners genéricos

Planners genéricos costumam partir de constância, disciplina, longas listas e preenchimento completo. O Planner TDAH deve partir de **atenção variável**, **memória externa**, **captura**, **retomada**, **energia realista** e **fricção mínima**.

O conteúdo base já organiza o planner em identificação, mapa rápido, “comece em 15 minutos”, rituais de captura, diário, semanal, mensal, templates e fechamento.  O Design System deve transformar essa estrutura editorial em uma experiência visual onde cada seção tenha função cognitiva clara.

### Como o design ajuda pessoas com TDAH

O sistema ajuda em quatro momentos:

| Momento   | Dificuldade comum                              | Resposta visual do Design System                                       |
| --------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| Começar   | Paralisia, excesso de decisão, página vazia    | Card “Comece aqui”, primeira ação destacada, campos mínimos            |
| Preencher | Distração, leitura longa, perda de prioridade  | Hierarquia forte, poucos campos principais, microcopy curta            |
| Manter    | Esquecimento, queda de novidade, abandono      | Checkpoints, rastros visuais, selos leves, páginas de revisão          |
| Retomar   | Culpa, dívida acumulada, compensação excessiva | Reset de 5 minutos, “versão mínima”, retomada sem preencher retroativo |

---

## 2. Fundamentação da proposta

### Fontes internas consideradas

A proposta considera que o produto v1 é um PDF A4 premium, imprimível e compatível com apps de anotação digital, com estrutura modular entre conteúdo `[BASE]` e `[VARIANTE]`. O documento `product/planner-structure.md` define esse arquivo como fonte de verdade da arquitetura editorial, estimando **49–50 páginas por PDF**. 

Também considera que o miolo base tem 48 páginas estimadas e foi escrito com tom empático, direto e prático, evitando culpa, cobrança moral e rótulos. 

As variantes por arquétipo não são apenas cosméticas: cada uma muda regras concretas de uso do ritual diário, como visibilidade externa, freios de decisão, check-in emocional, micro-ação física, simplicidade radical, redução de carga ou manutenção leve. 

O posicionamento ético proíbe promessas de cura, diagnóstico, tratamento, prova social falsa e urgência artificial. Portanto, o Design System deve parecer acolhedor e especializado, mas nunca clínico, médico ou milagroso. 

### Fontes internas de UX e acessibilidade

O checklist interno de UX/UI para TDAH recomenda foco principal por tela, máximo de duas frases de contextualização, progresso visível, feedback imediato, microvalidações, ritmo, mobile e redução de movimento. Embora tenha sido criado para o quiz, os princípios se aplicam ao PDF: cada página deve ter um foco principal, mostrar progresso/estado e reduzir carga cognitiva. 

O checklist de acessibilidade interno reforça contraste, foco, semântica, hierarquia, tamanho de alvo, reduced motion e legibilidade. Para o PDF, isso se traduz em contraste suficiente, labels visuais, campos claros, ícones com texto e não dependência exclusiva de cor. 

O checklist cognitivo interno destaca compreensão em até 5 segundos, hierarquia visual, chunking, simplicidade, suporte à memória, feedback, consistência e padrões de leitura. Isso fundamenta a decisão de criar páginas com um “próximo passo” sempre visível. 

### Pesquisa externa considerada

A WCAG 2.2 recomenda tornar conteúdo mais acessível a pessoas com deficiências diversas, incluindo algumas limitações cognitivas e de aprendizagem; o próprio W3C observa que WCAG não cobre todas as necessidades cognitivas e recomenda guias complementares, como COGA. ([W3C][1])

A W3C COGA recomenda propósito claro, hierarquia familiar, design consistente, passos claros, ícones úteis, estrutura compreensível, linguagem clara, texto sucinto, instruções separadas, espaçamento, redução de conteúdo excessivo, lembretes, simplificação e personalização. Esses pontos são o coração deste Design System. ([W3C][2])

A WCAG 2.2 define contraste mínimo de **4.5:1** para texto normal e **3:1** para texto grande; elementos gráficos importantes e componentes de interface devem atingir pelo menos **3:1** contra cores adjacentes. ([W3C][3])

A WCAG 2.2 também define tamanho mínimo de alvo digital de **24 × 24 CSS pixels**, útil para versões interativas futuras e para pensar checkboxes grandes em tablet. ([W3C][4])

O GOV.UK Design System reforça o uso de cores funcionais por propósito, contraste adequado e paletas com tints/shades, em vez de usar cor apenas como decoração. ([GOV.UK Design System][5])

Estudos recentes com usuários com TDAH em contextos digitais apontam que excesso de opções e customização pode virar distração; intervenções de produtividade para pessoas com TDAH tendem a funcionar melhor quando são de baixo toque, fáceis de usar e adaptadas ao estado de atenção. ([arXiv][6])

Pesquisas de visualização e carga cognitiva indicam que combinações de texto e elementos visuais podem reduzir esforço para pessoas com menor capacidade de memória de trabalho em certos contextos. Para o planner, isso justifica usar cards, ícones, trilhas e diagramas simples, mas sem poluir a página. ([arXiv][7])

---

## 3. Princípios do Design System

| Princípio                                           | Descrição                                             | Por que importa para TDAH                              | Como aplicar no PDF                                        | O que evitar                                             |
| --------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- | -------------------------------------------------------- |
| 1. Começar deve ser óbvio                           | Toda página precisa ter uma entrada visual clara.     | Reduz paralisia de iniciação.                          | Card “Comece aqui”, primeira linha destacada, ação mínima. | Páginas que começam com parágrafos longos.               |
| 2. Mostrar antes de explicar                        | O layout deve ensinar pela forma.                     | Diminui leitura obrigatória.                           | Campos agrupados, setas, exemplos curtos.                  | Explicar tudo em texto corrido.                          |
| 3. Uma página, uma intenção principal               | Cada página tem um propósito dominante.               | Evita disputa de atenção.                              | Cabeçalho com objetivo da página.                          | Misturar revisão, captura e planejamento sem hierarquia. |
| 4. Retomada é parte do sistema                      | O design presume abandono temporário.                 | Evita culpa e desistência.                             | Reset, versão mínima, “volte por aqui”.                    | Sequências rígidas que punem buracos.                    |
| 5. Cores orientam, não decoram                      | Cada cor tem função cognitiva.                        | Ajuda navegação e memória visual.                      | Cor por ritual, status e arquétipo.                        | Usar cores vibrantes sem significado.                    |
| 6. Reduzir memória de trabalho                      | O usuário não deve ter que lembrar o método.          | TDAH frequentemente envolve perda de fio e sobrecarga. | Legendas fixas, mini-instruções, fluxo visível.            | Referências do tipo “como explicado antes”.              |
| 7. O preenchimento deve aceitar energia variável    | O mesmo template deve funcionar em dias bons e ruins. | Evita abandonar em dias de baixa energia.              | Versão mínima, média e completa.                           | Campos obrigatórios demais.                              |
| 8. Dopamina com controle                            | O planner deve ser interessante, mas calmo.           | Estímulo ajuda abertura; excesso distrai.              | Selos, checkboxes grandes, microvitórias.                  | Gamificação competitiva ou infantilizada.                |
| 9. Textos curtos, humanos e acionáveis              | Microcopy deve indicar ação, não explicar teoria.     | Ajuda leitura rápida e ação imediata.                  | “Escolha só um”, “capture sem organizar”.                  | Linguagem clínica ou moralizante.                        |
| 10. Personalização deve mudar uso, não só aparência | Arquétipos precisam alterar a experiência prática.    | Reforça “feito para mim”.                              | Componentes específicos por perfil.                        | Trocar só capa e cor.                                    |
| 11. Espaço em branco suave é ferramenta             | Espaço deve dar respiro sem intimidar.                | Reduz carga visual e medo da página vazia.             | Fundos off-white, superfícies, guias leves.                | Branco puro vazio e sem direção.                         |
| 12. Consistência cria segurança                     | Padrões repetidos diminuem esforço.                   | Facilita retorno depois de pausa.                      | Mesmos componentes, labels e posições.                     | Reinventar layout a cada seção.                          |

---

## 4. Linguagem visual central

### Estilo visual

**Editorial funcional + playful premium + neuroinclusivo.**

Não deve parecer clínico, escolar infantil ou planner minimalista vazio. Deve parecer um produto digital-premium traduzido para PDF físico: organizado, tátil, acolhedor, com pequenas recompensas visuais.

### Nível de energia

* **Base do planner:** energia média-baixa, calma, clara.
* **Capas e divisórias:** energia média-alta, mais expressiva.
* **Páginas de reset/retomada:** energia baixa, tranquilizadora.
* **Arquétipos:** energia variável conforme perfil.

### Complexidade

A página pode ser visualmente rica, mas deve ter **baixa complexidade operacional**. Isso significa:

* poucos campos principais;
* agrupamentos fortes;
* ícones recorrentes;
* instruções curtas;
* hierarquia nítida;
* elementos decorativos sempre subordinados à ação.

### Profundidade e sombras

Para impressão, usar profundidade com moderação:

* sombras muito suaves em capas e divisórias;
* bordas e preenchimentos leves no miolo;
* evitar sombras pesadas em campos de escrita;
* em versão low-ink, trocar sombra por borda.

### Texturas

Texturas devem remeter a papel, mapa, trilha, órbita, grade, energia ou respiração. Usar sempre em baixa opacidade, principalmente em:

* capas;
* divisórias;
* headers;
* laterais;
* fundos de cards especiais.

Nunca usar textura atrás de texto longo.

### Gradientes

Gradientes são permitidos para:

* capas;
* divisórias;
* selos;
* pequenos marcadores;
* headers de arquétipo.

No miolo, preferir fundos planos suaves para impressão.

### Formas

O sistema usa uma família de formas:

* **círculos/orbitais:** retorno, atenção, ciclo;
* **setas/trilhas:** próximo passo, retomada;
* **cards arredondados:** apoio, gentileza;
* **linhas pontilhadas:** captura, ideias soltas;
* **blocos modulares:** estrutura, andaime;
* **faixas laterais:** orientação e seção;
* **selos:** microvitórias.

### Ícones

Ícones devem ser simples, monoline ou duotone, sempre acompanhados de label quando indicarem função. Nunca depender apenas do ícone.

Exemplo:

* 🧭 Comece aqui
* ⏸ Pausa
* 🎯 Foco
* ↩ Retomada
* ✍ Captura
* ✅ Vitória mínima

---

## 5. Paleta cromática geral

### Direção cromática

O fundo padrão não deve ser branco puro `#FFFFFF`. A base deve usar **tons de papel pigmentado**, com contraste forte para texto e áreas de escrita confortáveis.

### Paleta geral

| Token            | Hex         | Uso                                   | Racional                                                   | Observações de acessibilidade      |
| ---------------- | ----------- | ------------------------------------- | ---------------------------------------------------------- | ---------------------------------- |
| `paper.base`     | `#FAF7EF`   | Fundo principal do PDF                | Off-white quente, premium, menos agressivo que branco puro | Texto `#2B2836` tem contraste alto |
| `paper.cool`     | `#F6F4FA`   | Páginas com tom mais mental/reflexivo | Branco frio suavizado                                      | Bom para arquétipos frios/cósmicos |
| `paper.warm`     | `#F8F1E6`   | Páginas acolhedoras, emocional, pausa | Fundo quente e humano                                      | Evitar com textos âmbar claros     |
| `paper.green`    | `#F3F8F4`   | Revisão, manutenção, continuidade     | Fundo de estabilidade                                      | Bom para páginas semanais          |
| `surface.main`   | `#FFFDF7`   | Áreas de escrita e cards              | Quase papel, mas não branco puro                           | Usar em campos grandes             |
| `surface.muted`  | `#F1EBDD`   | Blocos de instrução                   | Diferencia sem gritar                                      | Bom para impressão                 |
| `text.primary`   | `#2B2836`   | Texto principal                       | Roxo-preto suave                                           | Contraste confortável              |
| `text.secondary` | `#4C4760`   | Texto secundário                      | Menos peso que primário                                    | Usar com parcimônia                |
| `text.tertiary`  | `#6F687D`   | Hints e labels                        | Apoio visual                                               | Não usar abaixo de 10pt            |
| `line.soft`      | `#D8D0C2`   | Linhas de escrita                     | Visível sem pesar                                          | Testar em impressão P&B            |
| `line.strong`    | `#9E9383`   | Bordas importantes                    | Estrutura                                                  | Usar em checkboxes e campos        |
| `focus.main`     | `#255E7E`   | Foco, ação principal                  | Azul petróleo maduro                                       | Não usar só por cor; incluir label |
| `capture.main`   | `#7B5EA7`   | Captura, ideias, inbox                | Roxo cognitivo                                             | Bom em títulos e selos             |
| `energy.main`    | `#9A3412`   | Energia, impulso, ação                | Laranja queimado                                           | Evitar áreas grandes               |
| `pause.main`     | `#4E6E68`   | Pausa, descanso, buffer               | Verde acinzentado                                          | Calmo e adulto                     |
| `reset.main`     | `#B42357`   | Reset e retomada                      | Magenta profundo                                           | Usar como destaque pontual         |
| `success.main`   | `#0F6B57`   | Feito, vitória mínima                 | Verde escuro                                               | Acessível em texto                 |
| `warning.gentle` | `#A15C1B`   | Alerta gentil                         | Âmbar queimado                                             | Nunca usar tom alarmista           |
| `shadow.soft`    | `#2B28361A` | Sombra leve                           | Profundidade sutil                                         | Em low-ink, substituir por borda   |

### Orientações de uso

* Use `paper.base` como padrão.
* Use `surface.main` para áreas de escrita.
* Use fundos pigmentados apenas para seções, não para todo o conteúdo.
* Não use `#FFFFFF` como fundo principal; se precisar de contraste máximo em impressão, use `#FFFDF7`.
* Não coloque texto longo sobre gradiente.
* Em tablet, blocos pigmentados podem ter um pouco mais de saturação.
* Em impressão, manter tintas suaves: preferir bordas e faixas a grandes massas coloridas.

---

## 6. Paletas por arquétipo

### Tabela geral

| Arquétipo         | Cor principal | Fundo suave | Destaque  | Símbolo | Forma dominante              | Sensação                 |
| ----------------- | ------------- | ----------- | --------- | ------- | ---------------------------- | ------------------------ |
| Nômade Quântico   | `#6D4BB2`     | `#F4F0FA`   | `#2F6F9F` | ∞       | Órbitas e trilhas            | Retorno ao agora         |
| Reator em Cadeia  | `#B63A32`     | `#FCF1EE`   | `#F0A33A` | ▲       | Barreiras e pulsos           | Energia com freio        |
| Vulcão Silencioso | `#9A4F16`     | `#FAF2E8`   | `#C24E35` | ◆       | Camadas e lava contida       | Acolhimento profundo     |
| Arquiteto do Caos | `#157A5B`     | `#EEF8F3`   | `#4A7CBA` | ⬡       | Grid e blocos                | Ideia ganhando andaime   |
| Furacão           | `#B42357`     | `#FCF0F6`   | `#EF7C45` | ✦       | Espirais controladas         | Intensidade simplificada |
| Camaleão Exausto  | `#167C8C`     | `#EEF8FA`   | `#6D7A99` | ◑       | Gradientes suaves e máscaras | Sustentabilidade         |
| Manutenção        | `#506B5A`     | `#F3F7F1`   | `#9B7A42` | ◌       | Linhas limpas e ciclos       | Prevenção leve           |

### O Nômade Quântico

* **Conceito visual:** mapa orbital de retorno.
* **Emoção:** “eu me localizo de novo”.
* **Textura:** pontos, órbitas, linhas tracejadas leves.
* **Capa:** símbolo ∞ grande, órbitas finas, sensação cósmica clara.
* **Miolo:** pequenos marcadores de localização: “você está aqui”, “voltar para agora”.
* **Evitar:** excesso de elementos flutuantes que aumentem dispersão.

### O Reator em Cadeia

* **Conceito visual:** energia canalizada por checkpoints.
* **Emoção:** “posso pausar antes de agir”.
* **Textura:** pulsos, triângulos, linhas de contenção.
* **Capa:** triângulo/reator central, energia contida por anéis.
* **Miolo:** speed bumps visuais antes de decisões.
* **Evitar:** vermelho agressivo, alertas punitivos, sensação de perigo.

### O Vulcão Silencioso

* **Conceito visual:** calor interno com superfície segura.
* **Emoção:** “o que sinto cabe na página”.
* **Textura:** camadas geológicas, linhas quentes suaves.
* **Capa:** losango ◆, profundidade de camadas, lava discreta.
* **Miolo:** check-in emocional, buffers, caixas “não hoje”.
* **Evitar:** cores muito intensas que aumentem sensação de alarme.

### O Arquiteto do Caos

* **Conceito visual:** andaime para ideias grandes.
* **Emoção:** “minha visão ganhou chão”.
* **Textura:** grid modular, blocos, linhas estruturais.
* **Capa:** hexágono ⬡, módulos conectados, construção.
* **Miolo:** blocos “visão”, “próximo tijolo”, “estacionamento de ideias”.
* **Evitar:** grid excessivamente rígido ou técnico demais.

### O Furacão

* **Conceito visual:** intensidade aterrissada no essencial.
* **Emoção:** “posso voltar para uma coisa só”.
* **Textura:** espiral ampla, centro claro, bordas energéticas.
* **Capa:** símbolo ✦ no centro da espiral controlada.
* **Miolo:** 1–3 prioridades absolutas, reset de 5 minutos.
* **Evitar:** muitos campos, muitos ícones, muitas cores competindo.

### O Camaleão Exausto

* **Conceito visual:** adaptação sem sobrecarga.
* **Emoção:** “posso fazer menos sem desaparecer”.
* **Textura:** transições suaves, meia-lua, sombras translúcidas.
* **Capa:** símbolo ◑, camadas suaves, contraste baixo-médio.
* **Miolo:** energia antes da lista, expectativa absorvida vs obrigação real.
* **Evitar:** visual de performance, metas agressivas, “alta produtividade”.

### Perfil de Manutenção / lowSeverity

* **Conceito visual:** manutenção preventiva.
* **Emoção:** “uso só o suficiente”.
* **Textura:** linhas limpas, círculos leves, checklist maduro.
* **Capa:** símbolo ◌, composição minimalista com calor.
* **Miolo:** ritual curto, atrito recorrente, revisão leve.
* **Evitar:** promessa visual de transformação intensa ou dramaticidade.

---

## 7. Tipografia

### Direção tipográfica

A tipografia deve ser humana, legível, contemporânea e não clínica.

### Proposta principal

* **Títulos:** `Atkinson Hyperlegible` ou `Lexend`
* **Corpo:** `Atkinson Hyperlegible`, `Inter` ou `Source Sans 3`
* **Labels e números:** `IBM Plex Sans` ou `Space Mono` apenas para pequenos marcadores
* **Alternativa open-source completa:** `Atkinson Hyperlegible + Source Sans 3`

Evitar fontes excessivamente decorativas no miolo. Em capa, uma fonte de título mais expressiva pode ser usada, desde que a legibilidade permaneça alta.

### Escala tipográfica

| Estilo            |    Tamanho |    Peso | Entrelinha | Uso                       |
| ----------------- | ---------: | ------: | ---------: | ------------------------- |
| Display capa      |    34–44pt | 700–800 |       1.05 | Nome do planner/arquétipo |
| Título de seção   |    22–28pt |     700 |       1.15 | Divisórias e aberturas    |
| Título de página  |    18–22pt |     700 |        1.2 | Cabeçalho da página       |
| Subtítulo         |    13–15pt |     600 |       1.35 | Contexto curto            |
| Corpo             |    11–12pt |     400 |  1.45–1.55 | Texto corrido             |
| Microcopy         | 9.5–10.5pt |     500 |        1.3 | Dicas e labels            |
| Label de campo    |   9.5–10pt |     600 |        1.2 | Nome de campo             |
| Números/data      |    10–12pt | 500–600 |        1.2 | Datas, contadores         |
| Frase de retomada |    12–14pt |     600 |       1.35 | Cards emocionais          |

Regra inegociável: **texto corrido nunca abaixo de 11pt**.

### Regras de legibilidade

* Linha de texto corrido: ideal entre 45 e 75 caracteres.
* Não justificar texto totalmente.
* Evitar parágrafos com mais de 4 linhas.
* Instruções devem ser quebradas em passos.
* Labels devem ficar perto dos campos.
* Usar negrito para guiar, não para gritar.

---

## 8. Grid, margens e estrutura de página

### Formato

* **Formato:** A4 vertical.
* **Dimensão:** 210 × 297 mm.
* **Sangria para capas:** 3 mm, se houver impressão profissional.
* **Miolo sem sangria:** seguro para impressão doméstica.

### Margens

| Área                   |               Medida recomendada |
| ---------------------- | -------------------------------: |
| Margem externa         |                         14–16 mm |
| Margem interna         |                         16–18 mm |
| Topo                   |                            14 mm |
| Rodapé                 |                         12–14 mm |
| Área segura de escrita | manter 8 mm longe da borda final |

### Grid

* Grid principal de **12 colunas** para páginas editoriais.
* Templates de preenchimento podem usar **4 colunas funcionais**.
* Gutter: 4 mm.
* Baseline: 4 mm ou 6 mm.
* Cards: raio de 4–6 mm.
* Checkboxes: mínimo 4.5–5 mm no impresso; 24 px equivalentes no tablet.

### Estrutura de página padrão

1. **Faixa de seção:** ritual, template ou arquétipo.
2. **Título curto:** objetivo da página.
3. **Micro-orientação:** até 2 frases.
4. **Ação principal:** card ou bloco destacado.
5. **Campos de escrita:** amplos e confortáveis.
6. **Retomada:** pequeno lembrete no rodapé ou lateral.
7. **Página e seção:** navegação discreta.

### Como evitar a página em branco assustadora

* Nunca abrir uma página apenas com linhas vazias.
* Sempre incluir uma micro-instrução.
* Usar exemplos fantasma em 10–15% de opacidade.
* Incluir “preencha só isso se estiver sem energia”.
* Dividir campos grandes em blocos menores.
* Dar uma primeira linha guiada: “comece com uma palavra”.

---

## 9. Componentes do Design System

| Componente               | Função                  | Onde usar            | Anatomia visual             | Regras                          | O que evitar                |
| ------------------------ | ----------------------- | -------------------- | --------------------------- | ------------------------------- | --------------------------- |
| Header de seção          | Localizar usuário       | Todas as páginas     | Faixa, ícone, nome da seção | Sempre no mesmo lugar           | Header decorativo demais    |
| Header por arquétipo     | Reforçar personalização | Variantes            | Cor do perfil + símbolo     | Discreto no miolo               | Parecer outro produto       |
| Card de instrução        | Explicar ação           | Páginas orientativas | Ícone + frase curta         | Máx. 2 frases                   | Parágrafos longos           |
| Card “comece aqui”       | Reduzir paralisia       | Início de rituais    | Destaque alto               | Uma ação clara                  | Várias ações juntas         |
| Card “versão mínima”     | Permitir baixa energia  | Diário, reset        | Fundo suave + checklist     | Deve caber em 1 minuto          | Tom de prêmio de consolação |
| Card “se travar”         | Reentrada               | Páginas densas       | Ícone ↩ + ação              | Sempre acionável                | Texto motivacional vazio    |
| Reset de 5 minutos       | Retomada                | Diário/Furacão       | Passos 1–5                  | Deve ser imprimível e repetível | Reset longo                 |
| Box de captura           | Descarregar mente       | Captura/banco        | Linhas soltas               | Sem prioridade inicial          | Misturar com execução       |
| Box de prioridade        | Foco                    | Diário/semanal       | 1–3 cards                   | Limite visual claro             | Lista infinita              |
| Box de energia           | Ajustar carga           | Diário/mensal        | Escala 1–5                  | Com legenda simples             | Energia como nota moral     |
| Box de humor             | Check-in emocional      | Vulcão/diário        | Palavras/escala             | Sem análise longa               | Linguagem clínica           |
| Box de compromisso       | Agenda                  | Semanal/diário       | Tabela leve                 | Próximas horas visíveis         | Calendário complexo         |
| Box de micro-ação        | Tirar do abstrato       | Arquiteto            | “próximo tijolo”            | Verbo físico                    | Tarefa vaga                 |
| Campo de escrita         | Resposta manual         | Todos                | Fundo confortável + linha   | Altura adequada                 | Linhas apertadas            |
| Checklist                | Decisão rápida          | Todos                | Checkbox grande + label     | 3–7 itens                       | 15 opções                   |
| Escala visual            | Energia/humor           | Diário/mensal        | 1–5 com labels              | Não depender só de cor          | Escala sem significado      |
| Barra de progresso       | Ciclo                   | Semanal/mensal       | Marcadores suaves           | Mostrar avanço sem cobrança     | Streak punitivo             |
| Trilha de retomada       | Voltar ao método        | Páginas-chave        | 3 passos visuais            | Sempre curta                    | Fluxo complexo              |
| Vitória mínima           | Recompensa              | Fechamento diário    | Selo ou mini-card           | Sem ranking                     | Competição                  |
| Selo checkpoint          | Marco                   | Semana/mês           | Selo discreto               | Opcional                        | Obrigatório demais          |
| Divisória de ritual      | Separar blocos          | Abertura             | Cor + forma                 | Alta clareza                    | Poluição                    |
| Ícone de ajuda           | Suporte                 | Microcopy            | ? / lâmpada                 | Sempre com texto                | Ícone sozinho               |
| Ícone de pausa           | Buffer                  | Vulcão/Camaleão      | ⏸                           | Sinal de redução                | Parecer erro                |
| Ícone de foco            | Prioridade              | Diário               | alvo simples                | Usar para prioridade            | Usar em tudo                |
| Ícone de revisão         | Revisão                 | Semanal/mensal       | ciclo/seta                  | Consistente                     | Ícones diferentes           |
| Alerta gentil            | Atenção sem medo        | Decisões             | âmbar queimado              | Sem vermelho agressivo          | Tom de emergência           |
| Elementos de gamificação | Interesse               | Templates            | selos, XP simbólico         | Opt-in e leve                   | Infantilização              |

---

## 10. Sistema de gamificação e dopamina

### Princípio

Gamificação no Planner TDAH deve gerar **micro-recompensa sem dívida**.

Não é sobre streak perfeito. É sobre mostrar que pequenas ações contam.

### Elementos propostos

| Elemento                | Como funciona                               | Onde aplicar            |
| ----------------------- | ------------------------------------------- | ----------------------- |
| XP simbólico            | Pequenos pontos opcionais por ações mínimas | Diário/semanal          |
| Vitória mínima          | Campo “o que ficou de pé hoje”              | Diário/Furacão/Camaleão |
| Checkpoint              | Marco visual após captura, revisão ou reset | Rituais                 |
| Missão do dia           | Uma ação principal, não lista inteira       | Diário                  |
| Missão semanal          | Um foco da semana                           | Semanal                 |
| Estado “mínimo feito”   | Checkbox diferente de “feito completo”      | Templates               |
| Estado “retomar depois” | Marca legítima para pendências              | Captura                 |
| Cartão de retomada      | 3 passos para voltar                        | Páginas-chave           |
| Barra de energia        | Visualiza carga disponível                  | Diário/mensal           |
| Colecionáveis discretos | Selos por ritual usado                      | Fechamento de ciclo     |

### Estados recomendados

* `✓ feito`
* `• mínimo feito`
* `↩ retomar depois`
* `⏸ pausar`
* `→ delegar`
* `○ incubar`
* `✕ soltar`

### O que não fazer

* Não usar ranking.
* Não criar sequência que zera.
* Não usar linguagem de “falha”.
* Não dar XP apenas por página completa.
* Não transformar o planner em jogo infantil.

---

## 11. Sistema de ilustração, ícones e metáforas visuais

### Estilo de ilustração

* Abstrato, editorial e geométrico-orgânico.
* Poucos detalhes.
* Traço limpo.
* Texturas suaves.
* Sem personagens obrigatórios.
* Metáforas visuais, não mascotes infantis.

### Metáforas centrais

| Conceito       | Metáfora visual                                 |
| -------------- | ----------------------------------------------- |
| Captura        | Rede, inbox, caixa aberta, funil suave          |
| Foco           | Alvo, feixe de luz, círculo central             |
| Energia        | Bateria orgânica, barra, termômetro não clínico |
| Retomada       | Trilha de volta, seta curva, portal pequeno     |
| Pausa          | Pedra lisa, meia-lua, intervalo                 |
| Reset          | Botão suave, círculo de reentrada               |
| Semana         | Ponte de sete blocos                            |
| Mês            | mapa de ciclos/lua                              |
| Ideias         | faíscas, sementes, post-its abstratos           |
| Prioridade     | estrela, pin, bloco central                     |
| Excesso mental | nuvem com fios soltos                           |
| Próximo passo  | pegada, tijolo, seta curta                      |

### Regras

* Ícone funcional sempre com label.
* Ilustração nunca deve competir com campo de escrita.
* Metáfora deve ser repetida para criar memória.
* Detalhe máximo em capas; detalhe mínimo no miolo.

---

## 12. Capas dos 7 PDFs

### Tabela comparativa

| Capa              | Conceito             | Composição                      | Elemento dominante | Aparência             |
| ----------------- | -------------------- | ------------------------------- | ------------------ | --------------------- |
| Nômade Quântico   | Retorno orbital      | Símbolo central + órbitas       | ∞                  | Cósmica e clara       |
| Reator em Cadeia  | Energia contida      | Triângulo + pulsos barrados     | ▲                  | Forte e controlada    |
| Vulcão Silencioso | Lava interna         | Camadas verticais/quentes       | ◆                  | Profunda e acolhedora |
| Arquiteto do Caos | Andaime visual       | Grid + blocos conectados        | ⬡                  | Estrutural e criativa |
| Furacão           | Centro no caos       | Espiral com centro limpo        | ✦                  | Intensa e simples     |
| Camaleão Exausto  | Adaptação suave      | Meia-lua + camadas translúcidas | ◑                  | Calma e madura        |
| Manutenção        | Estrutura suficiente | Ciclo limpo + linhas suaves     | ◌                  | Preventiva e leve     |

### Estrutura da capa

Cada capa deve conter:

* nome do produto;
* nome do arquétipo;
* símbolo;
* tagline;
* subtítulo curto;
* selo “PDF imprimível + uso digital”;
* marca Planner TDAH;
* textura/padrão do arquétipo.

### Taglines recomendadas

| Arquétipo         | Tagline                                                   |
| ----------------- | --------------------------------------------------------- |
| Nômade Quântico   | “Presente em todos os lugares. Em nenhum ao mesmo tempo.” |
| Reator em Cadeia  | “Energia infinita. Freio é opcional.”                     |
| Vulcão Silencioso | “Por fora: calma. Por dentro: lava.”                      |
| Arquiteto do Caos | “Mil ideias. Zero andaimes.”                              |
| Furacão           | “Tudo ao máximo. Sempre.”                                 |
| Camaleão Exausto  | “Parece que dá conta. Por dentro, é outra história.”      |
| Manutenção        | “Estrutura suficiente. Não perfeita.”                     |

As seis primeiras tags já aparecem nos dados canônicos dos arquétipos; a de manutenção deve manter promessa mais leve para não exagerar o resultado `lowSeverity`. 

---

## 13. Páginas base do planner

| Seção                | Objetivo da página       | Problema TDAH que resolve               | Estrutura visual recomendada                   | Componentes usados                 | Observações                                |
| -------------------- | ------------------------ | --------------------------------------- | ---------------------------------------------- | ---------------------------------- | ------------------------------------------ |
| Identificação        | Dar posse e intenção     | Planner impessoal vira objeto esquecido | Card de dados + palavra-guia + acordo de uso   | Campo, palavra-guia, acordo        | Deve parecer ritual de entrada             |
| Mapa rápido          | Mostrar terreno          | Perder-se no método                     | Mapa visual com 4 rituais                      | Trilha, ícones, cards              | Deve ser escaneável                        |
| Como usar            | Explicar método          | Confusão sobre uso                      | 4 blocos: captura, diário, semanal, mensal     | Cards de ritual                    | Pouco texto por bloco                      |
| Comece em 15 minutos | Criar primeiro movimento | Paralisia inicial                       | Timeline de 4 passos                           | Timer, checklist, começo           | Deve caber em uma leitura rápida           |
| Ritual de captura    | Tirar da cabeça          | Sobrecarga mental                       | Inbox grande + categorias leves                | Box captura, status                | Não pedir prioridade cedo                  |
| Ritual diário        | Escolher o dia possível  | Lista infinita                          | Energia → intenção → 1–3 prioridades → revisão | Energia, prioridade, versão mínima | Principal template do produto              |
| Ritual semanal       | Fechar ciclos            | Pendências invisíveis                   | Revisão + inbox + foco + 7 dias                | Checklist, mapa semanal            | Não virar auditoria dura                   |
| Ritual mensal        | Observar ciclo           | Metas rígidas demais                    | Temas + energia + blocos                       | Mapa de energia                    | Visual mais amplo e leve                   |
| Templates diários    | Uso repetido             | Manter rotina                           | Uma página por dia com campos previsíveis      | Template, revisão, captura         | Deve aceitar preenchimento parcial         |
| Templates semanais   | Planejar semana          | Perder visão de 7 dias                  | Foco + projetos + dias + revisão               | Mapa 7 dias                        | Evitar excesso de agenda                   |
| Templates mensais    | Ciclos maiores           | Falta de perspectiva                    | Calendário + temas + reflexão                  | Calendário leve                    | Não lotar                                  |
| Banco de capturas    | Descarregar pendências   | Memória sobrecarregada                  | Lista numerada ampla                           | Inbox, status                      | 60 linhas podem ser úteis se bem espaçadas |
| Fechamento           | Encerrar sem culpa       | Abandono/culpa                          | Rastro + como continuar                        | Vitória, retomada                  | Remover/definir placeholder de QR          |

---

## 14. Páginas variantes por arquétipo

### Estrutura comum das variantes

Cada conjunto deve ter:

1. **Boas-vindas:** reconhecimento emocional + “como começar hoje”.
2. **Ajustes do ritual diário:** regras práticas.
3. **Insights e atalhos:** lista curta de 6 atalhos + frase de retomada.

Isso respeita a estrutura atual dos arquivos variantes. 

### Aplicação por arquétipo

| Arquétipo  | Como a página deve se sentir | Foco visual            | Componentes principais                             |
| ---------- | ---------------------------- | ---------------------- | -------------------------------------------------- |
| Nômade     | “me achei de novo”           | Âncora visual e trilha | Gatilho visual, “voltar para agora”, agenda 6h     |
| Reator     | “pausei antes de prometer”   | Speed bump             | Pergunta de freio, 24h, checkpoint                 |
| Vulcão     | “posso diminuir o dia”       | Check-in emocional     | Humor, versão mínima/média/completa, buffer        |
| Arquiteto  | “minha ideia virou tijolo”   | Andaime                | Visão, micro-ação, estacionamento                  |
| Furacão    | “voltei ao essencial”        | Prioridade absoluta    | 1–3 prioridades, reset, descarte temporário        |
| Camaleão   | “não preciso compensar”      | Energia sustentável    | Energia antes da lista, obrigação vs expectativa   |
| Manutenção | “uso só o necessário”        | Rotina leve            | Ritual curto, atrito recorrente, checklist semanal |

### Como evitar personalização apenas estética

Cada variante deve ter pelo menos um componente exclusivo ou adaptado:

* Nômade: **âncora visual do dia**.
* Reator: **quadro de freio antes do sim**.
* Vulcão: **versão emocional do dia**.
* Arquiteto: **próximo tijolo**.
* Furacão: **filtro essencial hoje**.
* Camaleão: **obrigação real vs expectativa absorvida**.
* Manutenção: **modo curto como padrão**.

---

## 15. Diretrizes específicas para escrita manual

| Elemento               | Regra                                      |
| ---------------------- | ------------------------------------------ |
| Altura mínima de linha | 7–8 mm para escrita manual confortável     |
| Campo curto            | 8–10 mm de altura                          |
| Campo médio            | 18–28 mm                                   |
| Campo livre            | 35–55 mm                                   |
| Checkbox impresso      | 4.5–5 mm                                   |
| Checkbox tablet        | equivalente a 24 px ou mais                |
| Espaço entre campos    | mínimo 4 mm                                |
| Área de rabisco        | sem linhas muito próximas                  |
| Campos digitais        | evitar linhas finas demais                 |
| Caneta física          | contraste de linha suficiente              |
| Impressão P&B          | todos os estados precisam de símbolo/texto |
| Escrita grande         | prever ao menos alguns campos amplos       |
| Escrita pequena        | permitir subdivisão com linhas leves       |

### Regras práticas

* Linhas de escrita em `line.soft`.
* Bordas de campos em `line.strong` quando o campo for funcionalmente importante.
* Não usar textura dentro de campos.
* Campos de captura devem ser mais livres que campos de prioridade.
* Prioridades devem ter menos linhas, mais destaque.
* Revisões devem ter campos curtos para evitar redação longa.

---

## 16. Acessibilidade e conforto visual

### Critérios

* Texto normal com contraste mínimo 4.5:1.
* Texto grande com mínimo 3:1.
* Elementos gráficos importantes com mínimo 3:1.
* Não depender apenas de cor: usar ícone, label ou padrão.
* Títulos claros e consistentes.
* Texto corrido mínimo 11pt.
* Campos de escrita visíveis em P&B.
* Textura nunca atrás de texto longo.
* Evitar fundos vibrantes em páginas de preenchimento.
* Evitar microcopy em cinza claro demais.
* Evitar blocos longos.
* Evitar justificação total.

### Por que não usar `#FFFFFF` como fundo padrão

O branco puro pode criar sensação de página clínica, fria e muito luminosa, especialmente em tablet com brilho alto. Também aumenta a sensação de “página vazia”, que pode intimidar quem já tem dificuldade para iniciar. A solução proposta usa `#FAF7EF` e variações de papel pigmentado para preservar contraste e reduzir agressividade visual.

Isso não significa reduzir legibilidade. Pelo contrário: o texto primário `#2B2836` sobre `#FAF7EF` mantém contraste alto, e os campos de escrita usam superfícies muito claras sem chegar ao branco puro.

### Como testar

* Exportar 3 páginas de alta densidade e 3 de baixa densidade.
* Testar impressão em modo econômico.
* Testar em tablet com brilho 40%, 70% e modo noturno desligado.
* Validar contraste com ferramenta WCAG.
* Fazer teste de 5 segundos: “o que esta página quer que você faça?”

---

## 17. Consistência com o quiz e o funil

### O que preservar do quiz

* A linguagem de arquétipos.
* Símbolos.
* Sensação de mapeamento personalizado.
* Microvalidação e acolhimento.
* Ideia de progresso e recompensa.
* Cores-base dos arquétipos, ajustadas para impressão.

O quiz atual usa arquétipos com símbolos, cores, CTAs e bridges específicas, além de disclaimers não clínicos e lógica `lowSeverity`. 

### O que evoluir no PDF

* O quiz pode ser mais digital, escuro e animado.
* O PDF deve ser claro, imprimível e escrevível.
* As cores do quiz devem virar **versões editoriais pigmentadas**, não ser copiadas com saturação total.
* A gamificação do quiz deve virar microvitórias e checkpoints, não animação.

### Sensação esperada

Depois do quiz, o usuário deve sentir:

> “O resultado que apareceu na tela virou uma ferramenta concreta para o meu dia.”

---

## 18. Regras de densidade visual

| Tipo de página       | Densidade recomendada | Cor           | Ilustração | Caixas         | Observação                 |
| -------------------- | --------------------- | ------------- | ---------- | -------------- | -------------------------- |
| Capa                 | Alta controlada       | Alta          | Alta       | Baixa          | Impacto premium            |
| Divisória            | Média-alta            | Média         | Média      | Baixa          | Marcar transição           |
| Instrucional         | Média                 | Média         | Baixa      | Média          | Escaneável                 |
| Preenchimento diário | Baixa-média           | Baixa         | Mínima     | Alta funcional | Escrita manda              |
| Captura              | Baixa                 | Baixa         | Mínima     | Baixa          | Espaço livre               |
| Reset                | Baixa                 | Suave         | Baixa      | Média          | Calma                      |
| Revisão              | Média                 | Suave         | Baixa      | Média          | Orientar sem cobrar        |
| Variante             | Média                 | Cor do perfil | Média      | Média          | Personalização perceptível |
| Fechamento           | Média-baixa           | Suave         | Baixa      | Baixa          | Reconhecimento             |

### Regras

* Mais cor em capa, divisória e variante.
* Menos cor em campos de escrita.
* Mais caixas quando a decisão precisa ser guiada.
* Menos caixas quando a pessoa precisa descarregar.
* Mais ilustração em abertura.
* Menos ilustração em templates reutilizáveis.

---

## 19. Regras de tom visual e microcopy

### Direção

A microcopy deve ser curta, humana, acolhedora e prática. Não deve soar clínica, infantil, motivacional genérica ou moralizante.

### Exemplos

| Situação        | Microcopy recomendada                               |
| --------------- | --------------------------------------------------- |
| Começar         | “Comece por uma linha.”                             |
| Retomar         | “Volte pela próxima página. Não precisa compensar.” |
| Pausar          | “Pausa também é ajuste.”                            |
| Prioridade      | “Se só uma coisa ficar de pé, qual é?”              |
| Versão mínima   | “A menor versão ainda conta.”                       |
| Reset           | “Circule uma ação. Mova o resto.”                   |
| Captura         | “Tire da cabeça. Decida depois.”                    |
| Ideia nova      | “Ideia entra no estacionamento, não no volante.”    |
| Revisão semanal | “O que ainda importa?”                              |
| Fechar o dia    | “O que ficou de pé hoje?”                           |
| Evitar culpa    | “Página em branco não é dívida.”                    |
| Energia baixa   | “Planeje pelo que existe hoje.”                     |
| Distração       | “Onde estou? O que vinha agora?”                    |
| Freio           | “Antes do sim: o que sai?”                          |

---

## 20. Diretrizes de implementação para o designer

### Montagem do arquivo

* Criar arquivo principal em A4.
* Separar páginas-mestre:

  * `MASTER_BASE`
  * `MASTER_RITUAL`
  * `MASTER_TEMPLATE`
  * `MASTER_VARIANT`
  * `MASTER_COVER`
  * `MASTER_LOW_INK`
* Criar estilos globais:

  * títulos;
  * corpo;
  * microcopy;
  * labels;
  * campos;
  * tabelas;
  * selos;
  * cards.

### Organização de componentes

Nomear componentes assim:

* `COMP/Card_ComeceAqui`
* `COMP/Card_Reset5Min`
* `COMP/Box_Captura`
* `COMP/Box_Prioridade`
* `COMP/Scale_Energia`
* `COMP/Header_Arquétipo`
* `COMP/Selo_Checkpoint`

### Variações por arquétipo

Criar biblioteca:

* `THEME_Nomade`
* `THEME_Reator`
* `THEME_Vulcao`
* `THEME_Arquiteto`
* `THEME_Furacao`
* `THEME_Camaleao`
* `THEME_Manutencao`

### Exportação PDF

* PDF para impressão: CMYK ou perfil adequado, imagens 300 dpi, fontes incorporadas.
* PDF para tablet: RGB, peso otimizado, links internos se houver.
* Exportar também versão low-ink se possível.
* Testar em:

  * impressão caseira P&B;
  * impressão colorida econômica;
  * Goodnotes/Notability/OneNote;
  * tablet 10–13 polegadas.

### Validações

* Teste de contraste.
* Teste de leitura em 5 segundos.
* Teste de preenchimento com caneta.
* Teste de impressão sem corte.
* Teste de páginas densas.
* Teste de páginas de baixa energia.

---

## 21. Critérios de aceite

| Critério      | Aceite                                            |
| ------------- | ------------------------------------------------- |
| PDF A4        | Imprime sem corte em impressora doméstica         |
| Fundo         | Fundo principal diferente de `#FFFFFF`            |
| Texto         | Corpo mínimo 11pt                                 |
| Contraste     | Texto normal ≥ 4.5:1; gráficos funcionais ≥ 3:1   |
| Tablet        | Legível em app de anotação sem zoom obrigatório   |
| Campos        | Escrita manual confortável                        |
| Capas         | 7 capas distintas e pertencentes à mesma marca    |
| Miolo         | Consistente entre todas as versões                |
| Variante      | Diferença perceptível além da cor                 |
| Arquétipos    | Cada perfil tem lógica visual própria             |
| Página        | Usuário entende ação principal em poucos segundos |
| Retomada      | Há mecanismos sem culpa                           |
| Cor           | Não depende só de cor para comunicar estado       |
| Visual        | Não parece clínico, infantil ou genérico          |
| Decoração     | Todo elemento visual tem função                   |
| Impressão P&B | Continua utilizável                               |
| Low-ink       | Grandes massas de cor evitadas no miolo           |

---

## 22. Checklist final de QA

### Acessibilidade

* [ ] Contraste de texto validado.
* [ ] Campos visíveis em P&B.
* [ ] Ícones com labels.
* [ ] Nenhuma informação depende só de cor.
* [ ] Texto corrido mínimo 11pt.
* [ ] Hierarquia clara.

### TDAH e carga cognitiva

* [ ] Cada página tem um foco principal.
* [ ] Há um próximo passo visível.
* [ ] Instruções são curtas.
* [ ] Listas longas foram agrupadas.
* [ ] A página não exige memória do método.
* [ ] Existe versão mínima onde necessário.

### Impressão

* [ ] Margens seguras.
* [ ] Sem elementos cortados.
* [ ] Linhas aparecem em modo econômico.
* [ ] Campos têm espaço suficiente.
* [ ] Cores não viram lama em P&B.

### Tablet

* [ ] Escrita com Apple Pencil/S Pen confortável.
* [ ] Campos não são pequenos demais.
* [ ] Contraste confortável com brilho médio.
* [ ] PDF não fica pesado demais.
* [ ] Links internos, se houver, funcionam.

### Arquétipos

* [ ] Capa distinta.
* [ ] Header variante distinto.
* [ ] Componentes específicos por perfil.
* [ ] Microcopy coerente.
* [ ] Não há exagero em `lowSeverity`.

### Consistência visual

* [ ] Mesmos tokens.
* [ ] Mesmos estilos.
* [ ] Mesmos ícones para mesmas funções.
* [ ] Tabelas e cards seguem anatomia comum.
* [ ] Numeração e seções consistentes.

### Microcopy

* [ ] Curta.
* [ ] Não clínica.
* [ ] Não moralizante.
* [ ] Não infantil.
* [ ] Acionável.
* [ ] Sem promessa de cura/tratamento.

### Gamificação

* [ ] Recompensa sem cobrança.
* [ ] Sem streak punitivo.
* [ ] “Mínimo feito” conta.
* [ ] Reset é legítimo.
* [ ] Selos não infantilizam.

### Produto comercial

* [ ] Parece premium.
* [ ] Parece feito para TDAH desde a origem.
* [ ] Não parece planner genérico adaptado.
* [ ] Entrega visualmente a promessa.
* [ ] Está pronto para compor produto vendável.

---

## 23. Resumo executivo final

A essência visual do Planner TDAH deve ser uma combinação de **estrutura externa, acolhimento e estímulo controlado**.

O Design System proposto — **Sistema Aurora de Retomada** — transforma o planner em uma ferramenta que mostra o caminho sem exigir leitura longa, acolhe pausas sem gerar culpa e usa cor, forma, cards, microcopy e rituais visuais para reduzir carga cognitiva.

As decisões inegociáveis são:

* não usar `#FFFFFF` como fundo principal;
* manter texto corrido com no mínimo 11pt;
* garantir contraste acessível;
* sempre ter próximo passo visível;
* separar captura de execução;
* oferecer versão mínima e reset;
* não depender apenas de cor;
* não infantilizar;
* não parecer clínico;
* não prometer cura, tratamento ou resultado garantido;
* fazer a personalização por arquétipo alterar a experiência de uso, não apenas a aparência.

O refinamento futuro pode incluir versões digitais interativas, componentes animados, links internos no PDF, versão dark opcional para tablet e kits visuais para landing, quiz, bônus e materiais de venda. Mas a v1 do PDF deve priorizar o essencial: **fazer a pessoa abrir, entender, preencher um pouco e conseguir voltar depois sem medo de ter falhado.** 🌿

[1]: https://www.w3.org/TR/WCAG22/ "Web Content Accessibility Guidelines (WCAG) 2.2"
[2]: https://www.w3.org/TR/coga-usable/ "Making Content Usable for People with Cognitive and Learning Disabilities"
[3]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html "Understanding Success Criterion 1.4.3: Contrast (Minimum) | WAI | W3C"
[4]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html "Understanding Success Criterion 2.5.8: Target Size (Minimum) | WAI | W3C"
[5]: https://design-system.service.gov.uk/styles/colour/ "Colour – GOV.UK Design System"
[6]: https://arxiv.org/abs/2507.13309?utm_source=chatgpt.com "FocusView: Understanding and Customizing Informational Video Watching Experiences for Viewers with ADHD"
[7]: https://arxiv.org/abs/2302.00707?utm_source=chatgpt.com "Why Combining Text and Visualization Could Improve Bayesian Reasoning: A Cognitive Load Perspective"
