import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/index.less'
import { ThemeContextProvider } from './stores/theme'
import Router from '@/routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <Router />
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
