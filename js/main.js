"use strict";var header=document.getElementById("header"),mainNavLink=document.querySelectorAll(".main-menu .nav-link"),navbar=document.getElementById("navbar"),sectionHome=document.querySelector("#home"),sectionAbout=document.getElementById("about-me"),sectionContact=document.getElementById("contact"),networking=document.getElementsByClassName("networking"),isInViewport=function(e){e=e.getBoundingClientRect();return 0<=e.top&&0<=e.left&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)};const scrollElements=document.querySelectorAll(".js-scroll"),elementInView=(e,t=1)=>{return e.getBoundingClientRect().top<=(window.innerHeight||document.documentElement.clientHeight)/t},elementOutofView=e=>{return e.getBoundingClientRect().top>(window.innerHeight||document.documentElement.clientHeight)},displayScrollElement=e=>{e.classList.add("scrolled")},hideScrollElement=e=>{e.classList.remove("scrolled")},handleScrollAnimation=()=>{scrollElements.forEach(e=>{elementInView(e,1.25)?displayScrollElement(e):elementOutofView(e)&&hideScrollElement(e)})};function onScroll(e){isInViewport(sectionHome)?header.classList.remove("fixed-header"):header.classList.add("fixed-header")}function hamburguer(e){const t=e.target;(t.matches("button#icon-menu")||t.closest("button#icon-menu"))&&(document.getElementById("menu-mobile").classList.toggle("open"),document.getElementById("icon-menu").classList.toggle("active"))}window.addEventListener("scroll",()=>{handleScrollAnimation()}),document.addEventListener("scroll",onScroll),document.getElementById("icon-menu").addEventListener("click",hamburguer);