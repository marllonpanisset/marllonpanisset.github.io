"use strict";

!function (t, e) {
  "use strict";
  var a = t.getElementById("navbar"),
      s = t.getElementById("menu-bar"),
      i = t.getElementsByClassName("main-menu")[0];e.onscroll = function () {
    e.scrollY > 150 ? a.classList.add("scrolled") : a.classList.remove("scrolled");
  }, s.onclick = function (t) {
    i.classList.contains("open") ? (s.classList.remove("is-active"), i.classList.remove("open")) : (s.classList.add("is-active"), i.classList.add("open"));
  }, [].forEach.call(t.querySelectorAll("ul.main-menu li a, h1.site-name a"), function (t) {
    t.addEventListener("click", function () {
      i.classList.contains("open") && i.classList.remove("open"), s.classList.contains("is-active") && s.classList.remove("is-active");
    });
  }), $("[data-scroll]").click(function (t) {
    t.preventDefault();var e = $(this),
        a = e.data("scroll");if ($(a).length > 0) {
      var s = $(a).offset().top;$("html,body").animate({ scrollTop: s }, 1e3);
    }
  });var n = $(".page-section"),
      c = $("#navbar .main-menu"),
      l = c.outerHeight();$(e).on("scroll", function () {
    var t = $(this).scrollTop();n.each(function () {
      var e = $(this).offset().top - l,
          a = e + $(this).outerHeight();t >= e && t <= a && (c.find("a").removeClass("active"), n.removeClass("active"), $(this).addClass("active"), c.find('a[href="#' + $(this).attr("id") + '"]').addClass("active"));
    });
  }), c.find("a").on("click", function () {
    var t = $(this),
        e = t.attr("href");return $("html, body").animate({ scrollTop: $(e).offset().top }, 1e3), !1;
  }), jQuery(t).ready(function () {
    jQuery(".skillbar").each(function () {
      jQuery(this).find(".skillbar-bar").animate({ width: jQuery(this).attr("data-percent") }, 6e3);
    });
  }), function () {
    for (var e = t.getElementsByClassName("match-height"), a = e.length, s = [], i = 0; i < a; i++) {
      s.push(e[i].offsetHeight);
    }for (var n = function () {
      return Math.max(s);
    }(), i = 0; i < e.length; i++) {
      e[i].style.height = n + "px";
    }
  }();
}(document, window);