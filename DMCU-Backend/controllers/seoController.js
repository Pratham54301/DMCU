const SEOConfig = require("../models/SEOConfig");

exports.getSEOConfig = async (req, res) => {
  try {
    let config = await SEOConfig.findOne();
    if (!config) {
      config = await SEOConfig.create({});
    }
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSEOConfig = async (req, res) => {
  try {
    const config = await SEOConfig.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
