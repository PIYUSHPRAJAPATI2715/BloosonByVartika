const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  announcementText: { type: String, default: "Jaipur Studio Open for Luxury Bridal Trousseau & Festival Bookings" },
  heroHeading: { type: String, default: "Every Gift Tells a Story" },
  heroSubheading: { type: String, default: "Luxury Handmade Hampers crafted with love for every celebration." },
  tagline: { type: String, default: "Luxury Trousseau Packaging | Premium Gift Hampers" },
  boutiqueAddress: { type: String, default: "Plot 45, Malviya Nagar Luxury Corridor, Jaipur, Rajasthan 302017" },
  boutiquePhone: { type: String, default: "+91 98290 00000" },
  boutiqueEmail: { type: String, default: "contact@blossombyvartika.com" },
  instagramUrl: { type: String, default: "https://instagram.com" },
  whatsappNumber: { type: String, default: "919829000000" }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
