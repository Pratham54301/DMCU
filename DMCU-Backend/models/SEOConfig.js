const mongoose = require('mongoose');

const SEOConfigSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'DMCU | The Premium Digital Multiverse Hub' },
  siteDescription: { type: String, default: 'Experience the DMCU like never before.' },
  keywords: [String],
  ogImage: String,
  twitterHandle: String,
  facebookAppId: String,
  canonicalUrl: String,
  scripts: {
    header: String,
    footer: String
  }
}, { timestamps: true });

module.exports = mongoose.model('SEOConfig', SEOConfigSchema);
