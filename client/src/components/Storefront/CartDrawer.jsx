import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ cartItems, isOpen, onClose, onUpdateQty, onRemoveItem, onClearCart }) {
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);
  const [isCheckoutModal, setIsCheckoutModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    customerName: 'Radhika Khandelwal',
    customerEmail: 'radhika.k@example.com',
    customerPhone: '+91 98291 55443',
    shippingAddress: 'C-42, Malviya Nagar, Near WTP',
    city: 'Jaipur',
    paymentMethod: 'Razorpay'
  });
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const res = await fetch('/api/coupons/validate', {
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
      const res = await fetch('/api/orders', {
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
            .total { font-size: 18px; font-weight: bold; text-align: right; padding-top: 20px; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">Blossom by Vartika</div>
              <div class="sub">Luxury Trousseau Packaging & Gift Hampers Studio</div>
              <p style="font-size:12px; margin-top:5px;">Jaipur, Rajasthan • Phone: +91 98290 00000</p>
            </div>
            <div style="text-align:right;">
              <h3>INVOICE</h3>
              <p><strong>Invoice #:</strong> ${completedOrder.orderNumber}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </div>

          <div class="details">
            <div>
              <strong>Billed & Shipped To:</strong>
              <p>${completedOrder.customerName}</p>
              <p>${completedOrder.shippingAddress}, ${completedOrder.city}</p>
              <p>Phone: ${completedOrder.customerPhone}</p>
            </div>
            <div style="text-align:right;">
              <strong>Payment Status:</strong> PAID (${completedOrder.paymentMethod})<br/>
              <strong>Status:</strong> ${completedOrder.orderStatus || 'Crafting'}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Edition / Variant</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${completedOrder.items.map(item => `
                <tr>
                  <td>${item.productName}</td>
                  <td>${item.variantName || 'Standard'}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price.toLocaleString('en-IN')}</td>
                  <td>₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total">
            <p>Subtotal: ₹${completedOrder.subtotal.toLocaleString('en-IN')}</p>
            ${completedOrder.discountAmount ? `<p style="color:green;">Discount: -₹${completedOrder.discountAmount.toLocaleString('en-IN')}</p>` : ''}
            <p style="font-size:22px; color:#9A7734;">Grand Total: ₹${completedOrder.totalAmount.toLocaleString('en-IN')}</p>
          </div>

          <div class="footer">
            <p>🌸 Thank you for choosing Blossom by Vartika! Every gift is handcrafted with love in Jaipur.</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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
        <div style={{ padding: '24px', background: '#FFF9F6', borderBottom: '1px solid rgba(200, 164, 93, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag color="#C8A45D" size={22} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#2E2E2E' }}>
              Shopping Bag ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={22} /></button>
        </div>

        {/* Drawer Body */}
        {completedOrder ? (
          <div style={{ padding: '36px', textAlign: 'center', flex: 1, overflowY: 'auto' }}>
            <div style={{ width: '60px', height: '60px', background: '#F8E3EC', color: '#C8A45D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#2E2E2E', marginBottom: '8px' }}>
              Order Confirmed!
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '16px' }}>
              Order <strong>#{completedOrder.orderNumber}</strong> has been sent to our Jaipur studio team.
            </p>

            <div style={{ background: '#FFF9F6', border: '1px solid rgba(200,164,93,0.3)', borderRadius: '16px', padding: '16px', marginBottom: '24px', textAlign: 'left', fontSize: '0.85rem' }}>
              <div><strong>Customer:</strong> {completedOrder.customerName}</div>
              <div><strong>Address:</strong> {completedOrder.shippingAddress}, {completedOrder.city}</div>
              <div><strong>Total Paid:</strong> ₹{completedOrder.totalAmount.toLocaleString('en-IN')}</div>
              <div><strong>Status:</strong> Crafting in Progress</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={printInvoice} className="btn-gold" style={{ justifyContent: 'center' }}>
                <Printer size={16} /> Print / Save PDF Invoice
              </button>
              <button onClick={() => { setCompletedOrder(null); setIsCheckoutModal(false); onClearCart(); onClose(); }} className="btn-outline-gold" style={{ justifyContent: 'center' }}>
                Continue Shopping
              </button>
            </div>
          </div>
        ) : isCheckoutModal ? (
          /* Checkout Form Step */
          <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
            <button onClick={() => setIsCheckoutModal(false)} style={{ background: 'none', border: 'none', color: '#9A7734', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', marginBottom: '16px' }}>
              ← Back to Bag Items
            </button>

            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#2E2E2E', marginBottom: '16px' }}>
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
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Payment Method</label>
                <select value={checkoutData.paymentMethod} onChange={e => setCheckoutData({...checkoutData, paymentMethod: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none', background: '#FFF9F6' }}>
                  <option value="Razorpay">Razorpay (Cards, UPI, Netbanking)</option>
                  <option value="UPI">Direct UPI Transfer (GPay / PhonePe)</option>
                  <option value="COD">Cash on Delivery (Jaipur Express)</option>
                </select>
              </div>

              <div style={{ marginTop: '16px', background: '#FFF9F6', padding: '16px', borderRadius: '14px', border: '1px solid rgba(200, 164, 93, 0.4)' }}>
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

              <button type="submit" className="btn-gold" style={{ justifyContent: 'center', padding: '14px', marginTop: '10px' }}>
                <ShieldCheck size={18} /> Confirm & Place Luxury Order
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
                        <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.98rem', color: '#2E2E2E', margin: 0 }}>{item.name}</h5>
                        <span style={{ fontSize: '0.75rem', color: '#C8A45D', fontWeight: 600 }}>{item.variant || 'Standard'}</span>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#2E2E2E' }}>₹{item.price.toLocaleString('en-IN')}</div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #ccc', borderRadius: '14px', background: '#FFF' }}>
                            <button onClick={() => onUpdateQty(index, item.quantity - 1)} style={{ border: 'none', background: 'none', padding: '4px 8px', cursor: 'pointer' }}><Minus size={12} /></button>
                            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{item.quantity}</span>
                            <button onClick={() => onUpdateQty(index, item.quantity + 1)} style={{ border: 'none', background: 'none', padding: '4px 8px', cursor: 'pointer' }}><Plus size={12} /></button>
                          </div>

                          <button onClick={() => onRemoveItem(index)} style={{ border: 'none', background: 'none', color: '#e53935', cursor: 'pointer' }}><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2E2E2E', display: 'block', marginBottom: '6px' }}>
                    Apply Promo / Coupon Code:
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text"
                      placeholder="e.g. WELCOME10 or WEDDING1000"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '12px', border: '1px solid #C8A45D', fontSize: '0.85rem', outline: 'none' }}
                    />
                    <button onClick={handleApplyCoupon} className="btn-gold" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <span style={{ fontSize: '0.78rem', color: couponMsg.type === 'success' ? 'green' : 'red', display: 'block', marginTop: '4px' }}>
                      {couponMsg.text}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Cart Footer Summary */}
            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem', color: 'green' }}>
                    <span>Coupon Savings:</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, color: '#2E2E2E', marginBottom: '16px' }}>
                  <span>Grand Total:</span>
                  <span style={{ color: '#C8A45D' }}>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>

                <button onClick={() => setIsCheckoutModal(true)} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                  <span>Proceed to Express Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
