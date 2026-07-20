const mongoose = require('mongoose');
const dns = require('dns');

// Fix Node.js DNS resolution order for Windows SRV queries
if (dns.setServers) {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (e) {}
}
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blossom_by_vartika';
  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`🌸 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ Cloud MongoDB Connection Notice (${error.message}). Running with dynamic local memory database.`);
  }
};

module.exports = connectDB;
