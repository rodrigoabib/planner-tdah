Abaixo está um plano bem completo para transformar o **Codex** em um auditor/revisor especializado do seu quiz TDAH — focado em **UX/UI para pessoas com TDAH**, **conteúdo**, **marketing digital**, **funil**, **gamificação**, **retenção dopaminérgica** e **conversão**. 🧠⚡

Pelo que analisei, o projeto não é “só um quiz”: ele é o **núcleo do funil de venda** de um planner personalizado para adultos com TDAH, com dois objetivos simultâneos: mapear perfis/dimensões e conduzir a pessoa por uma jornada emocional de reconhecimento, validação, desejo e compra. O escopo define 5 dimensões, 6 arquétipos, 15 perguntas, XP, marcos, microvalidações, tela de processamento, resultado e ponte de venda.  A v1 em React já implementa boa parte desse fluxo — landing, perguntas, scoring, arquétipos, marcos, processamento, radar e CTA — mas há discrepâncias importantes que o Codex precisa auditar de forma sistemática. 

## 1. Estratégia central para o Codex

Eu não colocaria o Codex para “melhorar a tela” logo de cara. O melhor fluxo é:

**Primeiro:** Codex atua em modo **read-only/auditoria**, sem editar código.

**Depois:** ele roda o projeto, navega pelo quiz com diferentes perfis de usuários, captura evidências e mapeia problemas.

**Por fim:** ele gera um **relatório de handoff** com achados, severidade, evidência, impacto em usuários com TDAH, impacto em conversão e sugestões de correção.

Só numa etapa posterior ele deve virar implementador.

Isso é importante porque, nesse projeto, o risco não é apenas técnico. O risco é o quiz perder atenção, frustrar, parecer clínico demais, soar manipulativo, errar arquétipo, quebrar ritmo dopaminérgico ou enfraquecer a ponte de venda.

---

## 2. Ferramentas e artefatos recomendados para o Codex

### A. `AGENTS.md` do projeto

Use um `AGENTS.md` na raiz do repositório para dar ao Codex instruções persistentes. O Codex lê arquivos `AGENTS.md` antes de trabalhar e permite combinar instruções globais com instruções específicas do projeto. ([OpenAI Developers][1])

Exemplo de função desse arquivo:

```md
# AGENTS.md

## Papel principal neste projeto

Você é um auditor de produto, UX/UI, conteúdo e marketing para um quiz de funil de vendas voltado a adultos com TDAH no Brasil.

Seu trabalho inicial é revisar, auditar e documentar problemas. Não altere código sem solicitação explícita.

## Fontes obrigatórias

Antes de qualquer conclusão, leia:

- quiz/quiz-tdah-especificacao-completa.md
- quiz/quiz-tdah-v1.jsx

## Critérios principais

Avalie sempre:

1. Aderência ao escopo.
2. UX/UI para pessoas com TDAH.
3. Manutenção de atenção e recompensa imediata.
4. Clareza, emoção e segurança da copy.
5. Conversão e ponte para venda.
6. Acessibilidade.
7. Mobile-first.
8. Coerência de scoring e arquétipos.
9. Analytics e capacidade futura de otimização.
10. Riscos éticos, clínicos e de confiança.

## Regras de auditoria

Cada achado deve conter:

- ID do problema.
- Severidade: P0, P1, P2 ou P3.
- Tela/etapa afetada.
- Evidência observada.
- Referência no código ou escopo.
- Impacto para usuário com TDAH.
- Impacto em conversão.
- Recomendação objetiva.
- Critério de aceite.
```

---

### B. Skill específica: `tdah-ux-audit`

Codex hoje suporta **Skills** como pastas com `SKILL.md`, scripts e referências opcionais. A documentação oficial recomenda descrições claras para que o Codex saiba quando ativar a skill. ([OpenAI Developers][2])

Eu criaria uma skill assim:

