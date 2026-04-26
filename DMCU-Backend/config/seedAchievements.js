const Achievement = require("../models/Achievement");

const seedAchievements = async () => {
  const achievements = [
    {
      name: "First Vote",
      description: "Cast your first vote in the character rankings.",
      icon: "⚡",
      points: 10,
      requirement: "vote_count:1"
    },
    {
      name: "Lore Decryptor",
      description: "Decrypt a lore archive from the interactive map.",
      icon: "📜",
      points: 20,
      requirement: "lore_decrypt:1"
    }
  ];

  for (const ach of achievements) {
    const exists = await Achievement.findOne({ name: ach.name });
    if (!exists) {
      await Achievement.create(ach);
      console.log(`Achievement seeded: ${ach.name}`);
    }
  }
};

module.exports = seedAchievements;
