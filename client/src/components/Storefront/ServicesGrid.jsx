import React, { useState } from 'react';
import { Gift, Heart, Sparkles, Crown, Baby, Cake, Building, Palette, ArrowRight } from 'lucide-react';

export default function ServicesGrid({ onSelectCategory }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 'rakhi',
      title: 'Rakhi',
      tagline: 'Designer Rakhis & Combos',
      icon: <Crown size={28} color="#C8A45D" />,
      image: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Rakhi',
      items: ['Premium Pearl Rakhis', 'Silver Filigree Designs', 'Bhagat Rakhi Combos', 'Sweets & Chocolates Packs'],
      badge: 'Festive Special'
    },
    {
      id: 'keychains',
      title: 'Keychains',
      tagline: 'Bespoke Resin Art',
      icon: <Palette size={28} color="#E8B7C9" />,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Keychains',
      items: ['Custom Name Keychains', 'Rose Gold Glitter Charms', 'Photo Embed Keyrings', 'Premium Leather Key Loops'],
      badge: 'Trending'
    },
    {
      id: 'birthday',
      title: 'Birthday',
      tagline: 'Personalized Greeting Packs',
      icon: <Cake size={28} color="#C8A45D" />,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Birthday',
      items: ['Explosion Card Boxes', 'Gourmet Chocolate Tins', 'Special Message Scrolls', 'Decorated Keepsakes'],
      badge: 'Popular'
    },
    {
      id: 'anniversary',
      title: 'Anniversary',
      tagline: 'Memorable Couple Gifts',
      icon: <Heart size={28} color="#E8B7C9" />,
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Anniversary',
      items: ['Custom Photo Scrapbooks', 'Engraved Brass Coasters', 'His & Hers Hamper Trays', 'Velvet Memory Albums'],
      badge: 'Elegant'
    },
    {
      id: 'wedding',
      title: 'Wedding',
      tagline: 'Bridal Packing & Trays',
      icon: <Crown size={28} color="#C8A45D" />,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Wedding',
      items: ['Velvet Trousseau Chests', 'Carved Mirror Shagun Trays', 'Traditional Gota Haldi Trays', 'Engagement Ring Boxes'],
      badge: 'Maharani Class'
    },
    {
      id: 'corporate',
      title: 'Corporate',
      tagline: 'Welcome Kits & Branding',
      icon: <Building size={28} color="#E8B7C9" />,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
      categoryFilter: 'Corporate',
      items: ['Leather Journal Planners', 'VIP Executive Gift Trunks', 'Branded Metal Pens', 'Custom Client Appreciation Packs'],
      badge: 'Bulk Discount'
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
            Explore our handcrafted collections. Click on any category to view and order premium designer gifts.
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
                        padding: '12px',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
                      }}
                    >
                      <span>Explore Category</span>
                      <ArrowRight size={14} />
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
