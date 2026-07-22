/**
 * seed-images.js
 * Run: node scripts/seed-images.js
 * 
 * Uploads category banner images to Cloudinary and updates MongoDB automatically.
 * Put your images in a folder called "category-images" inside server/scripts/
 */

require('dotenv').config({ path: '../.env' });
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MONGO_URI = process.env.MONGODB_URI;

// Map of image filename keywords → category name in DB
// Adjust these to match your actual category names in MongoDB
const CATEGORY_IMAGE_MAP = [
  { keywords: ['corporate', 'corp'], categoryName: 'Corporate' },
  { keywords: ['birthday', 'birth'], categoryName: 'Birthday' },
  { keywords: ['anniversary', 'anniv'], categoryName: 'Anniversary' },
  { keywords: ['wedding', 'wed', 'bridal'], categoryName: 'Wedding' },
  { keywords: ['keychain', 'key'], categoryName: 'Keychains' },
  { keywords: ['rakhi', 'rakshabandhan'], categoryName: 'Rakhi' },
  { keywords: ['baby', 'shower'], categoryName: 'Baby Shower' },
  { keywords: ['festive', 'festival', 'diwali'], categoryName: 'Festive' },
];

async function uploadAndUpdate() {
  const imagesDir = path.join(__dirname, 'category-images');

  if (!fs.existsSync(imagesDir)) {
    console.log('❌ Please create a folder: server/scripts/category-images/');
    console.log('   And put your category banner images inside it.');
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir).filter(f =>
    /\.(jpg|jpeg|png|webp|gif)$/i.test(f)
  );

  if (files.length === 0) {
    console.log('❌ No images found in server/scripts/category-images/');
    process.exit(1);
  }

  console.log(`\n🌸 Found ${files.length} image(s). Starting upload...\n`);

  // Connect to MongoDB
  await mongoose.connect(MONGO_URI);
  const Category = require('../models/Category');

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const filenameLower = file.toLowerCase();

    // Find matching category
    const match = CATEGORY_IMAGE_MAP.find(m =>
      m.keywords.some(k => filenameLower.includes(k))
    );

    if (!match) {
      console.log(`⚠️  Skipping "${file}" — no matching category found`);
      continue;
    }

    try {
      // Upload to Cloudinary
      console.log(`⬆️  Uploading "${file}" → Category: "${match.categoryName}"...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'blossom-by-vartika/categories',
        public_id: `category-${match.categoryName.toLowerCase().replace(/\s+/g, '-')}`,
        overwrite: true,
        transformation: [{ quality: 'auto', fetch_format: 'auto', width: 1200, crop: 'limit' }]
      });

      const imageUrl = result.secure_url;
      console.log(`   ✅ Uploaded: ${imageUrl}`);

      // Update category in MongoDB (case-insensitive name match)
      const updated = await Category.findOneAndUpdate(
        { name: { $regex: new RegExp(match.categoryName, 'i') } },
        { banner: imageUrl },
        { new: true }
      );

      if (updated) {
        console.log(`   ✅ DB Updated: "${updated.name}" → banner set!\n`);
      } else {
        console.log(`   ⚠️  Category "${match.categoryName}" not found in DB. Image uploaded but not linked.\n`);
        console.log(`      Cloudinary URL: ${imageUrl}\n`);
      }
    } catch (err) {
      console.error(`   ❌ Error for "${file}":`, err.message);
    }
  }

  await mongoose.disconnect();
  console.log('\n🌸 Done! All images uploaded and categories updated.');
  console.log('   Refresh your website to see the new images!\n');
}

uploadAndUpdate().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
