# Relatorio de Auditoria - Quiz TDAH v1

Data da auditoria: 2026-05-04  
Escopo analisado: `quiz/quiz-tdah-especificacao-completa.md`, `quiz/quiz-tdah-v1.jsx`, `quiz/plano-revisor.md`, skill `tdah-ux-audit`.

Observacao metodologica: o projeto nao possui script `dev`/`start` no `package.json`. A auditoria navegada foi feita com Playwright MCP em um harness temporario que renderiza o JSX; o `RadarChart` foi stubado apenas no harness porque `recharts` nao esta instalado localmente. As conclusoes sobre scoring, CTA, estado, acessibilidade e layout foram validadas pelo codigo e pela navegacao; o visual real do radar ainda precisa ser checado em um build com `recharts`.

## 1. Resumo executivo

O Quiz TDAH v1 ja implementa o fluxo principal de landing, 15 perguntas, tres marcos, processamento, resultado por arquetipo, radar e CTA textual. Os caminhos obrigatorios por arquetipo passaram em 6/6 simulacoes, e a jornada Furacao foi navegada ate resultado em Playwright.

O produto ainda nao esta pronto para lancamento como funil de vendas. Os bloqueadores sao: CTA final sem acao real nem tracking, analytics completamente ausente, acessibilidade por teclado quebrada nas opcoes, ausencia de disclaimer nao-diagnostico, XP diferente do escopo e casos extremos N/N/N/N/N classificados como Nômade Quântico sem tratamento de baixa severidade. Esses pontos afetam conversao, confianca e inclusao.

Principais evidencias navegadas:

- `landing-320.png`, `landing-390-resized.png`, `landing-768.png`, `landing-desktop.png`.
- `q1-320.png`.
- `result-furacao-390.png`.
- Axe-core em Q1: `color-contrast` serious, `landmark-one-main`, `page-has-heading-one`, `region`.
- Teclado: landing recebe foco no botao inicial; apos iniciar, Tab cai no `BODY` e Enter nao seleciona resposta.
- Reduced motion: `matchMedia('(prefers-reduced-motion: reduce)')` verdadeiro, mas sem regra `prefers-reduced-motion` no CSS e 13 ocorrencias de `animation`.

## 2. Nota geral por categoria

| Categoria | Nota | Leitura |
|---|---:|---|
| Aderencia ao escopo | 6/10 | Fluxo macro existe, mas XP, analytics, CTA, disclaimers, teasers, progresso e Marco 2 divergem. |
| UX TDAH / dopamina | 7/10 | Boa recompensa visual e ritmo; perde pontos por progresso 0% na Q1, espera obrigatoria e excesso de movimento sem reducao. |
| Conteudo/copy | 7/10 | Tom majoritariamente empatico; ha termos clinicos fortes, opcoes longas e falta de seguranca nao-diagnostica. |
| Marketing/conversao | 4/10 | Resultado gera identificacao, mas ponte de venda esta curta, sem prova social, sem friccao reduzida e sem CTA funcional. |
| Scoring/arquetipos | 7/10 | Caminhos esperados corretos; extremos e empates precisam regra explicita e copy adaptada. |
| Acessibilidade | 3/10 | Opcoes sao `div`, sem radio/button, sem teclado, sem ARIA live, contraste reprovado. |
| Mobile-first | 7/10 | 320px funciona sem corte critico; fonte/opcoes ficam densas e exigem scroll cedo. |
| Analytics/otimizacao | 0/10 | Nenhum evento obrigatorio foi encontrado. |

## 3. Mapa do fluxo real

1. `Landing`: headline, subtitulo, contadores, CTA inicial e prova social numerica.
2. `Quiz`: Q1-Q5 com header de XP, progresso, barra e 15 pontos.
3. `Marco 1`: card "Traco detectado", confetti, +25 XP.
4. `Quiz`: Q6-Q10.
5. `Marco 2`: card "Perfil em formacao", barras parciais D/H/I e A/E bloqueadas.
6. `Quiz`: Q11-Q15.
7. `Marco 3`: card "Quiz completo", confetti, +25 XP visual/codigo, transicao automatica apos 2,4s.
8. `Processamento`: quatro mensagens em ~4,6s.
9. `Resultado`: arquetipo, radar, reconhecimento, custo, ponte curta e CTA textual.
10. `Refazer`: botao secundario volta para landing.

