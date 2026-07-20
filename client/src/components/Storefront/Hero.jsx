import React, { useState } from 'react';
import { Sparkles, Gift, Heart, ChevronRight, ArrowUpRight } from 'lucide-react';

export default function Hero({ settings, onOpenCustomOrder, onOpenHamperBuilder, onOpenQuiz }) {
  const [boxOpened, setBoxOpened] = useState(false);

  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px 80px',
        background: 'radial-gradient(circle at 50% 30%, #FFF9F6 0%, #F8E3EC 55%, #F0D5E1 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Floral SVG Gradients */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(232, 183, 201, 0.45) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(200, 164, 93, 0.3) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      <div 
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Left Column: Text & CTA */}
        <div>
          <div className="ribbon-tag" style={{ marginBottom: '20px' }}>
            👑 Jaipur's Premier Luxury Gifting Studio
          </div>

          <h1 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: '#2E2E2E',
              marginBottom: '20px'
            }}
          >
            Every Gift <br />
            <span className="title-blush-gradient" style={{ fontStyle: 'italic', fontWeight: 400 }}>
              Tells a Story
            </span>
          </h1>

          <p 
            style={{
              fontSize: '1.12rem',
              color: '#4A4A4A',
              maxWidth: '520px',
              marginBottom: '36px',
              lineHeight: 1.7
            }}
          >
            Handcrafted luxury hampers, bespoke bridal trousseau packing, and personalized wedding keepsakes. Designed with elegance in Jaipur to create unforgettable memories.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <a href="#collection" className="btn-gold">
              <span>Explore Collection</span>
              <ChevronRight size={18} />
            </a>

            <button onClick={onOpenCustomOrder} className="btn-blush">
              <Gift size={18} />
              <span>Book Custom Order</span>
            </button>

            <button onClick={onOpenHamperBuilder} className="btn-outline-gold">
              <Sparkles size={16} color="#C8A45D" />
              <span>Build Hamper</span>
            </button>
          </div>

          {/* Quick Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#2E2E2E', fontWeight: 500 }}>
              <span style={{ color: '#C8A45D' }}>★ 5.0</span>
              <span>(450+ Bridal Trousseau Reviews)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: '#4A4A4A' }}>
              <Heart size={15} color="#C98BA2" fill="#C98BA2" /> 100% Handcrafted in Jaipur
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Opening 3D Gift Box Animation */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div 
            onClick={() => setBoxOpened(!boxOpened)}
            style={{
              position: 'relative',
              width: '320px',
              height: '380px',
              cursor: 'pointer',
              perspective: '1000px'
            }}
            title="Click to Open the Royal Gift Box!"
          >
            {/* Ambient Shadow & Glow */}
            <div 
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10%',
                width: '80%',
                height: '30px',
                background: 'rgba(200, 164, 93, 0.45)',
                filter: 'blur(20px)',
                borderRadius: '50%'
              }}
            />

            {/* Gift Box Container */}
            <div 
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FFF9F6 100%)',
                borderRadius: '24px',
                border: '2px solid rgba(200, 164, 93, 0.4)',
                boxShadow: '0 25px 50px rgba(232, 183, 201, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                textAlign: 'center',
                position: 'relative',
                transition: 'all 0.5s ease',
                transform: boxOpened ? 'rotateY(10deg) translateY(-10px)' : 'rotateY(0deg)'
              }}
            >
              {/* Satin Ribbon Vertical & Horizontal */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '30px',
                  background: 'linear-gradient(90deg, #E8B7C9 0%, #C98BA2 50%, #E8B7C9 100%)',
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  zIndex: 2
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '30px',
                  background: 'linear-gradient(180deg, #E8B7C9 0%, #C98BA2 50%, #E8B7C9 100%)',
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  zIndex: 2
                }}
              />

              {/* Box Top Lid - Animates Open */}
              <div 
                style={{
                  position: 'absolute',
                  top: boxOpened ? '-80px' : '-5px',
                  width: '104%',
                  height: '80px',
                  background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)',
                  border: '2px solid #C8A45D',
                  borderRadius: '16px 16px 4px 4px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  zIndex: 4,
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transform: boxOpened ? 'rotate(-15deg)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Gold Ribbon Bow */}
                <div style={{ fontSize: '2rem' }}>🎀</div>
              </div>

              {/* Box Inside Content revealed on open */}
              <div style={{ zIndex: 3, opacity: boxOpened ? 1 : 0.8, transition: 'opacity 0.4s' }}>
                {boxOpened ? (
                  <div style={{ animation: 'pulseGlow 2s infinite' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>✨👑💍</div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', color: '#9A7734', fontSize: '1.2rem', marginBottom: '4px' }}>
                      Royal Maharani Set Revealed
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#4A4A4A' }}>
                      Hand-carved velvet box, fresh roses & zari shagun tray
                    </p>
                    <span style={{ display: 'inline-block', marginTop: '12px', background: '#C8A45D', color: '#FFF', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px' }}>
                      Click to Close
                    </span>
                  </div>
                ) : (
                  <div style={{ marginTop: '40px' }}>
                    <Gift size={48} color="#C8A45D" />
                    <p style={{ fontFamily: 'var(--font-subserif)', fontSize: '1.15rem', color: '#2E2E2E', marginTop: '12px', fontWeight: 600 }}>
                      Tap to Unwrap Luxury
                    </p>
                    <span style={{ fontSize: '0.78rem', color: '#C98BA2' }}>
                      Interactive Gift Box
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
