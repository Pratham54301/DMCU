const express = require("express");
const router = express.Router();
const {
  createSubmission,
  getUserSubmissions,
  getAllSubmissions,
  updateSubmissionStatus
} = require("../controllers/submissionController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, createSubmission);
router.get("/my", protect, getUserSubmissions);
router.get("/all", protect, admin, getAllSubmissions);
router.put("/:id/status", protect, admin, updateSubmissionStatus);

module.exports = router;
