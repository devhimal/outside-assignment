document.addEventListener("DOMContentLoaded", async function () {
  try {
    const headers = {
      'Authorization': 'Bearer f2de6a202cd9dd9b65c97c2c46e92c12ebbbaa1d0d56ce82e4441fe84042d77fd98e1946f120625fb7a526cc4477202e3c177f1b3b4e701f686956409d12ebc8e0bacd5d2d11d9e93797c5b4162d59d2a725d79927ea81105b287322700e4ed0509fb75bf1418fc5b48da8ab3b1c68dc13bc99f267d46c7ad1232a8b1e7cc646'
    };
    const response = await fetch('http://localhost:1337/api/videostd', { headers: headers }); // Ensure you use the correct port and route
    const videos = await response.json();
    
    const videoContainer = document.getElementById("videoWrapper");

    if (!videoContainer) {
      console.error("videoWrapper element not found in the DOM.");
      return;
    }

    // Variable to track the currently playing video
    let currentPlayingVideo = null;

    videos.data.forEach((video, index) => {
      const videoElement = document.createElement("div");
      videoElement.classList.add("video-card");

      // Create the video card with a custom play/pause button
      videoElement.innerHTML = `
        
        <div class="video-wrapper">
          <video width="100%" height="500px" id="video${index}" class="custom-video" poster=${video.attributes.banner_url}>
            <source src=${video.attributes.video_url} type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <div class="play-pause-btn" id="playPauseBtn${index}"></div>
        </div>
        <img src=${video.attributes.icons_url} alt="" style="margin: 50px 0px 20px 0px;" class="videoIcons"/>
        <h2 class="video-heading">${video?.attributes.video_name}</h2>
        <p class="video-paragraph">${video?.attributes.description}</p>
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
