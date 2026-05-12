# Guia Mestre de Implementação — Quiz TDAH v1 → v2

> **Para o Claude Code:** Este é o documento de referência primário para implementação.
> Leia na íntegra antes de escrever qualquer linha de código.
> Cada seção mapeia um achado da auditoria para ações concretas de código.

---

## Contexto essencial antes de começar

Este é um quiz interativo de mapeamento de perfil TDAH. É o **núcleo de um funil de vendas** para um planner personalizado. O arquivo principal é `quiz/quiz-tdah-v1.jsx` — um único arquivo React de 536 linhas com CSS inline, dados, lógica de scoring e todos os componentes UI.

**O que já funciona e NÃO deve ser quebrado:**
- Fluxo completo: landing → 15 perguntas → 3 marcos → processamento → resultado
- Scoring: `calcScores` + `sev` + `findArc` — 6/6 arquétipos corretos nos caminhos esperados
- Animações: shimmer, floatUp, confFall, slideR, fadeIn, bIn, spin, spinRev, dpulse, rUp, orb
- Visualmente: design dark purple, gradientes, typography (Syne/Nunito/Space Mono via CDN)
- Recharts RadarChart no resultado

**O que precisa ser implementado:** 16 achados auditados (AUD-001 a AUD-016), priorizados P0→P3.

---

## Mapa de código — referência rápida

```
Linha 1–2    imports React + recharts
Linha 3–40   constante CSS (template literal com todos os keyframes e classes)
Linha 42–88  constante Q (15 perguntas, scoring, micro-validações)
Linha 90     constante DIMS
Linha 92–123 constante ARC (6 arquétipos com perfis, copy e bridge)
Linha 125    função calcScores(answers) → {D,H,I,A,E}
Linha 135    função sev(v) → 'N'|'M'|'S'
Linha 137    função findArc(scores) → archetypeObject
Linha 152    constante CONF_PARTS (partículas de confetti)
Linha 161    componente Confetti
Linha 172    componente Landing (tela de entrada)
Linha 205    componente Header (XP, progresso, barra, dots)
Linha 235    componente QuestionCard (pergunta + opções + validação + botão)
Linha 277    componente MilestoneCard (marcos 1/2/3)
Linha 334    componente Processing (tela de processamento)
Linha 364    componente Result (resultado + radar + CTA)
Linha 442    componente App (estado central + orquestração)
```

**Localização exata de problemas críticos:**

| Achado | Localização exata |
|---|---|
| AUD-001 CTA sem ação | `l.431-433` — button sem onClick |
| AUD-002 Sem analytics | Em todo o arquivo — nenhum evento |
| AUD-003 Opções como div | `l.247-257` — div com onClick |
| AUD-004 Sem disclaimer | `l.179`, `l.396`, `l.431` |
| AUD-005 XP errado | `l.477-480` — `setXp(x=>x+10+(isMile?25:0))` |
| AUD-006 N/N/N/N/N → Nômade | `l.137-149` — findArc sem tie-break baixo |
| AUD-007 Marco 2 impreciso | `l.296-320` — denominador /9 implica completo |
| AUD-008 Resultado sem ponte | `l.428-433` — sem garantias/prova social |
| AUD-009 Sem reduced-motion | `l.3-40` CSS — sem media query |
| AUD-010 Contraste ruim | `l.216` — cor `#4A4480` em texto |
| AUD-011 Progresso 0% na Q1 | `l.206` — `pct=Math.round((qi/15)*100)` |
| AUD-012 Sem teasers | `l.442-535` — App sem estado de teaser |
| AUD-013 Copy acima do limite | `l.52-87` Q (perguntas) |
| AUD-014 Header não fixo | `l.208` — `position:'relative'` |
| AUD-015 Sem botão voltar | `l.442-535` — sem handler de voltar |
| AUD-016 Sem compartilhar | `l.364-435` — Result sem badge |

---

## Estratégia global de implementação

### Ordem recomendada dos passes

**Passe 1 — Fundação (P0):** AUD-002 → AUD-003 → AUD-001 → AUD-004
*(analytics primeiro para que o CTA já nasça rastreado; acessibilidade antes do CTA para não ter que reescrever duas vezes)*

**Passe 2 — Qualidade (P1):** AUD-005 → AUD-006 → AUD-009 → AUD-010 → AUD-007 → AUD-008

**Passe 3 — Refinamento (P2):** AUD-011 → AUD-014 → AUD-012 → AUD-015 → AUD-013

**Passe 4 — Polish (P3):** AUD-016

### Abordagem de analytics (usada em múltiplos achados)

Criar uma função helper uma vez, no topo do arquivo (logo após os imports):

```javascript
// Helper de analytics — plugável e não-bloqueante
// Por padrão usa console.log; em produção, trocar pelo SDK real (PostHog, GA4, etc)
function trackQuizEvent(name, payload = {}) {
  const event = { event: name, timestamp: Date.now(), ...payload };
  // Camada plugável: se window.quizAnalytics existir, delega; senão usa console
  if (typeof window !== 'undefined' && window.quizAnalytics?.track) {
    window.quizAnalytics.track(name, payload);
  } else {
    console.log('[QuizAnalytics]', name, payload);
  }
}
```

Esta função é chamada em pontos específicos do `App` e dos componentes conforme detalhado abaixo.

---

## Implementação por achado — P0 (Bloqueadores)

---