```txt
.agents/
  skills/
    tdah-ux-audit/
      SKILL.md
      references/
        checklist-tdah-ux.md
        checklist-copy-funil.md
        checklist-acessibilidade.md
        persona-matrix.md
      scripts/
        extract-quiz-content.js
        score-archetype-paths.js
        run-a11y-audit.js
```

Conteúdo sugerido para `SKILL.md`:

```md
---
name: tdah-ux-audit
description: Use esta skill quando a tarefa envolver auditoria de UX/UI, conteúdo, gamificação, retenção de atenção, dopamina, funil de venda ou conversão em quizzes para pessoas com TDAH.
---

# TDAH UX Audit Skill

Você deve auditar o quiz considerando adultos com TDAH no Brasil.

## Objetivo

Identificar problemas de UX, UI, conteúdo, copy, acessibilidade, gamificação, fluxo emocional, scoring, arquétipos, retenção e conversão.

## Não faça

- Não reescreva tudo por gosto pessoal.
- Não proponha mudanças visuais sem explicar impacto comportamental.
- Não trate o quiz como diagnóstico clínico definitivo.
- Não altere código nesta etapa sem ordem explícita.

## Checklist essencial

1. A pergunta é curta o suficiente?
2. As alternativas são específicas e comportamentais?
3. A microvalidação recompensa imediatamente?
4. Há excesso de texto?
5. O progresso está sempre claro?
6. O usuário sabe por que deve continuar?
7. A tela cria antecipação?
8. O visual guia ou compete pela atenção?
9. O ritmo entre resposta, validação e próxima pergunta mantém dopamina?
10. O resultado gera reconhecimento, desejo e ação?
11. O CTA parece natural ou forçado?
12. Há risco de prometer diagnóstico clínico?
13. Há acessibilidade por teclado?
14. O fluxo funciona em 320px?
15. O tracking permite otimização real do funil?

## Saída obrigatória

Gere um relatório de handoff em Markdown com:

- Resumo executivo.
- Mapa do fluxo.
- Matriz escopo vs implementação.
- Achados priorizados.
- Simulações por persona.
- Problemas de conteúdo.
- Problemas de UI.
- Problemas de conversão.
- Problemas técnicos que afetam UX.
- Recomendações com critérios de aceite.
```

---

### C. MCPs e ferramentas de navegação

Para este projeto, eu usaria **duas camadas**:

1. **In-app Browser do Codex** para abrir o app local, navegar visualmente, clicar e comentar estados renderizados. A documentação oficial recomenda o in-app browser para preview/debug de web apps locais, permitindo que Codex e usuário tenham uma visão compartilhada da página renderizada; o Browser Use permite clicar, digitar, inspecionar estado e tirar screenshots. ([OpenAI Developers][3])

2. **Playwright MCP ou Playwright CLI + Skill** para simulações repetíveis de jornada completa. O Playwright MCP fornece automação de browser por snapshots de acessibilidade, e o próprio repositório observa que, para agentes de código, fluxos via CLI + Skills podem ser mais eficientes em tokens do que MCP em alguns cenários. ([GitHub][4])

Configuração sugerida:

```bash
codex mcp add playwright npx "@playwright/mcp@latest"
```

Também pode ser útil adicionar:

```bash
codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest
```

O Chrome DevTools MCP permite inspecionar Chrome, capturar screenshots, console, network e traces de performance, o que é útil para validar animações, performance e problemas visuais. ([npm][5])

Para acessibilidade automatizada:

```bash
npm install -D @axe-core/playwright axe-core
```

Axe-core é uma engine open-source de testes automatizados de acessibilidade para interfaces web/HTML, com suporte a regras WCAG e integração com fluxos modernos de teste. ([Deque][6])

---

## 3. Subagentes recomendados no Codex

A documentação do Codex permite configurar subagentes/custom agents com papéis especializados, e o próprio exemplo oficial usa agentes separados para explorar código, revisar riscos e verificar documentação. ([OpenAI Developers][7])

Eu criaria estes agentes:

```txt
.codex/
  agents/
    quiz-code-mapper.toml
    adhd-ux-reviewer.toml
    marketing-funnel-reviewer.toml
    browser-journey-auditor.toml
    accessibility-performance-reviewer.toml
    handoff-synthesizer.toml
```

