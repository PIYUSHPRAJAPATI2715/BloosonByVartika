import React, { useState, useEffect } from 'react';
import { Tag, Plus, CheckCircle2, Trash2 } from 'lucide-react';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([
    { id: '1', code: 'WELCOME10', discountType: 'percentage', discountValue: 10, minOrderValue: 2000, usageLimit: 200, usedCount: 45, isActive: true },
    { id: '2', code: 'WEDDING1000', discountType: 'flat', discountValue: 1000, minOrderValue: 10000, usageLimit: 100, usedCount: 18, isActive: true },
    { id: '3', code: 'DIWALI25', discountType: 'percentage', discountValue: 15, minOrderValue: 5000, usageLimit: 150, usedCount: 82, isActive: true }
  ]);

  const [newCode, setNewCode] = useState('');
  const [newVal, setNewVal] = useState('');
  const [discountType, setDiscountType] = useState('flat');
  const [minOrder, setMinOrder] = useState('3000');

  useEffect(() => {
    fetch('/api/coupons')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) setCoupons(data.data);
      })
      .catch(err => console.warn("Coupons fetch fallback:", err));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const payload = {
      code: newCode.toUpperCase(),
      discountType,
      discountValue: Number(newVal) || 500,
      minOrderValue: Number(minOrder) || 2000,
      usageLimit: 100,
      usedCount: 0,
      isActive: true
    };

    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCoupons([data.data, ...coupons]);
      } else {
        setCoupons([{ ...payload, id: Date.now().toString() }, ...coupons]);
      }
    } catch (err) {
      setCoupons([{ ...payload, id: Date.now().toString() }, ...coupons]);
    }
    setNewCode('');
    setNewVal('');
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F4E8C1', margin: 0 }}>
          Coupon & Promo Code Manager
        </h1>
        <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
          Create and manage discount codes for festive sales and wedding client promotions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Create Coupon Form */}
        <div style={{ background: '#282828', borderRadius: '20px', padding: '24px', border: '1px solid #C8A45D' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.2rem', marginBottom: '16px' }}>
            Create New Promo Code
          </h4>

          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Coupon Code *</label>
              <input type="text" required placeholder="e.g. JAIPUR500" value={newCode} onChange={e => setNewCode(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Discount Type</label>
                <select value={discountType} onChange={e => setDiscountType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }}>
                  <option value="flat">Flat Amount (₹)</option>
                  <option value="percentage">Percentage (%)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Discount Value</label>
                <input type="number" required placeholder="e.g. 500" value={newVal} onChange={e => setNewVal(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#AAA' }}>Min Order Amount (₹)</label>
              <input type="number" value={minOrder} onChange={e => setMinOrder(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', outline: 'none' }} />
            </div>

            <button type="submit" className="btn-gold" style={{ justifyContent: 'center' }}>
              <Plus size={16} /> Create Coupon Code
            </button>
          </form>
        </div>

        {/* Existing Coupons List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {coupons.map((c) => (
            <div key={c._id || c.id} style={{ background: '#282828', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#C8A45D', display: 'block' }}>{c.code}</span>
                <span style={{ fontSize: '0.8rem', color: '#AAA' }}>
                  {c.discountType === 'percentage' ? `${c.discountValue}% Off` : `Flat ₹${c.discountValue} Off`} (Min Order: ₹{c.minOrderValue})
                </span>
              </div>
              <span style={{ background: '#1E1E1E', color: '#4CAF50', padding: '4px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 600 }}>
                {c.usedCount || 0} Uses Recorded
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
