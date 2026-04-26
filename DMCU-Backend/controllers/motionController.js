const MotionConfig = require("../models/MotionConfig");

exports.getMotionConfig = async (req, res) => {
  try {
    let config = await MotionConfig.findOne();
    if (!config) config = await MotionConfig.create({});
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMotionConfig = async (req, res) => {
  try {
    const config = await MotionConfig.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