### Função de cada agente

| Agente                               | Função                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `quiz-code-mapper`                   | Mapear estrutura do código, componentes, scoring, estados, fluxo e divergências com o escopo.    |
| `adhd-ux-reviewer`                   | Avaliar carga cognitiva, atenção, ritmo, dopamina, micro-recompensas, linguagem e fricção.       |
| `marketing-funnel-reviewer`          | Avaliar headline, promessa, prova social, CTA, ponte de venda, objeções e conversão.             |
| `browser-journey-auditor`            | Rodar o app, navegar por todos os caminhos, capturar screenshots e evidências.                   |
| `accessibility-performance-reviewer` | Rodar axe, Lighthouse/DevTools, mobile, teclado, contraste, reduced motion e bundle/performance. |
| `handoff-synthesizer`                | Consolidar tudo em relatório final priorizado para implementação.                                |

---

## 4. Pontos críticos que o Codex deve investigar na v1

Estes são os primeiros pontos que eu já colocaria no briefing do Codex, porque aparecem como potenciais desvios entre escopo e código:

### 4.1 XP e gamificação

O escopo prevê +10 XP por pergunta, +5 XP por resposta rápida, +25 nos marcos 1 e 2, +50 no marco final e máximo de 300 XP.  A v1 parece implementar apenas +10 por resposta e +25 por marco, inclusive no marco final, sem bônus de velocidade e sem chegar ao máximo previsto. 

**Auditoria:** verificar se isso quebra a sensação de progressão/recompensa e se a UI promete algo que o sistema não entrega.

### 4.2 Marco 2 e radar parcial

O escopo diz que, após Q10, D, H e I já estariam completamente avaliadas, enquanto A e E ficariam bloqueadas.  Mas pela própria distribuição de perguntas, D tem Q11, H tem Q12 e I tem Q13; logo, após Q10 essas dimensões ainda não estão completas. Esse é um possível problema conceitual do escopo e da implementação.

**Auditoria:** Codex deve checar se o radar parcial está narrativamente bonito, mas logicamente enganoso.

### 4.3 Progresso percebido

A v1 calcula o percentual com base no índice da pergunta (`qi/15`), o que pode fazer a pergunta atual parecer menos avançada do que a pessoa espera.  Exemplo: na pergunta 7, o escopo sugere “7 de 15 · 46%”; a implementação tende a mostrar algo próximo de 40%.

**Auditoria:** comparar progresso “respondido” vs “percebido” e testar qual mantém mais motivação.

### 4.4 Acessibilidade das alternativas

As opções parecem ser `divs` clicáveis, sem semântica nativa de botão/radio, sem suporte claro a teclado, foco, `aria-live` ou navegação assistiva. 

**Auditoria:** isso é crítico porque TDAH frequentemente convive com ansiedade, baixa paciência, uso mobile e padrões de interação rápidos. Fricção de teclado/foco pode reduzir conclusão.

### 4.5 CTA final

A v1 exibe “Quero meu Planner {arc.name} →”, mas aparentemente ainda não há link, tracking nem ação real de conversão. 

**Auditoria:** isso é P0/P1 para funil, porque o quiz pode gerar desejo e perder o clique.

### 4.6 Risco clínico e confiança

O escopo usa linguagem de diagnóstico e escala, mas o quiz deve tomar cuidado para não se apresentar como diagnóstico clínico definitivo. O CDC reforça que não há um único teste para diagnosticar TDAH e que a avaliação deve envolver profissional de saúde. ([CDC][8])

**Auditoria:** Codex deve revisar copy, resultado e ponte de venda para incluir uma camada de segurança: “mapeamento de perfil”, “indicativos”, “não substitui avaliação profissional”.

---

## 5. Matriz de simulação de usuários

O Codex deve navegar o quiz como se fosse diferentes perfis de usuários, não apenas preencher A/B/C/D mecanicamente.

Use esta matriz:

