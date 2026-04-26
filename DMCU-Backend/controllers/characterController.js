const Character = require("../models/Character");
const { getUploadedFilePath } = require("../middleware/uploadMiddleware");
const cloudinary = require("cloudinary").v2;

const getFirstFile = (req, fieldName) => {
  if (!req.files || !req.files[fieldName] || req.files[fieldName].length === 0) {
    return null;
  }

  return req.files[fieldName][0];
};

const parsePowerValue = (value) => {
  if (typeof value !== "string") {
    return [];
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(trimmedValue);

    if (Array.isArray(parsed)) {
      return parsed.map((power) => String(power).trim()).filter(Boolean);
    }
  } catch (error) {
    // If parsing fails, the value is treated as a comma-separated string.
  }

  return trimmedValue
    .split(",")
    .map((power) => power.trim())
    .filter(Boolean);
};

const parsePowers = (powersInput) => {
  if (Array.isArray(powersInput)) {
    return powersInput.flatMap((power) => parsePowerValue(String(power)));
  }

  if (typeof powersInput !== "string") {
    return [];
  }

  return parsePowerValue(powersInput);
};

const removeStoredFile = async (url) => {
  if (!url || !url.includes("cloudinary")) return;
  
  try {
    const publicId = url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`dmcu/${publicId}`);
  } catch (err) {
    console.error("Cloudinary delete failed", err);
  }
};

const cleanupUploadedFiles = async (...files) => {
  // Cloudinary storage usually handles aborted uploads, but we can destroy if needed
};

const createCharacter = async (req, res, next) => {
  const imageFile = getFirstFile(req, "image");
  const imageTransparentFile = getFirstFile(req, "imageTransparent");
  const modelFile = getFirstFile(req, "model3d");

  try {
    if (!imageFile) {
      res.status(400);
      throw new Error("Character image is required.");
    }

    let statsParsed = undefined;
    if (req.body.stats) {
      try {
        statsParsed = typeof req.body.stats === "string" ? JSON.parse(req.body.stats) : req.body.stats;
      } catch (e) {
        // ignore
      }
    }

    let backstoryParsed = undefined;
    if (req.body.backstory) {
      try {
        backstoryParsed = typeof req.body.backstory === "string" ? JSON.parse(req.body.backstory) : req.body.backstory;
      } catch (e) {
        // ignore
      }
    }

    const character = await Character.create({
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      role: req.body.role,
      category: req.body.category || "hero",
      stats: statsParsed,
      backstory: backstoryParsed,
      quotes: parsePowers(req.body.quotes),
      powers: parsePowers(req.body.powers),
      image: getUploadedFilePath(imageFile),
      imageTransparent: getUploadedFilePath(imageTransparentFile),
      model3d: getUploadedFilePath(modelFile)
    });

    res.status(201).json({
      success: true,
      message: "Character created successfully.",
      data: character
    });
  } catch (error) {
    await cleanupUploadedFiles(imageFile, imageTransparentFile, modelFile);
    next(error);
  }
};

const getCharacters = async (req, res, next) => {
  try {
    const characters = await Character.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: characters.length,
      data: characters
    });
  } catch (error) {
    next(error);
  }
};

const getCharacterById = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      res.status(404);
      throw new Error("Character not found.");
    }

    res.json({
      success: true,
      data: character
    });
  } catch (error) {
    next(error);
  }
};

const updateCharacter = async (req, res, next) => {
  const imageFile = getFirstFile(req, "image");
  const imageTransparentFile = getFirstFile(req, "imageTransparent");
  const modelFile = getFirstFile(req, "model3d");
  let updateSaved = false;

  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      await cleanupUploadedFiles(imageFile, imageTransparentFile, modelFile);
      res.status(404);
      throw new Error("Character not found.");
    }

    const oldImagePath = character.image;
    const oldImageTransparentPath = character.imageTransparent;
    const oldModelPath = character.model3d;

    if (req.body.name !== undefined) {
      character.name = req.body.name;
    }

    if (req.body.title !== undefined) {
      character.title = req.body.title;
    }

    if (req.body.description !== undefined) {
      character.description = req.body.description;
    }

    if (req.body.backstory !== undefined) {
      try {
        const bsParsed = typeof req.body.backstory === "string" ? JSON.parse(req.body.backstory) : req.body.backstory;
        character.backstory = { ...(character.backstory || {}), ...bsParsed };
      } catch (e) {
        // ignore
      }
    }

    if (req.body.role !== undefined) {
      character.role = req.body.role;
    }

    if (req.body.category !== undefined) {
      character.category = req.body.category;
    }

    if (req.body.stats !== undefined) {
      try {
        const statsParsed = typeof req.body.stats === "string" ? JSON.parse(req.body.stats) : req.body.stats;
        character.stats = { ...character.stats, ...statsParsed };
      } catch (e) {
        // ignore
      }
    }

    if (req.body.quotes !== undefined) {
      character.quotes = parsePowers(req.body.quotes);
    }

    if (req.body.powers !== undefined) {
      character.powers = parsePowers(req.body.powers);
    }

    if (imageFile) {
      character.image = getUploadedFilePath(imageFile);
    }

    if (imageTransparentFile) {
      character.imageTransparent = getUploadedFilePath(imageTransparentFile);
    } else if (req.body.removeImageTransparent === "true" || req.body.removeImageTransparent === true) {
      character.imageTransparent = null;
    }

    if (modelFile) {
      character.model3d = getUploadedFilePath(modelFile);
    } else if (req.body.removeModel3d === "true" || req.body.removeModel3d === true) {
      character.model3d = null;
    }

    const updatedCharacter = await character.save();
    updateSaved = true;

    if (imageFile && oldImagePath && oldImagePath !== updatedCharacter.image) {
      await removeStoredFile(oldImagePath);
    }

    if (imageTransparentFile && oldImageTransparentPath && oldImageTransparentPath !== updatedCharacter.imageTransparent) {
      await removeStoredFile(oldImageTransparentPath);
    }


    if (oldModelPath && oldModelPath !== updatedCharacter.model3d) {
      await removeStoredFile(oldModelPath);
    }

    res.json({
      success: true,
      message: "Character updated successfully.",
      data: updatedCharacter
    });
  } catch (error) {
    if (!updateSaved) {
      await cleanupUploadedFiles(imageFile, imageTransparentFile, modelFile);
    }

    next(error);
  }
};

const deleteCharacter = async (req, res, next) => {
  try {
    const character = await Character.findById(req.params.id);

    if (!character) {
      res.status(404);
      throw new Error("Character not found.");
    }

    await character.deleteOne();
    await Promise.all([removeStoredFile(character.image), removeStoredFile(character.imageTransparent), removeStoredFile(character.model3d)]);

    res.json({
      success: true,
      message: "Character deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

const getCharacterRanking = async (req, res, next) => {
  try {
    const characters = await Character.find().sort({ rankPoints: -1, votes: -1 }).limit(10);
    
    res.json({
      success: true,
      count: characters.length,
      data: characters
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCharacter,
  getCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
  getCharacterRanking
};
