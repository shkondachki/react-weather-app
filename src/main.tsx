import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/global.scss';  // Global styles imported once

import App from './App.tsx'
import {ThemeProvider} from "./context/ThemeContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
            <App />
      </ThemeProvider>
  </StrictMode>,
)
