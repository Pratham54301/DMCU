const path = require("path");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const characterRoutes = require("./routes/characterRoutes");
const blogRoutes = require("./routes/blogRoutes");
const themeRoutes = require("./routes/themeRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const comicRoutes = require("./routes/comicRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// 1. Properly parse allowed origins (strip trailing slashes to be safe)
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
      .map((origin) => origin.trim().replace(/\/$/, "")) // Remove trailing slash
      .filter(Boolean)
  : ["https://dmcu.vercel.app", "http://localhost:3000", "http://localhost:3004"];

// 2. Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation: Origin not allowed'));
    }
  },
  credentials: true, // Important for cookies/sessions
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};

// 3. Handle Preflight (OPTIONS) requests globally BEFORE regular routes
app.options('*', cors(corsOptions));

// 4. Apply CORS middleware globally
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded assets so the frontend can use saved image and model paths directly.
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DMCU Backend API is running."
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/comics", comicRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ message: "API Route not found" });
});
app.use(errorHandler);

module.exports = app;
