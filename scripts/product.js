//  product Slider
document.addEventListener("DOMContentLoaded", function () {
  new Glide(".glide-product", {
    type: "carousel",
    perView: 3,
    breakpoints: {
      500: { perView: 1 },
    },
  }).mount();
});

// size button click

const sizeButons = document.querySelectorAll(".size-btn");
sizeButons.forEach((btn) => {
  btn.addEventListener("click", () => {
    sizeButons.forEach((elm) => {
      elm.classList.add("border-[#333]", "text-[#333]");
      elm.classList.remove("bg-[#333]", "text-white");
    });
    btn.classList.add("bg-[#333]", "text-white");
    btn.classList.remove("border-[#333]", "text-[#333]");
  });
});

// quantity event
const qntSub = document.getElementById("sub-qnt");
const qntVal = document.getElementById("val-qnt");
const qntAdd = document.getElementById("add-qnt");
let quantity = 1;
// sub quantity value
qntSub.addEventListener("click", () => {
  if (quantity > 1) {
    quantity = quantity - 1;
    qntVal.textContent = quantity;
  }
  return;
});

// sub quantity value
qntAdd.addEventListener("click", () => {
  quantity = quantity + 1;
  qntVal.innerHTML = quantity;
});

// Accordion btn for product detail
const accordionButtons = document.querySelectorAll(".accordian-btn");
const accordionContent = document.querySelectorAll(".accordian-content");

accordionButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    btn.children[1].classList.toggle("rotate-180");
    btn.nextElementSibling.classList.toggle("hidden");
  });
});

// Related Product slider
document.addEventListener("DOMContentLoaded", function () {
  new Glide(".glide-1", {
    type: "carousel",
    perView: 3,
    breakpoints: {
      1024: { perView: 1.2 },
      850: { perView: 1 },
      440: { perView: 1.45 },
    },
  }).mount();
});

// options images to set
const productImageWeb = document.getElementById("product-image-web");
const productOptionImages = document.querySelectorAll(".product-option-image");

productOptionImages.forEach((elm) => {
  elm.addEventListener("click", () => {
    let imgSrc = elm.getAttribute("src");
    productImageWeb.setAttribute("src", imgSrc);

    productOptionImages.forEach((img) => img.classList.remove("opacity-40"));
    elm.classList.toggle("opacity-40");
  });
});
