const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  announcementText: { type: String, default: "👑 JAIPUR STUDIO OPEN FOR LUXURY BRIDAL TROUSSEAU & FESTIVAL BOOKINGS" },
  heroHeading: { type: String, default: "Every Gift Tells a Story" },
  heroSubheading: { type: String, default: "Luxury Handmade Hampers & Trousseau Packaging crafted with love in Jaipur." },
  contactEmail: { type: String, default: "vartika1594@gmail.com" },
  contactPhone: { type: String, default: "+91 98280 23641" },
  address: { type: String, default: "Shop No G3, Ganesham 2, Nursery Cir, Indraprastha Colony, B Block, Vaishali Nagar, Jaipur, Rajasthan 302021" }
}, { timestamps: true });

module.exports = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
