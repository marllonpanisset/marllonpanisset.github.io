"use strict";

!function (t, e) {
  "use strict";
  var a = t.getElementById("navbar"),
      s = t.getElementById("menu-bar"),
      n = t.getElementsByClassName("main-menu")[0];e.onscroll = function () {
    e.scrollY > 150 ? a.classList.add("scrolled") : a.classList.remove("scrolled");
  }, s.onclick = function (t) {
    n.classList.contains("open") ? n.classList.remove("open") : n.classList.add("open");
  }, [].forEach.call(t.querySelectorAll("ul.main-menu li a, h1.site-name a"), function (t) {
    t.addEventListener("click", function () {
      n.classList.contains("open") && n.classList.remove("open");
    });
  }), $("[data-scroll]").click(function (t) {
    t.preventDefault();var e = $(this),
        a = e.data("scroll");if ($(a).length > 0) {
      var s = $(a).offset().top;$("html,body").animate({ scrollTop: s }, 1e3);
    }
  });var o = $(".page-section"),
      i = $("#navbar .main-menu"),
      l = i.outerHeight();$(e).on("scroll", function () {
    var t = $(this).scrollTop();o.each(function () {
      var e = $(this).offset().top - l,
          a = e + $(this).outerHeight();t >= e && t <= a && (i.find("a").removeClass("active"), o.removeClass("active"), $(this).addClass("active"), i.find('a[href="#' + $(this).attr("id") + '"]').addClass("active"));
    });
  }), i.find("a").on("click", function () {
    var t = $(this),
        e = t.attr("href");return $("html, body").animate({ scrollTop: $(e).offset().top }, 1e3), !1;
  });
}(document, window);