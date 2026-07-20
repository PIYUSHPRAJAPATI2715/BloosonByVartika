import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User as UserIcon, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'user' }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState(initialMode); // 'user' or 'admin'
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (mode === 'admin') {
        const res = await fetch(getApiUrl('/api/auth/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password, isAdminGateway: true })
        });
        const data = await res.json();
        if (data.success && data.user?.role === 'admin') {
          onAuthSuccess(data.user, data.token, true); // true for admin mode
          onClose();
        } else {
          setErrorMsg(data.message || 'Invalid admin credentials');
        }
      } else if (isRegister) {
        const res = await fetch(getApiUrl('/api/auth/register'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          onAuthSuccess(data.user, data.token, false);
          onClose();
        } else {
          setErrorMsg(data.message || 'Registration failed');
        }
      } else {
        const res = await fetch(getApiUrl('/api/auth/login'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        const data = await res.json();
        if (data.success) {
          onAuthSuccess(data.user, data.token, data.user.role === 'admin');
          onClose();
        } else {
          setErrorMsg(data.message || 'Invalid email or password');
        }
      }
    } catch (err) {
      setErrorMsg('Server connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          position: 'relative',
          border: mode === 'admin' ? '2px solid #2E2E2E' : '2px solid #C8A45D',
          overflow: 'hidden'
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: '#FFF9F6',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Auth Mode Toggle Bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#FFF9F6' }}>
          <button
            onClick={() => { setMode('user'); setErrorMsg(null); }}
            style={{
              flex: 1,
              padding: '14px',
              border: 'none',
              background: mode === 'user' ? '#FFFFFF' : 'transparent',
              color: mode === 'user' ? '#2E2E2E' : '#888',
              fontWeight: mode === 'user' ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              borderBottom: mode === 'user' ? '3px solid #C8A45D' : 'none'
            }}
          >
            🌸 Customer Sign In
          </button>
          <button
            onClick={() => { setMode('admin'); setErrorMsg(null); }}
            style={{
              flex: 1,
              padding: '14px',
              border: 'none',
              background: mode === 'admin' ? '#2E2E2E' : 'transparent',
              color: mode === 'admin' ? '#F4E8C1' : '#888',
              fontWeight: mode === 'admin' ? 700 : 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              borderBottom: mode === 'admin' ? '3px solid #C8A45D' : 'none'
            }}
          >
            🔒 Studio Admin Login
          </button>
        </div>

        <div style={{ padding: '32px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            {mode === 'admin' ? (
              <div>
                <ShieldCheck size={36} color="#C8A45D" style={{ margin: '0 auto 8px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#2E2E2E' }}>
                  Protected Admin Portal
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#666' }}>
                  Enter administrator credentials to access the studio dashboard.
                </p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#2E2E2E' }}>
                  {isRegister ? 'Create Blossom Account' : 'Welcome to Blossom'}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#666' }}>
                  {isRegister ? 'Sign up to track orders, save addresses & build hampers' : 'Sign in to access your orders and saved hampers'}
                </p>
              </div>
            )}
          </div>

          {errorMsg && (
            <div style={{ background: '#FFEBEE', color: '#C62828', padding: '10px 14px', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '16px', textAlign: 'center', border: '1px solid #FFCDD2' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {mode === 'user' && isRegister && (
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E', display: 'block', marginBottom: '4px' }}>Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <input type="text" required placeholder="Radhika Mehta" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '12px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }} />
                  <UserIcon size={16} color="#999" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E', display: 'block', marginBottom: '4px' }}>
                {mode === 'admin' ? 'Admin Email *' : 'Email Address *'}
              </label>
              <div style={{ position: 'relative' }}>
                <input type="email" required placeholder={mode === 'admin' ? 'admin@blossombyvartika.com' : 'radhika@example.com'} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '12px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }} />
                <Mail size={16} color="#999" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {mode === 'user' && isRegister && (
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E', display: 'block', marginBottom: '4px' }}>Phone / WhatsApp *</label>
                <div style={{ position: 'relative' }}>
                  <input type="tel" required placeholder="+91 98290 00000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '12px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }} />
                  <Phone size={16} color="#999" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E', display: 'block', marginBottom: '4px' }}>Password *</label>
              <div style={{ position: 'relative' }}>
                <input type="password" required placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={{ width: '100%', padding: '10px 14px 10px 38px', borderRadius: '12px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }} />
                <Lock size={16} color="#999" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={mode === 'admin' ? 'btn-gold' : 'btn-blush'} 
              style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px' }}
            >
              <span>{loading ? 'Authenticating...' : mode === 'admin' ? 'Authenticate Admin Portal' : isRegister ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {mode === 'user' && (
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.82rem', color: '#666' }}>
              {isRegister ? (
                <span>Already have an account? <button onClick={() => setIsRegister(false)} style={{ background: 'none', border: 'none', color: '#C8A45D', fontWeight: 700, cursor: 'pointer' }}>Sign In</button></span>
              ) : (
                <span>Don't have an account? <button onClick={() => setIsRegister(true)} style={{ background: 'none', border: 'none', color: '#C98BA2', fontWeight: 700, cursor: 'pointer' }}>Sign Up</button></span>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
