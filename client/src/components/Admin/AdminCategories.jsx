import React, { useState, useEffect } from 'react';
import { Layers, Plus, Eye, EyeOff, Edit, Trash2, Save, X, Image } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const [newCategory, setNewCategory] = useState({
    name: '',
    slug: '',
    description: '',
    banner: '',
    sortOrder: 1,
    isVisible: true
  });

  const [editingCategory, setEditingCategory] = useState(null);

  const handleBannerUpload = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressed = canvas.toDataURL('image/jpeg', 0.7);
          if (isEdit) {
            setEditingCategory(prev => ({ ...prev, banner: compressed }));
          } else {
            setNewCategory(prev => ({ ...prev, banner: compressed }));
          }
        };
      };
    }
  };

  // Fetch all categories for admin (including invisible ones)
  const fetchCategories = () => {
    fetch(getApiUrl('/api/categories?admin=true'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCategories(data.data);
        }
      })
      .catch(err => console.warn("Categories fetch fallback:", err));
  };

  useEffect(() => {
    fetchCategories();
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
        fetchCategories();
      }
    } catch (err) {
      fetchCategories();
    }
    setShowAddModal(false);
    setNewCategory({ name: '', slug: '', description: '', banner: '', sortOrder: categories.length + 1, isVisible: true });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const slug = editingCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = { ...editingCategory, slug };

    try {
      const res = await fetch(getApiUrl(`/api/categories/${editingCategory._id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCategories(categories.map(c => c._id === editingCategory._id ? data.data : c));
      } else {
        fetchCategories();
      }
    } catch (err) {
      fetchCategories();
    }
    setShowEditModal(false);
    setEditingCategory(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category? All products under this category might need their category updated.")) return;

    try {
      const res = await fetch(getApiUrl(`/api/categories/${id}`), {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setCategories(categories.filter(c => c._id !== id));
      } else {
        fetchCategories();
      }
    } catch (err) {
      fetchCategories();
    }
  };

  const toggleVisibility = async (cat) => {
    const updatedVisible = !cat.isVisible;
    try {
      const res = await fetch(getApiUrl(`/api/categories/${cat._id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: updatedVisible })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCategories(categories.map(c => c._id === cat._id ? data.data : c));
      }
    } catch (err) {
      setCategories(categories.map(c => c._id === cat._id ? { ...c, isVisible: updatedVisible } : c));
    }
  };

  return (
    <div>
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F4E8C1', margin: 0 }}>
            Category Manager
          </h1>
          <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
            Add, edit, delete, and configure images for storefront collections.
          </p>
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn-gold" style={{ fontSize: '0.85rem' }}>
          <Plus size={16} /> Add New Category
        </button>
      </div>

      {/* Categories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {categories.map((cat) => (
          <div 
            key={cat._id} 
            style={{ 
              background: '#282828', 
              borderRadius: '20px', 
              overflow: 'hidden',
              border: '1px solid rgba(200, 164, 93, 0.3)', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
            }}
          >
            {/* Category Banner Cover */}
            <div style={{ position: 'relative', height: '140px', background: '#333' }}>
              {cat.banner ? (
                <img 
                  src={cat.banner} 
                  alt={cat.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666', gap: '8px' }}>
                  <Image size={32} />
                  <span style={{ fontSize: '0.75rem' }}>No Banner Uploaded</span>
                </div>
              )}
              {/* Badge Visibility */}
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <button 
                  onClick={() => toggleVisibility(cat)} 
                  style={{ 
                    background: 'rgba(0,0,0,0.6)', 
                    border: 'none', 
                    borderRadius: '50%', 
                    width: '34px', 
                    height: '34px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: cat.isVisible ? '#4CAF50' : '#E57373', 
                    cursor: 'pointer' 
                  }}
                  title={cat.isVisible ? 'Visible on Storefront' : 'Hidden from Storefront'}
                >
                  {cat.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Category Details */}
            <div style={{ padding: '20px', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFF', margin: 0 }}>
                  {cat.name}
                </h3>
                <span style={{ fontSize: '0.72rem', background: '#3A3A3A', color: '#C8A45D', padding: '3px 8px', borderRadius: '8px', fontWeight: 600 }}>
                  Order: {cat.sortOrder || 0}
                </span>
              </div>
              
              <p style={{ fontSize: '0.82rem', color: '#AAA', lineHeight: '1.5', minHeight: '36px', margin: '0 0 16px' }}>
                {cat.description || 'No description provided.'}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                <span style={{ fontSize: '0.72rem', color: '#888' }}>
                  Slug: <span style={{ color: '#C8A45D' }}>/{cat.slug}</span>
                </span>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => { setEditingCategory(cat); setShowEditModal(true); }}
                    style={{ 
                      background: 'rgba(200, 164, 93, 0.1)', 
                      border: '1px solid rgba(200, 164, 93, 0.3)', 
                      borderRadius: '8px', 
                      color: '#C8A45D', 
                      padding: '6px 10px', 
                      fontSize: '0.75rem', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 600
                    }}
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(cat._id)}
                    style={{ 
                      background: 'rgba(229, 115, 115, 0.1)', 
                      border: '1px solid rgba(229, 115, 115, 0.3)', 
                      borderRadius: '8px', 
                      color: '#E57373', 
                      padding: '6px 10px', 
                      fontSize: '0.75rem', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontWeight: 600
                    }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* --- ADD CATEGORY MODAL --- */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#282828', borderRadius: '24px', padding: '30px', maxWidth: '500px', width: '100%', border: '1px solid #C8A45D' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.4rem', margin: 0 }}>
                Add Luxury Category
              </h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#C8A45D', display: 'block', marginBottom: '6px' }}>Category Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Wedding Trunks & Chests" 
                  value={newCategory.name} 
                  onChange={e => setNewCategory({...newCategory, name: e.target.value})} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#C8A45D', display: 'block', marginBottom: '6px' }}>Category Banner Image</label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                  <label 
                    htmlFor="category-banner-upload-add"
                    style={{
                      flex: 1,
                      background: 'rgba(200, 164, 93, 0.1)',
                      border: '1px dashed #C8A45D',
                      borderRadius: '10px',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      color: '#C8A45D',
                      fontWeight: 600,
                      textAlign: 'center'
                    }}
                  >
                    Upload File
                  </label>
                  <input 
                    id="category-banner-upload-add"
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleBannerUpload(e, false)} 
                    style={{ display: 'none' }} 
                  />
                  <input 
                    type="text" 
                    placeholder="Or paste image URL..." 
                    value={newCategory.banner.startsWith('data:') ? 'Local Image File Loaded' : newCategory.banner} 
                    onChange={e => setNewCategory({...newCategory, banner: e.target.value})} 
                    style={{ flex: 2, padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.85rem', outline: 'none' }} 
                  />
                </div>
                {newCategory.banner && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1E1E1E', padding: '8px 12px', borderRadius: '10px', border: '1px solid #333' }}>
                    <img src={newCategory.banner} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                    <span style={{ fontSize: '0.75rem', color: '#4CAF50', fontWeight: 600 }}>✓ Banner Loaded</span>
                    <button type="button" onClick={() => setNewCategory({...newCategory, banner: ''})} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#E57373', fontSize: '0.75rem', cursor: 'pointer' }}>Remove</button>
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#C8A45D', display: 'block', marginBottom: '6px' }}>Display Order</label>
                  <input 
                    type="number" 
                    value={newCategory.sortOrder} 
                    onChange={e => setNewCategory({...newCategory, sortOrder: parseInt(e.target.value) || 1})} 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#C8A45D', display: 'block', marginBottom: '6px' }}>Storefront Visibility</label>
                  <select 
                    value={newCategory.isVisible} 
                    onChange={e => setNewCategory({...newCategory, isVisible: e.target.value === 'true'})}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="true">Visible</option>
                    <option value="false">Hidden</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#C8A45D', display: 'block', marginBottom: '6px' }}>Description</label>
                <textarea 
                  rows={3} 
                  placeholder="Brief description of products inside this collection..." 
                  value={newCategory.description} 
                  onChange={e => setNewCategory({...newCategory, description: e.target.value})} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, background: '#444', color: '#FFF', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ flex: 2, justifyContent: 'center' }}>Create Collection</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT CATEGORY MODAL --- */}
      {showEditModal && editingCategory && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#282828', borderRadius: '24px', padding: '30px', maxWidth: '500px', width: '100%', border: '1px solid #C8A45D' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.4rem', margin: 0 }}>
                Edit Luxury Category
              </h3>
              <button onClick={() => { setShowEditModal(false); setEditingCategory(null); }} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#C8A45D', display: 'block', marginBottom: '6px' }}>Category Name *</label>
                <input 
                  type="text" 
                  required 
                  value={editingCategory.name} 
                  onChange={e => setEditingCategory({...editingCategory, name: e.target.value})} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#C8A45D', display: 'block', marginBottom: '6px' }}>Category Banner Image</label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                  <label 
                    htmlFor="category-banner-upload-edit"
                    style={{
                      flex: 1,
                      background: 'rgba(200, 164, 93, 0.1)',
                      border: '1px dashed #C8A45D',
                      borderRadius: '10px',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      color: '#C8A45D',
                      fontWeight: 600,
                      textAlign: 'center'
                    }}
                  >
                    Upload File
                  </label>
                  <input 
                    id="category-banner-upload-edit"
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleBannerUpload(e, true)} 
                    style={{ display: 'none' }} 
                  />
                  <input 
                    type="text" 
                    placeholder="Or paste image URL..." 
                    value={editingCategory.banner && editingCategory.banner.startsWith('data:') ? 'Local Image File Loaded' : editingCategory.banner || ''} 
                    onChange={e => setEditingCategory({...editingCategory, banner: e.target.value})} 
                    style={{ flex: 2, padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.85rem', outline: 'none' }} 
                  />
                </div>
                {editingCategory.banner && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1E1E1E', padding: '8px 12px', borderRadius: '10px', border: '1px solid #333' }}>
                    <img src={editingCategory.banner} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                    <span style={{ fontSize: '0.75rem', color: '#4CAF50', fontWeight: 600 }}>✓ Banner Loaded</span>
                    <button type="button" onClick={() => setEditingCategory({...editingCategory, banner: ''})} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#E57373', fontSize: '0.75rem', cursor: 'pointer' }}>Remove</button>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.8rem', color: '#C8A45D', display: 'block', marginBottom: '6px' }}>Display Order</label>
                  <input 
                    type="number" 
                    value={editingCategory.sortOrder} 
                    onChange={e => setEditingCategory({...editingCategory, sortOrder: parseInt(e.target.value) || 1})} 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.8rem', color: '#C8A45D', display: 'block', marginBottom: '6px' }}>Storefront Visibility</label>
                  <select 
                    value={editingCategory.isVisible} 
                    onChange={e => setEditingCategory({...editingCategory, isVisible: e.target.value === 'true'})}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="true">Visible</option>
                    <option value="false">Hidden</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#C8A45D', display: 'block', marginBottom: '6px' }}>Description</label>
                <textarea 
                  rows={3} 
                  value={editingCategory.description || ''} 
                  onChange={e => setEditingCategory({...editingCategory, description: e.target.value})} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => { setShowEditModal(false); setEditingCategory(null); }} style={{ flex: 1, background: '#444', color: '#FFF', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                <button type="submit" className="btn-gold" style={{ flex: 2, justifyContent: 'center' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
