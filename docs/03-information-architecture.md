# 3 · Information architecture

Transcribed from `raw files/Information Architecture.png`.

```mermaid
graph TD
  Intro[Intro] --> Add[Add habit screen]
  Add --> Home[Homepage: Group feed]
  Home --> Nav[Nav bar]

  Nav --> Feed[Group feed]
  Nav --> Track[Track habit]
  Track --> AddNew[Add new habit]
  Nav --> Stats[Personal stats]
  Stats --> Cal[Calendar]
  Cal --> CY[Annually]
  Cal --> CW[Weekly]
  Cal --> CM[Monthly]
  Nav --> Tracking[Tracking screen]
  Tracking --> HabitSel[Habit selection]
  Nav --> Settings[Settings]

  %% top-level concepts alongside the homepage
  Approve[Approve friend's habit]
  React[Interaction: reaction / celebrate consistency]
  CreateG[Create group]

  Settings --> Privacy[Privacy settings]
  Privacy --> PV[Profile visibility]
  Privacy --> SC[Sync with contact]
  Settings --> Account[Account settings]
  Account --> UEP[Update email / password]
  Settings --> Notif[Notification settings]
  Notif --> NCh[Channel: email / push notification]
  Notif --> NEn[Enabled: on / off]
  Settings --> Profile[Profile]
  Profile --> Edit[Edit display name, profile photo, bio, interests]
  Profile --> MG[Manage groups]
  MG --> CatG[Category of group]
  Profile --> MF[Manage friends]
  MF --> Invite[Invite friends]
```

**Notes**

- The homepage *is* the group feed; a nav bar fans out to Group feed, Track habit, Personal
  stats (→ Calendar: annually / weekly / monthly), Tracking screen (→ Habit selection) and Settings.
- "Approve friend's habit" and "Interaction: reaction / celebrate consistency" are called out
  as first-class concepts of the product, not buried screens.