Componentes React mapeados: `Landing`, `Header`, `QuestionCard`, `MilestoneCard`, `Processing`, `Result`, `App`.  
Estados centrais: `scr`, `qi`, `sel`, `showV`, `showN`, `mile`, `xp`, `scores`, `arc`, `ansRef`.  
Scoring: `calcScores` soma pontuacoes primarias/secundarias; `sev` converte N/M/S; `findArc` escolhe maior similaridade.

## 4. Matriz escopo vs implementacao

| Item do escopo | Status | Evidencia | Severidade |
|---|---|---|---|
| 15 perguntas, 4 opcoes | Implementado | `Q` em `quiz-tdah-v1.jsx:42`; script detectou 15 perguntas e 60 opcoes. | OK |
| Marcos apos Q5/Q10/Q15 | Implementado | `isMile=[4,9,14]`, `quiz-tdah-v1.jsx:477-486`. | OK |
| XP +10, +5 velocidade, +25/+25/+50, max 300 | Parcial | Escopo `:182-187`; codigo `setXp(x=>x+10+(isMile?25:0))` em `quiz-tdah-v1.jsx:479`. | P1 |
| Progresso "Pergunta X de 15" + porcentagem | Parcial | `pct=Math.round((qi/15)*100)`, Q1 mostra 0% em `q1-320.png`; escopo exemplo usa pergunta atual. | P2 |
| Microvalidacao apos resposta | Implementado parcial | Aparece imediatamente e botao apos 900ms, `quiz-tdah-v1.jsx:457-461`; escopo pede delay de 0,5s + botao apos 1s da validacao. | P2 |
| Teasers Q3/Q7/Q9/Q12/Q14 | Ausente | Nenhum estado/copy correspondente; escopo `:301-310`. | P2 |
| Processamento 4-5s | Implementado | `msgs.length*1050+400`, `quiz-tdah-v1.jsx:338-339`. | OK |
| Resultado com arquetipo, radar, reconhecimento, custo, ponte | Implementado parcial | `Result` em `quiz-tdah-v1.jsx:364-435`; ponte curta e sem elementos de friccao. | P1 |
| CTA final funcional e rastreado | Ausente | Botao sem `onClick`/`href`, `quiz-tdah-v1.jsx:431-433`. | P0 |
| Analytics obrigatorios | Ausente | Script `extract-quiz-content.js` retornou todos os eventos como ausentes; escopo `:1355-1361`. | P0 |
| Acessibilidade teclado/radio/ARIA | Ausente parcial | Opcoes sao `div` clicaveis, `quiz-tdah-v1.jsx:251`; teste de teclado falha. | P0 |
| Reduced motion | Ausente | CSS tem animacoes, sem `prefers-reduced-motion`; escopo `:1347`. | P1 |

## 5. Simulacoes por persona

| Persona | Caminho/teste | Resultado observado | Friccoes | Risco |
|---|---|---|---|---|
| Desatento impaciente | Q1 320px | Proposta clara; Q1 densa, progresso 0%. | Pode interpretar "0%" como pouco avanco mesmo ja estando na pergunta. | Medio |
| Hiperativo/explorador | Tudo A rapido | Sem bonus de velocidade; delay fixo ate "Proxima". | Recompensa prometida pelo escopo nao existe. | Alto |
| Emocional/RSD | Caminho emocional A/B | Copy acolhe, mas usa RSD/Disforia e linguagem clinica sem disclaimer. | Pode aumentar vulnerabilidade ou parecer laudo. | Alto |
| Mascaramento/burnout | `BDBBBBDACCBDCDC` | Script gera Camaleao Exausto corretamente. | Resultado fala "diagnosticado tarde" sem camada de cuidado. | Medio |
| Criativo caotico | `BAABDBCAADADCBB` | Script gera Arquiteto corretamente. | Ponte explica o planner, mas nao mostra features, prova ou proximo passo real. | Alto |
| Cetico antes da compra | Tudo C | Classifica como Nômade Quântico mesmo N/N/N/N/N. | Incoerencia reduz confianca no quiz. | Alto |
| Mobile ansioso | 320px | Sem overflow critico; opcoes ocupam muito espaco e exigem scroll apos validacao. | Abandono se nao perceber botao abaixo. | Medio |
| Teclado | Tab + Enter | CTA inicial funciona; opcoes nao recebem foco e Enter nao seleciona. | Bloqueia fluxo sem mouse/toque. | P0 |
| Reduced motion | Emulacao reduce | Preferencia ativa, mas animacoes continuam. | Desconforto, fadiga ou abandono. | Alto |

