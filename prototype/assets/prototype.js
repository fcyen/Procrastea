/* ============================================================
   Procrastea — interactive prototype logic
   Navigation (stack + tab bar), app state, and per-screen renders.
   Every path in docs/05-user-flow.md is wired.
   ============================================================ */
(function () {
"use strict";

/* ---------- icon sprite (same set as the wireframes + brand mark) ---------- */
var sprite =
'<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
'<g id="m-mark">' +
'<g fill="none" stroke="#84bd67" stroke-width="2.6" stroke-linecap="round"><path d="M25 13c-2.4-2 0-4.2 0-6.6"/><path d="M32 13c-2.4-2 0-4.2 0-6.6"/><path d="M39 13c-2.4-2 0-4.2 0-6.6"/></g>' +
'<path d="M35 24c1.4-5.6 3.8-7.6 6.4-10.4" fill="none" stroke="#20252D" stroke-width="2.2" stroke-linecap="round"/>' +
'<rect x="37.5" y="7.5" width="10" height="10" rx="2.2" transform="rotate(10 42.5 12.5)" fill="#F6C343" stroke="#20252D" stroke-width="1.8"/>' +
'<path d="M13 23h31v11.5A15.5 15.5 0 0 1 28.5 50 15.5 15.5 0 0 1 13 34.5Z" fill="#A0D286" stroke="#20252D" stroke-width="2.4" stroke-linejoin="round"/>' +
'<ellipse cx="28.5" cy="23" rx="15.5" ry="3.6" fill="#84bd67" stroke="#20252D" stroke-width="2.4"/>' +
'<path d="M44 26.5h3.5a7.5 7.5 0 0 1 0 15H45" fill="none" stroke="#20252D" stroke-width="2.6" stroke-linecap="round"/>' +
'<path d="M14 54h29" fill="none" stroke="#20252D" stroke-width="2.6" stroke-linecap="round"/></g>' +
'<g id="i-cup"><path d="M5 8h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 9h2.5a2 2 0 0 1 0 4H16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 3.5c-.6.8-.6 1.7 0 2.5M11.5 3.5c-.6.8-.6 1.7 0 2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></g>' +
'<g id="i-chart"><path d="M5 20V4M20 20H4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="7" y="12" width="3" height="5" rx="1" fill="currentColor"/><rect x="12" y="8" width="3" height="9" rx="1" fill="currentColor"/><rect x="17" y="5" width="3" height="12" rx="1" fill="currentColor"/></g>' +
'<g id="i-cam"><path d="M3.5 8h3l1.6-2h6.8L16.5 8H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 .5-1z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.4" fill="none" stroke="currentColor" stroke-width="2"/></g>' +
'<g id="i-users"><circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 20c0-3.3 2.5-5.2 5.5-5.2s5.5 1.9 5.5 5.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.5 5.4a3.2 3.2 0 0 1 0 5.2M20.5 20c0-2.6-1.3-4.4-3.4-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-user"><circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-gear"><path d="M4 7h9M18 7h2M4 12h2M11 12h9M4 17h13M20 17h0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="15" cy="7" r="2.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="17" r="2.2" fill="none" stroke="currentColor" stroke-width="2"/></g>' +
'<g id="i-plus"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></g>' +
'<g id="i-back"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-fwd"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-check"><path d="M5 12l4 4 10-10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-search"><circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4.2-4.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-bell"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2H4.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 20a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-x"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></g>' +
'<g id="i-qr"><rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 14h3v3M20 14v6M14 20h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-lock"><rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></g>' +
'<g id="i-mail"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 7.5l8.5 6 8.5-6" fill="none" stroke="currentColor" stroke-width="2"/></g>' +
'<g id="i-share"><circle cx="6" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="2.4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="18" r="2.4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.1 11l7.8-3.8M8.1 13l7.8 3.8" fill="none" stroke="currentColor" stroke-width="2"/></g>' +
'<g id="i-img"><rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="10" r="1.6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 17l4.5-4 3.5 3 3-2.5L20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></g>' +
'<g id="i-flip"><path d="M4 12a8 8 0 0 1 13.5-5.8M20 5v4h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 12a8 8 0 0 1-13.5 5.8M4 19v-4h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-bolt"><path d="M13 3L5 13h6l-1 8 8-10h-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></g>' +
'<g id="i-trash"><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M7 7l1 13h8l1-13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-retake"><path d="M4 12a8 8 0 1 1 2.3 5.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 20v-4h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'</defs></svg>';
document.body.insertAdjacentHTML("afterbegin", sprite);

/* ---------- helpers ---------- */
var $ = function (s, el) { return (el || document).querySelector(s); };
var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

/* ---------- data ---------- */
var PEOPLE = {
  you:    { name: "You",    initial: "A", c: "#bde0a4" },
  jordan: { name: "Jordan", initial: "J", c: "#f4b183" },
  priya:  { name: "Priya",  initial: "P", c: "#c5b3e6" },
  sam:    { name: "Sam",    initial: "S", c: "#9dc3e6" },
  mia:    { name: "Mia",    initial: "M", c: "#f4a6b8" },
  dan:    { name: "Dan",    initial: "D", c: "#8fd8d2" },
  leo:    { name: "Leo",    initial: "L", c: "#b5d99c" },
  chris:  { name: "Chris",  initial: "C", c: "#cdd2d9" },
  ava:    { name: "Ava",    initial: "A", c: "#ffd166" },
  noah:   { name: "Noah",   initial: "N", c: "#b8c4d0" }
};

var TEMPLATES = [
  { name: "Run daily",   emoji: "🏃", grad: "g-run" },
  { name: "Read",        emoji: "📚", grad: "g-read" },
  { name: "Drink water", emoji: "💧", grad: "g-water" },
  { name: "Meditate",    emoji: "🧘", grad: "g-meditate" },
  { name: "Journal",     emoji: "✍️", grad: "g-journal" },
  { name: "Eat healthy", emoji: "🥗", grad: "g-meal" },
  { name: "Sleep early", emoji: "😴", grad: "g-sleep" }
];

var state;
function freshState() {
  return {
    habits: [
      { id: "run",     name: "Run daily",     emoji: "🏃", grad: "g-run",     streak: 19, done: true,  approvals: 3, completion: 90, logs: 82 },
      { id: "journal", name: "Write journal", emoji: "✍️", grad: "g-journal", streak: 6,  done: false, approvals: 0, completion: 74, logs: 51 },
      { id: "read",    name: "Read",          emoji: "📚", grad: "g-read",    streak: 4,  done: false, approvals: 0, completion: 61, logs: 44 }
    ],
    groups: [
      { id: "early", name: "Early Risers", members: 6, active: 4 },
      { id: "gym",   name: "Gym Buddies",  members: 4, active: 2 },
      { id: "book",  name: "Book Club",    members: 9, active: 5 }
    ],
    activeGroup: "early",
    proofs: {
      p_jordan: { id: "p_jordan", person: "jordan", habit: "Meal prep", emoji: "🥗", grad: "g-meal",     group: "early", status: "pending",  approved: 2, total: 4, time: "Today, 7:02am",
                  reactions: { "🔥": 3, "👏": 1, "💪": 0, "❤️": 2, "🎉": 0 }, mine: {}, comments: [{ who: "sam", text: "Those containers are so neat 😍" }] },
      p_priya:  { id: "p_priya", person: "priya", habit: "Meditate", emoji: "🧘", grad: "g-meditate", group: "early", status: "pending",  approved: 1, total: 4, time: "Today, 6:40am",
                  reactions: { "🔥": 1, "👏": 0, "💪": 0, "❤️": 1, "🎉": 0 }, mine: {}, comments: [] },
      p_sam:    { id: "p_sam", person: "sam", habit: "Run", emoji: "🏃", grad: "g-run",   group: "early", status: "approved", approved: 3, total: 4, time: "Today, 6:12am",
                  reactions: { "🔥": 4, "👏": 2, "💪": 1, "❤️": 0, "🎉": 0 }, mine: {}, comments: [{ who: "mia", text: "6am?! legend 🔥" }] },
      p_mia:    { id: "p_mia", person: "mia", habit: "Read", emoji: "📚", grad: "g-read", group: "early", status: "approved", approved: 5, total: 5, time: "Today, 8:05am",
                  reactions: { "🔥": 2, "👏": 3, "💪": 0, "❤️": 1, "🎉": 1 }, mine: {}, comments: [] },
      p_dan:    { id: "p_dan", person: "dan", habit: "Water", emoji: "💧", grad: "g-water", group: "early", status: "approved", approved: 2, total: 4, time: "Today, 9:15am",
                  reactions: { "🔥": 0, "👏": 1, "💪": 1, "❤️": 0, "🎉": 0 }, mine: {}, comments: [] },
      p_leo:    { id: "p_leo", person: "leo", habit: "Run", emoji: "🏃", grad: "g-run",  group: "early", status: "approved", approved: 4, total: 4, time: "Today, 7:48am",
                  reactions: { "🔥": 5, "👏": 0, "💪": 2, "❤️": 0, "🎉": 0 }, mine: {}, comments: [] },
      p_leo2:   { id: "p_leo2", person: "leo", habit: "Lift", emoji: "🏋️", grad: "g-lift", group: "gym", status: "approved", approved: 2, total: 3, time: "Today, 6:30pm",
                  reactions: { "🔥": 2, "👏": 1, "💪": 3, "❤️": 0, "🎉": 0 }, mine: {}, comments: [] },
      p_ava:    { id: "p_ava", person: "ava", habit: "Yoga", emoji: "🧘", grad: "g-meditate", group: "gym", status: "pending", approved: 1, total: 3, time: "Today, 7:20am",
                  reactions: { "🔥": 1, "👏": 1, "💪": 0, "❤️": 0, "🎉": 0 }, mine: {}, comments: [] },
      p_mia2:   { id: "p_mia2", person: "mia", habit: "Read", emoji: "📖", grad: "g-read", group: "book", status: "approved", approved: 6, total: 8, time: "Yesterday, 9:30pm",
                  reactions: { "🔥": 1, "👏": 4, "💪": 0, "❤️": 2, "🎉": 0 }, mine: {}, comments: [] },
      p_noah:   { id: "p_noah", person: "noah", habit: "Read", emoji: "📕", grad: "g-sleep", group: "book", status: "pending", approved: 3, total: 8, time: "Today, 8:50am",
                  reactions: { "🔥": 0, "👏": 2, "💪": 0, "❤️": 1, "🎉": 0 }, mine: {}, comments: [] }
    },
    /* which members show in each group's grid, in order (me = your tile, empty = not logged yet) */
    feeds: {
      early: ["p_jordan", "p_priya", "me", "p_sam", "p_mia", "p_dan", "p_leo", "empty:chris"],
      gym:   ["p_ava", "me", "p_leo2", "empty:dan"],
      book:  ["p_noah", "me", "p_mia2", "empty:chris", "empty:ava", "empty:sam"]
    },
    friends: [
      { who: "mia",    streak: 22, groups: "2 shared groups" },
      { who: "jordan", streak: 9,  groups: "1 shared group" },
      { who: "priya",  streak: 5,  groups: "3 shared groups" },
      { who: "dan",    streak: 14, groups: "1 shared group" },
      { who: "sam",    streak: 31, groups: "2 shared groups" },
      { who: "leo",    streak: 11, groups: "1 shared group" },
      { who: "chris",  streak: 2,  groups: "1 shared group" },
      { who: "ava",    streak: 7,  groups: "1 shared group" }
    ],
    myLog: {},            /* groupId -> habit name I logged today */
    draft: null,          /* habit being created (from S02/S03) */
    trackTarget: null,    /* habit id selected in S06 */
    currentProof: null,   /* proof open in S09 */
    period: "3mo",
    friendAdded: false
  };
}

/* ---------- navigation ---------- */
var TAB_SCREENS = { home: "s-home", feed: "s-feed", stats: "s-stats", settings: "s-settings" };
var SCREEN_NAMES = {
  "s-intro": "01 · Intro", "s-new-habit": "02 · New habit", "s-customize": "03 · Customize habit",
  "s-home": "04 · Home", "s-camera": "05 · Camera", "s-select": "06 · Select habit",
  "s-logged": "07 · Logged", "s-feed": "08 · Group feed", "s-proof": "09 · Proof detail",
  "s-friends": "10 · Friends", "s-add-friend": "11 · Add friend", "s-groups": "12 · Groups",
  "s-create-group": "13 · Create group", "s-settings": "14 · Settings", "s-profile": "15 · Profile",
  "s-privacy": "16 · Privacy", "s-notifs": "17 · Notifications", "s-account": "18 · Account",
  "s-stats": "19 · Statistics"
};
var stack = [];
var current = "s-intro";

function show(id, pop) {
  $$(".scr").forEach(function (s) { s.classList.remove("on", "pop"); });
  var scr = $("#" + id);
  scr.classList.add("on");
  if (pop) scr.classList.add("pop");
  var host = $("#host");
  host.classList.toggle("dark", id === "s-camera");
  host.scrollTop = 0;   /* focus/scrollIntoView can nudge the overflow-hidden host */
  var b = $(".body", scr); if (b) b.scrollTop = 0;
  current = id;
  $("#jump").value = id;
}
function render(id) {
  if (id === "s-home") renderHome();
  if (id === "s-feed") renderFeed();
  if (id === "s-select") renderSelect();
  if (id === "s-logged") renderLogged();
  if (id === "s-proof") renderProof();
  if (id === "s-stats") renderStats();
  if (id === "s-groups") renderGroups();
  if (id === "s-friends") renderFriends();
  if (id === "s-new-habit") renderTemplates();
  if (id === "s-create-group") renderCgMembers();
}
function go(id, opts) {
  opts = opts || {};
  if (id === current) return;
  if (!opts.noStack) stack.push(current);
  render(id);
  show(id, opts.pop);
}
function goTab(id) { stack = []; render(id); show(id); }
function back() {
  var id = stack.pop() || "s-home";
  render(id);
  show(id);
}

/* ---------- toast & sheet ---------- */
var toastTimer;
function toast(msg) {
  var t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
}
function openSheet() {
  var h = state.habits.reduce(function (a, b) { return b.streak > a.streak ? b : a; });
  $("#share-streak").textContent = "🔥 " + h.streak + "-day streak";
  $("#toast").classList.remove("show");
  $("#scrim").classList.add("show");
  $("#share-sheet").classList.add("show");
}
function closeSheet() {
  $("#scrim").classList.remove("show");
  $("#share-sheet").classList.remove("show");
}

/* ---------- shared partials ---------- */
function avatar(who, cls) {
  var p = PEOPLE[who];
  return '<div class="av ' + (cls || "") + '" style="background:' + p.c + ';">' + p.initial + "</div>";
}
function tabbar(active) {
  function t(key, icon, label) {
    return '<button class="tab' + (key === active ? " on" : "") + '" data-tab="' + key + '">' +
      '<svg viewBox="0 0 24 24"><use href="#i-' + icon + '"/></svg><span>' + label + "</span></button>";
  }
  return '<div class="tabbar">' + t("home", "cup", "Home") + t("feed", "users", "Group") +
    '<button class="tab" data-go-cam="1"><span class="fab"><svg viewBox="0 0 24 24"><use href="#i-cam"/></svg></span></button>' +
    t("stats", "chart", "Stats") + t("settings", "gear", "Settings") + "</div>";
}
$$("[data-tabbar]").forEach(function (ph) {
  ph.outerHTML = tabbar(ph.getAttribute("data-tabbar"));
});

/* ---------- S02 · templates ---------- */
function renderTemplates() {
  var html = TEMPLATES.map(function (t, i) {
    return '<div class="tmpl" data-tmpl="' + i + '"><div class="thumb ph ' + t.grad + '"><span class="em">' + t.emoji + '</span></div><div class="name">' + t.name + "</div></div>";
  }).join("");
  html += '<div class="tmpl new" data-tmpl="custom"><div class="thumb"><svg viewBox="0 0 24 24"><use href="#i-plus"/></svg></div><div class="name">Custom habit</div></div>';
  $("#tmpl-grid").innerHTML = html;
}

/* ---------- S04 · home ---------- */
function renderHome() {
  var done = state.habits.filter(function (h) { return h.done; }).length;
  var best = state.habits.reduce(function (a, b) { return b.streak > a.streak ? b : a; });
  var est = state.habits.filter(function (h) { return !h.isNew; });
  var completion = Math.round(est.reduce(function (a, h) { return a + h.completion; }, 0) / (est.length || 1));
  $("#home-stats").innerHTML =
    '<div class="stat" data-go="s-stats"><div class="n">' + done + "/" + state.habits.length + '</div><div class="l">habits done</div></div>' +
    '<div class="stat" data-go="s-stats"><div class="n">' + best.streak + '</div><div class="l">days streak</div></div>' +
    '<div class="stat" data-go="s-stats"><div class="n">' + completion + '%</div><div class="l">completion rate</div></div>';

  $("#home-strip").innerHTML = state.habits.map(function (h) {
    if (h.done) {
      return '<div class="habit-card done" data-go="s-stats">' +
        '<div class="thumb ph ' + h.grad + '" style="--em:36px;"><span class="em">' + h.emoji + '</span>' +
        (h.approvals ? '<span class="okbadge"><svg viewBox="0 0 24 24"><use href="#i-check"/></svg>' + h.approvals + "</span>" : '<span class="okbadge">✓</span>') +
        '</div><div class="name">' + esc(h.name) + '</div>' +
        '<div class="meta">' + (h.approvals ? h.approvals + " approvals" : "awaiting approval") + "</div></div>";
    }
    return '<div class="habit-card" data-track="' + h.id + '">' +
      '<div class="thumb ph ' + h.grad + '" style="--em:36px;"><span class="em">' + h.emoji + '</span>' +
      '<div class="todo"><span>Track now!</span></div></div>' +
      '<div class="name">' + esc(h.name) + '</div><div class="meta">🔥 ' + h.streak + " streak</div></div>";
  }).join("");

  var pj = state.proofs.p_jordan;
  var html;
  if (pj.status === "pending") {
    html = '<div class="card" style="display:flex;flex-direction:column;gap:11px;">' +
      '<div style="display:flex;gap:10px;align-items:center;">' + avatar("jordan") +
      '<div class="grow"><span class="sub d" style="font-size:12.5px;"><b>Jordan</b> just tracked the habit <b>“Meal prep”</b>. View and approve his tracking now!</span></div></div>' +
      '<button class="btn sm primary block ic" data-proof="p_jordan"><svg viewBox="0 0 24 24"><use href="#i-img"/></svg> View photo proof</button></div>';
  } else if (pj.status === "approved") {
    html = '<div class="card" style="display:flex;gap:10px;align-items:center;">' + avatar("jordan") +
      '<div class="grow"><span class="sub d" style="font-size:12.5px;">You approved <b>Jordan</b>\'s “Meal prep” proof ✓</span></div>' +
      '<span class="pill static"><svg viewBox="0 0 24 24"><use href="#i-check"/></svg> Approved</span></div>';
  } else {
    html = '<div class="card" style="display:flex;gap:10px;align-items:center;">' + avatar("jordan") +
      '<div class="grow"><span class="sub d" style="font-size:12.5px;">You rejected <b>Jordan</b>\'s “Meal prep” proof</span></div>' +
      '<span class="pill n static">Rejected</span></div>';
  }
  $("#home-activity").innerHTML = html;
  $("#bell").innerHTML = '<svg viewBox="0 0 24 24"><use href="#i-bell"/></svg>' + (pj.status === "pending" ? '<span class="dot"></span>' : "");
}

/* ---------- S06 · select habit ---------- */
function renderSelect() {
  var due = state.habits.filter(function (h) { return !h.done; });
  if (!due.length) due = state.habits;
  if (!state.trackTarget || !due.some(function (h) { return h.id === state.trackTarget; })) state.trackTarget = due[0].id;
  $("#select-list").innerHTML = due.map(function (h) {
    var on = h.id === state.trackTarget;
    return '<div class="rowc sel' + (on ? " on" : "") + '" data-pick="' + h.id + '">' +
      '<span style="font-size:22px;">' + h.emoji + '</span>' +
      '<div class="grow"><div class="h" style="margin:0;">' + esc(h.name) + '</div><span class="sub">' +
      (h.streak ? "🔥 " + h.streak + " day streak · due today" : "due today") + "</span></div>" +
      '<span class="radio' + (on ? " on" : "") + '"></span></div>';
  }).join("");
}

/* ---------- S07 · logged ---------- */
function renderLogged() {
  var h = habitById(state.trackTarget);
  if (!h) return;
  $("#logged-sub").textContent = h.name + " logged · 🔥 " + h.streak + " day streak";
  var g = groupById(state.activeGroup);
  $("#logged-note").textContent = "⏳ sent to " + g.name + " for approval";
  /* falling tea leaves */
  var host = $("#host");
  for (var i = 0; i < 6; i++) {
    var leaf = document.createElement("span");
    leaf.className = "leaf";
    leaf.textContent = ["🍃", "🍵", "🍃"][i % 3];
    leaf.style.left = (18 + Math.random() * 64) + "%";
    leaf.style.top = "70px";
    leaf.style.animationDelay = (Math.random() * 0.5) + "s";
    host.appendChild(leaf);
    setTimeout(function (el) { return function () { el.remove(); }; }(leaf), 2400);
  }
}

/* ---------- S08 · feed ---------- */
function habitById(id) { return state.habits.filter(function (h) { return h.id === id; })[0]; }
function groupById(id) { return state.groups.filter(function (g) { return g.id === id; })[0]; }

function stack3(n, whos) {
  var iv = whos.slice(0, 3).map(function (w) {
    return '<i style="background:' + PEOPLE[w].c + ';">' + PEOPLE[w].initial + "</i>";
  }).join("");
  return '<span class="appstack">' + iv + '<span class="cnt">' + n + "</span></span>";
}
var STACK_POOL = ["sam", "mia", "dan", "leo", "priya", "jordan"];

function renderFeed() {
  var g = groupById(state.activeGroup);
  $("#feed-title").textContent = g.name;
  $("#feed-chips").innerHTML = state.groups.map(function (gr) {
    return '<span class="chip' + (gr.id === state.activeGroup ? " on" : "") + '" data-group="' + gr.id + '">' + esc(gr.name) + "</span>";
  }).join("");

  var cells = (state.feeds[state.activeGroup] || ["me"]).slice();
  /* pending first, keep "me" near the front like the wireframe */
  cells.sort(function (a, b) { return pRank(a) - pRank(b); });
  function pRank(c) {
    if (c === "me") return 1;
    if (c.indexOf("empty:") === 0) return 3;
    return state.proofs[c].status === "pending" ? 0 : 2;
  }

  $("#feed-grid").innerHTML = cells.map(function (c) {
    if (c === "me") {
      var mine = state.myLog[state.activeGroup];
      if (mine) {
        return '<div class="feedcell pending" data-act="stub" data-msg="Your proof — friends are reviewing it ⏳">' +
          '<div class="ph g-photo" style="position:absolute;inset:0;border-radius:0;--em:40px;"><span class="em">🌅</span></div>' +
          '<span class="bd wait"><svg viewBox="0 0 24 24"><use href="#i-bell"/></svg> 0/' + (groupById(state.activeGroup).members - 1) + '</span>' +
          '<span class="nm">You · ' + esc(mine) + "</span></div>";
      }
      return '<div class="feedcell me" data-go-cam="1"><div class="lbl"><svg viewBox="0 0 24 24"><use href="#i-cam"/></svg>Add today\'s<br>proof</div></div>';
    }
    if (c.indexOf("empty:") === 0) {
      var w = c.split(":")[1];
      return '<div class="feedcell empty"><span class="nm">' + PEOPLE[w].name + " · not yet</span></div>";
    }
    var p = state.proofs[c];
    var badge = "";
    if (p.status === "pending") badge = '<span class="bd wait"><svg viewBox="0 0 24 24"><use href="#i-bell"/></svg> Approve</span>';
    if (p.status === "rejected") badge = '<span class="bd no"><svg viewBox="0 0 24 24"><use href="#i-x"/></svg> Rejected</span>';
    return '<div class="feedcell' + (p.status === "pending" ? " pending" : "") + '" data-proof="' + p.id + '">' +
      '<div class="ph ' + p.grad + '" style="position:absolute;inset:0;border-radius:0;--em:42px;"><span class="em">' + p.emoji + '</span></div>' +
      stack3(p.approved, STACK_POOL.filter(function (w) { return w !== p.person; }).slice(0, Math.min(3, p.approved))) +
      badge + '<span class="nm">' + PEOPLE[p.person].name + " · " + esc(p.habit) + "</span></div>";
  }).join("");
}

/* ---------- S09 · proof detail ---------- */
function renderProof() {
  var p = state.proofs[state.currentProof];
  if (!p) return;
  var who = PEOPLE[p.person];
  $("#proof-title").textContent = who.name + "'s proof";
  var g = groupById(p.group);

  var statusCard;
  if (p.status === "pending") {
    statusCard =
      '<div class="card flat" style="display:flex;align-items:center;gap:10px;">' +
      '<span class="pill h static">🍵 Pending your approval</span><span class="grow-sp"></span>' +
      '<span class="sub d">' + p.approved + " of " + p.total + " approved</span></div>" +
      '<div style="display:flex;gap:9px;">' +
      '<button class="btn danger block ic" data-verdict="rejected"><svg style="color:var(--bad)"><use href="#i-x"/></svg> Reject</button>' +
      '<button class="btn primary block ic" data-verdict="approved"><svg viewBox="0 0 24 24"><use href="#i-check"/></svg> Approve</button></div>';
  } else if (p.status === "approved") {
    statusCard =
      '<div class="card flat" style="display:flex;align-items:center;gap:10px;">' +
      '<span class="pill static"><svg viewBox="0 0 24 24"><use href="#i-check"/></svg> Approved</span><span class="grow-sp"></span>' +
      '<span class="sub d">' + p.approved + " of " + p.total + " approved</span></div>";
  } else {
    statusCard =
      '<div class="card flat" style="display:flex;align-items:center;gap:10px;">' +
      '<span class="pill n static">✕ You rejected this proof</span><span class="grow-sp"></span>' +
      '<span class="sub d">' + p.approved + " of " + p.total + " approved</span></div>";
  }

  var rx = Object.keys(p.reactions).map(function (e) {
    var n = p.reactions[e] + (p.mine[e] ? 1 : 0);
    return '<button data-rx="' + e + '"' + (p.mine[e] ? ' class="on"' : "") + ">" + e +
      (n ? '<span class="c">' + n + "</span>" : "") + "</button>";
  }).join("");

  var comments = p.comments.map(function (c) {
    var cw = PEOPLE[c.who];
    return '<div class="cmt">' + avatar(c.who, "sm") +
      '<div class="bub"><b>' + cw.name + "</b> · " + esc(c.text) + "</div></div>";
  }).join("");

  $("#proof-body").innerHTML =
    '<div style="display:flex;gap:10px;align-items:center;">' + avatar(p.person) +
    '<div class="grow"><div class="h" style="margin:0;">' + who.name + " · " + esc(p.habit) + '</div>' +
    '<span class="sub">' + p.time + " · " + esc(g.name) + "</span></div></div>" +
    '<div class="ph ' + p.grad + '" style="width:100%;height:216px;--em:64px;"><span class="em">' + p.emoji + '</span></div>' +
    statusCard +
    '<div class="card" style="display:flex;flex-direction:column;gap:10px;">' +
    '<span class="flabel">React</span><div class="rx">' + rx + "</div></div>" +
    (comments ? '<div style="display:flex;flex-direction:column;gap:9px;">' + comments + "</div>" : "") +
    '<div style="display:flex;gap:8px;align-items:center;">' +
    '<input class="input" id="cmt-input" placeholder="Add a comment…" style="flex:1;">' +
    '<button class="pill" data-act="send-comment" style="flex:none;padding:10px 15px;">Send</button></div>';
}

/* ---------- S10 · friends ---------- */
function renderFriends(filter) {
  var list = state.friends.filter(function (f) {
    return !filter || PEOPLE[f.who].name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
  });
  $("#friend-count").textContent = filter ? "Matching · " + list.length : "All friends · " + (state.friends.length + (state.friendAdded ? 1 : 0));
  var html = list.map(function (f) {
    return '<div class="row tap" data-act="stub" data-msg="Friend profiles — out of prototype scope">' + avatar(f.who) +
      '<div class="grow"><div class="h" style="margin:0;">' + PEOPLE[f.who].name + '</div>' +
      '<span class="sub">🔥 ' + f.streak + " · " + f.groups + '</span></div>' +
      '<svg class="fwd"><use href="#i-fwd"/></svg></div>';
  }).join('<div class="divide"></div>');
  if (state.friendAdded && !filter) {
    html = '<div class="row">' + '<div class="av" style="background:#ffd166;">T</div>' +
      '<div class="grow"><div class="h" style="margin:0;">Tea Habit</div><span class="sub">@teahabit · just added</span></div>' +
      '<span class="pill static">New</span></div><div class="divide"></div>' + html;
  }
  $("#friend-list").innerHTML = html;
}

/* ---------- S12 · groups ---------- */
function renderGroups() {
  $("#group-list").innerHTML = state.groups.map(function (g) {
    return '<div class="rowc tap" data-open-group="' + g.id + '">' +
      '<div class="av" style="background:var(--matcha-tint);color:var(--matcha-ink);"><svg viewBox="0 0 24 24"><use href="#i-users"/></svg></div>' +
      '<div class="grow"><div class="h" style="margin:0;">' + esc(g.name) + '</div>' +
      '<span class="sub">' + g.members + " members · " + g.active + ' active today</span></div>' +
      '<svg class="fwd"><use href="#i-fwd"/></svg></div>';
  }).join("");
}

/* ---------- S13 · create group members ---------- */
function renderCgMembers() {
  $("#cg-members").innerHTML = ["mia", "jordan"].map(function (w) {
    return '<div class="rowc">' + avatar(w, "sm") +
      '<div class="grow"><div class="h" style="margin:0;">' + PEOPLE[w].name + '</div></div>' +
      '<button class="check on" data-check="1"><svg viewBox="0 0 24 24"><use href="#i-check"/></svg></button></div>';
  }).join("");
}

/* ---------- S19 · statistics ---------- */
function hash(s) {
  var h = 0;
  for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function heatCells(habit, count) {
  var out = "", seed = hash(habit.id), p = habit.completion / 100;
  for (var i = 0; i < count; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    var r = (seed % 1000) / 1000;
    var lvl = 0;
    if (r < p) lvl = 1 + Math.floor((((seed >> 8) % 100) / 100) * 4);
    if (habit.isNew) lvl = i === count - 1 ? 4 : 0;   /* brand-new habit: only today filled */
    out += "<i" + (lvl ? ' class="l' + lvl + '"' : "") + "></i>";
  }
  return out;
}
function monthCells(habit) {
  var M = "JFMAMJJASOND", seed = hash(habit.id + "y"), p = habit.completion / 100, out = "";
  for (var i = 0; i < 12; i++) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    var lvl = Math.max(1, Math.min(4, Math.round(p * 4 + ((seed % 3) - 1))));
    if (habit.isNew) lvl = i === 11 ? 2 : 0;
    out += "<i" + (lvl ? ' class="l' + lvl + '"' : "") + ">" + M[i] + "</i>";
  }
  return out;
}
function renderStats() {
  $$("#stats-seg div").forEach(function (d) {
    d.classList.toggle("on", d.getAttribute("data-period") === state.period);
  });
  var factor = { month: 0.37, "3mo": 1, year: 4 }[state.period];
  $("#stats-cards").innerHTML = state.habits.map(function (h) {
    var heat = state.period === "year"
      ? '<div class="heat months">' + monthCells(h) + "</div>"
      : '<div class="heat">' + heatCells(h, state.period === "month" ? 28 : 70) + "</div>";
    var logs = h.isNew ? h.logs : Math.max(1, Math.round(h.logs * factor));
    return '<div class="statcard">' +
      '<div class="top"><div class="name">' + h.emoji + " " + esc(h.name) + '</div>' +
      '<button class="ibtn" data-act="stub" data-msg="Per-habit trend charts — next iteration 📈"><svg viewBox="0 0 24 24"><use href="#i-chart"/></svg></button>' +
      '<button class="ibtn" data-act="stub" data-msg="Archiving a habit is disabled in the prototype"><svg viewBox="0 0 24 24"><use href="#i-trash"/></svg></button></div>' +
      heat +
      '<div class="foot"><span><b>' + h.streak + '</b>🔥 streak</span><span><b>' + h.completion + '%</b> completion</span><span><b>' + logs + "</b> logs</span></div></div>";
  }).join("");
}

/* ---------- actions ---------- */
function trackHabit() {
  var h = habitById(state.trackTarget);
  h.done = true;
  h.streak += 1;
  h.logs += 1;
  h.approvals = 0;
  state.myLog[state.activeGroup] = h.name;
  go("s-logged", { pop: true });
}

function addHabit() {
  var name = $("#cz-name").value.trim() || "New habit";
  var d = state.draft || {};
  state.habits.push({
    id: "h" + Date.now(), name: name, emoji: d.emoji || "🌱", grad: d.grad || "g-meal",
    streak: 0, done: false, approvals: 0, completion: 0, logs: 0, isNew: true
  });
  state.draft = null;
  toast("“" + name + "” added — first log fills your teabag 🍵");
  stack = [];
  go("s-home", { noStack: true, pop: true });
}

function verdict(v) {
  var p = state.proofs[state.currentProof];
  p.status = v;
  if (v === "approved") {
    p.approved += 1;
    toast(PEOPLE[p.person].name + " gets an approval notification 🎉");
  } else {
    toast("Rejected — " + PEOPLE[p.person].name + " will be asked for a clearer photo");
  }
  renderProof();
}

function createGroup() {
  var name = $("#cg-name").value.trim() || "New group";
  var id = "g" + Date.now();
  state.groups.push({ id: id, name: name, members: 3, active: 1 });
  state.feeds[id] = ["me", "empty:mia", "empty:jordan"];
  state.activeGroup = id;
  toast("“" + name + "” created — invites sent to Mia & Jordan ✉️");
  stack = [];
  go("s-feed", { noStack: true, pop: true });
}

/* ---------- event delegation ---------- */
document.addEventListener("click", function (e) {
  var el;

  if ((el = e.target.closest("[data-go]"))) return go(el.getAttribute("data-go"));
  if ((el = e.target.closest("[data-tab]"))) return goTab(TAB_SCREENS[el.getAttribute("data-tab")]);
  if (e.target.closest("[data-go-cam]")) return go("s-camera");

  if ((el = e.target.closest("[data-tmpl]"))) {
    var v = el.getAttribute("data-tmpl");
    state.draft = v === "custom" ? { emoji: "🌱", grad: "g-meal", name: "" } : TEMPLATES[+v];
    go("s-customize");
    $("#cz-name").value = state.draft.name || "";
    var cov = $("#cz-cover");
    cov.classList.remove("has");
    cov.innerHTML = '<svg viewBox="0 0 24 24"><use href="#i-img"/></svg> Upload file';
    return;
  }

  if ((el = e.target.closest("[data-track]"))) {
    state.trackTarget = el.getAttribute("data-track");
    return go("s-camera");
  }
  if ((el = e.target.closest("[data-pick]"))) {
    state.trackTarget = el.getAttribute("data-pick");
    return renderSelect();
  }
  if ((el = e.target.closest("[data-proof]"))) {
    state.currentProof = el.getAttribute("data-proof");
    return go("s-proof");
  }
  if ((el = e.target.closest("[data-verdict]"))) return verdict(el.getAttribute("data-verdict"));
  if ((el = e.target.closest("[data-rx]"))) {
    var p = state.proofs[state.currentProof], emo = el.getAttribute("data-rx");
    p.mine[emo] = !p.mine[emo];
    return renderProof();
  }
  if ((el = e.target.closest("#stats-seg [data-period]"))) {
    state.period = el.getAttribute("data-period");
    return renderStats();
  }
  if ((el = e.target.closest("[data-group]"))) {
    state.activeGroup = el.getAttribute("data-group");
    return renderFeed();
  }
  if ((el = e.target.closest("[data-open-group]"))) {
    state.activeGroup = el.getAttribute("data-open-group");
    stack = [];
    return go("s-feed", { noStack: true });
  }
  if ((el = e.target.closest("[data-share]"))) {
    closeSheet();
    var t = el.getAttribute("data-share");
    return toast(t === "link" ? "Link copied 🔗" : "Shared to " + t + " (mock) 🚀");
  }

  /* generic controls */
  if ((el = e.target.closest(".toggle"))) {
    el.classList.toggle("on");
    if (el.id === "notif-master") {
      var rest = $("#notif-rest");
      rest.style.opacity = el.classList.contains("on") ? "1" : ".35";
      rest.style.pointerEvents = el.classList.contains("on") ? "auto" : "none";
    }
    return;
  }
  if ((el = e.target.closest("[data-check]"))) {
    el.classList.toggle("on");
    return;
  }
  if ((el = e.target.closest(".day"))) { el.classList.toggle("on"); return; }
  if ((el = e.target.closest("[data-radiogroup] .rowc.sel"))) {
    var grp = el.parentElement;
    $$(".rowc.sel", grp).forEach(function (r) {
      r.classList.remove("on");
      $(".radio", r).classList.remove("on");
    });
    el.classList.add("on");
    $(".radio", el).classList.add("on");
    return;
  }
  if ((el = e.target.closest("[data-single] .chip"))) {
    $$(".chip", el.parentElement).forEach(function (c) { c.classList.remove("on"); });
    el.classList.add("on");
    return;
  }
  if ((el = e.target.closest(".chips:not([data-single]) .chip:not([data-act]):not([data-group])"))) {
    el.classList.toggle("on");
    return;
  }

  /* named actions */
  if ((el = e.target.closest("[data-act]"))) {
    var act = el.getAttribute("data-act");
    switch (act) {
      case "back": return back();
      case "login": toast("Welcome back, Alex 🍵"); stack = []; return go("s-home", { noStack: true });
      case "bell":
        if (state.proofs.p_jordan.status === "pending") { state.currentProof = "p_jordan"; return go("s-proof"); }
        return toast("You're all caught up 🍵");
      case "shutter":
        $("#flashfx").classList.remove("go");
        void $("#flashfx").offsetWidth;
        $("#flashfx").classList.add("go");
        return setTimeout(function () { go("s-select"); }, 340);
      case "flash": return toast("Flash: auto ⚡");
      case "flip": return toast("Switched to front camera 🤳");
      case "track-it": return trackHabit();
      case "logged-done": stack = []; return go("s-feed", { noStack: true });
      case "share-group": stack = []; go("s-feed", { noStack: true }); return toast("Posted to your group ✓");
      case "share-more": return openSheet();
      case "share-sheet": return openSheet();
      case "close-sheet": return closeSheet();
      case "add-habit": return addHabit();
      case "create-group": return createGroup();
      case "add-friend":
        state.friendAdded = true;
        el.textContent = "Added ✓";
        el.classList.add("static");
        return toast("Friend request sent to @teahabit");
      case "scan-qr": return toast("Camera opens to scan — mocked in the prototype 📷");
      case "save-profile": toast("Profile saved ✓"); return back();
      case "logout": stack = []; return go("s-intro", { noStack: true });
      case "send-comment": {
        var input = $("#cmt-input");
        var txt = input && input.value.trim();
        if (!txt) return toast("Write a comment first ✍️");
        state.proofs[state.currentProof].comments.push({ who: "you", text: txt });
        renderProof();
        return toast("Comment posted 💬");
      }
      case "stub": return toast(el.getAttribute("data-msg") || "Out of prototype scope");
    }
  }

  /* customize screen bits */
  if ((el = e.target.closest("#cz-cover"))) {
    var d = state.draft || { grad: "g-meal", emoji: "🌱" };
    el.classList.add("has");
    el.innerHTML = '<div class="cover ph ' + d.grad + '" style="border:none;border-radius:0;width:100%;"><span class="em" style="font-size:30px;">' + d.emoji + "</span></div>";
    return toast("Cover photo added — your end goal 🎯");
  }
  if ((el = e.target.closest("#cz-group"))) {
    var ids = state.groups.map(function (g) { return g.id; });
    var cur = el.getAttribute("data-gid") || state.groups[0].id;
    var next = ids[(ids.indexOf(cur) + 1) % ids.length];
    el.setAttribute("data-gid", next);
    el.firstChild.textContent = groupById(next).name + " ";
    return;
  }
});

/* search-as-you-type on friends */
document.addEventListener("input", function (e) {
  if (e.target.id === "friend-search") renderFriends(e.target.value);
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.id === "cmt-input") {
    var btn = $('[data-act="send-comment"]');
    if (btn) btn.click();
  }
});
$("#scrim").addEventListener("click", closeSheet);

/* ---------- reviewer chrome ---------- */
var jump = $("#jump");
Object.keys(SCREEN_NAMES).forEach(function (id) {
  var o = document.createElement("option");
  o.value = id;
  o.textContent = SCREEN_NAMES[id];
  jump.appendChild(o);
});
jump.addEventListener("change", function () {
  stack = [];
  go(jump.value, { noStack: true });
});
$("#restart").addEventListener("click", function () { boot(); });

/* static markup writes <svg><use> without a viewBox; without one the 24-unit
   icon paths get clipped at small sizes, so stamp it on once at load */
$$("svg:not([viewBox])").forEach(function (s) {
  if (s.querySelector("use")) s.setAttribute("viewBox", "0 0 24 24");
});

/* ---------- boot ---------- */
function boot() {
  state = freshState();
  stack = [];
  current = "";
  renderTemplates();
  go("s-intro", { noStack: true });
}
boot();

})();
