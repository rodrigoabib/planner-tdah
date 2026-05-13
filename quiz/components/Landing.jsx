import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  SLUG_TO_ARCHETYPE,
  LOW_SEVERITY_BRIDGE,
  OFFER,
  LANDING_BENEFITS,
  FAQ
} from '../data/archetypes.js'
import { getCouponSession, buildCheckoutUrl, getStoredUtms } from '../coupon.js'
import CouponCountdown from './CouponCountdown.jsx'

// KAN-48 (DATA-4): helper de tracking unificado. Usa window.quizAnalytics.track (montado em main.jsx)
// que já enriquece com sessionId, UTMs e viewport. Fallback noop se analytics não carregou.
function trackLandingEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return
  if (window.quizAnalytics?.track) {
    window.quizAnalytics.track(eventName, payload)
  }
}

function readQuizTotalTimeMs() {
  if (typeof window === 'undefined' || !window.localStorage) return null
  try {
    const raw = window.localStorage.getItem('quizTotalTimeMs')
    if (!raw) return null
    const n = Number(raw)
    return Number.isFinite(n) && n > 0 ? n : null
  } catch (_) {
    return null
  }
}

function couponStatusOf(session) {
  if (!session) return 'none'
  return session.isExpired ? 'expired' : 'valid'
}

const LANDING_CSS = `
@import url('https://cdn.jsdelivr.net/npm/@fontsource/syne@5/index.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/nunito@5/index.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/space-mono@5/index.css');
*{box-sizing:border-box;margin:0;padding:0}
@keyframes lpFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes lpPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
.lp-sq{font-family:'Syne','Trebuchet MS',sans-serif}
.lp-nn{font-family:'Nunito','Segoe UI',sans-serif}
.lp-mm{font-family:'Space Mono','Courier New',monospace}
.lp-fade{animation:lpFade .45s ease-out both}
.lp-cta-btn{transition:all .15s;cursor:pointer;text-decoration:none}
.lp-cta-btn:hover{transform:translateY(-2px);filter:brightness(1.1)}
.lp-cta-btn:active{transform:scale(.98)}
.lp-cta-btn:focus-visible{outline:3px solid #F0B429;outline-offset:3px}
.lp-faq-item{transition:background .15s}
.lp-faq-q:focus-visible{outline:2px solid #F0B429;outline-offset:2px}
.lp-faq-q:hover{background:rgba(123,94,167,.10)}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}
}
`

const C = {
  bg: '#0A0818',
  card: '#120F2D',
  cardBorder: '#251E5C',
  textHi: '#D8D2F0',
  textMid: '#C4BFF0',
  textLow: '#9892C4',
  accent: '#F0B429',
  ok: '#6EE7B7',
  warn: '#F87171'
}

function NotFoundView() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.textHi, padding: '48px 20px', fontFamily: "'Nunito',sans-serif", textAlign: 'center' }}>
      <style>{LANDING_CSS}</style>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <h1 className="lp-sq" style={{ fontSize: 28, color: C.textHi, marginBottom: 14 }}>
          Arquétipo não encontrado
        </h1>
        <p style={{ fontSize: 15, color: C.textLow, lineHeight: 1.6, marginBottom: 24 }}>
          A URL que você acessou não corresponde a nenhum dos arquétipos cadastrados.
          Faça o quiz para descobrir o seu padrão de atenção.
        </p>
        <Link
          to="/"
          className="lp-cta-btn lp-sq"
          style={{ display: 'inline-block', background: 'linear-gradient(135deg,#F0B429,#F97316)', color: '#0A0818', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 700 }}
        >
          Fazer o quiz →
        </Link>
      </div>
    </div>
  )
}

