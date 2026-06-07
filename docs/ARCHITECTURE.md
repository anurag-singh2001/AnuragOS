# ARCHITECTURE.md

# Architecture Principles

The application should be rebuilt from scratch.

The old portfolio architecture should not be reused.

Only content should be migrated.

---

# Technology Stack

Framework:

* Next.js

Language:

* TypeScript

Styling:

* Tailwind CSS

Components:

* Shadcn UI

Animation:

* Framer Motion

Visualization:

* React Flow

Deployment:

* Vercel

---

# Routing Structure

/

Dashboard

/deployments

/experience

/ai-lab

/timeline

/terminal

/resume

/contact

---

# Folder Structure

src/

components/
features/
layouts/
hooks/
lib/
data/
content/
types/

app/

---

# Data Strategy

Content should be data-driven.

Avoid hardcoded UI content.

Store:

* Projects
* Experience
* Skills
* Timeline
* AI Lab entries

as structured data.

---

# Component Principles

Components should:

* Have a single responsibility
* Be reusable
* Be small

Avoid:

* Large monolithic pages
* Deep prop drilling
* Premature abstractions

---

# Performance Rules

Target Lighthouse:

Performance > 90

Accessibility > 90

Best Practices > 90

SEO > 90

---

# Animation Rules

Animations should support storytelling.

Never create animations that slow navigation.

User control is more important than visual effects.
