Crie uma Agent Skill chamada `ux-ui-adhd-funnel-auditor`.

A skill deve ser criada para Codex e/ou Claude Code, seguindo o padrão de Agent Skills baseado em um arquivo principal `SKILL.md`, com arquivos complementares em `references/` e, se fizer sentido, scripts opcionais somente de leitura em `scripts/`.

## Objetivo da skill

Criar uma skill extremamente robusta, especializada em auditoria, investigação e análise aprofundada de UX/UI Design para uma aplicação web que funciona como uma etapa de funil de venda.

O caso principal de uso será auditar um quiz interativo voltado para pessoas com TDAH, usado como etapa inicial de um funil de venda de um planner personalizado.

A skill NÃO deve implementar alterações no código.
A skill NÃO deve alterar arquivos automaticamente.
A skill NÃO deve redesenhar a aplicação.
A skill deve apenas investigar, auditar, validar, comparar, testar quando possível e gerar um relatório detalhado com recomendações.

## Contexto do projeto

O projeto é um quiz interativo acessado a partir de um anúncio no Instagram.

Fluxo esperado:

1. A pessoa vê um anúncio no Instagram.
2. Clica no call to action.
3. Cai em um quiz interativo.
4. O quiz faz perguntas sobre dificuldades de foco, organização, rotina, procrastinação, energia, distração e execução.
5. O quiz gera um perfil comportamental/organizacional da pessoa.
6. A pessoa é conduzida para uma landing page.
7. A landing page apresenta um planner personalizado para pessoas com TDAH.
8. A pessoa encontra informações, benefícios, preço e CTA de compra.

Importante:
- O quiz não deve ser tratado como diagnóstico médico.
- Evitar linguagem como “diagnosticar TDAH”, “identificar clinicamente seu tipo de TDAH” ou “resultado médico”.
- Preferir linguagem como “perfil de organização”, “perfil de atenção”, “padrão de funcionamento”, “estilo de rotina”, “perfil de dificuldade” ou “mapa de desafios”.
- A auditoria deve avaliar também riscos éticos, promessas exageradas, linguagem sensível e possíveis interpretações clínicas indevidas.

## Perfil especialista que a skill deve assumir

A skill deve agir como uma equipe multidisciplinar composta por:

1. Especialista sênior em UX Design.
2. Especialista sênior em UI Design.
3. Especialista em acessibilidade digital.
4. Especialista em design cognitivo e carga cognitiva.
5. Especialista em neurodivergência e experiência digital para pessoas com TDAH.
6. Especialista em dark mode design.
7. Especialista em CRO, landing pages e funis de venda.
8. Especialista em microcopy, clareza de instruções e CTAs.
9. Especialista em auditoria visual de interfaces web/mobile.

A skill deve combinar esses olhares, mas sempre separar claramente:
- achados visuais;
- achados de usabilidade;
- achados de acessibilidade;
- achados relacionados a TDAH/carga cognitiva;
- achados comerciais/conversão;
- achados éticos.

## Escopo principal da auditoria

A skill deve auditar, no mínimo:

1. Dark mode
2. Paleta de cores
3. Saturação das cores
4. Contraste entre texto e fundo
5. Contraste de botões, bordas, ícones e estados
6. Uso de neon, glow, blur, sombras e efeitos vibrantes
7. Profundidade visual e hierarquia de camadas
8. Tamanho de fonte
9. Peso de fonte
10. Espaçamento entre linhas
11. Espaçamento entre blocos
12. Densidade visual
13. Clareza da pergunta atual
14. Clareza das opções de resposta
15. Clareza dos botões
16. Clareza do próximo passo
17. Progress bar ou indicação de etapa
18. Sensação de avanço e recompensa
19. Risco de distração
20. Risco de sobrecarga cognitiva
21. Risco de fadiga visual
22. Legibilidade em mobile
23. Design responsivo
24. Hierarquia visual
25. Consistência visual
26. Consistência entre quiz e landing page
27. Transição quiz → resultado → landing page
28. Força da proposta de valor
29. Clareza da personalização do planner
30. Confiança e credibilidade
31. Fricção antes da compra
32. CTA principal
33. CTAs secundários
34. Potenciais dark patterns
35. Linguagem ética sobre TDAH
36. Promessas comerciais exageradas
37. Coerência entre design, copy e público-alvo

