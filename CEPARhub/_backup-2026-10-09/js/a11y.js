/* CEPAR@Tufts - display settings.

   Four switches, each writing one attribute onto <html>. The stylesheet
   does the rest: every setting is expressed as a token override, so this
   file never touches a colour, a size or a rule.

     larger text     data-text="large"
     high contrast   data-contrast="high"
     reduce motion   data-motion="reduce"
     dark mode       data-theme="dark"

   Choices persist in localStorage because this is a multi-page site.
   Without it, turning on larger text and then opening the directory
   would silently undo the thing the reader just asked for, which is
   worse than not offering the control. A matching two-line script in
   each <head> applies the saved attributes before first paint; if it
   ran here instead, every page load would flash the light theme.

   The buttons carry role="switch" and aria-checked rather than being
   checkboxes, because they act immediately on the page around them.
   There is nothing to submit, and nothing to confirm. */
(function () {
  "use strict";

  var KEY = "cepar-display";

  var SETTINGS = [
    { id: "text",     attr: "data-text",     on: "large" },
    { id: "contrast", attr: "data-contrast", on: "high" },
    { id: "motion",   attr: "data-motion",   on: "reduce" },
    { id: "theme",    attr: "data-theme",    on: "dark" }
  ];

  var root = document.documentElement;

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch (err) {
      return {};
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (err) {
      /* Private browsing, a full quota, or storage switched off. The
         settings still work for this page; they just stop following the
         reader to the next one. Nothing here is worth an error for. */
    }
  }

  function apply(state) {
    SETTINGS.forEach(function (s) {
      if (state[s.id]) {
        root.setAttribute(s.attr, s.on);
      } else {
        root.removeAttribute(s.attr);
      }
    });
  }

  var state = load();
  apply(state);

  /* Two triggers, one panel: the gear at the right of the header above
     1040px, and a "Settings" row at the foot of the collapsed menu below
     it. Only one is ever visible, but both are always in the document,
     so every handler below works on the list rather than on one button. */
  var triggers = Array.prototype.slice.call(
    document.querySelectorAll(".nav__gear, .nav__settings")
  );
  var panel = document.querySelector(".a11y__panel");
  if (!triggers.length || !panel) return;

  var navLinks = document.querySelector(".nav__links");
  var navToggle = document.querySelector(".nav__toggle");
  var lastTrigger = triggers[0];

  var rows = Array.prototype.slice.call(panel.querySelectorAll("[data-setting]"));

  function paint() {
    rows.forEach(function (row) {
      row.setAttribute("aria-checked", state[row.getAttribute("data-setting")] ? "true" : "false");
    });
  }

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove("open");
    if (navToggle) {
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  }

  function open(yes) {
    panel.hidden = !yes;
    triggers.forEach(function (t) {
      t.setAttribute("aria-expanded", yes ? "true" : "false");
    });
    /* On a narrow screen the panel lands exactly where the menu card is.
       Leaving both open would stack one on the other, so opening settings
       closes the menu it was launched from. */
    if (yes) closeMenu();
  }

  paint();
  open(false);

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      lastTrigger = trigger;
      open(panel.hidden);
      if (!panel.hidden) rows[0].focus();
    });
  });

  /* The hamburger stops its own click from reaching the document, so the
     outside-click handler below never sees it. Without this, opening the
     menu while settings is showing would leave both on screen. */
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      open(false);
    });
  }

  rows.forEach(function (row) {
    row.addEventListener("click", function () {
      var id = row.getAttribute("data-setting");
      state[id] = !state[id];
      apply(state);
      save(state);
      paint();
    });
  });

  var reset = panel.querySelector(".a11y__reset");
  if (reset) {
    reset.addEventListener("click", function () {
      state = {};
      apply(state);
      save(state);
      paint();
    });
  }

  /* Clicking away closes the panel, the same gesture the nav dropdown
     already uses. Escape returns focus to whichever control opened it, so
     a keyboard reader is not dropped at the top of the document and does
     not land on the gear when the gear is the hidden one. */
  document.addEventListener("click", function (e) {
    if (panel.hidden) return;
    if (panel.contains(e.target)) return;
    if (triggers.some(function (t) { return t.contains(e.target); })) return;
    open(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) {
      open(false);
      lastTrigger.focus();
    }
  });
})();
