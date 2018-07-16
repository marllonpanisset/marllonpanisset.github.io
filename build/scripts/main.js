'use strict';

(function (document, window) {
  'use strict';

  var navbar = document.getElementById('navbar'),
      menuBar = document.getElementById('menu-bar'),
      mainMenu = document.getElementsByClassName('main-menu')[0];

  window.slide = new SlideNav();

  var nav = new SlideNav({
    activeClass: 'active',
    toggleButtonSelector: false,
    toggleBoxSelector: false,
    hideAfterSelect: true,
    speed: 700000,
    changeHash: false,
    navBoxToggleClass: false
  });

  window.onscroll = function () {
    if (window.scrollY > 150) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  menuBar.onclick = function (e) {

    if (mainMenu.classList.contains('open')) {
      mainMenu.classList.remove('open');
    } else {
      mainMenu.classList.add('open');
    }
  };
})(document, window);