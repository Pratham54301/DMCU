const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  icon: String,
  points: {
    type: Number,
    default: 10
  },
  category: {
    type: String,
    enum: ['voting', 'reading', 'engagement', 'special'],
    default: 'engagement'
  }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
