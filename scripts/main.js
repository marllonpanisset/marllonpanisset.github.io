"use strict";

!function (t, e) {
  "use strict";
  var s = t.getElementById("navbar"),
      a = t.getElementById("menu-bar"),
      i = t.getElementsByClassName("main-menu")[0],
      n = t.getElementsByClassName("hamburger")[0];e.onscroll = function () {
    e.scrollY > 150 ? s.classList.add("scrolled") : s.classList.remove("scrolled");
  }, a.onclick = function (t) {
    t.preventDefault(), setTimeout(function () {
      n.classList.add("is-active"), i.classList.add("open"), i.classList.add("animated"), i.classList.add("fadeInDown");
    }, 100), i.classList.contains("open") && (setTimeout(function () {
      i.classList.add("fadeOutUp"), n.classList.remove("is-active");
    }, 100), setTimeout(function () {
      i.classList.remove("open"), i.classList.remove("fadeInDown"), i.classList.remove("fadeOutUp"), i.classList.remove("animated");
    }, 500));
  }, [].forEach.call(t.querySelectorAll("ul.main-menu li a, h1.site-name a"), function (t) {
    t.addEventListener("click", function () {
      i.classList.contains("open") && i.classList.remove("open"), a.classList.contains("is-active") && a.classList.remove("is-active");
    });
  }), $("[data-scroll]").click(function (t) {
    t.preventDefault();var e = $(this),
        s = e.data("scroll");if ($(s).length > 0) {
      var a = $(s).offset().top;$("html,body").animate({ scrollTop: a }, 1e3);
    }
  });var o = $(".page-section"),
      c = $("#navbar .main-menu"),
      l = c.outerHeight();$(e).on("scroll", function () {
    var t = $(this).scrollTop();o.each(function () {
      var e = $(this).offset().top - l,
          s = e + $(this).outerHeight();t >= e && t <= s && (c.find("a").removeClass("active"), o.removeClass("active"), $(this).addClass("active"), c.find('a[href="#' + $(this).attr("id") + '"]').addClass("active"));
    });
  }), c.find("a").on("click", function () {
    var t = $(this),
        e = t.attr("href");return $("html, body").animate({ scrollTop: $(e).offset().top }, 1e3), !1;
  }), jQuery(t).ready(function () {
    jQuery(".skillbar").each(function () {
      jQuery(this).find(".skillbar-bar").animate({ width: jQuery(this).attr("data-percent") }, 6e3);
    });
  }), function () {
    for (var e = t.getElementsByClassName("match-height"), s = e.length, a = [], i = 0; i < s; i++) {
      a.push(e[i].offsetHeight);
    }for (var n = function () {
      return Math.max(a);
    }(), i = 0; i < e.length; i++) {
      e[i].style.height = n + "px";
    }
  }();
}(document, window);