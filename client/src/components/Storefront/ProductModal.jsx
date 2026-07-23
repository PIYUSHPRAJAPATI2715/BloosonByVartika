import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Sparkles, Heart, Plus, Minus } from 'lucide-react';
import { getProductImages } from '../../config/imageUtils';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const images = getProductImages(product);

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customMsg, setCustomMsg] = useState('');

  const currentPrice = selectedVariant ? selectedVariant.price : (product.discountPrice || product.price);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant ? selectedVariant.name : 'Standard', quantity, customMsg);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '920px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          position: 'relative',
          border: '1px solid #C8A45D'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#FFF',
            border: '1px solid #DDD',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 5
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', padding: '36px' }}>
          
          {/* Left: Product Images Carousel */}
          <div>
            <div 
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                height: '360px',
                marginBottom: '14px',
                border: '1px solid rgba(232, 183, 201, 0.4)'
              }}
            >
              <img 
                src={images[activeImgIndex] || images[0]} 
                alt={product.name || 'Luxury Product'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Product thumbnail"
                    onClick={() => setActiveImgIndex(i)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: activeImgIndex === i ? '2px solid #C8A45D' : '1px solid rgba(0,0,0,0.1)'
                    }}
                  />
                ))}
              </div>
            )}

            {/* Product Specifications */}
            <div style={{ marginTop: '24px', background: '#FFF9F6', padding: '16px', borderRadius: '14px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#777' }}>Material Used:</span>
                <span style={{ fontWeight: 600, color: '#2E2E2E' }}>{product.materialUsed || 'Handcrafted Hardboard'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#777' }}>Dimensions:</span>
                <span style={{ fontWeight: 600, color: '#2E2E2E' }}>{product.dimensions || '12 x 12 inches'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#777' }}>Delivery Time:</span>
                <span style={{ fontWeight: 600, color: '#C8A45D' }}>{product.deliveryTime || '3-5 Business Days'}</span>
              </div>
            </div>
          </div>

          {/* Right: Details & Custom Options */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="ribbon-tag" style={{ marginBottom: '10px' }}>{product.category}</span>
              
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#2E2E2E', margin: '8px 0 10px' }}>
                {product.name}
              </h2>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px', fontSize: '0.88rem' }}>
                <Star size={16} color="#C8A45D" fill="#C8A45D" />
                <span style={{ fontWeight: 700, color: '#2E2E2E' }}>{product.rating || 5.0}</span>
                <span style={{ color: '#777' }}>({product.reviewCount || 28} Verified Reviews)</span>
              </div>

              {/* Price */}
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2E2E2E', marginBottom: '20px' }}>
                ₹{currentPrice.toLocaleString('en-IN')}
              </div>

              <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                {product.description}
              </p>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '8px' }}>
                    Select Edition / Size:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {product.variants.map((variant, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(variant)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          border: selectedVariant?.name === variant.name ? '2px solid #C8A45D' : '1px solid rgba(0,0,0,0.15)',
                          background: selectedVariant?.name === variant.name ? '#FFF9F6' : '#FFFFFF',
                          color: '#2E2E2E',
                          fontWeight: selectedVariant?.name === variant.name ? 700 : 400,
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        {variant.name} (₹{variant.price.toLocaleString('en-IN')})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Message Card Input */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#2E2E2E', marginBottom: '6px' }}>
                  Custom Gift Card Message (Free):
                </label>
                <textarea 
                  placeholder="e.g., Happy Wedding Ananya & Rohan! With love, From Vartika..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid rgba(200, 164, 93, 0.4)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    background: '#FFF9F6'
                  }}
                />
              </div>

              {/* Quantity Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Quantity:</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '20px', background: '#FFF9F6' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '6px 12px', border: 'none', background: 'none', cursor: 'pointer' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ padding: '0 12px', fontWeight: 700, fontSize: '0.9rem' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '6px 12px', border: 'none', background: 'none', cursor: 'pointer' }}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleAdd}
                className="btn-gold"
                style={{ flex: 1, justifyContent: 'center', padding: '14px' }}
              >
                <ShoppingBag size={18} />
                <span>Add to Shopping Bag • ₹{(currentPrice * quantity).toLocaleString('en-IN')}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
