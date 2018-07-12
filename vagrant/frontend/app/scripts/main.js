(function (document, window) {
'use strict';

  window.onload = function() {
    var navbar = document.getElementsByClassName("navbar");
    var body = document.body;
    var stickyHeaderTop = body.offsetTop;
    
    window.onscroll = function() {
      if (window.scrollY > stickyHeaderTop) {
        document.getElementsByClassName("navbar").setAttribube("class","fixed");
      } else {
        document.getElementsByClassName("navbar").classList.remove("fixed");
      }
    };
  };
})(document, window);