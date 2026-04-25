const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['hero', 'about', 'lore', 'comic', 'ranking', 'trailer', 'custom'],
    required: true,
    default: 'custom'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  themeOverride: {
    type: String, // Optional theme ID to apply to this section
    default: null
  },
  animationType: {
    type: String,
    enum: ['fade', 'slide', 'float'],
    default: 'fade'
  },
  content: {
    title: String,
    subtitle: String,
    description: String,
    images: [String],
    video: String,
    extraFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Section', SectionSchema);
