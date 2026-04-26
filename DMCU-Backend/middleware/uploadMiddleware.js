const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

// Local Storage Configuration (Fallback)
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fs = require('fs');
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Storage for Images (Characters, Blogs, Comics)
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = file.fieldname === "imageTransparent" ? "dmcu/transparent" : "dmcu/images";
    return {
      folder: folder,
      allowed_formats: ["jpg", "png", "jpeg", "webp", "svg", "avif"],
      transformation: [{ quality: "auto" }]
    };
  }
});

// Storage for Models (GLB)
const modelStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "dmcu/models",
      resource_type: "raw", // Required for GLB
      public_id: `model-${Date.now()}`
    };
  }
});

// Storage for Documents (PDF)
const docStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "dmcu/docs",
      resource_type: "raw",
      public_id: `doc-${Date.now()}`
    };
  }
});

// Unified dynamic storage selector
const storage = multer.diskStorage({}); // Placeholder for multer-storage-cloudinary doesn't support multiple stores easily with one instance
// We'll define specific upload instances instead

const imageUpload = multer({ 
  storage: isCloudinaryConfigured ? imageStorage : localStorage,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

const characterUpload = multer({
  storage: isCloudinaryConfigured ? new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      let resource_type = "image";
      let folder = "dmcu/characters";
      
      if (file.fieldname === "model3d") {
        resource_type = "raw";
        folder = "dmcu/models";
      } else if (file.fieldname === "imageTransparent") {
        folder = "dmcu/characters/transparent";
      }
      
      return {
        folder: folder,
        resource_type: resource_type,
        public_id: `${file.fieldname}-${Date.now()}`
      };
    }
  }) : localStorage
}).fields([
  { name: "image", maxCount: 1 },
  { name: "imageTransparent", maxCount: 1 },
  { name: "model3d", maxCount: 1 }
]);

const comicUpload = multer({
  storage: isCloudinaryConfigured ? new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      let resource_type = "image";
      let folder = "dmcu/comics";
      
      if (file.fieldname === "pdfFile") {
        resource_type = "raw";
        folder = "dmcu/docs";
      }
      
      return {
        folder: folder,
        resource_type: resource_type,
        public_id: `${file.fieldname}-${Date.now()}`
      };
    }
  }) : localStorage
}, {
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit for comics/PDFs
}).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 }
]);

const blogUpload = multer({
  storage: isCloudinaryConfigured ? imageStorage : localStorage
}).fields([
  { name: "image", maxCount: 1 }
]);

const sectionArchitectUpload = multer({
  storage: isCloudinaryConfigured ? new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: "dmcu/sections",
        resource_type: "auto",
        public_id: `${file.fieldname}-${Date.now()}`
      };
    }
  }) : localStorage
}).any();

const trailerUpload = multer({
  storage: isCloudinaryConfigured ? imageStorage : localStorage
}).fields([
  { name: "thumbnail", maxCount: 1 }
]);

const getUploadedFilePath = (file) => {
  if (!file) return null;
  
  // If it's a Cloudinary upload, it has a 'path' which is the URL
  // If it's a local disk upload, 'path' is the absolute disk path, but we want the relative web path
  if (isCloudinaryConfigured) {
    return file.path;
  } else {
    // For local storage, multer provides 'filename'
    return `/uploads/${file.filename}`;
  }
};

module.exports = {
  characterUpload,
  comicUpload,
  blogUpload,
  trailerUpload,
  sectionArchitectUpload,
  getUploadedFilePath,
  cloudinary
};
