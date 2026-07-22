import React, { useState, useEffect } from 'react';
import { Layers, Plus, Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    { _id: '1', name: 'Rakhi', slug: 'rakhi', description: 'Designer Rakhis, hampers, and custom greeting packs', sortOrder: 1, isVisible: true },
    { _id: '2', name: 'Keychains', slug: 'keychains', description: 'Handcrafted customized name keychains & resin hooks', sortOrder: 2, isVisible: true },
    { _id: '3', name: 'Birthday', slug: 'birthday', description: 'Exquisite personalized cards, surprise packs, and gift items', sortOrder: 3, isVisible: true }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    sortOrder: 7,
    isVisible: true
  });

  useEffect(() => {
    fetch(getApiUrl('/api/categories'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) setCategories(data.data);
      })
      .catch(err => console.warn("Categories fetch fallback:", err));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const slug = newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = { ...newCategory, slug };

    try {
      const res = await fetch(getApiUrl('/api/categories'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCategories([...categories, data.data]);
      } else {
        setCategories([...categories, { ...payload, _id: Date.now().toString() }]);
      }
    } catch (err) {
      setCategories([...categories, { ...payload, _id: Date.now().toString() }]);
    }
    setShowAddModal(false);
    setNewCategory({ name: '', slug: '', description: '', sortOrder: 7, isVisible: true });
  };

  const toggleVisibility = (id) => {
    setCategories(categories.map(c => c._id === id ? { ...c, isVisible: !c.isVisible } : c));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F4E8C1', margin: 0 }}>
            Category Management
          </h1>
          <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
            Create and manage luxury product categories shown across the storefront.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn-gold" style={{ fontSize: '0.85rem' }}>
          <Plus size={16} /> Add New Category
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {categories.map((cat) => (
          <div key={cat._id} style={{ background: '#282828', borderRadius: '18px', padding: '20px', border: '1px solid rgba(200, 164, 93, 0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#FFF', margin: 0 }}>{cat.name}</h3>
                <button onClick={() => toggleVisibility(cat._id)} style={{ background: 'none', border: 'none', color: cat.isVisible ? '#4CAF50' : '#888', cursor: 'pointer' }}>
                  {cat.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#AAA', marginBottom: '12px' }}>{cat.description}</p>
              <span style={{ fontSize: '0.75rem', color: '#C8A45D' }}>Slug: /{cat.slug}</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#282828', borderRadius: '20px', padding: '28px', maxWidth: '480px', width: '100%', border: '1px solid #C8A45D' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.3rem', marginBottom: '16px' }}>
              Add Luxury Category
            </h3>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Category Name *</label>
                <input type="text" required placeholder="e.g. Mehendi & Haldi Hampers" value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Description</label>
                <textarea rows={3} placeholder="Brief summary of category items..." value={newCategory.description} onChange={e => setNewCategory({...newCategory, description: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#444', color: '#FFF', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ flex: 2, justifyContent: 'center' }}>Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
