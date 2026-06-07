# USER_JOURNEYS.md

Last updated: 2026-05-30

---

# Purpose

Define the primary visitor journeys for AnuragOS.

Journeys are organized by visitor intent rather than page order.

---

# Recruiter Journey

## Goal

Evaluate Anurag within 30 seconds and decide whether to contact or view the resume.

## Path

```text
Dashboard
  -> Recruiter Mode
  -> Featured Deployments
  -> Resume
  -> Contact
```

## Visitor Questions

* Who is Anurag?
* What role does he fit?
* What has he built?
* What technologies does he use?
* How do I contact him?

## Required Experience

* Recruiter Mode visible above the fold.
* Current Software Engineer positioning is clear.
* Featured deployments show enterprise and AI systems.
* Resume and LinkedIn/email are one click away.

## Success Criteria

* Recruiter understands role fit in 30 seconds.
* Recruiter sees Energy CRM Platform, Multi-Tenant CRM Platform, PDF RAG System, and AI Ticket Assistant as proof points.
* Recruiter can contact Anurag without exploring Terminal.

---

# Engineering Manager Journey

## Goal

Assess system thinking, technical maturity, and production-oriented engineering experience.

## Path

```text
Dashboard
  -> Deployments
  -> Deployment Detail
  -> Experience
  -> Contact or Resume
```

## Visitor Questions

* Can Anurag work on real systems?
* Does he understand architecture and tradeoffs?
* Has he worked with enterprise workflows?
* Is his AI work practical or only exploratory?

## Required Experience

* Deployments are presented as systems, not generic cards.
* Architecture, tech stack, challenges, and outcomes are easy to inspect.
* Enterprise CRM and distributed systems work appear before older supporting projects.
* AI systems work is shown with clear current/planned/future status.

## Success Criteria

* Manager can identify credible system-building experience.
* Manager sees concrete technologies and architecture patterns.
* Manager has enough discussion points for an interview.

---

# Fellow Developer Journey

## Goal

Explore AnuragOS as a technical product and understand Anurag's engineering interests.

## Path

```text
Dashboard
  -> AI Lab
  -> Deployments
  -> Terminal
  -> Contact or GitHub
```

## Visitor Questions

* What is Anurag experimenting with?
* How is he thinking about AI systems?
* What systems has he built?
* Is the portfolio itself thoughtfully designed?

## Required Experience

* AI Lab shows PDF RAG, AI Ticket Assistant, AI coding agents, MCP, and agentic workflows.
* Terminal provides a useful alternate exploration mode.
* GitHub is available as a secondary contact/proof path.
* The interface feels polished but not gimmicky.

## Success Criteria

* Fellow developer finds technical depth and curiosity.
* Terminal adds delight without blocking normal navigation.
* AI Lab feels honest about current versus planned work.

---

# Power-User Terminal Journey

## Goal

Navigate AnuragOS quickly through commands.

## Path

```text
Dashboard or Terminal
  -> Open command palette or Terminal
  -> Run help
  -> Run deployments / ai / experience / resume / contact
  -> Jump to target section
```

## Supported Commands

```text
help
about
experience
deployments
ai
resume
contact
```

## Required Experience

* Commands mirror visible navigation.
* Terminal returns concise summaries and clear next actions.
* Command palette supports fast navigation without requiring a full terminal route.
* Terminal uses restrained styling and avoids green hacker aesthetics.

## Success Criteria

* Power users can move quickly.
* Non-power users lose no access to content.
* Command interactions reinforce the operating-system concept.
