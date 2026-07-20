import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Box, Image, Tag, Sparkles } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([
    {
      _id: '1',
      name: "Royal Pink Jaipur Bridal Trousseau Box Set",
      sku: "BV-TROUSSEAU-01",
      category: "Wedding Collection",
      price: 18500,
      discountPrice: 16500,
      stock: 8,
      images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600"],
      description: "Handcrafted 5-piece royal bridal trouseau packaging set crafted with plush blush pink velvet and zari border work."
    },
    {
      _id: '2',
      name: "Peacock Mirror Shagun Tray",
      sku: "BV-WED-02",
      category: "Wedding Collection",
      price: 6800,
      discountPrice: 5950,
      stock: 12,
      images: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"],
      description: "Mirror shagun tray lined with gold lace and pearl tassels."
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'Wedding Collection',
    price: '',
    discountPrice: '',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600'],
    description: 'Handcrafted luxury hamper with gold ribbon detailing.'
  });

  useEffect(() => {
    fetch(getApiUrl('/api/products'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) setProducts(data.data);
      })
      .catch(err => console.warn("Admin products fallback:", err));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const autoSku = newProduct.sku.trim() || `BV-PROD-${Math.floor(1000 + Math.random() * 9000)}`;
    const payload = { 
      name: newProduct.name || "Custom Luxury Hamper",
      sku: autoSku,
      category: newProduct.category || "Wedding Collection",
      price: Number(newProduct.price) || 4500,
      discountPrice: Number(newProduct.discountPrice) || (Number(newProduct.price) ? Number(newProduct.price) * 0.9 : 3990),
      stock: Number(newProduct.stock) || 10,
      images: newProduct.images && newProduct.images.length > 0 ? newProduct.images : ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600"],
      description: newProduct.description || "Handcrafted luxury hamper with bespoke embellishments."
    };

    try {
      const res = await fetch(getApiUrl('/api/products'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setProducts([data.data, ...products]);
      } else {
        setProducts([{ ...payload, _id: Date.now().toString() }, ...products]);
      }
    } catch (err) {
      setProducts([{ ...payload, _id: Date.now().toString() }, ...products]);
    }
    setShowAddModal(false);
    setNewProduct({
      name: '',
      sku: '',
      category: 'Wedding Collection',
      price: '',
      discountPrice: '',
      stock: 10,
      images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600'],
      description: 'Handcrafted luxury hamper with gold ribbon detailing.'
    });
  };

  const handleDelete = async (id) => {
    setProducts(products.filter(p => p._id !== id));
    try {
      await fetch(getApiUrl(`/api/products/${id}`), { method: 'DELETE' });
    } catch (err) {
      console.warn("Delete fallback:", err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F4E8C1', margin: 0 }}>
            Product Catalog & Inventory
          </h1>
          <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
            Manage luxury gift hampers, pricing, variants, and live stock levels.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn-gold" style={{ fontSize: '0.85rem' }}>
          <Plus size={16} /> Add New Luxury Product
        </button>
      </div>

      {/* Product Table */}
      <div style={{ background: '#282828', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#1E1E1E', color: '#C8A45D', borderBottom: '1px solid rgba(200,164,93,0.3)' }}>
              <th style={{ padding: '14px 18px' }}>Product</th>
              <th style={{ padding: '14px 18px' }}>SKU</th>
              <th style={{ padding: '14px 18px' }}>Category</th>
              <th style={{ padding: '14px 18px' }}>Price</th>
              <th style={{ padding: '14px 18px' }}>Stock</th>
              <th style={{ padding: '14px 18px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={p.images[0]} alt="" style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ color: '#FFF', fontWeight: 600 }}>{p.name}</div>
                  </div>
                </td>
                <td style={{ padding: '14px 18px', color: '#AAA' }}>{p.sku}</td>
                <td style={{ padding: '14px 18px', color: '#E8B7C9' }}>{p.category}</td>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#FFF' }}>
                  ₹{(p.discountPrice || p.price || 0).toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ background: p.stock < 5 ? '#5A2A2A' : '#1E1E1E', color: p.stock < 5 ? '#FF6B6B' : '#4CAF50', padding: '4px 10px', borderRadius: '10px', fontWeight: 600 }}>
                    {p.stock} in stock
                  </span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <button onClick={() => handleDelete(p._id)} style={{ background: 'none', border: 'none', color: '#FF5252', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#282828', borderRadius: '20px', padding: '28px', maxWidth: '580px', width: '100%', border: '1px solid #C8A45D' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.4rem', marginBottom: '16px' }}>
              Add Luxury Hamper Product
            </h3>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Product Name *</label>
                <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA' }}>SKU Code (Auto if empty)</label>
                  <input type="text" value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} placeholder="BV-HAMPER-09" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Category</label>
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }}>
                    <option value="Wedding Collection">Wedding Collection</option>
                    <option value="Birthday Collection">Birthday Collection</option>
                    <option value="Baby Collection">Baby Collection</option>
                    <option value="Festival Collection">Festival Collection</option>
                    <option value="Corporate Gifting">Corporate Gifting</option>
                    <option value="Handmade Products">Handmade Products</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Price (₹) *</label>
                  <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Discount Price (₹)</label>
                  <input type="number" value={newProduct.discountPrice} onChange={e => setNewProduct({...newProduct, discountPrice: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Initial Stock</label>
                  <input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Description</label>
                <textarea rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#444', color: '#FFF', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ flex: 2, justifyContent: 'center' }}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
