const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['digital_comic', 'physical_comic', 'collectible', 'merch'],
    default: 'collectible'
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  image: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: -1 // -1 for unlimited digital
  },
  isDigital: {
    type: Boolean,
    default: false
  },
  downloadUrl: String, // For digital items
  features: [String],
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
