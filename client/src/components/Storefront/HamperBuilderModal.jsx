import React, { useState } from 'react';
import { X, Gift, Sparkles, Check, Plus, ShoppingBag, Palette } from 'lucide-react';

export default function HamperBuilderModal({ onClose, onAddToCart }) {
  const [selectedBox, setSelectedBox] = useState({ name: 'Royal Blush Velvet Chest', price: 3500 });
  const [selectedTheme, setSelectedTheme] = useState('Blush Pink & Antique Gold');
  const [selectedItems, setSelectedItems] = useState([
    { name: 'Artisanal Almonds & Cashews Jar', price: 1200 },
    { name: 'Solid Brass Floral Diya Pair', price: 1400 }
  ]);
  const [monogramText, setMonogramText] = useState('V & S');

  const boxOptions = [
    { name: 'Royal Blush Velvet Chest', price: 3500, desc: 'Plush velvet casing with antique brass lock' },
    { name: 'Champagne Leatherette Trunk', price: 4800, desc: 'Gold embossed trunk with double leather straps' },
    { name: 'Carved Royal Wooden Box', price: 2900, desc: 'Jaipur hand-carved floral motif wood' }
  ];

  const themeOptions = [
    'Blush Pink & Antique Gold',
    'Royal Emerald & Zari',
    'Ruby Red & Pure Silk',
    'Champagne Ivory & Brocade'
  ];

  const treatOptions = [
    { id: 1, name: 'Artisanal Almonds & Cashews Jar', price: 1200 },
    { id: 2, name: 'Solid Brass Floral Diya Pair', price: 1400 },
    { id: 3, name: 'Organic Scented Soy Candle', price: 850 },
    { id: 4, name: 'Mini 3D Photo Album Keepsake', price: 1500 },
    { id: 5, name: 'Handcrafted Zari Shagun Envelope', price: 450 },
    { id: 6, name: 'Gourmet Artisanal Chocolates (9pc)', price: 950 }
  ];

  const toggleItem = (item) => {
    if (selectedItems.some(i => i.name === item.name)) {
      setSelectedItems(selectedItems.filter(i => i.name !== item.name));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const totalCalculatedPrice = selectedBox.price + selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleFinish = () => {
    const customHamperProduct = {
      _id: 'custom-' + Date.now(),
      name: `Bespoke Hamper (${selectedBox.name})`,
      category: 'Custom Builder',
      price: totalCalculatedPrice,
      images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800'],
      description: `Monogram: '${monogramText}' | Theme: ${selectedTheme} | Includes: ${selectedItems.map(i => i.name).join(', ')}`
    };
    onAddToCart(customHamperProduct, 'Custom Built', 1, `Monogram: ${monogramText}`);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.7)',
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
          maxWidth: '880px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          position: 'relative',
          border: '2px solid #C8A45D'
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: '#FFF9F6',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ padding: '36px' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="ribbon-tag" style={{ marginBottom: '8px' }}>
              <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} /> Interactive Studio
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#2E2E2E' }}>
              Build Your <span className="title-blush-gradient">Bespoke Hamper</span>
            </h2>
            <p style={{ color: '#666', fontSize: '0.92rem' }}>
              Select your trunk base, theme color, monogram, and curated contents in real time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            
            {/* Left Controls */}
            <div>
              {/* Step 1: Trunk Box */}
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E', marginBottom: '12px' }}>
                  1. Choose Box & Trunk Base
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {boxOptions.map((box) => (
                    <div
                      key={box.name}
                      onClick={() => setSelectedBox(box)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '16px',
                        border: selectedBox.name === box.name ? '2px solid #C8A45D' : '1px solid rgba(0,0,0,0.1)',
                        background: selectedBox.name === box.name ? '#FFF9F6' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: '#2E2E2E' }}>{box.name}</strong>
                        <p style={{ fontSize: '0.78rem', color: '#777' }}>{box.desc}</p>
                      </div>
                      <span style={{ fontWeight: 700, color: '#C8A45D', fontSize: '0.95rem' }}>
                        ₹{box.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Theme & Monogram */}
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E', marginBottom: '12px' }}>
                  2. Ribbon Theme & Gold Monogram
                </h4>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                  {themeOptions.map((th) => (
                    <button
                      key={th}
                      onClick={() => setSelectedTheme(th)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '20px',
                        border: selectedTheme === th ? '2px solid #C8A45D' : '1px solid rgba(0,0,0,0.1)',
                        background: selectedTheme === th ? '#2E2E2E' : '#FFF9F6',
                        color: selectedTheme === th ? '#F4E8C1' : '#2E2E2E',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {th}
                    </button>
                  ))}
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#2E2E2E', display: 'block', marginBottom: '4px' }}>
                    Custom Foil Monogram Initials (e.g., A & S):
                  </label>
                  <input 
                    type="text" 
                    value={monogramText}
                    onChange={(e) => setMonogramText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1px solid rgba(200,164,93,0.4)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      background: '#FFF9F6'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Items Picker & Live Price Summary */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E', marginBottom: '12px' }}>
                3. Select Fillers & Keepsakes
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto', marginBottom: '24px', paddingRight: '6px' }}>
                {treatOptions.map((item) => {
                  const isChecked = selectedItems.some(i => i.name === item.name);

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '14px',
                        border: isChecked ? '1.5px solid #C98BA2' : '1px solid rgba(0,0,0,0.08)',
                        background: isChecked ? '#F8E3EC' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '22px', height: '22px', borderRadius: '6px', border: '1px solid #C8A45D', background: isChecked ? '#C8A45D' : '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                          {isChecked && <Check size={14} />}
                        </div>
                        <span style={{ fontSize: '0.88rem', fontWeight: 500, color: '#2E2E2E' }}>{item.name}</span>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2E2E2E' }}>
                        +₹{item.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total Calculation & Finish Button */}
              <div style={{ background: '#FFF9F6', border: '1px solid rgba(200, 164, 93, 0.4)', borderRadius: '20px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span>Trunk Base ({selectedBox.name}):</span>
                  <span>₹{selectedBox.price.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem' }}>
                  <span>Items Selected ({selectedItems.length}):</span>
                  <span>₹{selectedItems.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px dashed rgba(0,0,0,0.15)', fontSize: '1.25rem', fontWeight: 700, color: '#2E2E2E', marginBottom: '16px' }}>
                  <span>Total Calculated:</span>
                  <span style={{ color: '#C8A45D' }}>₹{totalCalculatedPrice.toLocaleString('en-IN')}</span>
                </div>

                <button
                  onClick={handleFinish}
                  className="btn-gold"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                >
                  <ShoppingBag size={18} />
                  <span>Add Bespoke Hamper to Bag</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
