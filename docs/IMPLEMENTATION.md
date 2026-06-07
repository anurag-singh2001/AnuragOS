# IMPLEMENTATION.md

# AnuragOS Implementation Plan

Last updated: 2026-05-30

---

# Project Overview

AnuragOS is a full rebuild of the existing portfolio into an interactive Engineering Command Center. The current repository is a legacy static terminal portfolio and should be used only as a source for identity, projects, skills, and contact information.

The product should communicate that Anurag Singh builds real software systems, understands engineering tradeoffs, and is actively moving toward AI systems work.

---

# Current Status

Phase: Phase 3 (Engineering Graph & Context Inspector) complete.

Foundation implementation has started and stopped after Milestone 1.

Completed:

* Read all existing files in `/docs`.
* Inspected repository structure.
* Reviewed legacy HTML, CSS, and JavaScript.
* Extracted reusable content candidates.
* Identified technical debt and discard candidates.

Completed in Milestone 1:

* Legacy static implementation archived.
* Fresh Next.js foundation created at repository root.
* TypeScript configured.
* Tailwind CSS configured.
* ESLint configured.
* Prettier configured.
* Shadcn UI foundation configured.
* Framer Motion dependency added.
* Folder structure established.
* App shell architecture created.

Completed in Milestone 2:

* Shared implementation content types created.
* Profile, deployments, experience, skills, timeline, AI Lab, achievements, certificates, and recruiter summary data created.
* Deployment data includes all featured and supporting deployments from the resume-backed content plan.
* CRM deployment content remains public-safe and resume-described only.
* Remaining content gaps are represented as explicit notes or placeholder values rather than invented claims.

Completed in Milestone 3:

* Dashboard MVP built from structured content data.
* Product shell navigation upgraded from static labels to route links.
* Header now includes dashboard status, LinkedIn action, and recruiter entry.
* Dashboard renders identity, recruiter snapshot, featured deployments, system status, core stack, AI Lab preview, and command layer preview.
* Full section routes and interaction layer remain deferred.

Completed in Milestone 4:

* Dashboard website implementation removed from the active homepage path.
* Workspace Shell foundation implemented.
* Global state model implemented for boot state, active module, active overlay, active inspector, selected deployment, selected career event, current focus area, and system status.
* Module state management implemented for Overview, Deployments, Career Journey, AI Lab, Resume, Contact, and Terminal.
* Overlay Host foundation implemented without starting Launchpad, Command Palette, Recruiter Mode, or Terminal Drawer.
* Workspace Memory implemented with localStorage only.
* System Status Layer implemented through system bar, status rail, and active workspace region.
* Framer Motion used only for subtle status value updates.

Milestone 4 shell redesign:

* Created `WORKSPACE_REDESIGN.md`.
* Removed development-oriented status presentation from the visible shell.
* Replaced raw state codes with human-readable context.
* Made Deployments the default first-time workspace focus.
* Replaced static module rail dominance with Quick Actions.
* Reduced visible navigation.
* Added Featured Systems discovery surface without implementing the Deployments module.
* Kept Launchpad, Command Palette, Recruiter Mode, Terminal Drawer, and content modules deferred.

Still missing for later milestones:

* Launchpad.
* Command Palette.
* Recruiter Mode overlay.
* Terminal Drawer.
* Core section pages.
* Verified impact metrics, certificate metadata, and remaining non-CRM public links.

---

# Repository Analysis

## Current Architecture

The legacy site was a static browser-only terminal interface and is now archived in `legacy/old-static-portfolio`:

* `index.html` owns the shell structure, metadata, and script loading.
* `styles.css` provides global terminal styling.
* `index.js` handles command parsing, command history, autocomplete, link opening, synchronous HTML fragment loading, and quote fetching.
* `loading.js` handles the ASCII boot animation.
* `commands/about.html`, `commands/project.html`, and `commands/contact.html` hold content fragments loaded into the terminal.

The active root now contains the Milestone 1 Next.js foundation:

* `package.json` and `package-lock.json`
* `src/app`
* `src/components`
* `src/features`
* `src/layouts`
* `src/hooks`
* `src/lib`
* `src/data`
* `src/content`
* `src/types`
* Tailwind, ESLint, Prettier, Shadcn UI, and Next configuration files.

## Current Strengths

* The site already experiments with interactive navigation instead of a plain resume page.
* The terminal concept proves there is appetite for a portfolio that feels navigable.
* Useful content exists for projects, skills, links, and contact information.
* The boot sequence idea aligns loosely with AnuragOS, though its execution should be replaced.
* The project list includes algorithmic, real-time communication, browser AI, and game AI examples that can be reframed as engineering systems.

## Current Weaknesses

