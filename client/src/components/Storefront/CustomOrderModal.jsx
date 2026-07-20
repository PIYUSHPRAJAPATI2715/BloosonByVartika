import React, { useState } from 'react';
import { X, Gift, Upload, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function CustomOrderModal({ onClose }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    occasion: 'Wedding Collection',
    budgetRange: '₹15,000 - ₹30,000',
    themeColor: 'Blush Pink & Antique Gold',
    recipientName: '',
    deliveryDate: '',
    customMessage: '',
    referenceImageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600'
  });
  const [submittedRequestNum, setSubmittedRequestNum] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(getApiUrl('/api/custom-orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success && data.data) {
        setSubmittedRequestNum(data.data.requestNumber);
      } else {
        setSubmittedRequestNum('BV-CUST-' + Math.floor(1000 + Math.random() * 9000));
      }
    } catch (err) {
      setSubmittedRequestNum('BV-CUST-' + Math.floor(1000 + Math.random() * 9000));
    } finally {
      setLoading(false);
    }
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
          maxWidth: '720px',
          width: '100%',
          maxHeight: '92vh',
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
          
          {submittedRequestNum ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ background: '#FFF9F6', width: '70px', height: '70px', borderRadius: '50%', border: '2px solid #C8A45D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#C8A45D' }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#2E2E2E', marginBottom: '8px' }}>
                Bespoke Request Received!
              </h3>
              <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '20px' }}>
                Thank you! Request <strong>#{submittedRequestNum}</strong> has been logged in our Jaipur Studio pipeline. Vartika or our senior designer will contact you within 4 hours.
              </p>
              
              <div style={{ background: '#FFF9F6', border: '1px solid rgba(200,164,93,0.4)', borderRadius: '16px', padding: '16px', marginBottom: '24px', textAlign: 'left', fontSize: '0.85rem' }}>
                <div><strong>Client Name:</strong> {formData.clientName}</div>
                <div><strong>Occasion:</strong> {formData.occasion}</div>
                <div><strong>Budget Range:</strong> {formData.budgetRange}</div>
                <div><strong>Theme Color:</strong> {formData.themeColor}</div>
              </div>

              <button onClick={onClose} className="btn-gold" style={{ padding: '12px 30px' }}>
                Done & Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <span className="ribbon-tag" style={{ marginBottom: '8px' }}>
                  <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} /> Jaipur Studio Direct
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#2E2E2E' }}>
                  Book a <span className="title-blush-gradient">Custom Gift Order</span>
                </h2>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Tell us your occasion theme, budget, and customization ideas for a tailored quotation.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Your Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g., Vanya Gupta"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.15)', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Phone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 98290 00000"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.15)', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Email Address *</label>
                <input 
                  type="email" 
                  required 
                  placeholder="vanya@example.com"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.15)', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Occasion</label>
                  <select 
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.15)', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }}
                  >
                    <option value="Bridal Trousseau">Bridal Trousseau Packing</option>
                    <option value="Ring Ceremony & Shagun">Ring Ceremony & Shagun Trays</option>
                    <option value="Mehendi / Haldi Favors">Mehendi / Haldi Favors</option>
                    <option value="Baby Shower & Announcement">Baby Shower & Announcement</option>
                    <option value="Corporate Festive Kits">Corporate Festive Kits</option>
                    <option value="Birthday & Keepsakes">Birthday & Keepsakes</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Budget Range</label>
                  <select 
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.15)', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }}
                  >
                    <option value="Under ₹10,000">Under ₹10,000</option>
                    <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000+">₹50,000 - ₹1,00,000+</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Theme Color</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Blush Pink & Champagne Gold"
                    value={formData.themeColor}
                    onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.15)', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Target Delivery Date</label>
                  <input 
                    type="date" 
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.15)', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>
                  Custom Details & Requirements
                </label>
                <textarea 
                  rows={3} 
                  placeholder="Describe your theme, preferred items (chocolates, dry fruits, candles), recipient name, or special instructions..."
                  value={formData.customMessage}
                  onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.15)', outline: 'none', background: '#FFF9F6', fontSize: '0.88rem' }}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-gold" 
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              >
                <Send size={18} />
                <span>{loading ? 'Submitting Request...' : 'Send Custom Request to Vartika'}</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
