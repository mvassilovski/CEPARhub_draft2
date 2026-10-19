/* CEPAR@Tufts - nav toggle.
   Same behaviour as the Neoclease site: the hamburger opens a compact
   dropdown card anchored under it, and any click outside closes it. */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("click", function (e) {
    if (!links.classList.contains("open")) return;
    if (links.contains(e.target) || toggle.contains(e.target)) return;
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("open")) {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
})();
