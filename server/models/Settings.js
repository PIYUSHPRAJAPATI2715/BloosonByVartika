const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  announcementText: { type: String, default: "Jaipur Studio Open for Luxury Bridal Trousseau & Festival Bookings" },
  heroHeading: { type: String, default: "Every Gift Tells a Story" },
  heroSubheading: { type: String, default: "Luxury Handmade Hampers crafted with love for every celebration." },
  tagline: { type: String, default: "Luxury Trousseau Packaging | Premium Gift Hampers" },
  giftBoxImage: { type: String, default: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800" },
  giftBoxTitle: { type: String, default: "Tap to Unwrap Luxury" },
  giftBoxSubtitle: { type: String, default: "Handcrafted Bridal Trousseau Box Set" },
  boutiqueAddress: { type: String, default: "Plot 45, Malviya Nagar Luxury Corridor, Jaipur, Rajasthan 302017" },
  boutiquePhone: { type: String, default: "+91 98290 00000" },
  boutiqueEmail: { type: String, default: "contact@blossombyvartika.com" },
  instagramUrl: { type: String, default: "https://instagram.com" },
  whatsappNumber: { type: String, default: "919829000000" }
}, { timestamps: true });

module.exports = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
