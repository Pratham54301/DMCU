const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: false },
  colors: {
    primary: { type: String, required: true },
    secondary: { type: String, required: true },
    text: { type: String, required: true },
    muted: { type: String, required: true },
    accent: { type: String, required: true },
    surface: { type: String, required: true },
    surfaceStrong: { type: String, required: true },
    characterBg: { type: String, default: '#000000' }
  },
  heroSection: {
    backgroundStyle: { type: String, enum: ['gradient', 'image', 'particles'], default: 'gradient' },
    textColor: { type: String, required: true },
    animationType: { type: String, enum: ['fade', 'slide', 'scale', 'cinematic'], default: 'fade' }
  },
  animations: {
    type: { type: String, enum: ['fade', 'slide', 'scale', 'cinematic'], default: 'fade' },
    speed: { type: Number, default: 0.5 }
  },
  components: {
    buttonStyle: { type: String, enum: ['gold', 'glass', 'minimal'], default: 'gold' },
    cardStyle: { type: String, enum: ['glass-card', 'solid-card', 'bordered'], default: 'glass-card' },
    glowIntensity: { type: String, enum: ['none', 'soft', 'medium', 'strong'], default: 'medium' }
  },
  backgroundConfig: {
    type: String,
    enum: ['solid', 'gradient', 'cosmic'],
    default: 'cosmic'
  },
  backgroundStyles: {
    baseColor: { type: String, default: '8 8 12' },
    gradient1: { type: String, default: '212 175 55' },
    gradient2: { type: String, default: '30 144 255' },
    gradient1Position: { type: String, default: '70% 20%' },
    gradient2Position: { type: String, default: '30% 80%' },
    intensity: { type: Number, default: 0.15 }
  }
}, { timestamps: true });

// Ensure only one theme is active at a time
themeSchema.pre('save', async function(next) {
  if (this.isActive) {
    await this.constructor.updateMany({ _id: { $ne: this._id } }, { isActive: false });
  }
  next();
});

module.exports = mongoose.model('Theme', themeSchema);
