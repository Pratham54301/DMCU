const express = require("express");

const { loginAdmin } = require("../controllers/authController");
const { getDashboardStats } = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/analytics", protect, getDashboardStats);

module.exports = router;
