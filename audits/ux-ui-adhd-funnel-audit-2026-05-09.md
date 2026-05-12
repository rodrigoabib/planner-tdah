# Auditoria UX/UI — Quiz e Funil TDAH

**Projeto:** Quiz TDAH v1 (planner-tdah)
**Data:** 2026-05-09
**Auditado por:** ux-ui-adhd-funnel-auditor
**Versão auditada:** `quiz/quiz-tdah-v1.jsx` (state em 2026-05-09, dev server em http://localhost:5191/)
**Confiança geral:** Alta (código + navegação Playwright + axe-core 4.10.2 + cálculo de contrastes)

> **Escopo desta auditoria:** o quiz interativo (landing → 15 perguntas → 3 marcos → processamento → resultado) implementado em `quiz/quiz-tdah-v1.jsx`.
> A **landing page de venda** referenciada nos CTAs (`https://seusite.com.br/planner/<arquetipo>`) **NÃO existe ainda** — é placeholder no código. Por isso, esta auditoria audita o quiz inteiro e a transição do quiz para a landing, mas não pode auditar a landing de venda em si. Isso é tratado como problema **P0 estrutural** do funil.

> Esta auditoria complementa, sob lente ADHD/dark mode/conversão/ética, os relatórios `quiz-tdah-v1-handoff.md` e `quiz-tdah-v1_1-handoff.md`. Nenhum código foi alterado.

---

## 1. Resumo Executivo

### Qualidade geral da experiência

O quiz TDAH v1 é um produto bem mais maduro do que o v1.0 sugeria: existe landing dark com hook rápido, 15 perguntas semanticamente estruturadas (`fieldset`/`legend` + `<input type="radio">`), três marcos com micro-recompensa (XP + confete), tela de processamento com narrativa, resultado por arquétipo com radar Recharts, ponte de venda com bullets de fricção, disclaimer não-diagnóstico nas duas pontas, suporte a `prefers-reduced-motion`, eventos de analytics estruturados e CTA com `target="_blank"`. A navegação real em mobile (390×844) confirma os seis caminhos oficiais por arquétipo gerando o resultado certo, e o caminho A→A→A produz "O Furacão" como esperado.

A sensação geral é de um produto perto do lançamento, mas **bloqueado por dois problemas estruturais que destroem o funil inteiro**: (1) o destino de venda dos CTAs ainda é placeholder (`seusite.com.br`), e (2) o body do documento não tem background escuro, o que faz aparecer uma **faixa branca abaixo da landing em qualquer viewport ≥640px**, quebrando o contrato visual de dark mode no primeiro contato. Há ainda um conjunto consistente de violações de contraste em textos secundários — incluindo o **disclaimer ético, que é o texto mais legalmente importante da tela e está em 1.75:1** (praticamente invisível) — e uma copy que ainda usa "TDAH" como rótulo identitário ("Qual tipo de TDAH é o seu?") em vez de "perfil de funcionamento", o que tensiona a fronteira entre autoavaliação e diagnóstico.

### Principais riscos

- **Funil quebrado no momento de maior ativação** — CTA do resultado aponta para `https://seusite.com.br/...`, então o usuário convertido por um quiz de 5 minutos clica e cai em domínio inexistente.
- **Quebra visual de dark mode** — área branca abaixo da landing em tablet/desktop (`<body>` sem background, `<div>` com `minHeight:620`); contradiz o tom premium prometido em 0.4 segundos de exposição.
- **Disclaimer ético invisível** — "Este quiz mapeia padrões de perfil e não substitui avaliação profissional" em #3D3366 sobre #0A0818 = 1.75:1, abaixo de qualquer threshold; o texto que protege legalmente o produto é o que menos pode ser lido.
- **Linguagem diagnóstica no headline** — "Qual tipo de TDAH é o seu?" + "6 perfis de TDAH" + texto de processamento "perfis reais de adultos com TDAH" cruzam, em conjunto, a fronteira entre autoavaliação e identificação clínica, mesmo com disclaimer presente.
- **Marco 2 mostra denominador impossível** (`6/5 parcial` para Hiperatividade) e barra que ultrapassa 100% — quebra confiança no algoritmo no momento de recompensa intermediária.
- **Prova social ainda placeholder visível** — `47.382 pessoas já descobriram o seu` sem fonte e `[depoimento a confirmar com real]` aparecendo literalmente para o usuário.
- **Carga visual alta para um público que prometemos respeitar** — heading principal a 16.7:1 (potencial halação), múltiplas animações concorrentes (orb + shimmer + dpulse + float + confete), e um chip "⚡ XP" + "+15 XP ★" piscando que consome atenção da pergunta.

### Principais oportunidades

- **Cap de XP, normalização do radar e Marco 2 honesto** desbloqueiam credibilidade do algoritmo sem custo de produto perceptível — é trabalho técnico curto com impacto direto na confiança.
- **Fundo global escuro + ajuste de duas dúzias de tokens secundários para AA** elimina toda a aparência de "produto inacabado" sem mudar uma única decisão de design.
- **Reescrever o headline como "Como sua atenção funciona?"** (ou similar) e remover "TDAH" como rótulo identitário das telas resolve o risco ético sem perder conversão — pesquisa de copy ADHD mostra que "perfil de funcionamento" performa igual ou melhor.
- **Preencher os ctaUrl reais de venda + remover placeholders de prova social** transforma o resultado de "demo bonito" em "asset de receita" sem nenhuma mudança de UI.
- **Usar a biblioteca de personalização que já existe** (`reco`, `cost`, `bridge` por arquétipo) na landing de venda externa, em vez de construí-la do zero — a "memória do quiz" é o que torna a venda inevitável.

### Impacto provável na experiência de pessoas com TDAH

A linha do tempo do quiz é **bem desenhada para retenção TDAH**: marcos a cada 5 perguntas, micro-recompensa imediata (validação + XP), feedback de seleção tátil-visual, copy validante (não culpabilizante) e timing dopaminérgico (`+5 XP` por velocidade). Isso explica porque o quiz se completa em ~3-5 minutos sem grande sensação de esforço.

Os pontos de maior risco de abandono e desconforto cognitivo são, em ordem: (1) **o flash branco abaixo da landing**, que sinaliza "produto quebrado" antes do CTA receber atenção; (2) **a microvalidação que aparece imediatamente** (sem delay de 0,5s) seguida do botão Próxima em apenas 900ms — usuários sensíveis perdem a recompensa emocional antes de processá-la; (3) **a densidade de animação concorrente na landing** (2 orbs + shimmer da progress + float de XP + confete em marcos) que consome atenção que deveria ir para a leitura; (4) **a inconsistência de Marco 2** (`6/5 parcial`), que para um usuário ansioso sinaliza "esse algoritmo não está pronto"; e (5) **o teclado**, onde Tab cai no botão Voltar antes da primeira opção da Q2 — fricção real para quem usa teclado por preferência ou necessidade.

### Impacto provável na conversão

O quiz **converte em curiosidade**. O resultado **converte em desejo** (a copy de arquétipo é forte e os bullets de fricção respondem objeções básicas). Mas o funil **não converte em receita** porque o link de checkout é placeholder. Esse é o gargalo único e absoluto. Em segundo plano, a confiança do usuário cético está sendo consumida por: (a) prova social não validada (`47.382` sem fonte, `[depoimento a confirmar com real]` literal), (b) `cta_clicked.xpEarned` enviando soma de scores em vez de XP (analytics enganoso), (c) `quiz_abandoned` duplicado por `beforeunload` + `visibilitychange`, e (d) Marco 2 com label impossível. Cada um desses sozinho é pequeno; em conjunto sinalizam "produto antes da hora", o que reduz CTR no CTA mesmo quando ele estiver funcionando.

---

## 2. Diagnóstico Geral

| Dimensão | Nota | Justificativa |
|---|---:|---|
| Clareza visual | 7/10 | Hierarquia funciona; brand colors são distintivos; faixa branca em ≥640px e densidade de animações na landing tiram pontos. |
| Legibilidade | 5/10 | Heading e CTA excelentes; **6 tokens secundários falham AA**, incluindo o disclaimer (1.75:1). |
| Dark mode | 6/10 | Paleta `#0A0818` é confortável; cards com elevação (`#120F2D`) corretos; mas heading 16.7:1 risco halação, glow em múltiplos elementos, body sem bg global. |
| Contraste (acessibilidade) | 4/10 | Axe acusa serious em 3 elementos da landing e 7 do resultado; disclaimer ético em 1.75:1; cost text em 4.46:1 (limítrofe). |
| Hierarquia visual | 7/10 | Boa nas perguntas e no resultado; landing tem 3 contadores (`~5 / 15 / 6`) que competem brevemente com o CTA. |
| Baixa carga cognitiva | 6/10 | 1 ação principal por tela ✅; 4 opções ✅; mas múltiplas animações simultâneas e textos longos em 13 opções (>8 palavras). |
| Experiência para TDAH | 7/10 | Marcos, XP, micro-validação, copy acolhedora, reduced-motion presente; perde por densidade animada e `quiz_abandoned` precoce em troca de aba. |
| Quiz UX | 7/10 | Radios semânticos ✅, fieldset ✅, progress visível ✅; teclado ainda imprevisível e Voltar bug XP. |
| Landing page de venda | 0/10 | **Não existe.** CTAs apontam para `seusite.com.br` placeholder. |
| Conversão | 4/10 | Boa identificação no resultado; ponte boa; CTA quebrado, prova social placeholder, analytics com bug em XP. |
| Ética da comunicação | 5/10 | Disclaimer presente nas duas telas; **mas headline e copy de processamento usam "TDAH" como categoria identificatória** e disclaimer está em 1.75:1 — efetivamente invisível. |

**Nota geral:** **5.5/10** — produto bem desenhado, em fase final, com bloqueador único de funil (CTA placeholder) e dois bloqueadores éticos discretos (disclaimer invisível + linguagem diagnóstica no hook).

---

## 3. Pontos Fortes

- **Estrutura semântica do quiz** (`quiz-tdah-v1.jsx:286-315`): `<fieldset>`/`<legend>` com `<input type="radio">` real, `aria-label` na opção, `disabled` para opções não escolhidas, `aria-live="polite"` na microvalidação. Isso é raro em quizzes JSX construídos rapidamente.
- **Dark mode com elevação correta**: background `#0A0818` é cinza-escuro confortável (não preto puro), cards usam `#120F2D` (mais claros que o bg) — princípio de elevação por luminosidade respeitado.
- **Reduced motion respeitado** (`quiz-tdah-v1.jsx:54-57`): `@media (prefers-reduced-motion: reduce)` desativa shimmer, `Confetti` checa `prefersReducedMotion()` antes de renderizar partículas.
- **Marcos com micro-recompensa intencional** (`quiz-tdah-v1.jsx:332-389`): "Traço detectado!" → "Perfil em formação!" → "Quiz completo!" entrega ritmo dopaminérgico clássico para TDAH; o card central com `+25 XP · Marco Desbloqueado!` é uma excelente alavanca de retenção.
- **6 arquétipos com identidade forte**: nome + símbolo + tag + cor distinta, todos com `reco`/`cost`/`bridge` específicos. É o ativo mais valioso do produto.
- **Copy acolhedora dentro do quiz**: microvalidações como "Paralisia de iniciação não é preguiça — é o sistema de ativação executiva operando diferente" (`quiz-tdah-v1.jsx:72`) reframam comportamento sem culpabilizar.
- **CTA primário com contraste excelente** (texto `#0A0818` sobre `#F0B429` = 10.62:1) — destaca-se inequivocamente.
- **Botão Voltar até Q14** existe e passa por handler explícito (`quiz-tdah-v1.jsx:651-666`).
- **Analytics estruturado** com 8 eventos plausíveis (`quiz_started`, `question_answered`, `milestone_reached`, `quiz_completed`, `result_viewed`, `cta_clicked`, `quiz_abandoned`, `share_clicked`) e helper `trackQuizEvent` plugável.
- **Compartilhamento via `navigator.share`** (com fallback de não exibir o botão se a API não existe) — gesto correto.

---

## 4. Problemas Críticos (P0–P1)

| Prioridade | Tela / Componente | Problema | Evidência | Por que importa | Impacto TDAH | Impacto Conversão | Recomendação |
|---|---|---|---|---|---|---|---|
| **P0** | Resultado — CTA primário | CTA aponta para domínio placeholder `https://seusite.com.br/planner/<arquetipo>` | `quiz-tdah-v1.jsx:120,125,131,137,143,149`; navegação real em 2026-05-09 confirmou `ctaHref: https://seusite.com.br/planner/furacao` | Quiz 100% funcional sem destino real = funil sem receita | Crítico — momento de maior ativação após 15 perguntas é desperdiçado | Crítico — bloqueia toda monetização | Configurar URLs reais por arquétipo (ou rota interna `/checkout/<id>`); manter `cta_clicked` antes da navegação |
| **P0** | Landing / Quiz / Resultado — Layout global | `<body>` e `<html>` sem background; cada tela é container `#0A0818` com `minHeight` fixo (620/600px) → faixa branca abaixo em viewport ≥640px | `quiz-tdah-v1.jsx:208`, `:690`; navegação real em 768px e desktop confirmou `bodyBg: rgba(0,0,0,0)`, `bodyHeight=620` em viewport 844 | Quebra contrato visual de dark mode no primeiro segundo | Alto — sinaliza "produto quebrado" para usuário sensível à incoerência visual | Alto — drop-off de credibilidade em desktop/tablet (anúncio Instagram pode abrir em qualquer viewport) | Aplicar `background:#0A0818` em `html, body, #root` no `index.html`; usar `min-height:100vh` nas telas raiz |
| **P0** | Landing / Resultado — Disclaimer ético | "Este quiz mapeia padrões de perfil e não substitui avaliação profissional" em `#3D3366` sobre `#0A0818` = **1.75:1** (axe `serious` no resultado; cálculo manual confirma) | `quiz-tdah-v1.jsx:234,527`; análise de contraste manual + axe-core | É o texto que protege legalmente o produto e o que mais precisa ser lido | Crítico — usuário em estado emocional pós-quiz não tem barreira ética visível | Médio — risco legal e regulatório se quiz for interpretado como diagnóstico | Elevar para `#9892C4` (≥4.5:1) ou aumentar tamanho para 13px e usar `#7B73B8` (≥4.5:1 em large text) |
| **P0** | Landing — Headline e copy de hook | Headline "Qual tipo de TDAH é o seu?" e bullets "6 perfis" + processamento "perfis reais de adultos com TDAH" enquadram o quiz como mapeamento de tipo de TDAH (categórico), não como mapeamento de funcionamento | `quiz-tdah-v1.jsx:216-218,223,394`; ver guia ético seção 1 | Mesmo com disclaimer, headline cruza fronteira diagnóstica | Alto — usuários ainda em busca de entender se "têm" TDAH podem confundir resultado com identificação clínica | Médio — risco regulatório (CFM/CFP) e de queixa formal | "Qual é o seu padrão de atenção?" / "Como sua atenção funciona?" + "6 padrões de funcionamento"; remover "TDAH" como rótulo identitário do hook |
| **P1** | Marco 2 — Preview parcial | Mostra `D: 6/6`, `H: 6/5`, `I: 6/6`. **`6/5` é matematicamente impossível** e a barra ultrapassa 100% visualmente | `quiz-tdah-v1.jsx:340` (`partialMax={D:6,H:5,I:6}`); screenshot `audit-2026-milestone2-390.png` confirma `H: 6/5` | Quebra credibilidade no algoritmo no momento de recompensa intermediária | Alto — usuário cético usa esse momento para decidir continuar/abandonar | Alto — reduz disposição de seguir até resultado e clicar CTA | Recalcular `partialMax` real por dimensão (incluindo secundários) ou implementar radar parcial conforme escopo `:264-289` |
| **P1** | Resultado — Prova social | Testemunho mostra literal `[depoimento a confirmar com real]` para o usuário; landing exibe `47.382 pessoas já descobriram o seu` sem fonte | `quiz-tdah-v1.jsx:233,505`; navegação real confirma string visível | Marca de produto inacabado no momento do CTA | Médio — usuários TDAH com tendência a desconfiar de marketing identificam padrão | Alto — sinaliza "fake testimonial" e reduz CTR | Substituir por depoimento real, remover número até haver dado, ou marcar internamente sem exibir placeholder |
| **P1** | Quiz — Scoring sem cap | `calcScores` soma cru pontos secundários; spec diz cap 11 para D/A/E e 9 para H/I; código não aplica cap | `quiz-tdah-v1.jsx:157-164`; navegação Tudo A gera `xpEarned: 325` (vs spec 300 max) e radar denominador `/11` para todas dimensões (`quiz-tdah-v1.jsx:435-439`) | Radar pode mostrar valores impossíveis e XP máximo varia entre código e spec | Médio — Hiperatividade/Impulsividade visualmente subestimadas no radar | Médio — métricas de XP/análise por dimensão ficam inconsistentes | Aplicar cap em `calcScores` (D/A/E ≤11, H/I ≤9); usar denominador correto por dimensão no radar |
| **P1** | Quiz — Botão Voltar bug | Voltar deleta resposta da pergunta errada (`na[prevQ.id+1]`) e recalcula XP por subtração fixa de 10, criando duplicação de eventos e XP inflado/deflado | `quiz-tdah-v1.jsx:651-666`; teste documentado em v1.1 handoff `:188` (XP 15→5→20 ao voltar+avançar Q1) | Voltar uma pergunta corrompe estado de scoring/XP/analytics | Médio — usuário rápido ou de teclado bagunça progresso sem perceber | Médio — analytics polui drop-off por pergunta; usuário pode "ganhar" XP que não deveria | Armazenar `xpDelta` por pergunta no `ansRef`; ao voltar, apenas remover delta da pergunta correta; sem reenviar evento se resposta não mudou |
| **P1** | Acessibilidade — Contraste de tokens secundários | Axe acusa **serious** em 3 elementos da landing (`minutos`/`perguntas`/`perfis` em `#6B62A8` = 3.71:1) e em 7 elementos do resultado (incluindo "MAPA DE PERFIL TDAH" em 2.14:1, custo em 4.46:1, "Refazer/Compartilhar" em 3.71:1) | `quiz-tdah-v1.jsx:226,232,458,486,505,527,530,540`; axe-core 4.10.2 em 2026-05-09 | Texto secundário ilegível para baixa visão e em luz forte (mobile) | Alto — perde "minutos/perguntas/perfis" (set de expectativa) e "Refazer" (alívio cognitivo) | Médio — labels de tempo/origem/disclaimer pode passar despercebido | Sweep de tokens: `#6B62A8`→`#9892C4` (≥4.5:1), `#4A4480`→`#8079A8`, `#9B7070`→`#C49B9B` |
| **P1** | Acessibilidade — Landmarks e H1 | Axe em landing: `landmark-one-main` (1) + `region` (6); na tela de quiz não existe `<h1>` (só `<legend>`); apenas a tela de resultado tem `<h1>` | Navegação real: `hasMain: false`, `h1Count: 0` em quiz, `h1Count: 1` em resultado | Tecnologia assistiva não consegue navegar regiões; usuário cego perde estrutura | Médio — usuários com leitor de tela têm fricção alta em todo fluxo | Baixo direto, mas amplia rejeição de público acessível | Envolver `App` em `<main>`; H1 visualmente discreto ou `visually-hidden` em cada tela do quiz |
| **P1** | Quiz — Foco por teclado imprevisível | Após selecionar opção, foco continua no input; `Próxima` aparece mas não recebe foco; em Q2+, primeiro Tab cai em **Voltar** antes da primeira opção | `quiz-tdah-v1.jsx:278-280` (Voltar antes do fieldset); `quiz-tdah-v1.jsx:323-325` (sem `autoFocus` no Próxima) | Quebra fluxo de teclado de forma traiçoeira | Médio-Alto — usuário ansioso ou de teclado pode acionar Voltar sem querer | Médio — abandono em desktop/teclado | Mover Voltar para canto superior do header ou após o fieldset; foco programático em Próxima após delay de validação |
| **P1** | Analytics — `cta_clicked.xpEarned` errado e `quiz_abandoned` duplicado | `cta_clicked` envia soma dos scores como `xpEarned` em vez de XP real; `beforeunload` + `visibilitychange` disparam ambos `quiz_abandoned` ao trocar aba | `quiz-tdah-v1.jsx:519` (usa `Object.values(scores).reduce(...)`); `:568-578` (dois listeners disparando mesmo evento) | Métricas-chave de funil ficam corrompidas | — | Alto — decisões de otimização (CAC, ROI) baseadas em dados errados | Passar `xp` (estado real) ao `cta_clicked`; debounce ou flag de "já enviado" no `quiz_abandoned` |

---

## 5. Problemas Médios e Menores (P2–P3)

### P2 — Melhorias importantes

| Prioridade | Tela / Componente | Problema | Evidência | Recomendação |
|---|---|---|---|---|
| P2 | Quiz — Microvalidação imediata | `setShowV(true)` é instantâneo após `onSel`; spec pede 0,5s de delay e botão após +1s | `quiz-tdah-v1.jsx:580-584` (`setTimeout(...,900)` para Próxima, V imediata) | Atrasar V em 400-500ms para criar respiro emocional; ou validar A/B |
| P2 | Quiz — Densidade de animação na landing | 2 orbs (`orb 7s/9s`) + shimmer da progress + float XP + dpulse no current step + bIn/sl/fi/ru em transições — **5+ animações simultâneas** em landing | `quiz-tdah-v1.jsx:209-210,42,247,263,37,38,30` | Manter 1-2 elementos animados por tela; remover orbs ou reduzir opacidade em 50% |
| P2 | Resultado — Heading principal contraste exagerado | `#EDE9FF` (próximo de branco) sobre `#0A0818` = **16.69:1** — risco de halação em mobile/luz baixa | `quiz-tdah-v1.jsx:215`; cálculo manual | Reduzir para `#D8D2F0` ou `#C4BFF0` (8-12:1) — mais confortável para sessão prolongada |
| P2 | Quiz/Marco — Teaser pode passar despercebido | `teaser` é renderizado como parágrafo `font-size:12px color:#6B62A8` (mesma cor que falha AA) por 2,2s | `quiz-tdah-v1.jsx:697-701` | Elevar contraste para ≥4.5:1 e/ou aumentar duração para 3s |
| P2 | Copy — 13 opções acima de 8 palavras | Q4A, Q5A, Q6A/B/C, Q7A, Q8A, Q9B, Q10A/D, Q14A, Q15A/C; Q3A e Q9A microvalidação >15 palavras | `quiz-tdah-v1.jsx:60-108`; spec `:1264-1272` | Encurtar mantendo comportamento concreto (ex.: Q10A "Muito — o medo me paralisa") |
| P2 | Copy — Termos clínicos sem contexto | Microvalidações usam "RSD", "funções executivas", "memória prospectiva", "circuito de freio executivo" sem definição | `quiz-tdah-v1.jsx:74,72,93,68` | Substituir por equivalentes comportamentais ("sensibilidade à crítica", "iniciar tarefas") ou tooltips |
| P2 | Header — `XP` chip e float concorrem com pergunta | `⚡ XP` em `#F0B429 textShadow:0 0 10px` + float `+15 XP ★` com glow + `dc` (dpulse) no current step — três elementos animados acima da pergunta | `quiz-tdah-v1.jsx:251,247,264` | Float OK, mas reduzir glow do chip XP (textShadow opcional) e remover `dc` ou diminuir intensidade |
| P2 | Marco 1 — Texto secundário ilegível | "Seu cérebro processa o mundo de uma forma bem específica..." em `#4A4480` sobre `#120F2D` = **2.15:1** | `quiz-tdah-v1.jsx:380`; screenshot `audit-2026-milestone1-390.png` confirma texto fantasma | Elevar para `#7B73B8` (4.6:1) ou remover esse parágrafo (`m.body`) — Marco 2 já não tem |
| P2 | Resultado — Compartilhamento sem card visual | `navigator.share` envia URL `https://seusite.com.br/quiz-tdah` (placeholder) sem imagem; spec pede card visual com símbolo, nome, radar | `quiz-tdah-v1.jsx:533-538`; spec `:1121-1136` | Trocar URL para destino real ou ocultar botão até ter destino; adicionar geração de OpenGraph/Twitter card por arquétipo |
| P2 | UX — `quiz_abandoned` em troca de aba | Trocar aba durante o quiz dispara `visibilitychange` → `handleAbandon` mesmo se usuário volta logo | `quiz-tdah-v1.jsx:574` | Usar timeout de 30-60s antes de marcar abandono por `visibilitychange` |
| P2 | Copy — "847 padrões comportamentais" / "perfis reais" | Tela de processamento usa números pseudo-precisos sem fonte | `quiz-tdah-v1.jsx:393` | Trocar por copy comportamental: "Cruzando seu padrão com 6 perfis...", "Mapeando suas dimensões..." |

### P3 — Refinamentos

| Prioridade | Tela / Componente | Problema | Evidência | Recomendação |
|---|---|---|---|---|
| P3 | `index.html` — Sem favicon | Console acusa 404 `/favicon.ico` no carregamento | `quiz/index.html:1-13` | Adicionar `<link rel="icon">` (mesmo que SVG inline com símbolo do quiz) |
| P3 | Resultado — Ícone "→" em recos sem contraste explícito | `→` herda cor do arquétipo; em arquétipos de cor pastel (Vulcão, Camaleão) pode ficar abaixo de 3:1 | `quiz-tdah-v1.jsx:476` | Elevar opacidade ou usar cor de acento dessaturada |
| P3 | Acessibilidade — `aria-label` redundante | `<input aria-label={opt.t}>` + `<label>` ao redor: dupla anunciação para leitor de tela | `quiz-tdah-v1.jsx:305` | Remover `aria-label` (label nativo já cumpre a função) |
| P3 | Copy — "Próxima" → "Próxima pergunta" | CTA dentro do quiz é genérico; pode ser mais específico | `quiz-tdah-v1.jsx:325` | "Próxima pergunta →" ou "Confirmar e continuar →" |
| P3 | Performance — Fontes de CDN | 3 imports `@fontsource/*` via CDN em runtime; cada CSS faz network round-trip | `quiz-tdah-v1.jsx:17-19` | Mover para `<link rel="preload">` no `index.html` ou bundle local |

---

## 6. Auditoria Tela por Tela

---

### Tela: Landing do quiz

**Objetivo da tela:** converter visitante de anúncio Instagram em participante do quiz, em 5 segundos de atenção.

**O que funciona:**
- Hook claro com headline gigante e gradient brand
- 3 contadores (`~5 / 15 / 6`) setando expectativa correta de duração
- CTA `Descobrir meu perfil →` é ação verbal específica
- Disclaimer não-diagnóstico está presente abaixo
- Touch target do CTA: 49px de altura (acima de 44px) ✅
- Background `#0A0818` é dark gray confortável (não preto puro)

**O que atrapalha:**
- Headline usa "TDAH" como categoria identificatória (ético, ver P0)
- 2 orbs animados (`orb 7s/9s`) + 5+ animações de entrada escalonadas
- Labels "minutos/perguntas/perfis" (#6B62A8) **falham AA** (3.71:1) — informação de set de expectativa fica fantasma
- Disclaimer (#3D3366) **invisível** (1.75:1)
- Prova social `47.382 pessoas` sem fonte
- **Faixa branca abaixo da landing em qualquer viewport ≥640px** (body sem bg)

**Riscos cognitivos (TDAH):**
- 2 orbs pulsando + 6 elementos com fade-in escalonado: cérebro TDAH gasta atenção tentando localizar o ponto-foco
- Os 3 contadores estão em linha entre subtítulo e CTA; competem brevemente com o CTA por foco

**Riscos visuais:**
- Headline `#EDE9FF` em texto gigante = potencial halação em luz baixa
- Faixa branca = ruptura visual abrupta em desktop/tablet

**Riscos comerciais:**
- Promessa "perfil único em 15 perguntas" cumprida pelo quiz, mas "sistema feito para o SEU cérebro" implica produto pronto — falso quando o CTA cai em domínio inexistente
- "47.382 pessoas" é o tipo de número que atrai escrutínio TDAH

**Recomendações:**
1. Reescrever H1 para "Qual é o seu padrão de atenção?" e subhead "Descubra seu perfil de funcionamento em 15 perguntas"
2. Aplicar `background:#0A0818` global em html/body/#root
3. Remover ou reduzir opacidade dos orbs (de .2 para .08)
4. Elevar labels para `#9892C4` (≥4.5:1)
5. Disclaimer `#9892C4` ou aumentar para 13px e usar cor `#7B73B8`
6. Trocar `47.382 pessoas` por número real ou remover

---

### Tela: Quiz (Q1-Q15)

**Objetivo da tela:** capturar resposta única em ≤10s sem fricção, com micro-recompensa.

**O que funciona:**
- Estrutura semântica (`fieldset`/`legend` + `<input type="radio">`) ✅
- Estados visuais distintos (default/hover/selecionado/disabled das outras opções) ✅
- Microvalidação aparece (`💡 ...`) com `aria-live="polite"` ✅
- Touch targets das opções: ~67px de altura ✅
- Header sticky com progresso visível
- Header mostra `Pergunta X de 15 · NN%` (corrigido vs v1.0)
- Botão Voltar discreto e contextual (Q2-Q14)

**O que atrapalha:**
- Microvalidação aparece **imediatamente** (sem delay de 0,5s); botão Próxima em 900ms — para sensíveis, recompensa emocional escapa antes de processar
- Texto de opção `#897FC0` sobre `#120F2D` = 5.18:1 (passa AA, mas "letra A/B/C/D" no chip lateral é `#4A4480` em `#251E5C` ≈ 2:1, falha)
- Opções 3 (`isOth`) ficam em `opacity:.42` — texto efetivo vai abaixo de 3:1
- Sem `<h1>` na tela; tecnologia assistiva navega menos confortavelmente
- Sem `<main>`/`<header>`/`<nav>` landmarks
- Foco por teclado: Tab cai em Voltar antes da primeira opção (Q2+)
- Bug: botão Voltar duplica eventos e infla/deflaciona XP

**Riscos cognitivos (TDAH):**
- Header tem 5 elementos visuais simultâneos: ⚡XP chip (com glow + textShadow), label "Pergunta", barra com shimmer animado, 15 dots (1 em `dc` pulse) — concorre com a pergunta
- Microvalidação + Próxima aparecendo no mesmo frame = double stimulus

**Riscos visuais:**
- Letra do chip lateral (A/B/C/D) é dificil de distinguir quando opção não está selecionada
- Float `+15 XP ★` glow amarelo passa por cima do header — pode ser perdido se o usuário estava olhando para a opção

**Riscos comerciais:**
- Voltar bug pode fazer o usuário ver XP cair (frustrante) ou subir além do esperado (suspeito)
- Prog "Pergunta 1 de 15 · 7%" — `7%` parece micro-progresso; spec sugeria "Pergunta atual" (1/15 = 6.6%, mas perceptivo é diferente)

**Recomendações:**
1. Atrasar microvalidação em 400ms para criar respiro
2. Mover botão Voltar para o canto superior do header ou para depois do fieldset (não focar antes da pergunta)
3. Foco programático em Próxima após validação aparecer
4. Elevar contraste do chip (A/B/C/D) ou usar checkmark visual para todas as opções
5. Adicionar `<main>` envolvendo App e `<h1 className="visually-hidden">` por pergunta
6. Reduzir glow do chip XP (textShadow opcional) e do current step (`dc`)
7. Corrigir bug do Voltar (delta XP por pergunta, sem duplicar evento)

---

### Tela: Marco 1 ("Traço detectado!")

**Objetivo da tela:** entregar dopamina de meio-quiz, validar continuidade.

**O que funciona:**
- Card centralizado com elevação correta (`#120F2D` sobre `#0A0818`)
- Confete celebrativo (com `prefers-reduced-motion` respeitado)
- XP badge "+25 XP · Marco Desbloqueado!" em chip dourado
- Emoji 🧠 com `dpulse` chama atenção sem ser agressivo
- CTA "Continuar (10 perguntas) →" descreve esforço restante
- Tom da copy validante ("seu cérebro processa o mundo de uma forma bem específica")

**O que atrapalha:**
- Texto secundário "Seu cérebro processa o mundo..." em `#4A4480` sobre `#120F2D` = **2.15:1** — quase invisível (visível no screenshot só se forçar)
- Subtítulo "Suas primeiras 5 respostas revelam um padrão claro" também em texto secundário
- Faixa branca abaixo do card em viewport ≥640px (mesmo bug do body)
- Dpulse no emoji + confete = animação concorrente

**Riscos cognitivos (TDAH):**
- Confete é forte para reduced-motion; bem feito que respeita `prefersReducedMotion()`
- Mensagem "10 perguntas" é honesta mas pode ser desmotivante para usuário que pensava estar mais perto

**Riscos visuais:**
- Texto fantasma (`#4A4480`) faz a copy importante (validação do padrão) ser perdida

**Riscos comerciais:**
- Card honesto e bem feito; baixo risco

**Recomendações:**
1. Elevar `#4A4480` → `#9892C4` no body do milestone
2. Considerar trocar "Continuar (10 perguntas) →" por "Continuar — 10 perguntas restantes →"
3. Aplicar bg global escuro

---

### Tela: Marco 2 ("Perfil em formação!")

**Objetivo da tela:** entregar preview de profundidade, criar antecipação de resultado.

**O que funciona:**
- CTA "Desbloquear meu perfil →" com forte verbo de ação
- Mostra D/H/I/A/E como conceito (preview parcial + 2 bloqueados)
- Cor turquesa `#21C9D0` distintiva
- Cadeados nos 2 bloqueados criam antecipação

**O que atrapalha:**
- **Bug crítico:** mostra `Hiperatividade 6/5 parcial` — denominador < numerador é matematicamente impossível
- Barra de Hiperatividade ultrapassa 100% visualmente
- `partialMax={D:6,H:5,I:6}` em `quiz-tdah-v1.jsx:340` está incorreto: D pode chegar a 7+ contando secundários
- Não é o radar parcial que a spec descreve

**Riscos cognitivos (TDAH):**
- Usuário cético percebe a inconsistência e questiona o quiz inteiro
- "6/6" em Desatenção e Impulsividade pode parecer "máximo absoluto" e enviesar resultado esperado

**Riscos visuais:**
- Barra ultrapassando container em mobile cria "rasgo" visual

**Riscos comerciais:**
- Quebra confiança no algoritmo no momento exato em que usuário decide se vai até o fim

**Recomendações:**
1. Recalcular `partialMax` por dimensão considerando secundários (e clamp visual em 100%)
2. OU implementar radar parcial real conforme spec `:264-289`
3. OU rotular como "amostra parcial" com denominador real de perguntas respondidas, não scores

---

### Tela: Processamento

**Objetivo da tela:** dar percepção de personalização profunda em 4-5s.

**O que funciona:**
- Spinner duplo (oposite rotation) é tecnicamente bonito e respeita reduced-motion (animation duration vai a 0.01ms)
- 4 mensagens sequenciais simulam computação real
- Barra de progresso preenche linearmente
- Emoji 🧠 central como âncora visual

**O que atrapalha:**
- "847 padrões comportamentais" e "perfis reais de adultos com TDAH" são números/claims pseudo-precisos sem base
- Tempo total ~4.6s pode ser percebido como longo demais por usuário hiperativo (TDAH explorador)
- Sem botão "saltar processamento" para quem não quer drama

**Riscos cognitivos (TDAH):**
- Spinner + emoji + texto se trocando + barra = 4 elementos em movimento simultâneo
- "Padrões comportamentais" + "perfis reais" tem cheiro de marketing, não de processamento real

**Riscos visuais:**
- Bem composto, mas hierarquia atrasa a leitura

**Riscos comerciais:**
- "Cruzando com perfis reais" pode ser interpretado como "comparando com banco clínico" — risco ético leve

**Recomendações:**
1. Reescrever mensagens para serem comportamentais e honestas: "Cruzando suas respostas com 6 padrões...", "Mapeando suas 5 dimensões...", "Identificando seu padrão dominante...", "Pronto — seu perfil está esperando"
2. Reduzir tempo total para ~3s (manter 4 mensagens com 750ms cada)

---

### Tela: Resultado

**Objetivo da tela:** entregar identificação emocional + bridge para a venda.

**O que funciona:**
- Símbolo + nome + tagline criam identidade marcante (cada arquétipo é distinguível visualmente)
- Radar Recharts entrega visualização da personalidade
- 3 bullets "Você é assim" são específicos e validantes
- Bloco "O que isso te custa" usa tom honesto sem culpabilizar
- Bridge personalizada por arquétipo conecta perfil → necessidade de planner
- 4 bullets de fricção (entrega, compatibilidade, garantia, autoria) respondem objeções
- CTA primário em laranja-amarelo destaca-se inequivocamente
- Botões secundários "Refazer" e "Compartilhar" presentes
- Tem `<h1>` ✅

**O que atrapalha:**
- **CTA aponta para `seusite.com.br/planner/<arquetipo>`** — placeholder
- "[depoimento a confirmar com real]" visível literalmente
- Disclaimer ético em **1.75:1** (axe `serious`)
- Cost text "#9B7070" em 4.46:1 (limítrofe AA)
- Botões "Refazer" e "Compartilhar" em `#6B62A8` = 3.71:1 (axe `serious`)
- "MAPA DE PERFIL TDAH" label em 2.14:1 (axe `serious`)
- Símbolo do arquétipo com `textShadow: 0 0 36px ${co}70` — glow forte
- 5 blocos verticais antes do CTA — scroll considerável em mobile

**Riscos cognitivos (TDAH):**
- Tela longa (~1590px em mobile) sem âncora interna; usuário pode não chegar ao CTA
- Bridge text em parágrafo único de 4-5 linhas — longo demais para escanear

**Riscos visuais:**
- Glow do símbolo + radar com fillOpacity 0.28 + bridge com `borderLeft:4px` colorida + cost em vermelho — paleta de cores compete por atenção

**Riscos comerciais:**
- **Funil quebrado** — clique no CTA cai em domínio inexistente
- Placeholder de testemunho destrói confiança
- "Refazer" e "Compartilhar" em mesmo nível visual — usuário pode escolher Refazer e perder o momento de compra
- Nada conecta o resultado do quiz (símbolo, cor, bridge) à landing de venda externa

**Recomendações:**
1. Configurar URLs reais por arquétipo (P0)
2. Substituir testimonial placeholder por real, ou ocultar
3. Elevar disclaimer para `#9892C4` (≥4.5:1)
4. Sweep de tokens secundários (`#9B7070`, `#6B62A8`, `#4A4480`, `#3D3366`) para AA
5. Reduzir glow do símbolo (textShadow opacidade .4 → .2)
6. Adicionar âncora "Pular para o planner →" no topo (atalho para CTA) para usuários que confiam no resultado e querem acelerar
7. Mover "Refazer" para baixo do footer; manter "Compartilhar" próximo do CTA

---

### Seção: Landing page de venda externa (`https://seusite.com.br/planner/<arquetipo>`)

**Objetivo da seção:** converter perfil identificado em compra do planner personalizado.

**O que funciona:**
- (não auditável — landing não existe ainda)

**O que atrapalha:**
- **A landing não existe** — domínio é placeholder em todos os 6 ctaUrl
- Sem essa landing, todo o funil é ornamental

**Riscos cognitivos (TDAH):**
- Click → 404 = quebra absoluta da impulsão dopaminérgica gerada pelo quiz
- Usuário com baixa frustração não retorna

**Riscos visuais:**
- N/A

**Riscos comerciais:**
- 100% dos leads convertidos pelo quiz são perdidos

**Recomendações:**
1. Construir 6 landings ou 1 landing com bloco condicional por arquétipo (`?perfil=furacao`)
2. Cada landing deve referenciar: símbolo + cor + nome do arquétipo, recap dos 3 bullets "você é assim", bridge text, features específicas do planner para o perfil, prova social compatível com o perfil, CTA único de checkout
3. Manter exatamente o mesmo dark mode, mesma paleta, mesma tipografia (Syne/Nunito/Space Mono) que o quiz
4. Pix + Cartão (mercado BR), garantia 7 dias visível antes do botão de compra
5. CTA `Quero meu Planner [Arquétipo] por R$XX` (ação + benefício + preço)

---

## 7. Auditoria de Dark Mode

### Avaliação da paleta

| Token / Variável | Valor | Avaliação |
|---|---|---|
| Background principal | `#0A0818` | **Bom** — cinza-escuro com matiz violeta sutil; não é preto puro; confortável |
| Superfície de card | `#120F2D` | **Bom** — mais claro que bg (elevação correta por luminosidade) |
| Borda card | `#251E5C` | **OK** — visível, não muito intenso |
| Texto principal | `#EDE9FF` | **Limítrofe** — quase branco; contraste 16.7:1 — **risco de halação em mobile** |
| Texto subtítulo | `#897FC0` | **Bom** — 5.52:1 vs bg |
| Texto secundário | `#6B62A8` | **Falha** — 3.71:1 vs bg (axe serious) |
| Texto disabled/discreto | `#4A4480` | **Falha grave** — 2.29:1 vs bg, 2.15:1 vs card |
| Texto disclaimer | `#3D3366` | **Falha crítica** — 1.75:1 vs bg, **abaixo de qualquer threshold** |
| Texto badge | `#C4B5FD` | **Bom** — 10.72:1 vs bg |
| Acento primário (CTA) | `#F0B429`/`#F97316` | **Excelente** — gradiente quente sobre bg violeta-escuro = altíssima legibilidade |
| Acento secundário (botão Próxima) | `#7B5EA7`/`#6D28D9` | **OK** — destaca-se mas é parte da paleta brand |
| Cor erro/custo | `#F87171` | **OK** em label; texto interno `#9B7070` falha 4.46:1 |
| Cor verde sucesso | `#6EE7B7` | **Bom** — bullets de fricção visíveis |
| Cor turquesa | `#21C9D0` | **Bom** — usado funcionalmente em Marco 2 |

### Análise detalhada

**Contraste:** o produto opera em **dois extremos perigosos simultâneos** — heading principal em 16.7:1 (excessivo, halação) e disclaimer/secundários em 1.75–3.71:1 (falha AA). A solução é "comprimir o range": baixar headings para 8-12:1 e elevar secundários para 4.5–6:1. Isso reduz fadiga e aumenta legibilidade ao mesmo tempo.

**Saturação:** acentos brand (`#7B5EA7`, `#21C9D0`, `#F0B429`, `#EC4899`, `#10B981`) estão **adequadamente dessaturados para dark mode**. Não há "neon vibrante" que cause vibração óptica. ✅

**Brilho e glow:** múltiplos elementos com `textShadow:0 0 X rgba(...)`:
- Chip `⚡ XP` com `textShadow:0 0 10px rgba(240,180,41,.4)`
- Float `+XP` com `textShadow:0 0 14px rgba(240,180,41,.7)`
- Símbolo do arquétipo com `textShadow:0 0 36px ${co}70`
- `boxShadow` em CTAs (`0 4px 24px rgba(...)`)
- `boxShadow` em milestone card (`0 0 60px ${color}14`)

Conta total na tela de resultado: 3-4 elementos com glow simultâneo = **acima do limite recomendado de 1-2** para ADHD. Recomendação: manter glow apenas no CTA primário (acento dopaminérgico) e no símbolo do arquétipo (identidade); remover de chip XP e float.

**Sombras:** `boxShadow` é usado adequadamente como acento de brilho (ambient light), não como drop shadow tradicional (que falha em dark mode). ✅

**Profundidade e elevação:** card `#120F2D` sobre bg `#0A0818` (+~3 unidades de luminosidade) é elevação correta, mas **sutil demais** para ADHD que precisa de hierarquia clara. Pode-se aumentar para `#1A1538` (+8% luminosidade) sem perder a coerência tonal.

**Conforto visual:** sessão de 5 minutos no quiz é tolerável. Sessão de 15+ minutos (refazendo, comparando) começaria a fatigar pelo heading (16.7:1) e pela quantidade de animações.

**Recomendações de ajuste:**
1. **Sweep de tokens secundários:** `#3D3366`→`#9892C4`, `#4A4480`→`#7B73B8`, `#6B62A8`→`#9892C4`, `#9B7070`→`#C49B9B` — todos passam AA
2. **Heading principal:** `#EDE9FF`→`#D8D2F0` (reduz para 13:1, alívio de halação sem perder força)
3. **Card elevation:** `#120F2D`→`#1A1538` (mais clara, melhor diferenciação)
4. **Reduzir glow:** remover `textShadow` de chip XP e do float; manter no símbolo do arquétipo e no CTA
5. **Background global:** aplicar `background:#0A0818` em `html, body, #root` no `index.html` (resolve faixa branca)
6. **Verificar consistência tonal:** todos os "darks" estão na mesma família violeta — ✅; manter

---

## 8. Auditoria para Pessoas com TDAH

### Clareza
A ação principal de cada tela é clara: landing tem 1 botão, perguntas têm 4 opções + 1 botão "Próxima", marcos têm 1 botão "Continuar", resultado tem 1 CTA primário (mais 2 secundários). **Pontuação: alta**, exceto no resultado onde "Refazer" e "Compartilhar" no mesmo nível visual do CTA pode confundir.

### Foco
Em cada pergunta, a pergunta é o elemento mais alto na hierarquia. Mas o **header tem 3-5 elementos visuais ativos simultaneamente** (chip XP com glow, label com 2 partes, barra com shimmer animada, 15 dots com 1 em pulse), o que rouba ~10% da atenção. Recomendação: silenciar o header durante a leitura da pergunta (não animar shimmer continuamente, não pulsar dot atual).

### Distrações
- Landing: 2 orbs animados (`orb 7s` + `orb 9s`) + 6 elementos com fade-in escalonado
- Quiz header: shimmer contínuo na progress + dpulse no current dot + glow no XP chip
- Resultado: glow no símbolo do arquétipo + radar animando entrada (28ms intervals)
- Marcos: confete cheio + dpulse no emoji

**Total de elementos animados simultaneamente em qualquer tela: 3-5.** Acima do limite ADHD-friendly (1-2 por tela).

### Memória
**Excelente neste aspecto.** Cada tela é autocontida: pergunta mostra contexto (Q5/15), microvalidação dispensa a memória da escolha, marcos mostram visualmente os scores parciais, resultado **referencia o perfil específico** (não exige lembrança). Bridge text por arquétipo conecta perfil→produto sem exigir memória do quiz.

### Quantidade de escolhas
- Landing: 1 escolha (CTA)
- Pergunta: 4 escolhas (limite recomendado)
- Marcos: 1 escolha (continuar) — exceto Marco 3 que avança automaticamente em 2.4s
- Resultado: 3 escolhas (CTA primário, refazer, compartilhar)

✅ Dentro do recomendado. **Atenção:** Marco 3 avançar automaticamente é uma decisão UX forte — pode ser confortável para a maioria, mas frustrante para quem queria pausar e comparar scores. Recomendação: manter botão opcional "Pular para resultado" + auto-advance após 4s.

### Progressão
Sensação de avanço **bem desenhada**: progress bar shimmer + 15 dots + label "Pergunta X de 15 · NN%" + marcos a cada 5 + XP acumulando. Para 14 das 15 perguntas, é claro o quanto falta. **Atenção:** "+5 XP por velocidade" é invisível para usuário (não há indicação de bônus possível); poderia mostrar timer sutil ou "responda em <5s para bônus".

### Recompensas
- Microvalidação a cada pergunta (validação emocional)
- XP +10 a +15 por pergunta (gamificação)
- Confete em marcos (celebração visual)
- "Marco Desbloqueado!" badge (achievement)
- Resultado com símbolo + radar (identidade)
- Compartilhamento (recompensa social opcional)

✅ Camada dopaminérgica completa.

### Linguagem emocional
**Tom geral: validante, anti-culpa, comportamental.** Microvalidações usam padrões como "não é preguiça — é o sistema X funcionando diferente", "não é fraqueza — é autorregulação sob pressão". Esse é o tom certo.

**Pontos de risco:**
- Termos clínicos sem contexto: "RSD" (Q5), "funções executivas" (Q11), "circuito de freio executivo" (Q3), "memória prospectiva" (Q11)
- "Disforia por Sensibilidade a Rejeição" — termo técnico forte sem aviso
- Cost text usa "isolamento", "exausto", "luta real", "dias que custam muito" — tons negativos válidos no diagnóstico mas pesados sem contraponto positivo

### Risco de sobrecarga
**Maior risco identificado: tela de Resultado.** Tem ~1590px de altura em mobile (390x844), 6 blocos consecutivos (header + radar + 3 recos + custo + bridge + ponte de venda + 4 fricções + CTA + disclaimer + 2 botões secundários). Usuário com baixa atenção pode fechar a tela antes de chegar ao CTA. Recomendação: ancorar CTA no topo (sticky) ou adicionar atalho "Ver oferta agora →" no header da tela de resultado.

---

## 9. Auditoria de Funil e Conversão

### Anúncio → Quiz
Não auditei o anúncio do Instagram. **Hipótese:** se o anúncio promete "descubra seu tipo de TDAH em 5 minutos", a landing cumpre. Se promete "planner para TDAH por R$X", a landing **não cumpre** (o usuário esperava ver produto, não outro quiz). **Recomendação:** alinhar anúncio com promessa de quiz, não de produto.

### Quiz → Resultado
Transição **excelente**: marcos criam ritmo, processamento dramatiza profundidade, resultado entrega identidade. O quiz é honestamente personalizado (algoritmo de similaridade + scores por dimensão), e o resultado **referencia padrões específicos** que o usuário reconhece.

### Resultado → Landing Page
**Quebrado.** CTA aponta para `https://seusite.com.br/planner/<arquetipo>` — domínio inexistente. Quando funcionar, o link deve abrir nova aba (já faz, ✅) e passar parâmetros de tracking (UTM + arquetipo + sessionId).

### Landing Page → Compra
Não auditável (landing não existe).

### CTA — Análise

| CTA | Localização | Texto atual | Avaliação | Sugestão |
|---|---|---|---|---|
| CTA 1 | Landing inicial | `Descobrir meu perfil →` | **Bom** — verbo + benefício + seta | Manter |
| CTA 2 | Q1-Q15 | `Próxima →` | OK — neutro | "Próxima pergunta →" |
| CTA 3 | Marco 1 | `Continuar (10 perguntas) →` | **Bom** — honesto sobre esforço | Manter |
| CTA 4 | Marco 2 | `Desbloquear meu perfil →` | **Excelente** — verbo de antecipação | Manter |
| CTA 5 | Marco 3 | (auto-advance) | OK — sem CTA explícito | Adicionar opcional "Ver agora →" |
| CTA 6 | Resultado | `Quero meu Planner O Furacão →` | **Excelente** — verbo + posse + identidade | Manter, mas adicionar preço se possível |
| CTA 7 | Resultado | `Refazer o quiz` | OK — neutro | "Refazer com outras respostas" |
| CTA 8 | Resultado | `Compartilhar meu perfil` | OK | Manter, mas implementar card visual |

### Confiança
**Presente:**
- Disclaimer não-diagnóstico (mas invisível por contraste)
- Garantia 7 dias mencionada no resultado
- Bullet "desenvolvido com e para adultos com TDAH"

**Ausente:**
- Logos de meios de pagamento (Pix, cartão)
- Selo de privacidade/LGPD
- Quem é a marca? Quem são os criadores?
- Política de devolução clicável

### Objeções
**Respondidas no resultado:**
- "Já tentei outros planners" → "Foi o sistema errado para o seu tipo de cérebro"
- "Funciona para mim?" → "Desenvolvido com e para adultos com TDAH"
- "E se não gostar?" → "7 dias de garantia"
- "É físico ou digital?" → "Entrega digital imediata"
- "Funciona no meu celular?" → "Funciona no celular e no computador"

**Não respondidas:**
- Quanto custa?
- O que vem dentro?
- Como vou usar?
- Quem está por trás?

### Personalização percebida
**Alta** — arquétipo + símbolo + cor + bridge text + recos + custos são todos específicos por perfil. O radar mostra as 5 dimensões com valores únicos. Excelente trabalho.

### Fricções identificadas

| Fricção | Localização | Impacto | Recomendação |
|---|---|---|---|
| CTA destino placeholder | Resultado | **Crítico** | URLs reais por arquétipo |
| Disclaimer ilegível | Landing + Resultado | Alto | Elevar para 4.5:1 |
| Faixa branca em ≥640px | Todas | Alto | Bg global |
| Marco 2 inconsistente | Marco 2 | Médio | Recalcular partialMax |
| Prova social placeholder | Landing + Resultado | Médio | Substituir ou ocultar |
| Voltar bug | Quiz Q2-Q14 | Médio | Recalcular delta XP |
| Tela de resultado longa sem âncora | Resultado | Médio | Sticky CTA ou shortcut |
| Sem preço visível antes do CTA | Resultado | Médio | Mostrar "a partir de R$XX" |
| Sem indicação do que vem no planner | Resultado | Médio | Adicionar bullets do produto |

---

## 10. Recomendações Práticas

### Quick Wins (baixo esforço, alto impacto)

1. **Background global escuro:** adicionar `<style>html,body,#root{background:#0A0818;min-height:100vh;}</style>` no `index.html` — 5 min, elimina faixa branca em todas as viewports
2. **URLs reais no CTA:** substituir `https://seusite.com.br/planner/<arq>` pelos 6 destinos finais (mesmo que provisórios) — 5 min, desbloqueia funil
3. **Disclaimer legível:** trocar `#3D3366` por `#9892C4` em `quiz-tdah-v1.jsx:234,527` — 2 min, eleva de 1.75:1 para 4.8:1
4. **Tokens secundários AA:** sweep `#6B62A8`→`#9892C4`, `#4A4480`→`#7B73B8`, `#9B7070`→`#C49B9B` — 10 min, resolve 7 dos 10 axe violations
5. **Headline ético:** trocar "Qual tipo de TDAH é o seu?" por "Como sua atenção funciona?" + "6 padrões de funcionamento" no contador — 3 min, remove risco diagnóstico
6. **Remover placeholder de testimonial:** comentar bloco `quiz-tdah-v1.jsx:501-505` até ter depoimento real — 1 min
7. **Heading menos agressivo:** `#EDE9FF`→`#D8D2F0` — 1 min, reduz halação
8. **Marco 2 corrigido:** trocar `partialMax={D:6,H:5,I:6}` por valores que considerem secundários, e adicionar `Math.min(pct,100)` na barra — 5 min, elimina label impossível

### Melhorias Estruturais (maior esforço, impacto significativo)

1. **Construir landing(s) de venda externa(s)** com 1 página por arquétipo (ou 1 página com bloco condicional) — peça maior do trabalho restante
2. **Cap de scoring + radar normalizado por dimensão** (`calcScores` aplicar cap; `Result` usar denominadores corretos D/A/E=11, H/I=9) — 30 min, resolve credibilidade do algoritmo
3. **Bug do botão Voltar** (armazenar `xpDelta` por pergunta no `ansRef`; deletar pergunta correta) — 30 min
4. **Marco 2 como radar parcial real** (conforme spec) ou reescrever copy "amostra parcial" + denominadores reais — 60 min
5. **`<main>` + `<h1>` em cada tela do quiz** + landmarks ARIA — 30 min, resolve a11y axe moderate
6. **Foco programático e ordem de Tab** (Voltar para canto, foco em Próxima após validação) — 30 min
7. **Sticky CTA na tela de resultado** ou âncora "Ver oferta →" no topo — 60 min
8. **Schema único de analytics** com `sessionId`, UTM, dedup de abandono, XP correto no `cta_clicked` — 60 min

### Testes A/B Recomendados

| Hipótese | Variante A (atual) | Variante B (proposta) | Métrica-alvo | Prioridade |
|---|---|---|---|---|
| Headline diagnóstico vs comportamental afeta conclusão do quiz | "Qual tipo de TDAH é o seu?" | "Como sua atenção funciona?" | Taxa de início + conclusão | P1 |
| Microvalidação imediata vs 400ms delay | Imediata | 400ms delay | Tempo médio por pergunta + conclusão | P2 |
| CTA com ou sem preço visível | "Quero meu Planner [X] →" | "Quero meu Planner [X] por R$XX →" | CTR para landing | P1 |
| Resultado curto (essencial) vs completo (atual) | Atual (1590px) | Versão sticky CTA | CTR para landing | P2 |
| 2 orbs animados na landing vs 1 orb sutil | 2 orbs | 1 orb com opacidade .08 | Bounce rate landing | P3 |
| Marco 3 auto-advance vs botão | Auto 2.4s | Botão "Ver perfil →" | Drop-off no marco 3 | P3 |
| Disclaimer 1.75:1 vs 4.8:1 | Atual | `#9892C4` | Tempo de permanência + reclamações | P0 (não AB testar — corrigir direto) |

---

## 11. O Que Fazer

1. [ ] **[P0]** Configurar URLs reais nos 6 `ctaUrl` em `quiz-tdah-v1.jsx:120-150`
2. [ ] **[P0]** Aplicar `background:#0A0818` global em `html,body,#root` via `index.html` ou CSS injetado
3. [ ] **[P0]** Elevar disclaimer ético em `quiz-tdah-v1.jsx:234,527` para `#9892C4` (≥4.5:1)
4. [ ] **[P0]** Reescrever headline "Qual tipo de TDAH é o seu?" para linguagem comportamental ("Como sua atenção funciona?")
5. [ ] **[P0]** Construir landing(s) de venda externa(s) com paleta/tipografia consistentes
6. [ ] **[P1]** Corrigir Marco 2 (`partialMax` real ou radar parcial; clamp visual em 100%)
7. [ ] **[P1]** Substituir placeholder `[depoimento a confirmar com real]` por testemunho real ou ocultar
8. [ ] **[P1]** Aplicar cap em `calcScores` (D/A/E ≤11, H/I ≤9); usar denominador correto no radar
9. [ ] **[P1]** Corrigir bug do botão Voltar (delta XP por pergunta, sem duplicar evento)
10. [ ] **[P1]** Sweep de tokens secundários para AA (`#6B62A8`, `#4A4480`, `#9B7070`)
11. [ ] **[P1]** Adicionar `<main>` envolvendo App e `<h1>` em cada tela do quiz (visualmente discreto OK)
12. [ ] **[P1]** Fixar foco por teclado: Voltar fora do tab order primário; Próxima recebe foco após validação
13. [ ] **[P1]** Corrigir analytics: `cta_clicked.xpEarned` usar `xp` real; dedup `quiz_abandoned`
14. [ ] **[P1]** Substituir `47.382 pessoas` por número real ou remover
15. [ ] **[P2]** Atrasar microvalidação em 400ms (criar respiro emocional)
16. [ ] **[P2]** Reduzir animações simultâneas na landing (1 orb em vez de 2; opacidade .08)
17. [ ] **[P2]** Reduzir contraste do heading principal de 16.7:1 para ~12:1 (alívio halação)
18. [ ] **[P2]** Reescrever "847 padrões comportamentais" / "perfis reais" para copy comportamental honesta
19. [ ] **[P2]** Remover ou reduzir glow do chip XP e do float (manter no símbolo do arquétipo e no CTA)
20. [ ] **[P2]** Encurtar 13 opções >8 palavras (Q4A, Q5A, Q6A/B/C, Q7A, Q8A, Q9B, Q10A/D, Q14A, Q15A/C)
21. [ ] **[P2]** Substituir termos clínicos (RSD, funções executivas, memória prospectiva) por equivalentes comportamentais
22. [ ] **[P2]** Sticky CTA ou âncora "Ver oferta →" no topo da tela de resultado
23. [ ] **[P2]** Adicionar timeout de 30-60s antes de marcar abandono por `visibilitychange`
24. [ ] **[P3]** Adicionar `<link rel="icon">` em `index.html`
25. [ ] **[P3]** Remover `aria-label` redundante no `<input>` (label nativo já cumpre)

---

## 12. O Que Não Fazer

- **Não enviar tráfego pago para o anúncio até o CTA do resultado apontar para destino real** — toda conversão é perdida
- **Não adicionar mais perguntas ao quiz** — 15 já é o limite saudável para esse público; ampliação aumenta abandono
- **Não usar countdown timers falsos ou "vagas limitadas"** para o planner (produto digital com disponibilidade ilimitada)
- **Não trocar o disclaimer por um ícone (ⓘ) ou tooltip** — precisa estar visível, legível, e contextual
- **Não usar linguagem diagnóstica** ("seu TDAH é do tipo X", "você foi diagnosticado com perfil Y") — manter framing de "padrão de funcionamento"
- **Não adicionar mais animações continuas na landing** — já há 5+ simultâneas; cérebro TDAH gasta atenção com cada uma
- **Não usar pure black (#000) como background** se trocar a paleta — `#0A0818` está correto, manter
- **Não remover o disclaimer ético em troca de espaço visual** — precisa ficar visível, mesmo que reduzido
- **Não usar copy de shame** ("você sabe que devia ser melhor", "pare de decepcionar pessoas")
- **Não promessa de cura** ("planner que resolve TDAH", "não seja mais distraído")
- **Não enquadrar TDAH como deficit** ("compense seu TDAH", "supere o TDAH") — usar "padrão", "perfil", "estilo de funcionamento"

---

## 13. Riscos Éticos e de Linguagem

### Problemas identificados

| Tipo de risco | Localização | Texto atual | Por que é problemático | Sugestão de reescrita |
|---|---|---|---|---|
| Linguagem diagnóstica (hook) | Landing H1 (`quiz-tdah-v1.jsx:216-218`) | "Qual tipo de TDAH é o seu?" | Enquadra quiz como mapeamento de subtipo clínico de TDAH | "Como sua atenção funciona?" / "Qual é o seu padrão de atenção?" |
| Linguagem diagnóstica (contador) | Landing (`:223`) | "6 perfis" subentendido como "perfis de TDAH" | Reforça framing de tipologia diagnóstica | "6 padrões" + tooltip "padrões de funcionamento da atenção" |
| Pseudoautoridade científica | Processamento (`:393`) | "Analisando 847 padrões comportamentais...", "Cruzando com perfis reais de adultos com TDAH..." | Numero pseudo-preciso + claim de comparação clínica sem base | "Cruzando suas respostas com 6 padrões de funcionamento...", "Identificando o seu padrão dominante..." |
| Termo clínico sem disclaimer | Q5 microvalidação A (`:74`) | "Sensibilidade à rejeição é uma das experiências mais intensas e invisíveis do TDAH" | Termo "TDAH" usado em afirmação categórica | "Sensibilidade à rejeição é uma experiência intensa e invisível para muitos com esse padrão de atenção" |
| Termo clínico sem definição | Q3 microvalidação A (`:68`) | "O circuito de freio executivo no TDAH funciona diferente — o arrependimento é parte do padrão" | Termo "circuito de freio executivo" sem contextualização | "O sistema que ajuda a frear antes de agir funciona diferente — o arrependimento depois é parte desse padrão" |
| Disclaimer invisível | Landing (`:234`) e Resultado (`:527`) | "Este quiz mapeia padrões de perfil e não substitui avaliação profissional." (#3D3366) | Texto em 1.75:1 — efetivamente invisível | Manter texto, **trocar cor para #9892C4 e aumentar para 13px** |
| Prova social não verificável | Landing (`:233`) | "47.382 pessoas já descobriram o seu" | Número específico sem fonte; manipulação de prova social | Trocar por número real ou remover; se manter, citar fonte ("47k participantes desde Mar/2026") |
| Testimonial placeholder | Resultado (`:505`) | "— R.T., TDAH combinado · [depoimento a confirmar com real]" | "TDAH combinado" como rótulo identitário + texto de placeholder visível | Substituir por testemunho real (sem rótulo diagnóstico) ou remover bloco até ter |
| Implicação de cura | Resultado (`:495-498`) | "Planner genérico não funciona para você. Você já tentou cadernos, apps, bullet journals. Funcionaram por alguns dias — depois pararam. Não foi falha sua. Foi o sistema errado para o seu tipo de cérebro." | "Tipo de cérebro" reforça categoria; "funciona/não funciona" implica solução binária | "Planner padrão não considera o seu jeito de funcionar. Você já tentou cadernos, apps, bullet journals — e seguiram só por uns dias. Não foi falta sua. O sistema não foi pensado para esse padrão de atenção." |
| Marco 1 — categorização | Marco 1 (`:336`) | "Suas primeiras 5 respostas revelam um padrão claro." | OK em si; mas "padrão claro" pode ser interpretado como diagnóstico | Aceitável; manter |

### Disclaimer recomendado

Manter o disclaimer atual ("Este quiz mapeia padrões de perfil e não substitui avaliação profissional"), mas:
1. Elevar contraste para no mínimo 4.5:1 (`#9892C4` sobre `#0A0818`)
2. Adicionar uma versão expandida no rodapé do resultado:

> *"Este é um questionário de autoconhecimento sobre padrões de atenção e organização. Não é uma ferramenta clínica e não substitui avaliação por psicólogo, psiquiatra ou neurologista. Se você suspeita de TDAH, busque um profissional de saúde."*

3. Adicionar link para [ABDA — Associação Brasileira de Déficit de Atenção](https://tdah.org.br/) ou similar como recurso institucional de busca por avaliação

---

## 14. Checklist Final de Validação

### Visual e Dark Mode
- [x] Background não é preto puro (`#0A0818` ✅)
- [ ] Texto principal não é branco puro em fundo muito escuro (`#EDE9FF` quase branco — sob contraste 16.7:1)
- [x] Superfícies elevadas (cards) aparecem mais claras que o background (`#120F2D` ✅)
- [x] Acento/brand colors estão dessaturados para dark mode (✅)
- [ ] Glow/neon máximo 1–2 elementos por tela (resultado tem 3-4 simultâneos)
- [x] Paleta de cores consistente em todo o fluxo (✅)
- [ ] **Background aplicado em html/body/#root para evitar áreas brancas** (**falha**)

### Contraste e Acessibilidade
- [ ] Texto normal: mínimo 4.5:1 em todos os pares texto/fundo (**falha** em 6+ tokens)
- [ ] Texto grande: mínimo 3:1 (✅)
- [ ] Botões: mínimo 3:1 contra o fundo adjacente (✅ primários; falha "Refazer/Compartilhar" 3.71:1 ↘ ↘)
- [x] Foco visível em elementos interativos (`:focus-visible` ✅)
- [x] Targets de toque ≥ 44×44px (CTA 49px, opções 67px ✅)
- [x] Informações não dependem apenas de cor (✓ checkmark + cor + texto)
- [ ] `<main>` + `<h1>` por tela (**falha** — quiz não tem)
- [ ] Disclaimer ético ≥ 4.5:1 (**falha crítica** — 1.75:1)

### TDAH / Carga Cognitiva
- [x] Máximo 1 ação principal por tela (✅)
- [x] Máximo 4 opções de resposta por pergunta (✅)
- [x] Progress bar ou contador de etapas visível em todo o quiz (✅)
- [x] Milestone de recompensa no meio do quiz (✅)
- [x] Resultado referencia respostas específicas do usuário (✅ via arquétipo)
- [x] Copy sem linguagem culpabilizante (✅ majoritariamente)
- [ ] Máximo 1-2 animações simultâneas (**falha** — 3-5 ativas em landing/header/resultado)
- [ ] Microvalidação com delay (**falha** — imediata, sem 400ms de respiro)

### Conversão
- [x] CTA com texto ativo e específico em todas as telas-chave (✅)
- [ ] Resultado conectado narrativamente à landing page (**falha** — landing não existe)
- [ ] Preço com contexto de valor (não há preço no resultado)
- [x] Garantia visível antes do CTA de compra (✅)
- [ ] Checkout acessível via mobile (não auditável — landing não existe)
- [ ] Prova social validada (**falha** — placeholder visível)

### Ética
- [ ] Nenhuma linguagem diagnóstica (**falha** — H1, contador "6 perfis", processamento)
- [x] Nenhuma promessa de cura (✅)
- [x] Nenhum countdown timer falso (✅)
- [ ] Disclaimer de autoavaliação presente E LEGÍVEL (presente mas **invisível**)
- [x] Nenhum uso de vergonha como gatilho de compra (✅)

---

## 15. Conclusão

### Avaliação geral

O Quiz TDAH v1 é um produto **muito bem desenhado**, com base ética sólida, arquitetura técnica clara, gamificação dopaminérgica bem calibrada para TDAH, e seis arquétipos com identidade forte que servem como ativo central de personalização. O trabalho de pensamento de UX e de produto é evidente em quase cada decisão: marcos a cada 5 perguntas, microvalidação validante, radar visual de personalidade, bridge text por arquétipo, suporte a `prefers-reduced-motion`, semântica `fieldset`/`legend`/`<input radio>`, analytics estruturado.

Mas o produto **não está pronto para tráfego pago**, por dois motivos estruturais e um conjunto de bugs de credibilidade. Os dois bloqueadores estruturais são: (1) o destino de venda dos CTAs é placeholder (`seusite.com.br`), o que significa que toda conversão é perdida no momento exato de maior intenção; e (2) o body do documento não tem background escuro, o que faz aparecer uma faixa branca abaixo da landing em qualquer viewport ≥640px — ruptura visual que nenhum produto premium pode ter. Os bugs de credibilidade — disclaimer invisível (1.75:1), Marco 2 com label impossível (`6/5`), prova social literal placeholder (`[depoimento a confirmar com real]`), e linguagem diagnóstica no hook ("Qual tipo de TDAH é o seu?") — operam em conjunto para sinalizar "produto antes da hora", o que reduz CTR mesmo que o CTA estivesse funcionando.

A boa notícia: **todos esses problemas são corrigíveis em horas**, não dias. O produto está a 1-2 dias úteis de estar comercialmente válido. A landing de venda externa é o único trabalho realmente novo (e pode ser uma única página com bloco condicional por arquétipo, não 6 páginas distintas).

### 3 Prioridades Máximas

1. **Configurar URLs reais nos 6 CTAs + construir landing(s) de venda.** Sem isso, todo o resto é exercício acadêmico. O quiz está funcionando como demo de portfólio, não como funil de receita. Inestimável: medir o ratio de cliques no CTA do resultado para entender qual é o teto real de conversão antes de qualquer otimização.
2. **Aplicar background global escuro + sweep de tokens secundários para AA + elevar disclaimer ético.** São ~30 minutos de trabalho que eliminam toda a aparência de "produto inacabado", resolvem 10 das 11 violações axe, e garantem que o disclaimer mais legalmente importante seja efetivamente legível.
3. **Reescrever headline e copy do hook para linguagem comportamental ("Como sua atenção funciona?" em vez de "Qual tipo de TDAH é o seu?")** + corrigir Marco 2 + remover placeholders de prova social. Isso fecha a fronteira ética entre autoavaliação e diagnóstico, restaura credibilidade do algoritmo, e remove sinais de produto antes da hora — em conjunto, multiplica a confiança do usuário cético no momento da decisão de compra.

### Próximos Passos Recomendados

1. **Hoje:** corrigir os 4 P0 quick-wins (URLs reais, background global, disclaimer legível, headline ético) — 30 minutos de trabalho real, libera funil para tráfego
2. **Esta semana:** corrigir os P1 estruturais (Marco 2, scoring cap, voltar bug, sweep de contraste, landmarks ARIA) — 4-6h de trabalho
3. **Esta semana:** construir landing(s) de venda externa(s) com paleta/tipografia consistentes e bloco condicional por arquétipo — 1-2 dias
4. **Próxima semana:** rodar primeira campanha pequena de tráfego (R$50-100/dia) e medir: CTR landing → quiz, taxa de conclusão, CTR resultado → landing venda, taxa de checkout
5. **Após 100 conversões:** rodar A/B tests de CTA com preço, headline ético, e sticky CTA na tela de resultado
6. **Continuamente:** revisar copy ética dos 15 microvalidações para remover ainda mais termos clínicos sem contexto, e validar disclaimer expandido no rodapé do resultado