## 6. Achados priorizados P0/P1/P2/P3

### AUD-001 - CTA final nao compra, nao navega e nao rastreia

- Severidade: P0.
- Tela/etapa: Resultado / CTA.
- Evidencia: botao final sem `onClick`, `href` ou handler em `quiz-tdah-v1.jsx:431-433`; escopo exige CTA direto e eventos `cta_clicked` em `quiz-tdah-especificacao-completa.md:1360`.
- Impacto para pessoas com TDAH: a motivacao gerada pelo resultado se perde no momento de maior impulso de acao.
- Impacto na conversao: bloqueia a monetizacao do funil; clique nao leva para compra nem pode ser medido.
- Recomendacao: transformar o CTA em link/botao funcional para pagina de venda, com `cta_clicked` antes da navegacao e payload `{ archetypeId, ctaPosition, xpEarned, totalTimeMs }`.
- Criterio de aceite: clicar no CTA abre o destino correto do planner do arquetipo e dispara tracking validavel no console/devtools ou camada de analytics.
- Referencia: `quiz/quiz-tdah-v1.jsx:431-433`; spec `quiz/quiz-tdah-especificacao-completa.md:1355-1361`.

### AUD-002 - Analytics obrigatorios estao totalmente ausentes

- Severidade: P0.
- Tela/etapa: Fluxo inteiro.
- Evidencia: script `extract-quiz-content.js` reportou ausencia de `quiz_started`, `question_answered`, `milestone_reached`, `quiz_completed`, `result_viewed`, `cta_clicked`, `quiz_abandoned`; nao ha `track`, `gtag`, `posthog` ou eventos no JSX.
- Impacto para pessoas com TDAH: sem dados de abandono por pergunta, nao sera possivel descobrir onde a jornada perde atencao.
- Impacto na conversao: impede otimizar drop-off, CTA, tempo de resultado e taxa de compra.
- Recomendacao: criar helper `trackQuizEvent(name, payload)`, emitir todos os eventos do escopo e incluir tempos por pergunta, UTM/source, arquetipo e XP.
- Criterio de aceite: cada evento aparece uma vez por acao esperada com payload definido no escopo; abandono e unload sao tratados sem duplicidade.
- Referencia: `quiz/quiz-tdah-especificacao-completa.md:1355-1361`; estados em `quiz/quiz-tdah-v1.jsx:442-455`.

### AUD-003 - Opcoes nao sao acessiveis por teclado nem por semantica de formulario

- Severidade: P0.
- Tela/etapa: Q1-Q15.
- Evidencia: opcoes renderizadas como `div` com `onClick` em `quiz-tdah-v1.jsx:251`; snapshot mostra elementos `generic` clicaveis; teste Tab+Enter caiu no `BODY` e nao selecionou resposta.
- Impacto para pessoas com TDAH: usuarios que usam teclado por preferencia, ansiedade, mobilidade ou velocidade ficam bloqueados.
- Impacto na conversao: queda de conclusao em desktop/acessibilidade e risco legal/WCAG.
- Recomendacao: usar `fieldset` + `legend` + `input type="radio"` visualmente customizado ou `button` com `role="radio"`, `aria-checked`, `tabIndex`, setas e Enter/Espaco.
- Criterio de aceite: usuario completa o quiz inteiro com Tab/setas/Espaco/Enter; foco visivel em cada opcao.
- Referencia: `quiz/quiz-tdah-v1.jsx:247-257`.

### AUD-004 - Falta disclaimer nao-diagnostico em landing/resultado

