import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Eye, ShoppingBag, Heart, Filter, Check } from 'lucide-react';

export default function ProductGallery({ products, selectedCategory, onSelectCategory, onQuickView, onAddToCart, onOpenHamperBuilder }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  const categories = [
    'All',
    'Wedding Collection',
    'Birthday Collection',
    'Baby Collection',
    'Festival Collection',
    'Corporate Gifting',
    'Handmade Products'
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.tags && product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <section id="collection" style={{ padding: '90px 24px', background: '#FFFFFF' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Gallery Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <span className="ribbon-tag" style={{ marginBottom: '12px' }}>Curated Boutique</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.6rem', color: '#2E2E2E', marginBottom: '16px' }}>
            The Luxury <span className="title-blush-gradient">Gallery & Hampers</span>
          </h2>
          <p style={{ color: '#4A4A4A', fontSize: '1.02rem' }}>
            Filter by occasion or build your own bespoke gift box with personalized monogramming.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '48px',
            alignItems: 'center'
          }}
        >
          {/* Category Tabs */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: selectedCategory === cat ? '1px solid #C8A45D' : '1px solid rgba(0,0,0,0.08)',
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #2E2E2E 0%, #3D2D35 100%)' : '#FFF9F6',
                  color: selectedCategory === cat ? '#F4E8C1' : '#2E2E2E',
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedCategory === cat ? '0 6px 16px rgba(46,46,46,0.25)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar & Custom Builder CTA */}
          <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '600px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, position: 'relative', minWidth: '240px' }}>
              <input 
                type="text"
                placeholder="Search bridal trousseau, shagun trays, dry fruit trunks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 18px 12px 44px',
                  borderRadius: '30px',
                  border: '1px solid rgba(200, 164, 93, 0.4)',
                  background: '#FFF9F6',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <Search size={18} color="#C8A45D" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button
              onClick={onOpenHamperBuilder}
              className="btn-gold"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              <Sparkles size={16} />
              <span>Build Custom Box</span>
            </button>
          </div>
        </div>

        {/* Product Cards Masonry Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px'
          }}
        >
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product._id || product.sku);

            return (
              <div
                key={product._id || product.sku}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid rgba(232, 183, 201, 0.4)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Product Image & Badges */}
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />

                  {/* Ribbon Badge */}
                  {product.isFeatured && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        background: 'linear-gradient(135deg, #C8A45D 0%, #9A7734 100%)',
                        color: '#FFFFFF',
                        padding: '4px 12px',
                        borderRadius: '14px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(200, 164, 93, 0.4)'
                      }}
                    >
                      👑 Royal Collection
                    </div>
                  )}

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleFavorite(product._id || product.sku)}
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      background: 'rgba(255,255,255,0.85)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    <Heart size={18} color="#C98BA2" fill={isFav ? '#C98BA2' : 'none'} />
                  </button>

                  {/* Quick Action Overlay */}
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      gap: '8px'
                    }}
                  >
                    <button
                      onClick={() => onQuickView(product)}
                      style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.92)',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#2E2E2E',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <Eye size={14} color="#C8A45D" /> Quick View
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#9A7734', fontWeight: 600, textTransform: 'uppercase' }}>
                      {product.category}
                    </span>
                    
                    <h3 
                      onClick={() => onQuickView(product)}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.15rem',
                        color: '#2E2E2E',
                        margin: '6px 0',
                        cursor: 'pointer',
                        lineHeight: 1.3
                      }}
                    >
                      {product.name}
                    </h3>

                    <p style={{ fontSize: '0.82rem', color: '#666', marginBottom: '14px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <div>
                      <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2E2E2E', fontFamily: 'var(--font-sans)' }}>
                        ₹{product.discountPrice ? product.discountPrice.toLocaleString('en-IN') : product.price.toLocaleString('en-IN')}
                      </span>
                      {product.discountPrice && (
                        <span style={{ fontSize: '0.85rem', color: '#999', textDecoration: 'line-through', marginLeft: '6px' }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      style={{
                        background: 'linear-gradient(135deg, #E8B7C9 0%, #D8A2B6 100%)',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        color: '#2E2E2E',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <ShoppingBag size={14} /> Add to Bag
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>No hampers found matching your search.</p>
            <button onClick={() => { onSelectCategory('All'); setSearchQuery(''); }} className="btn-gold" style={{ marginTop: '16px' }}>
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
