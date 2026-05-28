import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './login.css'
import './App.css'
import LoginPage from './Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
)
