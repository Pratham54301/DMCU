const Theme = require('../models/Theme');
const advancedThemes = require('../data/advancedThemes');

// Get current active theme
exports.getActiveTheme = async (req, res) => {
  try {
    let theme = await Theme.findOne({ isActive: true });
    if (!theme) {
      theme = await Theme.findOne(); // Fallback to any theme
    }
    // Return standard structure or just the object
    res.json(theme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: List all themes
exports.getAllThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    res.json(themes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Create new theme
exports.createTheme = async (req, res) => {
  try {
    const theme = new Theme(req.body);
    await theme.save();
    res.status(201).json(theme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Admin: Update theme
exports.updateTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(theme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Admin: Activate theme
exports.activateTheme = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);
    if (!theme) return res.status(404).json({ message: 'Theme not found' });
    
    // Deactivate all others
    await Theme.updateMany({ _id: { $ne: theme._id } }, { isActive: false });
    
    theme.isActive = true;
    await theme.save();
    res.json(theme);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Delete theme
exports.deleteTheme = async (req, res) => {
  try {
    await Theme.findByIdAndDelete(req.params.id);
    res.json({ message: 'Theme deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Seed themes
// @route   POST /api/theme/seed
// @access  Private/Admin
exports.seedThemes = async (req, res) => {
  const themesToSeed = advancedThemes.map((theme, index) => ({
    ...theme,
    isActive: index === 0, // Set first theme as active
    heroSection: { backgroundStyle: 'gradient', textColor: theme.colors.text || '#ffffff', animationType: 'cinematic' },
    animations: { type: 'cinematic', speed: 0.5 },
    components: { buttonStyle: 'gold', cardStyle: 'glass-card', glowIntensity: 'strong' }
  }));

  try {
    await Theme.deleteMany({});
    await Theme.insertMany(themesToSeed);
    res.json({ message: `${themesToSeed.length} themes seeded successfully` });
  } catch (err) {
    console.error('Seed Error:', err);
    res.status(500).json({ message: err.message });
  }
};
