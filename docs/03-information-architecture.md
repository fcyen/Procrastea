# 3 · Information architecture

> Reconstructed from the board's IA diagram (`design-source/figjam-board-full.png`) plus
> the realized wireframes. Labels are best-effort — **verify against the source**, especially
> the deeper Settings nodes which were low-resolution in the export.

```mermaid
graph TD
  App[Procrastea]

  App --> Onb[Onboarding]
  Onb --> Intro[Intro / value prop]
  Onb --> SignUp[Sign up]
  Onb --> LogIn[Log in]

  App --> Home[Home]
  Home --> Stats2[Today's stats: done / streak / completion]
  Home --> Today[Today's habit cards]
  Home --> FriendAct[Friend activity + approve]
  Home --> AddHabit[Add habit]
  AddHabit --> Templates[Habit templates]
  Templates --> Customize[Customize habit: name / cover photo / repeat]

  App --> Log[Log a habit]
  Log --> Camera[Camera - snap proof]
  Camera --> Which[Which habit?]
  Which --> Logged[Logged + share]

  App --> Group[Group]
  Group --> Feed[Group feed]
  Feed --> Proof[Proof detail: approve / reject / react]
  Group --> Groups[Groups list]
  Groups --> NewGroup[Create group]
  Group --> Friends[Friends list]
  Friends --> AddFriend[Add friend: search / QR]

  App --> StatsScreen[Statistics]
  StatsScreen --> Heat[Per-habit heatmaps: streak / completion / logs]

  App --> Settings[Settings]
  Settings --> Profile[Profile]
  Settings --> Privacy[Privacy: visibility / sync contacts / requests]
  Settings --> Notif[Notifications: channels / reminders / approvals]
  Settings --> Account[Account: email / password / delete]
  Settings --> GF[Groups & friends]
```

_Verify labels against `design-source/figjam-board-full.png`._
