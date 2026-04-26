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
    enum: ['hero', 'about', 'timeline', 'characters', 'comic', 'ranking', 'trailer', 'blog', 'cta', 'custom'],
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
  // Visual & Design Control
  design: {
    themeId: { type: String, default: null },
    layout: { type: String, enum: ['centered', 'split-left', 'split-right', 'grid-3', 'grid-4', 'horizontal-scroll'], default: 'centered' },
    backgroundColor: { type: String, default: 'transparent' },
    backgroundImage: { type: String, default: null },
    overlayOpacity: { type: Number, default: 0.5 },
    spacing: { type: String, enum: ['none', 'compact', 'default', 'spacious'], default: 'default' }
  },
  // NEW: Advanced Motion & Animation Control System
  motion: {
    preset: { 
      type: String, 
      enum: ['fade', 'slide', 'zoom', 'float', 'parallax', 'antigravity', 'reveal', 'interactive', 'none'], 
      default: 'fade' 
    },
    duration: { type: Number, default: 0.8 },
    delay: { type: Number, default: 0 },
    stiffness: { type: Number, default: 100 },
    damping: { type: Number, default: 10 },
    
    // Hover & Interaction
    hoverEffect: { 
      type: String, 
      enum: ['scale', 'glow', 'lift', 'tilt', 'none'], 
      default: 'none' 
    },
    cursorReactive: { type: Boolean, default: false },
    parallaxIntensity: { type: Number, default: 0 }
  },
  // Content Structure
  content: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    mainMedia: { type: String, default: null },
    mediaType: { type: String, enum: ['image', 'video', '3d'], default: 'image' },
    items: [{
      title: String,
      subtitle: String,
      description: String,
      image: String,
      icon: String,
      link: String,
      order: Number
    }],
    buttons: [{
      label: String,
      url: String,
      style: { type: String, enum: ['primary', 'secondary', 'ghost'], default: 'primary' }
    }]
  },
  translations: {
    hi: { title: String, subtitle: String, description: String, items: [mongoose.Schema.Types.Mixed], buttons: [mongoose.Schema.Types.Mixed] },
    gu: { title: String, subtitle: String, description: String, items: [mongoose.Schema.Types.Mixed], buttons: [mongoose.Schema.Types.Mixed] }
  }
}, { timestamps: true });

module.exports = mongoose.model('Section', SectionSchema);
