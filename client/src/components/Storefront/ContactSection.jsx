import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Wedding',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("Hello Vartika! I would like to inquire about luxury wedding trousseau packaging / gift hampers.");
    window.open(`https://wa.me/919829000000?text=${text}`, '_blank');
  };

  return (
    <section id="contact" style={{ padding: '90px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px' }}>
          <span className="ribbon-tag" style={{ marginBottom: '12px' }}>Jaipur Boutique Studio</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: '#2E2E2E', marginBottom: '16px' }}>
            Visit & Connect <span className="title-gold-gradient">With Vartika</span>
          </h2>
          <p style={{ color: '#4A4A4A', fontSize: '1.05rem' }}>
            Plan a studio consultation or send us a quick message over WhatsApp or Email.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'start' }}>
          
          {/* Left Column: Contact Cards & Map */}
          <div>
            <div 
              style={{
                background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)',
                borderRadius: '24px',
                border: '1px solid rgba(200,164,93,0.3)',
                padding: '32px',
                marginBottom: '28px'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#2E2E2E', marginBottom: '20px' }}>
                Studio Contact Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: '#C8A45D', color: '#FFF', borderRadius: '50%', padding: '10px' }}><MapPin size={18} /></div>
                  <div>
                    <strong style={{ color: '#2E2E2E', display: 'block', fontSize: '0.95rem' }}>Jaipur Boutique Address</strong>
                    <span style={{ color: '#666', fontSize: '0.88rem' }}>Plot 45, Malviya Nagar Luxury Corridor, Jaipur, Rajasthan 302017</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: '#C98BA2', color: '#FFF', borderRadius: '50%', padding: '10px' }}><Phone size={18} /></div>
                  <div>
                    <strong style={{ color: '#2E2E2E', display: 'block', fontSize: '0.95rem' }}>Direct Phone / Concierge</strong>
                    <span style={{ color: '#666', fontSize: '0.88rem' }}>+91 98290 00000 / +91 94140 11111</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: '#2E2E2E', color: '#F4E8C1', borderRadius: '50%', padding: '10px' }}><Clock size={18} /></div>
                  <div>
                    <strong style={{ color: '#2E2E2E', display: 'block', fontSize: '0.95rem' }}>Studio Hours</strong>
                    <span style={{ color: '#666', fontSize: '0.88rem' }}>Monday – Saturday: 10:30 AM – 7:30 PM (Appointments Preferred)</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct Button */}
              <button 
                onClick={openWhatsApp}
                style={{
                  marginTop: '28px',
                  width: '100%',
                  background: '#25D366',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '14px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)'
                }}
              >
                <MessageCircle size={20} /> Chat Directly on WhatsApp
              </button>
            </div>

            {/* Google Map Embed Simulation */}
            <div style={{ borderRadius: '24px', overflow: 'hidden', height: '240px', border: '1px solid #C8A45D' }}>
              <iframe 
                title="Jaipur Studio Location" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113912.47468165502!2d75.72376269225724!3d26.885141680193132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db419c8f00001%3A0xe54e6ed86a4e320d!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div style={{ background: '#FFF9F6', borderRadius: '24px', border: '1.5px solid rgba(200, 164, 93, 0.4)', padding: '36px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={48} color="#C8A45D" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#2E2E2E', marginBottom: '8px' }}>
                  Inquiry Submitted!
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Thank you! Our Jaipur studio coordinator will reach out to you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#2E2E2E', marginBottom: '8px' }}>
                  Send an Inquiry
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '24px' }}>
                  Have questions about bulk orders, wedding trousseaus, or custom boxes?
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Your Name *</label>
                  <input type="text" required value={inquiryData.name} onChange={e => setInquiryData({...inquiryData, name: e.target.value})} placeholder="e.g. Radhika Mehta" style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #ccc', outline: 'none', background: '#FFF', fontSize: '0.88rem' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Phone *</label>
                    <input type="tel" required value={inquiryData.phone} onChange={e => setInquiryData({...inquiryData, phone: e.target.value})} placeholder="+91 98290 00000" style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #ccc', outline: 'none', background: '#FFF', fontSize: '0.88rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Email *</label>
                    <input type="email" required value={inquiryData.email} onChange={e => setInquiryData({...inquiryData, email: e.target.value})} placeholder="radhika@example.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #ccc', outline: 'none', background: '#FFF', fontSize: '0.88rem' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Inquiry Type</label>
                  <select value={inquiryData.type} onChange={e => setInquiryData({...inquiryData, type: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #ccc', outline: 'none', background: '#FFF', fontSize: '0.88rem' }}>
                    <option value="Wedding">Bridal Trousseau & Wedding Packaging</option>
                    <option value="Corporate">Corporate & Client Gifting</option>
                    <option value="Bulk Order">Festive Bulk Orders</option>
                    <option value="General">General Question</option>
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '4px' }}>Your Message</label>
                  <textarea rows={4} required value={inquiryData.message} onChange={e => setInquiryData({...inquiryData, message: e.target.value})} placeholder="Share your date, quantity, theme preferences..." style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid #ccc', outline: 'none', background: '#FFF', fontSize: '0.88rem' }} />
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                  <Send size={18} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