- Severidade: P0.
- Tela/etapa: Landing, Processamento, Resultado.
- Evidencia: resultado usa `PERFIL ETDAH-AD` em `quiz-tdah-v1.jsx:396`; copy usa RSD, "funcoes executivas", "neurologico" e "diagnosticado tarde" sem aviso de que e mapeamento de perfil, nao diagnostico.
- Impacto para pessoas com TDAH: aumenta risco de ansiedade, leitura como laudo e tomada de decisao sem orientacao profissional.
- Impacto na conversao: reduz confianca de usuarios ceticos e aumenta risco etico/clinico.
- Recomendacao: incluir aviso curto na landing e resultado: "Este quiz mapeia padroes de perfil e nao substitui avaliacao profissional." Ajustar `PERFIL ETDAH-AD` para linguagem menos clinica.
- Criterio de aceite: disclaimer visivel antes do inicio e no resultado, sem competir com CTA; copy evita diagnostico definitivo.
- Referencia: `quiz/quiz-tdah-v1.jsx:57`, `quiz-tdah-v1.jsx:120`, `quiz-tdah-v1.jsx:396`.

### AUD-005 - XP diverge da regra especificada e reduz recompensa prometida

- Severidade: P1.
- Tela/etapa: Q1-Q15, Marcos.
- Evidencia: escopo define +5 velocidade e +50 no Marco 3 (`quiz-tdah-especificacao-completa.md:182-187`); codigo soma `+10+(isMile?25:0)` para todo marco (`quiz-tdah-v1.jsx:477-480`).
- Impacto para pessoas com TDAH: perde reforco de velocidade e a celebracao final fica matematicamente menor.
- Impacto na conversao: menos sensacao de conquista antes do resultado e menor engajamento para usuarios rapidos.
- Recomendacao: registrar tempo por pergunta, aplicar +5 se resposta <5s, Marco 3 +50 e exibir total maximo coerente.
- Criterio de aceite: tudo rapido chega a 300 XP; tudo lento sem bonus chega a 225 XP; Marco 3 mostra +50.
- Referencia: `quiz/quiz-tdah-v1.jsx:477-480`.

### AUD-006 - Baixa severidade N/N/N/N/N cai em Nômade Quântico

- Severidade: P1.
- Tela/etapa: Resultado / Scoring.
- Evidencia: script `score-archetype-paths.js`: Tudo C e Tudo D geram D=N H=N I=N A=N E=N e arquetipo "O Nômade Quântico" por similaridade 7/10.
- Impacto para pessoas com TDAH: usuario cetico ou com poucos tracos recebe perfil que nao corresponde ao padrao declarado.
- Impacto na conversao: quebra confianca no algoritmo e reduz credibilidade do planner.
- Recomendacao: definir tratamento para "perfil leve/baixo indicio" ou tie-break com baixa severidade; evitar vender arquetipo intenso quando todos os scores sao baixos.
- Criterio de aceite: Tudo D e Tudo C exibem resultado honesto, com linguagem de baixa severidade e recomendacao proporcional.
- Referencia: `quiz/quiz-tdah-v1.jsx:137-149`.

### AUD-007 - Marco 2 apresenta D/H/I como se estivessem completos, mas ainda faltam Q11-Q13

- Severidade: P1.
- Tela/etapa: Marco 2.
- Evidencia: escopo diz D/H/I "ja completamente avaliadas" em `quiz-tdah-especificacao-completa.md:286-289`; distribuicao real ainda tem D=Q11, H=Q12, I=Q13; implementacao mostra D/H/I com denominador `/9` em `quiz-tdah-v1.jsx:298-307`.
- Impacto para pessoas com TDAH: feedback parcial pode parecer preciso demais e depois mudar, gerando confusao.
- Impacto na conversao: reduz confianca se o resultado final contrariar o preview.
- Recomendacao: ou mudar ordem das perguntas para completar D/H/I ate Q10, ou apresentar Marco 2 como "amostra parcial" com denominador real de perguntas respondidas e copy de previsao.
- Criterio de aceite: Marco 2 nunca afirma dimensoes completas sem terem sido medidas; labels dizem "parcial".
- Referencia: `quiz/quiz-tdah-v1.jsx:296-320`.

### AUD-008 - Resultado/CTA nao inclui reducao de friccao, prova social ou objecoes

