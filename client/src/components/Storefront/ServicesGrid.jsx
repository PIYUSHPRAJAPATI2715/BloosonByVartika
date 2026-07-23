import React, { useState, useEffect } from 'react';
import { Gift, Heart, Sparkles, Crown, Baby, Cake, Building, Palette, ArrowRight } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function ServicesGrid({ onSelectCategory }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = () => {
    setLoading(true);
    fetch(getApiUrl('/api/categories'))
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const sorted = [...data.data].sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

          const mapped = sorted.map(cat => {
            const catName = String(cat?.name || '');
            const nameLower = catName.toLowerCase();



            let icon = <Gift size={28} color="#C8A45D" />;
            let badge = 'Collection';

            if (nameLower.includes('rakhi')) {
              icon = <Crown size={28} color="#C8A45D" />;
              badge = 'Festive Special';
            } else if (nameLower.includes('keychain')) {
              icon = <Palette size={28} color="#E8B7C9" />;
              badge = 'Trending';
            } else if (nameLower.includes('birth')) {
              icon = <Cake size={28} color="#C8A45D" />;
              badge = 'Popular';
            } else if (nameLower.includes('anniv') || nameLower.includes('couple') || nameLower.includes('love')) {
              icon = <Heart size={28} color="#E8B7C9" />;
              badge = 'Elegant';
            } else if (nameLower.includes('wed') || nameLower.includes('bridal') || nameLower.includes('trousseau')) {
              icon = <Crown size={28} color="#C8A45D" />;
              badge = 'Maharani Class';
            } else if (nameLower.includes('corp') || nameLower.includes('office')) {
              icon = <Building size={28} color="#E8B7C9" />;
              badge = 'Bulk Discount';
            } else if (nameLower.includes('baby')) {
              icon = <Gift size={28} color="#C8A45D" />;
              badge = 'Newborn Special';
            }

            let items = ['Handcrafted custom designs', 'Premium luxury packaging', 'Personalized greeting inserts'];
            if (cat.description) {
              const parts = cat.description.split(/[,.;]/).map(s => s.trim()).filter(Boolean);
              if (parts.length >= 2) {
                items = parts.slice(0, 3).map(p => p.charAt(0).toUpperCase() + p.slice(1));
              }
            }

            return {
              id: cat._id,
              title: cat.name,
              tagline: cat.description || 'Luxury handcrafted gifts and bespoke hampers.',
              icon,
              image: cat.banner || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
              categoryFilter: cat.name,
              items,
              badge
            };
          });
          setServices(mapped);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn("Services grid fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => { loadCategories(); }, []);

  // Skeleton loader animation style
  const skeletonStyle = {
    background: 'linear-gradient(90deg, #f0e8e8 25%, #fdf5f5 50%, #f0e8e8 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s infinite',
    borderRadius: '12px'
  };

  return (
    <section id="services" style={{ padding: '90px 24px', background: 'var(--cream-bg)' }}>
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
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

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ background: '#fff', borderRadius: '24px', border: '1px solid rgba(232,183,201,0.3)', overflow: 'hidden' }}>
                <div style={{ ...skeletonStyle, height: '220px', borderRadius: 0 }} />
                <div style={{ padding: '24px' }}>
                  <div style={{ ...skeletonStyle, height: '16px', width: '60%', marginBottom: '12px' }} />
                  <div style={{ ...skeletonStyle, height: '12px', width: '90%', marginBottom: '8px' }} />
                  <div style={{ ...skeletonStyle, height: '12px', width: '75%', marginBottom: '8px' }} />
                  <div style={{ ...skeletonStyle, height: '12px', width: '80%', marginBottom: '20px' }} />
                  <div style={{ ...skeletonStyle, height: '44px', borderRadius: '20px' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No categories yet */}
        {!loading && services.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>No categories added yet.</p>
            <p style={{ fontSize: '0.9rem' }}>Add categories from the Admin panel to display them here.</p>
          </div>
        )}

        {/* Services Grid */}
        {!loading && services.length > 0 && <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}
        >
          {displayServices.map((service) => {
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                className="tilt-card-3d"
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: isHovered ? '2px solid #C8A45D' : '1px solid rgba(232, 183, 201, 0.4)',
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
        </div>}

      </div>
    </section>
  );
}
