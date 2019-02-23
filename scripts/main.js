"use strict";
var $img = $("img"),
    navbar = document.getElementById("navbar"),
    menuBar = document.getElementById("menu-bar"),
    mainMenu = document.getElementsByClassName("main-menu")[0],
    hamburguer = document.getElementsByClassName("hamburger")[0],
    sections = $(".page-section"),
    nav = $("#navbar .main-menu"),
    nav_height = nav.outerHeight();$(document).ready(function () {
  var e = {};$img.each(function (t, a) {
    if ("none" != getComputedStyle($(this).get(0)).display) {
      var n = $(this).attr("id") ? $(this).attr("id") : "image-" + t;$(this).data("load_id", n), e[n] = !1, $(this).on("load", function () {
        var t = $(this).data("load_id");e[t] = !0;
      });
    }
  }), $(window).on("scroll", function () {
    window.scrollY > 150 ? navbar.classList.add("scrolled") : navbar.classList.remove("scrolled");
  }), menuBar.onclick = function (e) {
    e.preventDefault(), setTimeout(function () {
      hamburguer.classList.add("is-active"), mainMenu.classList.add("open"), mainMenu.classList.add("animated"), mainMenu.classList.add("fadeInDown");
    }, 100), mainMenu.classList.contains("open") && (setTimeout(function () {
      mainMenu.classList.add("fadeOutUp"), hamburguer.classList.remove("is-active");
    }, 100), setTimeout(function () {
      mainMenu.classList.remove("open"), mainMenu.classList.remove("fadeInDown"), mainMenu.classList.remove("fadeOutUp"), mainMenu.classList.remove("animated");
    }, 500));
  }, [].forEach.call(document.querySelectorAll("ul.main-menu li a, h1.site-name a"), function (e) {
    e.addEventListener("click touchstart", function () {
      mainMenu.classList.contains("open") && mainMenu.classList.remove("open"), menuBar.classList.contains("is-active") && menuBar.classList.remove("is-active");
    });
  }), $("[data-scroll]").click(function (e) {
    e.preventDefault();var t = $(this),
        a = t.data("scroll");if ($(a).length > 0) {
      var n = $(a).offset().top;$("html,body").animate({ scrollTop: n }, 1e3);
    }
  }), $(window).on("scroll", function () {
    var e = $(this).scrollTop();sections.each(function () {
      var t = $(this).offset().top - nav_height,
          a = t + $(this).outerHeight();e >= t && e <= a && (nav.find("a").removeClass("active"), sections.removeClass("active"), $(this).addClass("active"), nav.find('a[href="#' + $(this).attr("id") + '"]').addClass("active"));
    });
  }), nav.find("a").on("click", function () {
    var e = $(this),
        t = e.attr("href");return $("html, body").animate({ scrollTop: $(t).offset().top }, 1e3), !1;
  }), function () {
    for (var e = document.getElementsByClassName("match-height"), t = e.length, a = [], n = 0; n < t; n++) {
      a.push(e[n].offsetHeight);
    }for (var i = function () {
      return Math.max(a);
    }(), n = 0; n < e.length; n++) {
      e[n].style.height = i + "px";
    }
  }(), window.addEventListener("load", function () {
    AOS.init();
  });var t = function t(a) {
    var n = !0;for (var i in e) {
      e[i] || (n = !1);
    }n || a >= 20 ? ($("body").addClass("init-site"), setTimeout(function () {
      $("body").addClass("hide-loading");
    }, 700)) : setTimeout(function () {
      t(a + 1);
    }, 100);
  };t(1);
});