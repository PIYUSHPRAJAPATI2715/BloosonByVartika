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
  { name: 'Wedding Collection', slug: 'wedding-collection', description: 'Bridal Trousseau Packing, Shagun Trays & Royal Wedding Box Sets', sortOrder: 1, isFeatured: true },
  { name: 'Birthday Collection', slug: 'birthday-collection', description: 'Handcrafted Birthday Hampers, Keepsakes & Money Gift Boxes', sortOrder: 2, isFeatured: true },
  { name: 'Baby Collection', slug: 'baby-collection', description: 'Newborn Announcement Boxes, Naming Ceremony & Baby Shower Chests', sortOrder: 3, isFeatured: true },
  { name: 'Festival Collection', slug: 'festival-collection', description: 'Diwali Gold Foil Chests, Rakhi Hampers & Royal Karwa Chauth Trays', sortOrder: 4, isFeatured: true },
  { name: 'Corporate Gifting', slug: 'corporate-gifting', description: 'Customized Executive Hampers, Luxury Branding & Client Keepsakes', sortOrder: 5, isFeatured: true },
  { name: 'Handmade Products', slug: 'handmade-products', description: 'Customized Explosion Boxes, Velvet Greeting Cards & Memory Albums', sortOrder: 6, isFeatured: true }
];

const sampleProducts = [
  {
    name: "Royal Pink Jaipur Bridal Trousseau Box Set",
    sku: "BV-TROUSSEAU-01",
    category: "Wedding Collection",
    subCategory: "Bridal Trousseau",
    price: 18500,
    discountPrice: 16500,
    rating: 5.0,
    reviewCount: 42,
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Handcrafted 5-piece royal bridal trouseau packaging set crafted with plush blush pink velvet, zari border work, customized brass lock buckles, and dried botanicals.",
    materialUsed: "Blush Velvet, Antique Brass Accents, Zari Ribbons, Rose Petals",
    dimensions: "24 x 18 x 10 inches",
    weight: "4.2 kg",
    availableColors: ["Blush Pink", "Royal Ivory", "Emerald Gold"],
    tags: ["Handmade", "Bridal", "Luxury", "Trousseau"],
    stock: 8,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    variants: [
      { name: "3-Piece Standard", price: 12500, stock: 5 },
      { name: "5-Piece Royal Edition", price: 18500, discountPrice: 16500, stock: 8 },
      { name: "7-Piece Grand Maharani", price: 28000, stock: 3 }
    ],
    seoTitle: "Luxury Royal Pink Bridal Trousseau Box Set | Jaipur Handcrafted",
    seoDescription: "Custom handcrafted luxury bridal trouseau packaging with blush pink velvet and zari finish by Vartika Gupta."
  },
  {
    name: "Peacock Mirror Shagun Tray & Ring Ceremony Hamper",
    sku: "BV-WED-02",
    category: "Wedding Collection",
    subCategory: "Shagun Trays",
    price: 6800,
    discountPrice: 5950,
    rating: 4.9,
    reviewCount: 31,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Intricately carved mirror shagun tray lined with gold lace and pearl tassels, specifically curated for engagement rings and auspicious shagun gifts.",
    materialUsed: "Mirror Glass, Gold Brocade, Pearl Strands, Fresh Floral Accents",
    dimensions: "16 x 12 x 4 inches",
    weight: "1.8 kg",
    availableColors: ["Gold & Emerald", "Blush Pink & Gold"],
    tags: ["Shagun Tray", "Ring Ceremony", "Handmade"],
    stock: 12,
    isFeatured: true,
    isBestSeller: true,
    variants: [
      { name: "Standard Tray", price: 5950, stock: 12 }
    ]
  },
  {
    name: "Golden Royale Diwali & Festive Gift Trunk",
    sku: "BV-FEST-01",
    category: "Festival Collection",
    subCategory: "Diwali Hampers",
    price: 8500,
    discountPrice: 7600,
    rating: 5.0,
    reviewCount: 19,
    images: [
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Gold embossed leatherette trunk featuring premium artisanal dry fruits, brass lotus diyas, scented soy candles, and personalized festive message card.",
    materialUsed: "Gold Embossed Leatherette, Solid Brass Diyas, Organic Soy Wax",
    dimensions: "14 x 10 x 6 inches",
    weight: "2.5 kg",
    availableColors: ["Champagne Gold", "Ruby Red"],
    tags: ["Diwali", "Festive", "Luxury Trunk"],
    stock: 15,
    isFeatured: true,
    variants: [
      { name: "Classic Trunk", price: 7600, stock: 15 },
      { name: "VIP Executive Gold", price: 11500, stock: 6 }
    ]
  },
  {
    name: "Little Prince / Princess Newborn Welcome Chest",
    sku: "BV-BABY-01",
    category: "Baby Collection",
    subCategory: "Newborn Welcome",
    price: 9200,
    discountPrice: 8400,
    rating: 4.8,
    reviewCount: 14,
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Soft pastel pink and mint velvet trunk complete with customized baby milestone cards, organic cotton swaddle wrap, plush teddy, and baby detail keepsake box.",
    materialUsed: "Pastel Velvet, Organic Cotton, Hand-carved Wooden Blocks",
    dimensions: "15 x 11 x 7 inches",
    weight: "2.1 kg",
    availableColors: ["Baby Pink", "Soft Blue", "Mint Cream"],
    tags: ["Baby Shower", "Newborn", "Personalized"],
    stock: 9,
    isFeatured: true,
    variants: [
      { name: "Pastel Keepsake Box", price: 8400, stock: 9 }
    ]
  },
  {
    name: "Customized 3D Floral Explosion Box & Memory Album",
    sku: "BV-HANDMADE-01",
    category: "Handmade Products",
    subCategory: "Explosion Boxes",
    price: 3400,
    discountPrice: 2990,
    rating: 4.9,
    reviewCount: 56,
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A 4-layer interactive explosion box unfolding to reveal custom photograph pop-ups, mini message scrolls, dried pressed flowers, and a central gift compartment.",
    materialUsed: "Imported 300GSM Craft Paper, Satin Ribbon, Dried Flowers",
    dimensions: "6 x 6 x 6 inches",
    weight: "0.8 kg",
    availableColors: ["Rose Gold", "Charcoal & Blush", "Lavender"],
    tags: ["Explosion Box", "Handmade", "Custom Photos"],
    stock: 20,
    isFeatured: true,
    isTrending: true,
    variants: [
      { name: "3-Layer Box", price: 2990, stock: 15 },
      { name: "4-Layer Deluxe Box", price: 3900, stock: 5 }
    ]
  },
  {
    name: "Executive Artisan Velvet Corporate Hamper",
    sku: "BV-CORP-01",
    category: "Corporate Gifting",
    subCategory: "Executive Kits",
    price: 4500,
    discountPrice: 3990,
    rating: 4.9,
    reviewCount: 22,
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Refined corporate kit with customized leather journal, brass pen, gold foil coaster set, gourmet dragees, and laser-engraved company logo tag.",
    materialUsed: "Faux Leather, Stainless Brass, Premium Board",
    dimensions: "12 x 9 x 4 inches",
    weight: "1.4 kg",
    availableColors: ["Charcoal Grey", "Midnight Blue", "Forest Green"],
    tags: ["Corporate", "Branding", "Bulk Available"],
    stock: 25,
    isFeatured: true,
    variants: [
      { name: "Single Executive Box", price: 3990, stock: 25 }
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
