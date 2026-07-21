const mongoose = require('mongoose');

// Clear any cached model schema to force fresh compilation without legacy enum restrictions
if (mongoose.models && mongoose.models.Order) {
  delete mongoose.models.Order;
}
if (mongoose.modelSchemas && mongoose.modelSchemas.Order) {
  delete mongoose.modelSchemas.Order;
}

const orderItemSchema = new mongoose.Schema({
  productName: String,
  variantName: String,
  price: Number,
  quantity: Number,
  image: String
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, default: '' },
  customerPhone: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  city: { type: String, default: "Jaipur" },
  items: [orderItemSchema],
  subtotal: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  couponApplied: { type: String },
  transactionRef: { type: String },
  paymentMethod: { type: String, default: 'UPI' },
  paymentStatus: { type: String, default: 'Owner Call Scheduled' },
  orderStatus: { 
    type: String, 
    default: 'Crafting'
  },
  trackingNumber: { type: String },
  courierPartner: { type: String, default: 'BlueDart Luxury Express' },
  customerNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
