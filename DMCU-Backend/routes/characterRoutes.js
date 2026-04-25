const express = require("express");

const {
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
  getCharacterRanking
} = require("../controllers/characterController");
const { protect } = require("../middleware/authMiddleware");
const { characterUpload } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.route("/").get(getCharacters).post(protect, characterUpload, createCharacter);

router.route("/ranking").get(getCharacterRanking);

router
  .route("/:id")
  .get(getCharacterById)
  .put(protect, characterUpload, updateCharacter)
  .delete(protect, deleteCharacter);

module.exports = router;
