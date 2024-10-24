document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const hamburger = document.getElementById("hamburger")
    const navLink = document.getElementById("nav__link")
    const close = document.getElementById("closebutton")
    const body = document.body

    if (hamburger === null || navLink === null || close === null) {
      console.log("One or more elements are null")
      return
    }

    hamburger.addEventListener("click", () => {
      navLink.classList.add("show")
      body.classList.add("no-scroll")
    })

    close.addEventListener("click", () => {
      navLink.classList.remove("show")
      body.classList.remove("no-scroll")
    })
  }, 300)
})

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const headers = {
      Authorization:
        "Bearer f2de6a202cd9dd9b65c97c2c46e92c12ebbbaa1d0d56ce82e4441fe84042d77fd98e1946f120625fb7a526cc4477202e3c177f1b3b4e701f686956409d12ebc8e0bacd5d2d11d9e93797c5b4162d59d2a725d79927ea81105b287322700e4ed0509fb75bf1418fc5b48da8ab3b1c68dc13bc99f267d46c7ad1232a8b1e7cc646",
    }

    const response = await fetch("http://localhost:1337/api/videostd", {
      headers: headers,
    }) // Ensure you use the correct port and route
    const videos = await response.json()

    const videoContainer = document.getElementById("videoWrapper")

    if (!videoContainer) {
      console.error("videoWrapper element not found in the DOM.")
      return
    }

    // Variable to track the currently playing video
    let currentPlayingVideo = null

    videos.data.forEach((video, index) => {
      const videoElement = document.createElement("div")
      videoElement.classList.add("video-card")

      // Create the video card with a custom play/pause button
      const videoUrl = video.attributes.video_url
      const isYouTubeVideo = videoUrl.includes(".com")

      videoElement.innerHTML = `
        <div class="video-wrapper">
          ${
            isYouTubeVideo
              ? `<iframe width="560" height="416" src="${videoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
              : `<video width="100%" height="500px" id="video${index}" class="custom-video" poster="${video.attributes.banner_url}">
                 <source src="${videoUrl}" preload allowfullscreen>
                 Your browser does ntype="video"ot support the video tag.
               </video>`
          }
          <div class="play-pause-btn" id="playPauseBtn${index}"></div>
        </div>
        <img src="${
          video.attributes.icons_url
        }" alt="" style="margin: 50px 0px 20px 0px;" class="videoIcons"/>
        <h2 class="video-heading">${video?.attributes.video_name}</h2>
        <p class="video-paragraph">${video?.attributes.description}</p>
      `

      videoContainer.appendChild(videoElement)

      // Get the current video and play/pause button
      const videoTag = videoElement.querySelector("video")
      const playPauseBtn = videoElement.querySelector(".play-pause-btn")

      if (videoTag) {
        // Add click event listener for the play/pause button
        playPauseBtn.addEventListener("click", () => {
          if (videoTag.paused) {
            if (currentPlayingVideo && currentPlayingVideo !== videoTag) {
              currentPlayingVideo.pause()
              currentPlayingVideo.nextElementSibling.classList.remove("pause")
            }

            // Play the clicked video
            videoTag.play()
            playPauseBtn.classList.add("pause")
            currentPlayingVideo = videoTag
          } else {
            // Pause the video if it's already playing
            videoTag.pause()
            playPauseBtn.classList.remove("pause")
            currentPlayingVideo = null
          }
        })

        // Reset play/pause button when the video ends
        videoTag.addEventListener("ended", () => {
          playPauseBtn.classList.remove("pause")
          currentPlayingVideo = null
        })
      }
    })
  } catch (error) {
    console.error("Error fetching videos:", error)
  }
})