## Princípios obrigatórios da auditoria

A skill deve considerar os seguintes princípios:

### 1. Design para pessoas com TDAH

Avaliar se a interface:

- reduz distrações;
- evita excesso de elementos competindo por atenção;
- evita textos longos demais;
- usa uma pergunta ou ação principal por tela;
- deixa o próximo passo óbvio;
- reduz dependência de memória de curto prazo;
- mostra progresso;
- oferece sensação de avanço;
- evita decisões desnecessárias;
- evita animações excessivas;
- evita estímulos visuais que virem ruído;
- usa estrutura previsível;
- usa microcopy clara, curta e acolhedora;
- evita linguagem culpabilizante, infantilizante ou alarmista.

### 2. Carga cognitiva

Avaliar se a interface exige esforço mental demais.

Verificar:

- quantidade de informação por tela;
- quantidade de escolhas simultâneas;
- complexidade das perguntas;
- complexidade das respostas;
- necessidade de lembrar informações anteriores;
- ausência de contexto;
- ausência de orientação;
- excesso de estímulo visual;
- excesso de movimento;
- excesso de gradientes, brilhos e sombras;
- excesso de copy antes da ação.

A skill deve apontar onde a interface pode causar:
- confusão;
- travamento;
- abandono;
- impaciência;
- sensação de “não sei o que fazer agora”;
- perda de foco;
- fadiga visual;
- perda de confiança.

### 3. Dark mode confortável

A skill deve auditar o dark mode com profundidade.

Verificar:

- se o fundo é preto puro ou cinza escuro confortável;
- se há contraste suficiente sem gerar agressividade visual;
- se branco puro está sendo usado em excesso;
- se as cores vibrantes foram dessaturadas adequadamente;
- se o uso de glow/neon é funcional ou decorativo demais;
- se sombras e profundidade funcionam em fundo escuro;
- se cards elevados estão visualmente coerentes;
- se elementos “mais próximos” parecem mais claros e não mais escuros;
- se a paleta é consistente;
- se o visual parece moderno sem ficar cansativo;
- se o design continua legível em telas pequenas;
- se existe risco de fadiga visual em uso prolongado.

### 4. Acessibilidade visual

A skill deve verificar, sempre que possível:

- contraste de texto normal;
- contraste de texto grande;
- contraste de botões;
- contraste de bordas;
- contraste de ícones;
- contraste de estados hover/focus/selected/disabled;
- foco visível para navegação por teclado;
- dependência exclusiva de cor para transmitir informação;
- legibilidade com zoom;
- legibilidade em viewport mobile;
- textos em imagens;
- elementos clicáveis pequenos demais;
- espaçamento insuficiente entre áreas tocáveis.

A skill deve usar WCAG 2.2 como referência mínima, mas também deve avaliar conforto real, não apenas aprovação técnica.

### 5. UX de quiz interativo

A skill deve avaliar:

- se a primeira tela cria curiosidade sem parecer apelativa;
- se o usuário entende o que vai acontecer;
- se o quiz informa duração ou quantidade de etapas;
- se cada pergunta tem objetivo claro;
- se as respostas são mutuamente compreensíveis;
- se a pessoa consegue responder sem sentir julgamento;
- se o feedback entre perguntas é útil ou distrativo;
- se a progressão é motivadora;
- se o resultado final parece personalizado de verdade;
- se o quiz prepara naturalmente a pessoa para a landing page.

### 6. Funil de venda e conversão

A skill deve auditar o quiz como uma etapa comercial.

Verificar:

- clareza da promessa;
- alinhamento entre anúncio, quiz e landing page;
- consistência da mensagem;
- se o resultado do quiz aumenta desejo pelo planner;
- se a landing page explica por que o planner é personalizado;
- se o CTA aparece no momento certo;
- se há fricção demais antes da compra;
- se o preço é apresentado com contexto de valor;
- se há elementos de confiança;
- se há provas, garantias, FAQ ou redução de objeções;
- se existe risco de a pessoa terminar o quiz e não entender o que fazer;
- se existe risco de a pessoa sentir que foi manipulada.

