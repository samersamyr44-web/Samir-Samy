// Mobile menu toggle 

const menuToggle = document.getElementById("menu-toggle")
const menuIcon  = document.getElementById("menu-icon")
const MobileMenu = document.getElementById("mobile-menu")

const openMenuUrl = menuIcon.dataset.openMenuUrl
const closeMenuUrl = menuIcon.dataset.closeMenuUrl

let isMenuOpen = false;

menuToggle.addEventListener("click",()=>{
  isMenuOpen = !isMenuOpen

  if(isMenuOpen){
    MobileMenu.classlist.remove("hidden")
    MobileMenu.classlist.add("flex")

    menuIcon.src = closeMenuUrl

    menuIcon.classlist.remove(
      "h-[10px]",
      "w-[18px]"
    )
    menuIcon.classlist.add(
      "h-[13px]",
      "w-[12.73px]"
    )
    menuToggle.setAttribute("aria-label","Close menu")
  }else{
    MobileMenu.classlist.add("hidden");
    MobileMenu.classlist.remove("flex")

    menuIcon.src = openMenuUrl
    menuIcon.classlist.remove(
      "h-[13px]",
      "w-[12.73px]"
    )
    menuToggle.setAttribute9("aria-label","Open menu")
  }
})

// --------------------------------------Modal Elements-------------------------------------------------------
const modal = document.getElementById("product-modal")
const modalOverlay = document.getElementById("modal-overlay")
const closeModalBtn = document.getElementById("close-modal-btn")

const productButtons = document.querySelectorAll('[aria-label^="View product"]')

const modalImage = document.getElementById("modal-product-image")
const modalTitle = document.getElementById("modal-product-title")
const modalPrice = document.getElementById("modal-product-price")
const modalDescription = document.getElementById("modal-product-description")

// color element
cont colorWhite = document.getElementById("color-white")
cont colorBlack = document.getElementById("color-black")

const whiteText = document.getElementById("white-text")
const blackText = document.getElementById("black-text")

const colorSlider = document.getElementById("color-slider")
const firstColorIndicator = document.getElementById("first-color-indicator")
const secondColorIndicator = document.getElementById("second-color-indicator")


// size elements
const sizeToggle = document.getElementById("size-toggle")
const sizeDropdown = document.getElementById("size-dropdown")
const sizeArrow = document.getElementById("size-arrow")
const sizeValue = document.getElementById("size-value")

// product colors
const productColors = [
  {
    first:"White",
    firstIndicator:"#FFFFFF",
    second:"Black",
    secondIndicator:"#000000",
  },
  {
    first:"Blue",
    firstIndicator:"#0D499F",
    second:"Black",
    secondIndicator:"#000000",
  },
  {
    first:"Red",
    firstIndicator:"#B20F36",
    second:"Grey",
    secondIndicator:"#AFAFB7",
  },
  {
    first:"White",
    firstIndicator:"#FFFFFF",
    second:"Black",
    secondIndicator:"#000000",
  },
  {
    first:"Grey",
    firstIndicator:"#AFAFB7",
    second:"Black",
    secondIndicator:"#000000",
  },
  {
    first:"Blue",
    firstIndicator:"#0D499F",
    second:"Black",
    secondIndicator:"#000000",
  },
];

let selectedColor = "white"
let isSizeOpen = false
let selectedSize = ""

// open product modal
productButtons.forEach((button,index)=>{
  button.addEventListener("click",()=>{

    // shopify product image
    modalImage.src = button.dataset.productImage
    modalTitle.textContent = button.dataset.productTitle
    modalPrice.textContent = button.dataset.productPrice
    modalDescription.textContent = button.dataset.productDescription

    const colors = productColors[index]

    whiteText.textContent = color.first
    blackText.textContent = color.second

    firstColorIndicator.style.backgroundColor = colors.firstIndicator
    secondColorIndicator.style.backgroundColor = colors.secondIndicator

    modal.classlist.remove("hidden")
    modalOverlay.classlist.remove("hidden")

    document.body.style.overflow = "hidden"
  })
})

