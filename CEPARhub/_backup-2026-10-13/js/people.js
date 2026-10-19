/* CEPAR@Tufts - shared directory data.
   Used by the directory (find.js), profile pages (profile.js) and the
   add/edit profile form (profile-form.js). Sample records only: these people
   and projects are invented. In a real build this file is generated from
   approved profile submissions; nothing else changes.

   Confirmation dates are stored as `daysAgo` offsets so the prototype's
   spread of fresh and stale profiles looks the same whenever it is opened.
   A real build stores real dates. */
(function () {
  "use strict";

  /* The shared keyword list. CEPAR still needs to agree this vocabulary
     (raised by Becky, Oct 5 meeting) so members describe the same work the
     same way. Everything that offers keywords reads from here, so changing
     the agreed list is a one-place edit. */
  var KEYWORDS = {
    topics: [
      "Aging in place", "Animal & community wellbeing", "Chronic disease prevention",
      "Climate adaptation", "Data ethics", "Disability & access", "Early childhood",
      "Family support systems", "Food access", "Health services access",
      "Housing & displacement", "Local governance", "Maternal health",
      "Mental health services", "Migration & resettlement", "One Health",
      "Policing & public safety", "Policy evaluation", "Substance use",
      "Transit & mobility", "Water quality", "Youth development"
    ],
    methods: [
      "Co-design workshops", "Community-based participatory research", "Economic modeling",
      "Field surveys", "Longitudinal interviews", "Mixed methods", "Participatory analysis",
      "Participatory evaluation", "Participatory mapping", "Participatory sensing",
      "Photovoice", "Qualitative synthesis", "Randomized trials"
    ]
  };

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

  /* Members who have opted in to an in-depth project showcase
     (Elaine's suggestion). Their projects appear on Projects & Impact. */
  var SHOWCASE = ["Dr. Lucía Menéndez-Kroll", "Dr. Idris Oyelaran", "Dr. Amara Nnadi-Holt",
                  "Dr. Marcus Oyelowo-Finn", "Dr. Hanne Lindqvist", "Dr. Owen Duraisamy"];

  function slug(name) {
    return name.replace(/^Dr\.\s+/, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  PEOPLE.forEach(function (p) {
    var d = new Date();
    d.setDate(d.getDate() - p.daysAgo);
    p.confirmed = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    p.id = slug(p.name);
    // One line for the directory card. Members write this themselves on the form.
    if (!p.blurb) p.blurb = p.project + ", with " + p.partner + ".";
    p.showcase = SHOWCASE.indexOf(p.name) !== -1;
    p.sample = true;
  });

  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  window.CEPAR = {
    people: PEOPLE,
    keywords: KEYWORDS,
    byId: function (id) {
      for (var i = 0; i < PEOPLE.length; i++) if (PEOPLE[i].id === id) return PEOPLE[i];
      return null;
    },
    esc: function (s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    },
    initials: function (name) {
      return name.replace(/^Dr\.\s+/, "").split(/[\s-]+/).filter(Boolean)
        .map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase();
    },
    freshness: function (iso) {
      var bits = iso.split("-"), my = MONTHS[parseInt(bits[1], 10) - 1] + " " + bits[0];
      var days = Math.max(0, Math.round((Date.now() - new Date(iso + "T00:00:00").getTime()) / 86400000));
      if (days <= 200) return { cls: "fresh--ok",  text: "Confirmed " + my };
      if (days <= 400) return { cls: "fresh--age", text: "Last confirmed " + my };
      return { cls: "fresh--old", text: "Needs review, " + my };
    }
  };
})();
