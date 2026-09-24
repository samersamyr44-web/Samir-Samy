


// ----------------------------------------------------------------------------------------





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

let selectedColor = "white";
let isSizeOpen = false;
let selectedSize = "";

// Open product modal
productButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Shopify product image
    modalImage.src = button.dataset.productImage;
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

  if (color === "white") {
    colorSlider.style.left = "5px";
    colorSlider.style.width = "131px";

    whiteText.classList.remove("text-black");
    whiteText.classList.add("text-white");

    blackText.classList.remove("text-white");
    blackText.classList.add("text-black");
  } else {
    colorSlider.style.left = "140px";
    colorSlider.style.width = "130px";

    blackText.classList.remove("text-black");
    blackText.classList.add("text-white");

    whiteText.classList.remove("text-white");
    whiteText.classList.add("text-black");
  }
}

colorWhite.addEventListener("click", () => selectColor("white"));
colorBlack.addEventListener("click", () => selectColor("black"));

// Size dropdown
sizeToggle.addEventListener("click", () => {
  isSizeOpen = !isSizeOpen;

  sizeDropdown.classList.toggle("hidden", !isSizeOpen);

  if (isSizeOpen) {
    sizeArrow.classList.add("rotate-180");

    sizeValue.textContent = "Choose your size";

    sizeValue.classList.remove(
      "left-0",
      "w-[216px]",
      "text-center"
    );

    sizeValue.classList.add("left-[13px]");
  } else {
    sizeArrow.classList.remove("rotate-180");

    if (selectedSize) {
      sizeValue.textContent = selectedSize;

      sizeValue.classList.remove("left-[13px]");

      sizeValue.classList.add(
        "left-0",
        "w-[216px]",
        "text-center"
      );
    }
  }
});

// Size selection
const sizeOptions = document.querySelectorAll(".size-option");

sizeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectedSize = option.dataset.size;

    sizeValue.textContent = selectedSize;

    sizeValue.classList.remove("left-[13px]");

    sizeValue.classList.add(
      "left-0",
      "w-[216px]",
      "text-center"
    );

    sizeDropdown.classList.add("hidden");

    sizeArrow.classList.remove("rotate-180");

    isSizeOpen = false;
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.getElementById("menu-icon");
const mobileMenu = document.getElementById("mobile-menu");

const openMenuUrl = menuIcon.dataset.openMenuUrl;
const closeMenuUrl = menuIcon.dataset.closeMenuUrl;

let isMenuOpen = false;

menuToggle.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");

    menuIcon.src = closeMenuUrl;

    menuIcon.classList.remove(
      "h-[10px]",
      "w-[18px]"
    );

    menuIcon.classList.add(
      "h-[13px]",
      "w-[12.73px]"
    );

    menuToggle.setAttribute("aria-label", "Close menu");
  } else {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");

    menuIcon.src = openMenuUrl;

    menuIcon.classList.remove(
      "h-[13px]",
      "w-[12.73px]"
    );

    menuIcon.classList.add(
      "h-[10px]",
      "w-[18px]"
    );

    menuToggle.setAttribute("aria-label", "Open menu");
  }
});