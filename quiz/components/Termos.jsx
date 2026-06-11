import { Link } from 'react-router-dom'

// Conteúdo integral aguarda FOUNDATION-3 (KAN-9): foundation/legal/termos-de-uso.md com
// placeholders (NOME, CPF, contato) preenchidos pelo humano. Até lá, esta página informa o
// usuário em linguagem honesta, sem texto meta de ticket (KAN-132 / gate L3).

const PAGE_STYLE = {
  background: '#0A0818',
  minHeight: '100vh',
  color: '#D8D2F0',
  padding: '48px 20px',
  fontFamily: "'Nunito','Segoe UI',sans-serif",
}

export default function Termos() {
  return (
    <div style={PAGE_STYLE}>
      <main style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, color: '#D8D2F0', marginBottom: 16 }}>
          Termos de Uso
        </h1>
        <p style={{ fontSize: 14, color: '#9892C4', lineHeight: 1.6, marginBottom: 12 }}>
          O texto integral dos Termos de Uso — com a identificação completa do responsável pelo produto e os
          canais oficiais de contato — será publicado nesta página antes do início das vendas.
        </p>
        <p style={{ fontSize: 14, color: '#9892C4', lineHeight: 1.6, marginBottom: 24 }}>
          O que já vale desde agora: o Planner TDAH é um produto educacional digital (PDF). Não é uma
          ferramenta clínica e não substitui avaliação ou acompanhamento por psicólogo, psiquiatra ou
          neurologista. Toda compra tem garantia incondicional de 7 dias.
        </p>
        <Link to="/" style={{ fontSize: 13, color: '#F0B429', textDecoration: 'underline' }}>
          ← Voltar ao início
        </Link>
      </main>
    </div>
  )
}
