// Helpers de cupom QUIZ24H — gerados ao terminar o quiz, válidos por 24h reais.
// Persistidos em localStorage para sobreviver a reload, fechar/abrir aba e redirecionamento Kiwify.
// Fonte de verdade dos critérios: foundation/oferta-mvp.md §5 (cupom QUIZ24H, R$20, 24h timestamp).

const STORAGE_KEY = 'quizCouponSession'
const UTM_KEY = 'quizUtmParams'
export const COUPON_CODE = 'QUIZ24H'
export const COUPON_VALID_MS = 24 * 60 * 60 * 1000 // 24h em ms

function safeStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    return window.localStorage
  } catch (_) {
    return null
  }
}

// Cria sessão de cupom e persiste. Idempotente: se já houver sessão válida, retorna a existente.
export function generateCouponSession({ now = Date.now() } = {}) {
  const storage = safeStorage()
  const existing = getCouponSession({ now })
  if (existing && !existing.isExpired) {
    return existing
  }
  const session = {
    couponCode: COUPON_CODE,
    createdAt: now,
    expiresAt: now + COUPON_VALID_MS
  }
  if (storage) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(session))
    } catch (_) {
      // localStorage cheio ou bloqueado — segue em memória
    }
  }
  return { ...session, isExpired: false, msRemaining: COUPON_VALID_MS }
}

// Lê sessão do localStorage. Retorna null se não existir; retorna objeto com isExpired/msRemaining caso contrário.
export function getCouponSession({ now = Date.now() } = {}) {
  const storage = safeStorage()
  if (!storage) return null
  let raw
  try {
    raw = storage.getItem(STORAGE_KEY)
  } catch (_) {
    return null
  }
  if (!raw) return null
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch (_) {
    return null
  }
  if (!parsed || typeof parsed.expiresAt !== 'number') return null
  const msRemaining = parsed.expiresAt - now
  const isExpired = msRemaining <= 0
  return { ...parsed, isExpired, msRemaining: Math.max(0, msRemaining) }
}

// Remove sessão (uso futuro: ao realizar compra confirmada).
export function clearCouponSession() {
  const storage = safeStorage()
  if (!storage) return
  try {
    storage.removeItem(STORAGE_KEY)
  } catch (_) {
    // ignore
  }
}

// Formata "23h 47min 12s" / "47min 12s" / "12s".
export function formatTimeRemaining(msRemaining) {
  if (msRemaining <= 0) return '0s'
  const totalSeconds = Math.floor(msRemaining / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, '0')}min ${String(seconds).padStart(2, '0')}s`
  if (minutes > 0) return `${minutes}min ${String(seconds).padStart(2, '0')}s`
  return `${seconds}s`
}

// Constrói URL de checkout com cupom anexado (se sessão válida) e UTMs preservadas.
export function buildCheckoutUrl(baseUrl, { session, utms } = {}) {
  if (!baseUrl) return '#'
  let url
  try {
    url = new URL(baseUrl)
  } catch (_) {
    return baseUrl
  }
  if (session && !session.isExpired && session.couponCode) {
    url.searchParams.set('coupon', session.couponCode)
  }
  if (utms && typeof utms === 'object') {
    Object.entries(utms).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v)
    })
  }
  return url.toString()
}

// Captura UTMs da URL atual e persiste. Chamar uma vez no início do quiz.
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

export function captureUtmsFromLocation() {
  if (typeof window === 'undefined') return {}
  const storage = safeStorage()
  const params = new URLSearchParams(window.location.search)
  const captured = {}
  let anyFound = false
  UTM_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) {
      captured[key] = value
      anyFound = true
    }
  })
  if (anyFound && storage) {
    try {
      storage.setItem(UTM_KEY, JSON.stringify(captured))
    } catch (_) {
      // ignore
    }
  }
  return captured
}

export function getStoredUtms() {
  const storage = safeStorage()
  if (!storage) return {}
  let raw
  try {
    raw = storage.getItem(UTM_KEY)
  } catch (_) {
    return {}
  }
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch (_) {
    return {}
  }
}
