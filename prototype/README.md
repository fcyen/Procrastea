# Procrastea — interactive prototype (steps 8 + 9)

Open **`index.html`** in a browser. Per `LOOP.md`, the high-fidelity wireframe
(step 8) is combined with the prototype (step 9): every screen from the low-fi
wireframes rebuilt on the branding guide, wired together into one clickable app.

```
prototype/
├─ index.html              the app — a phone frame with all 19 screens
└─ assets/
   ├─ prototype.css        branded styles (palette/type/components from /branding)
   └─ prototype.js         navigation, app state, per-screen renders, icon sprite
```

A small reviewer bar above the phone offers a **jump-to-screen** dropdown (to
audit any screen directly) and a **Restart** button that resets all state.

## What's real (not just linked pictures)

The prototype keeps state, so the flows in `docs/05-user-flow.md` actually work
end to end:

- **Onboarding** — Intro → pick a template → customize (name, cover, repeat
  days, share-to-group) → the new habit appears on Home and in Statistics
  (with an empty heatmap — only today filled).
- **Photo-first logging** — camera FAB → shutter (flash animation) → *Which
  habit are you tracking?* (retake / switch habit) → *Teabag filled +1*
  celebration → lands on the group feed, where **your** tile now shows the
  proof pending your friends' approval. Home stats, streaks and log counts
  update.
- **Approve / reject** — pending proofs are honey-ringed in the feed and
  surfaced on Home ("Jordan just tracked…"). Approving flips the tally and
  fires the "friend gets a notification" moment from the user flow; rejecting
  marks the card. Reactions toggle with live counts; comments post for real.
- **Groups & friends** — switch groups via chips, create a group (it appears
  in the chip row with your invitees as "not yet" tiles), add a friend
  (search result + QR panel), live friend-list search.
- **Settings tree** — profile / privacy / notifications / account, with
  working toggles, radio groups, chips, and the master notification switch
  dimming its children. Log out returns to Intro.
- **Statistics → share** — per-habit contribution heatmaps with Month /
  3-months / Year periods (year rolls up to monthly cells), and the
  *Share activity* sheet (Calendar → Share Activity → social platforms in the
  user flow).

Deliberately mocked (toast explains in-app): real camera/photo upload, friend
profiles, per-habit trend charts, account deletion. Photos are gradient +
emoji stand-ins so the prototype stays self-contained (no image assets); the
Figtree webfont loads from Google Fonts and falls back to system sans offline.

## Fidelity sources

| Element | Source |
|---|---|
| Screens & layout | `/wireframes/screens/*` (all 19, same numbering) |
| Palette, tints, semantics | `/branding/colors.yml` |
| Type (Figtree 400–900), components, motion ideas | `/branding/brand-guide.html` |
| Logo mark | `/branding/logo-mark.svg` (direction 00 — swap when a direction is locked) |
| Flows | `docs/05-user-flow.md` + `docs/03-information-architecture.md` |

Next step (10 · Testing): put this in front of users, collect feedback, and
write up the analysis.
