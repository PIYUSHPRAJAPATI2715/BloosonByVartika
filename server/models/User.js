const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  savedAddresses: [{ type: String }],
  totalSpend: { type: Number, default: 0 },
  orderCount: { type: Number, default: 0 },
  lastLogin: { type: Date, default: Date.now },
  wishlist: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
