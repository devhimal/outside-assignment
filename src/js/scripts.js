document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(`http://localhost:3000/api/videos`); // Ensure you use the correct port and route
    const videos = await response.json();
    const videoContainer = document.getElementById("videoWrapper");

    if (!videoContainer) {
      console.error("videoWrapper element not found in the DOM.");
      return;
    }

    // Variable to track the currently playing video
    let currentPlayingVideo = null;

    videos.forEach((video, index) => {
      const videoElement = document.createElement("div");
      videoElement.classList.add("video-card");

      // Create the video card with a custom play/pause button
      videoElement.innerHTML = `
        
        <div class="video-wrapper">
          <video width="100%" height="500px" id="video${index}" class="custom-video" poster="poster.jpg">
            <source src="../../public/videos/fireship.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <div class="play-pause-btn" id="playPauseBtn${index}"></div>
        </div>
        <img src=${video.videoIcons} alt="" style="margin: 20px 0px"/>
        <h2 class="video-heading">${video.title}</h2>
        <p class="video-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
      `;

      videoContainer.appendChild(videoElement);

      // Get the current video and play/pause button
      const videoTag = videoElement.querySelector("video");
      const playPauseBtn = videoElement.querySelector(".play-pause-btn");

      // Add click event listener for the play/pause button
      playPauseBtn.addEventListener("click", () => {
        if (videoTag.paused) {
          // If another video is playing, pause it
          if (currentPlayingVideo && currentPlayingVideo !== videoTag) {
            currentPlayingVideo.pause();
            currentPlayingVideo.nextElementSibling.classList.remove("pause");
          }

          // Play the clicked video
          videoTag.play();
          playPauseBtn.classList.add("pause"); // Change to pause icon
          currentPlayingVideo = videoTag; // Update the currently playing video
        } else {
          // Pause the video if it's already playing
          videoTag.pause();
          playPauseBtn.classList.remove("pause"); // Change back to play icon
          currentPlayingVideo = null;
        }
      });

      // Reset play/pause button when the video ends
      videoTag.addEventListener("ended", () => {
        playPauseBtn.classList.remove("pause");
        currentPlayingVideo = null;
      });
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
});
