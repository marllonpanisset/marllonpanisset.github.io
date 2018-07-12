(function (document, window) {
'use strict';

  var navbar = document.getElementsByTagName("navbar")[0];

  window.onscroll = function() {
    if (window.scrollY > 150) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
})(document, window);