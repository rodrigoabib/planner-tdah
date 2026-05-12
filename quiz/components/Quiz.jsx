import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { ARC, LOW_SEVERITY_BRIDGE } from "../data/archetypes.js"
import { generateCouponSession, captureUtmsFromLocation } from "../coupon.js"

function trackQuizEvent(name, payload = {}) {
  const event = { event: name, timestamp: Date.now(), ...payload }
  if (typeof window !== 'undefined' && window.quizAnalytics?.track) {
    window.quizAnalytics.track(name, payload)
  } else {
    console.log('[QuizAnalytics]', name, payload)
  }
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const CSS = `
@import url('https://cdn.jsdelivr.net/npm/@fontsource/syne@5/index.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/nunito@5/index.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/space-mono@5/index.css');
*{box-sizing:border-box;margin:0;padding:0}
@keyframes shimmer{0%{left:-100%}100%{left:200%}}
@keyframes floatUp{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-50px);opacity:0}}
@keyframes confFall{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(660px) rotate(720deg);opacity:0}}
@keyframes slideR{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes bIn{0%{opacity:0;transform:scale(.5)}72%{transform:scale(1.07)}100%{opacity:1;transform:scale(1)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes spinRev{to{transform:rotate(-360deg)}}
@keyframes dpulse{0%,100%{opacity:.75;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
@keyframes rUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes orb{0%,100%{transform:scale(1) translate(0,0)}50%{transform:scale(1.04) translate(6px,-6px)}}
.sq{font-family:'Syne','Trebuchet MS',sans-serif}
.nn{font-family:'Nunito','Segoe UI',sans-serif}
.mm{font-family:'Space Mono','Courier New',monospace}
.sl{animation:slideR .28s ease-out both}
.fi{animation:fadeIn .36s ease-out both}
.bi{animation:bIn .52s cubic-bezier(.34,1.56,.64,1) both}
.ru{animation:rUp .4s ease-out both}
.d1{animation-delay:.08s}.d2{animation-delay:.16s}.d3{animation-delay:.24s}
.d4{animation-delay:.32s}.d5{animation-delay:.40s}.d6{animation-delay:.50s}.d7{animation-delay:.62s}
.pbar{background:linear-gradient(90deg,#7B5EA7,#21C9D0);position:relative;overflow:hidden}
.pbar::after{content:'';position:absolute;top:0;left:-100%;width:55%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.32),transparent);animation:shimmer 1.9s linear infinite}
.oc{transition:all .14s ease;cursor:pointer}
.oc:hover:not(.os){border-color:rgba(123,94,167,.55)!important;background:rgba(123,94,167,.1)!important;transform:translateX(3px)}
.os{border-color:#7B5EA7!important;background:rgba(123,94,167,.2)!important;box-shadow:0 0 0 1px rgba(123,94,167,.32)}
.gb{transition:all .15s;cursor:pointer}
.gb:hover{transform:translateY(-2px);filter:brightness(1.1)}
.gb:active{transform:scale(.98)}
.ghb{transition:all .15s;cursor:pointer}
.ghb:hover{background:rgba(123,94,167,.12)!important;border-color:rgba(123,94,167,.5)!important}
.dc{animation:dpulse 1.2s ease-in-out infinite}
label.oc:focus-within{outline:2px solid #7B5EA7;outline-offset:2px}
input[type="radio"]:focus-visible+div{outline:2px solid #7B5EA7;outline-offset:2px}
.vh{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.skip-link{position:absolute;left:-9999px;top:8px;background:#F0B429;color:#0A0818;padding:8px 16px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;z-index:100}
.skip-link:focus{left:12px;outline:2px solid #0A0818;outline-offset:2px}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}
  .pbar::after{display:none}
}
`

const Q = [
  {id:1,d:'D',q:'Você começa a ler algo e chega no fim sem absorver nada?',
   o:[{k:'A',t:'Sempre — releio o mesmo parágrafo várias vezes',s:{D:3}},{k:'B',t:'Frequentemente, se o assunto for chato',s:{D:2}},{k:'C',t:'Às vezes, depende do meu estado',s:{D:1}},{k:'D',t:'Raramente acontece comigo',s:{D:0}}],
   v:{A:'Quando muitas camadas de pensamento rodam juntas, leitura linear vira um esforço real.',B:'O filtro de interesse do seu cérebro é potente — não é preguiça.',C:'Estado emocional e contexto afetam a absorção mais do que parece.',D:'Leitura mais estável é uma informação importante para o seu perfil.'}},
  {id:2,d:'H',q:'Fica difícil ficar parado — no corpo ou na cabeça?',
   o:[{k:'A',t:'Corpo agitado e mente acelerada juntos',s:{H:3}},{k:'B',t:'Mentalmente sempre; fisicamente me contenho',s:{H:2,D:1}},{k:'C',t:'Em algumas situações fico muito agitado',s:{H:1}},{k:'D',t:'Geralmente fico quieto sem problema',s:{H:0}}],
   v:{A:'Quando corpo e mente estão em overdrive juntos, parecer calmo custa muito.',B:'A agitação interna invisível pode cansar mais que a física.',C:'Gatilhos situacionais de agitação são uma característica reconhecível.',D:'Regulação física mais estável é uma variável importante no seu perfil.'}},
  {id:3,d:'I',q:'Você age ou fala antes de terminar de pensar?',
   o:[{k:'A',t:'Sim — e frequentemente me arrependo depois',s:{I:3}},{k:'B',t:'Quando animado ou ansioso, perco o freio',s:{I:2}},{k:'C',t:'Acontece sob pressão, mas consigo me conter',s:{I:1}},{k:'D',t:'Geralmente consigo pausar antes de agir',s:{I:0}}],
   v:{A:'O sistema que ajuda a frear antes de agir funciona diferente — o arrependimento depois faz parte desse padrão.',B:'Emoções intensas liberam impulso mesmo quando a intenção é outra.',C:'Pressão como gatilho de impulso é específico e mapeável.',D:'Controle de impulso mais ativo é uma variável distinta no seu perfil.'}},
  {id:4,d:'A',q:'Você sabe o que precisa fazer, mas não consegue começar?',
   o:[{k:'A',t:'Toda hora — paralisia quase física',s:{A:3}},{k:'B',t:'Frequentemente, sem pressão externa',s:{A:2}},{k:'C',t:'Às vezes, quando estou sobrecarregado',s:{A:1}},{k:'D',t:'Consigo começar com certa facilidade',s:{A:0}}],
   v:{A:'Travar antes de começar não é preguiça — é o sistema de iniciar tarefas operando diferente.',B:'Precisar de pressão externa para começar é um padrão reconhecível.',C:'Sobrecarga como gatilho de paralisia faz todo sentido.',D:'Iniciação mais ativa é uma capacidade relevante no seu perfil.'}},
  {id:5,d:'E',q:'Uma crítica, mesmo pequena, consegue estragar seu dia inteiro?',
   o:[{k:'A',t:'Sim — dói de um jeito difícil de explicar',s:{E:3}},{k:'B',t:'Fico ruminando por horas sem conseguir soltar',s:{E:2}},{k:'C',t:'Me afeta, mas supero no mesmo dia',s:{E:1}},{k:'D',t:'Consigo separar crítica de ataque com facilidade',s:{E:0}}],
   v:{A:'Sensibilidade à rejeição é uma das experiências mais intensas e invisíveis desse padrão de atenção.',B:'Ruminação pós-crítica por horas é um padrão emocional real — não exagero.',C:'Impacto emocional moderado com recuperação no mesmo dia é relevante.',D:'Maior separação emocional de críticas é uma variável distinta no seu perfil.'}},
  {id:6,d:'D',q:'Quantos projetos você iniciou nos últimos meses sem terminar?',
   o:[{k:'A',t:'Perdi a conta — cemitério de inícios',s:{D:3,A:1}},{k:'B',t:'Mais de 5 — sempre surge algo urgente',s:{D:2,A:1}},{k:'C',t:'2 ou 3 — às vezes me perco',s:{D:1}},{k:'D',t:'Costumo terminar o que começo',s:{D:0}}],
   v:{A:'Iniciar com entusiasmo e perder o fio é um padrão reconhecível.',B:'Urgência nova como substituto de conclusão é uma das frustrações mais comuns desse padrão.',C:'Ciclos incompletos ocasionais são parte da variabilidade do perfil.',D:'Consistência de conclusão é uma força relevante no seu mapeamento.'}},
  {id:7,d:'H',q:'Sua mente continua ativa à noite quando deveria descansar?',
   o:[{k:'A',t:'Toda noite — replay mental de tudo',s:{H:3,E:1}},{k:'B',t:'Frequentemente — demoro muito para desligar',s:{H:2}},{k:'C',t:'Às vezes, em dias com muito estímulo',s:{H:1}},{k:'D',t:'Geralmente consigo relaxar e dormir',s:{H:0}}],
   v:{A:'Nesse padrão, a mente muitas vezes só desacelera quando o corpo já não aguenta mais.',B:'O tempo extra para desligar é um custo de energia invisível.',C:'Estímulo do dia afetando o sono é um padrão reconhecível.',D:'Transição para descanso mais fluida é uma informação relevante.'}},
  {id:8,d:'I',q:'Você faz gastos ou compromissos por impulso e se arrepende depois?',
   o:[{k:'A',t:'Sim — finanças e agenda já pagaram',s:{I:3}},{k:'B',t:'Pequenas compras direto, grandes às vezes',s:{I:2}},{k:'C',t:'Ocasionalmente compro sem planejar',s:{I:1}},{k:'D',t:'Costumo pensar antes de gastar',s:{I:0}}],
   v:{A:'Impulso financeiro é um dos impactos mais concretos e custosos desse padrão.',B:'Gradação do impulso — alto no pequeno, ocasional no grande — é um padrão específico.',C:'Compras ocasionais por impulso em nível controlável são parte do espectro.',D:'Planejamento anterior à ação é uma variável de controle importante.'}},
  {id:9,d:'A',q:'Depois de um dia ruim ou uma falha, quanto tempo para retomar?',
   o:[{k:'A',t:'Dias ou semanas — um erro derruba tudo',s:{A:3,E:2}},{k:'B',t:'2-3 dias para retomar o ritmo',s:{A:2,E:1}},{k:'C',t:'Umas horas — no mesmo dia reagrupo',s:{A:1}},{k:'D',t:'Geralmente retomo no dia seguinte',s:{A:0}}],
   v:{A:'Quando uma falha derruba o sistema inteiro, não é fraqueza — é autorregulação sob pressão máxima.',B:'2-3 dias para se recuperar é um custo real que poucas pessoas ao redor compreendem.',C:'Recuperação em horas mostra resiliência — com custo de energia no processo.',D:'Recuperação mais ágil é uma capacidade relevante no seu perfil.'}},
  {id:10,d:'E',q:'Você evita tentar por medo de não ser bom o suficiente?',
   o:[{k:'A',t:'Muito — o medo me paralisa',s:{E:3,A:1}},{k:'B',t:'Procrastino para não encarar a falha',s:{E:2}},{k:'C',t:'Às vezes, quando o risco é alto',s:{E:1}},{k:'D',t:'Consigo tentar sem esse medo me travar',s:{E:0}}],
   v:{A:'Travar por medo de julgamento é uma das formas mais silenciosas desse padrão emocional.',B:'Procrastinar como defesa contra falha é extremamente comum.',C:'Avaliar risco antes de tentar é um padrão situacional compreensível.',D:'Tentar sem medo paralisante é uma informação relevante.'}},
  {id:11,d:'D',q:'Com que frequência você perde objetos do dia a dia?',
   o:[{k:'A',t:'Quase todo dia — é uma busca constante',s:{D:3}},{k:'B',t:'Algumas vezes por semana',s:{D:2}},{k:'C',t:'De vez em quando, não é padrão',s:{D:1}},{k:'D',t:'Raramente — sei onde as coisas estão',s:{D:0}}],
   v:{A:'Lembrar de coisas para fazer e onde guardamos objetos costuma ser mais difícil nesse padrão.',B:'Perda recorrente em frequência moderada representa custo cognitivo real.',C:'Perda ocasional sem padrão fixo é uma variável do espectro.',D:'Memória de localização mais estável é uma informação relevante.'}},
  {id:12,d:'H',q:'Você se entedia rapidamente em situações que os outros aguentam bem?',
   o:[{k:'A',t:'Sempre — preciso de estímulo constante',s:{H:3,D:1}},{k:'B',t:'Reuniões longas, filas e esperas me consomem',s:{H:2}},{k:'C',t:'Em algumas situações me perco',s:{H:1}},{k:'D',t:'Tolero situações calmas sem problema',s:{H:0}}],
   v:{A:'Busca constante por novidade é como o cérebro mantém energia para se engajar nesse padrão.',B:'Situações estruturadas e longas costumam ser ambientes de baixo engajamento aqui.',C:'Gatilhos situacionais de tédio são reconhecíveis e previsíveis.',D:'Tolerância ao tédio mais ativa é uma variável de regulação relevante.'}},
  {id:13,d:'I',q:'Você interrompe pessoas ou completa as frases delas sem querer?',
   o:[{k:'A',t:'Sim — percebo depois que já falei',s:{I:3}},{k:'B',t:'Animado ou ansioso, não consigo esperar',s:{I:2}},{k:'C',t:'Às vezes, em conversas longas',s:{I:1}},{k:'D',t:'Espero minha vez sem dificuldade',s:{I:0}}],
   v:{A:'Interromper sem querer é uma das manifestações mais custosas socialmente desse padrão.',B:'Estado emocional como gatilho de interrupção é um padrão específico e mapeável.',C:'Conversas longas como contexto de interrupção é uma variável situacional.',D:'Controle de espera em conversas é uma habilidade relevante no seu perfil.'}},
  {id:14,d:'A',q:'Você consegue manter uma rotina por mais de duas semanas seguidas?',
   o:[{k:'A',t:'Nunca — algo quebra e tudo vai junto',s:{A:3}},{k:'B',t:'Raramente — consistência dura pouco',s:{A:2}},{k:'C',t:'Às vezes — depende de fatores externos',s:{A:1}},{k:'D',t:'Tenho rotinas que funcionam há tempo',s:{A:0}}],
   v:{A:'Rotinas quebrando sem retomada automática é autorregulação sob alta pressão.',B:'Ciclos curtos de consistência são um padrão reconhecível, não falta de disciplina.',C:'Depender de fatores externos para manter rotina é comum nesse padrão.',D:'Rotinas mais estáveis e duradouras são uma capacidade relevante.'}},
  {id:15,d:'E',q:'Você precisa de muito mais esforço para funcionar como esperam de você?',
   o:[{k:'A',t:'Sempre — é exaustivo. Poucos imaginam quanto.',s:{E:3,A:2}},{k:'B',t:'Frequentemente — vivo em overdrive silencioso',s:{E:2,A:1}},{k:'C',t:'Em algumas fases isso é muito real',s:{E:1}},{k:'D',t:'Na maioria das vezes me sinto equilibrado',s:{E:0}}],
   v:{A:'O custo invisível de "se segurar" é real e profundamente pouco reconhecido.',B:'Overdrive silencioso é uma das formas mais exaustivas de viver nesse padrão.',C:'Fases de maior custo de funcionamento são parte da variabilidade do espectro.',D:'Sensação de equilíbrio mais frequente é uma informação relevante para o mapeamento.'}}
]

const DIMS = {D:'Desatenção',H:'Hiperatividade',I:'Impulsividade',A:'Autorregulação',E:'Emocional'}

const TEASERS = {
  2:  'Padrão interessante detectado...',
  6:  'Seu perfil está tomando uma forma específica.',
  8:  'Você respondeu de forma muito próxima a um dos 6 perfis.',
  11: 'Faltam 3 perguntas. O sistema identificou algo claro.',
  13: 'Última reta — quase lá.',
}

const DIM_MAX={D:11,H:9,I:9,A:11,E:11}

function calcScores(answers) {
  const s={D:0,H:0,I:0,A:0,E:0}
  Q.forEach(q=>{
    const a=answers[q.id];if(!a)return
    const opt=q.o.find(o=>o.k===a);if(!opt)return
    Object.entries(opt.s).forEach(([d,p])=>{s[d]=(s[d]||0)+p})
  })
  Object.keys(s).forEach(d=>{s[d]=Math.min(s[d],DIM_MAX[d])})
  return s
}

function sev(v){return v<=3?'N':v<=6?'M':'S'}

function findArc(scores){
  const up={D:sev(scores.D),H:sev(scores.H),I:sev(scores.I),A:sev(scores.A),E:sev(scores.E)}
  const allNormal=Object.values(up).every(v=>v==='N')
  if(allNormal)return {...ARC.camaleao,lowSeverity:true}
  const sm={N:0,M:1,S:2}
  let best=null,bv=-1
  Object.values(ARC).forEach(arc=>{
    let sc=0
    Object.keys(arc.profile).forEach(d=>{
      const diff=Math.abs(sm[up[d]]-sm[arc.profile[d]])
      sc+=diff===0?2:diff===1?1:0
    })
    if(sc>bv){bv=sc;best=arc}
  })
  return best
}

const CONF_PARTS=Array.from({length:42},(_,i)=>({
  id:i,x:Math.round(Math.random()*100),
  delay:Math.round(Math.random()*14)/10,
  dur:Math.round((1.5+Math.random()*1.3)*10)/10,
  color:['#F0B429','#8B5CF6','#21C9D0','#EC4899','#22C55E','#F97316'][i%6],
  sz:Math.round(5+Math.random()*7),
  br:Math.random()>.5?'50%':'3px'
}))

function Confetti({on}){
  if(!on||prefersReducedMotion())return null
  return(
    <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden',zIndex:5}}>
      {CONF_PARTS.map(p=>(
        <div key={p.id} style={{position:'absolute',left:`${p.x}%`,top:-12,width:p.sz,height:p.sz,background:p.color,borderRadius:p.br,animation:`confFall ${p.dur}s ${p.delay}s ease-in forwards`}}/>
      ))}
    </div>
  )
}

function IntroScreen({onStart}){
  return(
    <div style={{background:'#0A0818',minHeight:620,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'32px 20px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'-18%',left:'-12%',width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,rgba(123,94,167,.08) 0%,transparent 70%)',animation:'orb 9s ease-in-out infinite',pointerEvents:'none'}}/>
      <div style={{maxWidth:440,width:'100%',textAlign:'center',position:'relative',zIndex:1}}>
        <div className="fi sq" style={{display:'inline-block',background:'rgba(123,94,167,.15)',border:'1px solid rgba(123,94,167,.35)',borderRadius:99,padding:'5px 16px',marginBottom:24,fontSize:11,color:'#C4B5FD',letterSpacing:'.08em'}}>
          MAPEAMENTO DE PADRÕES DE ATENÇÃO
        </div>
        <h1 className="fi d1 sq" style={{fontSize:'clamp(28px,7vw,50px)',fontWeight:800,color:'#D8D2F0',lineHeight:1.1,marginBottom:14}}>
          Como sua<br/>
          <span style={{backgroundImage:'linear-gradient(135deg,#8B5CF6,#21C9D0)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>atenção funciona?</span>
        </h1>
        <p className="fi d2 nn" style={{fontSize:15,color:'#897FC0',lineHeight:1.65,marginBottom:28}}>
          Descubra seu padrão de funcionamento em 15 perguntas —<br/>e o sistema feito para o <strong style={{color:'#D8D2F0'}}>SEU</strong> jeito de pensar.
        </p>
        <div className="fi d3" style={{display:'flex',justifyContent:'center',gap:24,marginBottom:30,flexWrap:'wrap'}}>
          {[['~5','minutos'],['15','perguntas'],['6','padrões']].map(([v,l])=>(
            <div key={l} style={{textAlign:'center'}}>
              <div className="mm" style={{fontSize:22,fontWeight:700,color:'#F0B429'}}>{v}</div>
              <div className="nn" style={{fontSize:12,color:'#9892C4',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        <button className="fi d4 gb sq" onClick={()=>{trackQuizEvent('quiz_started',{timestamp:Date.now(),viewportWidth:typeof window!=='undefined'?window.innerWidth:0});onStart()}} style={{background:'linear-gradient(135deg,#F0B429,#F97316)',border:'none',borderRadius:14,padding:'15px 40px',fontSize:16,fontWeight:700,color:'#0A0818',cursor:'pointer',width:'100%',maxWidth:300,display:'block',margin:'0 auto 14px',boxShadow:'0 4px 24px rgba(240,180,41,.28)'}}>
          Descobrir meu padrão →
        </button>
        <p className="fi d6 nn" style={{fontSize:13,color:'#9892C4',marginTop:10,lineHeight:1.55,padding:'0 8px'}}>
          Este quiz mapeia padrões de atenção e organização. Não é uma ferramenta clínica e não substitui avaliação profissional.
        </p>
      </div>
    </div>
  )
}

function Header({qi,xp,floatK,floatA}){
  const pct=Math.round(((qi+1)/15)*100)
  return(
    <div style={{background:'rgba(10,8,24,.97)',borderBottom:'1px solid #251E5C',padding:'10px 18px',position:'sticky',top:0,zIndex:10}}>
      {floatA>0&&(
        <div key={floatK} className="mm" aria-live="polite" style={{position:'absolute',top:6,left:'50%',fontSize:14,fontWeight:700,color:'#F0B429',pointerEvents:'none',animation:'floatUp .95s ease-out forwards',zIndex:20,whiteSpace:'nowrap',transform:'translateX(-50%)'}}>
          +{floatA} XP{floatA>10?' ★':''}
        </div>
      )}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <div className="mm" style={{fontSize:13,fontWeight:700,color:'#F0B429'}}>⚡ {xp} XP</div>
        <div className="nn" style={{fontSize:13,color:'#8B83C4'}}>
          Pergunta <strong style={{color:'#C4B5FD'}}>{Math.min(qi+1,15)}</strong> de 15 · {pct}%
        </div>
      </div>
      <div style={{height:6,background:'rgba(37,30,92,.7)',borderRadius:99,overflow:'hidden',position:'relative'}}>
        <div className="pbar" style={{height:'100%',width:`${pct}%`,borderRadius:99,transition:'width .4s ease-out'}}/>
      </div>
      <div style={{display:'flex',justifyContent:'center',gap:4,marginTop:8,flexWrap:'wrap'}}>
        {Array.from({length:15},(_,i)=>{
          const done=i<qi,cur=i===qi,mile=i===4||i===9||i===14
          return(
            <div key={i} className={cur?'dc':''} style={{width:mile?10:6,height:mile?10:6,borderRadius:'50%',background:done?'#22C55E':cur?'#7B5EA7':'rgba(37,30,92,.8)',border:mile?`1.5px solid ${done?'#22C55E':cur?'#7B5EA7':'rgba(240,180,41,.3)'}`:undefined,transition:'all .3s',flexShrink:0}}/>
          )
        })}
      </div>
    </div>
  )
}

function QuestionCard({q,qi,sel,onSel,showV,showNext,onNext,qk,onBack}){
  const blk=qi<5?0:qi<10?1:2
  const bColors=['rgba(139,92,246','rgba(33,201,208','rgba(240,180,41']
  const bTxt=['#C4B5FD','#67E8F9','#FCD34D']
  const nextRef=useRef(null)
  const firstOptionRef=useRef(null)
  // KAN-18: ao carregar nova pergunta (qk muda) sem resposta selecionada, foco vai para a primeira
  // opção. Isso garante que o primeiro Tab cai nas opções (A→B→C→D), não em "Voltar".
  useEffect(()=>{
    if(sel)return
    if(!firstOptionRef.current)return
    const focusTimer=setTimeout(()=>{firstOptionRef.current&&firstOptionRef.current.focus({preventScroll:true})},80)
    return()=>clearTimeout(focusTimer)
  },[qk,sel])
  useEffect(()=>{
    if(showNext&&nextRef.current){
      const focusTimer=setTimeout(()=>{nextRef.current&&nextRef.current.focus({preventScroll:true})},60)
      return()=>clearTimeout(focusTimer)
    }
  },[showNext])
  return(
    <div key={qk} className="sl" style={{padding:'20px 18px 24px',maxWidth:540,margin:'0 auto',width:'100%'}}>
      <div className="nn" style={{display:'inline-flex',alignItems:'center',gap:6,background:`${bColors[blk]},.12)`,border:`1px solid ${bColors[blk]},.3)`,borderRadius:99,padding:'3px 12px',marginBottom:14,fontSize:10,color:bTxt[blk],letterSpacing:'.06em',textTransform:'uppercase'}}>
        {DIMS[q.d]} · Q{q.id}/15
      </div>
      <fieldset style={{border:'none',padding:0,margin:0}}>
        <legend className="sq" style={{fontSize:'clamp(16px,3.8vw,22px)',fontWeight:700,color:'#D8D2F0',lineHeight:1.36,marginBottom:20,display:'block',width:'100%'}}>
          {q.q}
        </legend>
        <div style={{display:'flex',flexDirection:'column',gap:9,marginBottom:14}}>
          {q.o.map((opt,i)=>{
            const isSel=sel===opt.k,isOth=sel&&!isSel
            return(
              <label key={opt.k} htmlFor={`q${q.id}-${opt.k}`} className={`oc fi d${i+1}${isSel?' os':''}`} style={{background:isSel?'rgba(123,94,167,.2)':'rgba(18,15,45,.9)',border:`1.5px solid ${isSel?'#7B5EA7':'#251E5C'}`,borderRadius:12,padding:'13px 15px',display:'flex',alignItems:'center',gap:12,opacity:isOth?.42:1,cursor:sel?'default':'pointer'}}>
                <input
                  ref={i===0?firstOptionRef:null}
                  type="radio"
                  id={`q${q.id}-${opt.k}`}
                  name={`q${q.id}`}
                  value={opt.k}
                  checked={isSel}
                  disabled={!!sel&&!isSel}
                  onChange={()=>!sel&&onSel(opt.k)}
                  onKeyDown={e=>{if((e.key==='Enter'||e.key===' ')&&!sel){e.preventDefault();onSel(opt.k)}}}
                  style={{position:'absolute',opacity:0,width:0,height:0}}
                />
                <div style={{width:28,height:28,borderRadius:8,flexShrink:0,background:isSel?'#7B5EA7':'rgba(37,30,92,.7)',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .14s'}}>
                  <span className="mm" style={{fontSize:11,fontWeight:700,color:isSel?'#fff':'#9892C4'}}>{isSel?'✓':opt.k}</span>
                </div>
                <span className="nn" style={{fontSize:14,color:isSel?'#D8D2F0':'#897FC0',fontWeight:isSel?600:400,lineHeight:1.4,transition:'color .14s'}}>{opt.t}</span>
              </label>
            )
          })}
        </div>
      </fieldset>
      {showV&&sel&&(
        <div className="fi" aria-live="polite" aria-atomic="true" style={{background:'rgba(37,30,92,.35)',borderLeft:'3px solid #7B5EA7',borderRadius:'0 10px 10px 0',padding:'11px 14px',marginBottom:14}}>
          <p className="nn" style={{fontSize:13,color:'#A78BFA',fontStyle:'italic',lineHeight:1.55,margin:0}}>
            💡 {q.v[sel]}
          </p>
        </div>
      )}
      {showNext&&(
        <button ref={nextRef} className="fi gb sq" onClick={onNext} style={{background:'linear-gradient(135deg,#7B5EA7,#6D28D9)',border:'none',borderRadius:12,padding:'14px 24px',fontSize:15,fontWeight:700,color:'#fff',cursor:'pointer',width:'100%',boxShadow:'0 4px 20px rgba(123,94,167,.3)'}}>
          Próxima pergunta →
        </button>
      )}
      {onBack&&(
        <button onClick={onBack} className="nn ghb" style={{background:'transparent',border:'1px solid rgba(123,94,167,.2)',color:'#9892C4',fontSize:12,cursor:'pointer',padding:'8px 16px',marginTop:12,borderRadius:8,display:'block'}} aria-label="Voltar para pergunta anterior">
          ← Voltar
        </button>
      )}
    </div>
  )
}

function MilestonePartialRadar({scores}){
  const partialMax={D:7,H:6,I:6}
  const pct=(dim)=>{
    const max=partialMax[dim]
    const sc=Math.min(scores[dim]||0,max)
    return Math.min(100,Math.round((sc/max)*100))
  }
  const rd=[
    {dim:'Desatenção',val:pct('D')},
    {dim:'Hiperativ.',val:pct('H')},
    {dim:'Impulsiv.',val:pct('I')},
    {dim:'🔒 Autoreg.',val:10},
    {dim:'🔒 Emocional',val:10}
  ]
  return(
    <div style={{marginBottom:14}}>
      <div style={{position:'relative'}}>
        <ResponsiveContainer width="100%" height={210}>
          <RadarChart data={rd} cx="50%" cy="50%" outerRadius="68%">
            <PolarGrid stroke="rgba(33,201,208,.28)"/>
            <PolarAngleAxis dataKey="dim" tick={{fill:'#9892C4',fontSize:10,fontFamily:'inherit'}}/>
            <PolarRadiusAxis domain={[0,100]} tick={false} axisLine={false}/>
            <Radar name="parcial" dataKey="val" stroke="#21C9D0" fill="#21C9D0" fillOpacity={.30} strokeWidth={2}/>
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="nn" style={{fontSize:11,color:'#897FC0',textAlign:'center',marginTop:4,lineHeight:1.4}}>
        🔒 Autorregulação e Emocional desbloqueadas após Q15
      </p>
    </div>
  )
}

function MilestoneCard({num,scores,onCont,xpGained}){
  const mCfg=[
    {color:'#8B5CF6',title:'Traço detectado!',sub:'Suas primeiras 5 respostas revelam um padrão claro.',body:'Seu cérebro processa o mundo de uma forma bem específica. Continue para revelar o quadro completo.',btnTxt:'Continuar (10 perguntas) →',xtra:null},
    {color:'#21C9D0',title:'Perfil em formação!',sub:'Amostra parcial de 3 dimensões — faltam 5 perguntas para completar.',body:null,btnTxt:'Desbloquear meu perfil →',xtra:'preview'},
    {color:'#F0B429',title:'Quiz completo!',sub:'Analisando seu perfil único...',body:'Todas as 15 perguntas respondidas. Preparando sua análise.',btnTxt:null,xtra:null},
  ]
  const m=mCfg[num-1]
  const xpLabel=num===3?`+${xpGained||50} XP · PERFIL COMPLETO!`:`+${xpGained||25} XP · Marco Desbloqueado!`
  return(
    <div style={{background:'#0A0818',minHeight:560,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px 20px',position:'relative',overflow:'hidden'}}>
      <Confetti on={true}/>
      <div className="bi" style={{background:'#120F2D',border:`1px solid ${m.color}38`,borderRadius:20,padding:'28px 24px',maxWidth:360,width:'100%',textAlign:'center',boxShadow:`0 0 60px ${m.color}14`,position:'relative',zIndex:6}}>
        <div className="nn" style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(240,180,41,.15)',border:'1px solid rgba(240,180,41,.4)',borderRadius:99,padding:'4px 14px',marginBottom:18,fontSize:12,color:'#F0B429',fontWeight:600}}>
          {xpLabel}
        </div>
        <div style={{fontSize:40,marginBottom:12,animation:'dpulse 2s ease-in-out infinite'}}>
          {num===1?'🧠':num===2?'⚡':'✦'}
        </div>
        <h3 className="sq" style={{fontSize:22,fontWeight:800,color:'#D8D2F0',marginBottom:6}}>{m.title}</h3>
        <p className="nn" style={{fontSize:14,color:'#897FC0',marginBottom:18,lineHeight:1.55}}>{m.sub}</p>
        {m.xtra==='preview'&&<MilestonePartialRadar scores={scores}/>}
        {m.body&&<p className="nn" style={{fontSize:13,color:'#7B73B8',marginBottom:20,lineHeight:1.5}}>{m.body}</p>}
        {m.btnTxt&&(
          <button className="gb sq" onClick={onCont} style={{background:`linear-gradient(135deg,${m.color},${m.color}CC)`,border:'none',borderRadius:12,padding:'13px 24px',fontSize:15,fontWeight:700,color:num===2?'#0A0818':'#fff',cursor:'pointer',width:'100%',boxShadow:`0 4px 20px ${m.color}38`}}>
            {m.btnTxt}
          </button>
        )}
      </div>
    </div>
  )
}

function Processing({onDone}){
  const [step,setStep]=useState(0)
  const msgs=['Cruzando suas respostas com 6 padrões de funcionamento...','Mapeando suas 5 dimensões de atenção...','Identificando seu padrão dominante...','Seu perfil está pronto.']
  useEffect(()=>{
    const ts=msgs.map((_,i)=>setTimeout(()=>setStep(i),i*1050))
    const done=setTimeout(onDone,msgs.length*1050+400)
    return()=>{ts.forEach(clearTimeout);clearTimeout(done)}
  },[])
  return(
    <div style={{background:'#0A0818',minHeight:580,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'28px 20px'}}>
      <div style={{position:'relative',width:90,height:90,marginBottom:36}}>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'2px solid rgba(123,94,167,.22)'}}/>
        <div style={{position:'absolute',inset:0,borderRadius:'50%',border:'2.5px solid transparent',borderTopColor:'#7B5EA7',borderRightColor:'#21C9D0',animation:'spin 1.5s linear infinite'}}/>
        <div style={{position:'absolute',inset:16,borderRadius:'50%',border:'2px solid transparent',borderTopColor:'#F0B429',animation:'spinRev 2s linear infinite'}}/>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28}}>🧠</div>
      </div>
      <div style={{maxWidth:340,width:'100%',textAlign:'center'}}>
        {msgs.map((msg,i)=>(
          <div key={i} className="nn" style={{fontSize:14,color:i===step?'#D8D2F0':i<step?'#7B73B8':'transparent',marginBottom:11,lineHeight:1.5,transition:'all .35s',fontWeight:i===step?600:400,transform:i===step?'translateY(0)':'translateY(4px)'}}>
            {i<=step?(i<step?'✓ ':'⟳ '):''}{msg}
          </div>
        ))}
      </div>
      <div style={{width:260,height:4,background:'rgba(37,30,92,.7)',borderRadius:99,marginTop:28,overflow:'hidden'}}>
        <div className="pbar" style={{height:'100%',borderRadius:99,width:`${Math.min(((step+1)/msgs.length)*100,95)}%`,transition:'width .95s ease-out'}}/>
      </div>
    </div>
  )
}

function Result({arc,scores,xp,onReset}){
  const [ds,setDs]=useState({D:0,H:0,I:0,A:0,E:0})
  const [vis,setVis]=useState(false)
  useEffect(()=>{
    setTimeout(()=>setVis(true),80)
    let p=0
    const iv=setInterval(()=>{
      p=Math.min(p+.038,1)
      setDs({D:scores.D*p,H:scores.H*p,I:scores.I*p,A:scores.A*p,E:scores.E*p})
      if(p>=1)clearInterval(iv)
    },28)
    return()=>clearInterval(iv)
  },[])
  const rd=[
    {dim:'Desatenção',val:Math.min(100,Math.round((ds.D/DIM_MAX.D)*100)),full:100},
    {dim:'Hiperativ.',val:Math.min(100,Math.round((ds.H/DIM_MAX.H)*100)),full:100},
    {dim:'Impulsiv.',val:Math.min(100,Math.round((ds.I/DIM_MAX.I)*100)),full:100},
    {dim:'Autoreg.',val:Math.min(100,Math.round((ds.A/DIM_MAX.A)*100)),full:100},
    {dim:'Emocional',val:Math.min(100,Math.round((ds.E/DIM_MAX.E)*100)),full:100},
  ]
  const co=arc.color
  const isLowSeverity=!!arc.lowSeverity
  const bridgeText=isLowSeverity?LOW_SEVERITY_BRIDGE:arc.bridge
  const coRgb=arc.coRgb||'34,211,238'
  const scrollToCta=()=>{
    if(typeof document==='undefined')return
    const el=document.getElementById('result-cta')
    if(el)el.scrollIntoView({behavior:prefersReducedMotion()?'auto':'smooth',block:'center'})
  }
  return(
    <div style={{background:'#0A0818',paddingBottom:52,opacity:vis?1:0,transition:'opacity .45s'}}>
      <div style={{background:`linear-gradient(180deg,${co}14 0%,transparent 100%)`,borderBottom:`1px solid ${co}28`,padding:'36px 18px 28px',textAlign:'center'}}>
        <div className="bi mm" style={{fontSize:52,lineHeight:1,color:co,marginBottom:14,display:'block',textShadow:`0 0 36px ${co}40`}}>
          {arc.sym}
        </div>
        <h1 className="ru d1 sq" style={{fontSize:'clamp(24px,5.5vw,36px)',fontWeight:800,color:co,marginBottom:7,lineHeight:1.1}}>{arc.name}</h1>
        <p className="ru d2 nn" style={{fontSize:14,color:'#897FC0',fontStyle:'italic',marginBottom:14}}>"{arc.tag}"</p>
        <button onClick={scrollToCta} className="ghb nn" style={{background:'transparent',border:`1px solid ${co}55`,color:co,fontSize:12,padding:'7px 14px',borderRadius:99,cursor:'pointer',marginTop:2}}>
          Ver oferta agora ↓
        </button>
      </div>
      <div style={{maxWidth:540,margin:'0 auto',padding:'0 18px'}}>
        <div className="ru d3" style={{background:'#120F2D',border:`1px solid ${co}2A`,borderRadius:16,padding:'18px 12px',marginTop:22,marginBottom:22}}>
          <p className="mm" style={{fontSize:11,color:'#9892C4',marginBottom:6,textAlign:'center',letterSpacing:'.1em'}}>MAPA DO SEU PADRÃO DE ATENÇÃO</p>
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={rd} cx="50%" cy="50%" outerRadius="72%">
              <PolarGrid stroke={`${co}28`}/>
              <PolarAngleAxis dataKey="dim" tick={{fill:'#7B73B8',fontSize:11,fontFamily:'inherit'}}/>
              <PolarRadiusAxis domain={[0,100]} tick={false} axisLine={false}/>
              <Radar name="perfil" dataKey="val" stroke={co} fill={co} fillOpacity={.28} strokeWidth={2}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="ru d4" style={{marginBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:13}}>
            <div style={{height:1,flex:1,background:`linear-gradient(90deg,transparent,${co}55)`}}/>
            <span className="mm" style={{fontSize:9,color:co,letterSpacing:'.12em',textTransform:'uppercase'}}>Você é assim</span>
            <div style={{height:1,flex:1,background:`linear-gradient(90deg,${co}55,transparent)`}}/>
          </div>
          {arc.reco.map((item,i)=>(
            <div key={i} className={`fi d${i+1}`} style={{display:'flex',gap:11,alignItems:'flex-start',marginBottom:11}}>
              <span style={{color:co,flexShrink:0,fontSize:15,marginTop:1}}>→</span>
              <p className="nn" style={{fontSize:14,color:'#C4BFF0',lineHeight:1.55,margin:0}}>{item}</p>
            </div>
          ))}
        </div>
        <div className="ru" style={{background:'rgba(239,68,68,.06)',border:'1px solid rgba(239,68,68,.2)',borderRadius:13,padding:'16px 15px',marginBottom:20}}>
          <p className="mm" style={{fontSize:9,color:'#F87171',letterSpacing:'.12em',marginBottom:11,textTransform:'uppercase'}}>O que isso te custa</p>
          {arc.cost.map((item,i)=>(
            <div key={i} style={{display:'flex',gap:9,marginBottom:i<arc.cost.length-1?9:0}}>
              <span style={{color:'#F87171',flexShrink:0}}>·</span>
              <p className="nn" style={{fontSize:13,color:'#C49B9B',lineHeight:1.5,margin:0}}>{item}</p>
            </div>
          ))}
        </div>
        <div className="ru" style={{background:`rgba(${coRgb},.09)`,border:`1px solid ${co}38`,borderRadius:13,padding:'16px 15px',marginBottom:22,borderLeft:`4px solid ${co}`}}>
          <p className="nn" style={{fontSize:14,color:'#C4BFF0',lineHeight:1.65,margin:0}}>{bridgeText}</p>
        </div>
        <div className="ru" style={{marginBottom:20}}>
          <h3 className="sq" style={{fontSize:16,fontWeight:800,color:'#D8D2F0',marginBottom:8,lineHeight:1.3}}>
            Planner padrão não considera o seu jeito de funcionar.
          </h3>
          <p className="nn" style={{fontSize:13,color:'#897FC0',lineHeight:1.6,marginBottom:14}}>
            Você já tentou cadernos, apps, bullet journals — e seguiram só por uns dias. Não foi falta sua. O sistema não foi pensado para esse padrão de atenção.
          </p>
          <div style={{display:'flex',flexDirection:'column',gap:7,marginBottom:18}}>
            {['✓ Entrega digital imediata — acesso em segundos','✓ Funciona no celular e no computador','✓ 7 dias de garantia — ou seu dinheiro de volta','✓ Desenvolvido com e para adultos com esse padrão'].map((item,i)=>(
              <p key={i} className="nn" style={{fontSize:13,color:'#6EE7B7',margin:0}}>{item}</p>
            ))}
          </div>
        </div>
        <Link
          id="result-cta"
          to={isLowSeverity?'/planner/manutencao':(arc.ctaUrl||`/planner/${arc.slug||'furacao'}`)}
          onClick={()=>{
            // KAN-16: CTA usa Link interno (react-router) em vez de <a target="_blank">. Mantém estado de aplicação,
            // preserva UTMs em localStorage (capturadas via captureUtmsFromLocation no início do quiz),
            // e Landing lê o cupom recém-gerado por onProcDone via getCouponSession().
            trackQuizEvent('cta_clicked',{archetypeId:arc.id||arc.name,archetypeName:arc.name,ctaPosition:'primary',destination:isLowSeverity?'/planner/manutencao':(arc.ctaUrl||'placeholder'),xpEarned:xp||0,scores,isLowSeverity})
          }}
          className="gb sq"
          style={{display:'block',background:'linear-gradient(135deg,#F0B429,#F97316)',border:'none',borderRadius:14,padding:'16px 24px',fontSize:15,fontWeight:700,color:'#0A0818',cursor:'pointer',width:'100%',boxShadow:'0 4px 22px rgba(240,180,41,.3)',marginBottom:10,textDecoration:'none',textAlign:'center',boxSizing:'border-box'}}
        >
          Quero meu Planner {arc.name} →
        </Link>
        <p className="nn" style={{fontSize:13,color:'#9892C4',textAlign:'center',lineHeight:1.55,padding:'0 8px',marginBottom:14}}>
          Este é um questionário de autoconhecimento sobre padrões de atenção. Não é uma ferramenta clínica e não substitui avaliação por psicólogo, psiquiatra ou neurologista.
        </p>
        <button className="ghb nn" onClick={onReset} style={{background:'transparent',border:'1px solid #251E5C',borderRadius:12,padding:'11px',fontSize:13,color:'#9892C4',cursor:'pointer',width:'100%'}}>
          Refazer o quiz
        </button>
        {typeof navigator!=='undefined'&&navigator.share&&(
          <button
            className="ghb nn"
            onClick={async()=>{
              trackQuizEvent('share_clicked',{archetypeId:arc.id||arc.name,archetypeName:arc.name})
              const shareUrl=typeof window!=='undefined'?`${window.location.origin}${window.location.pathname}`:''
              try{await navigator.share({title:`Meu padrão de atenção: ${arc.name}`,text:`${arc.tag} — Descubra o seu padrão.`,url:shareUrl})}catch(_){}
            }}
            style={{background:'transparent',border:'1px solid #251E5C',borderRadius:12,padding:'11px',fontSize:13,color:'#9892C4',cursor:'pointer',width:'100%',marginTop:8}}
          >
            Compartilhar meu perfil
          </button>
        )}
      </div>
    </div>
  )
}

export default function Quiz(){
  const [scr,setScr]=useState('landing')
  const [qi,setQi]=useState(0)
  const [sel,setSel]=useState(null)
  const [showV,setShowV]=useState(false)
  const [showN,setShowN]=useState(false)
  const [mile,setMile]=useState(null)
  const [xp,setXp]=useState(0)
  const [scores,setScores]=useState({D:0,H:0,I:0,A:0,E:0})
  const [arc,setArc]=useState(null)
  const [qk,setQk]=useState(0)
  const [fk,setFk]=useState(0)
  const [fa,setFa]=useState(0)
  const [teaser,setTeaser]=useState(null)
  const ansRef=useRef({})
  const xpDeltaRef=useRef({})
  const qStartRef=useRef(Date.now())
  const appStartRef=useRef(Date.now())
  const abandonFiredRef=useRef(false)
  const abandonTimerRef=useRef(null)
  const utmsCapturedRef=useRef(false)

  // KAN-16: capturar UTMs uma única vez ao montar o quiz. Persistem em localStorage para
  // serem propagadas para o checkout/Kiwify mesmo após navegação pelo router.
  useEffect(()=>{
    if(utmsCapturedRef.current)return
    captureUtmsFromLocation()
    utmsCapturedRef.current=true
  },[])

  useEffect(()=>{
    const fireAbandon=(reason)=>{
      if(abandonFiredRef.current)return
      if(scr==='landing'||scr==='result')return
      abandonFiredRef.current=true
      trackQuizEvent('quiz_abandoned',{lastScreen:scr,lastQuestionId:scr==='quiz'?Q[qi]?.id:null,timeSpentMs:Date.now()-appStartRef.current,reason})
    }
    const cancelPendingAbandon=()=>{
      if(abandonTimerRef.current){clearTimeout(abandonTimerRef.current);abandonTimerRef.current=null}
    }
    const handleBeforeUnload=()=>{cancelPendingAbandon();fireAbandon('beforeunload')}
    const handleVisibility=()=>{
      if(document.visibilityState==='hidden'){
        cancelPendingAbandon()
        abandonTimerRef.current=setTimeout(()=>{fireAbandon('visibility_timeout')},30000)
      } else if(document.visibilityState==='visible'){
        cancelPendingAbandon()
      }
    }
    window.addEventListener('beforeunload',handleBeforeUnload)
    document.addEventListener('visibilitychange',handleVisibility)
    return()=>{
      window.removeEventListener('beforeunload',handleBeforeUnload)
      document.removeEventListener('visibilitychange',handleVisibility)
      cancelPendingAbandon()
    }
  },[scr,qi])

  const onSel=k=>{
    if(sel)return
    setSel(k)
    setTimeout(()=>setShowV(true),400)
    setTimeout(()=>setShowN(true),1100)
  }

  const goNext=()=>{
    const teaserText=TEASERS[qi]
    if(teaserText){
      setTeaser(teaserText)
      setTimeout(()=>setTeaser(null),2200)
    }
    qStartRef.current=Date.now()
    setQi(i=>i+1)
    setSel(null)
    setShowV(false)
    setShowN(false)
    setQk(k=>k+1)
  }

  const onNext=()=>{
    const q=Q[qi]
    const prevAnswer=ansRef.current[q.id]||null
    const isReanswer=prevAnswer===sel
    const na={...ansRef.current,[q.id]:sel}
    ansRef.current=na
    const ns=calcScores(na)

    const timeSpentMs=Date.now()-qStartRef.current
    const isSpeedBonus=timeSpentMs<5000
    const isMile=[4,9,14].includes(qi)
    const mileBonus=qi===14?50:isMile?25:0
    const previousDelta=xpDeltaRef.current[q.id]||0
    const newDelta=isReanswer?previousDelta:(10+(isSpeedBonus?5:0)+mileBonus)
    xpDeltaRef.current={...xpDeltaRef.current,[q.id]:newDelta}
    const xpDiff=newDelta-previousDelta

    setScores(ns)
    if(xpDiff!==0){
      setXp(x=>Math.max(0,x+xpDiff))
    }
    if(newDelta>0&&!isReanswer){
      setFa(newDelta)
      setFk(k=>k+1)
    }

    if(!isReanswer){
      trackQuizEvent('question_answered',{questionId:q.id,dimension:q.d,answer:sel,timeSpentMs,xpDelta:newDelta,isSpeedBonus,isCorrection:prevAnswer!==null})
    }

    if(qi===4){
      trackQuizEvent('milestone_reached',{milestoneId:1,scoresPartial:ns,xpEarned:mileBonus})
      setMile(1)
    } else if(qi===9){
      trackQuizEvent('milestone_reached',{milestoneId:2,scoresPartial:ns,xpEarned:mileBonus})
      setMile(2)
    } else if (qi === 14) {
        const finalArc = findArc(ns)
        const totalXp = Object.values(xpDeltaRef.current).reduce((acc, v) => acc + v, 0)
        trackQuizEvent('milestone_reached', { milestoneId: 3, scoresPartial: ns, xpEarned: mileBonus })
        trackQuizEvent('quiz_completed', {archetypeId: finalArc?.name, scores: ns, xpEarned: totalXp })
        setMile(3)
        setTimeout(() => { setMile(null); setScr('processing') }, 2400)
      } else {
      goNext()
    }
  }

  const onMileCont=()=>{
    setMile(null)
    goNext()
  }

  const onProcDone=()=>{
    const fs=calcScores(ansRef.current)
    const foundArc=findArc(fs)
    setArc(foundArc)
    setScores(fs)
    setScr('result')
    // KAN-15: ao terminar o quiz, gerar sessão de cupom (24h timestamp-based) e persistir em localStorage.
    // Landing.jsx lê do mesmo storage e renderiza o contador real.
    const couponSession=generateCouponSession()
    trackQuizEvent('result_viewed',{archetypeId:foundArc?.name,scores:fs,couponExpiresAt:couponSession?.expiresAt||null})
  }

  const onBack=()=>{
    if(qi===0)return
    const prevQi=qi-1
    const prevQ=Q[prevQi]
    const prevAnswer=ansRef.current[prevQ.id]||null
    setQi(prevQi)
    setSel(prevAnswer)
    setShowV(!!prevAnswer)
    setShowN(!!prevAnswer)
    setQk(k=>k+1)
    qStartRef.current=Date.now()
  }

  const onReset=()=>{
    ansRef.current={}
    xpDeltaRef.current={}
    abandonFiredRef.current=false
    if(abandonTimerRef.current){clearTimeout(abandonTimerRef.current);abandonTimerRef.current=null}
    appStartRef.current=Date.now()
    qStartRef.current=Date.now()
    setScr('landing')
    setQi(0)
    setSel(null)
    setShowV(false)
    setShowN(false)
    setMile(null)
    setXp(0)
    setScores({D:0,H:0,I:0,A:0,E:0})
    setArc(null)
    setQk(0)
    setFa(0)
    setTeaser(null)
  }

  const mileXpGained=mile===3?50:25

  return(
    <div style={{background:'#0A0818',minHeight:'100vh'}}>
      <style>{CSS}</style>
      <a href="#quiz-main" className="skip-link nn">Pular para o conteúdo</a>
      <main id="quiz-main" aria-live="polite">
        {scr==='landing'&&<IntroScreen onStart={()=>{qStartRef.current=Date.now();appStartRef.current=Date.now();setScr('quiz')}}/>}
        {scr==='quiz'&&!mile&&(
          <>
            <h1 className="vh">Pergunta {Math.min(qi+1,15)} de 15 — {DIMS[Q[qi].d]}</h1>
            <Header qi={qi} xp={xp} floatK={fk} floatA={fa}/>
            <QuestionCard q={Q[qi]} qi={qi} sel={sel} onSel={onSel} showV={showV} showNext={showN} onNext={onNext} qk={qk} onBack={qi>0&&qi<14?onBack:null}/>
            {teaser&&(
              <div aria-live="polite" className="fi nn" style={{textAlign:'center',padding:'8px 18px',fontSize:12,color:'#9892C4',fontStyle:'italic'}}>
                {teaser}
              </div>
            )}
          </>
        )}
        {scr==='quiz'&&mile&&(
          <>
            <h1 className="vh">Marco {mile} desbloqueado</h1>
            <MilestoneCard num={mile} scores={scores} onCont={onMileCont} xpGained={mileXpGained}/>
          </>
        )}
        {scr==='processing'&&(
          <>
            <h1 className="vh">Analisando seu perfil</h1>
            <Processing onDone={onProcDone}/>
          </>
        )}
        {scr==='result'&&arc&&<Result arc={arc} scores={scores} xp={xp} onReset={onReset}/>}
      </main>
    </div>
  )
}
