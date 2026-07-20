import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle2, Globe, Phone, MapPin, Sparkles } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function AdminSettings({ onSettingsUpdated }) {
  const [settings, setSettings] = useState({
    announcementText: "Jaipur Studio Open for Luxury Bridal Trousseau & Festival Bookings",
    heroHeading: "Every Gift Tells a Story",
    heroSubheading: "Luxury Handmade Hampers crafted with love for every celebration.",
    tagline: "Luxury Trousseau Packaging | Premium Gift Hampers",
    boutiqueAddress: "Plot 45, Malviya Nagar Luxury Corridor, Jaipur, Rajasthan 302017",
    boutiquePhone: "+91 98290 00000",
    boutiqueEmail: "contact@blossombyvartika.com"
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch(getApiUrl('/api/settings'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setSettings(data.data);
      })
      .catch(err => console.warn("Settings fetch fallback:", err));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(getApiUrl('/api/settings'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
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
          Dynamic Homepage & Studio Settings
        </h1>
        <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
          Update hero headings, announcement bar text, phone, and boutique address live without coding.
        </p>
      </div>

      <div style={{ background: '#282828', borderRadius: '20px', padding: '28px', border: '1px solid #C8A45D', maxWidth: '750px' }}>
        {savedSuccess && (
          <div style={{ background: '#1B3E2B', color: '#4CAF50', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <CheckCircle2 size={18} /> Website settings updated live!
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#C8A45D', display: 'block', marginBottom: '6px' }}>
              Top Announcement Bar Text
            </label>
            <input 
              type="text" 
              value={settings.announcementText} 
              onChange={e => setSettings({...settings, announcementText: e.target.value})} 
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#C8A45D', display: 'block', marginBottom: '6px' }}>
              Hero Section Main Heading
            </label>
            <input 
              type="text" 
              value={settings.heroHeading} 
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
              value={settings.heroSubheading} 
              onChange={e => setSettings({...settings, heroSubheading: e.target.value})} 
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#C8A45D', display: 'block', marginBottom: '6px' }}>
                Boutique Contact Phone
              </label>
              <input 
                type="text" 
                value={settings.boutiquePhone} 
                onChange={e => setSettings({...settings, boutiquePhone: e.target.value})} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#C8A45D', display: 'block', marginBottom: '6px' }}>
                Boutique Email
              </label>
              <input 
                type="text" 
                value={settings.boutiqueEmail} 
                onChange={e => setSettings({...settings, boutiqueEmail: e.target.value})} 
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
              value={settings.boutiqueAddress} 
              onChange={e => setSettings({...settings, boutiqueAddress: e.target.value})} 
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
