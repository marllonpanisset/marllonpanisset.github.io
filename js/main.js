// Autor: Marllon Panisset

"use strict"; 

// ## Global Vars
var header = document.getElementById('header');
var sectionHome = document.querySelector('#home');

// ## isInViewport
var isInViewport = function (elem) {
	var distance = elem.getBoundingClientRect();
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

// animate on Scroll 
const scrollElements = document.querySelectorAll(".js-scroll");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});

// NAVBAR 
function onScroll(event) {
  if (isInViewport(sectionHome)) {
    header.classList.remove("fixed-header");

  } else {
    header.classList.add("fixed-header");
  }
}

document.addEventListener('scroll', onScroll);

document.getElementById('icon-menu').addEventListener('click', hamburguer)

function hamburguer(e) {
  const tgt = e.target;
  if (tgt.matches("button#icon-menu") || tgt.closest("button#icon-menu")) {
    document.getElementById('menu-mobile').classList.toggle('open')
    document.getElementById('icon-menu').classList.toggle('active')
  }
}


document.addEventListener(
  'DOMContentLoaded',
  function() {
    const links = document.querySelectorAll('.nav-link');

    for (const link of links) {
      link.addEventListener('click', function(event) {
        if (event.target.matches('a.nav-link') || event.target.matches('#navbar a.logo')) {
          document.getElementById('icon-menu').classList.remove('active');
          document.getElementById('menu-mobile').classList.remove('open');
        }
      })
    }
  }
);
