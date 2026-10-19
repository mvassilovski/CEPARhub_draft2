/* CEPAR@Tufts - directory.
   Reads people from js/people.js. Cards are deliberately brief (name, title,
   one line) so the page stays scannable at 60-70+ members; everything else
   lives on each person's profile page (profile.html?id=...).
   Filters sit in a panel behind a "Filter" button, shopping-site style, and
   results load 12 at a time with "Show more". */
(function () {
  "use strict";

  var C = window.CEPAR;
  var PEOPLE = C.people;
  var esc = C.esc;
  var PAGE_SIZE = 12;

  var FACETS = [
    { key: "topics",      label: "Research topic" },
    { key: "methods",     label: "Method" },
    { key: "communities", label: "Community or population" },
    { key: "places",      label: "Geographic area" },
    { key: "discipline",  label: "Discipline" },
    { key: "school",      label: "School" }
  ];

  var selected = {};
  FACETS.forEach(function (f) { selected[f.key] = []; });
  var query = "";
  var sortMode = "relevance";
  var openFilter = "";
  var shown = PAGE_SIZE;

  // A "way in" link from the homepage arrives as ?open=Co-investigators
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get("open")) openFilter = params.get("open");
  } catch (err) { openFilter = ""; }

  function vals(p, key) { return Array.isArray(p[key]) ? p[key] : [p[key]]; }

  function hay(p) {
    return [p.name, p.role, p.school, p.discipline, p.project, p.partner, p.blurb]
      .concat(p.topics, p.methods, p.communities, p.places, p.interests, p.open)
      .join(" ").toLowerCase();
  }

  function terms() { return query.toLowerCase().split(/\s+/).filter(Boolean); }

  function passesExcept(p, skip) {
    for (var i = 0; i < FACETS.length; i++) {
      var key = FACETS[i].key;
      if (key === skip) continue;
      var picked = selected[key];
      if (!picked.length) continue;
      var v = vals(p, key), hit = false;
      for (var j = 0; j < picked.length; j++) { if (v.indexOf(picked[j]) !== -1) { hit = true; break; } }
      if (!hit) return false;
    }
    if (openFilter && p.open.indexOf(openFilter) === -1) return false;
    if (query) {
      var h = hay(p), t = terms(), any = false;
      for (var k = 0; k < t.length; k++) { if (h.indexOf(t[k]) !== -1) { any = true; break; } }
      if (!any) return false;
    }
    return true;
  }

  function score(p) {
    if (!query) return 0;
    var h = hay(p), n = 0;
    terms().forEach(function (t) { if (h.indexOf(t) !== -1) n++; });
    return n;
  }

  function activeCount() {
    var n = openFilter ? 1 : 0;
    FACETS.forEach(function (f) { n += selected[f.key].length; });
    return n;
  }

  /* ---------- Filter panel: built once, counts refreshed on each render ---------- */
  var boxes = []; // { key, value, input, countEl, row }

  function buildPanel() {
    var host = document.getElementById("facets");
    host.innerHTML = "";
    FACETS.forEach(function (def, idx) {
      var all = [];
      PEOPLE.forEach(function (p) {
        vals(p, def.key).forEach(function (v) { if (all.indexOf(v) === -1) all.push(v); });
      });
      all.sort();

      var group = document.createElement("details");
      group.className = "fgroup";
      if (idx === 0) group.open = true;
      var sum = document.createElement("summary");
      sum.innerHTML = esc(def.label) + '<span class="fgroup__n" data-key="' + def.key + '"></span>';
      group.appendChild(sum);

      var fs = document.createElement("fieldset");
      var lg = document.createElement("legend");
      lg.className = "sr-only";
      lg.textContent = def.label;
      fs.appendChild(lg);

      all.forEach(function (v) {
        var row = document.createElement("label");
        row.className = "fopt";
        var input = document.createElement("input");
        input.type = "checkbox";
        input.value = v;
        var txt = document.createElement("span");
        txt.textContent = v;
        var count = document.createElement("span");
        count.className = "fopt__n";
        row.appendChild(input); row.appendChild(txt); row.appendChild(count);
        input.addEventListener("change", function () {
          var arr = selected[def.key], i = arr.indexOf(v);
          if (input.checked && i === -1) arr.push(v);
          if (!input.checked && i !== -1) arr.splice(i, 1);
          shown = PAGE_SIZE;
          render();
        });
        boxes.push({ key: def.key, value: v, input: input, countEl: count, row: row });
        fs.appendChild(row);
      });
      group.appendChild(fs);
      host.appendChild(group);
    });
  }

  function refreshPanel() {
    boxes.forEach(function (b) {
      var n = 0;
      PEOPLE.forEach(function (p) { if (vals(p, b.key).indexOf(b.value) !== -1 && passesExcept(p, b.key)) n++; });
      b.input.checked = selected[b.key].indexOf(b.value) !== -1;
      b.countEl.textContent = n;
      b.row.classList.toggle("fopt--none", n === 0 && !b.input.checked);
    });
    FACETS.forEach(function (f) {
      var el = document.querySelector('.fgroup__n[data-key="' + f.key + '"]');
      if (el) el.textContent = selected[f.key].length ? " (" + selected[f.key].length + ")" : "";
    });
    var n = activeCount();
    var badge = document.getElementById("filter-n");
    badge.textContent = n ? n : "";
    badge.hidden = !n;
  }

  function renderPills() {
    var host = document.getElementById("pills");
    host.innerHTML = "";
    var items = [];
    if (openFilter) items.push({ label: "Open to: " + openFilter, remove: function () { openFilter = ""; } });
    FACETS.forEach(function (f) {
      selected[f.key].forEach(function (v) {
        items.push({ label: v, remove: function () { selected[f.key].splice(selected[f.key].indexOf(v), 1); } });
      });
    });
    host.hidden = !items.length;
    items.forEach(function (it) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "pill-x";
      b.innerHTML = esc(it.label) + '<span aria-hidden="true">×</span>';
      b.setAttribute("aria-label", "Remove filter: " + it.label);
      b.addEventListener("click", function () { it.remove(); shown = PAGE_SIZE; render(); });
      host.appendChild(b);
    });
    if (items.length > 1) {
      var c = document.createElement("button");
      c.type = "button";
      c.className = "pill-clear";
      c.textContent = "Clear all";
      c.addEventListener("click", clearAll);
      host.appendChild(c);
    }
  }

  /* ---------- Cards ---------- */
  function card(p) {
    var el = document.createElement("article");
    el.className = "pcard";
    el.innerHTML =
      '<div class="pcard__avatar" aria-hidden="true">' + esc(C.initials(p.name)) + "</div>" +
      '<div class="pcard__body">' +
        (p.sample ? '<span class="sample-tag">Sample profile</span>' : "") +
        '<h3><a href="profile.html?id=' + encodeURIComponent(p.id) + '">' + esc(p.name) + "</a></h3>" +
        '<p class="pcard__role">' + esc(p.role) + " · " + esc(p.school) + "</p>" +
        '<p class="pcard__blurb">' + esc(p.blurb) + "</p>" +
        '<span class="pcard__go" aria-hidden="true">View profile →</span>' +
      "</div>";
    return el;
  }

  function render() {
    var list = PEOPLE.filter(function (p) { return passesExcept(p, null); });

    if (sortMode === "az") {
      var surname = function (p) { return p.name.replace(/^Dr\.\s+/, "").split(" ").slice(-1)[0]; };
      list.sort(function (a, b) { return surname(a).localeCompare(surname(b)); });
    } else if (sortMode === "recent") {
      list.sort(function (a, b) { return a.confirmed < b.confirmed ? 1 : -1; });
    } else {
      list.sort(function (a, b) {
        var d = score(b) - score(a);
        return d !== 0 ? d : (a.confirmed < b.confirmed ? 1 : -1);
      });
    }

    var out = document.getElementById("results");
    out.innerHTML = "";
    if (!list.length) {
      var e = document.createElement("div");
      e.className = "empty";
      e.innerHTML = "No one matches all of those filters. <button type='button' id='clearall'>Clear everything</button> and start narrower.";
      out.appendChild(e);
      document.getElementById("clearall").addEventListener("click", clearAll);
    } else {
      list.slice(0, shown).forEach(function (p) { out.appendChild(card(p)); });
    }

    var more = document.getElementById("more");
    var left = list.length - Math.min(shown, list.length);
    more.hidden = left <= 0;
    more.textContent = "Show more (" + left + " more)";

    document.getElementById("count").innerHTML =
      "Showing <b>" + Math.min(shown, list.length) + "</b> of " + list.length +
      (list.length === PEOPLE.length && !query ? " people" : " matching people") +
      (query ? ' for "' + esc(query) + '"' : "");

    refreshPanel();
    renderPills();
  }

  function clearAll() {
    FACETS.forEach(function (f) { selected[f.key] = []; });
    query = "";
    openFilter = "";
    shown = PAGE_SIZE;
    document.getElementById("q").value = "";
    render();
  }

  /* ---------- Wiring ---------- */
  var toggle = document.getElementById("filter-toggle");
  var panel = document.getElementById("filter-panel");
  function setPanel(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  toggle.addEventListener("click", function () { setPanel(panel.hidden); });
  document.getElementById("filter-done").addEventListener("click", function () { setPanel(false); toggle.focus(); });
  document.getElementById("filter-clear").addEventListener("click", clearAll);
  panel.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { setPanel(false); toggle.focus(); }
  });

  document.getElementById("q").addEventListener("input", function (e) {
    query = e.target.value.trim();
    shown = PAGE_SIZE;
    render();
  });
  document.getElementById("sort").addEventListener("change", function (e) {
    sortMode = e.target.value;
    render();
  });
  document.getElementById("more").addEventListener("click", function () {
    var before = shown;
    shown += PAGE_SIZE;
    render();
    // Keep keyboard users in place: focus the first newly shown card.
    var links = document.querySelectorAll("#results .pcard h3 a");
    if (links[before]) links[before].focus();
  });

  buildPanel();
  render();
})();
