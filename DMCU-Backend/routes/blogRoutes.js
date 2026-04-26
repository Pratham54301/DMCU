const express = require("express");
const Blog = require('../models/Blog');
const { protect } = require("../middleware/authMiddleware");
const { blogUpload, getUploadedFilePath } = require("../middleware/uploadMiddleware");

const {
  getBlogs,
  getBlogBySlug,
  deleteBlog
} = require("../controllers/blogController");
const { addComment, getBlogComments } = require("../controllers/commentController");

const router = express.Router();

router.route("/")
  .get(getBlogs)
  .post(protect, blogUpload, async (req, res) => {
    try {
      const blogData = { ...req.body };
      if (req.files && req.files.image) {
        blogData.image = getUploadedFilePath(req.files.image[0]);
      }
      const blog = new Blog(blogData);
      await blog.save();
      res.status(201).json({ success: true, data: blog });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  });

router.route("/:slug")
  .get(getBlogBySlug);

router.route("/:id")
  .put(protect, blogUpload, async (req, res) => {
    try {
      const blogData = { ...req.body };
      if (req.files && req.files.image) {
        blogData.image = getUploadedFilePath(req.files.image[0]);
      }
      const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, { new: true });
      if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
      res.json({ success: true, data: blog });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  })
  .delete(protect, deleteBlog);

router.route("/:id/comments")
  .get(getBlogComments)
  .post(protect, addComment);

module.exports = router;