### AUD-002 — Analytics completamente ausentes

**Por que primeiro:** todos os outros eventos precisam do helper `trackQuizEvent`.

**Eventos a implementar e onde:**

| Evento | Onde no código | Payload |
|---|---|---|
| `quiz_started` | `Landing.onStart` (callback passado para `Landing`) | `{ timestamp, viewportWidth: window.innerWidth }` |
| `question_answered` | `App.onSel` — após `setSel(k)` | `{ questionId: Q[qi].id, dimension: Q[qi].d, answer: k, timeSpentMs: Date.now() - qStartRef.current }` |
| `milestone_reached` | `App.onNext` — nos blocos `if(qi===4)`, `else if(qi===9)`, `else if(qi===14)` | `{ milestoneId: 1|2|3, scoresPartial: ns, xpEarned: isMile?25:50 }` |
| `quiz_completed` | `App.onNext` — bloco `qi===14`, antes do `setTimeout` | `{ archetypeId: findArc(ns)?.name, scores: ns, xpEarned: xp+...}` |
| `result_viewed` | `App.onProcDone` — após `setScr('result')` | `{ archetypeId: arc.name, scores: fs }` |
| `cta_clicked` | Novo `onClick` no CTA de `Result` | `{ archetypeId: arc.name, ctaPosition: 'primary', destination: ctaUrl }` |
| `quiz_abandoned` | `useEffect` em `App` — `visibilitychange` + `beforeunload` | `{ lastScreen: scr, lastQuestionId: Q[qi]?.id, timeSpentMs: ... }` |

**Novo ref necessário em `App` (l.455):**
```javascript
const qStartRef = useRef(Date.now()) // marca início de cada pergunta
```

**Atualizar `qStartRef` em `goNext` (l.464):**
```javascript
const goNext = () => {
  qStartRef.current = Date.now(); // reseta timer da pergunta
  // ... resto do goNext
}
```

**`quiz_abandoned` via useEffect (adicionar em App):**
```javascript
useEffect(() => {
  const startTime = Date.now();
  const handleAbandon = () => {
    if (scr !== 'landing' && scr !== 'result') {
      trackQuizEvent('quiz_abandoned', {
        lastScreen: scr,
        lastQuestionId: scr === 'quiz' ? Q[qi]?.id : null,
        timeSpentMs: Date.now() - startTime,
      });
    }
  };
  const handleVisibility = () => {
    if (document.visibilityState === 'hidden') handleAbandon();
  };
  window.addEventListener('beforeunload', handleAbandon);
  document.addEventListener('visibilitychange', handleVisibility);
  return () => {
    window.removeEventListener('beforeunload', handleAbandon);
    document.removeEventListener('visibilitychange', handleVisibility);
  };
}, [scr, qi]);
```

**Critério de aceite:** `console.log('[QuizAnalytics]', ...)` aparece uma vez para cada ação esperada; sem duplicação ao usar botão voltar ou refazer; payload tem todos os campos especificados.

---

### AUD-003 — Opções de resposta inacessíveis por teclado

**Problema:** `div` clicáveis sem semântica de formulário. Tab não chega nas opções. Enter não seleciona.

**Localização:** `QuestionCard`, linhas 247–257.

**Estratégia:** converter o container de opções em `fieldset` + `legend` e cada opção em `<label>` com `<input type="radio">` visualmente oculto. O div externo continua com o visual atual.

**Implementação do bloco de opções em `QuestionCard`:**

```jsx
// Substituir o div container de opções (l.247) e os divs internos (l.248-259)
<fieldset
  style={{ border: 'none', padding: 0, margin: 0 }}
  aria-labelledby={`q${q.id}-label`}
>
  <legend id={`q${q.id}-label`} className="sq" style={{
    fontSize: 'clamp(16px,3.8vw,22px)', fontWeight: 700,
    color: '#EDE9FF', lineHeight: 1.36, marginBottom: 20,
    display: 'block', width: '100%'
  }}>
    {q.q}
  </legend>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 14 }}>
    {q.o.map((opt, i) => {
      const isSel = sel === opt.k, isOth = sel && !isSel;
      return (
        <label
          key={opt.k}
          htmlFor={`q${q.id}-${opt.k}`}
          className={`oc fi d${i + 1}${isSel ? ' os' : ''}`}
          style={{
            background: isSel ? 'rgba(123,94,167,.2)' : 'rgba(18,15,45,.9)',
            border: `1.5px solid ${isSel ? '#7B5EA7' : '#251E5C'}`,
            borderRadius: 12, padding: '13px 15px',
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: isOth ? .42 : 1,
            cursor: sel ? 'default' : 'pointer',
          }}
        >
          <input
            type="radio"
            id={`q${q.id}-${opt.k}`}
            name={`q${q.id}`}
            value={opt.k}
            checked={isSel}
            disabled={!!sel && !isSel}
            onChange={() => !sel && onSel(opt.k)}
            onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !sel) { e.preventDefault(); onSel(opt.k); } }}
            style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            aria-label={opt.t}
          />
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: isSel ? '#7B5EA7' : 'rgba(37,30,92,.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .14s',
          }}>
            <span className="mm" style={{ fontSize: 11, fontWeight: 700, color: isSel ? '#fff' : '#4A4480' }}>
              {isSel ? '✓' : opt.k}
            </span>
          </div>
          <span className="nn" style={{
            fontSize: 14, color: isSel ? '#EDE9FF' : '#897FC0',
            fontWeight: isSel ? 600 : 400, lineHeight: 1.4,
            transition: 'color .14s',
          }}>
            {opt.t}
          </span>
        </label>
      );
    })}
  </div>
</fieldset>
```

