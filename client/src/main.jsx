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
          <p style={{ color: '#666', maxWidth: '460px', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
            Welcome to Blossom by Vartika. Please click below to refresh the storefront.
          </p>
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
