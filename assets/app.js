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
