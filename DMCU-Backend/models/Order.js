const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    priceAtPurchase: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentId: String,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