* The product is a terminal clone, which the new vision explicitly wants to avoid.
* UI is hardcoded DOM manipulation rather than a maintainable app architecture.
* Content is mixed with presentation markup.
* Synchronous XHR blocks the browser and should not be reused.
* `index.js` includes an exposed third-party API key for quote fetching.
* Several files show character encoding corruption in ASCII art and symbols.
* The current copy is student-era and does not yet express enterprise engineering or AI systems maturity.
* The `/commands/ascii.js` script is referenced but missing.
* Accessibility, SEO, responsive layout, and recruiter scanning are weak.
* There is no data model for projects, experience, skills, or timeline entries.

## Content To Migrate

Identity:

* Name: Anurag Singh.
* Positioning: software engineer, full-stack developer, enterprise systems builder, AI systems builder.

Contact:

* Email: `anuragrazarwal@gmail.com`
* GitHub: `https://github.com/anurag-singh2001`
* LinkedIn: `https://www.linkedin.com/in/anurag-singh-2001/`
* Twitter/X: `https://twitter.com/Anuragsingh3935`

Skills and technology hints:

* C/C++
* Python
* JavaScript
* React.js
* Node.js
* Django
* MERN stack
* TensorFlow
* TensorFlow.js
* Machine learning
* Data science
* Full-stack web development
* WebRTC

Historical legacy projects:

* Sorting Visualizer
* My Meet App
* Motion Control Snake Game
* A.I TicTacToe Game

These should remain historical source material only. They are superseded by the deployment strategy in `CONTENT_MIGRATION.md`.

Featured deployments:

* Energy CRM Platform
* Multi-Tenant CRM Platform
* PDF RAG System
* AI Ticket Assistant

Supporting deployments:

* AgriMart
* AI Resume Analyzer

Narrative:

* UPES
* PG-DAC
* Software Engineer
* Enterprise Systems
* AI Systems Builder

## Code To Discard

Discard as foundation:

* Legacy terminal-only layout.
* Current HTML document structure.
* Current global CSS theme.
* Current command parser implementation.
* Current synchronous content loading.
* Current ASCII-heavy boot animation.
* Current quote API feature and exposed key.
* Existing DOM scripting architecture.

Possible conceptual reuse:

* A lightweight command palette or terminal-inspired interaction as one optional exploration mode.
* A brief skippable boot sequence as product onboarding.
* Command names as inspiration for AnuragOS navigation labels.

---

# Recommended Architecture

Use a fresh Next.js application with TypeScript, Tailwind CSS, Shadcn UI, and Framer Motion. Keep the first implementation intentionally small and data-driven.

Recommended structure:

```text
src/
  app/
    page.tsx
    deployments/
    experience/
    ai-lab/
    terminal/
    resume/
    contact/
  components/
    ui/
    layout/
    command-center/
  features/
    boot/
    dashboard/
    deployments/
    experience/
    ai-lab/
    recruiter-mode/
    terminal/
  data/
    profile.ts
    projects.ts
    experience.ts
    skills.ts
    timeline.ts
    ai-lab.ts
  types/
  lib/
```

Architecture rules:

* Treat content as structured data first.
* Build the dashboard as the primary surface.
* Make Terminal an alternate navigation tool, not the whole product.
* Keep routes shallow and obvious.
* Prefer static rendering unless a feature clearly needs runtime data.
* Defer live integrations until the core story is strong.

---

# Product Direction

The first screen should feel like a working engineering console, not a landing page. It should show:

* Current role and focus.
* System status summary.
* Primary navigation into Deployments, Experience, AI Lab, Resume, and Contact.
* Recruiter Mode as a fast evaluation path.

The tone should be modern, precise, and calm. Avoid green terminal nostalgia, Matrix styling, fake system noise, and animations that delay reading.

---

# Feature Breakdown

## Boot Sequence

* Maximum 3-4 seconds.
* Skippable.
* Should introduce AnuragOS without becoming the product.
* Should transition directly into dashboard readiness.

## Dashboard

* Central hub.
* Current focus.
* Experience summary.
* Highlighted deployments.
* AI Lab preview.
* Recruiter Mode entry.

## Deployments

* Project cards presented as deployed systems.
* Each project should include problem, architecture, technologies, challenges, and outcomes.
* Featured deployments should prioritize enterprise systems, distributed systems, and AI systems from `CONTENT_MIGRATION.md`.

## Experience

* Timeline of UPES, PG-DAC, Software Engineer, Enterprise Systems, AI Systems Builder.
* Must be updated with accurate professional details before final build.

## AI Lab

* Current exploration around Claude Code, AI agents, RAG, MCP, and experiments.
* Should communicate trajectory without overstating production experience.

## Terminal

