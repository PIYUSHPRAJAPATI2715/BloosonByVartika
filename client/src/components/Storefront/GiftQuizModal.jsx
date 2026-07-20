import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';

export default function GiftQuizModal({ products, onClose, onSelectProduct }) {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('Bride & Groom');
  const [occasion, setOccasion] = useState('Wedding Collection');
  const [budget, setBudget] = useState('15000-30000');
  const [recommendation, setRecommendation] = useState(null);

  const handleCalculate = () => {
    // Find best matching product from catalog
    const matched = products.find(p => p.category === occasion) || products[0];
    setRecommendation(matched);
    setStep(4);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
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
          maxWidth: '640px',
          width: '100%',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          position: 'relative',
          border: '1.5px solid #C8A45D',
          overflow: 'hidden'
        }}
      >
        {/* Top Accent Line */}
        <div style={{ height: '6px', background: 'linear-gradient(90deg, #E8B7C9 0%, #C8A45D 100%)' }} />

        {/* Close Button */}
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

        <div style={{ padding: '36px' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="ribbon-tag" style={{ marginBottom: '8px' }}>
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} /> Gift Finder Quiz
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#2E2E2E' }}>
              Find the <span className="title-blush-gradient">Perfect Gift</span>
            </h3>
            <p style={{ color: '#666', fontSize: '0.88rem' }}>
              Answer 3 simple questions and our boutique AI algorithm will match your ideal hamper.
            </p>
          </div>

          {/* Step 1: Recipient */}
          {step === 1 && (
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem', color: '#2E2E2E', marginBottom: '16px', textAlign: 'center' }}>
                Question 1: Who are you gifting for?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
                {[
                  'Bride & Groom',
                  'Parents / Family',
                  'Corporate Client',
                  'Best Friend / Partner',
                  'Newborn / Kids',
                  'Festival Guests'
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setRecipient(opt)}
                    style={{
                      padding: '14px',
                      borderRadius: '16px',
                      border: recipient === opt ? '2px solid #C8A45D' : '1px solid rgba(0,0,0,0.1)',
                      background: recipient === opt ? '#FFF9F6' : '#FFFFFF',
                      color: '#2E2E2E',
                      fontWeight: recipient === opt ? 700 : 400,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Next Question</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2: Occasion */}
          {step === 2 && (
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem', color: '#2E2E2E', marginBottom: '16px', textAlign: 'center' }}>
                Question 2: What is the celebration occasion?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
                {[
                  { name: 'Bridal Trousseau & Wedding', value: 'Wedding Collection' },
                  { name: 'Birthday & Surprise', value: 'Birthday Collection' },
                  { name: 'Baby Shower & Newborn', value: 'Baby Collection' },
                  { name: 'Diwali & Festive Gifting', value: 'Festival Collection' },
                  { name: 'Corporate Kit', value: 'Corporate Gifting' },
                  { name: 'Handmade Cards & Albums', value: 'Handmade Products' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setOccasion(opt.value)}
                    style={{
                      padding: '14px',
                      borderRadius: '16px',
                      border: occasion === opt.value ? '2px solid #C8A45D' : '1px solid rgba(0,0,0,0.1)',
                      background: occasion === opt.value ? '#FFF9F6' : '#FFFFFF',
                      color: '#2E2E2E',
                      fontWeight: occasion === opt.value ? 700 : 400,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setStep(1)} className="btn-outline-gold" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                <button onClick={() => setStep(3)} className="btn-gold" style={{ flex: 2, justifyContent: 'center' }}>Next</button>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem', color: '#2E2E2E', marginBottom: '16px', textAlign: 'center' }}>
                Question 3: Preferred budget range per hamper?
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {[
                  { label: 'Under ₹5,000 (Handcrafted Surprises & Cards)', val: 'under-5000' },
                  { label: '₹5,000 - ₹15,000 (Luxury Trunks & Shagun Trays)', val: '5000-15000' },
                  { label: '₹15,000 - ₹30,000 (Royal Bridal Trousseau Sets)', val: '15000-30000' },
                  { label: 'Royalty ₹30,000+ (Grand Maharani Bespoke Sets)', val: 'above-30000' }
                ].map((b) => (
                  <button
                    key={b.val}
                    onClick={() => setBudget(b.val)}
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      border: budget === b.val ? '2px solid #C8A45D' : '1px solid rgba(0,0,0,0.1)',
                      background: budget === b.val ? '#FFF9F6' : '#FFFFFF',
                      color: '#2E2E2E',
                      fontWeight: budget === b.val ? 700 : 400,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setStep(2)} className="btn-outline-gold" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                <button onClick={handleCalculate} className="btn-gold" style={{ flex: 2, justifyContent: 'center' }}>Get Match ✨</button>
              </div>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && recommendation && (
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '2rem' }}>🎉👑</span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#2E2E2E', margin: '8px 0' }}>
                Your Boutique Recommendation Match
              </h4>

              <div 
                style={{
                  background: '#FFF9F6',
                  border: '1px solid #C8A45D',
                  borderRadius: '20px',
                  padding: '20px',
                  margin: '20px 0',
                  textAlign: 'left',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center'
                }}
              >
                <img 
                  src={recommendation.images[0]} 
                  alt={recommendation.name} 
                  style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#9A7734', fontWeight: 600 }}>{recommendation.category}</span>
                  <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E', margin: '2px 0' }}>
                    {recommendation.name}
                  </h5>
                  <div style={{ fontWeight: 700, color: '#C8A45D', fontSize: '1.1rem' }}>
                    ₹{recommendation.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setStep(1)} className="btn-outline-gold" style={{ flex: 1, justifyContent: 'center' }}>
                  <RefreshCw size={14} /> Retake Quiz
                </button>
                <button 
                  onClick={() => { onSelectProduct(recommendation); onClose(); }} 
                  className="btn-gold" 
                  style={{ flex: 2, justifyContent: 'center' }}
                >
                  <ShoppingBag size={16} /> View & Add Match
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
