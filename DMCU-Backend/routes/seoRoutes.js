const express = require("express");
const { getSEOConfig, updateSEOConfig } = require("../controllers/seoController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSEOConfig);
router.put("/", protect, updateSEOConfig);

module.exports = router;
