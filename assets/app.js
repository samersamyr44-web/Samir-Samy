// ========================================
// Modal Elements
// ========================================

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

// ========================================
// Color Elements
// ========================================

const colorWhite = document.getElementById("color-white");
const colorBlack = document.getElementById("color-black");
const whiteText = document.getElementById("white-text");
const blackText = document.getElementById("black-text");
const colorSlider = document.getElementById("color-slider");
const firstColorIndicator = document.getElementById("first-color-indicator");
const secondColorIndicator = document.getElementById("second-color-indicator");

// ========================================
// Size Elements
// ========================================

const sizeToggle = document.getElementById("size-toggle");
const sizeDropdown = document.getElementById("size-dropdown");
const sizeArrow = document.getElementById("size-arrow");
const sizeValue = document.getElementById("size-value");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const sizeOptions = document.querySelectorAll(".size-option");

// ========================================
// Mobile Menu Elements
// ========================================

const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");

const { openMenuUrl, closeMenuUrl } = menuIcon.dataset;

// ========================================
// Product Color Configuration
// ========================================

const productColors = [
  {
    first: "White",
    firstIndicator: "#FFFFFF",
    second: "Black",
    secondIndicator: "#000000",
  },
  {
    first: "Blue",
    firstIndicator: "#0D499F",
    second: "Black",
    secondIndicator: "#000000",
  },
  {
    first: "Red",
    firstIndicator: "#B20F36",
    second: "Grey",
    secondIndicator: "#AFAFB7",
  },
  {
    first: "White",
    firstIndicator: "#FFFFFF",
    second: "Black",
    secondIndicator: "#000000",
  },
  {
    first: "Gray",
    firstIndicator: "#AFAFB7",
    second: "Black",
    secondIndicator: "#000000",
  },
  {
    first: "Blue",
    firstIndicator: "#0D499F",
    second: "Black",
    secondIndicator: "#000000",
  },
];

// ========================================
// Application State
// ========================================

let selectedColor = "white";
let selectedSize = "";
let isSizeOpen = false;
let currentProductHandle = "";
let currentProductIndex = 0;
let isMenuOpen = false;

// ========================================
// Product / Variant Functions
// ========================================

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

// ========================================
// Add To Cart
// ========================================

addToCartBtn.addEventListener("click", async () => {
  if (!selectedSize) {
    alert("Please choose your size.");
    return;
  }

  const variants = await getProductVariants();

  const variant = findVariant(variants);

  if (!variant) {
    alert("This combination is not available.");
    return;
  }

  const response = await fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          id: variant.id,
          quantity: 1,
        },
        ...(selectedSize === "M" && selectedColor === "black"
          ? [
              {
                id: 50520210342075,
                quantity: 1,
              },
            ]
          : []),
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add product to cart.");
  }

  await response.json();

  addToCartBtn.classList.add("is-added");

  const buttonText = addToCartBtn.querySelector("span");
  buttonText.textContent = "ADDED ✓";

  setTimeout(() => {
    addToCartBtn.classList.remove("is-added");
    buttonText.textContent = "ADD TO CART";
  }, 1500);
});

// ========================================
// Open Product Modal
// ========================================

productButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    modalImage.src = button.dataset.productImage;
    currentProductHandle = button.dataset.productHandle;
    currentProductIndex = index;

    selectedColor = productColors[index].first.toLowerCase();
    selectedSize = "";

    sizeValue.textContent = "Choose your size";

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

// ========================================
// Close Product Modal
// ========================================

function closeModal() {
  modal.classList.add("hidden");
  modalOverlay.classList.add("hidden");
  document.body.style.overflow = "";
}

closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// ========================================
// Color Selection
// ========================================

function selectColor(color) {
  selectedColor = color.toLowerCase();

  const isFirstColor =
    selectedColor === productColors[currentProductIndex].first.toLowerCase();

  colorSlider.style.left = isFirstColor ? "5px" : "140px";
  colorSlider.style.width = isFirstColor ? "131px" : "130px";

  whiteText.classList.toggle("text-white", isFirstColor);
  whiteText.classList.toggle("text-black", !isFirstColor);

  blackText.classList.toggle("text-white", !isFirstColor);
  blackText.classList.toggle("text-black", isFirstColor);
}

colorWhite.addEventListener("click", () => {
  selectColor(productColors[currentProductIndex].first);
});

colorBlack.addEventListener("click", () => {
  selectColor(productColors[currentProductIndex].second);
});

// ========================================
// Size Dropdown
// ========================================

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

// ========================================
// Size Selection
// ========================================

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

// ========================================
// Mobile Menu
// ========================================

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