const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blossom_by_vartika');
    console.log(`🌸 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    // In production or demo server, allow falling back to in-memory/mock state if DB is unreachable
  }
};

module.exports = connectDB;
