import React, { useState, useEffect } from 'react';
import { ShoppingBag, Printer, Eye, Truck, CheckCircle2, Search } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      _id: '1',
      orderNumber: 'BVL-882910',
      customerName: 'Radhika Khandelwal',
      customerEmail: 'radhika.k@example.com',
      customerPhone: '+91 98291 55443',
      shippingAddress: 'C-42, Malviya Nagar, Near WTP',
      city: 'Jaipur',
      items: [
        { productName: 'Royal Pink Jaipur Bridal Trousseau Box Set', variantName: '5-Piece Royal Edition', price: 16500, quantity: 1 }
      ],
      subtotal: 16500,
      discountAmount: 1000,
      totalAmount: 15500,
      paymentMethod: 'Razorpay',
      paymentStatus: 'Paid',
      orderStatus: 'Crafting',
      trackingNumber: 'BD-JPR-9921',
      createdAt: '2026-07-18'
    }
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) setOrders(data.data);
      })
      .catch(err => console.warn("Admin orders fallback:", err));
  }, []);

  const updateOrderStatus = async (id, status) => {
    const updated = orders.map(o => o._id === id ? { ...o, orderStatus: status } : o);
    setOrders(updated);

    try {
      await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: status })
      });
    } catch (err) {
      console.warn("Status update fallback:", err);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#F4E8C1', margin: 0 }}>
          Order Management System
        </h1>
        <p style={{ color: '#AAA', fontSize: '0.88rem' }}>
          Monitor order status pipeline: Pending → Designing → Crafting → Packing → Ready to Dispatch → Shipped → Delivered.
        </p>
      </div>

      <div style={{ background: '#282828', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#1E1E1E', color: '#C8A45D', borderBottom: '1px solid rgba(200,164,93,0.3)' }}>
              <th style={{ padding: '14px 18px' }}>Order #</th>
              <th style={{ padding: '14px 18px' }}>Client</th>
              <th style={{ padding: '14px 18px' }}>Amount</th>
              <th style={{ padding: '14px 18px' }}>Payment</th>
              <th style={{ padding: '14px 18px' }}>Craft Status</th>
              <th style={{ padding: '14px 18px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#F4E8C1' }}>#{order.orderNumber}</td>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ color: '#FFF', fontWeight: 600 }}>{order.customerName}</div>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>{order.customerPhone} ({order.city})</span>
                </td>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: '#FFF' }}>
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ background: '#1B3E2B', color: '#4CAF50', padding: '3px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>
                    {order.paymentStatus} ({order.paymentMethod})
                  </span>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <select 
                    value={order.orderStatus}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    style={{ background: '#1E1E1E', color: '#C8A45D', border: '1px solid #C8A45D', padding: '6px 10px', borderRadius: '10px', fontSize: '0.8rem', outline: 'none' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Designing">Designing</option>
                    <option value="Crafting">Crafting</option>
                    <option value="Packing">Packing</option>
                    <option value="Ready to Dispatch">Ready to Dispatch</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem' }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#282828', borderRadius: '20px', padding: '28px', maxWidth: '540px', width: '100%', border: '1px solid #C8A45D' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#F4E8C1', fontSize: '1.4rem', marginBottom: '14px' }}>
              Order #{selectedOrder.orderNumber} Details
            </h3>

            <div style={{ fontSize: '0.85rem', color: '#DDD', marginBottom: '16px' }}>
              <div><strong>Client Name:</strong> {selectedOrder.customerName}</div>
              <div><strong>Phone:</strong> {selectedOrder.customerPhone}</div>
              <div><strong>Address:</strong> {selectedOrder.shippingAddress}, {selectedOrder.city}</div>
              <div><strong>Tracking #:</strong> {selectedOrder.trackingNumber || 'Pending AWB'}</div>
            </div>

            <div style={{ background: '#1E1E1E', padding: '14px', borderRadius: '12px', marginBottom: '20px' }}>
              <h5 style={{ color: '#C8A45D', margin: '0 0 8px' }}>Items Ordered:</h5>
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#FFF', marginBottom: '4px' }}>
                  <span>{it.productName} ({it.variantName || 'Standard'}) x{it.quantity}</span>
                  <span>₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setSelectedOrder(null)} className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
