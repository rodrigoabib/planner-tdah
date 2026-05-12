import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Quiz from './components/Quiz.jsx'
import Landing from './components/Landing.jsx'
import Obrigado from './components/Obrigado.jsx'
import Termos from './components/Termos.jsx'
import Privacidade from './components/Privacidade.jsx'
import Reembolso from './components/Reembolso.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/planner/:slug" element={<Landing />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/termos-de-uso" element={<Termos />} />
        <Route path="/politica-de-privacidade" element={<Privacidade />} />
        <Route path="/politica-de-reembolso" element={<Reembolso />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
