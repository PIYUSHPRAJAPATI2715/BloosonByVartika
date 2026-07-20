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
        <div style={{ padding: '40px', fontFamily: 'sans-serif', background: '#FFF9F6', color: '#2E2E2E', minHeight: '100vh' }}>
          <h2 style={{ color: '#C8A45D' }}>🌸 Blossom Studio - Notice</h2>
          <p>An application display error occurred:</p>
          <pre style={{ background: '#FFF', padding: '16px', borderRadius: '8px', border: '1px solid #E8B7C9', overflowX: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ background: '#C8A45D', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginTop: '16px', fontWeight: 'bold' }}
          >
            Reload Page
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
