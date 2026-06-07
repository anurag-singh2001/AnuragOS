# DECISIONS.md

Last updated: 2026-05-30

---

# Decision Records

## 001: Rebuild From Scratch

Status: Accepted

Decision:

AnuragOS will be rebuilt from scratch. The current static terminal portfolio will not be used as the application foundation.

Reasoning:

The legacy architecture is tightly coupled to a terminal-only DOM implementation. The product vision calls for an Engineering Command Center, not a terminal clone or Bootstrap-style portfolio.

Consequences:

* Legacy code remains useful only for content extraction.
* A fresh Next.js TypeScript app should be created.
* Old UI, styling, layout, and script architecture should not be preserved.

---

## 002: Content-First Data Model

Status: Accepted

Decision:

Projects, experience, skills, timeline entries, profile information, and AI Lab content should be stored as structured data.

Reasoning:

Data-driven content keeps the product easier to evolve and prevents copy from becoming trapped inside UI components.

Consequences:

* Early implementation should include content types and data files.
* UI components should render from structured records.
* Content gaps can be tracked explicitly.

---

## 003: Terminal As Secondary Interaction

Status: Accepted

Decision:

The Terminal feature should remain part of the product, but it should be an alternate exploration method rather than the full interface.

Reasoning:

The current portfolio proves command interaction can be memorable, but the docs explicitly warn against terminal clones and hacker-dashboard aesthetics. Recruiters and engineering managers need fast scanning paths.

Consequences:

* Dashboard becomes the primary route.
* Terminal supports commands such as `help`, `about`, `experience`, `deployments`, `ai`, `resume`, and `contact`.
* Terminal design should be restrained and integrated into the command-center metaphor.

---

## 004: Defer Live Integrations

Status: Accepted

Decision:

Live GitHub analytics, AI assistant, voice interface, quote APIs, and other external integrations are deferred until after MVP.

Reasoning:

The MVP must first prove the narrative, content structure, and recruiter experience. External integrations add complexity and can distract from the core story.

Consequences:

* No external API keys should be included in the MVP.
* AI Lab can describe experiments without requiring live services.
* Future integrations can be added after the static experience is strong.

---

## 005: Dashboard As Primary Entry Point

Status: Accepted

Decision:

The Dashboard will be the primary entry point for AnuragOS.

Reasoning:

The Dashboard best supports the product goal of feeling like an Engineering Command Center while still letting visitors understand the core story quickly. It can combine identity, current focus, system status, featured deployments, experience, AI Lab, and recruiter entry points in one scannable surface.

Consequences:

* `/` should prioritize useful overview content over a marketing hero.
* Dashboard content must be structured for both exploration and scanning.
* Boot sequence must transition quickly into Dashboard readiness.

---

## 006: Shallow MVP Navigation

Status: Accepted

Decision:

MVP navigation will use a shallow route structure: Dashboard, Deployments, Experience, AI Lab, Terminal, Resume, Contact, and Recruiter Mode.

Reasoning:

The portfolio must be easy to evaluate. Deep navigation would hide evidence and increase implementation complexity before the core story is proven.

Consequences:

* `/timeline` remains optional unless Experience becomes too dense.
* `/system-map` remains deferred until after MVP.
* Project detail pages are allowed because deployments need case-study depth.

---

## 007: Recruiter Mode As High-Priority Evaluation Path

Status: Accepted

Decision:

Recruiter Mode will be treated as a primary product path, not a secondary page.

Reasoning:

Project success requires a recruiter to evaluate Anurag within 30 seconds. Recruiter Mode directly supports this requirement by compressing experience, skills, strongest projects, resume, and contact into one flow.

Consequences:

* Recruiter Mode must be globally visible.
* Presentation pattern is resolved by Decision 011: global overlay/modal for MVP.
* Content accuracy and resume availability are blockers for final Recruiter Mode quality.

---

## 008: Content Migration Overrides Legacy Inventory

Status: Accepted

Decision:

`CONTENT_MIGRATION.md` is the canonical content direction for AnuragOS. The old portfolio remains historical context, but the new content model should prioritize current professional, enterprise, distributed systems, and AI systems work.

Reasoning:

The legacy portfolio represents student-era positioning. AnuragOS should reposition Anurag as a Software Engineer, Enterprise Systems Builder, and AI Systems Builder.

