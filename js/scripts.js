"use strict";

const mainNav = document.querySelector(".main-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  const visibility = mainNav.getAttribute("data-visible");

  if (visibility === "false") {
    mainNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    mainNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
    mainNav.setAttribute("data-visible", false);
  }
});

document.querySelector(".year").innerHTML = new Date().getFullYear();
