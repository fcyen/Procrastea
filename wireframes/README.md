# Procrastea — Low-fidelity wireframes

Open **`index.html`** for the full board (all 19 screens in device frames, grouped
by flow). Each screen is also a standalone file under `screens/` so you can edit one
screen without loading the rest.

```
wireframes/
├─ index.html              gallery of every screen (embeds screens/ via iframes)
├─ assets/
│  ├─ wireframe.css        one shared stylesheet for every screen
│  └─ sprite.js            shared icon set, injected inline
└─ screens/
   ├─ 01-intro.html        A · Onboarding & the core loop
   ├─ 02-new-habit.html         pick a habit template
   ├─ 03-customize-habit.html   name · cover photo (end goal) · repeat
   ├─ 04-home.html              stats · today's habit cards · friend approve
   ├─ 05-camera.html            photo-first: snap proof
   ├─ 06-select-habit.html      "Which habit are you tracking?"
   ├─ 07-logged.html            teabag filled +1 · share
   ├─ 08-group-feed.html   B · Social & accountability (setlog-style + approve)
   ├─ 09-proof-detail.html      approve / reject · react · comment
   ├─ 10-friends.html
   ├─ 11-add-friend.html        search · QR
   ├─ 12-groups.html
   ├─ 13-create-group.html      proof + approval rules
   ├─ 14-settings.html     C · Settings & profile
   ├─ 15-profile.html
   ├─ 16-privacy.html
   ├─ 17-notifications.html
   ├─ 18-account.html
   └─ 19-statistics.html   D · Progress (per-habit contribution heatmaps)
```

## Notes on the reworks (from `/wireframe-references` + `raw files`)

- **Brand.** Renamed to *Procrastea*, tagline "Good habits are built together".
  Accent aligned to the brand green `#A0D286`; teacup mascot used as the Home tab
  and log-success ("fill your teabag") moment. Type is Figtree with a system fallback.
- **Log flow is photo-first.** Camera → *Which habit are you tracking?* (retake /
  search / pick), matching the `Select habit` sketch. Proof is the spine of the app.
- **Home** follows the sketch: dark stat tiles (2/3 · 19 · 90%), horizontal habit
  cards with cover photos, and a friend-activity card with a **View proof / Approve**
  affordance.
- **Group feed** is modelled on setlog's card feed, with the added affordance to
  **approve a friend's proof**: a pending card shows an amber Reject / Approve bar and
  a "3/4 approved" tally; approved cards flip to reactions.
- **Statistics** uses per-habit GitHub-style **contribution heatmaps** (inspired by the
  Habit Planner reference) with streak / completion / log counts.

Low-fidelity on purpose: greyscale placeholders, hatched boxes for photos, one green
accent. Colour, type and components get resolved in the branding guide (step 7) and
applied in the high-fidelity pass (step 8).