**Remover o `<h2>` da pergunta** que estava antes das opções (linhas 244–246), pois agora é a `<legend>` do `fieldset`.

**CSS adicional para foco visível (adicionar no template CSS):**
```css
label.oc:focus-within {
  outline: 2px solid #7B5EA7;
  outline-offset: 2px;
}
input[type="radio"]:focus-visible + div {
  outline: 2px solid #7B5EA7;
  outline-offset: 2px;
}
```

**Também adicionar `aria-live` para micro-validação:**
```jsx
// No bloco showV&&sel (l.261), adicionar aria-live:
{showV && sel && (
  <div
    className="fi"
    aria-live="polite"
    aria-atomic="true"
    style={{ /* estilo existente */ }}
  >
    <p className="nn" style={{ /* estilo existente */ }}>
      💡 {q.v[sel]}
    </p>
  </div>
)}
```

**Critério de aceite:** Navegar quiz inteiro com Tab + Enter/Space; foco visível em cada opção; micro-validação anunciada por screen reader.

---

### AUD-001 — CTA final sem ação, link ou tracking

**Localização:** `Result`, linhas 431–433.

**Estratégia:** O CTA deve ser um `<a>` ou um `<button>` com `onClick` que:
1. Chama `trackQuizEvent('cta_clicked', ...)`
2. Abre a URL correta do planner do arquétipo
3. Aceita uma `prop` de URL (`ctaUrl`) para ser configurável

**Implementar mapa de CTAs nos arquétipos** (adicionar ao objeto `ARC`):

Cada arquétipo no objeto `ARC` (linhas 92–123) precisa de uma propriedade `ctaUrl`:

```javascript
nomade: {
  // ...existente...
  ctaUrl: 'https://seusite.com.br/planner/nomade-quantico',
},
reator: {
  ctaUrl: 'https://seusite.com.br/planner/reator-em-cadeia',
},
// ... para cada arquétipo
```

**Substituir o button do CTA (l.431–433):**

```jsx
<a
  href={arc.ctaUrl || '#'}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    trackQuizEvent('cta_clicked', {
      archetypeId: arc.name,
      ctaPosition: 'primary',
      destination: arc.ctaUrl || 'placeholder',
      xpEarned: scores ? Object.values(scores).reduce((a, b) => a + b, 0) : 0,
    });
    if (!arc.ctaUrl || arc.ctaUrl === '#') e.preventDefault();
  }}
  className="gb sq"
  style={{
    display: 'block', background: 'linear-gradient(135deg,#F0B429,#F97316)',
    border: 'none', borderRadius: 14, padding: '16px 24px', fontSize: 15,
    fontWeight: 700, color: '#0A0818', cursor: 'pointer', width: '100%',
    boxShadow: '0 4px 22px rgba(240,180,41,.3)', marginBottom: 10,
    textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box',
  }}
>
  Quero meu Planner {arc.name} →
</a>
```

**Receber `scores` como prop em `Result`:** O componente já recebe `scores` via prop (`Result({arc, scores, onReset})`). Usar diretamente.

**Critério de aceite:** Clicar no CTA emite `[QuizAnalytics] cta_clicked {...}` no console; link abre URL correta (ou `#` se placeholder); botão semanticamente acessível por teclado.

---

### AUD-004 — Ausência de disclaimer não-diagnóstico

**Localização:** Landing (l.172), MilestoneCard (l.396 — label "PERFIL ETDAH-AD"), Result (antes do CTA).

**Texto do disclaimer:**
```
Este quiz mapeia padrões de perfil comportamental e não substitui avaliação profissional.
```

**Implementação em `Landing` (adicionar antes do fechamento do div principal, l.200):**

```jsx
<p className="fi d6 nn" style={{
  fontSize: 11, color: '#3D3366', marginTop: 10, lineHeight: 1.5,
  maxWidth: 340, margin: '10px auto 0',
}}>
  Este quiz mapeia padrões de perfil e não substitui avaliação profissional.
</p>
```

**Ajustar label "PERFIL ETDAH-AD" em `Result` (l.396):**
```jsx
// Trocar:
<p className="mm" style={{fontSize:10,color:'#4A4480',marginBottom:6,textAlign:'center',letterSpacing:'.1em'}}>PERFIL ETDAH-AD</p>
// Por:
<p className="mm" style={{fontSize:10,color:'#4A4480',marginBottom:6,textAlign:'center',letterSpacing:'.1em'}}>MAPA DE PERFIL TDAH</p>
```

**Disclaimer no Result (adicionar APÓS o `<a>` de CTA e ANTES do botão "Refazer"):**
```jsx
<p className="nn" style={{
  fontSize: 11, color: '#3D3366', textAlign: 'center',
  lineHeight: 1.5, padding: '0 8px', marginBottom: 10,
}}>
  Mapeamento de perfil comportamental — não substitui avaliação profissional.
</p>
```

**Critério de aceite:** Disclaimer visível na landing e no resultado; não compete com o CTA visualmente; copy não usa "ETDAH-AD" como label de laudo.

---

## Implementação por achado — P1 (Alta prioridade)

---

