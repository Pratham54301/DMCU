const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");
const seedAdmin = require("./config/seedAdmin");
const seedAchievements = require("./config/seedAchievements");

const port = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();
  await seedAdmin();
  await seedAchievements();

  const server = app.listen(port, () => {
    console.log(`DMCU Backend server running on port ${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use. Stop the existing process or change PORT in .env.`);
      process.exit(1);
    }

    console.error(`Server error: ${error.message}`);
    process.exit(1);
  });
};

startServer().catch((error) => {
  console.error(`Server startup failed: ${error.message}`);
  process.exit(1);
});
// Trigger restart
