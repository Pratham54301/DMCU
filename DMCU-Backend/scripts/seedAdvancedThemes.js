const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Theme = require('../models/Theme');
const advancedThemes = require('../data/advancedThemes');

dotenv.config();

const seedAdvancedThemes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding advanced themes...');

    // We don't necessarily want to delete all, but the user said "Instead of manually adding 1500 colors..."
    // Let's keep existing active one if possible, or just seed the new library.
    
    for (const themeData of advancedThemes) {
      await Theme.findOneAndUpdate(
        { name: themeData.name },
        themeData,
        { upsert: true, new: true }
      );
    }

    console.log('Advanced themes seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding advanced themes:', err);
    process.exit(1);
  }
};

seedAdvancedThemes();
