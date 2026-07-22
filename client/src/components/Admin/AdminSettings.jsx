import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle2, Globe, Phone, MapPin, Sparkles, Gift, Image } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function AdminSettings({ onSettingsUpdated }) {
  const [settings, setSettings] = useState({
    announcementText: "👑 JAIPUR STUDIO OPEN FOR LUXURY BRIDAL TROUSSEAU & FESTIVAL BOOKINGS",
    heroHeading: "Every Gift Tells a Story",
    heroSubheading: "Luxury Handmade Hampers & Trousseau Packaging crafted with love in Jaipur.",
    address: "Shop No G3, Ganesham 2, Nursery Cir, Indraprastha Colony, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021",
    contactPhone: "+91 98280 23641",
    contactEmail: "vartika1594@gmail.com",
    boutiqueAddress: "Shop No G3, Ganesham 2, Nursery Cir, Indraprastha Colony, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021",
    boutiquePhone: "+91 98280 23641",
    boutiqueEmail: "vartika1594@gmail.com",
    aboutTitle: "Founder Vartika Gupta",
    aboutHeading: "Meet Founder Vartika Gupta",
    aboutDescription: "Born in the vibrant Pink City of Jaipur, Vartika founded Blossom by Vartika with a single mission: to transform standard gifting into emotional, unforgettable works of art.",
    aboutImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    aboutBadgeText: "10,000+ Gifts Packed",
    aboutBadgeSub: "Trusted by Brides & Planners",
    aboutValuesTitle: "Why Blossom Gifts Are Treasured Forever",
    aboutValuesDesc: "Unlike mass-manufactured boxes, every gift created at our Jaipur studio carries individual character. We combine royal Rajasthani heritage motifs with modern minimalist French aesthetics.",
    aboutValue1Title: "Custom Theme Matching",
    aboutValue1Desc: "Color-coordinated to match your wedding outfit or event decor.",
    aboutValue2Title: "Monogram Personalization",
    aboutValue2Desc: "Custom foil printing with initials, dates, and handwritten scrolls.",
    aboutValue3Title: "Eco-Conscious Keepsakes",
    aboutValue3Desc: "Reusable trunks and rigid boxes built to last a lifetime."
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressed = canvas.toDataURL('image/jpeg', 0.75);
          setSettings(prev => ({ ...prev, aboutImage: compressed }));
        };
      };
    }
  };

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

          {/* About Us & Founder Section Customizer */}
          <div style={{ background: '#1E1E1E', borderRadius: '16px', padding: '20px', border: '1px solid rgba(200,164,93,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#F4E8C1', fontWeight: 700, fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>
              <Globe size={18} color="#C8A45D" /> Founder & "About Us" Section Settings
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>About Section Title Tag</label>
                  <input 
                    type="text" 
                    value={settings.aboutTitle || ''} 
                    onChange={e => setSettings({...settings, aboutTitle: e.target.value})} 
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Founder Photo</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <label 
                      htmlFor="founder-photo-upload-input"
                      style={{
                        flex: 1,
                        background: 'rgba(200, 164, 93, 0.1)',
                        border: '1px dashed #C8A45D',
                        borderRadius: '10px',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        color: '#C8A45D',
                        fontWeight: 600,
                        textAlign: 'center'
                      }}
                    >
                      Upload File
                    </label>
                    <input 
                      id="founder-photo-upload-input"
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      style={{ display: 'none' }} 
                    />
                    <input 
                      type="text" 
                      placeholder="Or paste photo URL..." 
                      value={settings.aboutImage && settings.aboutImage.startsWith('data:') ? 'Local Image File Loaded' : settings.aboutImage || ''} 
                      onChange={e => setSettings({...settings, aboutImage: e.target.value})} 
                      style={{ flex: 2, padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.82rem', outline: 'none' }} 
                    />
                  </div>
                  {settings.aboutImage && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#282828', padding: '6px 10px', borderRadius: '8px', border: '1px solid #333' }}>
                      <img src={settings.aboutImage} alt="Preview" style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
                      <span style={{ fontSize: '0.72rem', color: '#4CAF50', fontWeight: 600 }}>✓ Image Loaded</span>
                      <button type="button" onClick={() => setSettings({...settings, aboutImage: ''})} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#E57373', fontSize: '0.72rem', cursor: 'pointer' }}>Remove</button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Main Section Heading</label>
                <input 
                  type="text" 
                  value={settings.aboutHeading || ''} 
                  onChange={e => setSettings({...settings, aboutHeading: e.target.value})} 
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Founder Bio Description</label>
                <textarea 
                  rows={3}
                  value={settings.aboutDescription || ''} 
                  onChange={e => setSettings({...settings, aboutDescription: e.target.value})} 
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Floating Badge Headline</label>
                  <input 
                    type="text" 
                    value={settings.aboutBadgeText || ''} 
                    onChange={e => setSettings({...settings, aboutBadgeText: e.target.value})} 
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Floating Badge Subtitle</label>
                  <input 
                    type="text" 
                    value={settings.aboutBadgeSub || ''} 
                    onChange={e => setSettings({...settings, aboutBadgeSub: e.target.value})} 
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', marginTop: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#C8A45D', display: 'block', marginBottom: '10px' }}>
                  Core Values Section Content
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Values Main Heading</label>
                    <input 
                      type="text" 
                      value={settings.aboutValuesTitle || ''} 
                      onChange={e => setSettings({...settings, aboutValuesTitle: e.target.value})} 
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Values Intro Subtext</label>
                    <textarea 
                      rows={2}
                      value={settings.aboutValuesDesc || ''} 
                      onChange={e => setSettings({...settings, aboutValuesDesc: e.target.value})} 
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#AAA' }}>Value 1 Title</label>
                      <input type="text" value={settings.aboutValue1Title || ''} onChange={e => setSettings({...settings, aboutValue1Title: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.85rem' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#AAA' }}>Value 1 Description</label>
                      <input type="text" value={settings.aboutValue1Desc || ''} onChange={e => setSettings({...settings, aboutValue1Desc: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.85rem' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#AAA' }}>Value 2 Title</label>
                      <input type="text" value={settings.aboutValue2Title || ''} onChange={e => setSettings({...settings, aboutValue2Title: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.85rem' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#AAA' }}>Value 2 Description</label>
                      <input type="text" value={settings.aboutValue2Desc || ''} onChange={e => setSettings({...settings, aboutValue2Desc: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.85rem' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#AAA' }}>Value 3 Title</label>
                      <input type="text" value={settings.aboutValue3Title || ''} onChange={e => setSettings({...settings, aboutValue3Title: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.85rem' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#AAA' }}>Value 3 Description</label>
                      <input type="text" value={settings.aboutValue3Desc || ''} onChange={e => setSettings({...settings, aboutValue3Desc: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #555', background: '#282828', color: '#FFF', fontSize: '0.85rem' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-gold" style={{ justifyContent: 'center', padding: '12px', marginTop: '10px' }}>
            <Save size={16} /> Save Live Changes
          </button>
        </form>
      </div>

    </div>
  );
}