- Severidade: P1.
- Tela/etapa: Resultado / Ponte de venda.
- Evidencia: `Result` tem apenas ponte curta e CTA, `quiz-tdah-v1.jsx:428-433`; escopo exige garantias, entrega digital, compatibilidade e prova social em `quiz-tdah-especificacao-completa.md:1198-1226`.
- Impacto para pessoas com TDAH: sem garantias claras, o usuario precisa fazer trabalho cognitivo extra antes de comprar.
- Impacto na conversao: objeções basicas ficam sem resposta no ponto de decisao.
- Recomendacao: adicionar bloco compacto abaixo do CTA com quatro bullets do escopo, prova social real/placeholder marcado e link secundario para detalhes.
- Criterio de aceite: resultado responde entrega, garantia, uso mobile/desktop e origem do produto antes ou logo abaixo do CTA.
- Referencia: `quiz/quiz-tdah-v1.jsx:428-433`.

### AUD-009 - Reduced motion ignorado

- Severidade: P1.
- Tela/etapa: Landing, Quiz, Marcos, Processamento, Resultado.
- Evidencia: CSS define shimmer, confetti, slide, pulse, spin e orb; nao ha `@media (prefers-reduced-motion: reduce)`. Emulacao reduce retornou `hasReducedRule=false` e 13 regras de animacao.
- Impacto para pessoas com TDAH: usuarios sensiveis a movimento podem sentir fadiga, irritacao ou desconforto.
- Impacto na conversao: aumenta abandono em mobile e em usuarios ansiosos/sensiveis.
- Recomendacao: adicionar media query global desativando confetti, shimmer, pulse, orb e reduzindo transicoes a opacidade curta.
- Criterio de aceite: com reduced-motion, nao ha animacoes continuas nem confetti; fluxo permanece claro.
- Referencia: `quiz/quiz-tdah-v1.jsx:30`, `quiz-tdah-v1.jsx:166`, `quiz-tdah-v1.jsx:346-347`.

### AUD-010 - Contraste insuficiente em textos de progresso e apoio

- Severidade: P1.
- Tela/etapa: Header, landing, resultado.
- Evidencia: axe-core em Q1 acusou `color-contrast` serious no texto `Pergunta 1 de 15 · 0%` com `#4A4480`; codigo usa esta cor em `quiz-tdah-v1.jsx:216`.
- Impacto para pessoas com TDAH: baixa legibilidade aumenta esforco visual e reduz orientacao de progresso.
- Impacto na conversao: usuarios abandonam mais quando nao conseguem escanear "quanto falta".
- Recomendacao: elevar contraste de textos secundarios para AA, especialmente progresso, prova social e labels do radar.
- Criterio de aceite: axe-core sem violacoes serious de contraste em landing, pergunta, marco e resultado.
- Referencia: `quiz/quiz-tdah-v1.jsx:216`, `quiz-tdah-v1.jsx:197`.

### AUD-011 - Progresso mostra 0% na Q1 e usa indice respondido, nao percepcao da pergunta atual

- Severidade: P2.
- Tela/etapa: Header / Q1-Q15.
- Evidencia: `pct=Math.round((qi/15)*100)`, `quiz-tdah-v1.jsx:206`; screenshot `q1-320.png` mostra "Pergunta 1 de 15 · 0%"; escopo usa "Pergunta 7 de 15 | 46%" como percepcao da pergunta atual.
- Impacto para pessoas com TDAH: inicio com 0% reduz sensacao de avanco e recompensa imediata.
- Impacto na conversao: pequena queda de motivacao logo apos inicio.
- Recomendacao: separar `answeredPct=answers/15` da percepcao `currentPct=(qi+1)/15`, ou mostrar "0 respondidas" apenas antes de selecionar.
- Criterio de aceite: na Q1 a UI nao combina "Pergunta 1" com "0%" sem contexto.
- Referencia: `quiz/quiz-tdah-v1.jsx:205-221`.

### AUD-012 - Teasers progressivos nao existem

