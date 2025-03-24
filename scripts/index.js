// mobile nav menu show

const menuIcon = document.getElementById("nav-menu");
const cancelNavIcon = document.getElementById("nav-x");
const navLinksMobile = document.getElementById("mobile-nav");

menuIcon.addEventListener("click", () => {
  navLinksMobile.classList.remove("translate-y-[1000px]");
  navLinksMobile.classList.add("translate-y-0");
  menuIcon.classList.add("hidden");
  cancelNavIcon.classList.add("block");
  cancelNavIcon.classList.remove("hidden");
});
cancelNavIcon.addEventListener("click", () => {
  navLinksMobile.classList.add("-translate-y-[1000px]");
  navLinksMobile.classList.remove("translate-y-0");
  menuIcon.classList.add("block");
  menuIcon.classList.remove("hidden");
  cancelNavIcon.classList.add("hidden");
});

// variables for main slider
const slider = document.getElementById("slider");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let mainIndex = 0;
const mainTotalSlides = slider.children.length;

// fn for changing images
function showSlide(i) {
  if (i >= mainTotalSlides) mainIndex = 0;
  else if (i < 0) mainIndex = mainTotalSlides - 1;
  else mainIndex = i;

  // Correcting transform movement
  slider.style.transform = `translateX(-${
    mainIndex * (100 / mainTotalSlides)
  }%)`;
}
next.addEventListener("click", () => showSlide(mainIndex + 1));
prev.addEventListener("click", () => showSlide(mainIndex - 1));

// bestSeler product Slider
document.addEventListener("DOMContentLoaded", function () {
  new Glide(".glide-1", {
    type: "carousel",
    perView: 2.4,
    breakpoints: {
      1024: { perView: 1.2 },
      850: { perView: 1 },
      440: { perView: 1.4 },
    },
  }).mount();
});

// owlet world Slider
document.addEventListener("DOMContentLoaded", function () {
  new Glide(".glide-2", {
    type: "carousel",
    perView: 1, // Adjust how many items are visible
    breakpoints: {
      1024: { perView: 3 }, // Show 1 slide on small screens
      820: { perView: 2.4 }, // Show 1 slide on small screens
      440: { perView: 1.3 },
    },
  }).mount();
});