function HeroSection({ arc, lowSeverity }) {
  const co = arc.color
  const introLine = lowSeverity
    ? 'Você completou o quiz e identificou um padrão de manutenção — versão sutil do Camaleão Exausto.'
    : `Você completou o quiz e descobriu que é ${arc.name}.`
  return (
    <section
      className="lp-fade"
      style={{
        background: `linear-gradient(180deg,${co}1A 0%,${C.bg} 100%)`,
        borderBottom: `1px solid ${co}3A`,
        padding: '44px 20px 32px',
        textAlign: 'center'
      }}
    >
      <div className="lp-mm" style={{ fontSize: 56, lineHeight: 1, color: co, marginBottom: 14, textShadow: `0 0 36px ${co}55` }}>
        {arc.sym}
      </div>
      <h1 className="lp-sq" style={{ fontSize: 'clamp(26px,6vw,38px)', fontWeight: 800, color: co, marginBottom: 8, lineHeight: 1.1 }}>
        {arc.name}
      </h1>
      <p className="lp-nn" style={{ fontSize: 15, color: C.textMid, fontStyle: 'italic', marginBottom: 18, lineHeight: 1.4 }}>
        "{arc.tag}"
      </p>
      <p className="lp-nn" style={{ fontSize: 14, color: C.textLow, lineHeight: 1.55, maxWidth: 440, margin: '0 auto' }}>
        {introLine}
      </p>
    </section>
  )
}

