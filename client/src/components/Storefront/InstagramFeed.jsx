import React from 'react';
import { Instagram, Play, Heart, ExternalLink } from 'lucide-react';

export default function InstagramFeed() {
  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400', likes: '1.2k', title: 'Royal Bridal Packing Unboxing' },
    { id: 2, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400', likes: '980', title: 'Jaipur Velvet Ribbon Details' },
    { id: 3, image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=400', likes: '2.4k', title: 'Diwali Trunk Gold Foil Reveal' },
    { id: 4, image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400', likes: '1.5k', title: 'Pastel Baby Announcement Box' }
  ];

  return (
    <section style={{ padding: '80px 24px', background: 'var(--cream-bg)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
          <div>
            <span className="ribbon-tag" style={{ marginBottom: '8px' }}>@blossombyvartika</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#2E2E2E' }}>
              Follow Our <span className="title-blush-gradient">Instagram Studio</span>
            </h2>
          </div>

          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer"
            className="btn-gold"
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
          >
            <Instagram size={18} /> Follow on Instagram
          </a>
        </div>

        {/* Masonry Reel Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {posts.map((post) => (
            <div 
              key={post.id}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                height: '280px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                border: '1px solid rgba(200,164,93,0.3)'
              }}
            >
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '16px',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ background: 'rgba(255,255,255,0.25)', padding: '6px', borderRadius: '50%', backdropFilter: 'blur(4px)' }}>
                    <Play size={14} color="#FFF" fill="#FFF" />
                  </div>
                </div>

                <div>
                  <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#FFF', margin: '0 0 4px' }}>{post.title}</h5>
                  <span style={{ fontSize: '0.8rem', color: '#F4E8C1', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Heart size={12} fill="#C98BA2" color="#C98BA2" /> {post.likes} likes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
