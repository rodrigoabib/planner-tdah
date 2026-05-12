import { useEffect, useState } from 'react'
import { formatTimeRemaining } from '../coupon.js'

const STYLE = {
  wrap: {
    background: 'rgba(240,180,41,.10)',
    border: '1px solid rgba(240,180,41,.45)',
    borderRadius: 10,
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    fontFamily: "'Nunito','Segoe UI',sans-serif"
  },
  label: { fontSize: 12, color: '#FCD34D', letterSpacing: '.04em' },
  time: { fontFamily: "'Space Mono','Courier New',monospace", fontSize: 16, fontWeight: 700, color: '#F0B429', whiteSpace: 'nowrap' }
}

// Mostra contagem regressiva real baseada em session.expiresAt.
// Recalcula a cada segundo a partir de Date.now() — não acumula erro de drift.
export default function CouponCountdown({ session, ariaLabel = 'Tempo restante do cupom' }) {
  const [msRemaining, setMsRemaining] = useState(() => session?.msRemaining ?? 0)

  useEffect(() => {
    if (!session || session.isExpired) return
    const recompute = () => setMsRemaining(Math.max(0, session.expiresAt - Date.now()))
    recompute()
    const id = setInterval(recompute, 1000)
    return () => clearInterval(id)
  }, [session])

  if (!session || session.isExpired || msRemaining <= 0) return null

  return (
    <div style={STYLE.wrap} aria-label={ariaLabel} role="timer" aria-live="off">
      <span style={STYLE.label}>Cupom {session.couponCode} expira em</span>
      <span style={STYLE.time}>{formatTimeRemaining(msRemaining)}</span>
    </div>
  )
}
