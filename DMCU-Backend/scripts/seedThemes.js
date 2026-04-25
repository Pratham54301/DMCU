const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Theme = require('../models/Theme');
const predefinedThemes = require('../data/predefinedThemes');

dotenv.config();

const seed = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('Clearing existing themes...');
    await Theme.deleteMany({});
    
    const themesToSeed = predefinedThemes.map((theme, index) => ({
      ...theme,
      isActive: index === 0,
      heroSection: { backgroundStyle: 'gradient', textColor: theme.colors.text, animationType: 'cinematic' },
      animations: { type: 'cinematic', speed: 0.8 },
      components: { buttonStyle: 'gold', cardStyle: 'glass-card', glowIntensity: 'strong' }
    }));
    
    console.log(`Inserting ${themesToSeed.length} themes...`);
    await Theme.insertMany(themesToSeed);
    
    console.log('Themes seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding themes:', err.message);
    process.exit(1);
  }
};

seed();