- Severidade: P2.
- Tela/etapa: Apos Q3/Q7/Q9/Q12/Q14.
- Evidencia: escopo lista teasers em `quiz-tdah-especificacao-completa.md:301-310`; busca por textos correspondentes no JSX nao retornou implementacao.
- Impacto para pessoas com TDAH: perde curiosidade progressiva entre blocos e reduz antecipacao.
- Impacto na conversao: menor taxa de conclusao em perguntas intermediarias.
- Recomendacao: adicionar estado transitorio de teaser nao bloqueante apos os indices especificados, com timeout curto e `aria-live`.
- Criterio de aceite: mensagens aparecem nos pontos corretos, nao bloqueiam clique e sao anunciaveis.
- Referencia: `quiz/quiz-tdah-v1.jsx:442-533`.

### AUD-013 - Copy de algumas perguntas/opcoes excede limites da propria skill/especificacao

- Severidade: P2.
- Tela/etapa: Q4, Q7, Q9, Q10, Q14, Q15.
- Evidencia: contagem automatica: Q10 tem 13 palavras; opcoes Q4A, Q7A, Q9B, Q10A, Q10D, Q14A, Q15C passam de 8 palavras; Q6 validacao A tem 18 palavras.
- Impacto para pessoas com TDAH: textos longos reduzem escaneabilidade e aumentam carga cognitiva.
- Impacto na conversao: perguntas densas aumentam chance de resposta apressada ou abandono.
- Recomendacao: encurtar os itens citados mantendo especificidade comportamental.
- Criterio de aceite: perguntas <=12 palavras, opcoes <=8, microvalidacoes <=15.
- Referencia: `quiz/quiz-tdah-v1.jsx:52-87`.

### AUD-014 - Header do quiz nao e fixo durante scroll

- Severidade: P2.
- Tela/etapa: Q1-Q15 mobile.
- Evidencia: escopo pede topo fixo em `quiz-tdah-especificacao-completa.md:212`; Header usa `position:'relative'` em `quiz-tdah-v1.jsx:208`.
- Impacto para pessoas com TDAH: ao rolar para ver validacao/botao, o usuario perde o "quanto falta".
- Impacto na conversao: menos seguranca para continuar em telas pequenas.
- Recomendacao: tornar header `position: sticky; top: 0; z-index` e testar com Qs longas em 320px.
- Criterio de aceite: progresso permanece visivel em Q1-Q15 ao rolar.
- Referencia: `quiz/quiz-tdah-v1.jsx:205-230`.

### AUD-015 - Botao voltar discreto ate Q14 nao foi implementado

- Severidade: P2.
- Tela/etapa: Q2-Q14.
- Evidencia: escopo pede botao voltar; nao ha estado/handler para voltar nem UI correspondente em `App`.
- Impacto para pessoas com TDAH: resposta impulsiva nao pode ser corrigida, gerando frustracao.
- Impacto na conversao: um erro percebido pode levar a abandono ou refazer do zero.
- Recomendacao: adicionar voltar ate Q14, recalculando score via `ansRef` ou derivando score de respostas.
- Criterio de aceite: usuario retorna uma pergunta, altera resposta e score/XP ficam consistentes sem duplicar eventos.
- Referencia: `quiz/quiz-tdah-v1.jsx:442-533`.

### AUD-016 - Resultado nao tem compartilhar perfil/badge

- Severidade: P3.
- Tela/etapa: Resultado.
- Evidencia: escopo especifica badge compartilhavel; busca por "Compartilhar/share" no JSX nao encontrou UI.
- Impacto para pessoas com TDAH: perde recompensa social opcional e senso de fechamento.
- Impacto na conversao: perde potencial de aquisicao organica.
- Recomendacao: incluir opcao secundaria "Compartilhar meu perfil" com card simples e tracking proprio.
- Criterio de aceite: card gerado contem simbolo, nome, tagline e URL; evento de compartilhamento e registrado.
- Referencia: `quiz/quiz-tdah-v1.jsx:364-435`.

## 7. Problemas de UX/UI

