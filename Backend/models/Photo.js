const mongoose = require('mongoose');

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

module.exports = mongoose.models.Photo || mongoose.model('Photo', photoSchema);
