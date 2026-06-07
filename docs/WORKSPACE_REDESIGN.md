# WORKSPACE_REDESIGN.md

Last updated: 2026-05-30

---

# Purpose

Refine the Milestone 4 Workspace Shell before implementing Launchpad or Command Palette.

The current Milestone 4 implementation is technically correct, but the product still feels like a developer dashboard because it exposes internal state too directly and gives every module equal navigational weight.

This redesign keeps the approved state architecture but changes the presentation model.

---

# Current Problem

The Workspace Shell currently communicates:

* State machine.
* Module list.
* Status labels.
* Implementation boundary.
* Developer-facing diagnostics.

That is useful for implementation, but it is not the right first impression for a portfolio experience.

The visitor should not feel like they are debugging AnuragOS. They should feel invited to explore Anurag's strongest engineering proof.

---

# Product Questions

## What Would Make A First-Time Visitor Immediately Explore?

The first interaction should present a clear object of curiosity:

* "Inspect the systems Anurag has built."
* "Start with enterprise CRM platforms or AI systems."
* "Follow the engineering journey."

Exploration begins when the interface gives visitors a small set of meaningful actions instead of a static navigation list.

Best first-time prompts:

* Inspect featured systems.
* Follow the career path.
* See current AI systems direction.
* Open recruiter-ready summary later when Recruiter Mode exists.

## What Content Deserves Prominence?

Most prominent:

* Featured Deployments.
* Current professional role.
* Enterprise systems and AI systems positioning.
* Public-safe CRM proof.
* PDF RAG System and AI Ticket Assistant as AI direction proof.

Secondary:

* Career Journey.
* AI Lab.
* Resume.
* Contact.

Deferred or hidden until requested:

* Raw state labels.
* Full module list.
* Boot state.
* Overlay state.
* Inspector state.
* Keyboard shortcut inventory.
* Implementation boundaries.

## What Can Remain Hidden Until Requested?

Hidden by default:

* Internal state machine values.
* Full diagnostics.
* All module labels at once.
* Disabled controls for future features.
* Raw `workspace.ready`-style codes.

Still available indirectly:

* System status can be represented as human-readable context.
* Memory can be represented as "Last opened" and "Recently viewed".
* Technical state can remain in code and docs, not the main UI.

---

# Redesign Goals

## 1. Remove Development-Oriented Status Presentation

Remove visible raw labels such as:

* `bootState`
* `activeOverlay`
* `activeInspector`
* `systemStatus`
* `module.deployments.active`

Replace with human-readable context:

* Workspace ready.
* Exploring systems.
* Reviewing career path.
* AI systems focus.
* Contact path ready.

## 2. Replace Machine-State Labels With Human-Readable Context

Internal state remains unchanged.

Presentation changes:

```text
workspace.ready
  -> Workspace ready

module.deployments.active
  -> Exploring featured systems

inspector.deployment.open
  -> Inspecting a deployment

mode.recruiter.active
  -> Recruiter view active
```

## 3. Make Deployments The Primary Focus

The default workspace should lead with systems, not an abstract overview.

Default focus:

* `activeModule: deployments`
* Current focus: enterprise systems.
* Primary heading: "Inspect Anurag's strongest systems."

Reason:

* Deployments are the proof layer.
* Recruiters and engineering managers need evidence quickly.
* The OS metaphor becomes stronger when there is something to inspect.

## 4. Introduce Quick Actions Instead Of Static Navigation

Replace the module rail as the dominant interaction with Quick Actions:

* Inspect enterprise systems.
* Inspect AI systems.
* Follow career journey.
* Review contact path.

Quick Actions should update workspace state, not navigate to pages.

## 5. Reduce Visible Navigation

Keep persistent controls minimal:

* AnuragOS identity.
* Human-readable status.
* Primary quick action.
* Reset only if needed, visually quiet.

Avoid showing all modules as equal top-level nav.

## 6. Increase Discovery And Exploration

The shell should show:

* A primary exploration prompt.
* Featured systems as selectable starting points.
* A memory hint if something was viewed before.
* "Next paths" that invite movement.

The visitor should wonder what happens when they select a system.

---

# Redesigned Workspace Shape

```text
+--------------------------------------------------------------------------------+
| AnuragOS                                      Workspace ready      [Explore]    |
+--------------------------------------------------------------------------------+
| Context                                                                        |
| Current focus: Enterprise systems                                              |
| Last opened: Deployments                                                       |
| Recently viewed: PDF RAG System                                                |
+--------------------------------------------------------------------------------+
| Inspect Anurag's strongest systems                                             |
| Enterprise CRM platforms, distributed workflows, and applied AI systems.        |
|                                                                                |
| Featured Systems                                                               |
| > Energy CRM Platform          Enterprise Systems                              |
|   Multi-Tenant CRM Platform    Distributed Systems                             |
|   PDF RAG System               AI Systems                                      |
|   AI Ticket Assistant          AI Automation                                   |
|                                                                                |
| Quick Actions                                                                  |
| [Inspect Enterprise Systems] [Inspect AI Systems] [Follow Career Path]         |
| [Review Contact Path]                                                          |
+--------------------------------------------------------------------------------+
```

---

# Implementation Boundary

This redesign may implement:

* Human-readable system status presentation.
* Quick Actions that update existing workspace state.
* Deployment-first default shell.
* Workspace memory display in visitor-friendly language.
* Reduced visible navigation.
* Discovery-focused active workspace copy.

This redesign must not implement:

* Launchpad.
* Command Palette.
* Recruiter Mode overlay.
* Deployment module content.
* Deployment detail inspector UI.
* AI Lab module.
* Career Journey module.
* Resume or Contact pages.

---

# Acceptance Criteria

The redesigned shell is acceptable when:

* The first screen leads with systems to inspect.
* Internal state values are not the primary visible content.
* Visitors see clear actions instead of a static module menu.
* Deployments feel like the default exploration path.
* Workspace memory is visible in plain language.
* The application still uses the approved global state model.
* No new modules or overlays are built.