| Persona                  | Tipo de TDAH / comportamento                            | O que observar                                                |
| ------------------------ | ------------------------------------------------------- | ------------------------------------------------------------- |
| `desatento-impaciente`   | Lê rápido, pula detalhes, esquece instruções            | Clareza imediata, progresso, texto curto, distrações visuais. |
| `hiperativo-explorador`  | Clica rápido, busca estímulo, odeia espera sem feedback | Ritmo, resposta visual, microanimações, delay do botão.       |
| `emocional-rsd`          | Sensível a julgamento, medo de falha, copy pode ferir   | Tom, validação, risco de vergonha, acolhimento.               |
| `mascaramento-burnout`   | Funciona bem por fora, exausto por dentro               | Reconhecimento emocional, desejo pelo planner, identificação. |
| `caos-criativo`          | Muitas ideias, projetos inacabados, impulsividade       | Ponte do resultado para estrutura do planner.                 |
| `cético-conversão`       | Desconfia de promessa milagrosa                         | Prova, transparência, ética, CTA, objeções.                   |
| `mobile-ansioso`         | Usa celular pequeno, uma mão, pouca paciência           | 320px, scroll, toque, contraste, legibilidade.                |
| `teclado-acessibilidade` | Navega sem mouse                                        | Foco, tab order, enter/space, semântica.                      |
| `reduced-motion`         | Sensível a excesso de movimento                         | `prefers-reduced-motion`, confetti, shimmer, pulse.           |

---

## 6. Caminhos de respostas para testar arquétipos

O Codex deve confirmar essas sequências navegando no app. Cada string representa as respostas de **Q1 a Q15**.

| Arquétipo esperado  | Sequência inicial de teste |
| ------------------- | -------------------------- |
| O Nômade Quântico   | `ABBDCADDCCDCDAC`          |
| O Reator em Cadeia  | `BAABCBBADBDAABC`          |
| O Vulcão Silencioso | `BDCDCDDABABADAA`          |
| O Arquiteto do Caos | `BAABDBCAADADCBB`          |
| O Furacão           | `ABACAAAACBBAABA`          |
| O Camaleão Exausto  | `BDBBBBDACCBDCDC`          |

Esses caminhos servem como “smoke tests” de scoring/resultado. O Codex também deve criar caminhos extremos: tudo A, tudo B, tudo C, tudo D, alternado A-D-A-D, e respostas rápidas/lentas.

---

## 7. Checklist de auditoria que o Codex deve executar

### Fluxo e produto

* O fluxo real bate com o escopo?
* A landing comunica valor em até 8 segundos?
* A pessoa entende que terá resultado imediato?
* Os marcos aparecem no momento certo?
* A tela de processamento dura o tempo correto?
* O resultado conecta naturalmente com o planner?

### UX/UI para TDAH

* Cada tela tem apenas um foco principal?
* Há excesso de estímulo visual?
* O progresso está claro o tempo todo?
* O usuário recebe recompensa imediata após cada ação?
* O botão “Próxima” demora o suficiente para criar microvalidação, mas não frustra?
* As animações ajudam ou cansam?
* O quiz mantém variedade sem bagunçar o padrão?

### Conteúdo

* Perguntas respeitam limite de palavras?
* Alternativas são específicas ou vagas demais?
* Microvalidações têm até 15 palavras?
* Alguma copy soa condescendente?
* Alguma frase promete diagnóstico?
* Alguma frase pode gerar vergonha, culpa ou sensação de defeito?
* O arco emocional realmente vai de reconhecimento → validação → esperança → desejo?

### Marketing/conversão

* O CTA inicial é forte?
* A prova social é real ou precisa ser marcada como placeholder?
* O resultado gera “isso foi feito para mim”?
* A ponte de venda explica por que planners comuns falham?
* A oferta do planner aparece como consequência natural?
* O CTA final tem ação, link e tracking?
* Existem objeções respondidas antes do CTA?

### Acessibilidade/performance

