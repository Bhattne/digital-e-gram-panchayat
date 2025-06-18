// AOS Scroll Animations
AOS.init({
  once: true,
  duration: 1000
});

// Preloader + Theme Loader + Dark Mode Toggle
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.style.display = "none";

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// Dark Mode Toggle
const toggle = document.getElementById("themeToggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });
}

// Parallax Floating Icons
document.addEventListener("mousemove", function (e) {
  document.querySelectorAll(".floating-icons img").forEach((icon, i) => {
    const speed = (i + 1) * 0.3;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    icon.style.transform = `translate(${x}px, ${y}px)`;
  });
});