### AUD-005 — XP diverge da especificação

**Problema:**
- Código: `setXp(x => x+10+(isMile?25:0))` — Marco 3 = +25 (igual aos outros)
- Spec: Marco 3 = +50; +5 bônus se resposta < 5 segundos
- Máximo atual: 225 XP. Máximo da spec: 300 XP

**Localização:** `App.onNext`, linhas 477–481.

**Implementação:**

Adicionar `qStartRef = useRef(Date.now())` nos refs do App (junto com `ansRef`).

Atualizar `goNext` para resetar o timer:
```javascript
const goNext = () => {
  qStartRef.current = Date.now();
  setQi(i => i + 1);
  setSel(null);
  setShowV(false);
  setShowN(false);
  setQk(k => k + 1);
};
```

Atualizar `onSel` para registrar o tempo de resposta:
```javascript
const onSel = k => {
  if (sel) return;
  setSel(k);
  setShowV(true);
  setTimeout(() => setShowN(true), 900);
};
```

Atualizar `onNext` com lógica de XP correta:
```javascript
const onNext = () => {
  const q = Q[qi];
  const na = { ...ansRef.current, [q.id]: sel };
  ansRef.current = na;
  const ns = calcScores(na);
  
  const timeSpentMs = Date.now() - qStartRef.current;
  const isSpeedBonus = timeSpentMs < 5000; // resposta em menos de 5s
  const isMile = [4, 9, 14].includes(qi);
  const mileBonus = qi === 14 ? 50 : isMile ? 25 : 0; // Marco 3 = +50
  const xpDelta = 10 + (isSpeedBonus ? 5 : 0) + mileBonus;
  
  setScores(ns);
  setXp(x => x + xpDelta);
  setFa(xpDelta);
  setFk(k => k + 1);
  
  // Analytics
  trackQuizEvent('question_answered', {
    questionId: q.id, dimension: q.d, answer: sel,
    timeSpentMs, xpDelta, isSpeedBonus,
  });
  
  if (qi === 4) {
    trackQuizEvent('milestone_reached', { milestoneId: 1, scoresPartial: ns, xpEarned: mileBonus });
    setMile(1);
  } else if (qi === 9) {
    trackQuizEvent('milestone_reached', { milestoneId: 2, scoresPartial: ns, xpEarned: mileBonus });
    setMile(2);
  } else if (qi === 14) {
    const finalArc = findArc(ns);
    trackQuizEvent('milestone_reached', { milestoneId: 3, scoresPartial: ns, xpEarned: mileBonus });
    trackQuizEvent('quiz_completed', { archetypeId: finalArc?.name, scores: ns, xpEarned: xp + xpDelta });
    setMile(3);
    setTimeout(() => { setMile(null); setScr('processing'); }, 2400);
  } else {
    goNext();
  }
};
```

**Atualizar `MilestoneCard`** (l.289) para usar XP correto por marco:
```jsx
// Passar o XP ganho como prop
function MilestoneCard({ num, scores, onCont, xpGained }) {
  // ...
  // Trocar o texto fixo "+25 XP · Marco Desbloqueado!" por:
  const xpLabel = num === 3
    ? `+${xpGained || 50} XP · PERFIL COMPLETO!`
    : `+${xpGained || 25} XP · Marco Desbloqueado!`;
  // E usar xpLabel no lugar do texto fixo na linha 289
}
```

Passar `xpGained` do App quando renderiza MilestoneCard.

**Critério de aceite:** Script `score-archetype-paths.js` continua 6/6; tudo A em < 5s = 300 XP; tudo A lento = 225 XP; Marco 3 mostra "+50 XP · PERFIL COMPLETO!".

---

### AUD-006 — Perfil N/N/N/N/N classificado como Nômade Quântico

**Problema:** `findArc` sempre retorna o melhor match por similaridade. Com N/N/N/N/N, o Nômade Quântico tem similaridade 7/10 (é o "menos severo"). Usuário cético com respostas C/D recebe um arquétipo intenso.

**Localização:** `findArc`, linhas 137–149.

**Implementação:**

```javascript
function findArc(scores) {
  const up = { D: sev(scores.D), H: sev(scores.H), I: sev(scores.I), A: sev(scores.A), E: sev(scores.E) };
  const sm = { N: 0, M: 1, S: 2 };
  
  // Verificar se todos os scores são "Normal" (baixa severidade)
  const allNormal = Object.values(up).every(v => v === 'N');
  if (allNormal) {
    // Retornar Camaleão Exausto com variante de linguagem baixa severidade
    return { ...ARC.camaleao, lowSeverity: true };
  }
  
  let best = null, bv = -1, bKey = null;
  Object.entries(ARC).forEach(([key, arc]) => {
    let sc = 0;
    Object.keys(arc.profile).forEach(d => {
      const diff = Math.abs(sm[up[d]] - sm[arc.profile[d]]);
      sc += diff === 0 ? 2 : diff === 1 ? 1 : 0;
    });
    if (sc > bv) { bv = sc; best = arc; bKey = key; }
  });
  
  // Tie-break: se empate, preferir o arquétipo cujas dimensões S coincidem com as do usuário
  // (já tratado pelo "primeiro vencedor" — pode ser expandido se necessário)
  
  return best;
}
```

**Em `Result`, tratar o caso `arc.lowSeverity`:**

