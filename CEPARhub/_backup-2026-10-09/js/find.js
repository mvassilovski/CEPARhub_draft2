/* CEPAR@Tufts - people finder.
   Sample records only. In a real build this array is replaced by a
   generated data file; nothing else in this script changes.

   Confirmation dates are stored as `daysAgo` rather than fixed dates on
   purpose. Hardcoded dates rot: a profile written as fresh silently ages
   into "needs review" between building the prototype and demoing it, and
   the freshness device stops demonstrating what it was built to
   demonstrate. Offsets keep the spread identical whenever this is opened.
   A real build stores real dates, because there the ageing is the point. */
(function () {
  "use strict";

  var PEOPLE = [
    { name: "Dr. Naomi Bertrand", role: "Associate Professor, Urban & Environmental Policy", school: "Arts & Sciences",
      discipline: "Urban & Environmental Policy",
      topics: ["Housing & displacement", "Local governance"], methods: ["Participatory mapping", "Longitudinal interviews"],
      communities: ["Tenant organizations", "Immigrant communities"], places: ["Somerville", "Medford"],
      project: "Rent stabilization and resident decision-making", partner: "Somerville Tenants United",
      interests: ["Tenant-governed data cooperatives", "Eviction early-warning systems"],
      open: ["Co-investigators", "Student researchers"], daysAgo: 35 },

    { name: "Dr. Idris Oyelaran", role: "Assistant Professor, Nutrition Science & Policy", school: "Friedman",
      discipline: "Nutrition Science & Policy",
      topics: ["Food access", "Chronic disease prevention"], methods: ["Community-based participatory research", "Randomized trials"],
      communities: ["Faith congregations", "Older adults"], places: ["Boston, Chinatown", "Boston, Roxbury"],
      project: "Corner-store fresh produce pilot, year three", partner: "Roxbury Food Coalition",
      interests: ["Food-as-medicine referral models", "SNAP incentive design"],
      open: ["New community partnerships", "Co-investigators"], daysAgo: 78 },

    { name: "Dr. Priya Raghunathan", role: "Professor, Child Study & Human Development", school: "Arts & Sciences",
      discipline: "Child Study & Human Development",
      topics: ["Early childhood", "Family support systems"], methods: ["Participatory evaluation", "Mixed methods"],
      communities: ["Public school families", "Immigrant communities"], places: ["Medford", "Malden"],
      project: "Co-designed family navigation program", partner: "Medford Family Network",
      interests: ["Multilingual family assessment", "Kindergarten transition supports"],
      open: ["Student researchers"], daysAgo: 121 },

    { name: "Dr. Thomas Achterberg", role: "Research Associate Professor, Public Health", school: "Medicine",
      discipline: "Public Health",
      topics: ["Substance use", "Health services access"], methods: ["Community-based participatory research", "Qualitative synthesis"],
      communities: ["People with lived experience", "Peer recovery workers"], places: ["Boston, Dorchester"],
      project: "Peer navigator role design with a community advisory board", partner: "Withheld at partner's request",
      interests: ["Harm reduction outside cities", "Peer workforce retention"],
      open: ["Co-investigators"], daysAgo: 219 },

    { name: "Dr. Lucía Menéndez-Kroll", role: "Associate Professor, Civil & Environmental Engineering", school: "Engineering",
      discipline: "Civil & Environmental Engineering",
      topics: ["Water quality", "Climate adaptation"], methods: ["Participatory sensing", "Co-design workshops"],
      communities: ["Watershed associations", "Environmental justice groups"], places: ["Mystic River watershed", "Everett"],
      project: "Resident-run water sampling network", partner: "Mystic River Watershed Association",
      interests: ["Heat island co-monitoring", "Low-cost sensor validation"],
      open: ["New community partnerships", "Student researchers", "Co-investigators"], daysAgo: 17 },

    { name: "Dr. Marcus Oyelowo-Finn", role: "Senior Lecturer, Sociology", school: "Arts & Sciences",
      discipline: "Sociology",
      topics: ["Policing & public safety", "Local governance"], methods: ["Longitudinal interviews", "Participatory analysis"],
      communities: ["Youth organizations", "Formerly incarcerated residents"], places: ["Boston, Dorchester", "Chelsea"],
      project: "Youth-led study of neighborhood safety decisions", partner: "Chelsea Youth Collaborative",
      interests: ["Participatory budgeting", "Reentry support design"],
      open: ["Student researchers"], daysAgo: 318 },

    { name: "Dr. Hanne Lindqvist", role: "Professor, Nutrition Science & Policy", school: "Friedman",
      discipline: "Nutrition Science & Policy",
      topics: ["Food access", "Policy evaluation"], methods: ["Participatory evaluation", "Economic modeling"],
      communities: ["School districts", "Public school families"], places: ["Medford", "Somerville"],
      project: "Universal school meals, what changed for families", partner: "Medford Public Schools",
      interests: ["School food procurement", "Cafeteria labor conditions"],
      open: ["Co-investigators"], daysAgo: 92 },

    { name: "Dr. Samuel Achebe-Royce", role: "Assistant Professor, International Affairs", school: "Fletcher",
      discipline: "International Affairs",
      topics: ["Migration & resettlement", "Local governance"], methods: ["Co-design workshops", "Qualitative synthesis"],
      communities: ["Immigrant communities", "Resettlement agencies"], places: ["Lynn", "Chelsea"],
      project: "Resettlement services mapped by the people using them", partner: "Lynn Newcomer Center",
      interests: ["Foreign credential recognition", "Diaspora-led evaluation"],
      open: ["New community partnerships", "Student researchers"], daysAgo: 144 },

    { name: "Dr. Rosalind Whitfield-Nakamura", role: "Professor, Occupational Therapy", school: "Medicine",
      discipline: "Occupational Therapy",
      topics: ["Disability & access", "Aging in place"], methods: ["Co-design workshops", "Participatory evaluation"],
      communities: ["Older adults", "Disability advocacy groups"], places: ["Medford", "Boston, Roxbury"],
      project: "Home modification decisions made with, not for, residents", partner: "Greater Boston Aging Services",
      interests: ["Assistive technology co-design", "Caregiver burden measures"],
      open: ["Co-investigators", "Student researchers"], daysAgo: 20 },

    { name: "Dr. Elias Varga", role: "Associate Professor, Veterinary Medicine", school: "Cummings",
      discipline: "Veterinary Medicine",
      topics: ["One Health", "Animal & community wellbeing"], methods: ["Community-based participatory research", "Field surveys"],
      communities: ["Rural households", "Farm workers"], places: ["Grafton", "Central Massachusetts"],
      project: "Veterinary access in under-served rural households", partner: "Worcester County Farm Alliance",
      interests: ["Mobile veterinary clinics", "Zoonotic risk communication"],
      open: ["New community partnerships"], daysAgo: 421 },

    { name: "Dr. Amara Nnadi-Holt", role: "Assistant Professor, Community Health", school: "Arts & Sciences",
      discipline: "Community Health",
      topics: ["Maternal health", "Health services access"], methods: ["Community-based participatory research", "Photovoice"],
      communities: ["Birth workers", "Immigrant communities"], places: ["Boston, Dorchester", "Everett"],
      project: "Doula-led study of birth experience and trust", partner: "Neighborhood Birth Workers Alliance",
      interests: ["Postpartum continuity of care", "Midwifery workforce pathways"],
      open: ["New community partnerships", "Co-investigators", "Student researchers"], daysAgo: 10 },

    { name: "Dr. Jonathan Feretti", role: "Professor of the Practice, Urban & Environmental Policy", school: "Arts & Sciences",
      discipline: "Urban & Environmental Policy",
      topics: ["Transit & mobility", "Climate adaptation"], methods: ["Participatory mapping", "Co-design workshops"],
      communities: ["Transit riders", "Environmental justice groups"], places: ["Somerville", "Everett", "Chelsea"],
      project: "Bus network redesign reviewed by the riders who depend on it", partner: "Riders for Better Transit",
      interests: ["Fare policy equity", "Paratransit redesign"],
      open: ["Student researchers"], daysAgo: 463 },

    { name: "Dr. Keiko Marchetti-Sasaki", role: "Research Assistant Professor, Psychology", school: "Arts & Sciences",
      discipline: "Psychology",
      topics: ["Mental health services", "Youth development"], methods: ["Participatory evaluation", "Mixed methods"],
      communities: ["Youth organizations", "Public school families"], places: ["Malden", "Medford"],
      project: "What a school counselling program looks like to students", partner: "Malden Youth Alliance",
      interests: ["School-based crisis response", "Peer mentoring outcomes"],
      open: ["Co-investigators", "Student researchers"], daysAgo: 187 },

    { name: "Dr. Owen Duraisamy", role: "Associate Professor, Data Science", school: "Engineering",
      discipline: "Data Science",
      topics: ["Data ethics", "Local governance"], methods: ["Co-design workshops", "Participatory analysis"],
      communities: ["Municipal staff", "Community data groups"], places: ["Somerville", "Chelsea"],
      project: "Who gets to see municipal data, and who decides", partner: "City of Somerville, Office of Data",
      interests: ["Algorithmic impact assessment", "Community data trusts"],
      open: ["Co-investigators", "New community partnerships"], daysAgo: 56 }
  ];

  /* Facets are the dimensions with a shared, finite vocabulary, the ones
     where seeing every value is useful rather than overwhelming. Future
     research interests are deliberately NOT a facet: they are long-tail and
     idiosyncratic, so a chip list of them would be mostly chips of one. They
     are searchable and shown on the record instead. */
  var FACETS = [
    { key: "topics",      label: "Research topic" },
    { key: "methods",     label: "Method" },
    { key: "communities", label: "Community or population" },
    { key: "places",      label: "Geographic area" },
    { key: "discipline",  label: "Discipline" },
    { key: "school",      label: "School" }
  ];

  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // Resolve each daysAgo offset into a real date once, at load.
  PEOPLE.forEach(function (p) {
    var d = new Date();
    d.setDate(d.getDate() - p.daysAgo);
    p.confirmed = d.getFullYear() + "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
      ("0" + d.getDate()).slice(-2);
  });

  var selected = {};
  FACETS.forEach(function (f) { selected[f.key] = []; });
  var query = "";
  var sortMode = "relevance";
  var openFilter = "";

  // A "way in" link from the homepage arrives as ?open=Student+researchers
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get("open")) openFilter = params.get("open");
  } catch (err) { openFilter = ""; }

  function vals(p, key) { return Array.isArray(p[key]) ? p[key] : [p[key]]; }

  function hay(p) {
    return [p.name, p.role, p.school, p.discipline, p.project, p.partner]
      .concat(p.topics, p.methods, p.communities, p.places, p.interests, p.open)
      .join(" ").toLowerCase();
  }

  function monthYear(iso) {
    var bits = iso.split("-");
    return MONTHS[parseInt(bits[1], 10) - 1] + " " + bits[0];
  }

  function freshness(iso) {
    var days = Math.max(0, Math.round((Date.now() - new Date(iso + "T00:00:00").getTime()) / 86400000));
    if (days <= 200) return { cls: "fresh--ok",  text: "Confirmed " + monthYear(iso) };
    if (days <= 400) return { cls: "fresh--age", text: "Last confirmed " + monthYear(iso) };
    return { cls: "fresh--old", text: "Needs review, " + monthYear(iso) };
  }

  function passesExcept(p, skip) {
    for (var i = 0; i < FACETS.length; i++) {
      var key = FACETS[i].key;
      if (key === skip) continue;
      var picked = selected[key];
      if (!picked.length) continue;
      var v = vals(p, key);
      var hit = false;
      for (var j = 0; j < picked.length; j++) { if (v.indexOf(picked[j]) !== -1) { hit = true; break; } }
      if (!hit) return false;
    }
    if (openFilter && p.open.indexOf(openFilter) === -1) return false;
    return true;
  }

  function passes(p) {
    if (!passesExcept(p, null)) return false;
    if (query) {
      var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      var h = hay(p);
      var any = false;
      for (var i = 0; i < terms.length; i++) { if (h.indexOf(terms[i]) !== -1) { any = true; break; } }
      if (!any) return false;
    }
    return true;
  }

  function score(p) {
    if (!query) return 0;
    var h = hay(p), n = 0;
    query.toLowerCase().split(/\s+/).filter(Boolean).forEach(function (t) { if (h.indexOf(t) !== -1) n++; });
    return n;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function buildFacets() {
    var host = document.getElementById("facets");
    host.innerHTML = "";
    FACETS.forEach(function (def) {
      var all = [];
      PEOPLE.forEach(function (p) {
        vals(p, def.key).forEach(function (v) { if (all.indexOf(v) === -1) all.push(v); });
      });
      all.sort();

      var wrap = document.createElement("div");
      wrap.className = "facet";
      var h = document.createElement("h3");
      h.textContent = def.label;
      wrap.appendChild(h);

      var chips = document.createElement("div");
      chips.className = "chips";
      all.forEach(function (v) {
        var n = 0;
        PEOPLE.forEach(function (p) { if (vals(p, def.key).indexOf(v) !== -1 && passesExcept(p, def.key)) n++; });
        var b = document.createElement("button");
        b.type = "button";
        b.className = "chip";
        b.setAttribute("aria-pressed", selected[def.key].indexOf(v) !== -1 ? "true" : "false");
        b.innerHTML = esc(v) + '<span class="n">' + n + "</span>";
        b.addEventListener("click", function () {
          var arr = selected[def.key], i = arr.indexOf(v);
          if (i === -1) arr.push(v); else arr.splice(i, 1);
          render();
        });
        chips.appendChild(b);
      });
      wrap.appendChild(chips);
      host.appendChild(wrap);
    });
  }

  function card(p) {
    var f = freshness(p.confirmed);
    var el = document.createElement("article");
    el.className = "person";
    el.innerHTML =
      '<div class="person__top">' +
        "<div><h3>" + esc(p.name) + '</h3><div class="role">' + esc(p.role) + " · " + esc(p.school) + "</div></div>" +
        '<span class="fresh ' + f.cls + '"><span class="pip"></span>' + esc(f.text) + "</span>" +
      "</div>" +
      '<div class="tag-list">' +
        p.topics.map(function (t) { return '<span class="tag topic">' + esc(t) + "</span>"; }).join("") +
        p.methods.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") +
        p.places.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") +
      "</div>" +
      "<p><b>Current work:</b> " + esc(p.project) + ", with " + esc(p.partner) + ".</p>" +
      "<p>Works with: " + p.communities.map(esc).join(" · ") + "</p>" +
      "<p><b>Wants to work on next:</b> " + p.interests.map(esc).join(" · ") + "</p>" +
      '<div class="person__open"><span class="lbl">Open to</span>' +
        p.open.map(function (o) { return '<span class="open">' + esc(o) + "</span>"; }).join("") +
      "</div>";
    return el;
  }

  function render() {
    var list = PEOPLE.filter(passes);

    if (sortMode === "az") {
      list.sort(function (a, b) { return a.name.localeCompare(b.name); });
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
      list.forEach(function (p) { out.appendChild(card(p)); });
    }

    var bits = [];
    if (openFilter) bits.push("open to " + openFilter.toLowerCase());
    if (query) bits.push('matching "' + query + '"');
    document.getElementById("count").innerHTML =
      "<b>" + list.length + "</b> of " + PEOPLE.length + " people" + (bits.length ? " " + esc(bits.join(", ")) : "");

    buildFacets();
  }

  function clearAll() {
    FACETS.forEach(function (f) { selected[f.key] = []; });
    query = "";
    openFilter = "";
    document.getElementById("q").value = "";
    render();
  }

  document.getElementById("q").addEventListener("input", function (e) {
    query = e.target.value.trim();
    render();
  });
  document.getElementById("sort").addEventListener("change", function (e) {
    sortMode = e.target.value;
    render();
  });
  document.getElementById("reset").addEventListener("click", function (e) {
    e.preventDefault();
    clearAll();
  });

  render();
})();