* Interactive command layer.
* Commands: `help`, `about`, `experience`, `deployments`, `ai`, `resume`, `contact`.
* Should complement navigation and support power-user exploration.

## Recruiter Mode

* One-click compressed summary.
* Must answer: experience, skills, strongest projects, resume, and contact.
* Target evaluation time: 30 seconds.

---

# Milestones

## Milestone 0: Planning Baseline

* Create project lifecycle docs.
* Create implementation plan.
* Capture content inventory.
* Identify decisions and backlog.

## Milestone 1: Fresh App Scaffold

Status: Complete

* Create Next.js TypeScript app.
* Add Tailwind CSS, Shadcn UI, Framer Motion.
* Establish folder structure.
* Add linting and formatting.

## Milestone 2: Content Model

Status: Complete

* Define types for profile, projects, experience, skills, timeline, and AI Lab.
* Convert legacy content into structured seed data.
* Flag missing content.

## Milestone 3: Product Shell

Status: Complete

* Build App Shell and Dashboard.
* Add primary navigation.
* Add visual system tokens.
* Create responsive layout.

## Milestone 4: Core Sections

Original scope paused.

Revised status: Workspace Shell + State Architecture complete.

Completed:

* Workspace Shell.
* Global State Model.
* Module State Management.
* Overlay Host.
* Workspace Memory.
* System Status Layer.

Not started:

* Deployments.
* Experience.
* AI Lab.
* Resume.
* Contact.
* Launchpad.
* Command Palette.
* Recruiter Mode.

## Milestone 5: Interaction Layer

* Add boot sequence.
* Add Terminal command surface.
* Add Recruiter Mode.

## Milestone 6: Quality Pass

* Accessibility pass.
* Performance pass.
* Content accuracy review.
* Mobile and desktop verification.
* SEO metadata.

## Milestone 7: Deployment

* Prepare Vercel deployment.
* Verify production build.
* Final content review.

---

# Development Phases

1. Planning and content extraction.
2. App scaffold and baseline architecture.
3. Data modeling and content migration.
4. Dashboard MVP.
5. Section implementation.
6. Interaction and polish.
7. Verification and deployment.

---

# Risks

* Outdated legacy copy may underrepresent current engineering experience.
* The command-center concept can become gimmicky if visual hierarchy is weak.
* Over-animation can reduce recruiter clarity.
* Reusing terminal aesthetics too heavily would violate the product vision.
* Project claims need evidence and accurate links.
* Live integrations could distract from the MVP.
* Missing resume content may block Recruiter Mode completion.

---

# Dependencies

Planned:

* Next.js
* TypeScript
* Tailwind CSS
* Shadcn UI
* Framer Motion
* React Flow, only if architecture maps need interactive graph views in MVP

Deferred:

* AI assistant
* Voice interface
* Live GitHub analytics
* External quote APIs
* Backend services

---

# Acceptance Criteria

MVP is acceptable when:

* A visitor can understand who Anurag is, what he builds, how he thinks, and where he is heading within 3 minutes.
* Recruiter Mode communicates experience, skills, projects, resume, and contact within 30 seconds.
* Legacy content has been migrated into structured data.
* The UI feels like an engineering command center, not a terminal clone.
* Boot sequence is skippable and never exceeds 4 seconds.
* Lighthouse targets are above 90 for Performance, Accessibility, Best Practices, and SEO.
* The site works well on mobile and desktop.
* No exposed API keys or unnecessary third-party calls are present.
* Production build succeeds.

---

# Milestone 1 Verification

Passed:

* `npm.cmd run build`
* `npm.cmd run lint`
* `npm.cmd run format:check`

Notes:

* `npm.cmd install` completed after network approval.
* `npm install` reported 2 moderate dependency vulnerabilities.
* `npm.cmd audit --omit=dev` could not complete because the npm audit endpoint returned an error.

---

# Milestone 2 Verification

Passed:

* `npm.cmd run build`
* `npm.cmd run lint`
* `npm.cmd run format:check`

---

# Milestone 3 Verification

Passed:

* `npm.cmd run build`
* `npm.cmd run lint`
* `npm.cmd run format:check`

---

# Milestone 4 Verification

Passed:

* `npm.cmd run build`
* `npm.cmd run lint`
* `npm.cmd run format:check`
* Runtime smoke test on `http://localhost:3101`

Shell redesign verification passed:

* `npm.cmd run build`
* `npm.cmd run lint`
* `npm.cmd run format:check`
* Runtime smoke test on `http://localhost:3102`

---

# Next Recommended Task

Begin the next milestone only when explicitly requested.

Recommended next focus: implement one interaction layer at a time, starting with Launchpad or Command Palette, before building content pages.