```jsx
// No início do componente Result, após const co = arc.color:
const isLowSeverity = !!arc.lowSeverity;

// Ao renderizar o bridge (l.429), usar versão adaptada:
const bridgeText = isLowSeverity
  ? 'Seu TDAH se manifesta de forma mais sutil — o que frequentemente significa que você desenvolveu habilidades de compensação ao longo dos anos. Isso tem um custo que muitas vezes só você percebe.'
  : arc.bridge;
```

**Critério de aceite:** `score-archetype-paths.js` — Tudo C e Tudo D retornam Camaleão Exausto com `lowSeverity: true`; os 6 caminhos originais continuam corretos.

---

### AUD-007 — Marco 2 afirma D/H/I completos (mas Q11/Q12/Q13 ainda não foram respondidas)

**Problema:** O Marco 2 exibe D, H e I com denominador `/9` como se estivessem completos. Mas Q11 (D), Q12 (H) e Q13 (I) ainda não foram respondidas.

**Localização:** `MilestoneCard`, linhas 296–320.

**Opção implementada:** Manter o preview parcial mas corrigir os denominadores e a copy para refletir que é uma amostra.

**Calcular scores parciais corretos** (apenas das perguntas respondidas até Q10):

As perguntas de D respondidas até Q10 são Q1 e Q6 (max 6 pts). H: Q2, Q7 (max 5 pts). I: Q3, Q8 (max 6 pts).

Passar os denominadores parciais como prop ou calcular no componente:

```jsx
// Em MilestoneCard, no bloco m.xtra==='preview' (l.296):
const partialMax = { D: 6, H: 5, I: 6 }; // máx possível após Q10 para cada dimensão

{['D','H','I'].map(d => {
  const sc = scores[d] || 0;
  const max = partialMax[d];
  const pct = Math.round((sc / max) * 100);
  return (
    <div key={d} style={{ marginBottom: 9, textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span className="nn" style={{ fontSize: 12, color: '#897FC0' }}>{DIMS[d]}</span>
        <span className="mm" style={{ fontSize: 11, color: '#C4B5FD' }}>{sc}/{max} parcial</span>
      </div>
      <div style={{ height: 5, background: 'rgba(37,30,92,.7)', borderRadius: 99, overflow: 'hidden' }}>
        <div className="pbar" style={{ height: '100%', width: `${pct}%`, borderRadius: 99 }} />
      </div>
    </div>
  );
})}
```

**Atualizar o texto do sub-título do Marco 2** (em `mCfg[1]` na linha 280):
```javascript
{ color:'#21C9D0', title:'Perfil em formação!', 
  sub:'Amostra parcial de 3 dimensões — faltam 5 perguntas para completar.',
  // ...
}
```

**Critério de aceite:** Marco 2 mostra "X/6 parcial" ou "X/5 parcial" por dimensão; copy não afirma que as dimensões estão completas.

---

### AUD-008 — Resultado sem elementos de conversão: garantias, prova social, objeções

**Problema:** A seção de resultado tem apenas uma ponte curta e o CTA. Faltam: 4 bullets de redução de fricção, prova social, parágrafo de "planner genérico não funciona" por arquétipo.

**Localização:** `Result`, linhas 428–436 (entre o bridge e o CTA).

**Implementar bloco de conversão completo** (adicionar ANTES do `<a>` de CTA):

```jsx
{/* Seção ponte de venda completa — AUD-008 */}
<div className="ru" style={{ marginBottom: 20 }}>
  {/* Headline por arquétipo */}
  <h3 className="sq" style={{
    fontSize: 16, fontWeight: 800, color: '#EDE9FF',
    marginBottom: 8, lineHeight: 1.3,
  }}>
    Planner genérico não funciona para {arc.name.split(' ').slice(1).join(' ')}.
  </h3>
  <p className="nn" style={{
    fontSize: 13, color: '#897FC0', lineHeight: 1.6, marginBottom: 14,
  }}>
    Você já tentou cadernos, apps, bullet journals. Funcionaram por alguns dias — depois pararam.
    Não foi falha sua. Foi o sistema errado para o seu tipo de cérebro.
  </p>
  
  {/* Provas sociais — marcadas como placeholder até ter dados reais */}
  <div style={{
    background: 'rgba(123,94,167,.08)', border: '1px solid rgba(123,94,167,.2)',
    borderRadius: 10, padding: '12px 14px', marginBottom: 14,
  }}>
    <p className="nn" style={{ fontSize: 12, color: '#A78BFA', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
      "Finalmente algo que não exige que eu seja uma pessoa diferente para funcionar."
    </p>
    <p className="mm" style={{ fontSize: 10, color: '#4A4480', marginTop: 6, margin: '6px 0 0' }}>
      — R.T., TDAH combinado · [depoimento a confirmar com real]
    </p>
  </div>
  
  {/* 4 redutores de fricção */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 18 }}>
    {[
      '✓ Entrega digital imediata — acesso em segundos',
      '✓ Funciona no celular e no computador',
      '✓ 7 dias de garantia — ou seu dinheiro de volta',
      '✓ Desenvolvido com e para adultos com TDAH',
    ].map((item, i) => (
      <p key={i} className="nn" style={{ fontSize: 13, color: '#6EE7B7', margin: 0 }}>{item}</p>
    ))}
  </div>
</div>
```

**Critério de aceite:** Seção de resultado responde entrega, garantia, uso mobile/desktop e origem antes do CTA; prova social marcada como placeholder se não for real.

