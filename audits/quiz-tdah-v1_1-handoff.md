# Relatório de Auditoria — Quiz TDAH v1.1

Data da auditoria: 2026-05-04  
App auditado: `http://localhost:5174/`  
Fontes obrigatórias: `quiz/quiz-tdah-especificacao-completa.md`, `quiz/quiz-tdah-v1.jsx`, Seção 9 de `quiz/plano-revisor.md`.  
Skills/ferramentas usadas: `tdah-ux-audit` para critérios de produto e funil; `playwright`/MCP para navegação real, screenshots, axe-core e simulações.

Observação: não houve alteração de código do app. Foram gerados artefatos de auditoria, incluindo screenshots `audit-v1_1-landing-320.png`, `audit-v1_1-q1-320.png`, `audit-v1_1-landing-768.png`, `audit-v1_1-landing-desktop.png` e `audit-v1_1-result-furacao-390.png`.

---

## 1. Resumo executivo

O Quiz TDAH v1.1 evoluiu muito em relação ao escopo: já tem landing, 15 perguntas, XP com bônus de velocidade, timeline, marcos, processamento de 4,6s, resultado por arquétipo, radar, disclaimer, CTA rastreado, `prefers-reduced-motion` e eventos básicos de analytics.

Ainda não está pronto para lançamento comercial. O bloqueador principal é que o CTA final aponta para `https://seusite.com.br/...`, ou seja, ainda não leva a uma página real de venda. Os maiores riscos de qualidade são scoring sem cap nos secundários, radar com denominador incorreto, preview do Marco 2 com máximos parciais errados, XP incompatível com o máximo declarado no escopo, bug no botão Voltar que permite inflar XP/eventos e problemas de confiança visual/acessibilidade em desktop/tablet.

Pontos fortes validados:

- Caminhos oficiais por arquétipo passaram no navegador: 6/6 renderizaram o arquétipo esperado.
- Caminho lento (>5s por pergunta) removeu bônus de velocidade corretamente: `xpEarned: 250`.
- `prefers-reduced-motion: reduce` reduziu animações e removeu shimmer.
- 320px, 390px, 768px e desktop não tiveram overflow horizontal.
- Landing e resultado incluem disclaimer não-diagnóstico.

Riscos prioritários:

- P0: CTA final ainda é placeholder de venda.
- P1: scoring bruto pode passar do cap especificado e distorcer radar/XP.
- P1: botão Voltar reenvia a mesma pergunta e corrompe XP/analytics.
- P1: Marco 2 exibe barras parciais com denominadores errados e não é radar parcial.
- P1: desktop/tablet mostram fundo branco abaixo da landing por `minHeight` fixo.
- P1: axe acusa contraste serious em textos secundários.

---

## 2. Nota geral por categoria

| Categoria | Nota | Leitura |
|---|---:|---|
| Aderência ao escopo | 7/10 | Fluxo macro existe; CTA, XP máximo, Marco 2, radar e timing ainda divergem. |
| UX/UI TDAH | 7/10 | Boa clareza e recompensa; há risco por bug de Voltar, desktop quebrado e alguns textos longos. |
| Dopamina/gamificação | 7/10 | XP e marcos funcionam, mas regra máxima é incoerente e pode ser inflada. |
| Conteúdo/copy | 8/10 | Tom empático; ainda há opções longas e algumas validações acima do limite. |
| Marketing/conversão | 5/10 | Ponte de venda existe, mas CTA é placeholder e prova social ainda parece não validada. |
| Scoring/arquétipos | 6/10 | Caminhos oficiais passam; caps, denominadores e extremos precisam correção. |
| Acessibilidade | 6/10 | Radios nativos e reduced-motion existem; faltam landmarks, H1 nas perguntas, foco e contraste. |
| Mobile-first | 8/10 | 320px funciona sem overflow; Q1 é legível e tocável. |
| Analytics | 6/10 | Eventos existem; payloads incompletos, duplicidade de abandono e XP errado no CTA. |
| Performance | 6/10 | App responde e navega; build não pôde ser validado por `spawn EPERM` do esbuild no sandbox. |

---

## 3. Mapa do fluxo real

Fluxo previsto no escopo:

1. Landing com hook e CTA.
2. Q1-Q5.
3. Marco 1 após Q5.
4. Q6-Q10.
5. Marco 2 após Q10 com radar parcial.
6. Q11-Q15.
7. Marco 3 após Q15.
8. Processamento por 4-5s.
9. Resultado com arquétipo, radar, reconhecimento, custo e ponte de venda.
10. CTA para página de venda do planner.

Fluxo real no código:

1. `Landing`: headline, subtítulo, números rápidos, CTA inicial, prova social e disclaimer.
2. `Header`: XP, progresso por pergunta atual, barra shimmer e 15 pontos.
3. `QuestionCard`: `fieldset`/`legend`, 4 `input type="radio"` escondidos, microvalidação e botão `Próxima`.
4. `MilestoneCard`: Marco 1, Marco 2 com barras parciais, Marco 3.
5. `Processing`: 4 mensagens por `msgs.length * 1050 + 400`, total aproximado 4,6s.
6. `Result`: símbolo, arquétipo, radar Recharts, reconhecimento, custo, ponte curta, prova social placeholder, bullets de fricção, CTA, disclaimer, refazer e compartilhar.
7. `App`: estados `scr`, `qi`, `sel`, `showV`, `showN`, `mile`, `xp`, `scores`, `arc`, `teaser`, `ansRef`, `qStartRef`, `appStartRef`.

