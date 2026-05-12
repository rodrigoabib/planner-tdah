# Checklist de Acessibilidade e Performance

> Referência para auditoria do Quiz TDAH v1.
> Baseado na Seção 11 da especificação e diretrizes WCAG 2.1 AA.

---

## 1. Semântica e Estrutura HTML

| Item | Critério | Nível WCAG |
|---|---|---|
| SE-01 | Opções de resposta são `<button>` ou `<input type="radio">` — não `<div>` clicáveis | 4.1.2 |
| SE-02 | Labels corretos para todos os inputs de formulário | 1.3.1 |
| SE-03 | Hierarquia de headings (`h1`, `h2`, `h3`) lógica e correta | 1.3.1 |
| SE-04 | `<main>`, `<header>`, `<nav>` usados semanticamente | 1.3.1 |
| SE-05 | `lang="pt-BR"` no elemento `<html>` | 3.1.1 |
| SE-06 | Imagens decorativas têm `alt=""` | 1.1.1 |
| SE-07 | Imagens informativas têm `alt` descritivo | 1.1.1 |

## 2. Teclado e Foco

| Item | Critério | Nível WCAG |
|---|---|---|
| KB-01 | Todo conteúdo interativo acessível por Tab | 2.1.1 |
| KB-02 | Opções de resposta navegáveis por teclas direcionais | 2.1.1 |
| KB-03 | Enter/Space confirmam seleção | 2.1.1 |
| KB-04 | Foco visível em todos os elementos interativos | 2.4.7 |
| KB-05 | Ordem do foco (tab order) é lógica e segue fluxo visual | 2.4.3 |
| KB-06 | Armadilha de foco (focus trap) ausente exceto em modais | 2.1.2 |
| KB-07 | Botão "Próxima" recebe foco automaticamente ao aparecer | Boas práticas |

## 3. Screen Reader e ARIA

| Item | Critério | Nível WCAG |
|---|---|---|
| AR-01 | `aria-live="polite"` para micro-validações (anúncio automático) | 4.1.3 |
| AR-02 | `aria-live="assertive"` para alertas de marco | 4.1.3 |
| AR-03 | `aria-checked` nos elementos de resposta selecionados | 4.1.2 |
| AR-04 | `role="radiogroup"` no container de opções | 4.1.2 |
| AR-05 | `aria-label` descritivo nos elementos sem texto visível | 4.1.2 |
| AR-06 | `aria-hidden="true"` em elementos puramente decorativos | 1.3.1 |
| AR-07 | Progresso anunciado ao screen reader em cada avanço | 4.1.3 |
| AR-08 | `aria-describedby` linkando pergunta às opções | 1.3.1 |

## 4. Contraste de Cor

| Item | Critério | Nível WCAG |
|---|---|---|
| CO-01 | Texto sobre fundo passa WCAG AA (≥ 4.5:1 normal, ≥ 3:1 grande) | 1.4.3 |
| CO-02 | Texto das alternativas de resposta passa 4.5:1 | 1.4.3 |
| CO-03 | Micro-validação em cor secundária ainda passa 4.5:1 | 1.4.3 |
| CO-04 | Opção selecionada (estado .os) passa contraste em todos os temas | 1.4.3 |
| CO-05 | Foco visível tem contraste ≥ 3:1 contra fundo adjacente | 1.4.11 |
| CO-06 | Elementos da barra de progresso passam contraste | 1.4.11 |
| CO-07 | XP counter legível sobre qualquer fundo em que aparece | 1.4.3 |

## 5. Reduced Motion

| Item | Critério | Nível WCAG |
|---|---|---|
| MO-01 | `@media (prefers-reduced-motion: reduce)` aplicado globalmente | 2.3.3 |
| MO-02 | Confetti desativado com reduced-motion | 2.3.3 |
| MO-03 | Shimmer da barra de progresso desativado | 2.3.3 |
| MO-04 | Pulse dos marcos e timeline desativado | 2.3.3 |
| MO-05 | Animações de slide/fade simplificadas ou removidas | 2.3.3 |
| MO-06 | Animação flutuante do XP desativada | 2.3.3 |
| MO-07 | Radar chart animado de forma simplificada | 2.3.3 |

## 6. Mobile e Responsividade

| Item | Critério | Referência |
|---|---|---|
| MB-01 | Funcional em 320px (iPhone SE) — sem overflow horizontal | Spec §11.4 |
| MB-02 | Funcional em 390px (iPhone 14) | Spec §11.4 |
| MB-03 | Funcional em 768px (tablet) | Inferido |
| MB-04 | Área de toque ≥ 44x44px para todas as opções | WCAG 2.5.5 |
| MB-05 | Fonte mínima de 16px em mobile para evitar zoom automático | Boas práticas |
| MB-06 | Sem texto cortado ou botões inacessíveis em telas pequenas | 1.4.10 |

## 7. Performance Técnica

| Item | Critério | Referência |
|---|---|---|
| PF-01 | Bundle JS gzipped < 150kb | Spec §11.4 |
| PF-02 | First Contentful Paint < 2s em 3G simulado | Spec §11.4 |
| PF-03 | Cumulative Layout Shift (CLS) < 0.1 | Core Web Vitals |
| PF-04 | Console sem erros JavaScript | Boas práticas |
| PF-05 | Console sem warnings relevantes | Boas práticas |
| PF-06 | Animações usam `transform` e `opacity` (sem reflow) | Spec §11.4 |
| PF-07 | Fontes externas (CDN) carregam sem bloquear render | Boas práticas |

## 8. Comandos de Teste

```bash
# Auditoria axe-core automatizada
node .agents/skills/tdah-ux-audit/scripts/run-a11y-audit.js

# Verificar contraste manualmente em: https://webaim.org/resources/contrastchecker/

# Simular reduced-motion no Chrome DevTools:
# Rendering panel → Emulate CSS media feature prefers-reduced-motion → reduce

# Simular 320px no Chrome DevTools:
# Device Toolbar → Custom → 320 x 568
```
