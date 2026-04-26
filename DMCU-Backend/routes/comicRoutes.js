const express = require('express');
const router = express.Router();
const Comic = require('../models/Comic');
const { protect } = require('../middleware/authMiddleware');
const { comicUpload, getUploadedFilePath } = require('../middleware/uploadMiddleware');

// GET all comics
router.get('/', async (req, res) => {
  try {
    const comics = await Comic.find().sort({ createdAt: -1 });
    res.json({ success: true, data: comics });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single comic by slug
router.get('/:slug', async (req, res) => {
  try {
    const comic = await Comic.findOne({ slug: req.params.slug });
    if (!comic) return res.status(404).json({ success: false, message: 'Comic not found' });
    res.json({ success: true, data: comic });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new comic
router.post('/', protect, comicUpload, async (req, res) => {
  try {
    const comicData = { ...req.body };
    
    if (req.files) {
      if (req.files.coverImage) comicData.coverImage = getUploadedFilePath(req.files.coverImage[0]);
      if (req.files.pdfFile) comicData.pdfFile = getUploadedFilePath(req.files.pdfFile[0]);
    }

    const comic = new Comic(comicData);
    await comic.save();
    res.status(201).json({ success: true, data: comic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update comic
router.put('/:id', protect, comicUpload, async (req, res) => {
  try {
    const comicData = { ...req.body };
    
    if (req.files) {
      if (req.files.coverImage) comicData.coverImage = getUploadedFilePath(req.files.coverImage[0]);
      if (req.files.pdfFile) comicData.pdfFile = getUploadedFilePath(req.files.pdfFile[0]);
    }

    const comic = await Comic.findByIdAndUpdate(req.params.id, comicData, { new: true });
    if (!comic) return res.status(404).json({ success: false, message: 'Comic not found' });
    res.json({ success: true, data: comic });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE comic
router.delete('/:id', protect, async (req, res) => {
  try {
    const comic = await Comic.findByIdAndDelete(req.params.id);
    if (!comic) return res.status(404).json({ success: false, message: 'Comic not found' });
    res.json({ success: true, message: 'Comic deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
