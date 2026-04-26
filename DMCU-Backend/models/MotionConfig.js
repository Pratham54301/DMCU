const mongoose = require('mongoose');

const MotionConfigSchema = new mongoose.Schema({
  globalSpeed: { type: Number, default: 0.5 },
  defaultPreset: { type: String, default: 'fade' },
  hoverEffect: { type: String, default: 'glow' },
  cursorReactive: { type: Boolean, default: true },
  parallaxEnabled: { type: Boolean, default: true },
  antigravityIntensity: { type: Number, default: 10 },
  transitionEase: { type: String, default: 'easeInOut' }
}, { timestamps: true });

module.exports = mongoose.model('MotionConfig', MotionConfigSchema);
