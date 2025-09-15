// Wait for DOM content to load
window.addEventListener("DOMContentLoaded", function () {
  // Initialize VanillaTilt
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    speed: 400,
    scale: 1.05,
    glare: true,
    "max-glare": 0.2
  });

  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true
  });
});
