(function (document, window) {
'use strict';

  var navbar = document.getElementById("navbar");

  window.onscroll = function() {
    if (window.scrollY > 150) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
})(document, window);