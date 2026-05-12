# Checklist de UX/UI para TDAH

> Referência para auditoria do Quiz TDAH v1.
> Baseado nos Princípios de Design TDAH-UX definidos na Seção 2 da especificação.

---

## 1. Carga Cognitiva

| Item | Critério | Referência |
|---|---|---|
| CG-01 | Cada tela tem apenas um foco principal | Spec §2.2 |
| CG-02 | Máximo 2 frases de contextualização por tela | Spec §2.2 |
| CG-03 | Nenhum elemento visual compete com a pergunta principal | Spec §2.2 |
| CG-04 | Botões de navegação têm ação clara e específica | Spec §2.2 |
| CG-05 | Transições são suaves, sem brusquidão | Spec §11.3 |

## 2. Dopamina e Recompensa

| Item | Critério | Referência |
|---|---|---|
| DP-01 | Toda resposta selecionada tem feedback visual imediato | Spec §4.1, §5.2 |
| DP-02 | XP counter atualiza com animação flutuante (+10 XP) | Spec §4.1 |
| DP-03 | Botão "Próxima" aparece somente após 1s da micro-validação | Spec §4.2 |
| DP-04 | Micro-validação faz a pessoa sentir "eles me entendem" | Spec §4.4 |
| DP-05 | Marcos têm celebração proporcional à conquista | Spec §4.5 |
| DP-06 | Tela de processamento dura 4-5s (antecipação ativa dopamina) | Spec §5.3 |
| DP-07 | Teasers de curiosidade aparecem nos momentos corretos | Spec §4.6 |

## 3. Progresso e Visibilidade do Fim

| Item | Critério | Referência |
|---|---|---|
| PV-01 | Fração numérica sempre visível: "Pergunta X de 15" | Spec §4.2 |
| PV-02 | Porcentagem sempre visível (ex: "46%") | Spec §4.2 |
| PV-03 | Barra de progresso sempre visível, fixada no topo | Spec §4.2 |
| PV-04 | Barra avança com animação fluida (0.4s ease-out) | Spec §4.2, §11.3 |
| PV-05 | Shimmer contínuo na porção preenchida da barra | Spec §4.2 |
| PV-06 | Timeline de 15 pontos visível abaixo da barra | Spec §4.3 |
| PV-07 | Pontos respondidos = verde, atual = pulse, marcos = dourado | Spec §4.3 |
| PV-08 | Calcular progresso como "respondidas/15" não "índice atual/15" | Spec §4.2 |

## 4. Ritmo e Variação

| Item | Critério | Referência |
|---|---|---|
| RT-01 | Seleção de resposta: flash de confirmação (0.2s) | Spec §4.2 |
| RT-02 | Micro-validação: fade-in 0.4s após seleção | Spec §4.2 |
| RT-03 | Botão "Próxima": slide-up + fade após 1s | Spec §5.2 |
| RT-04 | Nova pergunta: slide da direita (0.3s) | Spec §11.3 |
| RT-05 | Não repetir mesmo formato de pergunta 3+ vezes seguidas | Spec §2.3 |
| RT-06 | Alternativas nunca têm "sempre" ou "nunca" sem contexto | Spec §10.4 |

## 5. Mobile e Toque

| Item | Critério | Referência |
|---|---|---|
| MB-01 | Layout funcional em 320px (iPhone SE) | Spec §11.4 |
| MB-02 | Funcional em 390px (iPhone padrão) | Spec §11.4 |
| MB-03 | Funcional em 768px (tablet) | Inferido |
| MB-04 | Área de toque das opções ≥ 44x44px | WCAG 2.5.5 |
| MB-05 | Scroll suave e natural sem layout shift | Spec §11.4 |
| MB-06 | Texto legível sem zoom em 320px | WCAG 1.4.4 |

## 6. Reduced Motion

| Item | Critério | Referência |
|---|---|---|
| RM-01 | `prefers-reduced-motion: reduce` desativa animações não-essenciais | Spec §11.4 |
| RM-02 | Confetti desativado com reduced-motion | Spec §4.5 |
| RM-03 | Shimmer da barra desativado com reduced-motion | Spec §4.2 |
| RM-04 | Pulse dos pontos da timeline desativado com reduced-motion | Spec §4.3 |
| RM-05 | Animações de entrada (slide, fadeIn) simplificadas | Spec §11.4 |

## 7. Performance

| Item | Critério | Referência |
|---|---|---|
| PF-01 | Bundle JS < 150kb gzipped | Spec §11.4 |
| PF-02 | Tempo de carregamento < 2s em 3G | Spec §11.4 |
| PF-03 | Animações usam apenas `transform` e `opacity` (sem width/height) | Spec §11.4 |
| PF-04 | Console sem erros ou warnings relevantes | Boas práticas |
| PF-05 | Sem layout shift visível (CLS baixo) | Core Web Vitals |
