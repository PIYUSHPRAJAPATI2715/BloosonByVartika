import React from 'react';
import { Heart } from 'lucide-react';

export default function AboutSection({ websiteSettings }) {
  const aboutTitle = websiteSettings?.aboutTitle || "Founder Vartika Gupta";
  const aboutHeading = websiteSettings?.aboutHeading || "Meet Founder Vartika Gupta";
  const aboutDesc = websiteSettings?.aboutDescription || "Born in the vibrant Pink City of Jaipur, Vartika founded Blossom by Vartika with a single mission: to transform standard gifting into emotional, unforgettable works of art.";
  const aboutImg = websiteSettings?.aboutImage || "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800";
  const badgeText = websiteSettings?.aboutBadgeText || "10,000+ Gifts Packed";
  const badgeSub = websiteSettings?.aboutBadgeSub || "Trusted by Brides & Planners";
  
  const valuesTitle = websiteSettings?.aboutValuesTitle || "Why Blossom Gifts Are Treasured Forever";
  const valuesDesc = websiteSettings?.aboutValuesDesc || "Unlike mass-manufactured boxes, every gift created at our Jaipur studio carries individual character. We combine royal Rajasthani heritage motifs with modern minimalist French aesthetics.";
  
  const value1Title = websiteSettings?.aboutValue1Title || "Custom Theme Matching";
  const value1Desc = websiteSettings?.aboutValue1Desc || "Color-coordinated to match your wedding outfit or event decor.";
  const value2Title = websiteSettings?.aboutValue2Title || "Monogram Personalization";
  const value2Desc = websiteSettings?.aboutValue2Desc || "Custom foil printing with initials, dates, and handwritten scrolls.";
  const value3Title = websiteSettings?.aboutValue3Title || "Eco-Conscious Keepsakes";
  const value3Desc = websiteSettings?.aboutValue3Desc || "Reusable trunks and rigid boxes built to last a lifetime.";

  return (
    <section id="about" style={{ padding: '90px 24px', background: '#FFFFFF', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <span className="ribbon-tag" style={{ marginBottom: '12px' }}>{aboutTitle}</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: '#2E2E2E', marginBottom: '16px' }}>
            {aboutHeading}
          </h2>
          <p style={{ color: '#4A4A4A', fontSize: '1.05rem', lineHeight: 1.7 }}>
            {aboutDesc}
          </p>
        </div>

        {/* Story Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          {/* Studio Image & Card */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(232, 183, 201, 0.3)',
                border: '4px solid #FFF9F6'
              }}
            >
              <img 
                src={aboutImg} 
                alt="Blossom Studio Crafting" 
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Floating Badge */}
            <div 
              className="glass-panel"
              style={{
                position: 'absolute',
                bottom: '-25px',
                right: '20px',
                padding: '16px 24px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div style={{ background: '#C8A45D', color: '#FFF', borderRadius: '50%', padding: '10px' }}>
                <Heart size={20} fill="#FFF" />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E' }}>{badgeText}</h4>
                <p style={{ fontSize: '0.8rem', color: '#4A4A4A' }}>{badgeSub}</p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#2E2E2E', marginBottom: '20px' }}>
              {valuesTitle}
            </h3>
            <p style={{ color: '#4A4A4A', fontSize: '1rem', marginBottom: '24px', lineHeight: 1.7 }}>
              {valuesDesc}
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { title: value1Title, detail: value1Desc },
                { title: value2Title, detail: value2Desc },
                { title: value3Title, detail: value3Desc }
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#C8A45D', fontWeight: 'bold', fontSize: '1.2rem' }}>✦</span>
                  <div>
                    <strong style={{ color: '#2E2E2E', display: 'block', fontSize: '0.98rem' }}>{item.title}</strong>
                    <span style={{ color: '#4A4A4A', fontSize: '0.88rem' }}>{item.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