Scoring real:

- `calcScores()` soma diretamente todos os pontos de `opt.s`, incluindo secundários.
- `sev()` classifica `<=3 N`, `<=6 M`, `>6 S`.
- `findArc()` calcula similaridade e tem exceção `N/N/N/N/N -> Camaleão Exausto` com `lowSeverity`.
- Não há cap explícito em `calcScores()`.

---

## 4. Matriz escopo vs implementação

| Item do escopo | Status | Evidência | Severidade |
|---|---|---|---|
| 15 perguntas e 4 alternativas | Implementado | Script detectou 15/15; `Q` em `quiz/quiz-tdah-v1.jsx:60`. | OK |
| Perguntas <=12 palavras | Implementado | Contagem: 15/15 dentro do limite. | OK |
| Opções <=8 palavras | Parcial | 13 opções acima do limite, incluindo Q10A com 11 palavras. | P2 |
| Microvalidações <=15 palavras | Parcial | Q3A e Q9A têm 16 palavras. | P3 |
| Progresso sempre visível | Implementado | Header sticky em `quiz/quiz-tdah-v1.jsx:245`; Q1 mostra 7%. | OK |
| Timeline de 15 pontos | Implementado | Pontos renderizados em `quiz/quiz-tdah-v1.jsx:260-266`. | OK |
| XP +10, +5, +25, +25, +50 | Implementado por evento | `timeSpentMs < 5000`, `xpDelta` em `quiz/quiz-tdah-v1.jsx:608-611`. | OK |
| XP total máximo 300 | Divergente | Navegação rápida gerou `xpEarned: 325`; spec declara 300 em `quiz/quiz-tdah-especificacao-completa.md:187`. | P1 |
| Marcos após Q5/Q10/Q15 | Implementado | `qi===4/9/14` em `quiz/quiz-tdah-v1.jsx:620-631`. | OK |
| Marco 2 com radar parcial | Parcial | Implementado como barras D/H/I, não radar; `partialMax` incorreto em `quiz/quiz-tdah-v1.jsx:340`. | P1 |
| Teasers Q3/Q7/Q9/Q12/Q14 | Implementado | `TEASERS` em `quiz/quiz-tdah-v1.jsx:110-116` e uso em `quiz/quiz-tdah-v1.jsx:588-592`. | OK |
| Processamento 4-5s | Implementado | `msgs.length*1050+400` em `quiz/quiz-tdah-v1.jsx:393-396`. | OK |
| Resultado com arquétipo e radar | Implementado parcial | Radar usa `/11` para todas as dimensões em `quiz/quiz-tdah-v1.jsx:435-439`. | P1 |
| CTA final funcional | Bloqueado | `ctaUrl` usa `https://seusite.com.br/...` em `quiz/quiz-tdah-v1.jsx:120-150`. | P0 |
| Analytics obrigatórios | Parcial | Eventos existem, mas payloads não batem totalmente com spec `1355-1361`. | P1 |
| `prefers-reduced-motion` | Implementado | CSS em `quiz/quiz-tdah-v1.jsx:54-57`; teste mostrou shimmer `display:none`. | OK |
| Acessibilidade por teclado | Parcial | Q1 seleciona com Space, mas foco não vai para `Próxima` e Q2 foca `Voltar` primeiro. | P2 |
| Contraste WCAG AA | Parcial | axe: `color-contrast` serious em labels da landing. | P1 |
| Mobile 320px | Implementado | Sem overflow horizontal em 320px; screenshot `audit-v1_1-q1-320.png`. | OK |
| Desktop/tablet full viewport | Parcial | Screenshot 768/desktop mostra área branca abaixo da landing. | P1 |

---

## 5. Simulações por persona

| Persona | Caminho/teste | Resultado | Fricções observadas | Risco de abandono |
|---|---|---|---|---|
| Desatento impaciente | 320px, Q1, respostas rápidas | Landing clara; Q1 legível; progresso visível. | Opções longas em algumas Qs; botão aparece rápido demais para absorver validação. | Médio |
| Hiperativo/explorador | Tudo A rápido | Resultado `O Furacão`, `xpEarned: 325`. | XP excede máximo declarado; Voltar permite inflar XP/eventos. | Alto |
| Emocional/RSD | Caminho emocional, validações | Tom geralmente acolhedor e com disclaimer. | Algumas frases usam termos clínicos fortes; microvalidação aparece imediatamente sem respiro. | Médio |
| Mascaramento/burnout | `BDBBBBDACCBDCDC` | Resultado `O Camaleão Exausto`, correto. | Ponte é boa, mas prova social ainda mostra placeholder visível. | Médio |
| Criativo caótico | `BAABDBCAADADCBB` | Resultado `O Arquiteto do Caos`, correto. | CTA não leva a venda real; quebra o impulso gerado pelo resultado. | Alto |
| Cético antes da compra | Tudo C | Resultado real no navegador: `O Camaleão Exausto` com low severity. | Landing usa `47.382` sem fonte e resultado mostra `[depoimento a confirmar com real]`. | Alto |
| Mobile ansioso | 320px | Sem overflow; CTA inicial e respostas cabem. | Q1 ocupa quase toda a viewport; validação + próximo exigem atenção ao scroll em perguntas maiores. | Médio |
| Teclado | Tab/Space/Enter | Q1 seleciona por teclado. | Na Q2, Tab foca `Voltar` antes das respostas; botão `Próxima` não recebe foco automático. | Médio/alto |
| Reduced motion | Emulação `reduce` | Shimmer removido, animações com duração mínima. | Passou no teste principal; manter em regressão. | Baixo |

