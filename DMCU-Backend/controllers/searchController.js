const Character = require('../models/Character');
const Blog = require('../models/Blog');
const Comic = require('../models/Comic');
const Section = require('../models/Section');

// @desc    Global search across all collections
// @route   GET /api/search?q=query
exports.globalSearch = async (req, res, next) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json({ success: true, data: { characters: [], blogs: [], comics: [], sections: [] } });
    }

    const regex = new RegExp(query, 'i');

    const [characters, blogs, comics, sections] = await Promise.all([
      Character.find({ $or: [{ name: regex }, { title: regex }, { description: regex }] }).limit(5),
      Blog.find({ $or: [{ title: regex }, { content: regex }] }).limit(5),
      Comic.find({ $or: [{ title: regex }, { description: regex }] }).limit(5),
      Section.find({ $or: [{ name: regex }, { 'content.title': regex }] }).limit(5)
    ]);

    res.json({
      success: true,
      data: {
        characters,
        blogs,
        comics,
        sections
      }
    });
  } catch (error) {
    next(error);
  }
};
