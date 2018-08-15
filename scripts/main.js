"use strict";

!function (t, e) {
  "use strict";
  var a = t.getElementById("navbar"),
      s = t.getElementById("menu-bar"),
      n = t.getElementsByClassName("main-menu")[0];e.onscroll = function () {
    e.scrollY > 150 ? a.classList.add("scrolled") : a.classList.remove("scrolled");
  }, s.onclick = function (t) {
    n.classList.contains("open") ? (s.classList.remove("is-active"), n.classList.remove("open")) : (s.classList.add("is-active"), n.classList.add("open"));
  }, [].forEach.call(t.querySelectorAll("ul.main-menu li a, h1.site-name a"), function (t) {
    t.addEventListener("click", function () {
      n.classList.contains("open") && n.classList.remove("open");
    });
  }), $("[data-scroll]").click(function (t) {
    t.preventDefault();var e = $(this),
        a = e.data("scroll");if ($(a).length > 0) {
      var s = $(a).offset().top;$("html,body").animate({ scrollTop: s }, 1e3);
    }
  });var i = $(".page-section"),
      l = $("#navbar .main-menu"),
      o = l.outerHeight();$(e).on("scroll", function () {
    var t = $(this).scrollTop();i.each(function () {
      var e = $(this).offset().top - o,
          a = e + $(this).outerHeight();t >= e && t <= a && (l.find("a").removeClass("active"), i.removeClass("active"), $(this).addClass("active"), l.find('a[href="#' + $(this).attr("id") + '"]').addClass("active"));
    });
  }), l.find("a").on("click", function () {
    var t = $(this),
        e = t.attr("href");return $("html, body").animate({ scrollTop: $(e).offset().top }, 1e3), !1;
  }), jQuery(t).ready(function () {
    jQuery(".skillbar").each(function () {
      jQuery(this).find(".skillbar-bar").animate({ width: jQuery(this).attr("data-percent") }, 6e3);
    });
  }), function () {
    for (var e = t.getElementsByClassName("match-height"), a = e.length, s = [], n = 0; n < a; n++) {
      s.push(e[n].offsetHeight);
    }for (var i = function () {
      return Math.max(s);
    }(), n = 0; n < e.length; n++) {
      e[n].style.height = i + "px";
    }
  }();
}(document, window);