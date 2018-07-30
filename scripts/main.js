"use strict";

!function (t, e) {
  "use strict";
  var a = t.getElementById("navbar"),
      n = t.getElementById("menu-bar"),
      s = t.getElementsByClassName("main-menu")[0];e.onscroll = function () {
    e.scrollY > 150 ? a.classList.add("scrolled") : a.classList.remove("scrolled");
  }, n.onclick = function (t) {
    s.classList.contains("open") ? s.classList.remove("open") : s.classList.add("open");
  }, [].forEach.call(t.querySelectorAll("ul.main-menu li a, h1.site-name a"), function (t) {
    t.addEventListener("click", function () {
      s.classList.contains("open") && s.classList.remove("open");
    });
  }), $("[data-scroll]").click(function (t) {
    t.preventDefault();var e = $(this),
        a = e.data("scroll");if ($(a).length > 0) {
      var n = $(a).offset().top;$("html,body").animate({ scrollTop: n }, 1e3);
    }
  });var i = $(".page-section"),
      o = $("#navbar .main-menu"),
      l = o.outerHeight();$(e).on("scroll", function () {
    var t = $(this).scrollTop();i.each(function () {
      var e = $(this).offset().top - l,
          a = e + $(this).outerHeight();t >= e && t <= a && (o.find("a").removeClass("active"), i.removeClass("active"), $(this).addClass("active"), o.find('a[href="#' + $(this).attr("id") + '"]').addClass("active"));
    });
  }), o.find("a").on("click", function () {
    var t = $(this),
        e = t.attr("href");return $("html, body").animate({ scrollTop: $(e).offset().top }, 1e3), !1;
  }), jQuery(t).ready(function () {
    jQuery(".skillbar").each(function () {
      jQuery(this).find(".skillbar-bar").animate({ width: jQuery(this).attr("data-percent") }, 6e3);
    });
  });
}(document, window);