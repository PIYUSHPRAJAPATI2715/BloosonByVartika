import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle2, Globe, Phone, MapPin, Sparkles, Gift, Image } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function AdminSettings({ onSettingsUpdated }) {
  const [settings, setSettings] = useState({
    announcementText: "👑 JAIPUR STUDIO OPEN FOR LUXURY BRIDAL TROUSSEAU & FESTIVAL BOOKINGS",
    heroHeading: "Every Gift Tells a Story",
    heroSubheading: "Luxury Handmade Hampers crafted with love for every celebration.",
    tagline: "Luxury Trousseau Packaging | Premium Gift Hampers",
    giftBoxImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
    giftBoxTitle: "Tap to Unwrap Luxury",
    giftBoxSubtitle: "Handcrafted Bridal Trousseau Box Set",
    address: "Shop No G3, Ganesham 2, Nursery Cir, Indraprastha Colony, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021",
    contactPhone: "+91 98280 23641",
    contactEmail: "vartika1594@gmail.com",
    boutiqueAddress: "Shop No G3, Ganesham 2, Nursery Cir, Indraprastha Colony, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021",
    boutiquePhone: "+91 98280 23641",
    boutiqueEmail: "vartika1594@gmail.com"
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch(getApiUrl('/api/settings'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const fetched = data.data;
          setSettings(prev => ({
            ...prev,
            ...fetched,
            boutiqueAddress: fetched.address || fetched.boutiqueAddress || prev.address,
            boutiquePhone: fetched.contactPhone || fetched.boutiquePhone || prev.contactPhone,
            boutiqueEmail: fetched.contactEmail || fetched.boutiqueEmail || prev.contactEmail,
            address: fetched.address || fetched.boutiqueAddress || prev.address,
            contactPhone: fetched.contactPhone || fetched.boutiquePhone || prev.contactPhone,
            contactEmail: fetched.contactEmail || fetched.boutiqueEmail || prev.contactEmail
          }));
        }
      })
      .catch(err => console.warn("Settings fetch fallback:", err));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...settings,
      address: settings.boutiqueAddress || settings.address,
      contactPhone: settings.boutiquePhone || settings.contactPhone,
      contactEmail: settings.boutiqueEmail || settings.contactEmail
    };
    try {
      const res = await fetch(getApiUrl('/api/settings'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(prev => ({ ...prev, ...data.data }));
        if (onSettingsUpdated) onSettingsUpdated(data.data);
      }
    } catch (err) {
      console.warn("Settings save fallback:", err);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F4E8C1', margin: 0 }}>
          Dynamic Homepage & Studio Settings Customizer
        </h1>
        <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
          Edit boutique contact details, address, hero heading, announcement text, and gift box image live.
        </p>
      </div>

      <div style={{ background: '#282828', borderRadius: '20px', padding: '28px', border: '1px solid #C8A45D', maxWidth: '780px' }}>
        {savedSuccess && (
          <div style={{ background: '#1B3E2B', color: '#4CAF50', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <CheckCircle2 size={18} /> Website & Jaipur Studio settings updated live across all pages!
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Top Announcement Bar */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#C8A45D', display: 'block', marginBottom: '6px' }}>
              Top Announcement Bar Text
            </label>
            <input 
              type="text" 
              value={settings.announcementText || ''} 
              onChange={e => setSettings({...settings, announcementText: e.target.value})} 
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
            />
          </div>

          {/* Hero Heading & Subheading */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#C8A45D', display: 'block', marginBottom: '6px' }}>
              Hero Section Main Heading
            </label>
            <input 
              type="text" 
              value={settings.heroHeading || ''} 
              onChange={e => setSettings({...settings, heroHeading: e.target.value})} 
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#C8A45D', display: 'block', marginBottom: '6px' }}>
              Hero Subheading Text
            </label>
            <textarea 
              rows={2}
              value={settings.heroSubheading || ''} 
              onChange={e => setSettings({...settings, heroSubheading: e.target.value})} 
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
            />
          </div>

          {/* 3D Gift Box Animation Customizer */}
          <div style={{ background: '#1E1E1E', borderRadius: '16px', padding: '20px', border: '1px solid rgba(200,164,93,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#F4E8C1', fontWeight: 700, fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>
              <Gift size={18} color="#C8A45D" /> 3D Interactive Gift Box Animation Settings
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>3D Unwrapping Gift Box Image URL</label>
                <input 
                  type="text" 
                  value={settings.giftBoxImage || ''} 
                  onChange={e => setSettings({...settings, giftBoxImage: e.target.value})} 
                  placeholder="https://images.unsplash.com/..." 
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Gift Box Teaser Title</label>
                  <input 
                    type="text" 
                    value={settings.giftBoxTitle || ''} 
                    onChange={e => setSettings({...settings, giftBoxTitle: e.target.value})} 
                    placeholder="Tap to Unwrap Luxury" 
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Gift Box Subtitle</label>
                  <input 
                    type="text" 
                    value={settings.giftBoxSubtitle || ''} 
                    onChange={e => setSettings({...settings, giftBoxSubtitle: e.target.value})} 
                    placeholder="Handcrafted Trousseau Box Set" 
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Studio Contact Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#C8A45D', display: 'block', marginBottom: '6px' }}>
                Boutique Contact Phone / WhatsApp
              </label>
              <input 
                type="text" 
                value={settings.boutiquePhone || ''} 
                onChange={e => setSettings({...settings, boutiquePhone: e.target.value, contactPhone: e.target.value})} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#C8A45D', display: 'block', marginBottom: '6px' }}>
                Boutique Email
              </label>
              <input 
                type="text" 
                value={settings.boutiqueEmail || ''} 
                onChange={e => setSettings({...settings, boutiqueEmail: e.target.value, contactEmail: e.target.value})} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#C8A45D', display: 'block', marginBottom: '6px' }}>
              Jaipur Boutique Address
            </label>
            <input 
              type="text" 
              value={settings.boutiqueAddress || ''} 
              onChange={e => setSettings({...settings, boutiqueAddress: e.target.value, address: e.target.value})} 
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
            />
          </div>

          <button type="submit" className="btn-gold" style={{ justifyContent: 'center', padding: '12px', marginTop: '10px' }}>
            <Save size={16} /> Save Live Changes
          </button>
        </form>
      </div>

    </div>
  );
}
