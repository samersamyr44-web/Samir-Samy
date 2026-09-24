// Mobile menu toggle 

const menuToggle = document.getElementById("menu-toggle")
const menuIcon  = document.getElementById("menu-icon")
const MobileMenu = document.getElementById("mobile-menu")

const openMenuUrl = menuIcon.dataset.openMenuUrl
const closeMenuUrl = menuIcon.dataset.closeMenuUrl

let isMenuOpen = false
