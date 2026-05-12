# Matriz de Personas — Simulação de Usuários

> Use esta matriz para guiar as simulações de jornada no quiz.
> Cada persona representa um padrão real de adulto com TDAH no Brasil.

---

## Personas de Simulação

### 1. `desatento-impaciente`

| Campo | Detalhe |
|---|---|
| **Perfil** | TDAH predominantemente desatento, diagnosticado tardio |
| **Comportamento** | Lê rápido, pula detalhes, esquece instruções iniciais |
| **Dispositivo** | Mobile, 1 mão, em movimento |
| **O que observar** | Clareza imediata da proposta, texto curto, distrações visuais, progresso visível |
| **Risco de abandono** | Qualquer pergunta confusa, lenta ou com texto longo |
| **Caminho de teste** | Respostas rápidas (< 3s por resposta) |

### 2. `hiperativo-explorador`

| Campo | Detalhe |
|---|---|
| **Perfil** | TDAH combinado com hiperatividade predominante |
| **Comportamento** | Clica rápido, busca estímulo constante, odeia espera sem feedback |
| **Dispositivo** | Desktop ou mobile |
| **O que observar** | Ritmo entre respostas, velocidade das animações, delay do botão "Próxima", microanimações |
| **Risco de abandono** | Qualquer espera sem feedback visual, tela parada por mais de 1-2s |
| **Caminho de teste** | Todas as opções A (mais severas), verificar bônus de velocidade (+5 XP) |

### 3. `emocional-rsd`

| Campo | Detalhe |
|---|---|
| **Perfil** | TDAH com Disforia por Sensibilidade à Rejeição (RSD) alta |
| **Comportamento** | Sensível a julgamento, lê as frases buscando tom crítico |
| **Dispositivo** | Qualquer |
| **O que observar** | Tom de cada micro-validação, copy das opções mais "pesadas", resultado — risco de vergonha ou culpa |
| **Risco de abandono** | Qualquer frase condescendente, julgadora ou clínica demais |
| **Caminho de teste** | Sequência: A, B, A, A, A, B, A, A, A, A, A, B, A, A, A |

### 4. `mascaramento-burnout`

| Campo | Detalhe |
|---|---|
| **Perfil** | TDAH com histórico de mascaramento — "funciona bem por fora" |
| **Comportamento** | Exausto por dentro, busca reconhecimento de que o esforço é real |
| **Dispositivo** | Qualquer |
| **O que observar** | Perguntas sobre mascaramento (Q15), resultado "Camaleão Exausto", identificação emocional |
| **Risco de abandono** | Copy que minimiza o esforço de funcionamento |
| **Caminho de teste** | Sequência do Camaleão Exausto: `BDBBBBDACCBDCDC` |

### 5. `caos-criativo`

| Campo | Detalhe |
|---|---|
| **Perfil** | TDAH com muitas ideias, muitos projetos iniciados, impulsividade alta |
| **Comportamento** | Responde rapidamente, se identifica com Q6 (cemitério de projetos) |
| **Dispositivo** | Qualquer |
| **O que observar** | Ponte do resultado para estrutura do planner, CTA do Arquiteto do Caos |
| **Risco de abandono** | Resultado que não explica como o planner resolve o problema específico |
| **Caminho de teste** | Sequência do Arquiteto do Caos: `BAABDBCAADADCBB` |

### 6. `cetico-conversao`

| Campo | Detalhe |
|---|---|
| **Perfil** | Adulto com TDAH que desconfia de produtos para TDAH |
| **Comportamento** | Lê tudo com olho crítico, procura manipulação, desconfia de promessas milagrosas |
| **Dispositivo** | Desktop |
| **O que observar** | Prova social (plausível?), urgência (genuína?), CTA (transparente?), disclaimer clínico |
| **Risco de abandono** | Qualquer elemento que pareça manipulativo ou exagerado |
| **Caminho de teste** | Tudo C (nível moderado — cético não assume o pior de si mesmo) |

### 7. `mobile-ansioso`

| Campo | Detalhe |
|---|---|
| **Perfil** | Qualquer perfil TDAH em celular pequeno, com pressa |
| **Comportamento** | Usa celular pequeno, 1 mão, scroll com polegar, pouca paciência |
| **Dispositivo** | 320px viewport |
| **O que observar** | Texto cortado, botões fora de alcance, scroll horizontal, legibilidade, tamanho da fonte |
| **Risco de abandono** | Qualquer elemento inacessível em 320px |
| **Caminho de teste** | Emular 320x568 no DevTools, completar quiz inteiro |

### 8. `teclado-acessibilidade`

| Campo | Detalhe |
|---|---|
| **Perfil** | Usuário com TDAH que navega por teclado (motor ou preferência) |
| **Comportamento** | Tab para navegar, Enter/Space para selecionar |
| **Dispositivo** | Desktop, sem mouse |
| **O que observar** | Foco visível, tab order, semântica das opções (botão/radio), aria-live para micro-validações |
| **Risco de abandono** | Foco invisível, div clicável sem role correto |
| **Caminho de teste** | Navegar quiz inteiro usando somente Tab + Enter/Space |

### 9. `reduced-motion`

| Campo | Detalhe |
|---|---|
| **Perfil** | Usuário sensível a excesso de movimento (pode ter enxaqueca, epilepsia ou simplesmente preferência) |
| **Comportamento** | Tem `prefers-reduced-motion: reduce` ativado no sistema |
| **Dispositivo** | Qualquer |
| **O que observar** | Confetti desativado, shimmer ausente, pulse sem movimento, animações simplificadas |
| **Risco de abandono** | Animações que ignoram a preferência do sistema |
| **Caminho de teste** | Emular `prefers-reduced-motion: reduce` no Chrome DevTools → Rendering |

---

## Caminhos de Resposta por Arquétipo

Use estas sequências de Q1 a Q15 para verificar se o scoring gera o arquétipo correto:

| Arquétipo esperado | Sequência | Verificar |
|---|---|---|
| O Nômade Quântico | `ABBDCADDCCDCDAC` | D=S, I=N, A=M, E=N, H=N |
| O Reator em Cadeia | `BAABCBBADBDAABC` | D=M, I=S, A=M, E=M, H=S |
| O Vulcão Silencioso | `BDCDCDDABABADAA` | D=M, I=M, A=S, E=S, H=N |
| O Arquiteto do Caos | `BAABDBCAADADCBB` | D=S, I=S, A=S, E=M, H=M |
| O Furacão | `ABACAAAACBBAABA` | D=S, I=S, A=S, E=S, H=S |
| O Camaleão Exausto | `BDBBBBDACCBDCDC` | D=M, I=M, A=M, E=M, H=N |

## Casos Extremos para Testar

| Caso | Sequência | Expectativa |
|---|---|---|
| Máxima severidade | `AAAAAAAAAAAAAAA` | Furacão (D=S, H=S, I=S, A=S, E=S) |
| Mínima severidade | `DDDDDDDDDDDDDDD` | Camaleão ou sem arquétipo claro |
| Alternado A/D | `ADADADADADADADA` | Perfil misto — verificar tie-breaker |
| Tudo B | `BBBBBBBBBBBBBBB` | Perfil Moderado em todas as dimensões |
| Tudo C | `CCCCCCCCCCCCCCC` | Normal/baixo em todas — verificar caso extremo §7.4 |
| Respostas rápidas | Tudo A em < 3s | Verificar bônus +5 XP por velocidade |
| Respostas lentas | Tudo A em > 10s | Sem bônus — verificar ausência de penalidade |
