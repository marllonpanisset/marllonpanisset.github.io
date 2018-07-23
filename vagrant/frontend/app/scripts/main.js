(function (document, window) {
'use strict';

  var navbar = document.getElementById('navbar'),
      menuBar = document.getElementById('menu-bar'),
      mainMenu = document.getElementsByClassName('main-menu')[0];

      
  window.onscroll = function() {
    if (window.scrollY > 150) {
      navbar.classList.add('scrolled');
    }

    else {
      navbar.classList.remove('scrolled');
    }
  };

  menuBar.onclick = function (e) {

    if(mainMenu.classList.contains('open')) {
      mainMenu.classList.remove('open');
    }
    
    else {
      mainMenu.classList.add('open');
    }
  };
  
  [].forEach.call(document.querySelectorAll('ul.main-menu li a, h1.site-name a'), function (el) {
    el.addEventListener('click', function () {
      if (mainMenu.classList.contains('open')) {
        mainMenu.classList.remove('open');
      }
    });
  });
  
  $('[data-scroll]').click(function (event) {
    event.preventDefault();
    var $this = $(this),
      scroll = $this.data('scroll');
    if ($(scroll).length > 0) {
      var top = $(scroll).offset().top;
      $('html,body').animate({
        scrollTop: top
      }, 1000)
    }
  });

  var sections = $('.page-section'),
      nav = $('#navbar .main-menu'),
      nav_height = nav.outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    sections.each(function () {
      var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find('a').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
      }
    });
  });

  nav.find('a').on('click', function () {
    var $el = $(this)
      , id = $el.attr('href');

    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 1000);

    return false;
  });

})(document, window);