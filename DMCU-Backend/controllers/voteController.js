const Vote = require('../models/Vote');
const Character = require('../models/Character');
const { awardAchievement } = require('../utils/achievementEngine');

// @desc    Vote for a character
// @route   POST /api/characters/:id/vote
exports.voteCharacter = async (req, res, next) => {
  try {
    const characterId = req.params.id;
    const userId = req.user.id;
    const { type = 'upvote' } = req.body;

    // Check if character exists
    const character = await Character.findById(characterId);
    if (!character) {
      res.status(404);
      throw new Error("Character not found");
    }

    // Check if already voted
    const existingVote = await Vote.findOne({ user: userId, character: characterId });

    if (existingVote) {
      // If same type, remove vote (undo)
      if (existingVote.type === type) {
        await Vote.findByIdAndDelete(existingVote._id);
        const pointChange = type === 'upvote' ? -1 : 1;
        character.rankPoints += pointChange;
        character.votes -= 1;
      } else {
        // Change vote type
        existingVote.type = type;
        await existingVote.save();
        const pointChange = type === 'upvote' ? 2 : -2; // Switch from down to up or vice versa
        character.rankPoints += pointChange;
      }
    } else {
      // Create new vote
      await Vote.create({ user: userId, character: characterId, type });
      character.rankPoints += (type === 'upvote' ? 1 : -1);
      character.votes += 1;
    }

    await character.save();

    // Community Achievement: First Vote
    await awardAchievement(userId, 'First Vote');

    res.json({
      success: true,
      data: {
        rankPoints: character.rankPoints,
        votes: character.votes
      }
    });
  } catch (error) {
    next(error);
  }
};
