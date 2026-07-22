const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');
dotenv.config();

if (dns.setServers) {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {}
}
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const CustomOrder = require('../models/CustomOrder');
const { Inquiry, Coupon, Banner, Review, CalendarEvent } = require('../models/AuxiliaryModels');

const sampleCategories = [
  { name: 'Rakhi', slug: 'rakhi', description: 'Designer Rakhis, hampers, and custom greeting packs', sortOrder: 1, isFeatured: true },
  { name: 'Keychains', slug: 'keychains', description: 'Handcrafted customized name keychains & resin hooks', sortOrder: 2, isFeatured: true },
  { name: 'Birthday', slug: 'birthday', description: 'Exquisite personalized cards, surprise packs, and gift items', sortOrder: 3, isFeatured: true },
  { name: 'Anniversary', slug: 'anniversary', description: 'Memorable couple items, keepsakes, and customized frames', sortOrder: 4, isFeatured: true },
  { name: 'Wedding', slug: 'wedding', description: 'Custom bridal packing, ring boxes, and shagun trays', sortOrder: 5, isFeatured: true },
  { name: 'Corporate', slug: 'corporate', description: 'Premium corporate gifts, planners, and branding kits', sortOrder: 6, isFeatured: true },
  { name: 'Baby Shower', slug: 'baby-shower', description: 'Newborn congratulations packs & theme hampers', sortOrder: 7, isFeatured: true },
  { name: 'Explosion Boxes', slug: 'explosion-boxes', description: 'Interactive multi-layer photo explosion boxes', sortOrder: 8, isFeatured: true },
  { name: 'Festive', slug: 'festive', description: 'Diwali chests, Karwa Chauth hampers, and seasonal delights', sortOrder: 9, isFeatured: true }
];

const sampleProducts = [
  {
    name: "Royal Zari Designer Rakhi Set",
    sku: "BV-RAKHI-01",
    category: "Rakhi",
    subCategory: "Premium Rakhis",
    price: 990,
    discountPrice: 750,
    rating: 5.0,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Premium handcrafted Rakhi with beautiful Jaipur gold zari threading, embellishments, and custom Roli Chawal platter packaging.",
    materialUsed: "Jaipur Zari thread, beads, custom card",
    dimensions: "6 x 4 inches",
    weight: "0.1 kg",
    availableColors: ["Royal Crimson", "Emerald Gold"],
    tags: ["Rakhi", "Festival", "Handmade"],
    stock: 50,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    variants: [
      { name: "Single Premium Rakhi", price: 750, stock: 50 }
    ],
    seoTitle: "Designer Handcrafted Zari Rakhi | Blossom by Vartika",
    seoDescription: "Exquisite handmade zari designer Rakhi set crafted by Vartika Gupta."
  },
  {
    name: "Personalized Resin Name Keychain",
    sku: "BV-KEY-01",
    category: "Keychains",
    subCategory: "Resin Art",
    price: 490,
    discountPrice: 350,
    rating: 4.9,
    reviewCount: 31,
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Elegant customized keychain embedded with gold leaf flakes, dried botanicals, and customized cursive brass monogram name.",
    materialUsed: "Resin, Gold Leaf flakes, Brass Monograms",
    dimensions: "2.5 x 1 inches",
    weight: "0.05 kg",
    availableColors: ["Clear Gold", "Rose Petal Blush", "Ocean Teal"],
    tags: ["Keychain", "Resin", "Personalized"],
    stock: 100,
    isFeatured: true,
    isBestSeller: true,
    variants: [
      { name: "Standard Resin Name", price: 350, stock: 100 }
    ]
  },
  {
    name: "Classic Happy Birthday Explosion Box",
    sku: "BV-EX-01",
    category: "Explosion Boxes",
    subCategory: "Birthdays",
    price: 3400,
    discountPrice: 2990,
    rating: 5.0,
    reviewCount: 19,
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
    ],
    description: "4-layer interactive handmade box that unfolds to reveal custom picture layouts, greetings, and a center compartment for a gift.",
    materialUsed: "300GSM cardstock, satin ribbon, prints",
    dimensions: "6 x 6 x 6 inches",
    weight: "0.7 kg",
    availableColors: ["Charcoal & Blush", "Royal Blue & Gold"],
    tags: ["Explosion Box", "Birthday", "Handmade"],
    stock: 20,
    isFeatured: true,
    variants: [
      { name: "3-Layer Standard", price: 2990, stock: 15 },
      { name: "4-Layer Deluxe", price: 3900, stock: 5 }
    ]
  },
  {
    name: "Luxury Peacock Mirror Shagun Tray",
    sku: "BV-WED-01",
    category: "Wedding",
    subCategory: "Shagun Trays",
    price: 6800,
    discountPrice: 5950,
    rating: 4.8,
    reviewCount: 14,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Beautiful mirror base shagun tray lined with Jaipur gota lace, pearls, and royal peacock borders.",
    materialUsed: "Mirror Glass, Gold Lace, Pearls",
    dimensions: "16 x 12 x 4 inches",
    weight: "1.8 kg",
    availableColors: ["Gold Mirror", "Silver Lace"],
    tags: ["Wedding", "Shagun", "Mirror Tray"],
    stock: 15,
    isFeatured: true,
    variants: [
      { name: "Standard Size", price: 5950, stock: 15 }
    ]
  }
];

