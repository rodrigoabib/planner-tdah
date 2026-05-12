# QUIZ TDAH — ESPECIFICAÇÃO COMPLETA
### Funil de Vendas Interativo | Planner Personalizado para TDAH
**Versão:** 1.0 | **Status:** Especificação de Produto | **Público-alvo:** Adultos com TDAH (Brasil)

---

## ÍNDICE

1. [Visão Geral e Propósito](#1-visão-geral-e-propósito)
2. [Princípios de Design TDAH-UX](#2-princípios-de-design-tdah-ux)
3. [Arquitetura Geral do Quiz](#3-arquitetura-geral-do-quiz)
4. [Sistema de Gamificação](#4-sistema-de-gamificação)
5. [Fluxo Completo — Tela por Tela](#5-fluxo-completo--tela-por-tela)
6. [Banco de Perguntas — Especificação Completa](#6-banco-de-perguntas--especificação-completa)
7. [Sistema de Pontuação](#7-sistema-de-pontuação)
8. [Telas de Resultado — Por Arquétipo](#8-telas-de-resultado--por-arquétipo)
9. [Ponte de Venda — Copy e Estratégia](#9-ponte-de-venda--copy-e-estratégia)
10. [Diretrizes de Copywriting e Tom de Voz](#10-diretrizes-de-copywriting-e-tom-de-voz)
11. [Notas Técnicas de Implementação](#11-notas-técnicas-de-implementação)
12. [Referências e Fundamentação](#12-referências-e-fundamentação)

---

## 1. VISÃO GERAL E PROPÓSITO

### 1.1 O que é este documento

Este documento especifica, de forma completa e executável, a estrutura de um quiz interativo de mapeamento de perfil TDAH. O quiz é o **elemento central do funil de vendas** de um planner personalizado para adultos com TDAH no mercado brasileiro.

O quiz serve a **dois objetivos simultâneos e inseparáveis:**

| Objetivo | Descrição |
|---|---|
| **Diagnóstico** | Mapear o perfil da pessoa nas 5 dimensões da escala ETDAH-AD, identificando nível de severidade e arquétipo dominante |
| **Conversão** | Conduzir a pessoa por uma jornada emocional de reconhecimento, validação e desejo — culminando em uma compra naturalmente motivada |

### 1.2 Fundamento Clínico

O quiz é baseado na **Escala ETDAH-AD**, que avalia TDAH em adultos através de cinco dimensões:

| Dimensão | Código | O que avalia |
|---|---|---|
| Desatenção | **D** | Dificuldade de manutenção de foco, memória de trabalho, conclusão de tarefas |
| Impulsividade | **I** | Controle de impulso verbal, comportamental e econômico |
| Autorregulação | **A** | Iniciação de tarefas, consistência de rotina, recuperação pós-falha |
| Aspectos Emocionais | **E** | Sensibilidade à rejeição (RSD), regulação emocional, medo de falha |
| Hiperatividade | **H** | Agitação física e mental, busca por estimulação, regulação noturna |

**Níveis de severidade por dimensão:**

| Nível | Percentil | Pontuação (quiz) |
|---|---|---|
| Normal | 0–50 | 0–3 pontos |
| Moderado | 51–75 | 4–6 pontos |
| Severo | 76–100 | 7–9 pontos |

### 1.3 Os 6 Arquétipos

O quiz identifica um dos seis arquétipos definidos com base nos padrões de combinação de severidade:

| # | Arquétipo | Perfil de Severidade (D/I/A/E/H) |
|---|---|---|
| 1 | **O Nômade Quântico** | S / N / M / N / N |
| 2 | **O Reator em Cadeia** | M / S / M / M / S |
| 3 | **O Vulcão Silencioso** | M / M / S / S / N |
| 4 | **O Arquiteto do Caos** | S / S / S / M / M |
| 5 | **O Furacão** | S / S / S / S / S |
| 6 | **O Camaleão Exausto** | M / M / M / M / N |

*Onde: S = Severo, M = Moderado, N = Normal*

---

## 2. PRINCÍPIOS DE DESIGN TDAH-UX

> Antes de qualquer decisão de design ou copy, estes princípios devem ser consultados. Eles não são sugestões — são **restrições de design obrigatórias** para que o quiz funcione com o público-alvo.

### 2.1 O Cérebro TDAH e Dopamina

Pessoas com TDAH têm um sistema de dopamina que funciona de forma diferente: a motivação não vem de "importância" da tarefa, mas de **novidade, urgência, desafio, interesse e recompensa imediata**. O design do quiz deve criar fontes artificiais e contínuas desses gatilhos.

### 2.2 Regras de Interface — O que NUNCA fazer

| ❌ NÃO FAZER | ✅ FAZER EM VEZ DISSO |
|---|---|
| Perguntas com mais de 15 palavras | Frases diretas, máximo 12 palavras |
| Opções de resposta vagas ("às vezes", "nunca") | Opções específicas e comportamentais |
| Mais de 4 opções por pergunta | Exatamente 4 opções por pergunta |
| Opções com mais de 8 palavras | Frases curtas e marcantes |
| Esconder quanto falta para terminar | Progresso sempre visível (fração + barra) |
| Transições bruscas entre perguntas | Transições suaves com micro-animação |
| Telas com múltiplos elementos competindo | Uma pergunta por tela, sem distrações |
| Linguagem clínica e patologizante | Linguagem empática e de reconhecimento |
| Blocos de texto explicativo | Máximo 2 frases de contextualização |
| Espera sem feedback visual | Animação em toda transição de estado |
| Perguntar frequência em escala abstrata | Contextualizar com situações reais |
| Botões de navegação genéricos | CTAs com ação clara e específica |

### 2.3 Regras de Engajamento

**Lei da Antecipação:** O cérebro TDAH se engaja quando sabe que uma recompensa está chegando. Cada pergunta deve criar expectativa da próxima.

**Lei da Micro-recompensa:** Cada resposta selecionada deve ter feedback imediato e satisfatório — visual, sonoro (opcional) ou textual.

**Lei da Visibilidade do Fim:** A pessoa deve saber **exatamente** onde está no quiz a qualquer momento. "Pergunta 7 de 15" + barra preenchida + porcentagem.

**Lei do Reconhecimento:** Cada pergunta deve fazer a pessoa pensar "nossa, como eles sabem disso sobre mim?" — isso cria vínculo e dopamina simultâneos.

**Lei da Variação:** Não repetir o mesmo formato de pergunta mais de 2 vezes seguidas. Alternar entre frequência, cenário e sentimento.

### 2.4 Arco Emocional do Quiz

O quiz deve conduzir a pessoa por um arco emocional deliberado:

```
Q1–Q5   →  Reconhecimento   ("Eles me entendem")
Q6–Q10  →  Validação         ("Faz todo sentido que seja assim")
Q11–Q15 →  Esperança         ("Existe solução para isso")
Resultado →  Conexão + Desejo ("Isso foi feito para mim")
```

---

## 3. ARQUITETURA GERAL DO QUIZ

### 3.1 Estrutura de Alto Nível

```
ANÚNCIO INSTAGRAM
        ↓
LANDING PAGE (hook + CTA "Descobrir meu perfil")
        ↓
TELA DE ENTRADA DO QUIZ (proposta de valor + início)
        ↓
BLOCO 1 — Q1 a Q5 — "Reconhecendo Seu Cérebro"
        ↓ (Marco 1 após Q5 — Insight Reveal #1)
BLOCO 2 — Q6 a Q10 — "Entendendo Seu Padrão"
        ↓ (Marco 2 após Q10 — Insight Reveal #2 + Radar parcial)
BLOCO 3 — Q11 a Q15 — "Mapeando Seu Perfil Único"
        ↓ (Marco 3 após Q15 — Celebração + transição)
TELA DE PROCESSAMENTO (animação de análise, 4 segundos)
        ↓
TELA DE RESULTADO (arquétipo + radar chart + reconhecimento)
        ↓
PONTE DE VENDA (ponte arquétipo → planner específico)
        ↓
PÁGINA DE VENDA DO PLANNER
```

### 3.2 Volume e Distribuição de Perguntas

| Bloco | Perguntas | Tema | Dimensões cobertas |
|---|---|---|---|
| Bloco 1 | Q1–Q5 | Reconhecimento | D, H, I, A, E (1ª pergunta de cada) |
| Bloco 2 | Q6–Q10 | Padrão comportamental | D, H, I, A, E (2ª pergunta de cada) |
| Bloco 3 | Q11–Q15 | Aprofundamento e mapeamento | D, H, I, A, E (3ª pergunta de cada) |

**Total: 15 perguntas** — 3 por dimensão, cobrindo diferentes facetas de cada aspecto do TDAH.

**Tempo médio esperado:** 4–6 minutos (15–25 segundos por pergunta incluindo leitura + micro-validação).

### 3.3 Cobertura Temática por Dimensão

| Dimensão | Q primária 1 | Q primária 2 | Q primária 3 |
|---|---|---|---|
| **Desatenção (D)** | Absorção de leitura | Conclusão de projetos | Memória de objetos |
| **Hiperatividade (H)** | Agitação física/mental | Regulação noturna | Tolerância ao tédio |
| **Impulsividade (I)** | Ação antes do pensamento | Gastos e compromissos | Interrupção em conversas |
| **Autorregulação (A)** | Paralisia de iniciação | Recuperação pós-falha | Consistência de rotina |
| **Aspectos Emocionais (E)** | Sensibilidade à crítica | Paralisia por medo de falha | Custo do mascaramento |

---

## 4. SISTEMA DE GAMIFICAÇÃO

### 4.1 Economia de XP (Experiência)

O sistema de XP é **visível para o usuário** e aparece no canto superior da tela como um contador animado.

| Evento | XP ganho |
|---|---|
| Responder qualquer pergunta | +10 XP |
| Responder em menos de 5 segundos (bônus velocidade) | +5 XP adicional |
| Completar o Marco 1 (Q5) | +25 XP |
| Completar o Marco 2 (Q10) | +25 XP |
| Completar o Marco 3 (Q15) | +50 XP |
| **XP total máximo possível** | **300 XP** |

**Exibição:** Contador de XP com animação de "+10 XP" flutuando para cima ao responder cada pergunta. A animação deve durar 0.8s e desaparecer suavemente.

**Por que XP funciona para TDAH:** Cria uma recompensa imediata visível e concreta a cada ação. O número crescendo ativa o mesmo circuito de recompensa que notificações e jogos digitais.

### 4.2 Barra de Progresso — Especificação Completa

A barra de progresso é o **elemento mais crítico da interface** para manutenção do engajamento TDAH.

**Componentes obrigatórios da barra:**
- Fração numérica: "Pergunta **7** de 15"
- Porcentagem: "46%"
- Barra visual preenchida progressivamente
- Efeito shimmer na porção preenchida (movimento de luz suave da esquerda para a direita, loop contínuo)
- Cor da barra muda gradualmente conforme progresso: inicio azul/roxo → meio ciano → final dourado/âmbar

**Comportamento ao avançar pergunta:**
1. Usuário seleciona resposta → resposta pisca levemente (0.2s) confirmando seleção
2. Micro-validação aparece abaixo da resposta selecionada (0.5s de delay)
3. Botão "Próxima →" aparece (após 1s de exibição da micro-validação)
4. Usuário clica "Próxima →" → barra avança com animação fluida (0.4s ease-out)
5. XP counter atualiza com animação flutuante
6. Nova pergunta entra com slide suave da direita (0.3s)

**Posicionamento:** Topo da tela, fixo, sempre visível durante scroll (se houver).

### 4.3 Timeline de Pontos — Trilha Visual

Abaixo da barra de progresso principal, exibir uma trilha de 15 pontos circulares pequenos (6px de diâmetro):
- Perguntas não respondidas: círculo vazio, cor cinza claro
- Pergunta atual: círculo com pulso animado (pulse de 1s), cor de destaque
- Perguntas respondidas: círculo preenchido, cor de confirmação (verde)
- Marcos (Q5, Q10, Q15): círculo maior (10px), cor dourada

**Efeito de milestone:** Ao completar Q5, Q10 ou Q15, os círculos desse marco pulsam brevemente em conjunto antes de acender em dourado.

### 4.4 Micro-validações por Pergunta

Após cada resposta selecionada e antes de avançar, exibir **uma frase de micro-validação** específica para a resposta escolhida.

**Especificações:**
- Máximo: 15 palavras
- Tom: empático, informativo, nunca condescendente
- Formato: texto em itálico, cor secundária (não competindo com a pergunta)
- Duração de exibição: visível até o usuário clicar "Próxima →"
- Cada opção (A, B, C, D) tem sua própria micro-validação

**Propósito dual das micro-validações:**
1. Criar sensação de que o sistema "entende" a pessoa
2. Plantar curiosidade sobre o que o resultado revelará

> As micro-validações completas de cada pergunta estão especificadas na Seção 6.

### 4.5 Marcos e Celebrações

#### Marco 1 — Após Q5 (33% concluído)

**Sequência de eventos:**
1. Partículas coloridas aparecem brevemente na tela (1.5s, não obstrutivo)
2. XP bônus animado: "+25 XP · Marco Desbloqueado!"
3. Card de insight aparece:

```
╔════════════════════════════════════════╗
║  🧠  TRAÇO DETECTADO                   ║
║                                        ║
║  Suas primeiras 5 respostas revelam    ║
║  um padrão. Seu cérebro processa o     ║
║  mundo de forma bem intensa.           ║
║                                        ║
║  [Continuar — faltam 10 perguntas →]   ║
╚════════════════════════════════════════╝
```

4. O card permanece até o usuário clicar em "Continuar"

#### Marco 2 — Após Q10 (67% concluído)

**Sequência de eventos:**
1. Animação mais elaborada: barra de progresso pisca em dourado por 1s
2. XP bônus: "+25 XP · Metade revelada!"
3. Card de insight com radar parcial:

```
╔════════════════════════════════════════╗
║  ⚡  SEU PERFIL ESTÁ SE FORMANDO       ║
║                                        ║
║  [Radar chart parcialmente preenchido  ║
║   — dados de 3 dimensões visíveis,     ║
║   2 com ícone de cadeado/blur]         ║
║                                        ║
║  Faltam 5 perguntas para desbloquear   ║
║  seu perfil completo.                  ║
║                                        ║
║  [Desbloquear meu perfil →]            ║
╚════════════════════════════════════════╝
```

**Especificação do radar parcial:**
- Exibir os dados reais das dimensões D, H e I (já completamente avaliadas)
- As dimensões A e E aparecem com os eixos visíveis mas os dados borrados/com cadeado
- Adicionar texto: "🔒 Desbloqueado após Q15"

4. O card permanece até o usuário clicar em "Desbloquear meu perfil →"

#### Marco 3 — Após Q15 (100% concluído)

**Sequência de eventos:**
1. Confetti completo (2s) + som opcional (sucesso)
2. Barra de progresso fica 100% dourada com shimmer intenso
3. XP final: "+50 XP · PERFIL COMPLETO!"
4. Transição automática após 2s para a Tela de Processamento

### 4.6 Teasers de Perfil — Curiosidade Progressiva

Em momentos estratégicos entre perguntas, exibir **mensagens curtas não-bloqueantes** que alimentam a curiosidade sem revelar o resultado:

| Após Q | Mensagem teaser |
|---|---|
| Q3 | *(pequeno texto cinza abaixo da barra)* "Padrão interessante detectado..." |
| Q7 | "Seu perfil está tomando uma forma específica." |
| Q9 | "Você respondeu de forma muito próxima a um dos 6 perfis." |
| Q12 | "Faltam 3 perguntas. O sistema identificou algo claro." |
| Q14 | "Última reta — quase lá." |

Esses textos aparecem brevemente (fade in/out, 2s) na parte inferior da tela, **sem bloquear** a navegação.

---

## 5. FLUXO COMPLETO — TELA POR TELA

### 5.1 Tela de Entrada do Quiz

**Objetivo:** Converter clique do anúncio em início do quiz. Tempo na tela: máximo 8 segundos de leitura.

**Elementos obrigatórios:**
- Título impactante (máximo 8 palavras)
- Subtítulo de contexto (máximo 15 palavras)
- Informação de tempo estimado: "~5 minutos · 15 perguntas · resultado imediato"
- Botão de CTA principal
- Indicador de quantas pessoas já fizeram (prova social)

**Copy sugerido:**

```
Qual tipo de TDAH é o seu?

Descubra seu perfil único em 15 perguntas —
e o sistema que foi feito para o SEU cérebro.

⏱ ~5 minutos   ✓ 15 perguntas   🎯 Resultado imediato

[Descobrir meu perfil →]

47.382 pessoas já descobriram o seu
```

### 5.2 Tela de Cada Pergunta

**Layout fixo (nunca variar estrutura visual entre perguntas):**

```
[XP COUNTER]                    [PROGRESSO: 7/15 | 46%]

████████████████░░░░░░░░░░░░░░ (barra de progresso)
● ● ● ● ● ◉ ✓ ○ ○ ○ ○ ○ ○ ○ ○ (timeline de pontos)

──────────────────────────────────────────

PERGUNTA

[Texto da pergunta aqui — máximo 12 palavras]

──────────────────────────────────────────

○  [Opção A — máximo 8 palavras]

○  [Opção B — máximo 8 palavras]

○  [Opção C — máximo 8 palavras]

○  [Opção D — máximo 8 palavras]

──────────────────────────────────────────

💬 [Micro-validação — aparece após selecionar]

[Próxima →]  ← aparece após selecionar + 1s
```

**Comportamentos interativos:**
- Radio buttons: ao selecionar, opção selecionada recebe fundo de destaque + ícone ✓
- Opções não selecionadas ficam levemente opacas (opacity: 0.5)
- Micro-validação aparece com fade-in suave (0.4s)
- Botão "Próxima →" aparece com slide-up suave após 1s da seleção
- Botão de voltar (discreto, no canto) disponível apenas até Q14

### 5.3 Tela de Processamento

**Duração:** 4–5 segundos (não encurtar — a antecipação é fundamental)

**Sequência de animações:**
- Segundo 0–1: Aparece ícone de cérebro animado (pulse)
- Segundo 1–2: Primeira mensagem rotativa
- Segundo 2–3: Segunda mensagem + barra de análise começando a preencher
- Segundo 3–4: Terceira mensagem + barra chegando a 90%
- Segundo 4: "Seu perfil está pronto." + barra 100% + transição automática

**Mensagens rotativas:**
```
"Analisando 847 padrões comportamentais..."
"Cruzando com perfis reais de adultos com TDAH..."
"Mapeando suas dimensões neurológicas únicas..."
"Seu perfil está pronto."
```

**Por que 4 segundos?** A dopamina é liberada durante a *espera* pela recompensa, não só na recompensa em si. Encurtar esse tempo reduz o impacto emocional do resultado.

### 5.4 Tela de Resultado

Especificada completamente na Seção 8, por arquétipo.

### 5.5 Ponte de Venda

Especificada completamente na Seção 9.

---

## 6. BANCO DE PERGUNTAS — ESPECIFICAÇÃO COMPLETA

> **Legenda de scoring:**
> Cada resposta atribui pontos às dimensões indicadas.
> Formato: `DIMENSÃO:PONTOS` | Ex: `D:3` = 3 pontos em Desatenção
> Resposta A é sempre a de maior severidade, D é sempre a de menor.

---

### BLOCO 1 — "Reconhecendo Seu Cérebro" (Q1–Q5)

---

#### Q1 | Dimensão: DESATENÇÃO | Tema: Absorção de Informação

**Pergunta:**
> "Você começa a ler algo e chega no fim sem ter absorvido nada?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Sempre — releio o mesmo parágrafo várias vezes | `D:3` |
| B | Frequentemente, se o assunto for chato | `D:2` |
| C | Às vezes, depende do meu estado | `D:1` |
| D | Raramente acontece comigo | `D:0` |

**Micro-validações:**

| Opção selecionada | Micro-validação |
|---|---|
| A | *"Múltiplas camadas de processamento simultâneo tornam a leitura linear um desafio real."* |
| B | *"O filtro de interesse do seu cérebro é potente — não é preguiça."* |
| C | *"Estado emocional e contexto afetam a absorção mais do que parece."* |
| D | *"Processamento de leitura mais estável é uma informação importante para o seu perfil."* |

**Nota de design:** Pergunta de abertura propositalmente reconhecível — alta porcentagem de adultos com TDAH se identifica imediatamente com o cenário.

---

#### Q2 | Dimensão: HIPERATIVIDADE | Tema: Regulação Física e Mental

**Pergunta:**
> "Fica difícil ficar parado — no corpo ou na cabeça?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Corpo agitado e mente acelerada ao mesmo tempo | `H:3` |
| B | Mentalmente sempre; fisicamente consigo me conter | `H:2, D:1` |
| C | Em algumas situações me sinto muito agitado | `H:1` |
| D | Geralmente consigo ficar quieto sem problema | `H:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"Quando corpo e mente estão em overdrive juntos, o esforço de 'parecer calmo' é enorme."* |
| B | *"A agitação interna invisível pode ser mais exaustiva do que a física — e menos reconhecida."* |
| C | *"Gatilhos situacionais de agitação são uma característica real do TDAH, não fraqueza."* |
| D | *"Regulação física mais estável é uma variável importante no mapeamento do seu perfil."* |

**Nota de design:** A opção B captura explicitamente o perfil de TDAH predominantemente desatento sem hiperatividade motora visível — muito comum em mulheres e adultos. Inclui scoring secundário em D.

---

#### Q3 | Dimensão: IMPULSIVIDADE | Tema: Controle de Impulso

**Pergunta:**
> "Você age ou fala antes de terminar de pensar?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Sim — e frequentemente me arrependo depois | `I:3` |
| B | Quando animado ou ansioso, perco o freio | `I:2` |
| C | Acontece sob pressão, mas consigo me conter | `I:1` |
| D | Geralmente consigo pausar antes de agir | `I:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"O circuito de freio executivo no TDAH funciona diferente — o arrependimento posterior é parte do padrão."* |
| B | *"Emoções intensas liberam impulso mesmo quando a intenção é outra — isso é neurológico."* |
| C | *"Pressão como gatilho de impulsividade é específico e completamente mapeável."* |
| D | *"Controle de impulso mais ativo é uma variável distinta no seu perfil."* |

---

#### Q4 | Dimensão: AUTORREGULAÇÃO | Tema: Paralisia de Iniciação

**Pergunta:**
> "Você sabe o que precisa fazer, mas não consegue começar?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Toda hora — a paralisia é quase física às vezes | `A:3` |
| B | Frequentemente, especialmente sem pressão externa | `A:2` |
| C | Às vezes, quando estou sobrecarregado | `A:1` |
| D | Consigo começar com certa facilidade | `A:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"Paralisia de iniciação não é preguiça — é o sistema de ativação executiva operando diferente."* |
| B | *"Pressão externa como substituto de motivação interna é um dos padrões mais clássicos do TDAH."* |
| C | *"Sobrecarga como gatilho de paralisia faz todo sentido neurologicamente."* |
| D | *"Iniciação mais ativa é uma capacidade relevante no mapeamento do seu perfil."* |

---

#### Q5 | Dimensão: ASPECTOS EMOCIONAIS | Tema: Sensibilidade à Rejeição

**Pergunta:**
> "Uma crítica, mesmo pequena, consegue estragar seu dia inteiro?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Sim — dói de um jeito difícil de explicar | `E:3` |
| B | Fico ruminando por horas sem conseguir soltar | `E:2` |
| C | Me afeta, mas supero no mesmo dia | `E:1` |
| D | Consigo separar crítica de ataque com facilidade | `E:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"A Disforia por Sensibilidade à Rejeição (RSD) é uma das experiências mais invisíveis e intensas do TDAH."* |
| B | *"Ruminação pós-crítica por horas é um padrão emocional real — não exagero."* |
| C | *"Impacto emocional moderado com recuperação no mesmo dia é uma informação relevante."* |
| D | *"Maior separação emocional de críticas é uma variável distinta no seu perfil."* |

**Nota de design:** Esta é propositalmente a pergunta mais emocional do Bloco 1. Posicionada em Q5 (último do bloco) para criar um pico emocional antes do Marco 1 — maximizando o impacto da celebração que vem a seguir.

---

> **[MARCO 1 — APÓS Q5]**
> Exibir celebração, insight reveal e card de curiosidade conforme especificado na Seção 4.5.

---

### BLOCO 2 — "Entendendo Seu Padrão" (Q6–Q10)

---

#### Q6 | Dimensão: DESATENÇÃO | Tema: Conclusão de Projetos

**Pergunta:**
> "Quantos projetos você começou nos últimos meses sem terminar?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Perdi a conta — tenho um cemitério de inícios | `D:3, A:1` |
| B | Mais de 5 — sempre surge algo mais urgente | `D:2, A:1` |
| C | 2 ou 3 — às vezes me perco mesmo | `D:1` |
| D | Costumo terminar o que começo | `D:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"Iniciar com entusiasmo e perder o fio é um padrão neurológico — o sistema de recompensa muda de canal."* |
| B | *"'Urgência nova' como substituto de conclusão é uma das experiências mais frustrantes do TDAH."* |
| C | *"Ciclos incompletos ocasionais são parte da variabilidade do perfil."* |
| D | *"Consistência de conclusão é uma força relevante no seu mapeamento."* |

**Nota de design:** Pergunta de scenario concreto (quantidade de projetos) ao invés de frequência abstrata. Muito mais relatable para TDAH — cria reconhecimento imediato e certo humor de autoconhecimento.

---

#### Q7 | Dimensão: HIPERATIVIDADE | Tema: Regulação Noturna

**Pergunta:**
> "Sua mente continua ativa à noite quando deveria descansar?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Toda noite — replay mental de tudo ao mesmo tempo | `H:3, E:1` |
| B | Frequentemente — levo muito tempo para desligar | `H:2` |
| C | Às vezes, em dias com muito estímulo | `H:1` |
| D | Geralmente consigo relaxar e dormir | `H:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"A mente TDAH muitas vezes só desacelera quando o corpo já não aguenta mais."* |
| B | *"O tempo para 'desligar' ser maior que o habitual é um custo de energia invisível."* |
| C | *"Gatilho de estimulação diária afetando o sono é um padrão reconhecível."* |
| D | *"Transição para descanso mais fluida é uma informação relevante para o perfil."* |

---

#### Q8 | Dimensão: IMPULSIVIDADE | Tema: Impulsividade Econômica e Social

**Pergunta:**
> "Você faz gastos ou compromissos por impulso e se arrepende depois?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Sim — finanças e agenda já pagaram o preço | `I:3` |
| B | Com coisas pequenas frequentemente, grandes às vezes | `I:2` |
| C | Ocasionalmente me pego comprando sem planejar | `I:1` |
| D | Costumo pensar antes de gastar ou me comprometer | `I:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"Impulsividade financeira e de compromissos é um dos impactos mais concretos e custosos do TDAH."* |
| B | *"Gradação do impulso — alto no pequeno, ocasional no grande — é um padrão específico e mapeável."* |
| C | *"Compras ocasionais por impulso em nível controlável são parte do espectro."* |
| D | *"Planejamento anterior à ação é uma variável de controle importante."* |

---

#### Q9 | Dimensão: AUTORREGULAÇÃO | Tema: Recuperação Pós-Falha

**Pergunta:**
> "Depois de um dia ruim ou uma falha, quanto tempo para retomar?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Dias ou semanas — um erro derruba tudo | `A:3, E:2` |
| B | 2-3 dias para me religar e retomar o ritmo | `A:2, E:1` |
| C | Umas horas — no mesmo dia consigo reagrupar | `A:1` |
| D | Geralmente retomo no dia seguinte normalmente | `A:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"Quando uma falha derruba o sistema inteiro, não é fraqueza — é autorregulação sob pressão máxima."* |
| B | *"2-3 dias para recovery é um custo real que poucas pessoas ao redor compreendem."* |
| C | *"Recuperação em horas mostra resiliência — e também um custo de energia no processo."* |
| D | *"Recovery mais ágil é uma capacidade relevante no seu perfil de autorregulação."* |

**Nota de design:** Esta é intencionalmente a pergunta mais validadora do Bloco 2. Muitos adultos com TDAH nunca ouviram que "o erro derrubando tudo" é um padrão clínico, não uma falha de caráter. Isso cria um momento de reconhecimento profundo.

---

#### Q10 | Dimensão: ASPECTOS EMOCIONAIS | Tema: Paralisia por Medo de Falha

**Pergunta:**
> "Você evita tentar coisas novas com medo de não ser bom o suficiente?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Muito — medo de falhar paralisa mais que falta de vontade | `E:3, A:1` |
| B | Frequentemente procrastino para não encarar a possível falha | `E:2` |
| C | Às vezes, quando o risco parece alto demais | `E:1` |
| D | Consigo tentar coisas novas sem esse medo me travar | `E:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"Paralisia por medo de julgamento é uma das formas mais silenciosas e paralisantes do TDAH emocional."* |
| B | *"Procrastinação como mecanismo de defesa contra falha é extremamente comum e pouco reconhecido."* |
| C | *"Avaliação de risco como filtro de tentativa é um padrão situacional compreensível."* |
| D | *"Disposição para tentar sem medo paralisante é uma informação relevante para o seu perfil."* |

---

> **[MARCO 2 — APÓS Q10]**
> Exibir celebração com radar chart parcial conforme especificado na Seção 4.5.

---

### BLOCO 3 — "Mapeando Seu Perfil Único" (Q11–Q15)

---

#### Q11 | Dimensão: DESATENÇÃO | Tema: Memória Prospectiva

**Pergunta:**
> "Com que frequência você perde objetos do dia a dia?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Quase todo dia — é uma busca constante | `D:3` |
| B | Algumas vezes por semana | `D:2` |
| C | De vez em quando, não é padrão | `D:1` |
| D | Raramente — sei onde as coisas estão | `D:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"Memória prospectiva e localização espacial de objetos são funções executivas diretamente afetadas pelo TDAH."* |
| B | *"Perda recorrente em frequência moderada ainda representa custo cognitivo real no dia a dia."* |
| C | *"Perda ocasional sem padrão fixo é uma variável do espectro."* |
| D | *"Memória de localização de objetos mais estável é uma informação relevante para o perfil."* |

---

#### Q12 | Dimensão: HIPERATIVIDADE | Tema: Tolerância ao Tédio

**Pergunta:**
> "Você se entedia rapidamente em situações que os outros aguentam bem?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Sempre — meu cérebro precisa de estímulo constante | `H:3, D:1` |
| B | Em reuniões longas, filas e esperas me consumo | `H:2` |
| C | Em algumas situações específicas me perco | `H:1` |
| D | Consigo tolerar situações calmas sem problema | `H:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"Busca constante por novidade é como o cérebro TDAH mantém dopamina em circulação."* |
| B | *"Situações estruturadas e longas são ambientes de baixa dopamina para cérebros TDAH."* |
| C | *"Gatilhos situacionais de tédio são reconhecíveis e previsíveis no perfil TDAH."* |
| D | *"Tolerância ao tédio mais ativa é uma variável de regulação relevante."* |

---

#### Q13 | Dimensão: IMPULSIVIDADE | Tema: Controle em Interações Sociais

**Pergunta:**
> "Você interrompe pessoas ou completa as frases delas sem querer?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Sim — percebo que já falei antes de pensar | `I:3` |
| B | Quando animado ou ansioso, não consigo esperar | `I:2` |
| C | Às vezes, principalmente em conversas longas | `I:1` |
| D | Consigo esperar minha vez sem dificuldade | `I:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"Interrupção não-intencional é uma das manifestações mais visíveis — e custosas socialmente — do TDAH."* |
| B | *"Estado emocional como gatilho de interrupção é um padrão específico e mapeável."* |
| C | *"Longas conversas como contexto de interrupção é uma variável situacional."* |
| D | *"Controle de espera em conversas é uma habilidade relevante no seu perfil."* |

---

#### Q14 | Dimensão: AUTORREGULAÇÃO | Tema: Consistência de Rotina

**Pergunta:**
> "Você consegue manter uma rotina por mais de duas semanas seguidas?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Nunca — quando começa bem, algo quebra e tudo vai | `A:3` |
| B | Raramente — minha consistência dura pouco | `A:2` |
| C | Às vezes — depende muito de fatores externos | `A:1` |
| D | Tenho rotinas que funcionam há um bom tempo | `A:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"Rupturas de rotina que derrubam tudo — sem retomada automática — é autorregulação sob alta pressão."* |
| B | *"Ciclos curtos de consistência são um padrão neurológico, não falta de disciplina ou vontade."* |
| C | *"Dependência de fatores externos para manter rotina é um dos padrões mais clássicos do TDAH."* |
| D | *"Rotinas mais estáveis e duradouras são uma capacidade relevante no seu perfil."* |

---

#### Q15 | Dimensão: ASPECTOS EMOCIONAIS | Tema: Custo do Mascaramento

**Pergunta:**
> "Você precisa de muito mais esforço que os outros para 'funcionar normal'?"

| Opção | Texto | Scoring |
|---|---|---|
| A | Sempre — é exaustivo. A maioria não imagina quanto. | `E:3, A:2` |
| B | Frequentemente — vivo no modo overdrive silencioso | `E:2, A:1` |
| C | Em algumas fases da vida isso é muito real | `E:1` |
| D | Na maioria das vezes me sinto equilibrado | `E:0` |

**Micro-validações:**

| Opção | Micro-validação |
|---|---|
| A | *"O custo invisível do mascaramento é real, documentado e profundamente pouco reconhecido."* |
| B | *"Overdrive silencioso é uma das formas mais exaustivas de viver com TDAH não tratado adequadamente."* |
| C | *"Fases de maior custo de funcionamento são parte da variabilidade do espectro."* |
| D | *"Sensação de equilíbrio mais frequente é uma informação relevante para o mapeamento."* |

**Nota de design:** Q15 é propositalmente a mais poderosa em termos de carga emocional. É a pergunta que mais valida a experiência de mascaramento — extremamente comum em adultos com TDAH diagnosticados tarde. Posicionada em último lugar para criar um pico emocional antes da tela de processamento.

---

> **[MARCO 3 — APÓS Q15]**
> Celebração completa + transição automática para Tela de Processamento.

---

## 7. SISTEMA DE PONTUAÇÃO

### 7.1 Matriz de Scoring — Visão Completa

| Pergunta | Dimensão Principal | A | B | C | D | Scoring Secundário |
|---|---|---|---|---|---|---|
| Q1 | Desatenção | D:3 | D:2 | D:1 | D:0 | — |
| Q2 | Hiperatividade | H:3 | H:2 | H:1 | H:0 | B→D:1 |
| Q3 | Impulsividade | I:3 | I:2 | I:1 | I:0 | — |
| Q4 | Autorregulação | A:3 | A:2 | A:1 | A:0 | — |
| Q5 | Aspectos Emocionais | E:3 | E:2 | E:1 | E:0 | — |
| Q6 | Desatenção | D:3 | D:2 | D:1 | D:0 | A→A:1, B→A:1 |
| Q7 | Hiperatividade | H:3 | H:2 | H:1 | H:0 | A→E:1 |
| Q8 | Impulsividade | I:3 | I:2 | I:1 | I:0 | — |
| Q9 | Autorregulação | A:3 | A:2 | A:1 | A:0 | A→E:2, B→E:1 |
| Q10 | Aspectos Emocionais | E:3 | E:2 | E:1 | E:0 | A→A:1 |
| Q11 | Desatenção | D:3 | D:2 | D:1 | D:0 | — |
| Q12 | Hiperatividade | H:3 | H:2 | H:1 | H:0 | A→D:1 |
| Q13 | Impulsividade | I:3 | I:2 | I:1 | I:0 | — |
| Q14 | Autorregulação | A:3 | A:2 | A:1 | A:0 | — |
| Q15 | Aspectos Emocionais | E:3 | E:2 | E:1 | E:0 | A→A:2, B→A:1 |

### 7.2 Cálculo dos Scores por Dimensão

**Score primário por dimensão** (máximo = 9 por dimensão, via 3 perguntas dedicadas):

```
D_primário = Q1 + Q6 + Q11            (máx: 9)
H_primário = Q2 + Q7 + Q12            (máx: 9)
I_primário  = Q3 + Q8 + Q13            (máx: 9)
A_primário  = Q4 + Q9 + Q14            (máx: 9)
E_primário  = Q5 + Q10 + Q15           (máx: 9)
```

**Scores secundários** (adicionados ao score primário, cap de +2 por dimensão):

```
D_secundário = min(Q2_B_score + Q12_A_score, 2)
A_secundário = min(Q6_A_ou_B_score + Q9_A_ou_B_score + Q10_A_score + Q15_A_ou_B_score, 2)
E_secundário = min(Q7_A_score + Q9_A_ou_B_score, 2)
```

**Score final por dimensão:**
```
D_final = min(D_primário + D_secundário, 11)
H_final = H_primário   (sem secundário significativo)
I_final  = I_primário   (sem secundário significativo)
A_final = min(A_primário + A_secundário, 11)
E_final = min(E_primário + E_secundário, 11)
```

### 7.3 Classificação de Severidade

| Score final (0–11) | Severidade | Código |
|---|---|---|
| 0–3 | Normal | N |
| 4–6 | Moderado | M |
| 7–11 | Severo | S |

### 7.4 Algoritmo de Identificação do Arquétipo

**Passo 1:** Converter todos os scores finais em severidade (N, M, S)

**Passo 2:** Comparar o perfil do usuário com cada arquétipo

Perfil de referência dos arquétipos:

| Arquétipo | D | I | A | E | H |
|---|---|---|---|---|---|
| Nômade Quântico | S | N | M | N | N |
| Reator em Cadeia | M | S | M | M | S |
| Vulcão Silencioso | M | M | S | S | N |
| Arquiteto do Caos | S | S | S | M | M |
| Furacão | S | S | S | S | S |
| Camaleão Exausto | M | M | M | M | N |

**Passo 3:** Calcular score de similaridade (Similarity Score)

Para cada arquétipo, somar pontos por dimensão:
- Mesma severidade: **2 pontos**
- Diferença de 1 nível: **1 ponto**
- Diferença de 2 níveis (N vs S): **0 pontos**

Score máximo por arquétipo: 10 (5 dimensões × 2 pontos)

**Passo 4:** Selecionar o arquétipo com maior Similarity Score

**Passo 5 — Tiebreaker** (se dois arquétipos empatam):
- Comparar quais dimensões têm score mais alto no perfil do usuário
- Selecionar o arquétipo cujas dimensões com S coincidem com as do usuário
- Se ainda empatar: priorizar o arquétipo cujas dores-chave mais aparecem nas respostas A do usuário

**Passo 6 — Caso extremo** (score muito baixo em todas as dimensões, perfil N/N/N/N/N):
- Este caso é raro dado o público (autodirecionado pelo anúncio)
- Exibir resultado do Camaleão Exausto com linguagem adaptada:
  *"Seu TDAH se manifesta de forma mais sutil — o que frequentemente significa que você desenvolveu habilidades de compensação ao longo dos anos. Isso tem um custo."*

### 7.5 Exemplo de Cálculo Completo

**Respostas hipotéticas:**

| Q | Resposta | Score Principal | Score Secundário |
|---|---|---|---|
| Q1 | A | D:3 | — |
| Q2 | B | H:2 | D:1 |
| Q3 | A | I:3 | — |
| Q4 | A | A:3 | — |
| Q5 | B | E:2 | — |
| Q6 | A | D:3 | A:1 |
| Q7 | C | H:1 | — |
| Q8 | A | I:3 | — |
| Q9 | A | A:3 | E:2 |
| Q10 | A | E:3 | A:1 |
| Q11 | B | D:2 | — |
| Q12 | B | H:2 | — |
| Q13 | A | I:3 | — |
| Q14 | A | A:3 | — |
| Q15 | A | E:3 | A:2 |

**Scores por dimensão:**
```
D: Q1(3) + Q6(3) + Q11(2) = 8 + sec(min(1+0,2)=1) = 9 → SEVERO
H: Q2(2) + Q7(1) + Q12(2) = 5 → MODERADO
I: Q3(3) + Q8(3) + Q13(3) = 9 → SEVERO
A: Q4(3) + Q9(3) + Q14(3) = 9 + sec(min(1+1+1+2,2)=2) = 11 → SEVERO
E: Q5(2) + Q10(3) + Q15(3) = 8 + sec(min(2,2)=2) = 10 → SEVERO
```

**Perfil do usuário:** D=S, I=S, A=S, E=S, H=M

**Similarity Scores:**

| Arquétipo | D | I | A | E | H | TOTAL |
|---|---|---|---|---|---|---|
| Nômade Quântico | 2(S/S) | 0(N/S) | 1(M/S) | 0(N/S) | 1(N/M) | **4** |
| Reator em Cadeia | 1(M/S) | 2(S/S) | 1(M/S) | 1(M/S) | 1(S/M) | **6** |
| Vulcão Silencioso | 1(M/S) | 1(M/S) | 2(S/S) | 2(S/S) | 1(N/M) | **7** |
| Arquiteto do Caos | 2(S/S) | 2(S/S) | 2(S/S) | 1(M/S) | 1(M/M) | **8** |
| **Furacão** | **2(S/S)** | **2(S/S)** | **2(S/S)** | **2(S/S)** | **1(S/M)** | **9** |
| Camaleão Exausto | 1(M/S) | 1(M/S) | 1(M/S) | 1(M/S) | 1(N/M) | **5** |

**Resultado: O Furacão (Similarity Score: 9)**

---

## 8. TELAS DE RESULTADO — POR ARQUÉTIPO

### 8.1 Estrutura Padrão de Todas as Telas de Resultado

```
[1] HEADER — Símbolo animado + Nome do Arquétipo + Tagline
[2] RADAR CHART — Progressivamente animado
[3] "VOCÊ É ASSIM" — 3 frases de reconhecimento profundo
[4] "O QUE ISSO TE CUSTA" — 2 impactos honestos (cria dor consciente)
[5] PONTE PARA SOLUÇÃO — Conexão arquétipo → planner
[6] CTA PRINCIPAL — Botão de compra
[7] CTA SECUNDÁRIO — Explorar outros arquétipos
```

**Especificações visuais comuns a todos:**
- Cor de destaque do arquétipo permeia toda a tela (bordas, accents, ícone do radar)
- Radar chart anima segmento por segmento, da posição 12h em sentido horário
- Cada dimensão do radar tem label: D / H / I / A / E
- Seções separadas por linha fina divisória, sem excesso de peso visual
- Scroll suave para baixo — CTA de compra fica ao final natural da leitura

---

### 8.2 O Nômade Quântico

**Cor:** #7C3AED (roxo) | **Símbolo:** ∞

**Tagline:** *"Presente em todos os lugares. Em nenhum ao mesmo tempo."*

**Radar:** D=alto, I=baixo, A=médio, E=baixo, H=baixo

**"Você é assim":**
> ∙ Você relê o mesmo parágrafo três vezes — e ainda assim não absorve.
> ∙ Você tem ideias ricas e profundas, mas horas se passam antes de colocá-las em prática.
> ∙ Às vezes você "viaja" no meio de uma conversa e volta sem saber exatamente o que perdeu.

**"O que isso te custa":**
> ∙ Compromissos importantes escapam da memória mesmo com boa intenção.
> ∙ A sensação de que o tempo passou sem você perceber é constante — e frustrante.

**Ponte de venda:**
> Planners lineares assumem que você vai lembrar de olhar para eles. O Planner do Nômade Quântico foi construído em torno de **âncoras temporais visuais, captura rápida de ideias e lembretes contextuais** — para que o mundo externo te alcance antes que o tempo escape.

**CTA:** `[Quero meu Planner Nômade Quântico →]`

---

### 8.3 O Reator em Cadeia

**Cor:** #DC2626 (vermelho) | **Símbolo:** ▲

**Tagline:** *"Energia infinita. Freio é opcional."*

**Radar:** D=médio, I=alto, A=médio, E=médio, H=alto

**"Você é assim":**
> ∙ Você decide enquanto ainda está terminando de pensar na decisão anterior.
> ∙ Projetos começam com 100% de entusiasmo — e perdem combustível antes da metade.
> ∙ A energia que os outros veem como carisma, você sabe que é o freio faltando.

**"O que isso te custa":**
> ∙ Decisões rápidas já custaram dinheiro, relacionamentos ou oportunidades — mais de uma vez.
> ∙ Manter qualquer coisa consistente por mais de algumas semanas é uma luta real.

**Ponte de venda:**
> Planners tradicionais ignoram que você tem energia de sobra mas freio insuficiente. O Planner do Reator em Cadeia usa **speed bumps intencionais** — pausas antes de decisões grandes, gestão de energia em blocos e checkpoints de consistência — para canalizar o que você já tem.

**CTA:** `[Quero meu Planner Reator em Cadeia →]`

---

### 8.4 O Vulcão Silencioso

**Cor:** #D97706 (âmbar) | **Símbolo:** ◆

**Tagline:** *"Por fora: calma. Por dentro: lava."*

**Radar:** D=médio, I=médio, A=alto, E=alto, H=baixo

**"Você é assim":**
> ∙ Por fora você parece bem. Só você sabe o que está acontecendo por dentro.
> ∙ Uma crítica pequena pode desestabilizar um dia inteiro — e é difícil explicar por quê.
> ∙ Você adia tarefas não por preguiça, mas por medo real de não ser bom o suficiente.

**"O que isso te custa":**
> ∙ A batalha emocional diária é invisível para quase todos ao redor — e isso isola.
> ∙ Depois de um erro ou falha, retomar pode levar dias que custam muito.

**Ponte de venda:**
> Planners que não reconhecem estados emocionais falham nos seus dias difíceis. O Planner do Vulcão Silencioso inclui **check-ins de humor diários, dias de buffer automáticos e estrutura adaptável ao estado do dia** — sem te exigir o mesmo de sempre quando você não está no mesmo de sempre.

**CTA:** `[Quero meu Planner Vulcão Silencioso →]`

---

### 8.5 O Arquiteto do Caos

**Cor:** #059669 (verde) | **Símbolo:** ⬡

**Tagline:** *"Mil ideias. Zero andaimes."*

**Radar:** D=alto, I=alto, A=alto, E=médio, H=médio

**"Você é assim":**
> ∙ Você é uma máquina de ideias — e um cemitério de projetos pela metade.
> ∙ Você sabe exatamente o que quer construir. O problema é o caminho entre a visão e a execução.
> ∙ Toda vez que vai organizar, surge uma ideia nova que parece mais urgente que tudo.

**"O que isso te custa":**
> ∙ Sem estrutura externa sólida, projetos importantes morrem na fase do entusiasmo inicial.
> ∙ A sensação de "quase lá" sem nunca chegar lá é real, frequente e frustrante.

**Ponte de venda:**
> Planners vazios só multiplicam o caos — você precisa de andaime, não de espaço em branco. O Planner do Arquiteto do Caos **quebra visões grandes em micro-ações com contexto salvo** e tem um sistema de captura de novas ideias que não sabota o que está em execução.

**CTA:** `[Quero meu Planner Arquiteto do Caos →]`

---

### 8.6 O Furacão

**Cor:** #DB2777 (rosa intenso) | **Símbolo:** ✦

**Tagline:** *"Tudo ao máximo. Sempre."*

**Radar:** D=alto, I=alto, A=alto, E=alto, H=alto

**"Você é assim":**
> ∙ Você experimenta tudo ao máximo — a energia, a distração, a emoção e o impulso simultaneamente.
> ∙ Um dia "comum" para outros é genuinamente exaustivo para o seu sistema nervoso.
> ∙ Você sobreviveu até aqui com uma resiliência que poucas pessoas ao redor reconhecem de verdade.

**"O que isso te custa":**
> ∙ O esforço constante de autorregulação em todas as áreas cansa de um jeito profundo e acumulativo.
> ∙ Manter qualquer rotina é uma luta real — não por falta de vontade, mas por como seu sistema funciona.

**Ponte de venda:**
> Qualquer sistema com muitas etapas vai falhar com você — seu sistema precisa ser **radical em simplicidade**. O Planner do Furacão foca em 1-3 prioridades absolutas por dia, tem reset fácil sem punição e não te exige consistência perfeita para funcionar.

**CTA:** `[Quero meu Planner Furacão →]`

---

### 8.7 O Camaleão Exausto

**Cor:** #0891B2 (ciano) | **Símbolo:** ◑

**Tagline:** *"Parece que dá conta. Por dentro, é outra história."*

**Radar:** D=médio, I=médio, A=médio, E=médio, H=baixo

**"Você é assim":**
> ∙ Você "funciona". Só você sabe exatamente o custo disso.
> ∙ Desenvolveu sistemas, compensações e máscaras ao longo dos anos — e ninguém percebe o esforço.
> ∙ Provavelmente foi diagnosticado tarde, ou ainda não foi. "Sempre se virou" foi o obstáculo.

**"O que isso te custa":**
> ∙ O burnout acumulado por anos de sobresforço invisível chega de forma súbita — quando ninguém espera.
> ∙ A sensação de que "aos outros parece fácil" pode ser mais pesada do que qualquer sintoma individual.

**Ponte de venda:**
> Você não precisa de mais exigência — precisa de **permissão para funcionar de forma sustentável**. O Planner do Camaleão Exausto reconhece que "fazer menos bem feito" é muitas vezes o movimento mais inteligente e estratégico do dia.

**CTA:** `[Quero meu Planner Camaleão Exausto →]`

---

### 8.8 Elementos Visuais Adicionais da Tela de Resultado

**Badge compartilhável:**
Após ver o resultado, exibir uma opção de gerar um card visual para compartilhar:

```
[Compartilhar meu perfil]
```

O card gerado deve conter:
- Símbolo do arquétipo (grande, centralizado)
- Nome do arquétipo
- Tagline
- Radar chart simplificado
- URL do quiz
- Branding do produto

**Prova social dinâmica:**
Logo abaixo da seção "Você é assim", exibir:
> *"47.382 pessoas com TDAH já descobriram seu perfil. 12% são [Arquétipo do usuário]."*

Os números devem ser plausíveis e, quando possível, reais (atualizar com dados reais após lançamento).

---

## 9. PONTE DE VENDA — COPY E ESTRATÉGIA

### 9.1 A Psicologia da Transição

A transição do resultado para a venda deve ser **invisível** — a pessoa não deve sentir que "saiu" da experiência do quiz para entrar em uma "página de venda". A ponte é uma continuação natural da descoberta.

**Estrutura emocional da ponte:**

```
ALÍVIO → RECONHECIMENTO → ESPERANÇA → DESEJO → AÇÃO
```

1. **Alívio:** "Existe uma razão para isso tudo. Você não é preguiçoso(a)."
2. **Reconhecimento:** "Outras pessoas com o seu perfil enfrentam exatamente isso."
3. **Esperança:** "Seu tipo de cérebro responde a sistemas específicos — e eles funcionam."
4. **Desejo:** "Desenvolvemos um planner pensado especificamente para quem é [Arquétipo]."
5. **Ação:** CTA direto e sem ambiguidade.

### 9.2 Copy da Seção de Ponte (Universal + Personalizável)

**Headline da ponte:**
```
Planner genérico não funciona para o [ARQUÉTIPO].
E você provavelmente já sabe disso.
```

**Parágrafo de transição:**
```
Você tentou cadernos, apps, Google Calendar, sticky notes, bullet journals.
Funcionaram por alguns dias. Depois pararam.

Não foi falha sua. Foi o sistema errado para o seu tipo de cérebro.
```

**Proposta específica:**
```
O Planner TDAH [ARQUÉTIPO] foi desenvolvido com base nas características
específicas do seu perfil — não como uma ferramenta genérica de organização,
mas como um sistema que funciona *com* o seu cérebro, não contra ele.
```

**Features da ponte (adaptar por arquétipo):**

| Arquétipo | Feature principal na ponte |
|---|---|
| Nômade Quântico | Âncoras temporais + captura rápida + lembretes contextuais |
| Reator em Cadeia | Speed bumps + gestão de energia por blocos + checkpoints |
| Vulcão Silencioso | Check-ins de humor + dias de buffer + estrutura adaptável |
| Arquiteto do Caos | Quebra de visões em micro-ações + captura de ideias sem sabotar execução |
| Furacão | Minimalismo radical + reset sem punição + foco em 1-3 prioridades |
| Camaleão Exausto | Permissão para fazer menos + sustentabilidade como estratégia |

### 9.3 Elementos de Redução de Fricção na CTA

Abaixo do botão de CTA, incluir obrigatoriamente:

```
✓ Entrega digital imediata — acesso em segundos
✓ Funciona no celular e no computador
✓ 7 dias de garantia — se não funcionar, você recebe o dinheiro de volta
✓ Desenvolvido com e para adultos com TDAH
```

### 9.4 Urgência e Escassez (Opcional, Usar com Moderação)

Se utilizado, deve ser **genuíno** — nunca falso. Pessoas com TDAH são sensíveis a manipulação e tendem a rejeitar urgência obviamente artificial.

**Opção aceitável:**
```
⏰ Oferta especial para quem veio pelo quiz: R$ XX por R$ XX
    Esta condição expira quando você fechar a aba.
```

**Nunca usar:**
- Contadores falsos que reiniciam ao recarregar a página
- "Apenas X unidades disponíveis" para produto digital
- Urgência sem justificativa real

### 9.5 Prova Social na Ponte

```
"Eu tentei 12 planners diferentes. Este foi o único que
sobreviveu mais de uma semana na minha rotina."
— Marina C., TDAH predominantemente desatento, SP

"Finalmente algo que não exige que eu seja uma pessoa
diferente para funcionar."
— Rafael T., TDAH combinado, RJ
```

**Especificação:** Os depoimentos devem ser reais, com nome, tipo de TDAH e cidade. Incluir foto quando possível. Evitar depoimentos muito longos — máximo 2 frases.

---

## 10. DIRETRIZES DE COPYWRITING E TOM DE VOZ

### 10.1 A Persona que Escreve o Quiz

O quiz deve soar como se fosse escrito por **alguém com TDAH que entende TDAH** — não por um psicólogo distante, nem por um coach motivacional entusiasmado. Empático, direto, levemente bem-humorado, completamente sem julgamento.

### 10.2 Vocabulário — O que Usar e Evitar

| ❌ EVITAR | ✅ USAR EM VEZ DISSO |
|---|---|
| "déficit" | "TDAH" ou "seu cérebro" |
| "transtorno" | "perfil", "características", "como você funciona" |
| "sintoma" | "traço", "padrão", "característica" |
| "normal" (como meta) | "funcionar do seu jeito" |
| "disciplina" (como solução) | "sistema", "estrutura", "estratégia" |
| "preguiça" | "paralisia de iniciação", "falta de ativação" |
| "você deveria" | "muitos com seu perfil encontram que..." |
| "é fácil" | nunca dizer isso |
| "basta querer" | nunca dizer isso |
| "fracasso" | "ciclo incompleto", "projeto pausado" |
| "problema" | "desafio", "característica", "padrão" |

### 10.3 Regras de Redação para Perguntas

1. **Máximo 12 palavras** por pergunta
2. **Sujeito sempre "você"** — nunca "as pessoas com TDAH" ou "quem tem TDAH"
3. **Verbos concretos:** "perde", "começa", "esquece" — nunca "tende a", "tem dificuldade com"
4. **Uma ideia por pergunta** — nunca combinar dois cenários
5. **Tom de conversa entre iguais** — não de triagem clínica

### 10.4 Regras de Redação para Opções de Resposta

1. **Máximo 8 palavras** por opção
2. **A opção A deve ser a mais ousada** — a que o usuário pensa "são eles me lendo"
3. **Humor suave é bem-vindo na opção A** — especialmente em situações reconhecíveis
4. **Evitar "nunca" e "sempre" isolados** — contextualizar sempre que possível
5. **As 4 opções devem ser mutuamente exclusivas** e cobrir o espectro completo

### 10.5 Tom por Seção

| Seção | Tom | Exemplo |
|---|---|---|
| Tela de entrada | Curioso, convidativo | "Qual tipo de TDAH é o seu?" |
| Perguntas | Direto, reconhecível | "Você sabe o que precisa fazer, mas não consegue começar?" |
| Micro-validações | Empático, informativo | "Paralisia de iniciação não é preguiça — é neurológico." |
| Marcos | Comemorativo, leve | "Seu padrão está ficando mais claro..." |
| Processamento | Misterioso, antecipador | "Analisando seus padrões únicos..." |
| Resultado | Profundo, validador | "Por fora você parece bem. Só você sabe o que acontece por dentro." |
| Ponte de venda | Honesto, empático, propositivo | "Planner genérico não funciona para você. E você já sabe disso." |

---

## 11. NOTAS TÉCNICAS DE IMPLEMENTAÇÃO

### 11.1 Stack Recomendado

| Camada | Tecnologia recomendada | Justificativa |
|---|---|---|
| Frontend | React + TypeScript | Gerenciamento de estado do quiz + animações |
| Animações | Framer Motion | Micro-interações fluidas com API declarativa |
| Gráfico radar | Chart.js (RadarChart) ou Recharts | Radar chart progressivamente animado |
| XP counter | CSS Counter Animation + JS | Leve, sem dependência extra |
| Partículas | canvas-confetti (npm) | Leve (< 5kb), fácil para celebrações de marco |
| Estado | Zustand ou Context API | Score tracking por dimensão ao longo do quiz |
| Hosting | Vercel (tier gratuito para MVP) | Deploy automático, CDN global, zero custo inicial |
| Analytics | PostHog ou Hotjar | Para medir drop-off por pergunta |

### 11.2 Estrutura de Estado do Quiz

```typescript
interface QuizState {
  currentQuestion: number;           // 1–15
  answers: Record<number, 'A'|'B'|'C'|'D'>;  // questionId → resposta
  scores: {
    D: number;  // Desatenção
    H: number;  // Hiperatividade
    I: number;  // Impulsividade
    A: number;  // Autorregulação
    E: number;  // Aspectos Emocionais
  };
  xp: number;
  archetype: string | null;          // null até Q15 ser respondida
  startedAt: Date;
  completedAt: Date | null;
}
```

### 11.3 Especificações de Animação

| Elemento | Tipo | Duração | Easing |
|---|---|---|---|
| Entrada de nova pergunta | Slide da direita | 300ms | ease-out |
| Seleção de resposta | Scale + color fill | 200ms | ease-in-out |
| Aparecimento da micro-validação | Fade in | 400ms | ease-out |
| Aparecimento do botão "Próxima" | Slide up + fade in | 300ms | ease-out |
| Preenchimento da barra de progresso | Width transition | 400ms | ease-out |
| XP flutuante | Float up + fade | 800ms | ease-out |
| Confetti de marco | Burst | 1500ms | n/a |
| Radar chart (por segmento) | Draw progressivo | 200ms/segmento | ease-in-out |
| Shimmer na barra de progresso | Loop infinito | 1500ms | linear |

### 11.4 Performance e Mobile-First

- **Tamanho máximo do bundle JS:** < 150kb gzipped
- **Tempo de carregamento alvo:** < 2s em 3G
- **Resolução mínima suportada:** 320px (iPhone SE)
- **Todas as animações:** usar `transform` e `opacity` apenas (sem animar `width` ou `height` fora da barra de progresso)
- **Redução de movimento:** respeitar `prefers-reduced-motion: reduce` — desabilitar animações não-essenciais

### 11.5 Rastreamento e Analytics

**Eventos obrigatórios a rastrear:**

| Evento | Payload |
|---|---|
| `quiz_started` | timestamp, source (UTM) |
| `question_answered` | questionId, answer, timeSpentMs |
| `milestone_reached` | milestoneId (1, 2, 3) |
| `quiz_completed` | archetypeId, totalTimeMs, xpEarned |
| `result_viewed` | archetypeId, timeOnResultMs |
| `cta_clicked` | archetypeId, ctaPosition (primary/secondary) |
| `quiz_abandoned` | lastQuestionId, timeSpentMs |

**KPIs de performance do quiz:**

| Métrica | Benchmark alvo |
|---|---|
| Taxa de conclusão (Q1→Q15) | > 70% |
| Taxa de conversão (resultado→CTA) | > 25% |
| Pergunta com maior drop-off | Identificar e otimizar |
| Tempo médio no resultado antes do CTA | > 45 segundos |
| Taxa de compartilhamento de resultado | > 10% |

### 11.6 Testes A/B Recomendados

Após lançamento, priorizar os seguintes testes (um por vez):

1. **Número de perguntas:** 15 vs 12 (remover 3 com menor correlação ao arquétipo)
2. **Tela de processamento:** 3s vs 5s (impacto no engajamento com resultado)
3. **CTA principal:** com nome do arquétipo vs genérico "Quero meu Planner"
4. **Radar chart:** com vs sem labels das dimensões (impacto na compreensão)
5. **Prova social no resultado:** com vs sem depoimentos (impacto na conversão)

---

## 12. REFERÊNCIAS E FUNDAMENTAÇÃO

### 12.1 Fundamentação Clínica

- **Escala ETDAH-AD** (Escala de Transtorno de Déficit de Atenção e Hiperatividade para Adultos): instrumento de avaliação validado para o contexto brasileiro, cobrindo as 5 dimensões especificadas neste documento.
- **Disforia por Sensibilidade à Rejeição (RSD):** conceito cunhado por William Dodson, MD. Referência: Dodson, W. (2016). "Emotional Regulation and Rejection Sensitivity." ADDitude Magazine.
- **Mascaramento em adultos com TDAH:** Sasson, N. & Morrison, K. (2019). "First impressions of adults with autism: The thin slice of everyday conversation." Autism Research.

### 12.2 Fundamentos de Design para TDAH

- **Princípio de carga cognitiva reduzida:** Sweller, J. (1988). Cognitive load during problem solving. Cognitive Science, 12, 257–285.
- **Dopamina e antecipação:** Schultz, W. (1998). Predictive reward signal of dopamine neurons. Journal of Neurophysiology, 80(1), 1–27. *Base para a estratégia de "tela de processamento" de 4 segundos.*
- **Gamificação e motivação intrínseca:** Deci, E. L. & Ryan, R. M. (2000). The "What" and "Why" of Goal Pursuits. Psychological Inquiry, 11(4), 227–268.

### 12.3 Referências de Produto e Funil

- Projeto **Hyperconnected** (Dribbble, Claire Peckham): fonte primária de análise de UX para TDAH que inspirou este document, especialmente a abordagem de quiz não-diagnóstico e o uso de radar chart para resultados.
- **Buzz Quiz Framework** (Buzzfeed, 2020): padrão de manutenção de engajamento em quizzes via variação de formato e feedback imediato.

---

> **Versão:** 1.0 | **Criado para:** Produto Planner TDAH | **Mercado:** Brasil
> **Próxima revisão recomendada:** Após 500 completions de quiz com dados reais de drop-off

---

*Este documento contém todas as especificações necessárias para implementação completa do quiz. Para dúvidas sobre scoring ou lógica de arquétipos, referir à Seção 7. Para copy de resultado por arquétipo, referir à Seção 8.*
