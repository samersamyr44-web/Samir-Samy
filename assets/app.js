// Modal elements
const modal = document.getElementById("product-modal");
const modalOverlay = document.getElementById("modal-overlay");
const closeModalBtn = document.getElementById("close-modal-btn");

const productButtons = document.querySelectorAll(
  '[aria-label^="View product"]'
);

const modalImage = document.getElementById("modal-product-image");
const modalTitle = document.getElementById("modal-product-title");
const modalPrice = document.getElementById("modal-product-price");
const modalDescription = document.getElementById(
  "modal-product-description"
);

// Color elements
const colorWhite = document.getElementById("color-white");
const colorBlack = document.getElementById("color-black");
const whiteText = document.getElementById("white-text");
const blackText = document.getElementById("black-text");
const colorSlider = document.getElementById("color-slider");
const firstColorIndicator = document.getElementById("first-color-indicator");
const secondColorIndicator = document.getElementById("second-color-indicator");

// Size elements
const sizeToggle = document.getElementById("size-toggle");
const sizeDropdown = document.getElementById("size-dropdown");
const sizeArrow = document.getElementById("size-arrow");
const sizeValue = document.getElementById("size-value");

// Product colors
const productColors = [
  ["White", "#FFFFFF", "Black", "#000000"],
  ["Blue", "#0D499F", "Black", "#000000"],
  ["Red", "#B20F36", "Grey", "#AFAFB7"],
  ["White", "#FFFFFF", "Black", "#000000"],
  ["Gray", "#AFAFB7", "Black", "#000000"],
  ["Blue", "#0D499F", "Black", "#000000"],
];

let selectedColor = "white";
let selectedSize = "";
let isSizeOpen = false;
let currentProductHandle = "";

async function getProductVariants() {
  const response = await fetch(`/products/${currentProductHandle}.js`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await response.json();

  return product.variants;
}

function findVariant(variants) {
  return variants.find((variant) => {
    return (
      variant.option1 === selectedSize &&
      variant.option2.toLowerCase() === selectedColor
    );
  });
}

// Open product modal
productButtons.forEach((button, index) => {
  button.addEventListener("click", async () => {
    modalImage.src = button.dataset.productImage;
    currentProductHandle = button.dataset.productHandle;

    modalTitle.textContent = button.dataset.productTitle;
    modalPrice.textContent = button.dataset.productPrice;
    modalDescription.textContent = button.dataset.productDescription;

    const colors = productColors[index];

    whiteText.textContent = colors.first;
    blackText.textContent = colors.second;

    firstColorIndicator.style.backgroundColor = colors.firstIndicator;
    secondColorIndicator.style.backgroundColor = colors.secondIndicator;

    modal.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

// Close product modal
function closeModal() {
  modal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
  document.body.style.overflow = "";
}

closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// Color selection
function selectColor(color) {
  selectedColor = color;

  const isWhite = color === "white";

  colorSlider.style.left = isWhite ? "5px" : "140px";
  colorSlider.style.width = isWhite ? "131px" : "130px";

  whiteText.classList.toggle("text-white", isWhite);
  whiteText.classList.toggle("text-black", !isWhite);

  blackText.classList.toggle("text-white", !isWhite);
  blackText.classList.toggle("text-black", isWhite);
}

colorWhite.addEventListener("click", () => selectColor("white"));
colorBlack.addEventListener("click", () => selectColor("black"));

// Size dropdown
function updateSizeValue() {
  sizeValue.classList.toggle("left-[13px]", isSizeOpen);
  sizeValue.classList.toggle("left-0", !isSizeOpen);
  sizeValue.classList.toggle("w-[216px]", !isSizeOpen);
  sizeValue.classList.toggle("text-center", !isSizeOpen);
}

sizeToggle.addEventListener("click", () => {
  isSizeOpen = !isSizeOpen;

  sizeDropdown.classList.toggle("hidden", !isSizeOpen);
  sizeArrow.classList.toggle("rotate-180", isSizeOpen);

  if (isSizeOpen) {
    sizeValue.textContent = "Choose your size";
  } else if (selectedSize) {
    sizeValue.textContent = selectedSize;
  }

  updateSizeValue();
});

// Size selection
const sizeOptions = document.querySelectorAll(".size-option");

sizeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectedSize = option.dataset.size;
    sizeValue.textContent = selectedSize;

    isSizeOpen = false;
    sizeDropdown.classList.add("hidden");
    sizeArrow.classList.remove("rotate-180");

    updateSizeValue();
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");

const { openMenuUrl, closeMenuUrl } = menuIcon.dataset;

let isMenuOpen = false;

function updateMenuIcon() {
  menuIcon.classList.toggle("h-[13px]", isMenuOpen);
  menuIcon.classList.toggle("w-[12.73px]", isMenuOpen);
  menuIcon.classList.toggle("h-[10px]", !isMenuOpen);
  menuIcon.classList.toggle("w-[18px]", !isMenuOpen);
}

menuToggle.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;

  mobileMenu.classList.toggle("hidden", !isMenuOpen);
  mobileMenu.classList.toggle("flex", isMenuOpen);

  menuIcon.src = isMenuOpen ? closeMenuUrl : openMenuUrl;

  updateMenuIcon();

  menuToggle.setAttribute(
    "aria-label",
    isMenuOpen ? "Close menu" : "Open menu"
  );
});