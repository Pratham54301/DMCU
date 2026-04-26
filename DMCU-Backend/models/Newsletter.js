const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  preferences: {
    trailers: { type: Boolean, default: true },
    comics: { type: Boolean, default: true },
    blogs: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Newsletter', NewsletterSchema);