Caminhos obrigatórios por arquétipo no navegador:

| Esperado | Sequência | Renderizado |
|---|---|---|
| O Nômade Quântico | `ABBDCADDCCDCDAC` | O Nômade Quântico |
| O Reator em Cadeia | `BAABCBBADBDAABC` | O Reator em Cadeia |
| O Vulcão Silencioso | `BDCDCDDABABADAA` | O Vulcão Silencioso |
| O Arquiteto do Caos | `BAABDBCAADADCBB` | O Arquiteto do Caos |
| O Furacão | `ABACAAAACBBAABA` | O Furacão |
| O Camaleão Exausto | `BDBBBBDACCBDCDC` | O Camaleão Exausto |

Casos extremos navegados:

| Caso | Resultado real |
|---|---|
| Tudo A | O Furacão, `xpEarned: 325` rápido |
| Tudo B | O Vulcão Silencioso, `xpEarned: 325` rápido |
| Tudo C | O Camaleão Exausto, `xpEarned: 325` rápido |
| Tudo D | O Camaleão Exausto, `xpEarned: 325` rápido |
| Alternado A/D | O Vulcão Silencioso, `xpEarned: 325` rápido |
| Tudo A lento | O Furacão, `xpEarned: 250`, primeiras Qs com `xpDelta: 10` |

---

## 6. Achados priorizados P0/P1/P2/P3

### P0 — Bloqueadores

#### AUD-001 — CTA final aponta para domínio placeholder

- ID: AUD-001.
- Severidade: P0.
- Tela/etapa: Resultado / CTA final.
- Evidência: `ctaUrl` dos seis arquétipos usa `https://seusite.com.br/planner/...` em `quiz/quiz-tdah-v1.jsx:120-150`; navegação do Furacão retornou `ctaHref: https://seusite.com.br/planner/furacao`.
- Impacto para pessoas com TDAH: o momento de maior motivação vira uma quebra de contexto; a pessoa precisa decidir depois, com menor ativação.
- Impacto na conversão: bloqueia a venda real do funil ou envia tráfego para destino placeholder.
- Recomendação: substituir por URLs reais de checkout/página de venda por arquétipo, ou por uma rota controlada com fallback claro se a oferta ainda não existir.
- Critério de aceite: clicar no CTA do resultado abre o destino real correto e mantém `cta_clicked` registrado antes da navegação.
- Referência: `quiz/quiz-tdah-v1.jsx:120-150`, `quiz/quiz-tdah-v1.jsx:515-520`, spec `quiz/quiz-tdah-especificacao-completa.md:997-1117`.

### P1 — Alta prioridade

#### AUD-002 — XP máximo declarado é incompatível com a regra e com a implementação

- ID: AUD-002.
- Severidade: P1.
- Tela/etapa: Gamificação / Q1-Q15 / Resultado analytics.
- Evidência: spec declara +10 por pergunta, +5 velocidade, +25, +25, +50 e também `XP total máximo possível: 300 XP` em `quiz/quiz-tdah-especificacao-completa.md:182-187`. A soma desses eventos é 325. Navegação rápida registrou `quiz_completed ... xpEarned: 325`; navegação lenta registrou `xpEarned: 250`.
- Impacto para pessoas com TDAH: a recompensa fica matematicamente inconsistente; se o total aparecer em copy futura, gera ruído e quebra de confiança.
- Impacto na conversão: métricas de engajamento e segmentação por XP ficam inconsistentes entre escopo, código e analytics.
- Recomendação: decidir uma regra única. Opção A: corrigir spec para máximo 325. Opção B: manter máximo 300 reduzindo bônus ou milestone final. Atualizar UI, testes e analytics juntos.
- Critério de aceite: caminho rápido e lento batem com o máximo documentado; relatório de analytics não tem valores acima do máximo oficial.
- Referência: `quiz/quiz-tdah-v1.jsx:608-611`, `quiz/quiz-tdah-v1.jsx:629`, spec `quiz/quiz-tdah-especificacao-completa.md:182-187`.

#### AUD-003 — Botão Voltar permite reenviar pergunta e inflar XP/analytics

- ID: AUD-003.
- Severidade: P1.
- Tela/etapa: Q2-Q14 / Voltar / Analytics.
- Evidência: teste controlado: Q1 A -> Próxima gerou `⚡ 15 XP`; Voltar reduziu para `⚡ 5 XP`; Próxima novamente elevou para `⚡ 20 XP` e registrou dois `question_answered` para `questionId: 1`. Código apaga `na[prevQ.id+1]` e subtrai sempre `10` em `quiz/quiz-tdah-v1.jsx:651-660`.
- Impacto para pessoas com TDAH: usuários rápidos ou de teclado podem voltar sem intenção e bagunçar a recompensa; isso reduz sensação de controle.
- Impacto na conversão: analytics de perguntas e XP ficam poluídos; usuários podem chegar ao resultado com XP artificial.
- Recomendação: armazenar `xpDelta` por pergunta respondida, remover/recalcular o delta correto ao voltar e não reenviar evento ao apenas confirmar resposta já existente. Corrigir a remoção da resposta para a pergunta correta.
- Critério de aceite: ir e voltar entre Q1/Q2 mantém XP estável e emite no máximo um `question_answered` por resposta efetiva.
- Referência: `quiz/quiz-tdah-v1.jsx:651-660`.

