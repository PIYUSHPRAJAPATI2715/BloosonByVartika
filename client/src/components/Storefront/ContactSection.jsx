import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, CheckCircle2 } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function ContactSection({ websiteSettings }) {
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Wedding',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const address = websiteSettings?.address || "Shop No G3, Ganesham 2, Nursery Cir, Indraprastha Colony, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021";
  const phone = websiteSettings?.contactPhone || "+91 98280 23641";
  const email = websiteSettings?.contactEmail || "vartika1594@gmail.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(getApiUrl('/api/inquiries'), {
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
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const text = encodeURIComponent("Hello Vartika! I would like to inquire about luxury wedding trousseau packaging / gift hampers.");
    window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');
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
          
          {/* Left Column: Contact Cards */}
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
                    <span style={{ color: '#666', fontSize: '0.88rem' }}>{address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: '#C98BA2', color: '#FFF', borderRadius: '50%', padding: '10px' }}><Phone size={18} /></div>
                  <div>
                    <strong style={{ color: '#2E2E2E', display: 'block', fontSize: '0.95rem' }}>Direct Phone / Concierge</strong>
                    <span style={{ color: '#666', fontSize: '0.88rem' }}>{phone}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: '#9A7734', color: '#FFF', borderRadius: '50%', padding: '10px' }}><Mail size={18} /></div>
                  <div>
                    <strong style={{ color: '#2E2E2E', display: 'block', fontSize: '0.95rem' }}>Email Inquiries</strong>
                    <span style={{ color: '#666', fontSize: '0.88rem' }}>{email}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: '#2E2E2E', color: '#FFF', borderRadius: '50%', padding: '10px' }}><Clock size={18} /></div>
                  <div>
                    <strong style={{ color: '#2E2E2E', display: 'block', fontSize: '0.95rem' }}>Studio Hours</strong>
                    <span style={{ color: '#666', fontSize: '0.88rem' }}>Monday – Saturday: 10:30 AM – 7:30 PM (Appointments Preferred)</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={openWhatsApp}
                style={{
                  width: '100%',
                  marginTop: '28px',
                  background: '#25D366',
                  color: '#FFF',
                  padding: '14px',
                  borderRadius: '30px',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(37,211,102,0.3)'
                }}
              >
                <MessageCircle size={18} /> Chat Directly on WhatsApp
              </button>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div 
            style={{
              background: '#FFF9F6',
              borderRadius: '24px',
              border: '1px solid rgba(200,164,93,0.3)',
              padding: '32px'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#2E2E2E', marginBottom: '8px' }}>
              Send an Instant Inquiry
            </h3>
            <p style={{ color: '#666', fontSize: '0.88rem', marginBottom: '24px' }}>
              Share your wedding date or gifting occasion for personalized recommendations.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '36px 0', color: 'green' }}>
                <CheckCircle2 size={48} style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Inquiry Received!</h4>
                <p style={{ fontSize: '0.88rem', color: '#666', marginTop: '6px' }}>Vartika will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E' }}>Your Name *</label>
                  <input type="text" required value={inquiryData.name} onChange={e => setInquiryData({...inquiryData, name: e.target.value})} placeholder="Enter full name" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', background: '#FFF', outline: 'none' }} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E' }}>Phone *</label>
                    <input type="tel" required value={inquiryData.phone} onChange={e => setInquiryData({...inquiryData, phone: e.target.value})} placeholder="Phone number" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', background: '#FFF', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E' }}>Email</label>
                    <input type="email" value={inquiryData.email} onChange={e => setInquiryData({...inquiryData, email: e.target.value})} placeholder="Email address" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', background: '#FFF', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E' }}>Inquiry Type</label>
                  <select value={inquiryData.type} onChange={e => setInquiryData({...inquiryData, type: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', background: '#FFF', outline: 'none', fontWeight: 600 }}>
                    <option value="Wedding">Bridal & Groom Trousseau Packaging</option>
                    <option value="Festival">Festival & Corporate Gifting</option>
                    <option value="Baby">Baby Announcement Hampers</option>
                    <option value="Handmade">Handmade Cards & Explosion Boxes</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E' }}>Message Details</label>
                  <textarea rows={3} value={inquiryData.message} onChange={e => setInquiryData({...inquiryData, message: e.target.value})} placeholder="Tell us about required quantities, colors, or event date..." style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #ddd', background: '#FFF', outline: 'none' }} />
                </div>

                <button type="submit" className="btn-gold" style={{ justifyContent: 'center', padding: '14px', marginTop: '8px' }}>
                  <Send size={16} /> Submit Consultation Request
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
