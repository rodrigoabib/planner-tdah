const PLACEHOLDER_STYLE = {
  background: '#0A0818',
  minHeight: '100vh',
  color: '#D8D2F0',
  padding: '48px 20px',
  fontFamily: "'Nunito','Segoe UI',sans-serif",
}

export default function Reembolso() {
  return (
    <div style={PLACEHOLDER_STYLE}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 12, letterSpacing: '.12em', color: '#F0B429', marginBottom: 14 }}>
          PLACEHOLDER · FOUNDATION-3 (KAN-9)
        </div>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, color: '#D8D2F0', marginBottom: 16 }}>
          Política de Reembolso
        </h1>
        <p style={{ fontSize: 14, color: '#897FC0', lineHeight: 1.6, marginBottom: 12 }}>
          Conteúdo aprovado em FOUNDATION-3 (KAN-9), arquivo <code style={{ color: '#C4B5FD' }}>foundation/legal/politica-reembolso.md</code>.
        </p>
        <p style={{ fontSize: 14, color: '#897FC0', lineHeight: 1.6 }}>
          Garantia incondicional de 7 dias alinhada com o art. 49 do CDC. Será renderizado nesta rota após ligação real.
        </p>
      </div>
    </div>
  )
}
