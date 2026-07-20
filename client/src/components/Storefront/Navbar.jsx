import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Truck, User, LogOut, Lock, Crown, Gift, Compass } from 'lucide-react';

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
        background: scrolled ? 'rgba(255, 249, 246, 0.96)' : 'rgba(255, 249, 246, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled ? '0 12px 36px rgba(200, 164, 93, 0.12)' : '0 4px 20px rgba(0,0,0,0.03)',
        borderBottom: '1px solid rgba(200, 164, 93, 0.3)'
      }}
    >
      {/* Top Banner Announcement - Shimmering Champagne Gold */}
      <div 
        style={{
          background: 'linear-gradient(90deg, #9A7734 0%, #C8A45D 35%, #F4E8C1 50%, #C8A45D 65%, #9A7734 100%)',
          color: '#1E1E1E',
          padding: '6px 20px',
          fontSize: '0.76rem',
          fontWeight: 700,
          textAlign: 'center',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 2px 10px rgba(200, 164, 93, 0.25)'
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="#1E1E1E" /> 👑 Jaipur Studio Open for Luxury Bridal Trousseau Bookings
        </span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span 
          onClick={onOpenOrderTracker} 
          style={{ textDecoration: 'underline', cursor: 'pointer', letterSpacing: '1px' }}
        >
          Track Your Order 🚚
        </span>
      </div>

      {/* Main Haute Couture Nav Bar */}
      <div 
        style={{ 
          maxWidth: '1360px', 
          margin: '0 auto', 
          padding: '12px 28px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        
        {/* Left: Brand Crest & Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 50%, #C8A45D 100%)',
              border: '1.5px solid #C8A45D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(200, 164, 93, 0.3)',
              fontSize: '1.35rem'
            }}
          >
            🌸
          </div>
          <div>
            <span 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '1.55rem', 
                fontWeight: '700', 
                color: '#2E2E2E', 
                letterSpacing: '0.5px', 
                display: 'block', 
                lineHeight: 1 
              }}
            >
              Blossom
            </span>
            <span 
              style={{ 
                fontFamily: 'var(--font-subserif)', 
                fontSize: '0.68rem', 
                letterSpacing: '2.5px', 
                color: '#9A7734', 
                textTransform: 'uppercase', 
                fontWeight: 700,
                display: 'block',
                marginTop: '3px'
              }}
            >
              BY VARTIKA • JAIPUR
            </span>
          </div>
        </a>

        {/* Center: Spacious Navigation Items */}
        <nav 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '24px',
            background: 'rgba(255, 255, 255, 0.65)',
            padding: '6px 20px',
            borderRadius: '40px',
            border: '1px solid rgba(200, 164, 93, 0.25)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
          }}
        >
          <a 
            href="#services" 
            style={{ 
              textDecoration: 'none', 
              color: '#2E2E2E', 
              fontWeight: 500, 
              fontSize: '0.86rem', 
              letterSpacing: '0.3px',
              transition: 'color 0.2s'
            }}
          >
            Services
          </a>

          <a 
            href="#collection" 
            style={{ 
              textDecoration: 'none', 
              color: '#2E2E2E', 
              fontWeight: 500, 
              fontSize: '0.86rem', 
              letterSpacing: '0.3px',
              transition: 'color 0.2s'
            }}
          >
            Collections
          </a>

          <a 
            href="#about" 
            style={{ 
              textDecoration: 'none', 
              color: '#2E2E2E', 
              fontWeight: 500, 
              fontSize: '0.86rem', 
              letterSpacing: '0.3px',
              transition: 'color 0.2s'
            }}
          >
            Our Story
          </a>

          <span style={{ color: '#C8A45D', fontSize: '0.6rem' }}>✦</span>

          <button 
            onClick={onOpenPlanner} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#9A7734', 
              fontWeight: 600, 
              fontSize: '0.86rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px' 
            }}
          >
            💍 Trousseau Planner
          </button>
          
          <button 
            onClick={onOpenHamperBuilder} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#C98BA2', 
              fontWeight: 600, 
              fontSize: '0.86rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px' 
            }}
          >
            🎁 Custom Builder
          </button>
          
          <button 
            onClick={onOpenQuiz} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#2E2E2E', 
              fontWeight: 600, 
              fontSize: '0.86rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px' 
            }}
          >
            <Sparkles size={13} color="#C8A45D" /> Gift Finder
          </button>
        </nav>

        {/* Right Actions: Clean Pill Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Order Tracker */}
          <button 
            onClick={onOpenOrderTracker}
            title="Track Order"
            style={{ 
              background: '#FFFFFF', 
              border: '1px solid rgba(200, 164, 93, 0.4)', 
              borderRadius: '50%', 
              width: '38px', 
              height: '38px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer', 
              color: '#2E2E2E',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}
          >
            <Truck size={17} color="#2E2E2E" />
          </button>

          {/* Bag Button */}
          <button 
            onClick={onOpenCart}
            style={{ 
              background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)',
              border: '1.5px solid #C8A45D', 
              borderRadius: '30px', 
              padding: '7px 16px',
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: '#2E2E2E',
              boxShadow: '0 6px 16px rgba(200, 164, 93, 0.2)'
            }}
          >
            <ShoppingBag size={17} color="#9A7734" />
            <span>Bag</span>
            <span 
              style={{ 
                background: '#C8A45D', 
                color: '#FFFFFF', 
                borderRadius: '50%', 
                width: '20px', 
                height: '20px', 
                fontSize: '0.72rem', 
                fontWeight: 700,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              {cartCount}
            </span>
          </button>

          {/* User Sign In / Profile Button */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                style={{ 
                  background: '#2E2E2E', 
                  color: '#F4E8C1',
                  border: '1px solid #C8A45D', 
                  padding: '7px 16px', 
                  borderRadius: '30px', 
                  fontSize: '0.82rem', 
                  fontWeight: 600, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px' 
                }}
              >
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
                background: 'linear-gradient(135deg, #2E2E2E 0%, #3D2D35 100%)',
                color: '#F4E8C1',
                border: '1px solid #C8A45D',
                borderRadius: '30px',
                padding: '8px 20px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 6px 18px rgba(46,46,46,0.25)'
              }}
            >
              <User size={14} color="#C8A45D" />
              <span>Sign In / Sign Up</span>
            </button>
          )}

          {/* Subtle Protected Admin Lock Link */}
          <button 
            onClick={onTriggerAdminAuth}
            title="Studio Admin Portal"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.25)', padding: '4px', marginLeft: '2px' }}
          >
            <Lock size={14} />
          </button>

        </div>

      </div>
    </header>
  );
}
