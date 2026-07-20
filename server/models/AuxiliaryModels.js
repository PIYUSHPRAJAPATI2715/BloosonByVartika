const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventDate: { type: Date },
  guestCount: { type: Number },
  occasion: { type: String, default: 'Wedding Trousseau' },
  message: { type: String, required: true },
  status: { type: String, enum: ['Unread', 'In Progress', 'Responded', 'Archived'], default: 'Unread' }
}, { timestamps: true });

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'flat'], default: 'percentage' },
  discountValue: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  maxDiscount: { type: Number },
  usageLimit: { type: Number, default: 100 },
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  imageUrl: { type: String, required: true },
  ctaText: { type: String, default: 'Explore Collection' },
  ctaLink: { type: String, default: '#collection' },
  position: { type: String, enum: ['hero', 'festive', 'middle_slider'], default: 'hero' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  location: { type: String, default: 'Jaipur, Rajasthan' },
  occasion: { type: String, default: 'Bridal Trousseau Box Set' },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  reviewText: { type: String, required: true },
  photoUrl: { type: String },
  isApproved: { type: Boolean, default: true }
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
  Inquiry: mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema),
  Coupon: mongoose.models.Coupon || mongoose.model('Coupon', couponSchema),
  Banner: mongoose.models.Banner || mongoose.model('Banner', bannerSchema),
  Review: mongoose.models.Review || mongoose.model('Review', reviewSchema),
  CalendarEvent: mongoose.models.CalendarEvent || mongoose.model('CalendarEvent', calendarEventSchema)
};
