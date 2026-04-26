const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  blog: {
    type: mongoose.Schema.ObjectId,
    ref: 'Blog',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 500
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
