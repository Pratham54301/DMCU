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
      description: 'Where ancient divine power meets futuristic destiny. The Dharma Mythos Cinematic Universe unites mythology, technology, and heroic legends to protect existence from rising darkness.',
      buttonText: 'Explore The Universe'
    }
  },
  {
    name: 'About',
    slug: 'about',
    type: 'about',
    order: 2,
    isActive: true,
    animationType: 'fade',
    content: {
      title: 'When Dharma Weakens, The Universe Awakens Its Protectors',
      description: 'DMCU is a bold cinematic universe forged from the spiritual legacy of Indian mythology and the limitless possibilities of futuristic storytelling. Here, divine avatars, forgotten powers, and rising warriors stand together to restore cosmic balance.',
      supportingText: 'From Vishnu’s eternal avatars to technologically enhanced defenders, DMCU creates a world where dharma is not just preserved—it evolves.',
      secondaryBlock: 'Every hero, villain, and mythic force is connected through an expanding saga that redefines destiny.'
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
      title: 'Guardians of the Dharma',
      description: 'Explore legendary protectors, divine avatars, mythic beings, and technological warriors who shape the future of existence.'
    }
  },
  {
    name: 'Timeline',
    slug: 'timeline',
    type: 'timeline',
    order: 4,
    isActive: true,
    animationType: 'fade',
    content: {
      title: 'Universe Timeline',
      subtitle: 'The 10-Year Master Plan'
    }
  },
  {
    name: 'Ranking',
    slug: 'ranking',
    type: 'ranking',
    order: 5,
    isActive: true,
    animationType: 'fade',
    content: {
      title: 'Power Rankings',
      description: 'Measure the strength, intelligence, combat mastery, and cosmic energy of DMCU’s most powerful entities.'
    }
  },
  {
    name: 'Blog',
    slug: 'blog',
    type: 'blog',
    order: 6,
    isActive: true,
    animationType: 'fade',
    content: {
      title: 'DMCU Chronicles',
      description: 'Stay updated with the latest sagas, theories, and cinematic breakthroughs.'
    }
  },
  {
    name: 'Trailer',
    slug: 'trailer',
    type: 'trailer',
    order: 7,
    isActive: true,
    animationType: 'fade',
    content: {
      title: 'Witness The Beginning',
      description: 'Step into the cinematic rise of Dharma Mythos and experience the future of mythological storytelling.',
      buttonText: 'Watch Official Trailer',
      video: 'HdRhRODAF-Y'
    }
  },
  {
    name: 'Comic',
    slug: 'comic',
    type: 'comic',
    order: 8,
    isActive: true,
    animationType: 'float',
    content: {
      title: 'Comic Archives',
      description: 'Enter the official DMCU comic database and experience the origins, wars, and hidden sagas that define the universe.'
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
