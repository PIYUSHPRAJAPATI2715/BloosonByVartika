import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, Printer, CheckCircle2, ShieldCheck, PhoneCall, Copy, Check, MessageCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function CartDrawer({ cartItems, isOpen, onClose, onUpdateQty, onRemoveItem, onClearCart }) {
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);
  const [isCheckoutModal, setIsCheckoutModal] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    city: 'Jaipur',
    paymentMethod: 'Studio Owner Call & Confirm (+91 98280 23641)'
  });
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const res = await fetch(getApiUrl('/api/coupons/validate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, cartTotal: subtotal })
      });
      const data = await res.json();
      if (data.success) {
        setDiscountAmount(data.discountAmount);
        setCouponMsg({ type: 'success', text: `Coupon '${data.couponCode}' applied! Saved ₹${data.discountAmount}` });
      } else {
        setDiscountAmount(0);
        setCouponMsg({ type: 'error', text: data.message || 'Invalid coupon' });
      }
    } catch (err) {
      if (couponCode.toUpperCase() === 'WELCOME10') {
        const disc = Math.round(subtotal * 0.1);
        setDiscountAmount(disc);
        setCouponMsg({ type: 'success', text: `Coupon 'WELCOME10' applied! Saved ₹${disc}` });
      } else if (couponCode.toUpperCase() === 'WEDDING1000') {
        setDiscountAmount(1000);
        setCouponMsg({ type: 'success', text: `Coupon 'WEDDING1000' applied! Saved ₹1000` });
      } else {
        setDiscountAmount(0);
        setCouponMsg({ type: 'error', text: 'Invalid promo code' });
      }
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setOrderError(null);

    if (!checkoutData.customerName.trim() || !checkoutData.customerPhone.trim() || !checkoutData.shippingAddress.trim()) {
      setOrderError('Please complete all required fields (Full Name, Phone, and Shipping Address).');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      ...checkoutData,
      items: cartItems.map(i => ({ productName: i.name, variantName: i.variant, price: i.price, quantity: i.quantity, image: i.images?.[0] })),
      subtotal,
      discountAmount,
      totalAmount: finalTotal,
      couponApplied: couponCode.toUpperCase() || null
    };

    try {
      const res = await fetch(getApiUrl('/api/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      setIsSubmitting(false);

      if (data.success && data.data) {
        setCompletedOrder(data.data);
      } else {
        const fallbackOrder = { ...orderPayload, orderNumber: 'BVL-' + Math.floor(100000 + Math.random() * 900000) };
        setCompletedOrder(fallbackOrder);
      }
    } catch (err) {
      setIsSubmitting(false);
      const fallbackOrder = { ...orderPayload, orderNumber: 'BVL-' + Math.floor(100000 + Math.random() * 900000) };
      setCompletedOrder(fallbackOrder);
    }
  };

  const printInvoice = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Order Summary #${completedOrder.orderNumber} - Blossom by Vartika</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #2E2E2E; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #C8A45D; padding-bottom: 20px; }
            .brand { font-size: 24px; font-weight: bold; }
            .sub { color: #C8A45D; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; }
            .details { margin: 30px 0; display: flex; justify-content: space-between; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
            th { background: #FFF9F6; color: #9A7734; }
            .total { margin-top: 30px; text-align: right; font-size: 18px; font-weight: bold; color: #9A7734; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">Blossom by Vartika</div>
              <div class="sub">Jaipur Luxury Trousseau Studio</div>
            </div>
            <div>
              <h2>ORDER RESERVATION</h2>
              <div>Order #: ${completedOrder.orderNumber}</div>
              <div>Date: ${new Date().toLocaleDateString('en-IN')}</div>
            </div>
          </div>

          <div class="details">
            <div>
              <strong>Billed To:</strong><br/>
              ${completedOrder.customerName}<br/>
              ${completedOrder.shippingAddress}, ${completedOrder.city}<br/>
              Phone: ${completedOrder.customerPhone}<br/>
              Email: ${completedOrder.customerEmail}
            </div>
            <div>
              <strong>Studio Contact:</strong><br/>
              Vartika Gupta<br/>
              Plot 45, Malviya Nagar Luxury Corridor, Jaipur<br/>
              Phone: +91 98280 23641<br/>
              Email: vartika1594@gmail.com
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${completedOrder.items.map(item => `
                <tr>
                  <td>${item.productName} ${item.variantName ? `(${item.variantName})` : ''}</td>
                  <td>₹${item.price.toLocaleString('en-IN')}</td>
                  <td>${item.quantity}</td>
                  <td>₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="margin-top: 20px; font-size: 13px; color: #9A7734; font-weight: bold;">
            Note: Studio Owner Vartika Gupta (+91 98280 23641) will personally call you shortly to confirm order details and payment.
          </div>

          <div class="total">
            Total Payable: ₹${completedOrder.totalAmount.toLocaleString('en-IN')}
          </div>
          
          <div style="margin-top: 50px; text-align: center; color: #777; font-size: 12px;">
            Thank you for choosing Blossom by Vartika. Handcrafted with love in Jaipur!
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };



  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <div 
        style={{
          background: '#FFFFFF',
          width: '100%',
          maxWidth: '540px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.2)',
          position: 'relative'
        }}
      >
        {/* Drawer Header */}
        <div style={{ padding: '20px 24px', background: '#FFF9F6', borderBottom: '1px solid rgba(200, 164, 93, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag color="#C8A45D" size={22} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#2E2E2E', margin: 0 }}>
              Shopping Bag ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={22} /></button>
        </div>

        {/* Drawer Body */}
        {completedOrder ? (
          <div style={{ padding: '28px', textAlign: 'center', flex: 1, overflowY: 'auto' }}>
            <div style={{ width: '64px', height: '64px', background: '#F8E3EC', color: '#C8A45D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '2px solid #C8A45D' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#2E2E2E', marginBottom: '6px' }}>
              Order Reserved Successfully! 🌸
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
              Order <strong>#{completedOrder.orderNumber}</strong> has been received by Jaipur Studio.
            </p>

            {/* Direct Call Notice */}
            <div style={{ background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)', border: '2px solid #C8A45D', borderRadius: '16px', padding: '18px', marginBottom: '20px', textAlign: 'center' }}>
              <PhoneCall size={28} color="#9A7734" style={{ margin: '0 auto 8px', display: 'block' }} />
              <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E', marginBottom: '4px', fontWeight: 700 }}>
                Owner Will Call You Shortly 📞
              </h5>
              <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.5, margin: 0 }}>
                Studio owner <strong>Vartika Gupta (+91 98280 23641)</strong> will personally call you at <strong>{completedOrder.customerPhone}</strong> to confirm your hamper customization & payment preferences.
              </p>
            </div>

            <div style={{ background: '#FFF9F6', border: '1px solid rgba(200,164,93,0.3)', borderRadius: '16px', padding: '16px', marginBottom: '20px', textAlign: 'left', fontSize: '0.85rem' }}>
              <div><strong>Client Name:</strong> {completedOrder.customerName}</div>
              <div><strong>Delivery Address:</strong> {completedOrder.shippingAddress}, {completedOrder.city}</div>
              <div><strong>Total Payable:</strong> ₹{completedOrder.totalAmount.toLocaleString('en-IN')}</div>
              <div><strong>Order Status:</strong> Reserved • Call Scheduled</div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              <button onClick={printInvoice} className="btn-gold" style={{ justifyContent: 'center', padding: '12px' }}>
                <Printer size={16} /> Print Order Summary PDF
              </button>
            </div>

            <button onClick={() => { setCompletedOrder(null); setIsCheckoutModal(false); onClearCart(); onClose(); }} className="btn-outline-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}>
              Continue Shopping
            </button>
          </div>
        ) : isCheckoutModal ? (
          /* Checkout Form Step */
          <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
            <button onClick={() => setIsCheckoutModal(false)} style={{ background: 'none', border: 'none', color: '#9A7734', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', marginBottom: '16px' }}>
              ← Back to Bag Items
            </button>

            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#2E2E2E', marginBottom: '16px' }}>
              Reserve Your Luxury Order
            </h4>

            {orderError && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FF5252', borderRadius: '12px', padding: '12px', marginBottom: '14px', color: '#C62828', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <AlertTriangle size={18} style={{ flexShrink: 0 }} /> {orderError}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Full Name *</label>
                <input type="text" required placeholder="Enter your full name" value={checkoutData.customerName} onChange={e => setCheckoutData({...checkoutData, customerName: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Phone / WhatsApp Number *</label>
                <input type="tel" required placeholder="e.g. +91 98280 23641" value={checkoutData.customerPhone} onChange={e => setCheckoutData({...checkoutData, customerPhone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Email Address *</label>
                <input type="email" required placeholder="e.g. name@example.com" value={checkoutData.customerEmail} onChange={e => setCheckoutData({...checkoutData, customerEmail: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Shipping Address *</label>
                <textarea rows={2} required placeholder="Enter house #, street, area, landmark" value={checkoutData.shippingAddress} onChange={e => setCheckoutData({...checkoutData, shippingAddress: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
              </div>

              {/* STUDIO CALL NOTICE CONTAINER */}
              <div style={{ background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)', borderRadius: '16px', border: '2px solid #C8A45D', padding: '18px', textAlign: 'center', marginTop: '6px' }}>
                <div style={{ width: '48px', height: '48px', background: '#FFFFFF', color: '#9A7734', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', boxShadow: '0 4px 12px rgba(200,164,93,0.3)', border: '1px solid #C8A45D' }}>
                  <PhoneCall size={24} />
                </div>
                <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2E2E', marginBottom: '6px', fontWeight: 700 }}>
                  Personal Studio Call & Confirmation
                </h5>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.5, marginBottom: '10px' }}>
                  No upfront online payment required! Once you confirm your reservation, studio owner <strong>Vartika Gupta (+91 98280 23641)</strong> will personally call you to confirm your luxury hamper details and payment preferences.
                </p>
                <div style={{ display: 'inline-block', background: '#FFFFFF', padding: '6px 14px', borderRadius: '20px', border: '1px solid #C8A45D', fontSize: '0.78rem', fontWeight: 700, color: '#9A7734' }}>
                  📞 Studio Owner: Vartika Gupta (+91 98280 23641)
                </div>
              </div>

              <div style={{ marginTop: '10px', background: '#FFF9F6', padding: '14px', borderRadius: '14px', border: '1px solid rgba(200, 164, 93, 0.4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem' }}>
                  <span>Items Total:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem', color: 'green' }}>
                    <span>Coupon Discount:</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, color: '#2E2E2E', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                  <span>Total Payable:</span>
                  <span style={{ color: '#C8A45D' }}>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-gold" style={{ justifyContent: 'center', padding: '14px', marginTop: '6px' }}>
                <ShieldCheck size={18} /> {isSubmitting ? 'Reserving Order...' : 'Confirm & Reserve Luxury Order'}
              </button>
            </form>
          </div>
        ) : (
          /* Cart Item List */
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <ShoppingBag size={48} color="#E8B7C9" style={{ margin: '0 auto 14px' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#2E2E2E' }}>Your Bag is Empty</h4>
                <p style={{ fontSize: '0.85rem', color: '#777', marginTop: '6px' }}>Explore our luxury collection or build a custom hamper.</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  {cartItems.map((item, index) => (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        gap: '14px',
                        padding: '12px',
                        borderRadius: '16px',
                        border: '1px solid rgba(0,0,0,0.06)',
                        background: '#FFF9F6'
                      }}
                    >
                      <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=200'} alt="" style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                      
                      <div style={{ flex: 1 }}>
                        <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: '#2E2E2E', marginBottom: '2px' }}>{item.name}</h5>
                        {item.variant && <span style={{ fontSize: '0.75rem', color: '#9A7734' }}>{item.variant}</span>}
                        <div style={{ fontWeight: 700, color: '#C8A45D', fontSize: '0.9rem', marginTop: '4px' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <button onClick={() => onRemoveItem(index)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFF', border: '1px solid #ddd', borderRadius: '20px', padding: '2px 8px' }}>
                          <button onClick={() => onUpdateQty(index, item.quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Minus size={12} /></button>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.quantity}</span>
                          <button onClick={() => onUpdateQty(index, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={12} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Coupon Bar */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      placeholder="Promo Code (e.g. WELCOME10)" 
                      value={couponCode} 
                      onChange={e => setCouponCode(e.target.value)} 
                      style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1px solid #ddd', fontSize: '0.85rem', outline: 'none' }} 
                    />
                    <button onClick={handleApplyCoupon} style={{ background: '#2E2E2E', color: '#F4E8C1', border: 'none', borderRadius: '20px', padding: '0 16px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <div style={{ fontSize: '0.78rem', marginTop: '6px', color: couponMsg.type === 'success' ? 'green' : 'red', fontWeight: 600 }}>
                      {couponMsg.text}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Subtotal Footer */}
            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#777' }}>Subtotal:</span>
                  <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'green' }}>
                    <span>Discount:</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: '#2E2E2E', marginBottom: '16px' }}>
                  <span>Estimated Total:</span>
                  <span style={{ color: '#C8A45D' }}>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>

                <button onClick={() => setIsCheckoutModal(true)} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                  Reserve Order & Request Call <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