### 7. Ética e segurança de linguagem

A skill deve sinalizar:

- promessas médicas;
- linguagem diagnóstica;
- linguagem que sugere cura;
- linguagem que explora insegurança de pessoas com TDAH;
- urgência artificial agressiva;
- medo, culpa ou vergonha como gatilhos de venda;
- afirmações não sustentadas sobre neurociência;
- uso indevido de “dopamina” como justificativa genérica;
- qualquer ponto que possa parecer antiético, capacitista ou sensacionalista.

A skill deve sugerir alternativas de linguagem mais responsáveis.

## Metodologia que a skill deve seguir

Quando acionada, a skill deve executar uma auditoria em fases.

### Fase 1 — Entendimento do projeto

- Identificar estrutura do projeto.
- Identificar framework usado.
- Identificar rotas, páginas, componentes e estilos.
- Identificar arquivos de design tokens, CSS, Tailwind, theme, components, pages ou similares.
- Identificar fluxo do quiz.
- Identificar fluxo da landing page.
- Identificar CTAs e pontos de conversão.
- Identificar se há dados mockados, resultados do quiz, perfis, copy e regras de pontuação.

### Fase 2 — Mapeamento visual

Criar um inventário de:

- paleta de cores;
- tokens de cor;
- tipografia;
- tamanhos de fonte;
- espaçamentos;
- radius;
- sombras;
- gradientes;
- efeitos visuais;
- animações;
- componentes principais;
- botões;
- cards;
- inputs;
- progress bar;
- telas do quiz;
- telas da landing page.

### Fase 3 — Auditoria técnica de acessibilidade visual

Sempre que possível, a skill deve:

- calcular ou estimar contraste;
- identificar pares texto/fundo problemáticos;
- identificar botões com baixo contraste;
- identificar foco invisível;
- identificar elementos clicáveis pequenos;
- verificar legibilidade em mobile;
- recomendar testes com Lighthouse, axe, Playwright ou ferramenta equivalente se o ambiente permitir.

Se não puder rodar ferramentas, deve fazer análise estática do código e deixar claro o nível de confiança.

### Fase 4 — Auditoria cognitiva/TDAH

Analisar tela por tela:

- clareza;
- densidade;
- distrações;
- previsibilidade;
- progressão;
- dependência de memória;
- esforço de decisão;
- quantidade de texto;
- carga emocional da copy;
- risco de abandono.

### Fase 5 — Auditoria de dark mode

Analisar:

- fundo;
- superfície;
- camada elevada;
- contraste;
- saturação;
- brilho;
- glow;
- neon;
- sombras;
- profundidade;
- consistência;
- fadiga visual;
- harmonia com a proposta comercial.

### Fase 6 — Auditoria de conversão

Analisar:

- promessa;
- CTA;
- momento do CTA;
- clareza da oferta;
- confiança;
- objeções;
- personalização percebida;
- continuidade narrativa do funil;
- consistência entre quiz, resultado e landing page;
- atrito até compra.

### Fase 7 — Priorização

Classificar cada achado com:

- Severidade: Crítica, Alta, Média, Baixa
- Tipo: UX, UI, Acessibilidade, TDAH/Cognitivo, Conversão, Ética, Técnico
- Confiança: Alta, Média, Baixa
- Esforço estimado: Baixo, Médio, Alto
- Impacto esperado: Baixo, Médio, Alto
- Prioridade: P0, P1, P2, P3

### Fase 8 — Relatório final

Gerar um relatório detalhado, estruturado e acionável.

## Formato obrigatório do relatório

A resposta final da skill deve seguir esta estrutura:

# Auditoria UX/UI — Quiz e Funil TDAH

## 1. Resumo executivo

Explicar em linguagem clara:

- qualidade geral da experiência;
- principais riscos;
- principais oportunidades;
- impacto provável na experiência de pessoas com TDAH;
- impacto provável na conversão.

