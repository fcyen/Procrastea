# 5 · User flow

> Reconstructed from the board's User Flow diagram (`design-source/figjam-board-full.png`)
> plus the realized wireframes. The board colour-codes several sub-flows (green = friends /
> approval, blue = settings, pink = auth). Labels are best-effort — **verify against the
> source**.

```mermaid
flowchart TD
  start([Start]) --> intro[Intro / onboarding slides]
  intro --> hasAcct{Already have<br/>an account?}
  hasAcct -- no --> signup[Sign up]
  hasAcct -- yes --> login[Log in]
  signup --> home[Home]
  login --> home

  %% Core loop: log with photo proof
  home --> camera[Camera - snap proof]
  camera --> which[Which habit are you tracking?]
  which -- retake --> camera
  which --> logged[Logged: teabag +1]
  logged --> share[Share to group / social]
  share --> home

  %% Create a habit
  home --> add[Add habit]
  add --> tmpl[Pick a template]
  tmpl --> custom[Customize: name / cover photo / repeat]
  custom --> home

  %% Social / accountability
  home --> feed[Group feed]
  feed --> proof[Open a friend's proof]
  proof --> approve{Approve?}
  approve -- approve --> notify[/App notifies the friend/]
  approve -- reject --> feed
  proof --> react[React / comment]
  react --> feed
  feed --> groups[Groups]
  groups --> newGroup[Create group]
  feed --> friends[Friends]
  friends --> addFriend[Add friend - search / QR]

  %% Progress
  home --> stats[Statistics - per-habit heatmaps]

  %% Settings
  home --> settings[Settings]
  settings --> privacy[Privacy: visibility / sync contacts]
  settings --> notif[Notifications: channels / reminders]
  notif --> notifChoice{Enabled?}
  settings --> account[Account: update email / password]
  settings --> profile[Profile: name / photo / bio / interests]
  profile --> manageGroups[Manage groups & friends]
  settings --> logout[Log out]
```

_Verify node labels and branch conditions against `design-source/figjam-board-full.png`._
