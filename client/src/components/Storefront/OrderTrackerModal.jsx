import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, Package, Gift, MapPin } from 'lucide-react';

export default function OrderTrackerModal({ onClose }) {
  const [orderQuery, setOrderQuery] = useState('BVL-882910');
  const [foundOrder, setFoundOrder] = useState({
    orderNumber: 'BVL-882910',
    customerName: 'Radhika Khandelwal',
    city: 'Jaipur',
    totalAmount: 15500,
    orderStatus: 'Crafting',
    courierPartner: 'BlueDart Luxury Express',
    trackingNumber: 'BD-JPR-9921',
    createdAt: '2026-07-18',
    estimatedDelivery: '2026-07-24',
    items: [
      { productName: 'Royal Pink Jaipur Bridal Trousseau Box Set', variantName: '5-Piece Royal Edition', quantity: 1 }
    ]
  });

  const statuses = [
    { key: 'Pending', label: 'Order Received', icon: <Clock size={16} /> },
    { key: 'Accepted', label: 'Accepted', icon: <CheckCircle2 size={16} /> },
    { key: 'Designing', label: 'Theme Design', icon: <Gift size={16} /> },
    { key: 'Crafting', label: 'Handcrafted', icon: <Package size={16} /> },
    { key: 'Packing', label: 'Luxury Packing', icon: <Gift size={16} /> },
    { key: 'Ready to Dispatch', label: 'Quality Pass', icon: <CheckCircle2 size={16} /> },
    { key: 'Shipped', label: 'In Transit', icon: <Truck size={16} /> },
    { key: 'Delivered', label: 'Delivered', icon: <MapPin size={16} /> }
  ];

  const getCurrentStepIndex = (currentStatus) => {
    const idx = statuses.findIndex(s => s.key === currentStatus);
    return idx >= 0 ? idx : 3; // Default to Crafting if matching
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && data.data) {
        const match = data.data.find(o => o.orderNumber.toLowerCase() === orderQuery.toLowerCase());
        if (match) {
          setFoundOrder(match);
        }
      }
    } catch (err) {
      console.warn("Tracker query fallback:", err);
    }
  };

  const currentIdx = getCurrentStepIndex(foundOrder.orderStatus);

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
          maxWidth: '780px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          position: 'relative',
          border: '2px solid #C8A45D'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: '#FFF9F6',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
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
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="ribbon-tag" style={{ marginBottom: '8px' }}>
              <Truck size={14} style={{ display: 'inline', marginRight: '4px' }} /> Realtime Craft Tracker
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#2E2E2E' }}>
              Track Your <span className="title-blush-gradient">Luxury Order</span>
            </h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Enter your Order Number (e.g. BVL-882910) to monitor handcrafting and shipping progress.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            <input 
              type="text" 
              placeholder="Enter Order # (e.g. BVL-882910)"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              style={{ flex: 1, padding: '12px 18px', borderRadius: '30px', border: '1px solid #C8A45D', fontSize: '0.9rem', outline: 'none', background: '#FFF9F6' }}
            />
            <button type="submit" className="btn-gold" style={{ padding: '12px 24px', fontSize: '0.88rem' }}>
              <Search size={16} /> Track
            </button>
          </form>

          {/* Order Details Banner */}
          {foundOrder && (
            <div>
              <div 
                style={{
                  background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)',
                  borderRadius: '20px',
                  border: '1px solid rgba(200, 164, 93, 0.3)',
                  padding: '20px',
                  marginBottom: '32px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#9A7734', fontWeight: 600, textTransform: 'uppercase' }}>
                    Order #{foundOrder.orderNumber}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#2E2E2E', margin: '2px 0' }}>
                    Client: {foundOrder.customerName} ({foundOrder.city})
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#666' }}>
                    Items: {foundOrder.items ? foundOrder.items.map(i => i.productName).join(', ') : 'Bridal Hamper'}
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: '#777', display: 'block' }}>Current Status</span>
                  <span style={{ background: '#2E2E2E', color: '#F4E8C1', padding: '6px 14px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem' }}>
                    🌸 {foundOrder.orderStatus}
                  </span>
                </div>
              </div>

              {/* Status Timeline Pipeline */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E', marginBottom: '20px', textAlign: 'center' }}>
                  Handcrafted Pipeline Progress
                </h4>

                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                    gap: '8px',
                    textAlign: 'center'
                  }}
                >
                  {statuses.map((s, idx) => {
                    const isPassed = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;

                    return (
                      <div key={s.key} style={{ opacity: isPassed ? 1 : 0.4 }}>
                        <div 
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            background: isCurrent ? 'linear-gradient(135deg, #C8A45D 0%, #9A7734 100%)' : isPassed ? '#E8B7C9' : '#E0E0E0',
                            color: isPassed ? '#FFFFFF' : '#666',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 8px',
                            boxShadow: isCurrent ? '0 0 15px rgba(200, 164, 93, 0.8)' : 'none',
                            transition: 'all 0.3s'
                          }}
                        >
                          {s.icon}
                        </div>
                        <span style={{ fontSize: '0.72rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#9A7734' : '#2E2E2E', display: 'block' }}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier & Tracking Info */}
              <div style={{ background: '#FFF9F6', padding: '16px', borderRadius: '16px', borderLeft: '4px solid #C8A45D', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#777' }}>Courier Partner:</span>
                  <span style={{ fontWeight: 600, color: '#2E2E2E' }}>{foundOrder.courierPartner}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#777' }}>Airway Bill Tracking #:</span>
                  <span style={{ fontWeight: 700, color: '#9A7734' }}>{foundOrder.trackingNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#777' }}>Estimated Doorstep Delivery:</span>
                  <span style={{ fontWeight: 600, color: '#2E2E2E' }}>{foundOrder.estimatedDelivery || 'In 4 Business Days'}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
