import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import posthog from 'posthog-js'
import Quiz from './components/Quiz.jsx'
import Landing from './components/Landing.jsx'
import Obrigado from './components/Obrigado.jsx'
import Termos from './components/Termos.jsx'
import Privacidade from './components/Privacidade.jsx'
import Reembolso from './components/Reembolso.jsx'
import { captureUtmsFromLocation, getStoredUtms } from './coupon.js'

// KAN-47 (DATA-3): captura UTMs do início do funil antes do React montar.
// Necessário para deep link em /planner/:slug também ter UTMs nos eventos.
// captureUtmsFromLocation é idempotente — Quiz.jsx também chama no mount sem efeito colateral.
if (typeof window !== 'undefined') {
  captureUtmsFromLocation()
}

// KAN-45 (DATA-1) + KAN-46 (DATA-2): inicializa PostHog (no-op se VITE_POSTHOG_KEY ausente em dev)
// e pluga window.quizAnalytics.track ao posthog.capture com enriquecimento de payload.
const SESSION_KEY = 'quizSessionId'
const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'

function generateSessionId() {
  if (typeof window !== 'undefined') {
    try {
      if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID()
      }
    } catch (_) {}
  }
  // Fallback pseudo-UUIDv4 (não-criptográfico, suficiente para id de sessão).
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

function getOrCreateSessionId() {
  if (typeof window === 'undefined' || !window.localStorage) return generateSessionId()
  try {
    const existing = window.localStorage.getItem(SESSION_KEY)
    if (existing) return existing
    const fresh = generateSessionId()
    window.localStorage.setItem(SESSION_KEY, fresh)
    return fresh
  } catch (_) {
    return generateSessionId()
  }
}

const sessionId = getOrCreateSessionId()

let posthogReady = false
if (POSTHOG_KEY) {
  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
      persistence: 'localStorage+cookie',
      disable_session_recording: true,
      loaded: (ph) => {
        try { ph.identify(sessionId) } catch (_) {}
      }
    })
    posthogReady = true
  } catch (err) {
    if (typeof console !== 'undefined') {
      console.warn('[posthog init falhou]', err)
    }
  }
}

function viewportPayload() {
  if (typeof window === 'undefined') return { viewportWidth: 0, viewportHeight: 0 }
  return {
    viewportWidth: window.innerWidth || 0,
    viewportHeight: window.innerHeight || 0
  }
}

if (typeof window !== 'undefined') {
  window.quizAnalytics = {
    sessionId,
    posthogReady,
    track(eventName, payload = {}) {
      const enriched = {
        ...payload,
        sessionId,
        ...getStoredUtms(),
        ...viewportPayload()
      }
      if (posthogReady) {
        try { posthog.capture(eventName, enriched) } catch (_) {}
      } else if (typeof console !== 'undefined') {
        // Fallback dev/local: log estruturado preserva instrumentação.
        console.log('[QuizAnalytics]', eventName, enriched)
      }
    },
    identify(distinctId, props) {
      if (posthogReady) {
        try { posthog.identify(distinctId, props) } catch (_) {}
      }
    }
  }

  // KAN-45: evento de validação de boot (confirma SDK conectado / fallback ativo).
  window.quizAnalytics.track('app_boot', { source: 'main.jsx', posthogReady })
}

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
