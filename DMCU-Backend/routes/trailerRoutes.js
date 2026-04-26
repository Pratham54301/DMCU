const express = require("express");
const { getTrailers, createTrailer, updateTrailer, deleteTrailer } = require("../controllers/trailerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getTrailers);
router.post("/", protect, createTrailer);
router.put("/:id", protect, updateTrailer);
router.delete("/:id", protect, deleteTrailer);

module.exports = router;
