// Get the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productNameFromURL = urlParams.get('name');

// Fetch all products from API
async function fetchProductData() {
  try {
    const response = await fetch('https://myowlet.in/api/V1/products');
    const data = await response.json();
    return data.data.data; // Array of products
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Find the specific product by SKU
async function getProductDetails() {
  const products = await fetchProductData();
  if (!productNameFromURL || !products) return null;
  return products.find(p => p.sku === productNameFromURL);
}

// Format API data to match component's expected structure
function formatProductData(apiProduct) {
  if (!apiProduct) return null;
  
  // Parse the description JSON string
  const description = apiProduct.description ? JSON.parse(apiProduct.description) : {
    DESCRIPTION: 'No description available',
    INGREDIENTS: 'No ingredients listed'
  };
  
  return {
    name: apiProduct.name || 'Product Name',
    category: apiProduct.category?.name || 'Category',
    rating: apiProduct.review_stats?.average_rating || 0,
    reviews: apiProduct.review_stats ? 
      `${apiProduct.review_stats.average_rating}/5 (${apiProduct.review_stats.total_reviews} reviews)` : 
      'No reviews yet',
    price: apiProduct.final_price || '0',
    images: [
      ...(apiProduct.product_images?.banner || []).map(img => `../images/${img}`),
      ...(apiProduct.product_images?.detail || []).map(img => `../images/${img}`)
    ],
    weights: (apiProduct.variations || []).map(variant => ({
      value: variant.id,
      label: variant.variant_name,
      price: variant.final_price
    })),
    description: description.DESCRIPTION || 'No description available',
    ingredients: description.INGREDIENTS ? 
      description.INGREDIENTS.split(',').map(item => item.trim()) : 
      ['No ingredients listed']
  };
}

// Main initialization function
async function initProductPage() {
  // Show loading state
  const container = document.getElementById('product-container');
  if (container) {
    container.innerHTML = '<div class="text-center py-10">Loading product...</div>';
  }

  try {
    const apiProduct = await getProductDetails();
    if (!apiProduct) {
      throw new Error('Product not found');
    }

    const formattedProduct = formatProductData(apiProduct);
    const productDisplay = createProductDisplay("product-container", formattedProduct);

   
  } catch (error) {
    console.error('Error:', error);
    if (container) {
      container.innerHTML = `
        <div class="text-center py-10 text-red-500">
          <p>Error loading product: ${error.message}</p>
          <a href="/" class="text-blue-500 underline">Return to home page</a>
        </div>
      `;
    }
  }
}

// Start the process when DOM is loaded
document.addEventListener("DOMContentLoaded", initProductPage);

// Product display component with responsive fixes
function createProductDisplay(containerId, productData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Current state
  let currentImageIndex = 0;
  let currentWeightIndex = 0;
  let quantity = 1;

  // Create the HTML structure
  function render() {
    container.innerHTML = `
      <div class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Image Gallery (Left Column) -->
          <div class="lg:w-1/2 w-full">
            <!-- Mobile Slider -->
            <div class="lg:hidden relative w-full">
              <div class="glide glide-product">
                <div class="glide__track w-full" data-glide-el="track">
                  <ul class="glide__slides">
                    ${productData.images.map((image, index) => `
                      <li class="glide__slide">
                        <div class="aspect-w-1 aspect-h-1 w-full">
                          <img class="w-full h-auto max-h-[70vh] object-contain" 
                               src="${image}" 
                               alt="${productData.name} ${index + 1}" />
                        </div>
                      </li>
                    `).join('')}
                  </ul>
                </div>
                <div class="glide__arrows" data-glide-el="controls">
                  <button class="glide__arrow glide__arrow--left absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow" data-glide-dir="<">
                    <img class="w-5 h-5" src="../images/chevron-left.svg" alt="Previous" />
                  </button>
                  <button class="glide__arrow glide__arrow--right absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow" data-glide-dir=">">
                    <img class="w-5 h-5" src="../images/chevron-right.svg" alt="Next" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Desktop Gallery -->
            <div class="hidden lg:block">
              <div class="mb-4 rounded-lg overflow-hidden">
                <img id="product-image-web" 
                     class="w-full h-auto max-h-[550px] object-contain" 
                     src="${productData.images[currentImageIndex]}" 
                     alt="${productData.name}" />
              </div>
              <div class="grid grid-cols-5 gap-2">
                ${productData.images.map((image, index) => `
                  <button class="rounded-md overflow-hidden ${index === currentImageIndex ? 'ring-2 ring-primary' : ''}">
                    <img class="w-full h-20 object-cover cursor-pointer"
                         src="${image}"
                         alt="Thumbnail ${index + 1}"
                         data-index="${index}" />
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Product Details (Right Column) -->
          <div class="lg:w-1/2 w-full">
            <div class="sticky top-4">
              <h3 class="text-lg text-gray-500">${productData.category}</h3>
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 mb-2">${productData.name}</h1>
              
              <div class="flex items-center gap-2 mb-4">
                <div class="flex items-center bg-gray-800 text-white px-2 py-1 rounded">
                  <span class="text-sm">${productData.rating}</span>
                  <img class="w-3 h-3 ml-1" src="../images/star.png" alt="Rating" />
                </div>
                <span class="text-sm text-gray-600">${productData.reviews}</span>
              </div>

              <div class="mb-6">
                <h3 class="text-lg font-medium mb-2">Weight:</h3>
                <div class="flex flex-wrap gap-2">
                  ${productData.weights.map((weight, index) => `
                    <button class="px-4 py-2 border rounded-md text-sm ${
                      index === currentWeightIndex 
                        ? 'bg-gray-900 text-white border-gray-900' 
                        : 'bg-white text-gray-900 border-gray-300'
                    }"
                            data-weight="${weight.value}"
                            data-index="${index}">
                      ${weight.label} - Rs. ${weight.price}
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="flex items-center justify-between mb-6">
                <span class="text-2xl font-bold">Rs. ${productData.weights[currentWeightIndex]?.price || productData.price}</span>
                <div class="flex items-center border rounded-md">
                  <button id="sub-qnt" class="px-3 py-2 text-lg">-</button>
                  <span id="val-qnt" class="px-3 py-2 border-x">${quantity}</span>
                  <button id="add-qnt" class="px-3 py-2 text-lg">+</button>
                </div>
              </div>

              <button id="add-to-cart" class="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-md font-medium text-lg mb-8 transition-colors">
                Add to Cart
              </button>

              <!-- Accordions -->
              <div class="space-y-4">
                <div class="border rounded-lg overflow-hidden">
                  <button class="accordian-btn w-full flex justify-between items-center p-4" data-section="description">
                    <h3 class="text-lg font-medium">Product Description</h3>
                    <img class="transform transition-transform w-5 h-5" src="../images/chevron-down.svg" alt="Toggle" />
                  </button>
                  <div class="accordion-content border-t p-4 hidden">
                    <div class="prose max-w-none">${productData.description}</div>
                  </div>
                </div>

                <div class="border rounded-lg overflow-hidden">
                  <button class="accordian-btn w-full flex justify-between items-center p-4" data-section="ingredients">
                    <h3 class="text-lg font-medium">Ingredients</h3>
                    <img class="w-5 h-5" src="../images/chevron-down.svg" alt="Toggle" />
                  </button>
                  <div class="accordion-content border-t p-4 hidden">
                    <ul class="list-disc pl-5">
                      ${productData.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Initialize event listeners
    initEventListeners();
    initSliders();
  }

  // Initialize event listeners
  function initEventListeners() {
    // Image selection (desktop)
    container.querySelectorAll('.product-option-image, [data-index]').forEach(img => {
      img.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        currentImageIndex = index;
        render();
      });
    });

    // Weight selection
    container.querySelectorAll('[data-weight]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentWeightIndex = parseInt(e.currentTarget.dataset.index);
        render();
      });
    });

    // Quantity controls
    container.querySelector('#sub-qnt').addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        container.querySelector('#val-qnt').textContent = quantity;
      }
    });

    container.querySelector('#add-qnt').addEventListener('click', () => {
      quantity++;
      container.querySelector('#val-qnt').textContent = quantity;
    });

    // Accordion buttons
    container.querySelectorAll('.accordian-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const content = e.currentTarget.nextElementSibling;
        const icon = e.currentTarget.querySelector('img');
        
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
      });
    });

    // Add to cart
    container.querySelector('#add-to-cart').addEventListener('click', () => {
      const selectedProduct = {
        ...productData,
        selectedWeight: productData.weights[currentWeightIndex],
        quantity: quantity,
        selectedImage: productData.images[currentImageIndex],
        price: productData.weights[currentWeightIndex]?.price || productData.price
      };
      console.log('Added to cart:', selectedProduct);
      // Add your cart logic here
    });
  }

  // Initialize sliders
  function initSliders() {
    if (typeof Glide !== 'undefined') {
      // Mobile product slider
      new Glide('.glide-product', {
        type: 'carousel',
        perView: 1,
        gap: 10,
        peek: {
          before: 20,
          after: 20
        },
        breakpoints: {
          640: {
            perView: 1.2
          }
        }
      }).mount();
    }
  }

  // Initial render
  render();

  return {
    updateProduct: (newProductData) => {
      productData = newProductData;
      render();
    },
    getCurrentSelection: () => {
      return {
        ...productData,
        selectedWeight: productData.weights[currentWeightIndex],
        quantity: quantity,
        selectedImage: productData.images[currentImageIndex],
        price: productData.weights[currentWeightIndex]?.price || productData.price
      };
    }
  };
}

// Related Product slider
document.addEventListener("DOMContentLoaded", function () {
  new Glide(".glide-1", {
    type: "carousel",
    perView: 3,
    breakpoints: {
      2000:{perView:3},
      1600:{perView:2.4},
      1024: { perView: 1.2 },
      850: { perView: 1 },
      440: { perView: 1.45 },
    },
  }).mount();
});

