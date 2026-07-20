import React, { useState } from 'react';
import { Palette, Scissors, Sparkles, Box, Truck, Heart } from 'lucide-react';

export default function AboutSection() {
  const [activeStep, setActiveStep] = useState(2); // Default to Handmade

  const timelineSteps = [
    {
      id: 0,
      title: "1. Sketch & Theme",
      subtitle: "Personalized Concept",
      icon: <Palette size={20} />,
      desc: "Every order begins with an initial consultation to map your occasion theme, color palette (Blush, Gold, Pastel), budget, and special recipient requirements.",
      tag: "Design Phase"
    },
    {
      id: 1,
      title: "2. Artisan Sourcing",
      subtitle: "Jaipur Heritage",
      icon: <Scissors size={20} />,
      desc: "We handpick pure velvet fabrics, hand-carved hardboards, authentic zari borders, brass buckles, and fresh botanicals directly from Jaipur artisans.",
      tag: "Materials"
    },
    {
      id: 2,
      title: "3. Handcrafted Crafting",
      subtitle: "Precision & Love",
      icon: <Sparkles size={20} />,
      desc: "Vartika & our senior master artisans meticulously assemble each hamper by hand—stitching ribbons, hot-stamping gold monogram initials, and lining velvet trays.",
      tag: "100% Handmade"
    },
    {
      id: 3,
      title: "4. Luxury Packaging",
      subtitle: "Satin & Fragrance",
      icon: <Box size={20} />,
      desc: "Each item is cushioned in anti-tarnish tissue, scented with rose essence, tied with double-faced satin bows, and sealed with custom wax monograms.",
      tag: "Final Finishing"
    },
    {
      id: 4,
      title: "5. Safe Delivery",
      subtitle: "Doorstep Delight",
      icon: <Truck size={20} />,
      desc: "Packed inside reinforced shockproof outer cases. Delivered express across Jaipur, all major Indian metro cities, and international wedding destinations.",
      tag: "Express Shipping"
    }
  ];

  return (
    <section id="about" style={{ padding: '90px 24px', background: '#FFFFFF', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <span className="ribbon-tag" style={{ marginBottom: '12px' }}>The Heart of Blossom</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: '#2E2E2E', marginBottom: '16px' }}>
            Meet Founder <span className="title-blush-gradient">Vartika Gupta</span>
          </h2>
          <p style={{ color: '#4A4A4A', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Born in the vibrant Pink City of Jaipur, Vartika founded <strong>Blossom by Vartika</strong> with a single mission: to transform standard gifting into emotional, unforgettable works of art.
          </p>
        </div>

        {/* Story Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '75px'
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
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800" 
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
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E' }}>10,000+ Gifts Packed</h4>
                <p style={{ fontSize: '0.8rem', color: '#4A4A4A' }}>Trusted by Brides & Planners</p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#2E2E2E', marginBottom: '20px' }}>
              Why Blossom Gifts Are Treasured Forever
            </h3>
            <p style={{ color: '#4A4A4A', fontSize: '1rem', marginBottom: '24px', lineHeight: 1.7 }}>
              Unlike mass-manufactured boxes, every hamper created at our Jaipur studio carries individual character. We combine royal Rajasthani heritage motifs with modern minimalist French aesthetics.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { title: "Custom Theme Matching", detail: "Color-coordinated to match your wedding outfit or event decor." },
                { title: "Monogram Personalization", detail: "Custom foil printing with initials, dates, and handwritten scrolls." },
                { title: "Eco-Conscious Keepsakes", detail: "Reusable velvet trunks and rigid boxes built to last a lifetime." }
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

        {/* Animated Craft Journey Timeline */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)',
            padding: '40px 28px',
            borderRadius: '24px',
            border: '1px solid rgba(200, 164, 93, 0.3)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#2E2E2E' }}>
              The Craft Journey Timeline
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#4A4A4A' }}>
              Click each step to see how your gift moves from concept to doorstep
            </p>
          </div>

          {/* Step Buttons */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '16px',
              marginBottom: '28px'
            }}
          >
            {timelineSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                style={{
                  flex: '1',
                  minWidth: '150px',
                  background: activeStep === step.id ? '#2E2E2E' : '#FFFFFF',
                  color: activeStep === step.id ? '#F4E8C1' : '#2E2E2E',
                  border: activeStep === step.id ? '1px solid #C8A45D' : '1px solid rgba(0,0,0,0.08)',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left',
                  boxShadow: activeStep === step.id ? '0 8px 20px rgba(46,46,46,0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ color: activeStep === step.id ? '#C8A45D' : '#C98BA2' }}>{step.icon}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{step.tag}</span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{step.title}</div>
              </button>
            ))}
          </div>

          {/* Active Step Details Panel */}
          <div 
            style={{
              background: '#FFFFFF',
              padding: '24px 28px',
              borderRadius: '16px',
              borderLeft: '4px solid #C8A45D',
              boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: '#9A7734', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                {timelineSteps[activeStep].subtitle}
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#2E2E2E', margin: '4px 0 8px' }}>
                {timelineSteps[activeStep].title}
              </h4>
              <p style={{ color: '#4A4A4A', fontSize: '0.95rem', maxWidth: '780px', lineHeight: 1.6 }}>
                {timelineSteps[activeStep].desc}
              </p>
            </div>

            <div style={{ background: '#F8E3EC', color: '#2E2E2E', padding: '10px 18px', borderRadius: '30px', fontWeight: 600, fontSize: '0.85rem' }}>
              Step {activeStep + 1} of 5
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
