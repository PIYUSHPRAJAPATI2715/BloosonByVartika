import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', background: '#FFF9F6', color: '#2E2E2E', textAlign: 'center' }}>
          <img src="/logo.png" alt="Blossom Logo" style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid #C8A45D', marginBottom: '16px' }} />
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', color: '#2E2E2E', fontSize: '1.8rem', marginBottom: '8px' }}>
            Blossom by Vartika
          </h2>
          <p style={{ color: '#666', maxWidth: '460px', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.6 }}>
            A rendering update occurred in the storefront components.
          </p>
          {this.state.error && (
            <div style={{ background: '#FFF0F0', border: '1px solid #FFC0C0', padding: '14px 20px', borderRadius: '12px', marginBottom: '20px', maxWidth: '600px', width: '100%', textAlign: 'left', overflowX: 'auto' }}>
              <strong style={{ color: '#D32F2F', fontSize: '0.85rem' }}>Debug Trace:</strong>
              <pre style={{ color: '#B71C1C', fontSize: '0.78rem', margin: '6px 0 0 0', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {this.state.error.stack || this.state.error.message || String(this.state.error)}
              </pre>
            </div>
          )}
          <button 
            onClick={() => {
              this.setState({ hasError: false, error: null });
            }}
            className="btn-gold"
            style={{ padding: '12px 28px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}
          >
            🌸 Refresh Storefront
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
