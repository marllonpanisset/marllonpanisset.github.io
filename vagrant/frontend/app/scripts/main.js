'use strict';

//Variaveis Globais
var $img = $('img');
var navbar = document.getElementById('navbar');
var menuBar = document.getElementById('menu-bar');
var mainMenu = document.getElementsByClassName('main-menu')[0];
var hamburguer = document.getElementsByClassName('hamburger')[0];
var sections = $('.page-section');
var nav = $('#navbar .main-menu');
var nav_height = nav.outerHeight();

$(document).ready(function () {
	var willLoad = {};

	$img.each(function(index, item){
		var style = getComputedStyle($(this).get(0));
		if (style.display != 'none') {
			var id = $(this).attr('id') ? $(this).attr('id'): 'image-'+index;
			$(this).data('load_id', id);
			willLoad[id] = false;
			$(this).on('load',function(){
				var id = $(this).data('load_id');
				willLoad[id] = true;
			});
		}
	});

	$(window).on('scroll', function() {

		if (window.scrollY > 150) {
			navbar.classList.add('scrolled');
		} else {
			navbar.classList.remove('scrolled');
		}
	});	

	menuBar.onclick = function (e) {
		e.preventDefault();

		setTimeout(function(){
			hamburguer.classList.add('is-active');
			mainMenu.classList.add('open');
			mainMenu.classList.add('animated');
			mainMenu.classList.add('fadeInDown');
		}, 100);

		if(mainMenu.classList.contains('open')) {
			setTimeout(function(){
				mainMenu.classList.add('fadeOutUp');
				hamburguer.classList.remove('is-active');
			}, 100);

			setTimeout(function(){
				mainMenu.classList.remove('open');
				mainMenu.classList.remove('fadeInDown');
				mainMenu.classList.remove('fadeOutUp');
				mainMenu.classList.remove('animated');
			}, 500);
		}
	};

	[].forEach.call(document.querySelectorAll('ul.main-menu li a, h1.site-name a'), function (el) {

		el.addEventListener('click touchstart', function () {

			if (mainMenu.classList.contains('open')) {
				mainMenu.classList.remove('open');
			}

			if (menuBar.classList.contains('is-active')) {
				menuBar.classList.remove('is-active');
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

	(function matchHeight() {
		var getDivs = document.getElementsByClassName('match-height');
		var arrayLength = getDivs.length;
		var heights = [];

		for (var i = 0; i < arrayLength; i++) {
			heights.push(getDivs[i].offsetHeight);
		}

		function getHighest() {
			return Math.max(heights);
		}

		var tallest = getHighest();
		for (var i = 0; i < getDivs.length; i++) {
			getDivs[i].style.height = tallest + 'px';
		}
	})();

	
	window.addEventListener('load', function(){
		AOS.init();
    });

	//removeLoad
    var removeLoad = function(time) {
		var done = true;

        for(var key in willLoad){
            if(!willLoad[key]){
                done = false;
            }
		}

        if (done || time >= 20) {
            $('body').addClass('init-site');
            setTimeout(function () {
                $('body').addClass('hide-loading');
            }, 700);
        } else {
            setTimeout(function () {
                removeLoad(time+1);
            }, 100);
        }
	}

    removeLoad(1);
});
