"use strict";

!function (e, s) {
  "use strict";
  var n = e.getElementById("navbar"),
      l = e.getElementById("menu-bar"),
      t = e.getElementsByClassName("main-menu")[0];s.slide = new SlideNav();new SlideNav({ activeClass: "active", toggleButtonSelector: !1, toggleBoxSelector: !1, hideAfterSelect: !0, speed: 50, changeHash: !1, navBoxToggleClass: !1 });s.onscroll = function () {
    s.scrollY > 150 ? n.classList.add("scrolled") : n.classList.remove("scrolled");
  }, l.onclick = function (e) {
    t.classList.contains("open") ? t.classList.remove("open") : t.classList.add("open");
  }, [].forEach.call(e.querySelectorAll("ul.main-menu li a, h1.site-name a"), function (e) {
    e.addEventListener("click", function () {
      t.classList.contains("open") && t.classList.remove("open");
    });
  });
}(document, window);