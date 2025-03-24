// mobile nav menu show
const menuIcon = document.getElementById("nav-menu");
const cancelNavIcon = document.getElementById("nav-x");
const navLinksMobile = document.getElementById("mobile-nav");

menuIcon.addEventListener("click", () => {
  navLinksMobile.classList.remove("translate-y-[1000px]");
  navLinksMobile.classList.add("translate-y-0");
  menuIcon.classList.add("hidden");
  cancelNavIcon.classList.remove("hidden");
  cancelNavIcon.classList.add("block");
});
cancelNavIcon.addEventListener("click", () => {
  navLinksMobile.classList.add("-translate-y-[1000px]");
  navLinksMobile.classList.remove("translate-y-0");
  menuIcon.classList.add("block");
  menuIcon.classList.remove("hidden");
  cancelNavIcon.classList.add("hidden");
  cancelNavIcon.classList.remove("blocl");
});
