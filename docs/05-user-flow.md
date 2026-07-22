# 5 · User flow

Transcribed from `raw files/User Flow.png`. The board colour-codes sub-flows
(green = friends / groups, blue = settings, pink = stats → share).

```mermaid
flowchart TD
  start([Start]) --> intro[Intro]
  intro --> add[Add habit screen]
  add -- habit successfully added --> home[(Home page:<br/>summary stats,<br/>friend's recent activity)]

  %% Core logging loop
  home --> camera[Tracking screen - camera]
  camera --> habitSel[Habit selection]
  habitSel -- habit selected --> feed[Group feed]

  %% Re-adding habits
  home -- add habit --> add
  friends[Friends list] -- add habit --> add

  %% Friend's activity
  home -- friend's activity --> feed

  %% Group feed interactions
  feed -- React to photos --> react[React screen]
  react --> feed
  feed -- Approve pending photos --> approval[Approval screen]
  approval --> notify[/app sends notification to friend/]
  notify --> feed

  %% Friends & groups
  home --> friends
  friends -- Add friends to group --> createGroup[Create group page]
  friends -- create group --> createGroup
  friends -- add friends --> findFriends[Search by username or scan QR]

  %% Stats → share
  home -- summary stats --> calendar[Calendar]
  calendar --> annually[Annually]
  calendar --> monthly[Monthly]
  calendar --> weekly[Weekly]
  calendar -- Share Activity --> shareQ{Share to<br/>social media?}
  shareQ -- Yes --> social[Social media platforms]
  shareQ -- No --> stop1[ ]

  %% Settings
  home --> settings[Settings]
  settings --> privacy[Privacy setting]
  privacy --> pv[Profile visibility]
  privacy --> sync[Sync with contact]
  settings --> notif[Notification setting]
  notif --> channel[Channel: email / push notification]
  notif --> enabled[Enabled]
  enabled --> on([On])
  enabled --> off([Off])
  settings --> account[Account setting - update email or password]
  account --> uEmail[Update email]
  account --> uPass[Update password]
  settings --> profile[Profile setting]
  profile --> editP[Edit display name, profile picture, bio and interests]
  profile -- Manage groups --> groupsList[Groups list]
  profile -- Manage friends --> friends
```

**Notes / reconciliation with the wireframes**

- Onboarding is **Intro → Add habit → Home** (no separate sign-up/login step is drawn).
  The wireframe intro keeps a "log in" affordance, but the happy path adds a first habit immediately.
- After logging, the user lands on the **Group feed** (proof posted for the group).
  The wireframes add a short "Logged / share" confirmation before the feed — a superset, not a conflict.
- **Sharing to social media** happens from **Calendar → Share Activity**, not from the log step.
- **React** and **Approval** are separate screens here; the wireframes combine them into one
  "proof detail" screen. Flag if they should be split.
