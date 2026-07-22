# 3 · Information architecture

Transcribed from the team's FigJam board (corrected version).

```mermaid
graph TD
  I[Intro] --> A[Add habit screen] --> H[Homepage]
  H --> GF[Group feed]
  H --> FL[Friends list]
  H --> TS[Tracking Screen] --> HS[Habit Selection]
  H --> C[Calendar]
  C --> An[Annually]
  C --> Mo[Monthly]
  C --> We[Weekly]
  H --> S[Settings]
  S --> P["Privacy settings<br/>• Profile visibility<br/>• Sync with contact"]
  S --> AC[Account settings] --> UE["Update email, password"]
  S --> N["Notification settings<br/>• channel: email / push notification<br/>• enabled: on/off"]
  S --> PF[Profile]
  PF --> ED["Edit display name, profile photo, bio, interests"]
  PF --> MG[Manage groups] --> CG[Category of group]
  PF --> MF[Manage friends] --> IF[Invite friends]
```

**Notes**

- Onboarding is Intro → Add habit → Homepage. The homepage fans out to Group feed, Friends
  list, the Tracking screen (→ Habit selection), Calendar (annually / monthly / weekly) and Settings.
- Settings holds Privacy, Account (→ update email/password), Notifications, and Profile
  (edit details, manage groups → category of group, manage friends → invite friends).
