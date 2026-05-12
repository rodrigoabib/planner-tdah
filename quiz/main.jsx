import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './quiz-tdah-v1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