Consequences:

* Legacy student projects should not be featured in Recruiter Mode.
* Enterprise CRM, distributed systems, PDF RAG, and AI automation deployments become the core proof layer.
* Content gaps should be resolved from resume and professional experience, not inferred from the old portfolio.

---

## 009: Schema Before Implementation Types

Status: Accepted

Decision:

Content schemas must be defined in an implementation-agnostic documentation layer before TypeScript interfaces, data files, or UI components are created.

Reasoning:

The content model determines the product story. Defining it before code prevents the implementation from inheriting weak legacy structures or premature technical assumptions.

Consequences:

* `CONTENT_SCHEMA.md` is the source for future content types.
* Implementation must translate these schemas into code only after implementation approval.
* Required and optional fields are now explicit for each content type.

---

## 010: Design System Before UI Implementation

Status: Accepted

Decision:

`DESIGN_SYSTEM.md` defines the visual foundation for AnuragOS before any UI implementation begins.

Reasoning:

The portfolio must avoid becoming a generic dashboard or terminal clone. A documented design system keeps typography, color, spacing, motion, and components aligned with the Engineering Command Center vision.

Consequences:

* UI implementation should follow `DESIGN_SYSTEM.md`.
* Linear, Vercel, Raycast, Stripe, and Notion remain inspiration references.
* Matrix, hacker, green-terminal, and OS-clone aesthetics remain rejected.

---

## 011: Recruiter Mode MVP Pattern

Status: Accepted

Decision:

Recruiter Mode will be implemented as a global overlay/modal for MVP.

Reasoning:

Recruiter Mode must be one click away without forcing visitors into a separate navigation path. A global overlay supports fast evaluation while preserving page context.

Consequences:

* Recruiter Mode should be globally accessible from the app shell.
* It must include headline, key points, featured deployments, core technologies, resume CTA, and contact CTA.
* It should not depend on Terminal.

---

## 012: Terminal And Command Palette Pattern

Status: Accepted

Decision:

Terminal will exist as a full route, and a command-palette style interaction should provide fast global navigation.

Reasoning:

This preserves the interactive spirit of the old portfolio without making the entire product a terminal clone.

Consequences:

* All terminal-accessible content must also be reachable through visible navigation.
* Terminal styling must remain restrained.
* Command palette should prioritize navigation and recruiter-friendly shortcuts.

---

## 013: Timeline MVP Placement

Status: Accepted

Decision:

Timeline will live inside Experience for MVP.

Reasoning:

Keeping Timeline inside Experience reduces route complexity and keeps the career narrative in one obvious place.

Consequences:

* `/timeline` is deferred.
* Experience owns education, career, achievement, and learning events.

---

## 014: Milestone 1 Scaffold Location

Status: Accepted

Decision:

The fresh Next.js application should be scaffolded at repository root during Milestone 1, after archiving the legacy static implementation files.

Reasoning:

The old codebase is not the foundation. Root scaffold keeps the final project clean while preserving legacy files as content/reference material.

Consequences:

* Legacy static files should be moved into an archive/reference location during implementation.
* `/docs` must be preserved.
* No scaffold should begin until implementation is explicitly requested.

---

## 015: Public Contact Policy

Status: Accepted

Decision:

The phone number from the resume should not appear on the public AnuragOS website.

Reasoning:

LinkedIn and email are sufficient professional contact paths and reduce unnecessary public exposure of personal contact information.

Consequences:

* Contact surfaces should prioritize LinkedIn and email.
* GitHub remains secondary proof/contact context.
* Phone number may remain in the private resume PDF if the owner chooses, but should not be rendered as site content.

---

## 016: CRM Deployment Public Detail Policy

Status: Accepted

Decision:

CRM deployments should use only the content already described in the resume unless expanded public-safe details are explicitly approved later.

Reasoning:

The CRM platforms are professional enterprise work. The public portfolio should communicate the engineering value without inventing links, screenshots, diagrams, metrics, or architecture details beyond what is safe and already resume-backed.

Consequences:

* Energy CRM Platform and Multi-Tenant CRM Platform should not include public links by default.
* No CRM screenshots or detailed architecture diagrams should be added by default.
* Resume-backed claims, including the approximately 25% backend/workflow improvement, can be used carefully.
