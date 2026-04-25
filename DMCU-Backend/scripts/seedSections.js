const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Section = require('../models/Section');

dotenv.config();

const sections = [
  {
    name: 'Home',
    slug: 'home',
    type: 'hero',
    order: 1,
    isActive: true,
    animationType: 'float',
    content: {
      title: 'DMCU',
      subtitle: 'A New Era of Dharma Begins',
      description: 'The home base of the Dharma Mythos Cinematic Universe.',
    }
  },
  {
    name: 'Lore & Sagas',
    slug: 'about',
    type: 'about',
    order: 2,
    isActive: true,
    animationType: 'fade',
    content: {
      title: 'Lore',
      subtitle: 'When Dharma weakens, the universe awakens its protectors',
      description: 'DMCU is a bold cinematic world that blends ancient Indian mythic imagination with advanced technology.',
    }
  },
  {
    name: 'Characters',
    slug: 'characters',
    type: 'characters',
    order: 3,
    isActive: true,
    animationType: 'slide',
    content: {
      title: 'Characters',
      subtitle: 'Icons of light, shadow, and destiny',
      description: 'Explore the live roster of heroes and villains.',
    }
  },
  {
    name: 'Timeline',
    slug: 'timeline',
    type: 'lore',
    order: 4,
    isActive: true,
    animationType: 'fade',
    content: {
      title: 'Cinematic Timeline',
      subtitle: 'The 10-Year Master Plan (2026 - 2036)',
      description: 'Follow the journey across the yugas.',
    }
  },
  {
    name: 'Trailer',
    slug: 'trailer',
    type: 'trailer',
    order: 5,
    isActive: true,
    animationType: 'fade',
    content: {
      title: 'Trailer',
      subtitle: 'Let the world feel the scale',
      description: 'Watch the official teaser.',
      video: 'HdRhRODAF-Y'
    }
  },
  {
    name: 'Comic',
    slug: 'comic',
    type: 'comic',
    order: 6,
    isActive: true,
    animationType: 'float',
    content: {
      title: 'Comic Nexus',
      subtitle: 'Read the legends of DMCU',
      description: 'Dive deep into the illustrated stories of our heroes.',
    }
  }
];

const seedSections = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding structured sections...');

    for (const sectionData of sections) {
      await Section.findOneAndUpdate(
        { slug: sectionData.slug },
        sectionData,
        { upsert: true, new: true }
      );
    }

    console.log('Structured sections seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding sections:', err);
    process.exit(1);
  }
};

seedSections();