function YouAreLikeSection({ arc }) {
  const co = arc.color
  return (
    <section className="lp-fade" style={{ padding: '36px 20px 24px', maxWidth: 620, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span aria-hidden="true" style={{ height: 1, flex: 1, background: `linear-gradient(90deg,transparent,${co}66)` }} />
        <span className="lp-mm" style={{ fontSize: 10, color: co, letterSpacing: '.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Você é assim
        </span>
        <span aria-hidden="true" style={{ height: 1, flex: 1, background: `linear-gradient(90deg,${co}66,transparent)` }} />
      </div>
      {arc.reco.map((line, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
          <span aria-hidden="true" style={{ color: co, flexShrink: 0, fontSize: 16, marginTop: 1 }}>→</span>
          <p className="lp-nn" style={{ fontSize: 15, color: C.textMid, lineHeight: 1.55, margin: 0 }}>{line}</p>
        </div>
      ))}
    </section>
  )
}

function CostSection({ arc }) {
  return (
    <section className="lp-fade" style={{ padding: '0 20px 32px', maxWidth: 620, margin: '0 auto' }}>
      <div
        style={{
          background: 'rgba(248,113,113,.07)',
          border: '1px solid rgba(248,113,113,.28)',
          borderLeft: `4px solid ${C.warn}`,
          borderRadius: 12,
          padding: '18px 18px'
        }}
      >
        <p className="lp-mm" style={{ fontSize: 10, color: C.warn, letterSpacing: '.14em', marginBottom: 12, textTransform: 'uppercase' }}>
          O que isso te custa hoje
        </p>
        {arc.cost.map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < arc.cost.length - 1 ? 10 : 0 }}>
            <span aria-hidden="true" style={{ color: C.warn, flexShrink: 0 }}>·</span>
            <p className="lp-nn" style={{ fontSize: 14, color: '#E4A8A8', lineHeight: 1.55, margin: 0 }}>{line}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProposalSection({ arc, lowSeverity }) {
  const co = arc.color
  const bridge = lowSeverity ? LOW_SEVERITY_BRIDGE : arc.bridge
  return (
    <section className="lp-fade" style={{ padding: '0 20px 36px', maxWidth: 620, margin: '0 auto' }}>
      <h2 className="lp-sq" style={{ fontSize: 'clamp(20px,5vw,26px)', fontWeight: 800, color: C.textHi, marginBottom: 12, lineHeight: 1.25 }}>
        Planner padrão não foi pensado para o seu jeito de funcionar.
      </h2>
      <p className="lp-nn" style={{ fontSize: 15, color: C.textLow, lineHeight: 1.65, marginBottom: 18 }}>
        Você já tentou cadernos, apps e bullet journals — e seguiram só por uns dias. Não foi falta de disciplina sua. O sistema não foi desenhado para esse padrão de atenção.
      </p>
      <div
        style={{
          background: `rgba(${arc.coRgb},.10)`,
          border: `1px solid ${co}40`,
          borderLeft: `4px solid ${co}`,
          borderRadius: 12,
          padding: '18px 18px'
        }}
      >
        <p className="lp-nn" style={{ fontSize: 15, color: C.textMid, lineHeight: 1.65, margin: 0 }}>
          {bridge}
        </p>
      </div>
    </section>
  )
}

function BenefitsSection({ arc }) {
  return (
    <section className="lp-fade" style={{ padding: '0 20px 36px', maxWidth: 620, margin: '0 auto' }}>
      <h2 className="lp-sq" style={{ fontSize: 'clamp(18px,4.5vw,22px)', fontWeight: 800, color: C.textHi, marginBottom: 16 }}>
        O que vem no Planner {arc.name}
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {LANDING_BENEFITS.map((b, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
            <span aria-hidden="true" style={{ color: C.ok, flexShrink: 0, fontSize: 15, marginTop: 1 }}>✓</span>
            <p className="lp-nn" style={{ fontSize: 14, color: C.textMid, lineHeight: 1.55, margin: 0 }}>{b}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function GuaranteeSection() {
  return (
    <section className="lp-fade" style={{ padding: '0 20px 36px', maxWidth: 620, margin: '0 auto' }}>
      <div
        style={{
          background: 'rgba(110,231,183,.07)',
          border: '1px solid rgba(110,231,183,.32)',
          borderRadius: 14,
          padding: '20px 20px',
          textAlign: 'center'
        }}
      >
        <div className="lp-mm" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(110,231,183,.14)', border: '1px solid rgba(110,231,183,.5)', borderRadius: 99, padding: '5px 14px', fontSize: 11, color: C.ok, letterSpacing: '.1em', marginBottom: 12 }}>
          ✓ GARANTIA INCONDICIONAL
        </div>
        <h3 className="lp-sq" style={{ fontSize: 18, fontWeight: 800, color: C.textHi, marginBottom: 8 }}>
          {OFFER.warrantyDays} dias para experimentar sem risco
        </h3>
        <p className="lp-nn" style={{ fontSize: 14, color: C.textLow, lineHeight: 1.55, margin: 0 }}>
          Se em {OFFER.warrantyDays} dias o planner não fizer sentido para você, devolvemos o valor integral.
          Sem perguntas, sem tentar te convencer a ficar. Solicitação direto no painel da {OFFER.platform} ou por e-mail.
        </p>
      </div>
    </section>
  )
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = (i) => setOpenIndex((cur) => (cur === i ? null : i))
  return (
    <section className="lp-fade" style={{ padding: '8px 20px 36px', maxWidth: 620, margin: '0 auto' }}>
      <h2 className="lp-sq" style={{ fontSize: 'clamp(18px,4.5vw,22px)', fontWeight: 800, color: C.textHi, marginBottom: 14, textAlign: 'center' }}>
        Perguntas frequentes
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FAQ.map((item, i) => {
          const isOpen = openIndex === i
          const itemId = `faq-${i}`
          const panelId = `faq-panel-${i}`
          return (
            <div key={i} className="lp-faq-item" style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, overflow: 'hidden' }}>
              <button
                id={itemId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="lp-faq-q lp-nn"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: C.textHi,
                  fontSize: 14,
                  fontWeight: 600,
                  padding: '14px 16px',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  lineHeight: 1.4
                }}
              >
                <span>{item.q}</span>
                <span aria-hidden="true" style={{ color: C.accent, fontSize: 18, lineHeight: 1, transition: 'transform .15s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
                  +
                </span>
              </button>
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={itemId}
                  className="lp-nn"
                  style={{ padding: '0 16px 16px', fontSize: 14, color: C.textLow, lineHeight: 1.6, borderTop: `1px solid ${C.cardBorder}` }}
                >
                  <p style={{ marginTop: 12, margin: '12px 0 0 0' }}>{item.a}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

function CtaSection({ arc, session, utms, onCtaClick }) {
  const co = arc.color
  const couponActive = session && !session.isExpired
  const expired = session && session.isExpired
  const displayPrice = couponActive ? OFFER.priceCoupon : OFFER.priceFull
  const checkoutUrl = buildCheckoutUrl(OFFER.kiwifyCheckoutPlaceholder, { session, utms })
  return (
    <section className="lp-fade" style={{ padding: '8px 20px 32px', maxWidth: 620, margin: '0 auto' }}>
      <div
        style={{
          background: C.card,
          border: `1px solid ${co}40`,
          borderRadius: 16,
          padding: '24px 20px',
          textAlign: 'center'
        }}
      >
        <div className="lp-mm" style={{ fontSize: 11, color: C.textLow, letterSpacing: '.12em', marginBottom: 10, textTransform: 'uppercase' }}>
          Investimento único
        </div>
        <div style={{ marginBottom: 12 }}>
          {couponActive && (
            <span className="lp-mm" style={{ fontSize: 13, color: C.textLow, textDecoration: 'line-through', marginRight: 10 }}>
              {OFFER.priceFull}
            </span>
          )}
          <span className="lp-sq" style={{ fontSize: 'clamp(32px,8vw,44px)', fontWeight: 800, color: C.accent, lineHeight: 1 }}>
            {displayPrice}
          </span>
        </div>
        {couponActive && (
          <div style={{ marginBottom: 14 }}>
            <CouponCountdown session={session} />
            <p className="lp-nn" style={{ fontSize: 13, color: C.textLow, marginTop: 10, lineHeight: 1.5 }}>
              Cupom <strong style={{ color: C.textHi }}>{OFFER.couponCode}</strong> de {OFFER.couponDiscount} aplicado automaticamente no checkout.
            </p>
          </div>
        )}
        {expired && (
          <p className="lp-nn" role="status" style={{ fontSize: 13, color: C.textLow, marginBottom: 14, lineHeight: 1.5 }}>
            <strong style={{ color: '#F87171' }}>Oferta com cupom expirou.</strong> Preço cheio aplicado automaticamente no checkout.
          </p>
        )}
        {!session && (
          <p className="lp-nn" style={{ fontSize: 13, color: C.textLow, marginBottom: 14, lineHeight: 1.5 }}>
            Preço regular. Para liberar o cupom de R$ 20 de desconto, complete o quiz primeiro: <Link to="/" style={{ color: C.accent, textDecoration: 'underline' }}>fazer o quiz</Link>.
          </p>
        )}
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onCtaClick && onCtaClick(displayPrice)}
          className="lp-cta-btn lp-sq"
          style={{
            display: 'block',
            background: 'linear-gradient(135deg,#F0B429,#F97316)',
            border: 'none',
            borderRadius: 14,
            padding: '16px 20px',
            fontSize: 16,
            fontWeight: 700,
            color: C.bg,
            width: '100%',
            boxShadow: '0 4px 22px rgba(240,180,41,.30)',
            marginBottom: 12,
            textAlign: 'center'
          }}
        >
          Quero meu Planner {arc.name} →
        </a>
        <p className="lp-nn" style={{ fontSize: 12, color: C.textLow, lineHeight: 1.5, margin: 0 }}>
          Pagamento seguro via {OFFER.platform} · {OFFER.deliveryFormat}
        </p>
      </div>
    </section>
  )
}

function DisclaimerSection() {
  return (
    <section style={{ padding: '0 20px 48px', maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
      <p className="lp-nn" style={{ fontSize: 13, color: C.textLow, lineHeight: 1.6, margin: 0 }}>
        Este planner é um material educacional baseado em padrões de atenção autodeclarados.
        Não é uma ferramenta clínica e não substitui avaliação por psicólogo, psiquiatra ou neurologista.
      </p>
      <nav aria-label="Legal" style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
        <Link to="/termos-de-uso" className="lp-nn" style={{ fontSize: 12, color: C.textLow, textDecoration: 'underline' }}>
          Termos de Uso
        </Link>
        <Link to="/politica-de-privacidade" className="lp-nn" style={{ fontSize: 12, color: C.textLow, textDecoration: 'underline' }}>
          Privacidade
        </Link>
        <Link to="/politica-de-reembolso" className="lp-nn" style={{ fontSize: 12, color: C.textLow, textDecoration: 'underline' }}>
          Reembolso
        </Link>
      </nav>
    </section>
  )
}

export default function Landing() {
  const { slug } = useParams()
  const data = SLUG_TO_ARCHETYPE[slug]
  const [session, setSession] = useState(() => (typeof window === 'undefined' ? null : getCouponSession()))
  const [utms] = useState(() => (typeof window === 'undefined' ? {} : getStoredUtms()))

  // KAN-48 (DATA-4): mount timestamp para calcular timeOnLandingMs em eventos posteriores.
  const mountedAtRef = useRef(typeof window === 'undefined' ? 0 : Date.now())
  // Guards para garantir disparos únicos (apenas uma vez por sessão de landing).
  const lpViewedRef = useRef(false)
  const scroll50Ref = useRef(false)
  const scroll100Ref = useRef(false)
  const couponExpiredFiredRef = useRef(false)

  // Re-checa a sessão se a janela voltar do background (caso o cupom tenha expirado enquanto inativo).
  useEffect(() => {
    if (typeof document === 'undefined') return
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setSession(getCouponSession())
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // KAN-48: lp_viewed na primeira renderização válida (arquétipo encontrado).
  useEffect(() => {
    if (!data) return
    if (lpViewedRef.current) return
    lpViewedRef.current = true
    trackLandingEvent('lp_viewed', {
      archetypeSlug: slug,
      couponStatus: couponStatusOf(session),
      timeOnQuiz: readQuizTotalTimeMs()
    })
  }, [data, slug, session])

  // KAN-48: scroll percentage (50% e 100%) — dispara uma vez cada.
  useEffect(() => {
    if (!data) return
    if (typeof window === 'undefined') return
    const onScroll = () => {
      const docHeight = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0
      )
      if (docHeight <= 0) return
      const scrolled = (window.scrollY + window.innerHeight) / docHeight
      if (!scroll50Ref.current && scrolled >= 0.5) {
        scroll50Ref.current = true
        trackLandingEvent('lp_scrolled_50', { archetypeSlug: slug })
      }
      if (!scroll100Ref.current && scrolled >= 0.95) {
        scroll100Ref.current = true
        trackLandingEvent('lp_scrolled_100', {
          archetypeSlug: slug,
          timeOnLandingMs: Date.now() - mountedAtRef.current
        })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [data, slug])

  // KAN-48: lp_coupon_expired — dispara uma única vez quando o cupom expira durante a visita.
  useEffect(() => {
    if (!data) return
    if (couponExpiredFiredRef.current) return
    if (!session) return
    // Se já chegou expirado ao montar, não disparamos (não expirou "enquanto estava na landing").
    if (session.isExpired) {
      couponExpiredFiredRef.current = true
      return
    }
    const id = setInterval(() => {
      const current = getCouponSession()
      if (current && current.isExpired && !couponExpiredFiredRef.current) {
        couponExpiredFiredRef.current = true
        trackLandingEvent('lp_coupon_expired', {
          archetypeSlug: slug,
          timeOnLandingMs: Date.now() - mountedAtRef.current
        })
        setSession(current)
        clearInterval(id)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [data, session, slug])

  if (!data) {
    return <NotFoundView />
  }

  const { arc, lowSeverity } = data

  const handleCtaClick = (priceShown) => {
    trackLandingEvent('lp_cta_clicked', {
      archetypeSlug: slug,
      couponStatus: couponStatusOf(session),
      priceShown,
      timeOnLandingMs: Date.now() - mountedAtRef.current
    })
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <style>{LANDING_CSS}</style>
      <a
        href="#lp-main"
        style={{ position: 'absolute', left: '-9999px', top: 8, background: C.accent, color: C.bg, padding: '8px 16px', borderRadius: 8, fontFamily: "'Nunito',sans-serif", fontWeight: 700, fontSize: 13, zIndex: 100 }}
        onFocus={(e) => { e.currentTarget.style.left = '12px' }}
        onBlur={(e) => { e.currentTarget.style.left = '-9999px' }}
      >
        Pular para o conteúdo
      </a>
      <main id="lp-main">
        <HeroSection arc={arc} lowSeverity={lowSeverity} />
        <YouAreLikeSection arc={arc} />
        <CostSection arc={arc} />
        <ProposalSection arc={arc} lowSeverity={lowSeverity} />
        <BenefitsSection arc={arc} />
        <GuaranteeSection />
        {/* Seção 7 (prova social) intencionalmente omitida na v1 — FOUNDATION-2 §3 proíbe placeholders/depoimentos não-reais. */}
        <FaqAccordion />
        <CtaSection arc={arc} session={session} utms={utms} onCtaClick={handleCtaClick} />
        <DisclaimerSection />
      </main>
    </div>
  )
}
