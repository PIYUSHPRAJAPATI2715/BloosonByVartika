import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, ShoppingBag, DollarSign, MessageCircle, Download } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { _id: 'u1', name: 'Radhika Khandelwal', email: 'radhika.k@example.com', phone: '+91 98291 55443', role: 'user', totalSpend: 32000, orderCount: 2, createdAt: '2026-07-10' },
    { _id: 'u2', name: 'Ananya Sharma', email: 'ananya.sharma@example.com', phone: '+91 98290 12345', role: 'user', totalSpend: 52000, orderCount: 1, createdAt: '2026-07-15' },
    { _id: 'u3', name: 'Priyanka Ranawat', email: 'priyanka.r@example.com', phone: '+91 94140 98765', role: 'user', totalSpend: 18500, orderCount: 1, createdAt: '2026-07-18' }
  ]);

  useEffect(() => {
    fetch(getApiUrl('/api/users'))
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) setUsers(data.data);
      })
      .catch(err => console.warn("Admin users fetch fallback:", err));
  }, []);

  const sendWhatsAppMsg = (user) => {
    const text = encodeURIComponent(`Hello ${user.name}! Thank you for being a valued client of Blossom by Vartika. We have new bridal trousseau designs in our Jaipur studio!`);
    window.open(`https://wa.me/${user.phone.replace(/\D/g,'')}?text=${text}`, '_blank');
  };

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Email,Phone,Total Spend,Orders"].concat(users.map(u => `${u.name},${u.email},${u.phone},${u.totalSpend || 0},${u.orderCount || 0}`)).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Blossom_Registered_Clients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F4E8C1', margin: 0 }}>
            Customer & Client Management
          </h1>
          <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
            View all registered users, purchase history, total spend, and contact clients.
          </p>
        </div>

        <button onClick={exportCSV} className="btn-gold" style={{ fontSize: '0.85rem' }}>
          <Download size={16} /> Export Clients CSV
        </button>
      </div>

      <div style={{ background: '#282828', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#1E1E1E', color: '#C8A45D', borderBottom: '1px solid rgba(200,164,93,0.3)' }}>
              <th style={{ padding: '14px 18px' }}>Client Name</th>
              <th style={{ padding: '14px 18px' }}>Contact Info</th>
              <th style={{ padding: '14px 18px' }}>Orders</th>
              <th style={{ padding: '14px 18px' }}>Total Spend</th>
              <th style={{ padding: '14px 18px' }}>Registered Date</th>
              <th style={{ padding: '14px 18px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#FFF' }}>
                  {user.name}
                  {user.role === 'admin' && <span style={{ background: '#C8A45D', color: '#1E1E1E', padding: '2px 6px', borderRadius: '6px', fontSize: '0.7rem', marginLeft: '6px' }}>ADMIN</span>}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ color: '#DDD', fontSize: '0.85rem' }}>{user.email}</div>
                  <span style={{ fontSize: '0.78rem', color: '#AAA' }}>{user.phone}</span>
                </td>
                <td style={{ padding: '14px 18px', color: '#F4E8C1', fontWeight: 600 }}>
                  {user.orderCount || 1} Orders
                </td>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#4CAF50' }}>
                  ₹{(user.totalSpend || 15500).toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '14px 18px', color: '#888', fontSize: '0.8rem' }}>
                  {typeof user.createdAt === 'string' ? user.createdAt.split('T')[0] : '2026-07-15'}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <button 
                    onClick={() => sendWhatsAppMsg(user)}
                    style={{ background: '#25D366', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <MessageCircle size={14} /> Contact
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
