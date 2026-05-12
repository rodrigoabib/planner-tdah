const PLACEHOLDER_STYLE = {
  background: '#0A0818',
  minHeight: '100vh',
  color: '#D8D2F0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '32px 20px',
  fontFamily: "'Nunito','Segoe UI',sans-serif",
  textAlign: 'center',
}

export default function Obrigado() {
  return (
    <div style={PLACEHOLDER_STYLE}>
      <div style={{ maxWidth: 520, width: '100%' }}>
        <div style={{ fontSize: 12, letterSpacing: '.12em', color: '#F0B429', marginBottom: 14 }}>
          PLACEHOLDER · FUNNEL-8 (KAN-20)
        </div>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(24px,5vw,34px)', color: '#D8D2F0', marginBottom: 12 }}>
          Obrigado pela compra
        </h1>
        <p style={{ fontSize: 14, color: '#897FC0', lineHeight: 1.6 }}>
          Esta rota receberá a página de confirmação pós-checkout em FUNNEL-8 (KAN-20).
        </p>
      </div>
    </div>
  )
}
