const express = require('express');
const router = express.Router();
const Section = require('../models/Section');
const { sectionArchitectUpload, getUploadedFilePath } = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// GET all sections
router.get('/', async (req, res) => {
  try {
    const sections = await Section.find().sort({ order: 1 });
    res.json({ success: true, data: sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new section
router.post('/', protect, async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    res.status(201).json({ success: true, data: section });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update section (The Architect Route)
router.put('/:id', protect, sectionArchitectUpload, async (req, res) => {
  try {
    const sectionData = { ...req.body };
    
    // Parse complex JSON fields from FormData
    ['design', 'content', 'motion', 'translations'].forEach(field => {
      if (typeof sectionData[field] === 'string') {
        try {
          sectionData[field] = JSON.parse(sectionData[field]);
        } catch (e) {
          console.error(`Failed to parse ${field}`, e);
        }
      }
    });

    // Handle File Uploads dynamically
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        const path = getUploadedFilePath(file);
        
        if (file.fieldname === 'backgroundImage') {
          if (!sectionData.design) sectionData.design = {};
          sectionData.design.backgroundImage = path;
        } else if (file.fieldname === 'mainMedia') {
          if (!sectionData.content) sectionData.content = {};
          sectionData.content.mainMedia = path;
        } else if (file.fieldname.startsWith('item_image_')) {
          const index = parseInt(file.fieldname.split('_')[2]);
          if (sectionData.content && sectionData.content.items && sectionData.content.items[index]) {
            sectionData.content.items[index].image = path;
          }
        }
      });
    }

    // Explicitly handle isActive conversion from string to boolean if needed
    if (sectionData.isActive === 'true') sectionData.isActive = true;
    if (sectionData.isActive === 'false') sectionData.isActive = false;

    const section = await Section.findByIdAndUpdate(req.params.id, sectionData, { new: true });
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });
    
    res.json({ success: true, data: section });
  } catch (err) {
    console.error("Section Update Error:", err);
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE section
router.delete('/:id', protect, async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ success: false, message: 'Section not found' });
    res.json({ success: true, message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