| Item | Problema | Acao |
|---|---|---|
| Progresso | Q1 inicia com 0%, apesar de usuario ja estar na primeira pergunta. | Ajustar calculo de percepcao ou copy. |
| Mobile | Q1 em 320px cabe, mas validacao + botao exigem scroll e header some. | Header sticky e foco no botao apos validacao. |
| Recompensa | XP flutua apenas no "Proxima", nao na selecao. | Manter feedback imediato na selecao e XP no avancar, ou explicar. |
| Movimento | Animacoes continuas em landing, barra, pontos e processamento. | Reduced motion e limites de animacao continua. |
| Marco 3 | Card mostra +25 "Marco Desbloqueado" mesmo escopo pedindo +50 "PERFIL COMPLETO". | Criar variant especifica para Marco 3. |

## 8. Problemas de conteudo/copy

| Tela | Texto atual | Problema | Acao |
|---|---|---|---|
| Q10 | "Voce evita tentar coisas novas com medo de nao ser bom o suficiente?" | 13 palavras, acima do limite. | Encurtar para "Voce evita tentar por medo de nao ser bom?" |
| Q15 | "funcionar normal" | "normal" e termo a evitar como meta. | Trocar por "funcionar como esperam de voce". |
| Micro Q5A | "Disforia por Sensibilidade a Rejeicao (RSD)" | Clinico forte sem contexto/disclaimer. | Suavizar ou deixar aprofundamento no resultado. |
| Processamento | "847 padroes", "perfis reais" | Pode soar pseudo-preciso se nao houver base real. | Validar origem dos numeros ou usar copy menos factual. |
| Resultado | "PERFIL ETDAH-AD" | Parece instrumento/laudo clinico. | "Mapa do seu perfil" + disclaimer. |

## 9. Problemas de marketing/conversao

O hook inicial e claro e rapido. O resultado cria identificacao forte, principalmente em Furacao e Camaleao. A ponte de venda ainda esta subdimensionada: nao explica "planner generico nao funciona", nao mostra tentativas anteriores, nao responde garantia/entrega, nao exibe prova social e nao transforma desejo em compra porque o CTA nao tem acao.

Backbone recomendado para a ponte:

1. Headline por arquetipo: "Planner generico nao funciona para o [arquetipo]."
2. Paragrafo curto sobre tentativas anteriores.
3. Features especificas do planner daquele arquetipo.
4. Quatro redutores de friccao do escopo.
5. CTA funcional e rastreado.
6. Disclaimer de perfil nao-diagnostico proximo, discreto.

## 10. Problemas de scoring/arquetipos

Pontos positivos:

- Os seis caminhos obrigatorios geraram o arquetipo correto: Nômade, Reator, Vulcao, Arquiteto, Furacao e Camaleao.
- Scores por dimensao batem com a logica implementada.

Riscos:

- `findArc` usa maior similaridade e primeiro vencedor em empate (`quiz-tdah-v1.jsx:140-148`), sem regra explicita de tie-break.
- Tudo C e Tudo D resultam N/N/N/N/N mas sao classificados como Nômade Quântico.
- Marco 2 apresenta D/H/I com denominador `/9`, embora essas dimensoes ainda nao estejam completas.
- Radar usa denominador `/11` (`quiz-tdah-v1.jsx:378-382`), coerente com scores secundarios maximos, mas precisa ser explicado no relatorio/labels para evitar confusao com o escopo inicial 0-9.

## 11. Problemas de acessibilidade/performance

| Area | Evidencia | Risco | Acao |
|---|---|---|---|
| Teclado | Opcoes `div` sem foco, teste Enter falhou. | Bloqueio de uso. | Radio/button semantico. |
| Screen reader | Sem `aria-live` para validacoes/marcos. | Mudancas invisiveis para leitor. | Regioes live polite/assertive. |
| Landmarks | Axe: sem `main`, conteudo fora de landmarks. | Navegacao assistiva ruim. | `main`, `header`, headings por tela. |
| Contraste | Axe: `color-contrast` serious no progresso. | Baixa legibilidade. | Ajustar tokens secundarios. |
| Reduced motion | Sem media query. | Desconforto e abandono. | Desativar animacoes nao essenciais. |
| Performance | Sem build/dev script; nao foi possivel medir bundle real. | Risco de Recharts/fontes/CDN passarem 150kb. | Adicionar build e medir gzip. |

## 12. Problemas de analytics

Eventos obrigatorios ausentes e payload recomendado:

