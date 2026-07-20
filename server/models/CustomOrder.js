const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema({
  requestNumber: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientPhone: { type: String, required: true },
  occasion: { type: String, required: true }, // e.g. Wedding Trousseau, Baby Shower, Corporate
  budgetRange: { type: String, required: true }, // e.g. ₹15,000 - ₹50,000
  themeColor: { type: String }, // e.g. Blush Pink & Antique Gold
  recipientName: { type: String },
  deliveryDate: { type: Date },
  customMessage: { type: String },
  referenceImageUrl: { type: String },
  status: { 
    type: String, 
    enum: ['New Request', 'Under Review', 'Quote Sent', 'Accepted', 'Crafting', 'Completed', 'Rejected'], 
    default: 'New Request' 
  },
  quotedPrice: { type: Number },
  adminNotes: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.CustomOrder || mongoose.model('CustomOrder', customOrderSchema);
