import React, { useState } from 'react';
import { X, Search, SlidersHorizontal, Sparkles, Eye, ShoppingBag, Heart, ArrowLeft, Star, Grid } from 'lucide-react';
import { getProductMainImage } from '../../config/imageUtils';

export default function AllProductsModal({ isOpen, onClose, products, onQuickView, onAddToCart, onOpenHamperBuilder }) {

  if (!isOpen) return null;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(50000);
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

  // Filtering & Sorting logic
  let filtered = (products || []).filter(p => {
    if (!p) return false;
    const nameStr = String(p.name || '');
    const search = String(searchQuery || '').toLowerCase();
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = nameStr.toLowerCase().includes(search) || 
                          (Array.isArray(p.tags) && p.tags.some(t => typeof t === 'string' && t.toLowerCase().includes(search)));
    const matchesPrice = (p.discountPrice || p.price || 0) <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });


  if (sortBy === 'price-low') {
    filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
  }

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        background: '#FFF9F6',
        overflowY: 'auto',
        animation: 'fadeIn 0.3s ease-in-out'
      }}
    >
      {/* Top Header */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(255, 249, 246, 0.96)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(200, 164, 93, 0.3)',
          padding: '16px 24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
        }}
      >
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <button 
            onClick={onClose}
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(200, 164, 93, 0.4)',
              borderRadius: '30px',
              padding: '8px 18px',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: '#2E2E2E',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}
          >
            <ArrowLeft size={16} color="#C8A45D" />
            <span>Back to Store</span>
          </button>

          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#2E2E2E', margin: 0 }}>
              Complete Luxury Collection
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#9A7734', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Showing {filtered.length} Handcrafted Hampers
            </span>
          </div>

          <button
            onClick={onOpenHamperBuilder}
            className="btn-gold"
            style={{ padding: '8px 18px', fontSize: '0.82rem' }}
          >
            <Sparkles size={14} /> Custom Builder
          </button>

        </div>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '36px 24px' }}>
        
        {/* Filters & Search Toolbar */}
        <div 
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid rgba(200, 164, 93, 0.3)',
            padding: '24px',
            marginBottom: '36px',
            boxShadow: '0 10px 30px rgba(232, 183, 201, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '30px',
                  border: selectedCategory === cat ? '1px solid #C8A45D' : '1px solid rgba(0,0,0,0.08)',
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #2E2E2E 0%, #3D2D35 100%)' : '#FFF9F6',
                  color: selectedCategory === cat ? '#F4E8C1' : '#2E2E2E',
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search, Sort & Price Range */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', alignItems: 'center' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <input 
                type="text"
                placeholder="Search by name, tag, wedding..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px 10px 42px',
                  borderRadius: '12px',
                  border: '1px solid #CCC',
                  background: '#FFF9F6',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              <Search size={16} color="#C8A45D" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#666', whiteSpace: 'nowrap' }}>Sort By:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid #CCC', background: '#FFF9F6', fontSize: '0.88rem', outline: 'none' }}
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Price Filter Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E' }}>
                <span>Max Price:</span>
                <span style={{ color: '#C8A45D' }}>₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min={2000} 
                max={50000} 
                step={1000} 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))} 
                style={{ accentColor: '#C8A45D', cursor: 'pointer' }}
              />
            </div>

          </div>

        </div>

        {/* Product Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '28px' }}>
          {filtered.map((product) => {
            const isFav = favorites.includes(product._id || product.sku);

            return (
              <div 
                key={product._id || product.sku}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid rgba(232, 183, 201, 0.4)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>

                  <img 
                    src={getProductMainImage(product)} 
                    alt={product.name || 'Luxury Product'} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />



                  {product.isFeatured && (
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#C8A45D', color: '#FFF', padding: '4px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>
                      👑 Royal Collection
                    </div>
                  )}

                  <button
                    onClick={() => toggleFavorite(product._id || product.sku)}
                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    <Heart size={16} color="#C98BA2" fill={isFav ? '#C98BA2' : 'none'} />
                  </button>

                  <button
                    onClick={() => onQuickView(product)}
                    style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(255,255,255,0.92)', border: 'none', padding: '8px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600, color: '#2E2E2E', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Eye size={14} color="#C8A45D" /> Quick View
                  </button>
                </div>

                <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#9A7734', fontWeight: 600, textTransform: 'uppercase' }}>
                      {product.category}
                    </span>
                    <h3 onClick={() => onQuickView(product)} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E', margin: '4px 0 8px', cursor: 'pointer' }}>
                      {product.name}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: '12px' }}>
                    <div>
                      <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2E2E2E' }}>
                        ₹{(product.discountPrice || product.price).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      style={{ background: 'linear-gradient(135deg, #E8B7C9 0%, #D8A2B6 100%)', border: 'none', borderRadius: '20px', padding: '8px 14px', color: '#2E2E2E', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <ShoppingBag size={14} /> Add
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>No hampers found matching your filters.</p>
            <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setMaxPrice(50000); }} className="btn-gold" style={{ marginTop: '14px' }}>
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
