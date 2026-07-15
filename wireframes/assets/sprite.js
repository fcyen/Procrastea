/* Shared icon sprite for all Procrastea wireframe screens.
   Injected as inline <svg> so <use href="#i-..."> resolves on file:// too. */
(function () {
  var svg =
'<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
'<g id="i-home"><path d="M4 11l8-7 8 7M6 10v10h12V10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-cup"><path d="M5 8h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 9h2.5a2 2 0 0 1 0 4H16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 3.5c-.6.8-.6 1.7 0 2.5M11.5 3.5c-.6.8-.6 1.7 0 2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></g>' +
'<g id="i-cal"><rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 3v4M16 3v4M4 10h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-chart"><path d="M5 20V4M20 20H4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="7" y="12" width="3" height="5" rx="1" fill="currentColor"/><rect x="12" y="8" width="3" height="9" rx="1" fill="currentColor"/><rect x="17" y="5" width="3" height="12" rx="1" fill="currentColor"/></g>' +
'<g id="i-cam"><path d="M3.5 8h3l1.6-2h6.8L16.5 8H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 .5-1z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.4" fill="none" stroke="currentColor" stroke-width="2"/></g>' +
'<g id="i-users"><circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 20c0-3.3 2.5-5.2 5.5-5.2s5.5 1.9 5.5 5.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.5 5.4a3.2 3.2 0 0 1 0 5.2M20.5 20c0-2.6-1.3-4.4-3.4-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-user"><circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-gear"><path d="M4 7h9M18 7h2M4 12h2M11 12h9M4 17h13M20 17h0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="15" cy="7" r="2.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="12" r="2.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="17" r="2.2" fill="none" stroke="currentColor" stroke-width="2"/></g>' +
'<g id="i-plus"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></g>' +
'<g id="i-back"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-fwd"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-heart"><path d="M12 20s-7-4.4-9.2-8.8C1.4 8 3 4.6 6.2 4.6c1.9 0 3.1 1.1 3.8 2.2.7-1.1 1.9-2.2 3.8-2.2 3.2 0 4.8 3.4 3.4 6.6C19 15.6 12 20 12 20z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></g>' +
'<g id="i-check"><path d="M5 12l4 4 10-10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-search"><circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4.2-4.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-bell"><path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2H4.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 20a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-x"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></g>' +
'<g id="i-qr"><rect x="4" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="14" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><rect x="4" y="14" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 14h3v3M20 14v6M14 20h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></g>' +
'<g id="i-lock"><rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></g>' +
'<g id="i-mail"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 7.5l8.5 6 8.5-6" fill="none" stroke="currentColor" stroke-width="2"/></g>' +
'<g id="i-share"><circle cx="6" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="2.4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="18" r="2.4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.1 11l7.8-3.8M8.1 13l7.8 3.8" fill="none" stroke="currentColor" stroke-width="2"/></g>' +
'<g id="i-flame"><path d="M12 3c2.4 3 4.2 4.6 4.2 8A4.2 4.2 0 0 1 7.8 11c0-1.4.4-2.4 1-3.2C10 8.6 11 7 12 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></g>' +
'<g id="i-img"><rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="10" r="1.6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 17l4.5-4 3.5 3 3-2.5L20 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></g>' +
'<g id="i-flip"><path d="M4 12a8 8 0 0 1 13.5-5.8M20 5v4h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 12a8 8 0 0 1-13.5 5.8M4 19v-4h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-bolt"><path d="M13 3L5 13h6l-1 8 8-10h-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></g>' +
'<g id="i-trash"><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M7 7l1 13h8l1-13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'<g id="i-retake"><path d="M4 12a8 8 0 1 1 2.3 5.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 20v-4h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
'</defs></svg>';
  if (document.body) document.body.insertAdjacentHTML('afterbegin', svg);
  else document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('afterbegin', svg);
  });
})();