#### AUD-004 — Scoring secundário não aplica cap e pode ultrapassar o domínio do radar

- ID: AUD-004.
- Severidade: P1.
- Tela/etapa: Scoring / Resultado / Radar.
- Evidência: spec exige `D_final`, `A_final`, `E_final` com cap em `11` em `quiz/quiz-tdah-especificacao-completa.md:851-857`. `calcScores()` soma cru e retorna `s` sem cap em `quiz/quiz-tdah-v1.jsx:157-164`. Simulação do código real: Tudo A gera `{ D:10, H:9, I:9, A:13, E:12 }`.
- Impacto para pessoas com TDAH: resultado visual pode superdimensionar dimensões emocionais/autorregulação e parecer laudo impreciso.
- Impacto na conversão: reduz confiança de usuários céticos e dificulta explicar por que o planner é adequado.
- Recomendação: separar score primário/secundário, aplicar cap por dimensão e persistir scores finais já normalizados para `findArc`, radar e analytics.
- Critério de aceite: Tudo A nunca produz A/E acima de 11; todos os payloads e o radar usam scores finais com cap.
- Referência: `quiz/quiz-tdah-v1.jsx:157-164`, spec `quiz/quiz-tdah-especificacao-completa.md:843-857`.

#### AUD-005 — Radar final usa denominador `/11` para dimensões cujo máximo é 9

- ID: AUD-005.
- Severidade: P1.
- Tela/etapa: Resultado / Radar.
- Evidência: `Result` calcula D/H/I/A/E com `Math.round((ds.X/11)*100)` em `quiz/quiz-tdah-v1.jsx:435-439`. Pela spec, H e I não têm secundário significativo e têm máximo 9 em `quiz/quiz-tdah-especificacao-completa.md:853-855`.
- Impacto para pessoas com TDAH: o radar subestima hiperatividade e impulsividade; o usuário pode não reconhecer o próprio perfil.
- Impacto na conversão: enfraquece a ponte personalizada quando o gráfico contradiz o arquétipo.
- Recomendação: usar denominador por dimensão: D/A/E até 11 após cap; H/I até 9. Alternativamente normalizar todas para percentil calculado formalmente.
- Critério de aceite: H=9 e I=9 aparecem como 100%; A/E nunca passam de 100%.
- Referência: `quiz/quiz-tdah-v1.jsx:435-439`, spec `quiz/quiz-tdah-especificacao-completa.md:831-857`.

#### AUD-006 — Marco 2 não entrega o radar parcial especificado e usa máximos parciais errados

- ID: AUD-006.
- Severidade: P1.
- Tela/etapa: Marco 2.
- Evidência: spec pede radar parcial com D/H/I visíveis e A/E bloqueados em `quiz/quiz-tdah-especificacao-completa.md:264-289`. Código usa barras, `partialMax={D:6,H:5,I:6}` em `quiz/quiz-tdah-v1.jsx:340`. Após Q10, H pode chegar a 6 e D pode chegar a 7 em combinações com secundário, então o label pode virar `6/5 parcial` ou barra >100%.
- Impacto para pessoas com TDAH: um preview incoerente cria confusão justamente no momento de recompensa intermediária.
- Impacto na conversão: reduz confiança no algoritmo antes da reta final do quiz.
- Recomendação: ou implementar o radar parcial real, ou renomear como "prévia parcial" com denominadores corretos por perguntas já respondidas e clamp visual em 100%.
- Critério de aceite: Marco 2 nunca mostra `score/max` impossível e o formato visual corresponde ao escopo aprovado.
- Referência: `quiz/quiz-tdah-v1.jsx:335-364`, spec `quiz/quiz-tdah-especificacao-completa.md:264-289`.

#### AUD-007 — Landing deixa área branca em tablet/desktop

- ID: AUD-007.
- Severidade: P1.
- Tela/etapa: Landing / 768px / desktop.
- Evidência: screenshots `audit-v1_1-landing-768.png` e `audit-v1_1-landing-desktop.png` mostram grande bloco branco abaixo da área escura. `Landing` usa `minHeight:620` e o wrapper usa `minHeight:600` em `quiz/quiz-tdah-v1.jsx:208` e `quiz/quiz-tdah-v1.jsx:690`.
- Impacto para pessoas com TDAH: a tela parece quebrada ou inacabada; isso rouba atenção do CTA.
- Impacto na conversão: reduz confiança inicial nos primeiros segundos do funil.
- Recomendação: aplicar background escuro ao `html`, `body`, `#root` e usar `minHeight:'100vh'` nas telas full-screen.
- Critério de aceite: em 768px e desktop, a primeira viewport inteira fica visualmente consistente, sem fundo branco.
- Referência: `quiz/quiz-tdah-v1.jsx:208`, `quiz/quiz-tdah-v1.jsx:690`.

#### AUD-008 — Contraste reprova axe em textos secundários