const sampleCustomOrders = [
  {
    requestNumber: "BV-CUST-9012",
    clientName: "Ananya Sharma",
    clientEmail: "ananya.sharma@example.com",
    clientPhone: "+91 98290 12345",
    occasion: "Bridal Trousseau & Sangeet Hampers",
    budgetRange: "₹45,000 - ₹60,000",
    themeColor: "Blush Pink & Vintage Champagne Gold",
    recipientName: "Ananya & Rohan",
    deliveryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    customMessage: "Need 12 custom trouseau trays with embroidered initials 'A & R' and matching Mehendi gift favors for 50 guests.",
    status: "Under Review",
    quotedPrice: 52000,
    adminNotes: "Client requested initial consultation at Jaipur Studio. Samples sent over WhatsApp."
  },
  {
    requestNumber: "BV-CUST-9015",
    clientName: "Vikram Mehta (Oberoi Hotels)",
    clientEmail: "v.mehta@oberoigroup.com",
    clientPhone: "+91 94140 98765",
    occasion: "VIP Corporate Diwali hampers",
    budgetRange: "₹1,000,00 - ₹1,50,000",
    themeColor: "Royal Navy & Foil Gold",
    recipientName: "Executive Clients",
    deliveryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    customMessage: "Bulk order for 40 luxury leatherette hampers containing gold diyas and gourmet dry fruits.",
    status: "Quote Sent",
    quotedPrice: 140000,
    adminNotes: "Quotation sent via PDF email. Awaiting approval from procurement team."
  }
];

const sampleOrders = [
  {
    orderNumber: "BVL-882910",
    customerName: "Radhika Khandelwal",
    customerEmail: "radhika.k@example.com",
    customerPhone: "+91 98291 55443",
    shippingAddress: "C-42, Malviya Nagar, Near World Trade Park",
    city: "Jaipur",
    items: [
      {
        productName: "Royal Pink Jaipur Bridal Trousseau Box Set",
        variantName: "5-Piece Royal Edition",
        price: 16500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
      }
    ],
    subtotal: 16500,
    discountAmount: 1000,
    shippingFee: 0,
    totalAmount: 15500,
    couponApplied: "WEDDING1000",
    paymentMethod: "Razorpay",
    paymentStatus: "Paid",
    orderStatus: "Crafting",
    trackingNumber: "BD-JPR-9921",
    customerNotes: "Please deliver carefully with silk ribbon untied for inspection."
  }
];

const sampleCoupons = [
  { code: "WELCOME10", discountType: "percentage", discountValue: 10, minOrderValue: 2000, maxDiscount: 1500 },
  { code: "WEDDING1000", discountType: "flat", discountValue: 1000, minOrderValue: 10000 },
  { code: "DIWALI25", discountType: "percentage", discountValue: 15, minOrderValue: 5000, maxDiscount: 2500 }
];

const sampleReviews = [
  {
    customerName: "Priyanka Ranawat",
    location: "Jaipur, Rajasthan",
    rating: 5,
    reviewText: "Vartika and her team at Blossom made my wedding trouseau look like a royal museum exhibit! Every box was detailed with zardosi lace and personalized initials.",
    occasion: "Bridal Trousseau",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    customerName: "Siddharth & Meera",
    location: "Delhi NCR",
    rating: 5,
    reviewText: "We ordered 80 Mehendi hampers from Jaipur to Delhi. Not a single petal was displaced during transit. Absolutely magnificent quality and presentation!",
    occasion: "Mehendi Hampers",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }
];

async function seed() {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blossom_by_vartika';
    console.log("Connecting to MongoDB:", connStr);
    await mongoose.connect(connStr);
    console.log("🌸 Clearing existing collections...");
    
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Order.deleteMany({});
    await CustomOrder.deleteMany({});
    await Inquiry.deleteMany({});
    await Coupon.deleteMany({});
    await Review.deleteMany({});

    console.log("✨ Seeding Categories...");
    await Category.insertMany(sampleCategories);

    console.log("🎁 Seeding Products...");
    await Product.insertMany(sampleProducts);

    console.log("💌 Seeding Custom Order Requests...");
    await CustomOrder.insertMany(sampleCustomOrders);

    console.log("📦 Seeding Sample Orders...");
    await Order.insertMany(sampleOrders);

    console.log("🎟️ Seeding Coupons & Reviews...");
    await Coupon.insertMany(sampleCoupons);
    await Review.insertMany(sampleReviews);

    console.log("✅ Seed completed successfully! Blossom by Vartika database ready.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error:", error);
    process.exit(1);
  }
}

seed();
