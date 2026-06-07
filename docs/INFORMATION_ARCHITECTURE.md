# INFORMATION_ARCHITECTURE.md

Last updated: 2026-05-30

---

# Purpose

Define the navigation, route, content, and data hierarchy for AnuragOS.

This document separates structural decisions from visual wireframes and implementation details.

---

# Navigation Hierarchy

Primary navigation:

```text
AnuragOS
Deployments
Experience
AI Lab
Terminal
Resume
Contact
Recruiter Mode
```

Navigation rules:

* `AnuragOS` returns to Dashboard.
* Recruiter Mode is the primary global action.
* Resume and Contact must stay easy to reach.
* Terminal is secondary, not the core navigation model.
* Mobile navigation should collapse into a compact menu with Recruiter Mode preserved as a prominent action.

---

# Route Hierarchy

MVP routes:

```text
/                  Dashboard
/deployments       Deployment index
/deployments/[id]  Deployment detail
/experience        Experience and timeline
/ai-lab            AI exploration
/terminal          Command exploration
/resume            Resume and recruiter summary
/contact           Contact paths
```

Deferred routes:

```text
/system-map        Interactive system map
/assistant         AI assistant
/analytics         Live GitHub analytics
```

Route decisions:

* Timeline lives inside `/experience` for MVP.
* Recruiter Mode should be implemented as a global modal or overlay, not a separate required route.
* Deployment detail pages are allowed because system case studies need depth.

---

# Content Hierarchy

Primary content:

```text
Profile
Recruiter Summary
Featured Deployments
Experience
AI Lab
Contact
```

Secondary content:

```text
Supporting Deployments
Timeline Events
Skills
Achievements
Certificates
Terminal Commands
```

Deferred content:

```text
AI Assistant
Live GitHub Analytics
Voice Interface
Interactive System Map
```

Featured deployments:

* Energy CRM Platform
* Multi-Tenant CRM Platform
* PDF RAG System
* AI Ticket Assistant

Supporting deployments:

* AgriMart
* AI Resume Analyzer

Content rules:

* Legacy student projects are not part of featured content.
* Recruiter-facing content must use current professional positioning.
* AI Lab content must distinguish current, planned, and future work.
* Contact content prioritizes LinkedIn and email.

---

# Data Hierarchy

Canonical data groups:

```text
Profile
  Contact Links
  Recruiter Summary

Experience
  Achievements
  Related Deployments
  Timeline Events

Deployments
  Skills
  Architecture
  Challenges
  Outcomes
  Links

Skills
  Categories
  Related Deployments

AI Lab Entries
  Status
  Evidence
  Related Deployments

Timeline Events
  Education
  Career
  Achievement
  Learning

Certificates
  Issuer
  Year
  Credential Link
```

Data rules:

* Content is structured before UI implementation.
* Unknown values are marked as gaps, not invented.
* Public-safe wording is required for enterprise work.
* Deployment priority determines Dashboard and Recruiter Mode visibility.

---

# Cross-Linking Model

```text
Dashboard -> Recruiter Mode
Dashboard -> Featured Deployments
Dashboard -> AI Lab
Dashboard -> Experience

Recruiter Mode -> Resume
Recruiter Mode -> Contact
Recruiter Mode -> Featured Deployments

Deployments -> Deployment Detail
Deployment Detail -> Skills
Deployment Detail -> AI Lab when relevant

Experience -> Timeline Events
Experience -> Resume

AI Lab -> Related Deployments
Terminal -> Same destinations as visible navigation
```

Rules:

* No important content should be reachable only through Terminal.
* Dashboard must provide the fastest overview.
* Recruiter Mode must provide the fastest evaluation path.
