import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { ViewProvider } from './contexts/ViewContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <ViewProvider>
        <App />
      </ViewProvider>
    </LanguageProvider>
  </React.StrictMode>,
)