---

### AUD-009 — Reduced motion ignorado

**Problema:** O CSS tem 13 animações contínuas (shimmer, orb, spin, spinRev, dpulse, etc.) mas nenhuma regra `@media (prefers-reduced-motion: reduce)`.

**Localização:** Constante `CSS`, linhas 3–40.

**Adicionar ao final do template CSS** (antes do backtick de fechamento na linha 40):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .pbar::after { display: none; }
}
```

Adicionalmente, para o confetti, envolver a renderização com verificação:

```javascript
// Antes da função Confetti, adicionar helper:
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Na função Confetti:
function Confetti({ on }) {
  if (!on || prefersReducedMotion()) return null;
  // ... resto
}
```

**Critério de aceite:** Com `prefers-reduced-motion: reduce` emulado no browser, nenhuma animação contínua ocorre; confetti não aparece; fluxo de telas permanece funcional.

---

### AUD-010 — Contraste insuficiente

**Problema:** `#4A4480` é usado para textos secundários (labels de progresso, prova social, dots da timeline) e falha WCAG AA contra o fundo `#0A0818`.

**Localização:** linhas 192, 193, 199, 216, 227 e outras ocorrências de `#4A4480`.

**Estratégia:** Elevar para `#6B62A8` (passa WCAG AA) para textos que precisam ser legíveis. Manter `#4A4480` apenas para elementos verdadeiramente decorativos (ex: dots inativos na timeline).

**Substituições a fazer:**

| Localização | Uso atual | Ação |
|---|---|---|
| l.192 `{l}` label de stats | texto legível | Trocar `#4A4480` por `#6B62A8` |
| l.199 prova social | texto legível | Trocar `#4A4480` por `#6B62A8` |
| l.216 progresso "Pergunta X de 15" | texto legível | Trocar `#4A4480` por `#8B83C4` |
| l.227 dots inativos | decorativo | Manter `#4A4480` |
| l.303 labels Marco 2 | texto legível | Trocar `#4A4480` por `#6B62A8` |
| l.400 labels radar | texto legível | Trocar `fill:'#4A4480'` por `fill:'#7B73B8'` |

**Obs.:** Fazer busca global por `#4A4480` no arquivo e avaliar cada ocorrência.

**Critério de aceite:** axe-core não reporta violações `color-contrast` serious nas telas Landing, Q1 e Resultado.

---

## Implementação por achado — P2 (Melhorias importantes)

---

### AUD-011 — Progresso mostra 0% na primeira pergunta

**Problema:** `pct = Math.round((qi/15)*100)` → qi=0 → 0%. O usuário já está na pergunta 1.

**Localização:** `Header`, linha 206.

**Implementação:** Mostrar o progresso baseado na percepção da pergunta atual (não nas respondidas):

```javascript
// Linha 206 — trocar:
const pct = Math.round((qi / 15) * 100);
// Por:
const pct = Math.round(((qi + 1) / 15) * 100); // Pergunta 1 = 7%, não 0%
```

**Ajustar o texto de contagem** para ser mais claro:

```jsx
// Linha 217 — o texto já exibe qi+1 corretamente:
Pergunta <strong style={{color:'#C4B5FD'}}>{Math.min(qi+1,15)}</strong> de 15 · {pct}%
```

**Critério de aceite:** Q1 exibe "Pergunta 1 de 15 · 7%"; Q15 exibe "Pergunta 15 de 15 · 100%".

---

### AUD-014 — Header não é fixo durante scroll

**Problema:** Em mobile, ao rolar para ver a micro-validação e o botão "Próxima", o header de progresso some.

**Localização:** `Header`, linha 208.

**Implementação:**

```javascript
// Linha 208 — trocar position:'relative' por:
position: 'sticky', top: 0, zIndex: 10,
```

**CSS adicional** (para garantir que o sticky funcione em todos os browsers):
```css
/* Adicionar ao template CSS */
.hdr-sticky { position: sticky; top: 0; z-index: 10; }
```

**Critério de aceite:** Em 320px, o header de XP/progresso permanece visível ao rolar para ver validação e botão.

---

### AUD-012 — Teasers progressivos ausentes

**Problema:** A spec define mensagens não-bloqueantes após Q3/Q7/Q9/Q12/Q14 para manter curiosidade.

**Estratégia:** Estado `teaser` em `App`, exibido por 2 segundos após os índices especificados, abaixo da pergunta.

**Mapa de teasers** (de `quiz-tdah-especificacao-completa.md:301-310`):

```javascript
const TEASERS = {
  2:  'Padrão interessante detectado...',   // após Q3 (qi=2 = já respondeu Q3)
  6:  'Seu perfil está tomando uma forma específica.',
  8:  'Você respondeu de forma muito próxima a um dos 6 perfis.',
  11: 'Faltam 3 perguntas. O sistema identificou algo claro.',
  13: 'Última reta — quase lá.',
};
```

**Adicionar estado `teaser` em `App`:**

```javascript
const [teaser, setTeaser] = useState(null); // texto do teaser atual
```

**Em `goNext`, disparar teaser quando aplicável:**

```javascript
const goNext = () => {
  qStartRef.current = Date.now();
  const newQi = qi + 1; // próximo índice
  // Verificar se próxima pergunta tem teaser
  const teaserText = TEASERS[newQi];
  if (teaserText) {
    setTeaser(teaserText);
    setTimeout(() => setTeaser(null), 2200);
  }
  setQi(i => i + 1);
  setSel(null); setShowV(false); setShowN(false); setQk(k => k + 1);
};
```

