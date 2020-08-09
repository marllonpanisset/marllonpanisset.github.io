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

//formspree
window.addEventListener('DOMContentLoaded', function() {
	// get the form elements defined in your form HTML above
	var form = document.getElementById('form');
	var formName = document.getElementById('form-name');
	var formEmail = document.getElementById('form-email');
	var formWhatsapp = document.getElementById('form-whatsapp');
	var formMessage = document.getElementById('form-message');
	var formButton = document.getElementById('form-submit');
	var formStatus = document.getElementById('form-status');

	// Success and Error functions for after the form is submitted
	
	function success() {
		form.reset();
		formButton.style = 'display: none ';
		formStatus.innerHTML = 'Obrigado, vou analisar seu e-mail e responder.';
	}

	//JS Validate
	$('#form-name').blur(function() {
		if( !$(this).val() ) {
			$(this).next().addClass('error');
		} else {
			$(this).next().removeClass('error');
		}
	});

	$('#form-whatsapp').blur(function() {
		if( !$(this).val() ) {
			$(this).next().addClass('error');
		} else {
			$(this).next().removeClass('error');
		}
	});

	$('#form-email').blur(function() {
		if( !$(this).val() ) {
			$(this).next().addClass('error');
		} else {
			$(this).next().removeClass('error');
		}
	});

	$('#form-message').blur(function() {
		if( !$(this).val() ) {
			$(this).next().addClass('error');
		} else {
			$(this).next().removeClass('error');
		}
	});

	function error() {
		formStatus.innerHTML = 'Atenção!, todos os dados são obrigatórios.';
	}

	// handle the form submission event

	form.addEventListener('submit', function(ev) {
		ev.preventDefault();
		var data = new FormData(form);
		ajax(form.method, form.action, data, success, error);
	});
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.onreadystatechange = function() {
	if (xhr.readyState !== XMLHttpRequest.DONE) return;
		if (xhr.status === 200) {
			success(xhr.response, xhr.responseType);
		} else {
			error(xhr.status, xhr.response, xhr.responseType);
		}
	};
	xhr.send(data);
}

$(document).ready(function () {
	//InputMask SP CEL
	var SPMaskBehavior = function (val) {
		return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	  },
	  spOptions = {
		onKeyPress: function(val, e, field, options) {
			field.mask(SPMaskBehavior.apply({}, arguments), options);
		  }
	  };
  
	  $('#form-whatsapp').mask(SPMaskBehavior, spOptions);

	var willLoad = {};
	
	$('#webdoor').on('load resize', function() {
		var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		$('#header').css('height', vh);
	});	
	
	$img.each(function(index, item){
		var style = getComputedStyle($(this).get(0));
		var webDoor = $('#webdoor');
		
		if (style.display != 'none' && !webDoor.complete || style.display != 'none' && webDoor.naturalWidth === 0) {
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

	$('ul.main-menu li a').click(function(e) {
		console.log($(e.target).parent().parent());
		if ($(e.target).parent().parent().hasClass('open')) {
			$('ul.main-menu').removeClass('open');
			$('#menu-bar').removeClass('is-active');
		}	
	});
	
	$('a[href*="#"]').click(function(event) {
		var href = $(this.hash);
	
		if (href.length) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: href.offset().top - 49
			}, 800, function() {
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
