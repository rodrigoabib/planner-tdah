import { Link } from 'react-router-dom'

// Conteúdo integral aguarda FOUNDATION-3 (KAN-9): foundation/legal/politica-privacidade.md com
// placeholders (responsável, e-mail de privacidade) preenchidos pelo humano. Até lá, esta página
// informa o usuário em linguagem honesta, sem texto meta de ticket (KAN-132 / gate L3).

const PAGE_STYLE = {
  background: '#0A0818',
  minHeight: '100vh',
  color: '#D8D2F0',
  padding: '48px 20px',
  fontFamily: "'Nunito','Segoe UI',sans-serif",
}

export default function Privacidade() {
  return (
    <div style={PAGE_STYLE}>
      <main style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, color: '#D8D2F0', marginBottom: 16 }}>
          Política de Privacidade
        </h1>
        <p style={{ fontSize: 14, color: '#9892C4', lineHeight: 1.6, marginBottom: 12 }}>
          O texto integral da Política de Privacidade — em conformidade com a LGPD (Lei 13.709/2018), com o
          canal de contato para solicitações sobre dados — será publicado nesta página antes do início das vendas.
        </p>
        <p style={{ fontSize: 14, color: '#9892C4', lineHeight: 1.6, marginBottom: 24 }}>
          O que já vale desde agora: o quiz não pede cadastro, nome ou e-mail, e o seu resultado é calculado
          no próprio navegador.
        </p>
        <Link to="/" style={{ fontSize: 13, color: '#F0B429', textDecoration: 'underline' }}>
          ← Voltar ao início
        </Link>
      </main>
    </div>
  )
}
