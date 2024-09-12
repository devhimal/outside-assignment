const Video = require("../models/VideoMoels");

const seedVideos = async () => {
  try {
    const videosCount = await Video.countDocuments();
    if (videosCount === 0) {
      await Video.insertMany([
        {
          title: "JavaScript Video Short 1",
          url: "/public/videos/fireship.mp4",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
          videoIcons: "/public/assets/icons/Vector.png",
        },
        {
          title: "JavaScript Video Short 2",
          url: "/public/videos/fireship.mp4",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
          videoIcons: "/public/assets/icons/Icon.png",
        },
        {
          title: "JavaScript Video Short 3",

          url: "/public/videos/fireship.mp4",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
          videoIcons: "/public/assets/Icon/Vector.png",
        },
      ]);
      console.log("Sample data inserted.");
    } else {
      console.log("Data already exists.");
    }
  } catch (err) {
    console.error("Error inserting sample data: ", err);
  }
};

module.exports = seedVideos;
