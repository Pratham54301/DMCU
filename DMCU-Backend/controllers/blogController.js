const Blog = require("../models/Blog");
const { getUploadedFilePath } = require("../middleware/uploadMiddleware");
const cloudinary = require("cloudinary").v2;

const getFirstFile = (req, fieldName) => {
  if (!req.files || !req.files[fieldName] || req.files[fieldName].length === 0) return null;
  return req.files[fieldName][0];
};

const parseTagsValue = (value) => {
  if (typeof value !== "string") return [];
  const trimmedValue = value.trim();
  if (!trimmedValue) return [];
  try {
    const parsed = JSON.parse(trimmedValue);
    if (Array.isArray(parsed)) return parsed.map((t) => String(t).trim()).filter(Boolean);
  } catch (error) {}
  return trimmedValue.split(",").map((t) => t.trim()).filter(Boolean);
};

const removeStoredFile = async (url) => {
  if (!url || !url.includes("cloudinary")) return;
  try {
    const publicId = url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`dmcu/${publicId}`);
  } catch (err) {
    console.error("Cloudinary delete failed", err);
  }
};

const cleanupUploadedFiles = async (...files) => {
  // Cloudinary handles aborted uploads or we can destroy if needed
};

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const createBlog = async (req, res, next) => {
  const imageFile = getFirstFile(req, "image");

  try {
    if (!imageFile) throw new Error("Blog cover image is required.");
    
    let slug = req.body.slug || generateSlug(req.body.title);
    const existing = await Blog.findOne({ slug });
    if (existing) throw new Error("Blog slug must be unique.");

    const blog = await Blog.create({
      title: req.body.title,
      slug: slug,
      excerpt: req.body.excerpt,
      content: req.body.content,
      tags: parseTagsValue(req.body.tags),
      author: req.body.author || 'DMCU Sentinel',
      image: getUploadedFilePath(imageFile)
    });

    res.status(201).json({ success: true, message: "Blog created successfully.", data: blog });
  } catch (error) {
    await cleanupUploadedFiles(imageFile);
    res.status(400);
    next(error);
  }
};

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found.");
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  const imageFile = getFirstFile(req, "image");
  let updateSaved = false;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      await cleanupUploadedFiles(imageFile);
      res.status(404);
      throw new Error("Blog not found.");
    }

    const oldImagePath = blog.image;

    if (req.body.title !== undefined) blog.title = req.body.title;
    if (req.body.slug !== undefined) blog.slug = req.body.slug;
    if (req.body.excerpt !== undefined) blog.excerpt = req.body.excerpt;
    if (req.body.content !== undefined) blog.content = req.body.content;
    if (req.body.author !== undefined) blog.author = req.body.author;
    if (req.body.tags !== undefined) blog.tags = parseTagsValue(req.body.tags);
    if (imageFile) blog.image = getUploadedFilePath(imageFile);

    const updatedBlog = await blog.save();
    updateSaved = true;

    if (imageFile && oldImagePath && oldImagePath !== updatedBlog.image) {
      await removeStoredFile(oldImagePath);
    }

    res.json({ success: true, message: "Blog updated.", data: updatedBlog });
  } catch (error) {
    if (!updateSaved) await cleanupUploadedFiles(imageFile);
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found.");
    }
    await blog.deleteOne();
    await removeStoredFile(blog.image);
    res.json({ success: true, message: "Blog deleted successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBlog, getBlogs, getBlogBySlug, updateBlog, deleteBlog };