- ID: AUD-008.
- Severidade: P1.
- Tela/etapa: Landing, labels de apoio e resultado.
- Evidência: axe-core em 320, 390, 768 e desktop acusou `color-contrast` serious nos labels `minutos`, `perguntas` e textos em `rgb(107, 98, 168)` sobre fundo escuro. Cores similares aparecem em `quiz/quiz-tdah-v1.jsx:226`, `quiz/quiz-tdah-v1.jsx:232`, `quiz/quiz-tdah-v1.jsx:527`.
- Impacto para pessoas com TDAH: baixa legibilidade aumenta carga visual e dificulta escaneamento rápido.
- Impacto na conversão: informação de tempo/prova/disclaimer pode passar despercebida ou parecer desabilitada.
- Recomendação: elevar contraste dos textos secundários para WCAG AA, especialmente informações de tempo, progresso, prova social, disclaimer e labels do radar.
- Critério de aceite: axe não reporta `color-contrast` serious em landing, pergunta, marco e resultado.
- Referência: `quiz/quiz-tdah-v1.jsx:226`, `quiz/quiz-tdah-v1.jsx:232`, `quiz/quiz-tdah-v1.jsx:527`.

#### AUD-009 — Analytics existem, mas payloads e abandono não permitem otimização confiável

- ID: AUD-009.
- Severidade: P1.
- Tela/etapa: Fluxo inteiro / Analytics.
- Evidência: spec exige `source`, `totalTimeMs`, `timeOnResultMs` e payloads suficientes em `quiz/quiz-tdah-especificacao-completa.md:1353-1361`. Código envia `quiz_started` sem source/UTM em `quiz/quiz-tdah-v1.jsx:230`, `quiz_completed` sem `totalTimeMs` em `quiz/quiz-tdah-v1.jsx:629`, `result_viewed` sem tempo em `quiz/quiz-tdah-v1.jsx:648`, e `cta_clicked.xpEarned` usa soma dos scores, não XP, em `quiz/quiz-tdah-v1.jsx:519`. Console também mostrou `quiz_abandoned` duplicado em navegações porque `beforeunload` e `visibilitychange` disparam juntos.
- Impacto para pessoas com TDAH: sem dados confiáveis, a equipe não encontra pontos reais de abandono/fricção.
- Impacto na conversão: decisões de otimização de funil ficam baseadas em dados incompletos ou duplicados.
- Recomendação: criar schema único de eventos, incluir `sessionId`, UTM/source, `totalTimeMs`, `timeOnQuestionMs`, `xpTotal`, `scoresFinal`, `archetypeId`, deduplicar abandono e corrigir `cta_clicked`.
- Critério de aceite: cada evento obrigatório dispara uma vez por ação real com payload completo e validável via console/PostHog/GA.
- Referência: `quiz/quiz-tdah-v1.jsx:230`, `quiz/quiz-tdah-v1.jsx:571`, `quiz/quiz-tdah-v1.jsx:618-629`, `quiz/quiz-tdah-v1.jsx:648`, `quiz/quiz-tdah-v1.jsx:519`.

#### AUD-010 — Prova social ainda parece placeholder e pode quebrar confiança

- ID: AUD-010.
- Severidade: P1.
- Tela/etapa: Landing / Resultado / Ponte de venda.
- Evidência: landing exibe `47.382 pessoas já descobriram o seu` em `quiz/quiz-tdah-v1.jsx:232`; resultado exibe depoimento com `[depoimento a confirmar com real]` visível em `quiz/quiz-tdah-v1.jsx:501-505`.
- Impacto para pessoas com TDAH: usuários céticos podem perceber manipulação ou material incompleto.
- Impacto na conversão: prova social não confiável reduz clique no CTA e pode aumentar rejeição à oferta.
- Recomendação: substituir por números reais, remover número até haver dado, ou marcar internamente sem exibir placeholder. Usar depoimentos reais conforme spec.
- Critério de aceite: nenhum placeholder de prova social aparece em produção; números têm fonte ou são removidos.
- Referência: `quiz/quiz-tdah-v1.jsx:232`, `quiz/quiz-tdah-v1.jsx:501-505`, spec `quiz/quiz-tdah-especificacao-completa.md:1140-1141`.

### P2 — Importantes

#### AUD-011 — Foco por teclado não acompanha a intenção do usuário

- ID: AUD-011.
- Severidade: P2.
- Tela/etapa: Q1-Q15 / Teclado.
- Evidência: após selecionar Q1 com Space, o foco continua no input; `Próxima` aparece mas não recebe foco. Na Q2, o primeiro Tab cai em `Voltar`, não na primeira resposta. Código do botão `Próxima` não faz foco programático em `quiz/quiz-tdah-v1.jsx:323-325`; botão Voltar vem antes das respostas em `quiz/quiz-tdah-v1.jsx:278-280`.
- Impacto para pessoas com TDAH: aumenta risco de acionar Voltar sem querer e gera fricção de teclado.
- Impacto na conversão: usuários sem mouse ou mais ansiosos podem abandonar por fluxo imprevisível.
- Recomendação: após microvalidação, mover foco para `Próxima` ou anunciar claramente; em novas perguntas, focar a primeira opção ou a pergunta, e tornar Voltar acessível sem ser o primeiro foco principal.
- Critério de aceite: completar o quiz inteiro por teclado é previsível: resposta -> foco em Próxima -> próxima pergunta -> foco na pergunta/opção.
- Referência: `quiz/quiz-tdah-v1.jsx:278-325`.

#### AUD-012 — Telas de pergunta não têm H1 nem landmarks principais

