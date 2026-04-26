const express = require('express');
const router = express.Router();
const { getLore, createLore } = require('../controllers/loreController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getLore);
router.post('/', protect, createLore);

module.exports = router;
