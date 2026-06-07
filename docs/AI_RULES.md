# AI_RULES.md

## Project Overview

This project is a complete redesign of my existing portfolio into an interactive experience called **AnuragOS**.

The goal is NOT to build a traditional portfolio website.

The goal is to build a memorable, interactive Engineering Operating System that tells the story of my journey:

UPES → PG-DAC → Software Engineer → AI Systems Builder

The portfolio should feel like a product, not a resume.

---

# Core Principles

## 1. Think Before Building

Before implementing anything:

* Understand the request fully.
* State assumptions.
* Identify ambiguities.
* Ask questions if needed.
* Do not silently make product decisions.

If multiple solutions exist:

* Present options.
* Explain tradeoffs.
* Recommend one.

Do not immediately generate code.

---

## 2. Product First, Code Second

The objective is user experience.

Every feature must answer:

"Does this make the portfolio more engaging, memorable, or useful?"

If not:

Do not build it.

---

## 3. Simplicity Wins

Prefer:

* Less code
* Fewer dependencies
* Fewer abstractions
* Smaller components

Avoid:

* Premature optimization
* Overengineering
* Enterprise patterns without need
* Configurability that isn't required

If a solution feels complicated, propose a simpler one.

---

## 4. Build Incrementally

Never attempt to build the entire application in one step.

Work in small milestones.

Each milestone should:

* Be independently testable
* Be independently reviewable
* Deliver visible progress

---

## 5. Preserve Existing Content

The old portfolio contains valuable information.

Reuse whenever possible:

* Projects
* Education
* Experience
* Contact Information
* Social Links

Modernize presentation.

Do not discard useful content.

---

# UX Principles

## The Portfolio Must Feel Like

* An Engineering Workspace
* A Developer Command Center
* A Modern Operating System
* A Product Experience

## The Portfolio Must NOT Feel Like

* A resume template
* A Bootstrap portfolio
* A hacker dashboard
* A Windows clone
* A Linux terminal clone
* A cyberpunk gimmick

---

# Design Principles

Use inspiration from:

* Vercel
* Linear
* Raycast
* Stripe
* Notion

Avoid inspiration from:

* Matrix
* Retro hacker themes
* Green terminal clones
* Overly flashy animations

---

# Animation Rules

Animations should:

* Guide attention
* Improve storytelling
* Feel smooth

Animations should NOT:

* Delay interaction
* Block navigation
* Exist for decoration only

Maximum boot sequence:

3-4 seconds.

---

# Content Rules

The portfolio should emphasize:

1. Software Engineering
2. Full Stack Development
3. Enterprise Experience
4. System Design
5. AI Engineering Journey

The portfolio should NOT emphasize:

* Beginner projects first
* Skill percentages
* Buzzwords without proof

Show evidence through projects.

---

# Technical Rules

Prefer:

* Next.js
* TypeScript
* Tailwind CSS
* Shadcn UI
* Framer Motion

Keep architecture simple.

Avoid introducing libraries unless they provide clear value.

---

# Coding Rules

When modifying code:

* Touch only necessary files.
* Explain why changes are needed.
* Remove unused code introduced by your changes.
* Do not perform unrelated refactors.

Every implementation should include:

1. Goal
2. Plan
3. Implementation
4. Verification

---

# Feature Evaluation Framework

Before suggesting a feature ask:

1. Does it support the AnuragOS vision?
2. Does it improve recruiter experience?
3. Does it improve storytelling?
4. Is it worth the complexity?

If the answer is "no" to most questions:

Do not recommend the feature.

---

# Success Criteria

The final portfolio should make visitors think:

"This person builds real software systems."

Not:

"This person built a portfolio website."

Every design and engineering decision should move toward that outcome.

## Documentation First Rule

Before implementing any feature:

1. Read all files inside docs/.
2. Verify the feature aligns with PROJECT_VISION.md.
3. Verify the feature is listed in PRODUCT_REQUIREMENTS.md.
4. Check SESSION.md for current progress.
5. Update SESSION.md after completing work.

Never begin implementation without reading project documentation.