* Funciona em 320px?
* Funciona por teclado?
* Tem foco visível?
* Contraste passa WCAG?
* Há suporte a `prefers-reduced-motion`?
* Bundle respeita o alvo?
* Recharts/fontes/animações prejudicam carregamento em 3G?
* Console está limpo?
* Não há layout shift relevante?

### Analytics

O escopo já define eventos obrigatórios: `quiz_started`, `question_answered`, `milestone_reached`, `quiz_completed`, `result_viewed`, `cta_clicked` e `quiz_abandoned`.  A auditoria deve verificar se eles existem, se têm payload correto e se permitem descobrir onde o usuário abandona.

---

## 8. Formato obrigatório do relatório de handoff

Peça ao Codex para gerar algo assim:

```md
# Relatório de Auditoria — Quiz TDAH v1

## 1. Resumo executivo

- Status geral:
- Nota UX TDAH:
- Nota conversão:
- Nota acessibilidade:
- Nota aderência ao escopo:
- Principais riscos:
- Recomendações prioritárias:

## 2. Escopo analisado

- Documento:
- Código:
- Rotas/telas testadas:
- Ferramentas usadas:
- Data/hora da auditoria:

## 3. Mapa da jornada real

1. Landing
2. Q1-Q5
3. Marco 1
4. Q6-Q10
5. Marco 2
6. Q11-Q15
7. Marco 3
8. Processamento
9. Resultado
10. Ponte/CTA

## 4. Matriz escopo vs implementação

| Item do escopo | Implementado? | Evidência | Problema | Severidade |
|---|---:|---|---|---|

## 5. Simulações por persona

| Persona | Caminho | Resultado | Fricções | Risco de abandono | Observações |
|---|---|---|---|---|---|

## 6. Achados priorizados

### P0 — Bloqueadores

#### AUD-001 — Título do problema

- Tela:
- Evidência:
- Impacto em TDAH:
- Impacto em conversão:
- Causa provável:
- Recomendação:
- Critério de aceite:

### P1 — Alta prioridade

...

## 7. Problemas de conteúdo e copy

| Tela | Texto atual | Problema | Sugestão | Motivo |
|---|---|---|---|---|

## 8. Problemas visuais e interação

| Tela | Elemento | Problema | Evidência | Correção sugerida |
|---|---|---|---|---|

## 9. Scoring e arquétipos

- Pontuações máximas por dimensão:
- Inconsistências:
- Caminhos testados:
- Resultados obtidos:
- Riscos de empate/tie-break:

## 10. Acessibilidade

- Keyboard:
- Screen reader:
- Focus:
- Contrast:
- Reduced motion:
- Axe results:

## 11. Marketing e funil

- Hook:
- Prova social:
- Promessa:
- Resultado:
- Ponte de venda:
- CTA:
- Objeções:
- Tracking:

## 12. Backlog recomendado

| Prioridade | Item | Esforço | Impacto | Critério de aceite |
|---|---|---:|---:|---|

## 13. Plano de validação pós-ajustes

- Testes manuais:
- Testes automatizados:
- A/B tests:
- Métricas:
```

---

## 9. Prompt final para colar no Codex

