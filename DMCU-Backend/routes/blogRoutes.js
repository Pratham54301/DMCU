const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { uploadImages } = require("../middleware/uploadMiddleware");

const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");

const router = express.Router();

router.route("/")
  .get(getBlogs)
  .post(protect, uploadImages, createBlog);

router.route("/:slug")
  .get(getBlogBySlug);

router.route("/:id")
  .put(protect, uploadImages, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
