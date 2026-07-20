const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Small", "Royal Edition"
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  stock: { type: Number, default: 10 },
  sku: { type: String },
  images: [{ type: String }]
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  subCategory: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  rating: { type: Number, default: 4.9 },
  reviewCount: { type: Number, default: 28 },
  images: [{ type: String, required: true }],
  videoUrl: { type: String },
  description: { type: String, required: true },
  materialUsed: { type: String, default: "Satin Ribbon, Handcrafted Hardboard Box, Gold Foil, Dried Botanicals" },
  dimensions: { type: String, default: "12 x 12 x 6 inches" },
  weight: { type: String, default: "1.5 kg" },
  availableColors: [{ type: String }],
  tags: [{ type: String }],
  stock: { type: Number, default: 15 },
  deliveryTime: { type: String, default: "3-5 Business Days (Jaipur express available)" },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  variants: [variantSchema],
  seoTitle: { type: String },
  seoDescription: { type: String }
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
