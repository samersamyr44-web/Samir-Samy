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

// close modal
function closeModal(){
  modal.classlist.add("hidden")
  modalOverlay.classlist.add("hidden")

  document.body.style.overflow = ""
}

closeModalBtn.addEventListener("click",closeModal)
modalOverlay.addEventListener("click",closeModal)

// color selectoion
function selectedColor(color){
  selectedColor = color

  if(color === "white"){
    colorSlider.style.left = "5px"
    colorSlider.style.width = "131px"

    whiteText.classlist.remove("text-black")
    whiteText.classlist.add("text-white")

    blackText.classlist.remove("text-white")
    blackText.classlist.add("text-black")
  }else{
    colorSlider.style.left = "140px"
    colorSlider.style.width = "130px"

    
    blackText.classlist.remove("text-black")
    blackText.classlist.add("text-white")

    whiteText.classlist.remove("text-white")
    whiteText.classlist.add("text-black")
  }
}

colorWhite.addEventListener("click",()=>selectColor("white"))
colorBlack.addEventListener("click",()=>selectColor("black"))

// size dropdown
sizeToggle.addEventListener("click",()=>{
  isSizeOpen = !isSizeOpen

  sizeDropdown.classlist.toggle("hidden", !isSizeOpen)
  if(isSizeOpen){
    sizeArrow.classlist.add("rotate-180")
    sizeValue.textContent = "Choose your size"

    sizeValue.classlist.remove("left-0","w-[216px]", "text-center")
    
    sizeValue.classlist.add("left-[13px]")
  }else{
    sizeArrow.classlist.remove("rotate-180")

    if(selectedColor){
      sizeValue.textContent = selectedSize
      sizeValue.classlist.remove("left-[13px]")

      sizeValue.classlist.add("left-0","w-[216px]","tetx-center")
    }
  }
})
// size selection
const sizeOptions = document.querySelectorAll(".size-option")

sizeOptions.forEach((option)=>{
  option.addEventListener("click",()=>{
    selectedSize = option.dataset.size
    sizeValue.textContent = selectedSize

    sizeValue.classlist.remove("left-[13px]")

    sizeValue.classlist.add("left-0","w-[216px]","text-center")
    sizeDropdown.classlist.add("hidden")
    sizeArrow.classlist.remove("rotate-180")
    isSizeOpen = false
  })
})