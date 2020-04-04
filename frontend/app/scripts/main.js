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

	$("#webdoor").on("load resize", function() {
		var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		$("#header").css("height", vh);
	});	
	
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

	menuBar.onclick = function (e) {
		e.preventDefault();

		setTimeout(function(){
			hamburguer.classList.add('is-active');
			mainMenu.classList.add('open');
			mainMenu.classList.add('animated');
			mainMenu.classList.add('fadeInLeft');
		}, 100);

		if(mainMenu.classList.contains('open')) {
			setTimeout(function(){
				mainMenu.classList.add('fadeOutRight');
				hamburguer.classList.remove('is-active');
			}, 100);

			setTimeout(function(){
				mainMenu.classList.remove('open');
				mainMenu.classList.remove('fadeInLeft');
				mainMenu.classList.remove('fadeOutRight');
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

	$('a[href*="#"]').click(function(event) {

		var href = $(this.hash);
	
		if (href.length) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: href.offset().top - 49
			}, 1250, function() {
				if (history.pushState) {
					history.pushState(null, null, 'index.html#' + href.attr('id'));
				} else {
					location.hash = href.attr('id');
				}
			});     
		}
	});

	$(window).on('scroll', function () {
		if (window.scrollY > 150) {
			navbar.classList.add('scrolled');
		} else {
			navbar.classList.remove('scrolled');
		}

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

	//equalHeight
	(function () {
		equalHeight(false);
	})();
	  
	window.onresize = function(){
		equalHeight(true);
	}
	
	function equalHeight(resize) {
		var elements = document.getElementsByClassName('equalHeight'),
			allHeights = [],
			i = 0;
		if(resize === true){
			for(i = 0; i < elements.length; i++){
				elements[i].style.height = 'auto';
			}
		}
		for(i = 0; i < elements.length; i++){
			var elementHeight = elements[i].clientHeight;
			allHeights.push(elementHeight);
		}
		for(i = 0; i < elements.length; i++){
			elements[i].style.height = Math.max.apply( Math, allHeights) + 'px';
			// Optional: Add show class to prevent FOUC
			if(resize === false){
				elements[i].className = elements[i].className + ' show';
			}
		}
	}
	
	//removeLoad
    var removeLoad = function(time) {
		var done = true;
		
        for(var key in willLoad){
			if(!willLoad[key]){
                done = false;
            }
		}

        if (done === true || time >= 20) {
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

	//Animate On Scroll
	window.addEventListener('load', function(){
		AOS.init({
			once: true
		});
	});
});
