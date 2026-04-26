const Lore = require('../models/Lore');

// @desc    Get all lore points
// @route   GET /api/lore
exports.getLore = async (req, res, next) => {
  try {
    const lore = await Lore.find().populate('relatedCharacters', 'name');
    res.json({ success: true, data: lore });
  } catch (error) {
    next(error);
  }
};

// @desc    Create lore point
// @route   POST /api/lore
exports.createLore = async (req, res, next) => {
  try {
    const lore = await Lore.create(req.body);
    res.status(201).json({ success: true, data: lore });
  } catch (error) {
    next(error);
  }
};
