const mongoose = require('mongoose');

const connectDatabase = async () => {
  const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gs-events';

  try {
    await mongoose.connect(DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDatabase };
