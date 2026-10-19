/* CEPAR@Tufts - add or update a profile (add-profile.html).
   Prototype only: nothing is sent. In a real build, submit posts to a
   review queue that TCRC approves before the directory data is updated.
   ?mode=edit opens in "update" mode; ?mode=edit&id=<person> preselects them. */
(function () {
  "use strict";

  var C = window.CEPAR;
  var form = document.getElementById("pform");
  var MAX_TOPICS = 5;
  var MAX_PHOTO = 5 * 1024 * 1024;
  var OPEN = ["Co-investigators", "Student researchers", "New community partnerships"];

  function $(id) { return document.getElementById(id); }

  function checks(hostId, name, options) {
    var host = $(hostId);
    options.forEach(function (o) {
      var l = document.createElement("label");
      l.className = "opt opt--chip";
      var i = document.createElement("input");
      i.type = "checkbox"; i.name = name; i.value = o;
      l.appendChild(i);
      l.appendChild(document.createTextNode(" " + o));
      host.appendChild(l);
    });
  }
  checks("k-topics", "topics", C.keywords.topics);
  checks("k-methods", "methods", C.keywords.methods);
  checks("k-open", "open", OPEN);

  // Schools and the "which profile is yours" list come from the directory data.
  var schools = [];
  C.people.forEach(function (p) { if (schools.indexOf(p.school) === -1) schools.push(p.school); });
  schools.sort().forEach(function (s) {
    var o = document.createElement("option"); o.value = s; o.textContent = s; $("f-school").appendChild(o);
  });
  C.people.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (p) {
    var o = document.createElement("option"); o.value = p.id; o.textContent = p.name; $("pick").appendChild(o);
  });

  // Cap topics at five.
  $("k-topics").addEventListener("change", function () {
    var boxes = form.querySelectorAll('input[name="topics"]');
    var n = form.querySelectorAll('input[name="topics"]:checked').length;
    boxes.forEach(function (b) { b.disabled = !b.checked && n >= MAX_TOPICS; b.parentNode.classList.toggle("opt--off", b.disabled); });
  });

  // Character counter.
  function count() {
    var left = 160 - $("f-blurb").value.length;
    $("c-blurb").textContent = left + (left === 1 ? " character left" : " characters left");
  }
  $("f-blurb").addEventListener("input", count);

  // New vs. update.
  function setMode(mode) {
    $("pick-wrap").hidden = mode !== "edit";
    $("submit-btn").textContent = mode === "edit" ? "Submit changes for review" : "Submit for review";
  }
  form.querySelectorAll('input[name="mode"]').forEach(function (r) {
    r.addEventListener("change", function () { setMode(r.value); });
  });

  function setChecked(name, values) {
    form.querySelectorAll('input[name="' + name + '"]').forEach(function (b) { b.checked = values.indexOf(b.value) !== -1; });
    $("k-topics").dispatchEvent(new Event("change"));
  }

  $("pick").addEventListener("change", function () {
    var p = C.byId(this.value);
    if (!p) return;
    $("f-name").value = p.name;
    $("f-title").value = p.role;
    $("f-school").value = p.school;
    $("f-blurb").value = p.blurb.slice(0, 160);
    $("f-partners").value = p.partner;
    setChecked("topics", p.topics);
    setChecked("methods", p.methods);
    setChecked("open", p.open);
    count();
  });

  // Photo: type and size check, preview.
  $("f-photo").addEventListener("change", function () {
    var file = this.files && this.files[0];
    clearError(this);
    $("photo-preview").hidden = true;
    if (!file) return;
    if (["image/png", "image/jpeg"].indexOf(file.type) === -1) {
      showError(this, "Please choose a PNG or JPEG image.");
      this.value = ""; return;
    }
    if (file.size > MAX_PHOTO) {
      showError(this, "That image is over 5 MB. Please choose a smaller one.");
      this.value = ""; return;
    }
    $("photo-img").src = URL.createObjectURL(file);
    $("photo-preview").hidden = false;
  });
  $("photo-remove").addEventListener("click", function () {
    $("f-photo").value = ""; $("photo-preview").hidden = true; $("f-photo").focus();
  });

  // Showcase reveal.
  $("f-showcase").addEventListener("change", function () {
    $("showcase-wrap").hidden = !this.checked;
    this.setAttribute("aria-expanded", this.checked ? "true" : "false");
  });

  // Validation.
  function showError(input, msg) {
    clearError(input);
    var p = document.createElement("p");
    p.className = "ferr"; p.id = input.id + "-err"; p.textContent = msg;
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", ((input.getAttribute("aria-describedby") || "") + " " + p.id).trim());
    input.closest(".field").appendChild(p);
  }
  function clearError(input) {
    var old = $(input.id + "-err");
    if (old) old.remove();
    input.removeAttribute("aria-invalid");
    var d = (input.getAttribute("aria-describedby") || "").split(" ").filter(function (x) { return x && x !== input.id + "-err"; });
    if (d.length) input.setAttribute("aria-describedby", d.join(" ")); else input.removeAttribute("aria-describedby");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var problems = [];
    var mode = form.querySelector('input[name="mode"]:checked').value;
    [["f-name", "Enter your full name."],
     ["f-email", "Enter your Tufts email."],
     ["f-blurb", "Write one line about your work."]].forEach(function (r) {
      var el = $(r[0]); clearError(el);
      if (!el.value.trim()) { showError(el, r[1]); problems.push({ el: el, msg: r[1] }); }
    });
    var em = $("f-email");
    if (em.value.trim() && !/@(\w+\.)*tufts\.edu$/i.test(em.value.trim())) {
      var m = "Use your @tufts.edu address so TCRC can confirm it's you.";
      showError(em, m); problems.push({ el: em, msg: m });
    }
    var pick = $("pick"); clearError(pick);
    if (mode === "edit" && !pick.value) {
      showError(pick, "Choose which profile is yours."); problems.unshift({ el: pick, msg: "Choose which profile is yours." });
    }
    ["f-l1", "f-l2"].forEach(function (id) {
      var el = $(id); clearError(el);
      if (el.value.trim() && !/^https?:\/\/\S+\.\S+/.test(el.value.trim())) {
        showError(el, "Links need to start with https://"); problems.push({ el: el, msg: "Links need to start with https://" });
      }
    });

    var box = $("form-errors");
    if (problems.length) {
      box.innerHTML = "<p><b>Please fix " + (problems.length === 1 ? "1 thing" : problems.length + " things") + " before submitting:</b></p><ul>" +
        problems.map(function (p) { return '<li><a href="#' + p.el.id + '">' + C.esc(p.msg) + "</a></li>"; }).join("") + "</ul>";
      box.hidden = false;
      box.focus();
      return;
    }
    box.hidden = true;
    form.hidden = true;
    $("done-msg").textContent = mode === "edit"
      ? "TCRC will review your changes and update your profile. Your current profile stays up in the meantime."
      : "TCRC will review it and add you to the directory. If anything needs checking, they'll email you.";
    $("done").hidden = false;
    $("done").focus();
  });

  // Error summary links move focus to the field.
  $("form-errors").addEventListener("click", function (e) {
    var a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    var el = $(a.getAttribute("href").slice(1));
    if (el) el.focus();
  });

  // Arriving from "Update this profile" or ?mode=edit.
  try {
    var q = new URLSearchParams(window.location.search);
    if (q.get("mode") === "edit") {
      form.querySelector('input[name="mode"][value="edit"]').checked = true;
      setMode("edit");
      if (q.get("id") && C.byId(q.get("id"))) {
        $("pick").value = q.get("id");
        $("pick").dispatchEvent(new Event("change"));
      }
    }
  } catch (err) { /* no-op */ }
  count();
})();
