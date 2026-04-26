const path = require("path");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const characterRoutes = require("./routes/characterRoutes");
const blogRoutes = require("./routes/blogRoutes");
const themeRoutes = require("./routes/themeRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const comicRoutes = require("./routes/comicRoutes");
const userRoutes = require("./routes/userRoutes");
const loreRoutes = require("./routes/loreRoutes");
const productRoutes = require("./routes/productRoutes");
const trailerRoutes = require("./routes/trailerRoutes");
const seoRoutes = require("./routes/seoRoutes");
const motionRoutes = require("./routes/motionRoutes");
const settingRoutes = require("./routes/settingRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const { globalSearch } = require("./controllers/searchController");
const { subscribe: subscribeNewsletter } = require("./controllers/newsletterController");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

const defaultOrigins = ["https://dmcu.vercel.app", "http://localhost:3000", "http://localhost:3004"];
const allowedOrigins = process.env.CLIENT_URL
  ? [
      ...process.env.CLIENT_URL.split(",")
        .map((origin) => origin.trim().replace(/\/$/, "")) // Remove trailing slash
        .filter(Boolean),
      ...defaultOrigins // Always include these to prevent accidental lockouts
    ]
  : defaultOrigins;

// 2. Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    // Allow any local network IP address for testing (192.168.x.x)
    if (origin.startsWith('http://192.168.') || origin.startsWith('http://10.') || origin.startsWith('http://172.')) {
      return callback(null, true);
    }
    
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
app.use("/api/blogs", blogRoutes);
app.use("/api/theme", themeRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/comics", comicRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lore", loreRoutes);
app.use("/api/products", productRoutes);
app.use("/api/trailers", trailerRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api/motion", motionRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/submissions", submissionRoutes);
app.get("/api/search", globalSearch);
app.post("/api/newsletter/subscribe", subscribeNewsletter);

app.use('*', (req, res) => {
  res.status(404).json({ message: "API Route not found" });
});
app.use(errorHandler);

module.exports = app;
