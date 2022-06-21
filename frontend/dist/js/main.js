"use strict"; 

// ## Global Vars
var header = document.getElementById('header');
var mainNavLink = document.querySelectorAll('.main-menu .nav-link');
var sectionHome = document.querySelector('#home');
var sectionAbout = document.getElementById('about-me');
var sectionContact = document.getElementById('contact');
var networking = document.getElementsByClassName('networking');


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


function onScroll(event) {
  if (isInViewport(sectionHome)) {
    header.classList.remove("fixed-header");

  } else {
    header.classList.add("fixed-header");
  }
}

document.addEventListener('scroll', onScroll);