```md
Você atuará como auditor/revisor de qualidade do projeto Quiz TDAH v1.

## Contexto

Este projeto é um quiz interativo para adultos com TDAH no Brasil. Ele é o elemento central de um funil de vendas para um planner personalizado para TDAH.

O quiz tem dois objetivos simultâneos:

1. Mapear o perfil do usuário em 5 dimensões: Desatenção, Impulsividade, Autorregulação, Aspectos Emocionais e Hiperatividade.
2. Conduzir o usuário por uma jornada emocional de reconhecimento, validação, esperança, conexão e desejo de compra.

## Fontes obrigatórias

Leia cuidadosamente:

- `quiz/quiz-tdah-especificacao-completa.md`
- `quiz/quiz-tdah-v1.jsx`

Antes de auditar visualmente, crie um mapa do produto:

- fluxo previsto no escopo;
- fluxo real no código;
- componentes React;
- estados;
- scoring;
- arquétipos;
- marcos;
- tela de processamento;
- resultado;
- CTA final.

## Objetivo da tarefa

Auditar profundamente o quiz de ponta a ponta, como especialista em:

- UX/UI para pessoas com TDAH;
- design de atenção e manutenção de dopamina;
- copywriting emocional e persuasivo;
- marketing digital;
- funil de vendas;
- gamificação;
- acessibilidade;
- mobile-first;
- qualidade de implementação;
- analytics e otimização de conversão.

Nesta tarefa, NÃO altere código. Apenas audite e produza um relatório completo de handoff.

## Ferramentas

Use o navegador/in-app browser ou Playwright para abrir o app local.

Se necessário:

1. Inicie o projeto localmente.
2. Abra o quiz no navegador.
3. Navegue manualmente e/ou com automação.
4. Capture screenshots dos estados relevantes.
5. Verifique console.
6. Rode testes de acessibilidade com axe-core, se disponível.
7. Teste em pelo menos estas larguras:
   - 320px
   - 390px
   - 768px
   - desktop

## Simulações obrigatórias

Navegue o quiz como diferentes usuários:

1. Usuário desatento e impaciente.
2. Usuário hiperativo/explorador.
3. Usuário emocionalmente sensível/RSD.
4. Usuário com mascaramento e burnout.
5. Usuário criativo caótico.
6. Usuário cético antes da compra.
7. Usuário mobile ansioso.
8. Usuário que navega por teclado.
9. Usuário com redução de movimento ativada.

## Caminhos obrigatórios por arquétipo

Cada string representa Q1 a Q15:

- O Nômade Quântico: `ABBDCADDCCDCDAC`
- O Reator em Cadeia: `BAABCBBADBDAABC`
- O Vulcão Silencioso: `BDCDCDDABABADAA`
- O Arquiteto do Caos: `BAABDBCAADADCBB`
- O Furacão: `ABACAAAACBBAABA`
- O Camaleão Exausto: `BDBBBBDACCBDCDC`

Também teste:

- Tudo A.
- Tudo B.
- Tudo C.
- Tudo D.
- Alternado A/D.
- Respostas rápidas.
- Respostas lentas.

## Checklist de auditoria

Avalie:

### Aderência ao escopo

- O fluxo implementado bate com o escopo?
- As telas existem na ordem esperada?
- Os marcos aparecem no momento correto?
- O XP segue exatamente a regra especificada?
- A barra de progresso reflete a percepção correta do usuário?
- As microvalidações aparecem no timing correto?
- Os teasers progressivos existem?
- A tela de processamento dura 4-5 segundos?
- O resultado apresenta arquétipo, radar, reconhecimento, custo e ponte de venda?
- O CTA final funciona?

### UX/UI para TDAH

- Cada tela tem um foco claro?
- O texto é curto o suficiente?
- Há excesso de estímulo?
- A recompensa visual é imediata?
- O usuário sabe sempre quanto falta?
- As animações ajudam ou distraem?
- Existe risco de abandono por espera, confusão ou baixa recompensa?
- O ritmo mantém ciclos de novidade/recompensa?

### Conteúdo e copy

- Perguntas têm tamanho adequado?
- Alternativas são específicas e comportamentais?
- Microvalidações têm até 15 palavras?
- O tom é empático?
- Alguma frase soa clínica demais, patologizante ou manipulativa?
- O quiz evita parecer diagnóstico médico definitivo?
- O resultado gera identificação real?
- A ponte de venda é natural?

### Marketing e conversão

- A landing captura atenção em até 8 segundos?
- O CTA inicial é claro?
- A prova social é confiável?
- O resultado aumenta desejo pelo planner?
- O CTA final tem clareza, ação e tracking?
- O fluxo responde objeções?
- A compra parece uma continuação natural do autoconhecimento?

### Acessibilidade

- As opções são semanticamente botões/radios?
- Funciona com teclado?
- Há foco visível?
- Há labels/ARIA adequados?
- Microvalidações e mudanças de estado são anunciáveis?
- Contraste é suficiente?
- `prefers-reduced-motion` é respeitado?
- O app funciona em 320px?

### Scoring

- As pontuações por dimensão batem com o escopo?
- O uso de scoring secundário altera limites máximos?
- Os thresholds Normal/Moderado/Severo ainda fazem sentido?
- O radar usa denominador correto?
- O algoritmo de arquétipo lida bem com empates?
- O Marco 2 mostra dimensões que ainda não foram totalmente medidas?
- Caminhos esperados geram arquétipos corretos?

### Analytics

Verifique se existem ou devem existir:

- `quiz_started`
- `question_answered`
- `milestone_reached`
- `quiz_completed`
- `result_viewed`
- `cta_clicked`
- `quiz_abandoned`

Cada evento deve ter payload suficiente para otimizar abandono, tempo, CTA e conversão.

## Severidade

Classifique cada problema:

- P0: Bloqueia conversão, fluxo, resultado ou confiança.
- P1: Alto impacto em conclusão, TDAH UX, acessibilidade ou venda.
- P2: Melhoria importante, mas não bloqueadora.
- P3: Refinamento visual, copy ou polish.

## Formato obrigatório do relatório

Gere um arquivo Markdown em:

`audits/quiz-tdah-v1-handoff.md`

Com esta estrutura:

1. Resumo executivo.
2. Nota geral por categoria.
3. Mapa do fluxo real.
4. Matriz escopo vs implementação.
5. Simulações por persona.
6. Achados priorizados P0/P1/P2/P3.
7. Problemas de UX/UI.
8. Problemas de conteúdo/copy.
9. Problemas de marketing/conversão.
10. Problemas de scoring/arquétipos.
11. Problemas de acessibilidade/performance.
12. Problemas de analytics.
13. Backlog recomendado.
14. Critérios de aceite.
15. Plano de validação pós-ajustes.

Cada achado deve conter:

- ID.
- Severidade.
- Tela/etapa.
- Evidência.
- Impacto para pessoas com TDAH.
- Impacto na conversão.
- Recomendação.
- Critério de aceite.
- Referência ao arquivo/componente relevante.

Não termine com recomendações genéricas. Cada item precisa ser acionável.
```

