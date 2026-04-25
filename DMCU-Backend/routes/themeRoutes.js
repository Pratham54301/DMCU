const express = require('express');
const router = express.Router();
const themeController = require('../controllers/themeController');

// Public route to get active theme
router.get('/active', themeController.getActiveTheme);

// Admin routes
router.get('/', themeController.getAllThemes);
router.post('/', themeController.createTheme);
router.put('/:id', themeController.updateTheme);
router.patch('/:id/activate', themeController.activateTheme);
router.put('/activate/:id', themeController.activateTheme); // Compatibility with user request
router.delete('/:id', themeController.deleteTheme);
router.post('/seed', themeController.seedThemes);

module.exports = router;
