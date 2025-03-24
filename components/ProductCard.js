export default function ProductCard(
  { imageSrc, name, price, rating },
  onClick
) {
  const card = document.createElement("div");
  card.className =
    "bg-secondary flex flex-col justify-center px-1 py-2 items-center gap-1 w-[181px] md:w-[360px] md:h-[475px] h-72 rounded-lg";
  // Product image container
  const imageContainer = document.createElement("div");
  imageContainer.className = "h-[181px] w-44 md:w-80 md:h-72 px-1";

  const img = document.createElement("img");
  img.className = "h-full w-full object-cover rounded-lg";
  img.src = imageSrc;
  img.alt = name;

  imageContainer.appendChild(img);
  card.appendChild(imageContainer);

  // Product details
  const details = document.createElement("div");
  details.className = "w-full space-y-1.5 px-2 md:px-5";

  const detailsWrapper = document.createElement("div");
  detailsWrapper.className = "flex justify-between items-center";

  const productInfo = document.createElement("div");

  const productName = document.createElement("p");
  productName.className = "font-mont text-lg md:text-2xl";
  productName.textContent = name;

  const productPrice = document.createElement("p");
  productPrice.className = "text-sm md:text-lg";
  productPrice.textContent = `$${price}`;

  productInfo.appendChild(productName);
  productInfo.appendChild(productPrice);
  detailsWrapper.appendChild(productInfo);

  // Product rating
  const ratingContainer = document.createElement("div");
  ratingContainer.className =
    "bg-text md:flex hidden items-center justify-center gap-1 h-fit w-fit p-1.5 rounded-full";

  const ratingText = document.createElement("p");
  ratingText.className = "text-white text-xs md:text-sm";
  ratingText.textContent = rating;

  const starImg = document.createElement("img");
  starImg.src = "../images/star.png";
  starImg.alt = "star";
  starImg.className = "h-3 w-3 md:h-4 md:w-4";

  ratingContainer.appendChild(ratingText);
  ratingContainer.appendChild(starImg);
  detailsWrapper.appendChild(ratingContainer);
  details.appendChild(detailsWrapper);

  // Add to cart button
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "w-full flex justify-center";

  const addButton = document.createElement("button");
  addButton.className =
    "bg-primary font-light py-2 px-8 md:w-full md:h-16 rounded-lg text-lg md:text-xl";
  addButton.textContent = "Add to Cart";
  addButton.addEventListener("click", onClick);

  buttonWrapper.appendChild(addButton);
  details.appendChild(buttonWrapper);

  card.appendChild(details);

  return card;
}
