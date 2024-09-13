document?.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLink = document.getElementById("nav__link");
    const close = document.getElementById("closebutton");

    if (hamburger && navLink && close) {
      // Toggle show/hide menu when hamburger is clicked
      hamburger.addEventListener("click", () => {
        navLink.classList.toggle("show");
      });

      // Hide menu when close button is clicked
      close.addEventListener("click", () => {
        navLink.classList.remove("show");
      });
    } else {
      console.error("One or more elements are not found.");
    }
  });