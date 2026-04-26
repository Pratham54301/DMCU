const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  profileImage: String,
  role: {
    type: String,
    enum: ['user', 'moderator'],
    default: 'user'
  },
  // Personalization
  favorites: {
    characters: [{ type: mongoose.Schema.ObjectId, ref: 'Character' }],
    comics: [{ type: mongoose.Schema.ObjectId, ref: 'Comic' }],
    blogs: [{ type: mongoose.Schema.ObjectId, ref: 'Blog' }]
  },
  readingProgress: [{
    comicId: { type: mongoose.Schema.ObjectId, ref: 'Comic' },
    lastPage: Number,
    completed: Boolean,
    updatedAt: { type: Date, default: Date.now }
  }],
  achievements: [{
    name: String,
    date: { type: Date, default: Date.now }
  }],
  reputation: {
    type: Number,
    default: 0
  },
  viewHistory: [{
    type: { type: String, enum: ['character', 'comic', 'blog'] },
    refId: mongoose.Schema.ObjectId,
    title: String,
    viewedAt: { type: Date, default: Date.now }
  }],
  notifications: [{
    title: String,
    message: String,
    type: { type: String, default: 'info' },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  settings: {
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'cosmic' },
    notificationsEnabled: { type: Boolean, default: true }
  },
  legalAccepted: { type: Boolean, default: false },
  legalAcceptedAt: Date,
  // Advanced Admin Controls
  subscription: {
    plan: { type: String, enum: ['free', 'premium', 'vanguard'], default: 'free' },
    expiresAt: Date,
    status: { type: String, enum: ['active', 'expired', 'suspended'], default: 'active' }
  },
  rewards: {
    points: { type: Number, default: 0 },
    coupons: [{
      code: String,
      discount: Number,
      type: { type: String, enum: ['percentage', 'flat'] },
      expiresAt: Date,
      used: { type: Boolean, default: false }
    }]
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'shadowbanned'],
    default: 'active'
  }
}, { timestamps: true });

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