---

## 10. Minha recomendação prática

Para essa primeira rodada, eu faria o Codex trabalhar em **3 passes**:

1. **Pass 1 — Auditoria estática:** comparar documento vs código, sem rodar app.
2. **Pass 2 — Auditoria navegada:** rodar o quiz, capturar jornada e simular personas.
3. **Pass 3 — Relatório de handoff:** consolidar achados e transformar em backlog priorizado.

O ponto mais importante: o Codex precisa ser orientado a **provar cada crítica com evidência**. Nada de “acho que ficaria melhor”. Para esse projeto, cada ajuste precisa responder: “isso aumenta clareza, reduz fricção, mantém dopamina ou melhora conversão?” 🎯

[1]: https://developers.openai.com/codex/guides/agents-md "Custom instructions with AGENTS.md – Codex | OpenAI Developers"
[2]: https://developers.openai.com/codex/skills "Agent Skills – Codex | OpenAI Developers"
[3]: https://developers.openai.com/codex/app/browser "In-app browser – Codex app | OpenAI Developers"
[4]: https://github.com/microsoft/playwright-mcp "GitHub - microsoft/playwright-mcp: Playwright MCP server · GitHub"
[5]: https://www.npmjs.com/package/chrome-devtools-mcp?utm_source=chatgpt.com "chrome-devtools-mcp - npm"
[6]: https://www.deque.com/axe/axe-core/?utm_source=chatgpt.com "Axe-core by Deque | open source accessibility engine for automated testing"
[7]: https://developers.openai.com/codex/subagents "Subagents – Codex | OpenAI Developers"
[8]: https://www.cdc.gov/adhd/diagnosis/index.html?utm_source=chatgpt.com "Diagnosing ADHD | Attention-Deficit / Hyperactivity Disorder (ADHD) | CDC"
