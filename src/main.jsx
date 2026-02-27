import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error('Render error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      const e = this.state.error
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px' }}>
          <h1 style={{ color: '#c00' }}>Something went wrong</h1>
          <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto', fontSize: '12px' }}>
            {e?.message || String(e)}
          </pre>
          {e?.stack && (
            <pre style={{ background: '#fff', padding: '0.5rem', fontSize: '11px', overflow: 'auto' }}>
              {e.stack}
            </pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}

const rootEl = document.getElementById('root')
if (!rootEl) {
  document.body.innerHTML = '<p style="padding:2rem">No #root element.</p>'
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
}
