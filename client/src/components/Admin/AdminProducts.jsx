import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit, Trash2, Save, X, Image, Tag, AlertCircle, Box, Image as ImageIcon, Sparkles, CheckCircle2, RefreshCw, Link, Upload, Grid } from 'lucide-react';
import { getApiUrl } from '../../config/api';
import { uploadImage } from '../../config/upload';

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [imageTab, setImageTab] = useState('upload'); // 'upload', 'url', 'preset'

  const presetGalleryImages = [
    { label: 'Royal Blush Trousseau', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600' },
    { label: 'Gold Shagun Tray', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600' },
    { label: 'Festive Gold Trunk', url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=600' },
    { label: 'Pastel Baby Chest', url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600' },
    { label: 'Explosion Memory Box', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600' },
    { label: 'Executive Leather Kit', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600' }
  ];

  const generateSku = () => `BV-PROD-${Math.floor(1000 + Math.random() * 9000)}`;

  const [categoriesList, setCategoriesList] = useState([
    'Rakhi', 'Keychains', 'Birthday', 'Anniversary', 'Wedding', 'Corporate', 'Baby Shower', 'Explosion Boxes', 'Festive'
  ]);

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    sku: generateSku(),
    category: 'Rakhi',
    price: '',
    discountPrice: '',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    description: 'Handcrafted luxury product.'
  });

  useEffect(() => {
    fetch(getApiUrl('/api/categories'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const list = data.data.map(c => c.name);
          setCategoriesList(list);
          setFormData(prev => ({ ...prev, category: list[0] }));
        }
      })
      .catch(err => console.warn("Admin categories fetch fallback:", err));
  }, []);

  useEffect(() => {
    fetch(getApiUrl('/api/products'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) setProducts(data.data);
      })
      .catch(err => console.warn("Admin products fallback:", err));
  }, []);

  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { url } = await uploadImage(file);
    setFormData({ ...formData, imageUrl: url });
    setUploading(false);
  };

  const handleOpenAdd = () => {
    setFormData({
      _id: '',
      name: '',
      sku: generateSku(),
      category: 'Wedding Collection',
      price: '',
      discountPrice: '',
      stock: 10,
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
      description: 'Handcrafted luxury hamper with bespoke embellishments.'
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (prod) => {
    setFormData({
      _id: prod._id,
      name: prod.name,
      sku: prod.sku || generateSku(),
      category: prod.category || 'Wedding Collection',
      price: prod.price || '',
      discountPrice: prod.discountPrice || '',
      stock: prod.stock !== undefined ? prod.stock : 10,
      imageUrl: prod.images?.[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
      description: prod.description || ''
    });
    setShowEditModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name || "Custom Luxury Hamper",
      sku: formData.sku.trim() || generateSku(),
      category: formData.category || "Wedding Collection",
      price: Number(formData.price) || 4500,
      discountPrice: Number(formData.discountPrice) || (Number(formData.price) ? Number(formData.price) * 0.9 : 3990),
      stock: Number(formData.stock) || 10,
      images: [formData.imageUrl || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600"],
      description: formData.description || "Handcrafted luxury hamper with bespoke embellishments."
    };

    if (showEditModal && formData._id) {
      setProducts(products.map(p => p._id === formData._id ? { ...p, ...payload } : p));
      setShowEditModal(false);
      try {
        await fetch(getApiUrl(`/api/products/${formData._id}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn("Product edit fallback:", err);
      }
    } else {
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
    }
  };

  const confirmDeleteProduct = (prod) => {
    setProductToDelete(prod);
    setShowDeleteModal(true);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    const id = productToDelete._id;
    setProducts(products.filter(p => p._id !== id));
    setShowDeleteModal(false);
    setProductToDelete(null);

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
            Product Catalog & Inventory Manager
          </h1>
          <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
            Add, edit, or remove luxury hampers, upload device photos, and manage live stock.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-gold" style={{ fontSize: '0.85rem' }}>
          <Plus size={16} /> Add New Luxury Product
        </button>
      </div>

      {/* Product Table */}
      <div style={{ background: '#282828', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#1E1E1E', color: '#C8A45D', borderBottom: '1px solid rgba(200,164,93,0.3)' }}>
              <th style={{ padding: '14px 18px' }}>Product & Image</th>
              <th style={{ padding: '14px 18px' }}>Auto SKU</th>
              <th style={{ padding: '14px 18px' }}>Category</th>
              <th style={{ padding: '14px 18px' }}>Price</th>
              <th style={{ padding: '14px 18px' }}>Stock Status</th>
              <th style={{ padding: '14px 18px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600'} alt="" style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #C8A45D' }} />
                  <div>
                    <div style={{ color: '#FFF', fontWeight: 700, fontSize: '0.92rem' }}>{p.name}</div>
                    <span style={{ fontSize: '0.75rem', color: '#AAA' }}>{p.description ? p.description.substring(0, 45) + '...' : ''}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ background: '#1E1E1E', color: '#F4E8C1', padding: '4px 10px', borderRadius: '8px', fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 600 }}>
                    {p.sku || 'BV-PROD-001'}
                  </span>
                </td>
                <td style={{ padding: '14px 18px', color: '#E8B7C9', fontWeight: 600 }}>{p.category}</td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ fontWeight: 700, color: '#FFF' }}>₹{(p.discountPrice || p.price || 0).toLocaleString('en-IN')}</div>
                  {p.discountPrice && <div style={{ fontSize: '0.75rem', color: '#888', textDecoration: 'line-through' }}>₹{(p.price || 0).toLocaleString('en-IN')}</div>}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ background: p.stock < 5 ? '#5A2A2A' : '#1E1E1E', color: p.stock < 5 ? '#FF6B6B' : '#4CAF50', padding: '4px 10px', borderRadius: '10px', fontWeight: 600, fontSize: '0.8rem' }}>
                    {p.stock} in stock
                  </span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleOpenEdit(p)} title="Edit Product" style={{ background: 'none', border: 'none', color: '#C8A45D', cursor: 'pointer' }}>
                      <Edit size={18} />
                    </button>
                    <button onClick={() => confirmDeleteProduct(p)} title="Delete Product" style={{ background: 'none', border: 'none', color: '#FF5252', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {(showAddModal || showEditModal) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#282828', borderRadius: '24px', padding: '32px', maxWidth: '660px', width: '100%', border: '2px solid #C8A45D', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.5rem', marginBottom: '18px' }}>
              {showEditModal ? '✏️ Edit Luxury Product' : '👑 Add New Luxury Product'}
            </h3>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div>
                <label style={{ fontSize: '0.82rem', color: '#C8A45D', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Product Name *</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Royal Jaipur Bridal Trousseau Box Set" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
              </div>

              {/* Auto SKU Field & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '0.82rem', color: '#C8A45D', fontWeight: 600 }}>Auto Generated SKU</label>
                    <button type="button" onClick={() => setFormData({...formData, sku: generateSku()})} style={{ background: 'none', border: 'none', color: '#C8A45D', cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <RefreshCw size={12} /> Regenerate
                    </button>
                  </div>
                  <input type="text" required value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#F4E8C1', fontFamily: 'monospace', fontWeight: 700, outline: 'none' }} />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', color: '#C8A45D', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }}>
                    {categoriesList.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* IMAGE SELECTOR: 1. File Upload / Gallery File Picker, 2. Direct URL, 3. Presets */}
              <div style={{ background: '#1E1E1E', borderRadius: '16px', padding: '16px', border: '1px solid rgba(200, 164, 93, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.82rem', color: '#C8A45D', fontWeight: 700 }}>Select or Upload Product Image</label>
                  <div style={{ display: 'flex', gap: '4px', background: '#282828', padding: '2px', borderRadius: '20px' }}>
                    <button 
                      type="button" 
                      onClick={() => setImageTab('upload')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '16px',
                        border: 'none',
                        background: imageTab === 'upload' ? '#C8A45D' : 'transparent',
                        color: imageTab === 'upload' ? '#1E1E1E' : '#AAA',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Upload size={12} /> Device Gallery
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setImageTab('url')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '16px',
                        border: 'none',
                        background: imageTab === 'url' ? '#C8A45D' : 'transparent',
                        color: imageTab === 'url' ? '#1E1E1E' : '#AAA',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Link size={12} /> Image URL
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setImageTab('preset')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '16px',
                        border: 'none',
                        background: imageTab === 'preset' ? '#C8A45D' : 'transparent',
                        color: imageTab === 'preset' ? '#1E1E1E' : '#AAA',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Grid size={12} /> Presets
                    </button>
                  </div>
                </div>

                {imageTab === 'upload' && (
                  <div>
                    <label 
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '2px dashed #C8A45D',
                        background: '#282828',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <Upload size={28} color="#C8A45D" style={{ marginBottom: '8px' }} />
                      <span style={{ fontSize: '0.85rem', color: '#FFF', fontWeight: 600 }}>{uploading ? '⏳ Uploading to cloud...' : 'Click to Upload Image'}</span>
                      <span style={{ fontSize: '0.72rem', color: '#AAA', marginTop: '2px' }}>{uploading ? 'Please wait, image is being uploaded...' : 'Supports PNG, JPG, WEBP — stored on Cloudinary CDN'}</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} style={{ display: 'none' }} />
                    </label>

                    {formData.imageUrl && (
                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px', background: '#282828', padding: '8px 12px', borderRadius: '10px' }}>
                        <img src={formData.imageUrl} alt="Uploaded Preview" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #C8A45D' }} />
                        <span style={{ fontSize: '0.8rem', color: '#4CAF50', fontWeight: 600 }}>✓ Image uploaded & selected!</span>
                      </div>
                    )}
                  </div>
                )}

                {imageTab === 'url' && (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      required 
                      value={formData.imageUrl} 
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                      placeholder="Paste Image URL (https://...)" 
                      style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#282828', color: '#FFF', outline: 'none', fontSize: '0.85rem' }} 
                    />
                    {formData.imageUrl && (
                      <img src={formData.imageUrl} alt="Preview" style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', border: '1.5px solid #C8A45D' }} />
                    )}
                  </div>
                )}

                {imageTab === 'preset' && (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' }}>
                      {presetGalleryImages.map((imgItem) => (
                        <div 
                          key={imgItem.url}
                          onClick={() => setFormData({...formData, imageUrl: imgItem.url})}
                          style={{
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: formData.imageUrl === imgItem.url ? '2px solid #C8A45D' : '1px solid #444',
                            cursor: 'pointer',
                            position: 'relative',
                            height: '70px'
                          }}
                        >
                          <img src={imgItem.url} alt={imgItem.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          {formData.imageUrl === imgItem.url && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(200,164,93,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <CheckCircle2 size={18} color="#FFF" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing & Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#C8A45D', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Regular Price (₹) *</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="18500" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#C8A45D', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Discount Price (₹)</label>
                  <input type="number" value={formData.discountPrice} onChange={e => setFormData({...formData, discountPrice: e.target.value})} placeholder="16500" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', color: '#C8A45D', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Stock Level</label>
                  <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} placeholder="10" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: '0.82rem', color: '#C8A45D', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Product Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Handcrafted 5-piece royal bridal trouseau packaging set..." style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => { setShowAddModal(false); setShowEditModal(false); }} style={{ flex: 1, background: '#444', color: '#FFF', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ flex: 2, justifyContent: 'center', padding: '12px' }}>
                  {showEditModal ? 'Save Product Changes' : 'Publish Product to Store'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#282828', borderRadius: '20px', padding: '28px', maxWidth: '420px', width: '100%', border: '1px solid #FF5252', textAlign: 'center' }}>
            <Trash2 size={42} color="#FF5252" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#FFF', fontSize: '1.3rem', marginBottom: '8px' }}>
              Delete Product?
            </h3>
            <p style={{ color: '#AAA', fontSize: '0.88rem', marginBottom: '20px' }}>
              Are you sure you want to delete <strong style={{ color: '#FFF' }}>"{productToDelete.name}"</strong>? This action will remove it from the live store.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, background: '#444', color: '#FFF', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={handleDeleteProduct} style={{ flex: 1, background: '#FF5252', color: '#FFF', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}>Delete Product</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
