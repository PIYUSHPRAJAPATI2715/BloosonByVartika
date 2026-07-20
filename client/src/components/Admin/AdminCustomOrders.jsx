import React, { useState, useEffect } from 'react';
import { Gift, MessageCircle, Send, CheckCircle2, XCircle, Clock, DollarSign } from 'lucide-react';

export default function AdminCustomOrders() {
  const [customRequests, setCustomRequests] = useState([
    {
      _id: '1',
      requestNumber: 'BV-CUST-9012',
      clientName: 'Ananya Sharma',
      clientEmail: 'ananya.sharma@example.com',
      clientPhone: '+91 98290 12345',
      occasion: 'Bridal Trousseau & Sangeet Hampers',
      budgetRange: '₹45,000 - ₹60,000',
      themeColor: 'Blush Pink & Vintage Champagne Gold',
      recipientName: 'Ananya & Rohan',
      customMessage: 'Need 12 custom trouseau trays with embroidered initials "A & R" and matching Mehendi gift favors for 50 guests.',
      status: 'Under Review',
      quotedPrice: 52000,
      adminNotes: 'Client requested initial consultation at Jaipur Studio. Samples sent over WhatsApp.'
    },
    {
      _id: '2',
      requestNumber: 'BV-CUST-9015',
      clientName: 'Vikram Mehta (Oberoi Group)',
      clientEmail: 'v.mehta@oberoigroup.com',
      clientPhone: '+91 94140 98765',
      occasion: 'VIP Corporate Diwali Hampers',
      budgetRange: '₹1,00,000 - ₹1,50,000',
      themeColor: 'Royal Navy & Foil Gold',
      recipientName: 'Executive Clients',
      customMessage: 'Bulk order for 40 luxury leatherette hampers containing gold diyas and gourmet dry fruits.',
      status: 'Quote Sent',
      quotedPrice: 140000,
      adminNotes: 'Quotation sent via PDF email. Awaiting approval from procurement team.'
    }
  ]);

  const [selectedReq, setSelectedReq] = useState(null);
  const [quoteInput, setQuoteInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    fetch('/api/custom-orders')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) setCustomRequests(data.data);
      })
      .catch(err => console.warn("Custom orders API fallback:", err));
  }, []);

  const handleUpdateStatus = async (id, newStatus, price, notes) => {
    const updatedList = customRequests.map(r => 
      r._id === id ? { ...r, status: newStatus, ...(price && { quotedPrice: price }), ...(notes && { adminNotes: notes }) } : r
    );
    setCustomRequests(updatedList);

    try {
      await fetch(`/api/custom-orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, quotedPrice: price, adminNotes: notes })
      });
    } catch (err) {
      console.warn("Update status error:", err);
    }
  };

  const sendWhatsAppQuote = (req) => {
    const msg = encodeURIComponent(`Hello ${req.clientName}! Greetings from Blossom by Vartika Jaipur Studio. Regarding your request #${req.requestNumber} (${req.occasion}): We are pleased to quote ₹${req.quotedPrice ? req.quotedPrice.toLocaleString('en-IN') : 'Custom'}. Let us know when you would like to finalize the design!`);
    window.open(`https://wa.me/${req.clientPhone.replace(/\D/g,'')}?text=${msg}`, '_blank');
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F4E8C1', margin: 0 }}>
          Custom Order Pipeline & Quotations
        </h1>
        <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
          Manage bespoke wedding trousseau inquiries, send price quotes, and assign craft statuses.
        </p>
      </div>

      {/* Grid of Requests */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {customRequests.map((req) => (
          <div 
            key={req._id}
            style={{
              background: '#282828',
              borderRadius: '20px',
              border: '1px solid rgba(200, 164, 93, 0.3)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.78rem', color: '#C8A45D', fontWeight: 600 }}>#{req.requestNumber}</span>
                <span style={{ background: '#3D2D35', color: '#E8B7C9', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {req.status}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF', margin: '0 0 6px' }}>
                {req.clientName}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#AAA', marginBottom: '16px' }}>
                {req.occasion} • {req.clientPhone}
              </p>

              <div style={{ background: '#1E1E1E', padding: '14px', borderRadius: '12px', fontSize: '0.82rem', marginBottom: '16px' }}>
                <div style={{ color: '#CCC', marginBottom: '4px' }}><strong>Budget Range:</strong> {req.budgetRange}</div>
                <div style={{ color: '#CCC', marginBottom: '4px' }}><strong>Theme Color:</strong> {req.themeColor || 'Blush & Gold'}</div>
                <div style={{ color: '#888', fontStyle: 'italic', marginTop: '6px' }}>"{req.customMessage}"</div>
              </div>

              {req.quotedPrice && (
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F4E8C1', marginBottom: '16px' }}>
                  Quoted Price: ₹{req.quotedPrice.toLocaleString('en-IN')}
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => { setSelectedReq(req); setQuoteInput(req.quotedPrice || ''); setNoteInput(req.adminNotes || ''); }}
                  style={{ flex: 1, background: '#C8A45D', color: '#1E1E1E', border: 'none', padding: '8px', borderRadius: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Send Quote / Edit
                </button>
                <button
                  onClick={() => sendWhatsAppQuote(req)}
                  style={{ background: '#25D366', color: '#FFF', border: 'none', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
                >
                  <MessageCircle size={14} /> WhatsApp
                </button>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Accepted', 'Crafting', 'Completed'].map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(req._id, st, req.quotedPrice, req.adminNotes)}
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.08)',
                      color: req.status === st ? '#C8A45D' : '#888',
                      border: req.status === st ? '1px solid #C8A45D' : '1px solid transparent',
                      padding: '4px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      cursor: 'pointer'
                    }}
                  >
                    Mark {st}
                  </button>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Quote Generator Modal */}
      {selectedReq && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#282828', borderRadius: '20px', padding: '28px', maxWidth: '480px', width: '100%', border: '1px solid #C8A45D' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.3rem', marginBottom: '16px' }}>
              Send Quote for #{selectedReq.requestNumber}
            </h3>
            
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Quotation Price (₹)</label>
              <input 
                type="number"
                value={quoteInput}
                onChange={e => setQuoteInput(e.target.value)}
                placeholder="e.g. 52000"
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.8rem', color: '#AAA', display: 'block', marginBottom: '4px' }}>Admin Internal Notes</label>
              <textarea 
                rows={3}
                value={noteInput}
                onChange={e => setNoteInput(e.target.value)}
                placeholder="Internal notes on fabric, sample approvals..."
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #555', background: '#1E1E1E', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setSelectedReq(null)} style={{ flex: 1, background: '#444', color: '#FFF', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>Cancel</button>
              <button 
                onClick={() => {
                  handleUpdateStatus(selectedReq._id, 'Quote Sent', Number(quoteInput), noteInput);
                  setSelectedReq(null);
                }} 
                className="btn-gold"
                style={{ flex: 2, justifyContent: 'center' }}
              >
                Save & Update Quote
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
