(function (document, window) {
'use strict';

  var navbar = document.getElementsByClassName("navbar")[0];
  var body = document.body;
  var stickyHeaderTop = body.offsetTop;

  window.onscroll = function() {
    if (window.scrollY > 150) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
})(document, window);