- ID: AUD-012.
- Severidade: P2.
- Tela/etapa: Q1-Q15 / Semântica.
- Evidência: axe em Q1 acusou `page-has-heading-one`, `landmark-one-main` e `region`. A pergunta usa `legend`, mas a tela não tem `<main>`/H1 durante o quiz.
- Impacto para pessoas com TDAH: tecnologia assistiva perde estrutura de navegação; usuários têm mais esforço para se orientar.
- Impacto na conversão: acessibilidade parcial reduz conclusão e aumenta risco de não conformidade.
- Recomendação: envolver app em `<main>`, manter um H1 por tela ou um H1 visualmente apropriado/visually-hidden para a pergunta atual, e organizar header/quiz em regiões.
- Critério de aceite: axe não acusa `page-has-heading-one`, `landmark-one-main` ou `region` nas telas principais.
- Referência: `quiz/quiz-tdah-v1.jsx:286-315`, `quiz/quiz-tdah-v1.jsx:690-704`.

#### AUD-013 — Opções e microvalidações excedem limites de escaneabilidade

- ID: AUD-013.
- Severidade: P2.
- Tela/etapa: Q4-Q15 / Copy.
- Evidência: contagem automatizada encontrou 13 opções acima de 8 palavras: Q4A, Q5A, Q6A/B/C, Q7A, Q8A, Q9B, Q10A/D, Q14A, Q15A/C. Q3A e Q9A têm microvalidações com 16 palavras. A spec exige opções <=8 e microvalidações <=15 em `quiz/quiz-tdah-especificacao-completa.md:363-369` e skill `tdah-ux-audit`.
- Impacto para pessoas com TDAH: alternativas longas ficam menos escaneáveis, especialmente em 320px.
- Impacto na conversão: aumenta tempo por pergunta e chance de resposta apressada sem leitura.
- Recomendação: encurtar os itens acima mantendo comportamento concreto. Exemplo: Q10A pode virar "Muito — o medo me paralisa".
- Critério de aceite: perguntas <=12 palavras, opções <=8 palavras, microvalidações <=15 palavras em checagem automatizada.
- Referência: `quiz/quiz-tdah-v1.jsx:60-108`, spec `quiz/quiz-tdah-especificacao-completa.md:1264-1272`.

#### AUD-014 — Timing de microvalidação está mais curto que o especificado

- ID: AUD-014.
- Severidade: P2.
- Tela/etapa: Q1-Q15 / Ritmo dopaminérgico.
- Evidência: `onSel()` mostra validação imediatamente e `Próxima` após 900ms em `quiz/quiz-tdah-v1.jsx:580-584`. A spec pede microvalidação após 0,5s e botão após 1s de exibição da validação.
- Impacto para pessoas com TDAH: usuários rápidos gostam do ritmo, mas usuários sensíveis podem não processar a validação antes do próximo estímulo.
- Impacto na conversão: a micro-recompensa emocional pode perder efeito, reduzindo vínculo com o resultado.
- Recomendação: alinhar timing ao escopo ou validar em teste A/B. Se manter 900ms, documentar a decisão como otimização de ritmo.
- Critério de aceite: timing medido corresponde ao escopo ou a divergência está justificada em decisão de produto.
- Referência: `quiz/quiz-tdah-v1.jsx:580-584`, spec `quiz/quiz-tdah-especificacao-completa.md:197-205`.

#### AUD-015 — Compartilhamento não gera badge/card como especificado

- ID: AUD-015.
- Severidade: P2.
- Tela/etapa: Resultado / Compartilhar.
- Evidência: código usa `navigator.share` quando disponível em `quiz/quiz-tdah-v1.jsx:533-538`; spec pede card visual com símbolo, nome, tagline, radar, URL e branding em `quiz/quiz-tdah-especificacao-completa.md:1121-1136`.
- Impacto para pessoas com TDAH: perde uma recompensa social visual e memorável após o resultado.
- Impacto na conversão: reduz potencial orgânico de compartilhamento e aquisição por indicação.
- Recomendação: implementar geração de card compartilhável ou ocultar a promessa de compartilhamento visual até existir.
- Critério de aceite: botão gera card visual ou o escopo é ajustado para compartilhamento nativo simples.
- Referência: `quiz/quiz-tdah-v1.jsx:533-538`, spec `quiz/quiz-tdah-especificacao-completa.md:1121-1136`.

### P3 — Polish

#### AUD-016 — Console exibe 404 de favicon

- ID: AUD-016.
- Severidade: P3.
- Tela/etapa: Carregamento inicial.
- Evidência: console Playwright: `Failed to load resource: 404 (Not Found) @ /favicon.ico`.
- Impacto para pessoas com TDAH: sem impacto direto perceptível.
- Impacto na conversão: pequeno sinal de acabamento técnico incompleto para auditorias/QA.
- Recomendação: adicionar favicon ou referência correta no `index.html`.
- Critério de aceite: console inicial sem erro 404 de favicon.
- Referência: `quiz/index.html`.

---

## 7. Problemas de UX/UI

| ID | Problema | Evidência | Correção sugerida |
|---|---|---|---|
| AUD-003 | Voltar corrompe XP e eventos | XP 15 -> 5 -> 20 ao reenviar Q1 | Recalcular XP por resposta ou armazenar delta por pergunta. |
| AUD-006 | Marco 2 usa barras e máximos errados | `partialMax={D:6,H:5,I:6}` | Usar radar parcial ou denominadores reais e clamp. |
| AUD-007 | Área branca em desktop/tablet | Screenshots 768/desktop | `min-height:100vh` e background em `html/body/#root`. |
| AUD-011 | Foco por teclado não acompanha fluxo | Próxima não recebe foco; Q2 foca Voltar | Gerenciar foco após seleção e nova pergunta. |
| AUD-014 | Microvalidação aparece sem delay | `setShowV(true)` imediato | Ajustar timing ou documentar decisão. |

