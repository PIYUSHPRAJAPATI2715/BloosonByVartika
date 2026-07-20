import React, { useState } from 'react';
import { Gift, Heart, Sparkles, Crown, Baby, Cake, Building, Palette, ArrowRight } from 'lucide-react';

export default function ServicesGrid({ onSelectCategory, onOpenCustomOrder }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 'wedding',
      title: 'Wedding Collection',
      tagline: 'Royal Trousseau & Shagun Trays',
      icon: <Crown size={28} color="#C8A45D" />,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Wedding Collection',
      items: ['Bridal Trousseau Packing', 'Shagun Trays & Ring Boxes', 'Mehendi & Haldi Hampers', 'Sangeet Return Favors'],
      badge: 'Bestseller'
    },
    {
      id: 'birthday',
      title: 'Birthday Collection',
      tagline: 'Surprise Boxes & Money Hampers',
      icon: <Cake size={28} color="#E8B7C9" />,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Birthday Collection',
      items: ['Birthday Gift Hampers', 'Personalized Money Boxes', 'Kids Birthday Surprises', 'Memory Scrapbooks'],
      badge: 'Popular'
    },
    {
      id: 'baby',
      title: 'Baby Collection',
      tagline: 'Newborn Welcome & Shower Chests',
      icon: <Baby size={28} color="#C8A45D" />,
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Baby Collection',
      items: ['Baby Shower Hampers', 'Newborn Welcome Chests', 'Naming Ceremony Gifts', 'Announcement Boxes'],
      badge: 'Precious'
    },
    {
      id: 'festival',
      title: 'Festival Collection',
      tagline: 'Gold Foil Diwali & Rakhi Hampers',
      icon: <Sparkles size={28} color="#E8B7C9" />,
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Festival Collection',
      items: ['Diwali Gold Foil Trunks', 'Handmade Rakhi Hampers', 'Karwa Chauth Trays', 'Holi & Christmas Boxes'],
      badge: 'Seasonal'
    },
    {
      id: 'corporate',
      title: 'Corporate Gifting',
      tagline: 'Executive Welcome & Client Kits',
      icon: <Building size={28} color="#C8A45D" />,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Corporate Gifting',
      items: ['Employee Welcome Kits', 'Client Appreciation Hampers', 'Festive Corporate Branding', 'Event Gift Trunks'],
      badge: 'Bulk Discount'
    },
    {
      id: 'handmade',
      title: 'Handmade Products',
      tagline: 'Explosion Boxes & Velvet Cards',
      icon: <Palette size={28} color="#E8B7C9" />,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Handmade Products',
      items: ['3D Photo Explosion Boxes', 'Handcrafted Velvet Cards', 'Custom Gift Tags', 'Floral Packaging'],
      badge: 'Customizable'
    }
  ];

  return (
    <section id="services" style={{ padding: '90px 24px', background: 'var(--cream-bg)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px' }}>
          <span className="ribbon-tag" style={{ marginBottom: '12px' }}>Curated Collections</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: '#2E2E2E', marginBottom: '16px' }}>
            Handcrafted for <span className="title-gold-gradient">Every Celebration</span>
          </h2>
          <p style={{ color: '#4A4A4A', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Explore our themed hampers. Hover over any gift box card to unlock the handcrafted treasures inside.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}
        >
          {services.map((service) => {
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: isHovered ? '2px solid #C8A45D' : '1px solid rgba(232, 183, 201, 0.4)',
                  boxShadow: isHovered ? '0 20px 40px rgba(200, 164, 93, 0.25)' : '0 10px 30px rgba(0,0,0,0.04)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-8px)' : 'none',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Ribbon Tag Top Right */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: isHovered ? '#2E2E2E' : '#FFF9F6',
                    color: isHovered ? '#F4E8C1' : '#2E2E2E',
                    border: '1px solid rgba(200, 164, 93, 0.4)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    zIndex: 3
                  }}
                >
                  {service.badge}
                </div>

                {/* Card Image Area with Gift Box Lid Animation Overlay */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                    }}
                  />

                  {/* Dark Glass Overlay */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '20px',
                      zIndex: 2
                    }}
                  >
                    <div style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.9)', padding: '10px', borderRadius: '50%' }}>
                        {service.icon}
                      </div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFFFFF' }}>
                          {service.title}
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: '#F4E8C1' }}>{service.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body - Content & Checklist */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {service.items.map((item, i) => (
                      <li key={i} style={{ fontSize: '0.88rem', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#C8A45D' }}>🎀</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => onSelectCategory(service.categoryFilter)}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)',
                        border: '1px solid #C8A45D',
                        color: '#2E2E2E',
                        padding: '10px',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>Explore</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      onClick={onOpenCustomOrder}
                      style={{
                        background: '#2E2E2E',
                        color: '#F4E8C1',
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      Customize
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
