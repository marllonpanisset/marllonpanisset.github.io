(function (document, window) {
'use strict';

  window.slide = new SlideNav();
  
  var nav = new SlideNav({
    activeClass: "active",
    toggleButtonSelector: false,
    toggleBoxSelector: false,
    hideAfterSelect: true,
    speed: 700000,
    changeHash: false,
    navBoxToggleClass: false
  });

  var navbar = document.getElementById("navbar");

  window.onscroll = function() {
    if (window.scrollY > 150) {
      navbar.classList.add("scrolled");
    }
    
    else {
      navbar.classList.remove("scrolled");
    }
  };
})(document, window);