import { Link } from 'react-router-dom'

// Conteúdo integral aguarda FOUNDATION-3 (KAN-9): foundation/legal/politica-reembolso.md com
// placeholders preenchidos pelo humano. Até lá, esta página informa o usuário em linguagem
// honesta, sem texto meta de ticket (KAN-132 / gate L3).

const PAGE_STYLE = {
  background: '#0A0818',
  minHeight: '100vh',
  color: '#D8D2F0',
  padding: '48px 20px',
  fontFamily: "'Nunito','Segoe UI',sans-serif",
}

export default function Reembolso() {
  return (
    <div style={PAGE_STYLE}>
      <main style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, color: '#D8D2F0', marginBottom: 16 }}>
          Política de Reembolso
        </h1>
        <p style={{ fontSize: 14, color: '#9892C4', lineHeight: 1.6, marginBottom: 12 }}>
          Toda compra do Planner TDAH tem <strong style={{ color: '#D8D2F0' }}>garantia incondicional de 7 dias</strong>,
          alinhada ao art. 49 do Código de Defesa do Consumidor: em até 7 dias contados da compra, qualquer motivo
          garante reembolso integral, solicitado direto pela Kiwify ou pelo suporte por e-mail. Sem perguntas.
        </p>
        <p style={{ fontSize: 14, color: '#9892C4', lineHeight: 1.6, marginBottom: 24 }}>
          O texto integral da política, com o passo a passo da solicitação e os canais oficiais de contato,
          será publicado nesta página antes do início das vendas.
        </p>
        <Link to="/" style={{ fontSize: 13, color: '#F0B429', textDecoration: 'underline' }}>
          ← Voltar ao início
        </Link>
      </main>
    </div>
  )
}
