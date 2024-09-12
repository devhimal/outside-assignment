const express = require("express");
const cors = require("cors");
const Connection = require("./src/config/db.js");
const VideoRoutes = require("./src/routes/routes.js");
const seeVideo = require("./src/seed/seedVideos.js");

const app = express();
const PORT = process.env.PORT || 4000;

// Apply middleware (cors should be called as a function)
app.use(cors()); // Corrected this line
app.use(express.json());

// Connect to MongoDB and seed data
Connection().then(() => {
  seeVideo(); // Seed videos if needed
});

// API routes
app.use("/api", VideoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Your application server is running on port: ${PORT}`);
});