**Renderizar o teaser no JSX do App** (abaixo do `QuestionCard`):

```jsx
{scr === 'quiz' && !mile && teaser && (
  <div
    aria-live="polite"
    className="fi nn"
    style={{
      textAlign: 'center', padding: '8px 18px',
      fontSize: 12, color: '#6B62A8', fontStyle: 'italic',
      opacity: teaser ? 1 : 0, transition: 'opacity .4s',
    }}
  >
    {teaser}
  </div>
)}
```

**Critério de aceite:** Mensagem aparece após Q3/Q7/Q9/Q12/Q14, desaparece em ~2s, não bloqueia interação, anunciada por `aria-live`.

---

### AUD-015 — Sem botão de voltar (até Q14)

**Problema:** Resposta impulsiva não pode ser corrigida. Abandonar e recomeçar é a única saída.

**Estratégia:** Adicionar botão "← Voltar" discreto no `QuestionCard` (visível de Q2 em diante, oculto em Q15).

**Novo handler em `App`:**

```javascript
const onBack = () => {
  if (qi === 0) return; // não pode voltar da primeira
  const prevQi = qi - 1;
  const prevQ = Q[prevQi];
  // Remover resposta anterior do ref
  const na = { ...ansRef.current };
  delete na[prevQ.id + 1]; // a resposta da pergunta atual (que ainda não foi confirmada)
  // Na verdade, voltamos para qi-1, que estava salvo em ansRef
  ansRef.current = na;
  // Recalcular scores sem a resposta removida
  const ns = calcScores(na);
  setScores(ns);
  // Decrementar XP (10 pontos da pergunta que vamos rever)
  setXp(x => Math.max(0, x - 10));
  setQi(prevQi);
  // Restaurar a seleção anterior se existir
  setSel(ansRef.current[Q[prevQi].id] || null);
  setShowV(!!ansRef.current[Q[prevQi].id]);
  setShowN(!!ansRef.current[Q[prevQi].id]);
  setQk(k => k + 1);
};
```

**Passar `onBack` para `QuestionCard`:**

```jsx
<QuestionCard
  q={Q[qi]} qi={qi} sel={sel} onSel={onSel}
  showV={showV} showNext={showN} onNext={onNext}
  qk={qk} onBack={qi > 0 && qi < 14 ? onBack : null}
/>
```

**Renderizar botão voltar em `QuestionCard`** (adicionar no topo, antes do label de dimensão):

```jsx
function QuestionCard({ q, qi, sel, onSel, showV, showNext, onNext, qk, onBack }) {
  return (
    <div key={qk} className="sl" style={{ padding: '20px 18px 24px', maxWidth: 540, margin: '0 auto', width: '100%' }}>
      {onBack && (
        <button
          onClick={onBack}
          className="nn"
          style={{
            background: 'none', border: 'none', color: '#4A4480',
            fontSize: 12, cursor: 'pointer', padding: '0 0 12px',
            display: 'flex', alignItems: 'center', gap: 4,
          }}
          aria-label="Voltar para pergunta anterior"
        >
          ← Voltar
        </button>
      )}
      {/* ... resto */}
    </div>
  );
}
```

**Critério de aceite:** "← Voltar" visível de Q2 a Q13; clicar em voltar restaura a pergunta anterior com a seleção anterior; XP decrementado em 10; recalcular score; `score-archetype-paths.js` continua 6/6.

---

### AUD-013 — Copy com palavras acima do limite

**Problema:** Algumas perguntas e alternativas excedem o limite de 12/8 palavras da spec.

**Itens a corrigir** (com contagem de palavras atual e sugestão):

| Item | Texto atual | Palavras | Sugestão |
|---|---|---|---|
| Q10 pergunta | "Você evita tentar coisas novas com medo de não ser bom o suficiente?" | 13 | "Você evita tentar por medo de não ser bom o suficiente?" (10) |
| Q15 opção D | "Na maioria das vezes me sinto equilibrado" | 7 | ✓ ok |
| Q14 opção A | "Nunca — quando começa bem, algo quebra e tudo vai" | 9 | Ligeiramente acima; aceitar |
| Q7 opção A | "Toda noite — replay mental de tudo ao mesmo tempo" | 9 | Ligeiramente acima; aceitar |
| Q6 validação A | 18 palavras | 18 | Encurtar: "Iniciar com entusiasmo e perder o fio é um padrão neurológico." (10) |
| Q15 pergunta | "Você precisa de muito mais esforço que os outros para funcionar normal?" | 12 | Trocar "funcionar normal" por "funcionar como esperam de você" |

**Localização:** Linhas 52–87 (array `Q`).

**Critério de aceite:** Nenhuma pergunta > 12 palavras; nenhuma alternativa > 8 palavras; validações > 15 palavras reduzidas.

---

## Implementação por achado — P3 (Polish)

---

### AUD-016 — Resultado sem opção de compartilhar

**Adicionar botão "Compartilhar meu perfil"** em `Result`, após o botão "Refazer":