## 2. Diagnóstico geral

Tabela com notas de 0 a 10 para:

| Dimensão | Nota | Justificativa curta |
|---|---:|---|
| Clareza visual |  |
| Legibilidade |  |
| Dark mode |  |
| Contraste |  |
| Hierarquia visual |  |
| Baixa carga cognitiva |  |
| Experiência para TDAH |  |
| Quiz UX |  |
| Landing page |  |
| Conversão |  |
| Ética da comunicação |  |

## 3. Pontos fortes

Listar o que está funcionando bem e por quê.

## 4. Problemas críticos

Tabela:

| Prioridade | Tela/Componente | Problema | Evidência | Por que importa | Impacto em TDAH | Impacto em conversão | Recomendação |
|---|---|---|---|---|---|---|---|

## 5. Problemas médios e pequenos

Mesma lógica, mas agrupados.

## 6. Auditoria tela por tela

Para cada tela do quiz e da landing page:

- objetivo da tela;
- o que funciona;
- o que atrapalha;
- riscos cognitivos;
- riscos visuais;
- riscos comerciais;
- recomendações.

## 7. Auditoria de dark mode

Incluir:

- avaliação da paleta;
- contraste;
- saturação;
- brilho;
- glow;
- sombras;
- profundidade;
- conforto visual;
- recomendações de ajustes.

## 8. Auditoria para pessoas com TDAH

Incluir:

- clareza;
- foco;
- distrações;
- memória;
- quantidade de escolhas;
- progressão;
- recompensas;
- linguagem emocional;
- risco de sobrecarga.

## 9. Auditoria de funil e conversão

Incluir:

- anúncio → quiz;
- quiz → resultado;
- resultado → landing page;
- landing page → compra;
- CTA;
- confiança;
- objeções;
- personalização percebida;
- fricções.

## 10. Recomendações práticas

Dividir em:

### Quick wins

Ajustes simples e rápidos.

### Melhorias estruturais

Ajustes mais importantes, mas que exigem mais cuidado.

### Testes A/B recomendados

Hipóteses de teste, por exemplo:

- CTA com texto A versus texto B;
- progress bar percentual versus “etapa X de Y”;
- fundo preto versus cinza escuro;
- acento neon versus acento dessaturado;
- resultado curto versus resultado mais narrativo;
- landing page com preço mais cedo versus mais tarde.

## 11. O que fazer

Lista objetiva de ações recomendadas.

## 12. O que não fazer

Lista objetiva de práticas a evitar.

## 13. Riscos éticos e de linguagem

Apontar qualquer risco ligado a:

- diagnóstico;
- promessa exagerada;
- exploração de vulnerabilidade;
- linguagem culpabilizante;
- gatilhos de vergonha;
- alegações pseudocientíficas.

Sugerir reescritas mais seguras quando necessário.

## 14. Checklist final de validação

Criar checklist com itens marcáveis.

## 15. Conclusão

Fechar com:

- avaliação geral;
- 3 prioridades máximas;
- próximos passos recomendados.

## Arquivos que a skill deve criar

Crie a seguinte estrutura:

ux-ui-adhd-funnel-auditor/
  SKILL.md
  references/
    adhd-ux-principles.md
    dark-mode-audit-guide.md
    accessibility-contrast-checklist.md
    quiz-funnel-cro-checklist.md
    ethical-adhd-marketing-guide.md
    report-template.md
  scripts/
    README.md

Os scripts devem ser opcionais e somente de leitura.
Se criar scripts, eles podem ajudar a:
- listar cores encontradas no CSS;
- identificar tokens de tema;
- gerar relatório preliminar de contrastes;
- capturar screenshots com Playwright, se o projeto já tiver estrutura compatível;
- nunca alterar arquivos de produção.

## Conteúdo dos arquivos de referência

### `adhd-ux-principles.md`

Incluir princípios de UX para pessoas com TDAH:

- reduzir distrações;
- reduzir carga cognitiva;
- usar etapas pequenas;
- manter orientação;
- mostrar progresso;
- minimizar dependência de memória;
- usar microcopy clara;
- evitar excesso de estímulo;
- permitir recuperação de contexto;
- evitar linguagem culpabilizante.

