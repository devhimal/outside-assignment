// const express = require("express");
// const Video = require("../models/VideoMoels");

// const router = express.Router();

// router.get("/videos", async (req, res) => {
//   try {
//     const Videos = await Video.find();
//     res.json(Videos);
//   } catch (error) {
//     res.status(505).json({message: error.message})
//   }
// });

// module.exports = router;


const express = require("express");
const Video = require("../models/VideoMoels"); 

const router = express.Router();

// Define the GET route to fetch all videos
router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find(); 
    res.status(200).json(videos); 
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

module.exports = router;