```jsx
{/* Verificar se Web Share API está disponível */}
{typeof navigator !== 'undefined' && navigator.share && (
  <button
    className="ghb nn"
    onClick={async () => {
      trackQuizEvent('share_clicked', { archetypeId: arc.name });
      try {
        await navigator.share({
          title: `Meu perfil TDAH: ${arc.name}`,
          text: `${arc.tag} — Descubra o seu perfil em`,
          url: 'https://seusite.com.br/quiz-tdah',
        });
      } catch (_) {
        // usuário cancelou ou browser não suporta
      }
    }}
    style={{
      background: 'transparent', border: '1px solid #251E5C',
      borderRadius: 12, padding: '11px', fontSize: 13,
      color: '#4A4480', cursor: 'pointer', width: '100%', marginTop: 8,
    }}
  >
    Compartilhar meu perfil
  </button>
)}
```

**Critério de aceite:** Botão aparece apenas onde `navigator.share` está disponível; tracking emitido; se compartilhamento cancelado, não gera erro.

---

## Critérios de aceite globais (validação final)

Execute estes testes após concluir todos os passes:

```bash
# 1. Scoring deve permanecer correto
node .agents/skills/tdah-ux-audit/scripts/score-archetype-paths.js
# Esperado: 6/6 arquétipos corretos
# Tudo C e Tudo D → Camaleão Exausto com lowSeverity:true

# 2. Features detectadas devem aumentar
node .agents/skills/tdah-ux-audit/scripts/extract-quiz-content.js
# Esperado: analytics events presentes, prefers-reduced-motion presente
```

**Checklist manual (cada item = deve passar):**

```
[ ] Completar o quiz em 320px sem overflow ou botão escondido
[ ] Completar o quiz em 390px, 768px e desktop
[ ] Completar o quiz somente com teclado (Tab + Enter/Space)
[ ] Com prefers-reduced-motion: reduce — sem confetti, shimmer ou pulse contínuo
[ ] Console mostra [QuizAnalytics] quiz_started ao iniciar
[ ] Console mostra [QuizAnalytics] question_answered a cada pergunta
[ ] Console mostra [QuizAnalytics] milestone_reached em Q5/Q10/Q15
[ ] Console mostra [QuizAnalytics] quiz_completed após Q15
[ ] Console mostra [QuizAnalytics] result_viewed na tela de resultado
[ ] Console mostra [QuizAnalytics] cta_clicked ao clicar no botão
[ ] Resposta rápida (< 5s) adiciona +5 XP (visível no float)
[ ] Marco 3 exibe "+50 XP · PERFIL COMPLETO!"
[ ] XP total com tudo A rápido = 300
[ ] Tudo C e Tudo D → Camaleão Exausto com copy de baixa severidade
[ ] Marco 2 mostra denominadores parciais e copy "amostra parcial"
[ ] Disclaimer presente na landing e no resultado
[ ] "PERFIL ETDAH-AD" substituído por "MAPA DE PERFIL TDAH"
[ ] Botão "← Voltar" visível de Q2 a Q13, ausente em Q1 e Q14/Q15
[ ] Teasers aparecem em Q3/Q7/Q9/Q12/Q14 e somem em ~2s
[ ] Header sticky permanece visível durante scroll em mobile
[ ] CTA abre URL (ou # se placeholder) e registra cta_clicked
[ ] 4 bullets de redução de fricção visíveis antes do CTA
[ ] Q1 mostra "Pergunta 1 de 15 · 7%" (não 0%)
```

---

## Restrições absolutas — nunca faça isso

1. **Não adicionar dependências.** Sem npm install de nada.
2. **Não separar em múltiplos arquivos.** Tudo em `quiz-tdah-v1.jsx`.
3. **Não alterar a lógica de `calcScores` sem rodar o script de validação.**
4. **Não remover animações sem adicionar reduced-motion correspondente.**
5. **Não colocar placeholder de depoimento como se fosse real.** Marcar claramente como `[depoimento a confirmar]`.
6. **Não remover o botão "Refazer o quiz".**
7. **Não alterar os textos de perguntas/alternativas sem verificar contagem de palavras.**
8. **Não usar `window.location.href = ...` no CTA** sem chamar `trackQuizEvent` antes.

---

## Dicas de Extended Thinking para esta implementação

Ao trabalhar em cada achado, use seu raciocínio para:

1. **AUD-003 (acessibilidade):** Pensar em como o `fieldset` + `legend` impacta o layout visual atual — o `<h2>` que exibe a pergunta precisa migrar para `<legend>` sem quebrar o CSS.

2. **AUD-002 + AUD-001 (analytics + CTA):** O helper `trackQuizEvent` precisa ser definido ANTES de qualquer componente no arquivo. Pensar na ordem de declaração.

3. **AUD-005 (XP):** O timer `qStartRef` precisa ser inicializado corretamente quando o quiz começa (`setScr('quiz')`) e resetado a cada `goNext`. Verificar se há casos de reset no `onReset`.

4. **AUD-006 (low severity):** A prop `lowSeverity` adicionada ao objeto retornado por `findArc` precisa ser tratada em `Result` sem quebrar as props existentes.

5. **AUD-015 (voltar):** O XP decrementado ao voltar deve levar em conta o bônus de velocidade que pode ter sido ganho naquela pergunta — ou simplificar decrementando sempre 10 e documentar a simplificação.

6. **Ordem de renderização no JSX de App:** Os novos elementos (teaser, `xp_gained` no MilestoneCard) precisam ser integrados no JSX sem duplicar renderização ou quebrar o layout de tela cheia.
