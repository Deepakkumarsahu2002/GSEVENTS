const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Photo = require('../models/Photo');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', async (req, res) => {
  try {
    const category = (req.query.category || 'ALL').toString().toUpperCase();
    const filter = category !== 'ALL' ? { category } : {};
    const photos = await Photo.find(filter).sort({ createdAt: -1 });
    return res.json(photos);
  } catch (error) {
    console.error('List photos error:', error);
    return res.status(500).json({ error: 'Unable to load photos' });
  }
});

router.post('/', authRequired, upload.single('image'), async (req, res) => {
  const { category = 'ALL', alt = 'GS Events & Catering photo' } = req.body || {};

  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'gs-events-gallery',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    const photo = await Photo.create({
      src: uploadResult.secure_url,
      alt,
      category: String(category).toUpperCase(),
      cloudinaryPublicId: uploadResult.public_id,
    });

    return res.status(201).json(photo);
  } catch (error) {
    console.error('Upload photo error:', error);
    return res.status(500).json({ error: 'Unable to upload photo' });
  }
});

router.delete('/:id', authRequired, async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    if (photo.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(photo.cloudinaryPublicId);
      } catch (cloudErr) {
        console.error('Cloudinary destroy error:', cloudErr);
      }
    }

    await Photo.deleteOne({ _id: req.params.id });
    return res.json({ success: true, deletedId: req.params.id });
  } catch (error) {
    console.error('Delete photo error:', error);
    return res.status(500).json({ error: 'Unable to delete photo' });
  }
});

module.exports = router;
