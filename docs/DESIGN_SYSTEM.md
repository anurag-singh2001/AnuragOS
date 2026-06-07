# DESIGN_SYSTEM.md

Last updated: 2026-05-30

---

# Purpose

Define the visual and interaction system for AnuragOS before implementation.

The design system should make the product feel like a modern engineering workspace: precise, calm, information-dense, and memorable through useful interaction rather than spectacle.

---

# Visual Inspiration

Use inspiration from:

* Linear: density, crisp surfaces, command-focused interaction.
* Vercel: restraint, strong hierarchy, developer credibility.
* Raycast: command palette behavior, keyboard-first utility, polished system feel.
* Stripe: clear technical storytelling and structured product surfaces.
* Notion: readable information architecture and calm content framing.

Avoid:

* Matrix styling.
* Green terminal themes.
* Cyberpunk visuals.
* Windows or Linux clone aesthetics.
* Fake hacker dashboards.
* Decorative animation that does not improve understanding.

---

# Typography

Primary UI font:

* Use a modern sans-serif.
* Prioritize readability and professional product feel.
* Avoid novelty display fonts.

Monospace font:

* Use only for command input, code-like labels, status IDs, and compact technical metadata.
* Do not let monospace typography dominate the whole product.

Type scale:

* Hero/system title: reserved for AnuragOS identity and top-level section titles.
* Section headings: compact and scannable.
* Body copy: readable, concise, recruiter-friendly.
* Metadata: small but legible.

Rules:

* No skill percentages.
* No overly large marketing headlines.
* No negative letter spacing.
* Text must fit on mobile and desktop.

---

# Colors

Color direction:

* Base: neutral dark or near-neutral workspace background.
* Surfaces: subtly separated panels, not heavy cards inside cards.
* Text: high-contrast primary text with quieter secondary text.
* Accents: restrained, functional color for status, focus, and active navigation.

Recommended roles:

* Primary text: near-white or deep neutral depending on theme.
* Secondary text: muted neutral.
* Border: subtle neutral divider.
* Accent: cool blue or cyan for active state and system focus.
* Success: green only for status indicators, not as the dominant theme.
* Warning: amber for incomplete data or planned work.
* Critical: red only for errors or unavailable states.

Rules:

* Do not use a green terminal palette.
* Do not make the UI one-note purple, slate, beige, or espresso.
* Use color as state and hierarchy, not decoration.

---

# Layout Grid

Desktop:

* Use a constrained central workspace with full-width bands where needed.
* Dashboard can use a 12-column grid.
* Primary content should support fast scanning.
* Featured deployments should be visible without deep scrolling.

Tablet:

* Collapse multi-column panels into two-column or stacked sections.
* Keep Recruiter Mode and Contact actions visible.

Mobile:

* Use a single-column flow.
* Navigation collapses into a compact menu or command trigger.
* Avoid horizontal overflow in terminal and wire-like panels.

Rules:

* No nested cards.
* Cards are for repeated items, modals, and contained tools.
* Page sections should not look like floating marketing cards.

---

# Spacing

Spacing should feel compact and product-like.

Recommended scale:

* 4px: tiny internal gaps.
* 8px: control spacing.
* 12px: compact panel spacing.
* 16px: default section padding.
* 24px: major panel separation.
* 32px: large section separation.
* 48px: rare top-level breathing room.

Rules:

* Prefer density with clarity.
* Avoid oversized landing-page whitespace.
* Keep recruiter scanning efficient.

---

# Motion Principles

Motion should:

* Guide attention.
* Signal system state changes.
* Make AnuragOS feel alive.
* Stay fast and interruptible.

Motion should not:

* Delay reading.
* Block navigation.
* Exist only as decoration.
* Create fake complexity.

Motion rules:

* Boot sequence maximum: 3-4 seconds.
* Boot sequence must be skippable.
* Respect reduced-motion preferences.
* Use short transitions for panel changes, command palette, Recruiter Mode, and deployment inspection.

---

# Components

Core components:

* App shell.
* Global navigation.
* Command palette trigger.
* System status bar.
* Section header.
* Deployment card.
* Deployment detail panel.
* Architecture summary panel.
* Timeline item.
* AI Lab entry.
* Terminal panel.
* Recruiter Mode panel.
* Contact link row.
* Resume CTA.

Component rules:

* Keep components small and single-purpose.
* Render content from structured data.
* Prioritize accessibility and keyboard support.
* Use icons for common actions when available.
* Avoid decorative components with no information value.

---

# Interaction Patterns

Primary interactions:

* Recruiter Mode activation.
* Deployment inspection.
* Command palette search.
* Terminal command execution.
* Timeline navigation.
* AI Lab filtering or exploration.

Rules:

* Every interaction should reveal useful information.
* Keyboard shortcuts should enhance, not replace, visible navigation.
* Recruiter Mode must remain one click away.
* Contact must remain obvious and direct.

---

# Accessibility

Requirements:

* Strong text contrast.
* Full keyboard navigation.
* Visible focus states.
* Reduced-motion support.
* Semantic heading order.
* Buttons and links must be clearly distinguishable.
* Terminal content must not be the only way to access information.

Target:

* Lighthouse Accessibility > 90.