### `dark-mode-audit-guide.md`

Incluir:

- evitar preto puro como padrão absoluto;
- preferir superfícies em cinza escuro confortável;
- evitar branco puro em excesso;
- dessaturar cores vibrantes;
- testar contraste real;
- testar fadiga visual;
- usar profundidade por luminosidade;
- limitar glow/neon;
- garantir que efeitos visuais tenham função.

### `accessibility-contrast-checklist.md`

Incluir:

- contraste de texto;
- contraste de botão;
- contraste de borda;
- contraste de ícone;
- foco visível;
- estados visuais;
- zoom;
- mobile;
- navegação por teclado;
- não depender apenas de cor.

### `quiz-funnel-cro-checklist.md`

Incluir:

- promessa inicial;
- clareza do quiz;
- número de etapas;
- progress bar;
- curiosidade;
- resultado personalizado;
- conexão com oferta;
- CTA;
- landing page;
- confiança;
- preço;
- objeções;
- checkout ou link de compra.

### `ethical-adhd-marketing-guide.md`

Incluir:

- não diagnosticar;
- não prometer cura;
- não explorar vergonha;
- não usar medo de forma agressiva;
- não usar neurociência como enfeite;
- preferir linguagem responsável;
- separar autoavaliação, perfil comportamental e diagnóstico clínico.

### `report-template.md`

Criar um template completo do relatório final.

## Regras de comportamento da skill

A skill deve:

- ser minuciosa;
- ser crítica;
- ser prática;
- ser específica;
- evitar comentários genéricos;
- sempre justificar cada recomendação;
- sempre conectar problema → impacto → recomendação;
- diferenciar opinião de evidência;
- indicar nível de confiança;
- não alterar código sem autorização explícita;
- não recomendar redesign total sem explicar por quê;
- priorizar recomendações que aumentem clareza, conforto visual, acessibilidade, retenção e conversão;
- tratar TDAH com cuidado, respeito e responsabilidade.

## Quando a skill deve ser usada

A skill deve ser ativada quando o usuário pedir:

- auditoria de UX/UI;
- auditoria de design;
- análise de quiz;
- análise de landing page;
- análise de funil;
- revisão de dark mode;
- revisão de acessibilidade visual;
- revisão de design para TDAH;
- revisão de conversão;
- análise de CTA;
- análise de experiência de usuário neurodivergente.

## Quando a skill NÃO deve ser usada

Não usar para:

- implementar mudanças diretamente;
- criar diagnóstico médico;
- escrever laudo;
- substituir avaliação clínica;
- criar copy médica;
- fazer promessas terapêuticas;
- alterar código sem pedido explícito;
- avaliar backend sem relação com UX/UI;
- fazer análise genérica sem inspecionar o projeto.

## Exemplo de comando para usar a skill depois de criada

Use a skill `ux-ui-adhd-funnel-auditor` para auditar este projeto.

Contexto:
Este projeto é um quiz interativo em dark mode para pessoas com TDAH, usado como etapa de um funil de venda de um planner personalizado. A pessoa vem de um anúncio no Instagram, responde ao quiz, recebe um perfil e depois é direcionada para uma landing page de venda.

Instruções:
- Não altere código.
- Não implemente nada.
- Faça apenas auditoria e investigação.
- Analise o quiz e a landing page.
- Se possível, rode o projeto localmente em modo somente leitura.
- Se possível, capture screenshots mobile e desktop.
- Analise arquivos de estilo, componentes, textos, CTAs e fluxo.
- Gere um relatório completo com problemas, evidências, impacto, severidade e recomendações.
- Dê atenção especial a dark mode, contraste, legibilidade, TDAH, carga cognitiva, retenção, conversão e ética da comunicação.

## Resultado esperado da criação da skill

Ao final, entregue:

1. Estrutura de arquivos criada.
2. Conteúdo completo do `SKILL.md`.
3. Conteúdo dos arquivos em `references/`.
4. Explicação breve de como usar a skill.
5. Um comando de teste para executar a primeira auditoria.