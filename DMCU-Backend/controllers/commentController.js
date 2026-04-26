const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comments
exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }

    const comment = await Comment.create({
      user: req.user.id,
      blog: blogId,
      content
    });

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get comments for a blog
// @route   GET /api/blogs/:id/comments
exports.getBlogComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ blog: req.params.id })
      .populate('user', 'name profileImage')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};
