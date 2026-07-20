import React from 'react';
import { Palette, MessageSquare, Eye, Scissors, ShieldCheck, Box, Truck } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    { title: '1. Choose Theme', desc: 'Select occasion, colors & budget', icon: <Palette size={22} color="#C8A45D" /> },
    { title: '2. Share Details', desc: 'Custom initials, messages & dates', icon: <MessageSquare size={22} color="#E8B7C9" /> },
    { title: '3. Design Preview', desc: 'Digital layout & material sample', icon: <Eye size={22} color="#C8A45D" /> },
    { title: '4. Handcrafting', desc: 'Artisanal assembly in Jaipur', icon: <Scissors size={22} color="#E8B7C9" /> },
    { title: '5. Quality Check', desc: 'Rigorous finishing & velvet inspect', icon: <ShieldCheck size={22} color="#C8A45D" /> },
    { title: '6. Luxury Packing', desc: 'Satin ribbons & rose essence', icon: <Box size={22} color="#E8B7C9" /> },
    { title: '7. Doorstep Delivery', desc: 'Express shipping nationwide', icon: <Truck size={22} color="#C8A45D" /> }
  ];

  return (
    <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        
        <span className="ribbon-tag" style={{ marginBottom: '12px' }}>How We Work</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#2E2E2E', marginBottom: '48px' }}>
          The 7-Step <span className="title-gold-gradient">Handcrafting Process</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          {steps.map((step, index) => (
            <div 
              key={index}
              style={{
                background: '#FFF9F6',
                border: '1px solid rgba(232, 183, 201, 0.4)',
                borderRadius: '20px',
                padding: '24px 16px',
                transition: 'transform 0.3s ease',
                boxShadow: '0 8px 20px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', boxShadow: '0 4px 12px rgba(200, 164, 93, 0.2)' }}>
                {step.icon}
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#2E2E2E', marginBottom: '6px' }}>{step.title}</h4>
              <p style={{ fontSize: '0.78rem', color: '#666', lineHeight: 1.4 }}>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
