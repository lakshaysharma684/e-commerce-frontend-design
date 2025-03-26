import ProductCard from '../components/ProductCard.js'

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
    gap:20,
    breakpoints: {
      2000:{perView:2.5},
      1600:{perView:2},
      1400: { perView: 2 },
      850: { perView: 2.8 },
      440: { perView: 1.6 },
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



// document.addEventListener("DOMContentLoaded", () => {
//   const productsContainer = document.getElementById("products");
//   console.log(productContainer)
  
//   async function loadProductData(){
//     try {
      
//       const res = await fetch("/data/product.json")
//       const products = await res.json()
//       const {data:productData} = products.data
//       productData.slice(0,4).map((product) => {
//         const productCard = ProductCard(product, () => {
//           if (product.sku) {
//             window.location.href = `product.html?name=${product.sku}`;
//           } else {
//             console.error("SKU is missing for product:", product);
//           }
//         });
//         productsContainer.appendChild(productCard);
//       });
//     } catch (error) {
//       console.log("Error fetching Products",error)
//     }
//   }

//   loadProductData()


// });

{/* <div
class="bg-secondary flex flex-col justify-center px-1 py-2 items-center gap-1 w-[181px] lg:w-[20rem] lg:h-[450px] 2xl:w-[23rem] 2xl:h-[475px] h-72 rounded-lg"
>
<!-- product image -->
<div class="h-[181px] w-44 lg:w-[90%] lg:h-72">
  <img
    class="h-full w-full object-cover rounded-lg"
    src="./images/cat-acchar-banner.webp"
    alt=""
  />
</div>

<!-- product details -->
<div class="w-full space-y-1.5 px-2 lg:px-5">
  <div class="flex justify-between items-center">
    <div>
      <p class="font-mont text-lg lg:text-2xl">Product Name</p>
      <p class="text-sm lg:text-lg">$18.9</p>
    </div>
    <!-- product rating -->
    <div
      class="bg-text lg:flex hidden items-center justify-center gap-1 h-fit w-fit p-1.5 rounded-full"
    >
      <p class="text-white text-xs lg:text-sm">4.3</p>
      <img
        src="./images/star.png"
        alt=""
        class="h-3 w-3 lg:h-4 lg:w-4"
      />
    </div>
  </div>

  <div class="w-full flex justify-center">
    <button
      class="bg-primary font-light py-2 px-8 lg:w-full lg:h-16 rounded-lg text-lg lg:text-xl"
    >
      Add to Cart
    </button>
  </div>
</div>
</div> */}