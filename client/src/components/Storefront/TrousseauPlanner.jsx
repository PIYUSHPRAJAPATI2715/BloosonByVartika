import React, { useState } from 'react';
import { X, Calendar, CheckSquare, Square, Crown, Sparkles, Heart, Plus } from 'lucide-react';

export default function TrousseauPlanner({ onClose, onOpenCustomOrder }) {
  const [weddingDate, setWeddingDate] = useState('2026-11-25');
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Heavy Bridal Lehenga Velvet Storage Chest (1pc)', completed: true, category: 'Bridal' },
    { id: 2, text: 'Customized Saree & Suit Organza Bags (12pcs)', completed: true, category: 'Bridal' },
    { id: 3, text: 'Mirror Shagun Trays for Engagement Ring Ceremony', completed: true, category: 'Ceremony' },
    { id: 4, text: 'Personalized Mehendi & Haldi Return Hampers (50pcs)', completed: false, category: 'Favors' },
    { id: 5, text: 'Gold Foil Monogram Cash Envelopes (25pcs)', completed: false, category: 'Shagun' },
    { id: 6, text: 'Jewelry & Watch Velvet Organizers (4pcs)', completed: false, category: 'Bridal' },
    { id: 7, text: 'Groom Safa & Brooch Display Boxes (8pcs)', completed: false, category: 'Groom' }
  ]);
  const [newItemText, setNewItemText] = useState('');

  const toggleCheck = (id) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    setChecklist([...checklist, { id: Date.now(), text: newItemText, completed: false, category: 'Custom' }]);
    setNewItemText('');
  };

  const completedCount = checklist.filter(c => c.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  // Calculate days remaining
  const daysRemaining = Math.max(0, Math.ceil((new Date(weddingDate) - new Date()) / (1000 * 60 * 60 * 24)));

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
          maxWidth: '780px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          position: 'relative',
          border: '2px solid #C8A45D'
        }}
      >
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
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ padding: '36px' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="ribbon-tag" style={{ marginBottom: '8px' }}>
              👑 Interactive Bride & Planner Suite
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#2E2E2E' }}>
              Wedding Trousseau <span className="title-blush-gradient">Planner & Countdown</span>
            </h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Organize your bridal trousseau, shagun trays, and favor boxes in one place.
            </p>
          </div>

          {/* Wedding Date Selector & Countdown Counter */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #2E2E2E 0%, #3D2D35 100%)',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              boxShadow: '0 10px 25px rgba(46,46,46,0.3)'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: '#C8A45D', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Set Your Big Day:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <Calendar size={18} color="#C8A45D" />
                <input 
                  type="date" 
                  value={weddingDate} 
                  onChange={(e) => setWeddingDate(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(200, 164, 93, 0.5)',
                    color: '#F4E8C1',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#F4E8C1', lineHeight: 1 }}>
                {daysRemaining} Days
              </div>
              <span style={{ fontSize: '0.8rem', color: '#E8B7C9' }}>Remaining for Trousseau Dispatch</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
              <span>Trousseau Readiness Progress</span>
              <span style={{ color: '#C8A45D' }}>{progressPercent}% Complete ({completedCount}/{checklist.length})</span>
            </div>
            <div style={{ height: '10px', background: '#F8E3EC', borderRadius: '10px', overflow: 'hidden' }}>
              <div 
                style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #E8B7C9 0%, #C8A45D 100%)',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>

          {/* Interactive Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            {checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '14px',
                  border: item.completed ? '1px solid rgba(200,164,93,0.4)' : '1px solid rgba(0,0,0,0.08)',
                  background: item.completed ? '#FFF9F6' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: item.completed ? '#C8A45D' : '#999' }}>
                    {item.completed ? <CheckSquare size={18} /> : <Square size={18} />}
                  </span>
                  <span 
                    style={{
                      fontSize: '0.9rem',
                      color: item.completed ? '#777' : '#2E2E2E',
                      textDecoration: item.completed ? 'line-through' : 'none'
                    }}
                  >
                    {item.text}
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', background: '#F8E3EC', color: '#2E2E2E', padding: '3px 8px', borderRadius: '10px', fontWeight: 600 }}>
                  {item.category}
                </span>
              </div>
            ))}
          </div>

          {/* Add Custom Item Row */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
            <input 
              type="text" 
              placeholder="Add custom trousseau item (e.g. Haldi Favors for 40 guests)..."
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(200, 164, 93, 0.4)',
                fontSize: '0.88rem',
                outline: 'none',
                background: '#FFF9F6'
              }}
            />
            <button onClick={addItem} className="btn-gold" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
              <Plus size={16} /> Add
            </button>
          </div>

          {/* Consultation CTA */}
          <div style={{ background: '#FFF9F6', border: '1px solid #C8A45D', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: '#2E2E2E', fontSize: '1.1rem', marginBottom: '6px' }}>
              Need Vartika to Design Your Complete Wedding Trousseau?
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '14px' }}>
              Book a personal virtual or Jaipur studio consultation to customize your theme, colors, and monograms.
            </p>
            <button 
              onClick={() => { onClose(); onOpenCustomOrder(); }}
              className="btn-blush"
            >
              <span>Schedule Free Wedding Consultation</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
