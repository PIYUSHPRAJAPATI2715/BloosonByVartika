const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  announcementText: { type: String, default: "👑 JAIPUR STUDIO OPEN FOR LUXURY BRIDAL TROUSSEAU & FESTIVAL BOOKINGS" },
  heroHeading: { type: String, default: "Every Gift Tells a Story" },
  heroSubheading: { type: String, default: "Luxury Handmade Hampers & Trousseau Packaging crafted with love in Jaipur." },
  contactEmail: { type: String, default: "vartika1594@gmail.com" },
  contactPhone: { type: String, default: "+91 98280 23641" },
  address: { type: String, default: "Shop No G3, Ganesham 2, Nursery Cir, Indraprastha Colony, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021" },
  aboutTitle: { type: String, default: "Founder Vartika Gupta" },
  aboutHeading: { type: String, default: "Meet Founder Vartika Gupta" },
  aboutDescription: { type: String, default: "Born in the vibrant Pink City of Jaipur, Vartika founded Blossom by Vartika with a single mission: to transform standard gifting into emotional, unforgettable works of art." },
  aboutImage: { type: String, default: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800" },
  aboutBadgeText: { type: String, default: "10,000+ Gifts Packed" },
  aboutBadgeSub: { type: String, default: "Trusted by Brides & Planners" },
  aboutValuesTitle: { type: String, default: "Why Blossom Gifts Are Treasured Forever" },
  aboutValuesDesc: { type: String, default: "Unlike mass-manufactured boxes, every gift created at our Jaipur studio carries individual character. We combine royal Rajasthani heritage motifs with modern minimalist French aesthetics." },
  aboutValue1Title: { type: String, default: "Custom Theme Matching" },
  aboutValue1Desc: { type: String, default: "Color-coordinated to match your wedding outfit or event decor." },
  aboutValue2Title: { type: String, default: "Monogram Personalization" },
  aboutValue2Desc: { type: String, default: "Custom foil printing with initials, dates, and handwritten scrolls." },
  aboutValue3Title: { type: String, default: "Eco-Conscious Keepsakes" },
  aboutValue3Desc: { type: String, default: "Reusable trunks and rigid boxes built to last a lifetime." }
}, { timestamps: true });

module.exports = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
