const mongoose = require('mongoose');

const TrailerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  youtubeUrl: {
    type: String,
    required: true
  },
  thumbnail: String,
  description: String,
  category: String, // Teaser, Trailer, Featurette
  releaseDate: Date,
  views: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  relatedCharacter: {
    type: mongoose.Schema.ObjectId,
    ref: 'Character'
  }
}, { timestamps: true });

module.exports = mongoose.model('Trailer', TrailerSchema);
