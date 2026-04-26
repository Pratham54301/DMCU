const mongoose = require('mongoose');

const LoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['location', 'event', 'artifact', 'concept'],
    default: 'location'
  },
  description: String,
  coordinates: {
    x: Number,
    y: Number
  },
  image: String,
  relatedCharacters: [{ type: mongoose.Schema.ObjectId, ref: 'Character' }],
  era: {
    type: String,
    enum: ['Satya Yuga', 'Treta Yuga', 'Dvapara Yuga', 'Kali Yuga'],
    default: 'Kali Yuga'
  },
  significance: String
}, { timestamps: true });

module.exports = mongoose.model('Lore', LoreSchema);
