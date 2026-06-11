import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Página configurada como "redirect after purchase" no painel da Kiwify (COMMERCE-2 conecta a URL real).
// O objetivo é reduzir ansiedade pós-pagamento e dar passos claros enquanto o e-mail com o PDF não chega.

function trackEvent(name, payload = {}) {
  if (typeof window !== 'undefined' && window.quizAnalytics?.track) {
    window.quizAnalytics.track(name, payload)
  } else {
    console.log('[QuizAnalytics]', name, payload)
  }
}

const C = {
  bg: '#0A0818',
  card: '#120F2D',
  cardBorder: '#251E5C',
  textHi: '#D8D2F0',
  textMid: '#C4BFF0',
  textLow: '#9892C4',
  accent: '#F0B429',
  ok: '#6EE7B7'
}

const PAGE_STYLE = {
  background: C.bg,
  minHeight: '100vh',
  color: C.textHi,
  padding: '48px 20px',
  fontFamily: "'Nunito','Segoe UI',sans-serif"
}

const STEPS = [
  {
    title: 'Confira seu e-mail',
    body:
      'Em até 5 minutos, a Kiwify envia um e-mail com o link de download do seu Planner em PDF e do bônus "Comece em 15 minutos". O assunto começa com "Kiwify" ou "Planner TDAH".'
  },
  {
    title: 'Não achou? Verifique spam/promoções',
    body:
      'Se nada chegar em 10 minutos, dê uma olhada nas pastas de spam, promoções, anti-vírus ou em filtros automáticos do seu cliente de e-mail. Cerca de 1 em 30 caixas filtra o primeiro contato.'
  },
  {
    title: 'Ainda nada? Escreve pra gente',
    body:
      'Se mesmo assim o e-mail não chegar, escreva para o suporte com o seu número de pedido. Resposta em até 24 horas úteis, com reenvio do link em minutos quando o problema for nosso.'
  }
]

export default function Obrigado() {
  const firedRef = useRef(false)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
    trackEvent('thank_you_viewed', {
      orderId: params.get('order_id') || params.get('order') || null,
      productId: params.get('product_id') || params.get('product') || null,
      utm_source: params.get('utm_source') || null,
      utm_campaign: params.get('utm_campaign') || null
    })
  }, [])

  return (
    <div style={PAGE_STYLE}>
      <main style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 56, lineHeight: 1, color: C.ok, marginBottom: 16 }} aria-hidden="true">
          ✓
        </div>
        <h1 style={{ fontFamily: "'Syne','Trebuchet MS',sans-serif", fontSize: 'clamp(26px,6vw,34px)', fontWeight: 800, color: C.textHi, marginBottom: 12, lineHeight: 1.15 }}>
          Compra confirmada
        </h1>
        <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.6, marginBottom: 28 }}>
          Obrigado pela confiança. Seu Planner TDAH foi pago com sucesso e já está a caminho do seu e-mail.
        </p>

        <section style={{ textAlign: 'left', background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 14, padding: '20px 18px', marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: C.textHi, marginBottom: 14, textAlign: 'center' }}>
            Próximos passos
          </h2>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, counterReset: 'step' }}>
            {STEPS.map((step, i) => (
              <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: i < STEPS.length - 1 ? 18 : 0 }}>
                <div
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'rgba(240,180,41,.18)',
                    border: `1px solid ${C.accent}55`,
                    color: C.accent,
                    fontFamily: "'Space Mono','Courier New',monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: C.textHi, marginBottom: 4 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 14, color: C.textLow, lineHeight: 1.55, margin: 0 }}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, color: C.textHi, marginBottom: 10 }}>
            Garantia incondicional de 7 dias
          </h2>
          <p style={{ fontSize: 14, color: C.textLow, lineHeight: 1.6, margin: 0 }}>
            Em 7 dias contados desta compra, qualquer dúvida ou insatisfação garante reembolso integral, direto pela Kiwify ou pelo nosso suporte. Sem perguntas. Detalhes em <Link to="/politica-de-reembolso" style={{ color: C.accent, textDecoration: 'underline' }}>política de reembolso</Link>.
          </p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: C.textLow, lineHeight: 1.55, margin: 0 }}>
            Suporte por e-mail · resposta em até 24 horas úteis.
            <br />
            O endereço de suporte está no e-mail de entrega da Kiwify e nos <Link to="/termos-de-uso" style={{ color: C.accent, textDecoration: 'underline' }}>Termos de Uso</Link>.
          </p>
        </section>

        <Link
          to="/"
          style={{
            display: 'inline-block',
            background: 'transparent',
            border: `1px solid ${C.cardBorder}`,
            color: C.textLow,
            padding: '11px 24px',
            borderRadius: 12,
            fontSize: 13,
            textDecoration: 'none',
            fontFamily: "'Nunito',sans-serif"
          }}
        >
          Voltar para o início
        </Link>
      </main>
    </div>
  )
}
