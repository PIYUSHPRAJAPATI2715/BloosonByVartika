const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, enum: ['Wedding', 'Corporate', 'Bulk Order', 'General', 'Collaboration'], default: 'Wedding' },
  message: { type: String, required: true },
  status: { type: String, enum: ['Unread', 'In Progress', 'Responded', 'Archived'], default: 'Unread' },
  assignedStaff: { type: String, default: 'Vartika Gupta' }
}, { timestamps: true });

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['percentage', 'flat'], default: 'percentage' },
  discountValue: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  maxDiscount: { type: Number },
  expiryDate: { type: Date },
  usageLimit: { type: Number, default: 100 },
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  badgeText: { type: String, default: "Luxury Festive Edition" },
  imageUrl: { type: String, required: true },
  ctaText: { type: String, default: "Explore Collection" },
  ctaLink: { type: String, default: "#collection" },
  sectionType: { type: String, enum: ['Hero', 'Offer', 'Festival', 'Wedding'], default: 'Hero' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  location: { type: String, default: "Jaipur, Rajasthan" },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  reviewText: { type: String, required: true },
  occasion: { type: String, default: "Bridal Trousseau" },
  photoUrl: { type: String },
  isApproved: { type: Boolean, default: true }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  savedAddresses: [{ type: String }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

const calendarEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventType: { type: String, enum: ['Wedding', 'Delivery Dispatch', 'Festival Rush', 'VIP Client Meeting'], default: 'Wedding' },
  clientName: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Postponed'], default: 'Scheduled' }
}, { timestamps: true });

module.exports = {
  Inquiry: mongoose.model('Inquiry', inquirySchema),
  Coupon: mongoose.model('Coupon', couponSchema),
  Banner: mongoose.model('Banner', bannerSchema),
  Review: mongoose.model('Review', reviewSchema),
  User: mongoose.model('User', userSchema),
  CalendarEvent: mongoose.model('CalendarEvent', calendarEventSchema)
};
