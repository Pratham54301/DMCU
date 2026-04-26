const express = require("express");
const router = express.Router();
const {
  getUserNotifications,
  markAsRead,
  createNotification,
  deleteNotification
} = require("../controllers/notificationController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", protect, getUserNotifications);
router.put("/:id/read", protect, markAsRead);
router.post("/", protect, admin, createNotification);
router.delete("/:id", protect, admin, deleteNotification);

module.exports = router;