| Evento | Quando disparar | Payload minimo |
|---|---|---|
| `quiz_started` | CTA inicial | `timestamp`, `source`, `utm`, `viewportWidth` |
| `question_answered` | selecao confirmada | `questionId`, `dimension`, `answer`, `timeSpentMs`, `xpDelta` |
| `milestone_reached` | Q5/Q10/Q15 | `milestoneId`, `scoresPartial`, `xpEarned` |
| `quiz_completed` | fim de Q15/processamento | `archetypeId`, `scores`, `totalTimeMs`, `xpEarned` |
| `result_viewed` | render do resultado | `archetypeId`, `scores`, `source` |
| `cta_clicked` | clique CTA | `archetypeId`, `ctaPosition`, `destination` |
| `quiz_abandoned` | unload/visibility timeout | `lastQuestionId`, `lastScreen`, `timeSpentMs` |

## 13. Backlog recomendado

| Prioridade | Item | Esforco | Impacto | Aceite |
|---|---|---:|---:|---|
| P0 | CTA funcional + tracking | M | Muito alto | Clique abre venda e registra evento. |
| P0 | Analytics completo | M | Muito alto | 7 eventos com payload validado. |
| P0 | Opcoes acessiveis por teclado | M | Muito alto | Quiz completavel sem mouse/toque. |
| P0 | Disclaimer nao-diagnostico | P | Alto | Aviso visivel na landing e resultado. |
| P1 | XP conforme escopo | M | Alto | Maximo 300 XP e Marco 3 +50. |
| P1 | Regra de baixa severidade/empate | M | Alto | Tudo C/D nao cai em arquetipo intenso sem explicacao. |
| P1 | Marco 2 logicamente honesto | P/M | Alto | Preview parcial rotulado corretamente. |
| P1 | Ponte de venda completa | M | Alto | Features, garantia, entrega e prova social presentes. |
| P1 | Reduced motion + contraste | M | Alto | Axe sem serious; reduce sem animacao continua. |
| P2 | Teasers progressivos | P | Medio | Mensagens aparecem apos Q3/Q7/Q9/Q12/Q14. |
| P2 | Header sticky + progresso perceptivo | P | Medio | Progresso sempre visivel e Q1 nao mostra 0% seco. |
| P2 | Botao voltar ate Q14 | M | Medio | Voltar recalcula resposta/score/eventos. |
| P3 | Compartilhar resultado | M | Medio | Card compartilhavel e evento proprio. |

## 14. Criterios de aceite

- O usuario consegue concluir o quiz em 320px, 390px, 768px e desktop sem overflow horizontal nem botao escondido.
- O usuario consegue concluir o quiz apenas com teclado.
- Com `prefers-reduced-motion: reduce`, nao ha confetti, shimmer, pulse, spin ou orb continuo.
- Axe-core nao reporta violacoes critical/serious nas telas Landing, Q1, Marco 2 e Resultado.
- Os seis caminhos obrigatorios continuam gerando os seis arquetipos esperados.
- Tudo A, B, C, D e alternados possuem comportamento documentado e copy coerente.
- XP rapido maximo = 300; XP lento sem bonus = 225; Marco 3 mostra +50.
- Marco 2 nao afirma que dimensoes incompletas estao completas.
- CTA final abre destino real e registra `cta_clicked`.
- Todos os eventos obrigatorios existem com payload suficiente para drop-off, tempo, CTA e conversao.
- Resultado inclui aviso de mapeamento de perfil, nao diagnostico medico.

## 15. Plano de validacao pos-ajustes

1. Rodar `node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js` e validar 6/6 caminhos esperados.
2. Adicionar/rodar um harness real do app com React/Recharts e executar axe em 320, 390, 768 e desktop.
3. Testar manualmente teclado: Tab, Shift+Tab, setas, Enter e Espaco.
4. Testar reduced motion no navegador e conferir ausencia de animacoes continuas.
5. Simular personas obrigatorias e registrar resultado, tempo e friccoes.
6. Validar analytics em modo debug: eventos unicos, payload completo, sem duplicidade em voltar/refazer.
7. Validar CTA em ambiente de staging com destino real e parametro de arquetipo.
8. Reexecutar screenshots das telas-chave: landing, Q1 com validacao, Marco 1, Marco 2, processamento, resultado e CTA.