---

## 8. Problemas de conteúdo/copy

| ID | Tela | Texto/problema | Recomendação |
|---|---|---|---|
| AUD-013 | Opções | 13 opções passam de 8 palavras | Encurtar mantendo comportamento concreto. |
| AUD-013 | Microvalidações | Q3A e Q9A passam de 15 palavras | Reduzir 1-3 palavras sem perder acolhimento. |
| AUD-010 | Prova social | `[depoimento a confirmar com real]` aparece ao usuário | Trocar por depoimento real ou ocultar. |
| AUD-010 | Landing | `47.382 pessoas` sem fonte | Usar número real, fonte interna ou remover. |

---

## 9. Problemas de marketing/conversão

| ID | Problema | Impacto | Ação |
|---|---|---|---|
| AUD-001 | CTA aponta para `seusite.com.br` | Bloqueia conversão real | Configurar URLs reais por arquétipo. |
| AUD-009 | `cta_clicked` usa score como XP | Métrica de CTA fica errada | Enviar `xpTotal` real do estado. |
| AUD-010 | Prova social placeholder | Quebra confiança do usuário cético | Remover placeholders visíveis. |
| AUD-015 | Sem card compartilhável | Menor aquisição orgânica | Criar card ou ajustar escopo. |

---

## 10. Problemas de scoring/arquétipos

| ID | Problema | Evidência | Critério de correção |
|---|---|---|---|
| AUD-004 | Sem cap nos scores finais | Tudo A gera A=13/E=12 no código real | Scores finais respeitam D/A/E <=11 e H/I <=9. |
| AUD-005 | Radar divide tudo por 11 | H/I máximos são 9 | H/I=9 aparecem 100%. |
| AUD-006 | Marco 2 parcial com max errado | H pode ser 6 mas max é 5 | Nenhum label impossível como `6/5 parcial`. |
| AUD-002 | XP máximo inconsistente | Rápido 325 vs spec 300 | Regra única documentada e testada. |
| AUD-003 | Voltar reconta pergunta | Q1 emitida duas vezes | Uma resposta efetiva = um evento e um delta. |

---

## 11. Problemas de acessibilidade/performance

| Área | Status | Evidência | Ação |
|---|---|---|---|
| Radios | Parcial bom | `input type="radio"` com label; Space seleciona Q1 | Melhorar foco e fluxo de teclado. |
| Landmarks/H1 | Falha moderada | axe `landmark-one-main`, `region`, `page-has-heading-one` | Adicionar `<main>` e H1 por tela. |
| Contraste | Falha serious | axe `color-contrast` nos labels da landing | Ajustar tokens secundários para AA. |
| Reduced motion | Passou | shimmer `display:none`, durations `1e-05s` | Manter teste de regressão. |
| 320px | Passou | sem overflow; screenshot Q1 | Revalidar após encurtar opções. |
| 768/desktop | Falha visual | fundo branco abaixo da landing | `min-height:100vh` e background global. |
| Build | Não verificado | `vite build` falhou por `spawn EPERM` do esbuild no sandbox | Rodar build fora do sandbox e medir bundle gzip. |

---

## 12. Problemas de analytics

Eventos existentes:

- `quiz_started`
- `question_answered`
- `milestone_reached`
- `quiz_completed`
- `result_viewed`
- `cta_clicked`
- `quiz_abandoned`
- Extra: `share_clicked`

Problemas:

- `quiz_started` não envia `source`/UTM.
- `quiz_completed` não envia `totalTimeMs`.
- `result_viewed` não mede `timeOnResultMs`.
- `cta_clicked.xpEarned` usa soma de scores, não XP total.
- `quiz_abandoned` pode duplicar por `beforeunload` + `visibilitychange`.
- Voltar/reenviar pergunta duplica `question_answered`.
- Não há `sessionId` para deduplicação e análise por jornada.

Payload recomendado mínimo:

| Evento | Payload mínimo |
|---|---|
| `quiz_started` | `sessionId`, `timestamp`, `source`, `utm`, `viewportWidth` |
| `question_answered` | `sessionId`, `questionId`, `dimension`, `answer`, `timeSpentMs`, `xpDelta`, `xpTotal`, `isSpeedBonus` |
| `milestone_reached` | `sessionId`, `milestoneId`, `answeredCount`, `xpDelta`, `xpTotal`, `scoresPartial` |
| `quiz_completed` | `sessionId`, `archetypeId`, `scoresFinal`, `totalTimeMs`, `xpEarned` |
| `result_viewed` | `sessionId`, `archetypeId`, `scoresFinal`, `timestamp` |
| `cta_clicked` | `sessionId`, `archetypeId`, `ctaPosition`, `destination`, `xpTotal`, `timeOnResultMs` |
| `quiz_abandoned` | `sessionId`, `lastQuestionId`, `lastScreen`, `timeSpentMs`, `answeredCount`, `dedupeKey` |

---

## 13. Backlog recomendado

