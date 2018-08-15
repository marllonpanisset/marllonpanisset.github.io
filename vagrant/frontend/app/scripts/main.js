(function (document, window) {
'use strict';

  var navbar = document.getElementById('navbar');
  var menuBar = document.getElementById('menu-bar');
  var mainMenu = document.getElementsByClassName('main-menu')[0];
      
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
      menuBar.classList.remove('is-active');
      mainMenu.classList.remove('open');
    }

    else {
      menuBar.classList.add('is-active');
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
    var $this = $(this);
    var scroll = $this.data('scroll');

    if ($(scroll).length > 0) {
      var top = $(scroll).offset().top;

      $('html,body').animate({
        scrollTop: top
      }, 1000)
    }
  });

  var sections = $('.page-section');
  var nav = $('#navbar .main-menu');
  var nav_height = nav.outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    sections.each(function () {
      var top = $(this).offset().top - nav_height;
      var bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find('a').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
      }
    });
  });

  nav.find('a').on('click', function () {
    var $el = $(this);
    var id = $el.attr('href');

    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 1000);

    return false;
  });

  jQuery(document).ready(function(){
    jQuery('.skillbar').each(function(){
      jQuery(this).find('.skillbar-bar').animate({
        width:jQuery(this).attr('data-percent')
      },6000);
    });
  });

  (function matchHeight() {
    //Grab divs with the class name 'match-height'
    var getDivs = document.getElementsByClassName('match-height');

    //Find out how my divs there are with the class 'match-height' 
    var arrayLength = getDivs.length;
    var heights = [];

    //Create a loop that iterates through the getDivs variable and pushes the heights of the divs into an empty array
    for (var i = 0; i < arrayLength; i++) {
      heights.push(getDivs[i].offsetHeight);
    }

    //Find the largest of the divs
    function getHighest() {
      return Math.max(heights);
    }

    //Set a variable equal to the tallest div
    var tallest = getHighest();

    //Iterate through getDivs and set all their height style equal to the tallest variable
    for (var i = 0; i < getDivs.length; i++) {
      getDivs[i].style.height = tallest + 'px';
    }
  })();


})(document, window);