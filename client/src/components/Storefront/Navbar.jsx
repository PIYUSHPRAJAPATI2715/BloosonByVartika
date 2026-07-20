import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sparkles, Truck, User, LogOut, Lock } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenCustomOrder, 
  onOpenHamperBuilder, 
  onOpenQuiz, 
  onOpenPlanner,
  onOpenOrderTracker,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onTriggerAdminAuth
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(255, 249, 246, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200, 164, 93, 0.2)' : 'none'
      }}
    >
      {/* Top Banner Announcement */}
      <div 
        style={{
          background: 'linear-gradient(90deg, #2E2E2E 0%, #3D2D35 50%, #2E2E2E 100%)',
          color: '#F4E8C1',
          padding: '6px 16px',
          fontSize: '0.78rem',
          textAlign: 'center',
          letterSpacing: '0.5px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={12} color="#C8A45D" /> Jaipur Studio Open for Luxury Bridal Trousseau & Festival Bookings
        </span>
        <span style={{ opacity: 0.6 }}>|</span>
        <span 
          onClick={onOpenOrderTracker} 
          style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
        >
          Track Your Order
        </span>
      </div>

      {/* Main Nav Bar */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #E8B7C9 0%, #C8A45D 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(232, 183, 201, 0.5)'
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>🌸</span>
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: '700', color: '#2E2E2E', letterSpacing: '-0.3px', display: 'block', lineHeight: 1.1 }}>
              Blossom
            </span>
            <span style={{ fontFamily: 'var(--font-subserif)', fontSize: '0.78rem', letterSpacing: '2px', color: '#C8A45D', textTransform: 'uppercase', fontWeight: 600 }}>
              BY VARTIKA
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#services" style={{ textDecoration: 'none', color: '#2E2E2E', fontWeight: 500, fontSize: '0.92rem' }}>Services</a>
          <a href="#collection" style={{ textDecoration: 'none', color: '#2E2E2E', fontWeight: 500, fontSize: '0.92rem' }}>Collection</a>
          <a href="#about" style={{ textDecoration: 'none', color: '#2E2E2E', fontWeight: 500, fontSize: '0.92rem' }}>Story</a>
          
          <button 
            onClick={onOpenPlanner} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9A7734', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            💍 Trousseau Planner
          </button>
          
          <button 
            onClick={onOpenHamperBuilder} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C98BA2', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            🎁 Custom Hamper Builder
          </button>
          
          <button 
            onClick={onOpenQuiz} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2E2E2E', fontWeight: 500, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Sparkles size={14} color="#C8A45D" /> Gift Finder
          </button>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Order Tracker Icon */}
          <button 
            onClick={onOpenOrderTracker}
            title="Track Order"
            style={{ background: 'none', border: '1px solid rgba(200, 164, 93, 0.4)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#2E2E2E' }}
          >
            <Truck size={18} />
          </button>

          {/* Cart Trigger */}
          <button 
            onClick={onOpenCart}
            style={{ 
              background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)',
              border: '1px solid rgba(232, 183, 201, 0.8)', 
              borderRadius: '30px', 
              padding: '8px 18px',
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              fontWeight: 600,
              color: '#2E2E2E',
              boxShadow: '0 4px 12px rgba(232, 183, 201, 0.3)'
            }}
          >
            <ShoppingBag size={18} color="#C8A45D" />
            <span>Bag</span>
            <span style={{ background: '#C8A45D', color: '#FFFFFF', borderRadius: '50%', width: '22px', height: '22px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {cartCount}
            </span>
          </button>

          {/* User Sign In / Profile Button */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: '#FFF9F6', border: '1px solid #C8A45D', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} color="#C8A45D" />
                <span>{currentUser.name.split(' ')[0]}</span>
              </div>
              <button onClick={onLogout} title="Sign Out" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onOpenAuthModal('user')}
              style={{
                background: '#2E2E2E',
                color: '#F4E8C1',
                border: 'none',
                borderRadius: '30px',
                padding: '8px 18px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <User size={15} />
              <span>Sign In / Sign Up</span>
            </button>
          )}

          {/* Subtle Protected Admin Lock Link */}
          <button 
            onClick={onTriggerAdminAuth}
            title="Studio Admin Portal"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.2)', padding: '4px' }}
          >
            <Lock size={14} />
          </button>

        </div>
      </div>
    </header>
  );
}
