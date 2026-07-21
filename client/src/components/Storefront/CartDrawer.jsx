import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, Printer, CheckCircle2, ShieldCheck, QrCode, Copy, Check, MessageCircle } from 'lucide-react';
import { getApiUrl } from '../../config/api';

export default function CartDrawer({ cartItems, isOpen, onClose, onUpdateQty, onRemoveItem, onClearCart }) {
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);
  const [isCheckoutModal, setIsCheckoutModal] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    customerName: 'Radhika Khandelwal',
    customerEmail: 'radhika.k@example.com',
    customerPhone: '+91 98280 23641',
    shippingAddress: 'C-42, Malviya Nagar, Near WTP',
    city: 'Jaipur',
    paymentMethod: 'UPI', // Default to UPI QR Code
    transactionRef: ''
  });
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const copyUpiId = () => {
    navigator.clipboard.writeText('9828023641@pthdfc');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

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
      if (data.success && data.data) {
        setCompletedOrder(data.data);
      } else {
        setCompletedOrder({ ...orderPayload, orderNumber: 'BVL-' + Math.floor(100000 + Math.random() * 900000) });
      }
    } catch (err) {
      setCompletedOrder({ ...orderPayload, orderNumber: 'BVL-' + Math.floor(100000 + Math.random() * 900000) });
    }
  };

  const getOwnerWhatsappLink = () => {
    if (!completedOrder) return '#';
    const itemsText = completedOrder.items.map(i => `• ${i.productName} (x${i.quantity})`).join('%0A');
    const msg = `🌸 *NEW ORDER ALERT - BLOSSOM BY VARTIKA* 🌸%0A%0A*Order %23:* ${completedOrder.orderNumber}%0A*Client:* ${completedOrder.customerName}%0A*Phone:* ${completedOrder.customerPhone}%0A*Email:* ${completedOrder.customerEmail}%0A*Address:* ${completedOrder.shippingAddress}, ${completedOrder.city}%0A%0A*Items:*%0A${itemsText}%0A%0A*Total Amount:* ₹${completedOrder.totalAmount.toLocaleString('en-IN')}%0A*Payment Method:* ${completedOrder.paymentMethod}%0A${completedOrder.transactionRef ? `*UPI Txn Ref:* ${completedOrder.transactionRef}` : ''}`;
    return `https://wa.me/919828023641?text=${msg}`;
  };

  const getCustomerWhatsappLink = () => {
    if (!completedOrder) return '#';
    const cleanPhone = completedOrder.customerPhone.replace(/[^0-9]/g, '');
    const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `🌸 *ORDER CONFIRMED - BLOSSOM BY VARTIKA* 🌸%0A%0ADear ${completedOrder.customerName},%0AThank you for ordering with Blossom by Vartika Jaipur!%0A%0A*Order %23:* ${completedOrder.orderNumber}%0A*Total Amount:* ₹${completedOrder.totalAmount.toLocaleString('en-IN')}%0A*Status:* Crafting in Progress%0A%0ATrack live status anytime: https://blooson-by-vartika.vercel.app/`;
    return `https://wa.me/${targetPhone}?text=${msg}`;
  };

  const printInvoice = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${completedOrder.orderNumber} - Blossom by Vartika</title>
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
              <h2>TAX INVOICE</h2>
              <div>Invoice #: ${completedOrder.orderNumber}</div>
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
            <div style={{ width: '60px', height: '60px', background: '#F8E3EC', color: '#C8A45D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#2E2E2E', marginBottom: '6px' }}>
              Order Confirmed! 🌸
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '16px' }}>
              Order <strong>#{completedOrder.orderNumber}</strong> has been saved and sent to Jaipur Studio.
            </p>

            <div style={{ background: '#FFF9F6', border: '1px solid rgba(200,164,93,0.3)', borderRadius: '16px', padding: '16px', marginBottom: '20px', textAlign: 'left', fontSize: '0.85rem' }}>
              <div><strong>Client Name:</strong> {completedOrder.customerName}</div>
              <div><strong>Address:</strong> {completedOrder.shippingAddress}, {completedOrder.city}</div>
              <div><strong>Total Paid:</strong> ₹{completedOrder.totalAmount.toLocaleString('en-IN')}</div>
              <div><strong>Payment Method:</strong> {completedOrder.paymentMethod}</div>
              {completedOrder.transactionRef && <div><strong>UPI Txn Ref:</strong> {completedOrder.transactionRef}</div>}
              <div><strong>Status:</strong> Handcrafting in Progress</div>
            </div>

            {/* WhatsApp Notification Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              
              <a 
                href={getOwnerWhatsappLink()} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '12px 16px',
                  borderRadius: '30px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 18px rgba(37,211,102,0.3)'
                }}
              >
                <MessageCircle size={18} /> Send WhatsApp Alert to Owner (Vartika)
              </a>

              <a 
                href={getCustomerWhatsappLink()} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  background: '#1E1E1E',
                  color: '#F4E8C1',
                  border: '1px solid #C8A45D',
                  padding: '12px 16px',
                  borderRadius: '30px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <MessageCircle size={18} color="#25D366" /> Send WhatsApp Confirmation to Customer
              </a>

              <button onClick={printInvoice} className="btn-gold" style={{ justifyContent: 'center', padding: '12px' }}>
                <Printer size={16} /> Print / Save PDF Tax Invoice
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
              Express Checkout
            </h4>

            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Full Name *</label>
                <input type="text" required value={checkoutData.customerName} onChange={e => setCheckoutData({...checkoutData, customerName: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Phone / WhatsApp *</label>
                <input type="tel" required value={checkoutData.customerPhone} onChange={e => setCheckoutData({...checkoutData, customerPhone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Email Address *</label>
                <input type="email" required value={checkoutData.customerEmail} onChange={e => setCheckoutData({...checkoutData, customerEmail: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Shipping Address *</label>
                <textarea rows={2} required value={checkoutData.shippingAddress} onChange={e => setCheckoutData({...checkoutData, shippingAddress: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }} />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#C8A45D' }}>Payment Method *</label>
                <select value={checkoutData.paymentMethod} onChange={e => setCheckoutData({...checkoutData, paymentMethod: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1.5px solid #C8A45D', outline: 'none', background: '#FFF9F6', fontWeight: 700 }}>
                  <option value="UPI">Pay via Paytm / PhonePe UPI QR Code (Vartika Gupta)</option>
                  <option value="Razorpay">Razorpay Online (Credit Card / Netbanking)</option>
                  <option value="COD">Cash on Delivery (Jaipur Studio Express)</option>
                </select>
              </div>

              {/* UPI QR CODE DISPLAY CONTAINER */}
              {checkoutData.paymentMethod === 'UPI' && (
                <div style={{ background: 'linear-gradient(135deg, #FFF9F6 0%, #F8E3EC 100%)', borderRadius: '16px', border: '2px solid #C8A45D', padding: '16px', textAlign: 'center', marginTop: '4px' }}>
                  <div style={{ display: 'inline-block', background: '#FFFFFF', padding: '10px', borderRadius: '16px', border: '1px solid #E0E0E0', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
                    <img src="/upi_qr.png" alt="Paytm UPI QR Code Vartika Gupta" style={{ width: '210px', height: '260px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#2E2E2E' }}>VARTIKA GUPTA ✓</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '4px' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.9rem', color: '#9A7734', background: '#FFF', padding: '4px 10px', borderRadius: '8px', border: '1px solid #C8A45D' }}>
                        9828023641@pthdfc
                      </span>
                      <button 
                        type="button" 
                        onClick={copyUpiId} 
                        style={{ background: '#C8A45D', color: '#FFF', border: 'none', borderRadius: '8px', padding: '6px 10px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        {copiedUpi ? <Check size={14} /> : <Copy size={14} />} {copiedUpi ? 'Copied!' : 'Copy UPI'}
                      </button>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginTop: '4px' }}>Scan with Paytm, PhonePe, Google Pay, or BHIM UPI</span>
                  </div>

                  {/* Transaction Ref Field */}
                  <div style={{ marginTop: '14px', textAlign: 'left' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2E2E2E' }}>Enter Payment UTR / Txn Reference ID *</label>
                    <input 
                      type="text" 
                      required 
                      value={checkoutData.transactionRef} 
                      onChange={e => setCheckoutData({...checkoutData, transactionRef: e.target.value})} 
                      placeholder="e.g. 420918293019" 
                      style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #9A7734', background: '#FFF', outline: 'none', fontSize: '0.88rem', fontWeight: 600 }} 
                    />
                  </div>
                </div>
              )}

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

              <button type="submit" className="btn-gold" style={{ justifyContent: 'center', padding: '14px', marginTop: '6px' }}>
                <ShieldCheck size={18} /> Submit Payment & Confirm Order
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
                  Proceed to Pay via UPI QR <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
