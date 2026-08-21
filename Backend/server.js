require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = Number(process.env.PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET || 'gs-events-dev-secret';
const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gs-events';

const CATEGORY_MAP = {
  ALL: 'ALL',
  WEDDINGS: 'WEDDING',
  WEDDING: 'WEDDING',
  CATERING: 'CATERING',
  EVENT: 'EVENTS',
  EVENTS: 'EVENTS',
  DECOR: 'DECORATION',
  DECORATION: 'DECORATION',
  CORPORATE: 'EVENTS',
  FOOD: 'CATERING',
};

function normalizeCategory(value) {
  const raw = String(value || '').trim();
  if (!raw) return 'ALL';
  const normalized = raw.toUpperCase().replace(/[^A-Z]+/g, '');
  return CATEGORY_MAP[normalized] || 'ALL';
}

const ALLOWED_CATEGORIES = ['ALL', 'WEDDING', 'CATERING', 'EVENTS', 'DECORATION'];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

const photoSchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, default: 'GS Events & Catering photo' },
    category: {
      type: String,
      enum: ['ALL', 'WEDDING', 'CATERING', 'EVENTS', 'DECORATION'],
      default: 'ALL',
      required: true,
    },
    cloudinaryPublicId: { type: String, default: '' },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

function issueToken(user) {
  return jwt.sign({ sub: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

async function ensureAdminUser() {
  const email = (process.env.ADMIN_EMAIL || 'admin@gseventsandcatering.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'GS@Events2026';

  let admin = await Admin.findOne({ email });
  if (!admin) {
    admin = new Admin({
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });
    await admin.save();
    console.log(`Created default admin user: ${email}`);
  }
}

async function connectDatabase() {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log('Connected to MongoDB');
    await ensureAdminUser();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

async function uploadToCloudinary(buffer, fileName) {
  const hasCloudinaryConfig = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

  if (!hasCloudinaryConfig) {
    throw new Error('Cloudinary configuration is missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file.');
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'gs-events/gallery',
        public_id: fileName.replace(/\.[^/.]+$/, ''),
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'running' });
});

app.post('/api/auth/login', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const token = issueToken(admin);
    return res.json({
      token,
      user: {
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Unable to authenticate admin' });
  }
});

app.get('/api/photos', async (req, res) => {
  try {
    const requestedCategory = req.query.category ? String(req.query.category) : 'ALL';
    const category = normalizeCategory(requestedCategory);

    const query = category === 'ALL' ? {} : { category };
    const photos = await Photo.find(query).sort({ createdAt: -1 }).lean();

    const sanitized = photos.map((photo) => ({
      id: photo._id.toString(),
      src: photo.src,
      alt: photo.alt,
      category: photo.category,
      createdAt: photo.createdAt,
      updatedAt: photo.updatedAt,
    }));

    return res.json(sanitized);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to fetch photos' });
  }
});

app.post('/api/photos', authRequired, upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  const category = normalizeCategory(req.body.category || req.body.type || 'WEDDING');
  const alt = String(req.body.alt || req.file.originalname || 'GS Events photo').trim();

  try {
    const result = await uploadToCloudinary(req.file.buffer, req.file.originalname || 'photo');

    const photo = await Photo.create({
      src: result.secure_url,
      alt,
      category,
      cloudinaryPublicId: result.public_id,
    });

    return res.status(201).json({
      id: photo._id.toString(),
      src: photo.src,
      alt: photo.alt,
      category: photo.category,
      createdAt: photo.createdAt,
      updatedAt: photo.updatedAt,
    });
  } catch (error) {
    console.error('Photo upload failed:', error.message);
    return res.status(500).json({ error: error.message || 'Unable to upload photo' });
  }
});

app.delete('/api/photos/:id', authRequired, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    if (photo.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(photo.cloudinaryPublicId);
      } catch (error) {
        console.warn('Cloudinary delete warning:', error.message);
      }
    }

    await Photo.deleteOne({ _id: req.params.id });
    return res.json({ success: true, id: req.params.id });
  } catch (error) {
    return res.status(500).json({ error: 'Unable to delete photo' });
  }
});

app.get('/api/photos/categories', (req, res) => {
  return res.json(ALLOWED_CATEGORIES);
});

connectDatabase();

app.listen(PORT, () => {
  console.log(`GS Events backend listening on http://localhost:${PORT}`);
});
