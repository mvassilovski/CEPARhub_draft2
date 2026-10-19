/* CEPAR@Tufts - single profile page: profile.html?id=<person id>.
   The directory card is the short version; this page holds the rest
   (details, photo, links, showcased project), like a Google Scholar profile. */
(function () {
  "use strict";

  var C = window.CEPAR;
  var esc = C.esc;
  var id = "";
  try { id = new URLSearchParams(window.location.search).get("id") || ""; } catch (e) { id = ""; }
  var p = C.byId(id);

  var head = document.getElementById("profile-head");
  var body = document.getElementById("profile-body");
  var rail = document.getElementById("profile-rail");

  if (!p) {
    document.title = "Profile not found | CEPAR at Tufts";
    head.innerHTML = '<h1>Profile not found</h1><p class="lede">This person may have been removed, or the link is incomplete.</p>';
    body.innerHTML = '<p><a class="btn btn--primary" href="find.html">Open the directory</a></p>';
    rail.hidden = true;
    return;
  }

  document.title = p.name + " | CEPAR at Tufts";
  var f = C.freshness(p.confirmed);

  function tags(list, cls) {
    return '<div class="tag-list">' + list.map(function (t) {
      return '<span class="tag' + (cls ? " " + cls : "") + '">' + esc(t) + "</span>";
    }).join("") + "</div>";
  }

  head.innerHTML =
    '<div class="phead">' +
      '<div class="phead__photo" role="img" aria-label="Photo placeholder for ' + esc(p.name) + '">' +
        '<span aria-hidden="true">' + esc(C.initials(p.name)) + "</span></div>" +
      "<div>" +
        (p.sample ? '<span class="sample-tag">Sample profile, invented for the prototype</span>' : "") +
        "<h1>" + esc(p.name) + "</h1>" +
        '<p class="phead__role">' + esc(p.role) + " · " + esc(p.school) + "</p>" +
        '<p class="phead__blurb">' + esc(p.blurb) + "</p>" +
        '<span class="fresh ' + f.cls + '"><span class="pip"></span>' + esc(f.text) + "</span>" +
      "</div>" +
    "</div>";

  var html = "";
  html += '<div class="block"><h2>Current work</h2>' +
    "<p><b>" + esc(p.project) + "</b></p>" +
    "<p>Community partner: " + esc(p.partner) + "</p>";
  if (p.showcase) {
    html += '<p><a class="reset-link" href="work.html#current">Explore this project on Projects &amp; Impact →</a></p>';
  }
  html += "</div>";

  html += '<div class="block"><h2>Research areas</h2>' +
    '<h3 class="mini">Topics</h3>' + tags(p.topics, "topic") +
    '<h3 class="mini">Methods</h3>' + tags(p.methods) +
    '<h3 class="mini">Communities</h3>' + tags(p.communities) +
    '<h3 class="mini">Places</h3>' + tags(p.places) +
    "</div>";

  html += '<div class="block"><h2>Wants to work on next</h2><ul class="plain-list">' +
    p.interests.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";

  html += '<div class="block"><h2>Links</h2>' +
    '<p class="muted">Lab websites, faculty profiles and portfolios the person adds on the profile form appear here and open in a new tab. Sample profiles have none.</p></div>';

  body.innerHTML = html;

  rail.innerHTML =
    '<p class="rail__head">Connect</p>' +
    '<div class="railbox railbox--static"><h3>Open to</h3>' + tags(p.open) + "</div>" +
    '<a class="railbox" href="mailto:tcrc@tufts.edu?subject=' + encodeURIComponent("Introduction to " + p.name) + '">' +
      "<h3>Ask for an introduction</h3><p>TCRC can connect you, so you don't have to send a cold email.</p>" +
      '<span class="go">Email TCRC →</span></a>' +
    '<a class="railbox" href="add-profile.html?mode=edit&amp;id=' + encodeURIComponent(p.id) + '">' +
      "<h3>Is this you?</h3><p>Suggest changes to this profile. TCRC reviews edits before they go live.</p>" +
      '<span class="go">Update this profile →</span></a>';
})();
