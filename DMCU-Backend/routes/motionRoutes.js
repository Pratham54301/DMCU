const express = require("express");
const { getMotionConfig, updateMotionConfig } = require("../controllers/motionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getMotionConfig);
router.put("/", protect, updateMotionConfig);

module.exports = router;
