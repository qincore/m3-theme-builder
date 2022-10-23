import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Layout from '@/layout'
import '@/index.less'
import { ThemeContextProvider } from './stores/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <Layout />
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
