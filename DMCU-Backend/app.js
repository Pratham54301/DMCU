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

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS is not allowed for this origin."));
    },
    credentials: true
  })
);

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
