const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@gs-events.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.create({ email, passwordHash });
    console.log('Admin seeded successfully');
  } catch (error) {
    console.error('Admin seed error:', error);
  }
};

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MONGODB_URI is missing');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(async () => {
    await seedAdmin();
    await mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Mongo connection failed:', error);
    process.exit(1);
  });
