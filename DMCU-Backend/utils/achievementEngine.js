const User = require('../models/User');
const Achievement = require('../models/Achievement');

/**
 * Award an achievement to a user if they don't already have it
 */
exports.awardAchievement = async (userId, achievementName) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    // Check if user already has this achievement (by name for simplicity)
    const hasAchievement = user.achievements.some(a => a.type === achievementName);
    if (hasAchievement) return;

    const achievement = await Achievement.findOne({ name: achievementName });
    if (!achievement) {
      console.warn(`Achievement ${achievementName} not found in database.`);
      return;
    }

    // Award it
    user.achievements.push({
      type: achievementName,
      date: new Date()
    });
    user.reputation += achievement.points;

    await user.save();
    return achievement;
  } catch (error) {
    console.error("Error awarding achievement:", error);
  }
};
