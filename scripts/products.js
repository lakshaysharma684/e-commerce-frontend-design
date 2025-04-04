// importing components

import ProductCard from "../components/ProductCard.js";
import productData from "../lib/productData.js";

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

// filter option mobile

const mFilterBtn = document.getElementById("m-filter-btn");
const mFilteroption = document.getElementById("m-filter-option");
const mFilterCancel = document.getElementById("m-filter-cancel");

mFilterBtn.addEventListener("click", () => {
  mFilteroption.classList.remove("-translate-x-[1000px]");
  mFilteroption.classList.add("translate-x-0");
});

mFilterCancel.addEventListener("click", () => {
  mFilteroption.classList.add("-translate-x-[1000px]");
  mFilteroption.classList.remove("translate-x-0");
});

// showing products

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");

  
  async function loadProductData(){
    try {
      
      const res = await fetch("/data/product.json")
      const products = await res.json()
      const {data:productData} = products.data
      productData.map((product) => {
        const productCard = ProductCard(product, () => {
          if (product.sku) {
            window.location.href = `product.html?name=${product.sku}`;
          } else {
            console.error("SKU is missing for product:", product);
          }
        });
        productsContainer.appendChild(productCard);
      });
    } catch (error) {
      console.log("Error fetching Products",error)
    }
  }

  loadProductData()


});
