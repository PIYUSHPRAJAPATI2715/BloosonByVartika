import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Truck, User, LogOut, Lock, Gift, Compass, Menu, X, Crown, Search } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onOpenCart, 
  onOpenCustomOrder, 
  onOpenHamperBuilder, 
  onOpenQuiz, 
  onOpenPlanner,
  onOpenOrderTracker,
  onOpenAllProducts,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onTriggerAdminAuth
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(255, 249, 246, 0.96)' : 'rgba(255, 249, 246, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled ? '0 12px 36px rgba(200, 164, 93, 0.12)' : '0 4px 20px rgba(0,0,0,0.03)',
        borderBottom: '1px solid rgba(200, 164, 93, 0.3)'
      }}
    >
      {/* Top Banner Announcement - Compact & Mobile Optimized */}
      <div 
        style={{
          background: 'linear-gradient(90deg, #9A7734 0%, #C8A45D 35%, #F4E8C1 50%, #C8A45D 65%, #9A7734 100%)',
          color: '#1E1E1E',
          padding: '4px 12px',
          fontSize: '0.72rem',
          fontWeight: 700,
          textAlign: 'center',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} color="#1E1E1E" /> 👑 Jaipur Studio Open for Luxury Bookings
        </span>
        <span style={{ opacity: 0.5 }}>•</span>
        <span 
          onClick={onOpenOrderTracker} 
          style={{ textDecoration: 'underline', cursor: 'pointer', letterSpacing: '0.5px', fontSize: '0.7rem' }}
        >
          Track Order 🚚
        </span>
      </div>

      {/* Main Haute Couture Nav Bar */}
      <div 
        style={{ 
          maxWidth: '1360px', 
          margin: '0 auto', 
          padding: '10px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        
        {/* Left: Official Blossom By Vartika Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <img 
            src="/logo.png" 
            alt="Blossom By Vartika Logo" 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              objectFit: 'contain',
              border: '1.5px solid #C8A45D',
              boxShadow: '0 4px 12px rgba(200, 164, 93, 0.3)',
              background: '#FFFFFF',
              padding: '1px',
              flexShrink: 0
            }}
          />
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: '#2E2E2E', 
                letterSpacing: '0.2px', 
                display: 'block', 
                lineHeight: 1,
                whiteSpace: 'nowrap'
              }}
            >
              Blossom
            </span>
            <span 
              style={{ 
                fontFamily: 'var(--font-subserif)', 
                fontSize: '0.62rem', 
                letterSpacing: '1.5px', 
                color: '#9A7734', 
                textTransform: 'uppercase', 
                fontWeight: 700,
                display: 'block',
                marginTop: '2px',
                whiteSpace: 'nowrap'
              }}
            >
              BY VARTIKA • JAIPUR
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Items */}
        <nav 
          className="desktop-only-nav"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            background: 'rgba(255, 255, 255, 0.65)',
            padding: '6px 18px',
            borderRadius: '40px',
            border: '1px solid rgba(200, 164, 93, 0.25)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
          }}
        >
          <a href="#services" style={{ textDecoration: 'none', color: '#2E2E2E', fontWeight: 600, fontSize: '0.85rem' }}>Collections</a>
          <a href="#collection" style={{ textDecoration: 'none', color: '#2E2E2E', fontWeight: 600, fontSize: '0.85rem' }}>Storefront</a>
          {onOpenAllProducts && (
            <button onClick={onOpenAllProducts} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C8A45D', fontWeight: 700, fontSize: '0.85rem' }}>
              All Products
            </button>
          )}
          <button onClick={onOpenPlanner} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9A7734', fontWeight: 600, fontSize: '0.85rem' }}>
            💍 Trousseau Planner
          </button>
          <button onClick={onOpenHamperBuilder} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C98BA2', fontWeight: 600, fontSize: '0.85rem' }}>
            🎁 Custom Builder
          </button>
        </nav>

        {/* Right Actions: Bag & Mobile Menu Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          
          {/* Track Order (Desktop / Tablet) */}
          <button 
            onClick={onOpenOrderTracker}
            title="Track Order"
            className="desktop-only-nav"
            style={{ 
              background: '#FFFFFF', 
              border: '1px solid rgba(200, 164, 93, 0.4)', 
              borderRadius: '50%', 
              width: '36px', 
              height: '36px', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer', 
              color: '#2E2E2E'
            }}
          >
            <Truck size={16} color="#2E2E2E" />
          </button>

          {/* Cart Bag Button */}
          <button 
            onClick={onOpenCart}
            style={{ 
              background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)',
              border: '1.5px solid #C8A45D', 
              borderRadius: '30px', 
              padding: '6px 14px',
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.82rem',
              color: '#2E2E2E',
              boxShadow: '0 4px 12px rgba(200, 164, 93, 0.2)'
            }}
          >
            <ShoppingBag size={16} color="#9A7734" />
            <span>Bag</span>
            <span 
              style={{ 
                background: '#C8A45D', 
                color: '#FFFFFF', 
                borderRadius: '50%', 
                width: '18px', 
                height: '18px', 
                fontSize: '0.7rem', 
                fontWeight: 700,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              {cartCount}
            </span>
          </button>

          {/* User Sign In (Desktop) */}
          <div className="desktop-only-nav">
            {currentUser ? (
              <button 
                onClick={onLogout}
                style={{ background: '#2E2E2E', color: '#F4E8C1', border: '1px solid #C8A45D', padding: '6px 14px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <User size={13} color="#C8A45D" /> {currentUser.name.split(' ')[0]}
              </button>
            ) : (
              <button 
                onClick={() => onOpenAuthModal('user')}
                style={{ background: '#2E2E2E', color: '#F4E8C1', border: '1px solid #C8A45D', padding: '6px 14px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <User size={13} color="#C8A45D" /> Sign In
              </button>
            )}
          </div>

          {/* Hamburger Menu Icon (Mobile Only) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger-btn"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #C8A45D',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#2E2E2E'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </div>

      {/* Slide-out Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            top: '78px',
            zIndex: 99,
            background: 'rgba(46,46,46,0.95)',
            backdropFilter: 'blur(16px)',
            color: '#FFF',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            overflowY: 'auto'
          }}
        >
          <div style={{ textAlign: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(200,164,93,0.3)' }}>
            <span style={{ fontSize: '0.75rem', color: '#C8A45D', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
              Blossom Studio Jaipur Menu
            </span>
          </div>

          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#F4E8C1', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            🌸 Collections & Services
          </a>

          <a 
            href="#collection" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#FFF', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            ✨ Storefront Hampers
          </a>

          {onOpenAllProducts && (
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAllProducts(); }}
              style={{ background: 'none', border: 'none', color: '#C8A45D', fontSize: '1.1rem', fontWeight: 700, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <Search size={18} /> View All 18+ Products
            </button>
          )}

          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenPlanner(); }}
            style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.1rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            💍 Bridal Trousseau Planner
          </button>

          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenHamperBuilder(); }}
            style={{ background: 'none', border: 'none', color: '#E8B7C9', fontSize: '1.1rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            🎁 Bespoke Hamper Builder
          </button>

          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenQuiz(); }}
            style={{ background: 'none', border: 'none', color: '#F4E8C1', fontSize: '1.1rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Sparkles size={18} color="#C8A45D" /> AI Gift Finder Quiz
          </button>

          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenOrderTracker(); }}
            style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.1rem', fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            🚚 Realtime Order Tracker
          </button>

          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentUser ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#F4E8C1', fontWeight: 600 }}>👤 Signed in as {currentUser.name}</span>
                <button onClick={() => { setMobileMenuOpen(false); onLogout(); }} style={{ background: '#FF5252', color: '#FFF', border: 'none', padding: '6px 14px', borderRadius: '14px', fontSize: '0.8rem', cursor: 'pointer' }}>Sign Out</button>
              </div>
            ) : (
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAuthModal('user'); }}
                className="btn-gold" 
                style={{ justifyContent: 'center', padding: '12px' }}
              >
                <User size={16} /> Sign In / Create Account
              </button>
            )}

            <button 
              onClick={() => { setMobileMenuOpen(false); onTriggerAdminAuth(); }}
              style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.8rem', cursor: 'pointer', marginTop: '6px' }}
            >
              🔒 Studio Admin Gateway Portal
            </button>
          </div>

        </div>
      )}
    </header>
  );
}
