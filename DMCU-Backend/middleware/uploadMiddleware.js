const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadRoot = path.join(process.cwd(), "uploads");
const imageUploadPath = path.join(uploadRoot, "images");
const modelUploadPath = path.join(uploadRoot, "models");

[uploadRoot, imageUploadPath, modelUploadPath].forEach((directory) => {
  fs.mkdirSync(directory, { recursive: true });
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "image" || file.fieldname === "imageTransparent") {
      return cb(null, imageUploadPath);
    }

    if (file.fieldname === "model3d") {
      return cb(null, modelUploadPath);
    }

    return cb(new Error("Unexpected upload field."));
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  }
});

const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif"];

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  fileFilter(req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();

    if (file.fieldname === "image" || file.fieldname === "imageTransparent") {
      if (file.mimetype.startsWith("image/") || imageExtensions.includes(extension)) {
        return cb(null, true);
      }

      return cb(new Error(`Only image files are allowed for the ${file.fieldname} field.`));
    }

    if (file.fieldname === "model3d") {
      if (extension === ".glb") {
        return cb(null, true);
      }

      return cb(new Error("Only .glb files are allowed for the model3d field."));
    }

    return cb(new Error("Unexpected upload field."));
  }
});

const characterUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "imageTransparent", maxCount: 1 },
  { name: "model3d", maxCount: 1 }
]);

const uploadImages = upload.fields([
  { name: "image", maxCount: 1 }
]);

const getUploadedFilePath = (file) => {
  if (!file) {
    return null;
  }

  const relativePath = path.relative(uploadRoot, file.path).replace(/\\/g, "/");
  return `/uploads/${relativePath}`;
};

module.exports = {
  characterUpload,
  uploadImages,
  getUploadedFilePath,
  uploadRoot
};