| Prioridade | Item | Esforço | Impacto | Critério de aceite |
|---|---|---:|---:|---|
| P0 | Trocar URLs placeholder do CTA por destinos reais | P | Alto | CTA abre página/checkout real por arquétipo. |
| P1 | Definir regra final de XP máximo | P | Alto | Rápido/lento batem com spec e testes. |
| P1 | Corrigir Voltar e XP por pergunta | M | Alto | Voltar não duplica evento nem infla XP. |
| P1 | Aplicar caps de scoring e normalização do radar | M | Alto | Scores finais e radar dentro dos limites. |
| P1 | Corrigir Marco 2 parcial | M | Alto | Preview tem formato e denominadores corretos. |
| P1 | Remover branco em desktop/tablet | P | Alto | Landing cobre 100vh sem área branca. |
| P1 | Ajustar contraste AA | P | Alto | axe sem `color-contrast` serious. |
| P1 | Corrigir analytics payload/deduplicação | M | Alto | Eventos completos e sem duplicidade. |
| P1 | Remover placeholders de prova social | P | Alto | Nenhum texto "a confirmar" em produção. |
| P2 | Melhorar foco por teclado | M | Médio | Fluxo inteiro navegável com teclado sem armadilhas. |
| P2 | Adicionar landmarks/H1 | P | Médio | axe sem landmark/H1 warnings principais. |
| P2 | Encurtar opções e microvalidações | M | Médio | Checagem de palavras passa 100%. |
| P2 | Ajustar timing de microvalidação | P | Médio | Timing bate com spec ou decisão documentada. |
| P2 | Implementar card compartilhável | G | Médio | Card com arquétipo, radar e branding gerado. |
| P3 | Adicionar favicon | PP | Baixo | Console sem 404. |

Legenda esforço: PP = muito pequeno, P = pequeno, M = médio, G = grande.

---

## 14. Critérios de aceite

Critérios globais:

- O quiz completo passa em 320px, 390px, 768px e desktop sem overflow e sem fundo branco.
- Todos os seis caminhos oficiais renderizam o arquétipo esperado.
- Tudo A, Tudo B, Tudo C, Tudo D e Alternado A/D têm comportamento documentado e coerente.
- Tudo A rápido e Tudo A lento geram XP dentro da regra oficial final.
- Voltar/reavançar não duplica `question_answered` nem altera XP indevidamente.
- Scores finais respeitam caps definidos no escopo.
- Radar final normaliza cada dimensão com denominador correto.
- Marco 2 não mostra denominadores impossíveis nem afirma dimensões completas indevidamente.
- CTA final leva a URL real e emite `cta_clicked` com `xpTotal` correto.
- Nenhum placeholder de venda/prova social aparece para o usuário.
- axe não retorna violações serious em landing, pergunta e resultado.
- Fluxo inteiro é navegável por teclado com foco visível e previsível.
- `prefers-reduced-motion: reduce` continua sem shimmer, pulse e confetti relevante.
- Analytics têm `sessionId`, source/UTM, tempos e deduplicação de abandono.

Critérios por achado:

| ID | Aceite |
|---|---|
| AUD-001 | URLs reais por arquétipo configuradas e testadas. |
| AUD-002 | Máximo de XP oficial reconciliado com código e testes. |
| AUD-003 | Voltar não duplica eventos nem infla XP. |
| AUD-004 | `calcScores` retorna scores finais capped. |
| AUD-005 | Radar usa denominador correto por dimensão. |
| AUD-006 | Marco 2 usa radar parcial real ou barras honestas com max correto. |
| AUD-007 | Landing cobre 100vh em 768/desktop. |
| AUD-008 | axe sem contraste serious. |
| AUD-009 | Eventos obrigatórios têm payload completo e sem duplicidade. |
| AUD-010 | Prova social real ou removida. |
| AUD-011 | Teclado completa o quiz sem focar Voltar como ação primária. |
| AUD-012 | `<main>`/H1/regions implementados. |
| AUD-013 | Limites de palavras passam automaticamente. |
| AUD-014 | Timing alinhado ao escopo ou documentado. |
| AUD-015 | Card compartilhável implementado ou escopo ajustado. |
| AUD-016 | Favicon resolvido. |

---

## 15. Plano de validação pós-ajustes

Validação estática:

1. Rodar `node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js`.
2. Rodar checagem de contagem de palavras para perguntas, opções e microvalidações.
3. Rodar simulação de scoring com caps reais, incluindo caminhos oficiais e extremos.
4. Revisar payloads de analytics por schema.

Validação navegada:

1. Abrir `http://localhost:5174/`.
2. Capturar screenshots em 320, 390, 768 e desktop para landing, Q1, Marco 2 e resultado.
3. Navegar os seis caminhos oficiais.
4. Navegar Tudo A rápido e Tudo A lento.
5. Testar Voltar entre Q1/Q2/Q3 e confirmar XP/eventos.
6. Testar CTA final e confirmar destino real.
7. Testar teclado completo: Tab, Shift+Tab, Space, Enter e setas nos radios.
8. Emular `prefers-reduced-motion: reduce` e confirmar ausência de shimmer/confetti/pulse.

Validação automatizada:

1. Rodar axe-core em landing, Q1, Marco 2 e resultado para 320, 390, 768 e desktop.
2. Rodar build Vite fora do sandbox que bloqueia esbuild e medir bundle gzip.
3. Conferir console sem erros relevantes, incluindo favicon.

Métricas pós-lançamento:

1. Taxa de início: landing -> Q1.
2. Drop-off por pergunta.
3. Tempo médio por pergunta e por bloco.
4. Taxa de conclusão Q1 -> resultado.
5. Tempo no resultado antes do CTA.
6. CTR do CTA por arquétipo.
7. Conversão por arquétipo.
8. Share rate do resultado.
9. Abandono por viewport e por reduced-motion.

