const Trailer = require("../models/Trailer");

exports.getTrailers = async (req, res) => {
  try {
    const trailers = await Trailer.find().sort({ releaseDate: -1 });
    res.json({ success: true, data: trailers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTrailer = async (req, res) => {
  try {
    const trailer = await Trailer.create(req.body);
    res.json({ success: true, data: trailer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTrailer = async (req, res) => {
  try {
    const trailer = await Trailer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: trailer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteTrailer = async (req, res) => {
  try {
    await Trailer.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Trailer purged from archive." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
