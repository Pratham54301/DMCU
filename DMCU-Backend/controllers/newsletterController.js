const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    let subscription = await Newsletter.findOne({ email });
    if (subscription) {
      if (subscription.isActive) {
        res.status(400);
        throw new Error("Email already synchronized with the matrix.");
      } else {
        subscription.isActive = true;
        await subscription.save();
      }
    } else {
      subscription = await Newsletter.create({ email });
    }

    res.json({
      success: true,
      message: "Neural link established. You will receive updates from the multiverse."
    });
  } catch (error) {
    next(error);
  }
};
