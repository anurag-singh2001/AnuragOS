# INTERACTION_ARCHITECTURE.md

Last updated: 2026-05-30

---

# Purpose

Define the interaction architecture for AnuragOS before continuing implementation.

This document converts the redesign direction into concrete interaction systems:

* Workspace shell.
* Launchpad.
* Command palette.
* Recruiter Mode overlay.
* Deployment Inspector.
* Career Journey Explorer.
* Keyboard shortcuts.
* State transitions.
* Overlay hierarchy.
* Animation stack recommendation.

No additional product pages should be built until this architecture is accepted.

---

# Design Goal

AnuragOS should feel like an Interactive Engineering Workspace.

It should not feel like:

* A SaaS dashboard.
* A landing page.
* A terminal clone.
* A retro OS clone.
* A portfolio card grid.

Primary interaction model:

```text
Workspace
  -> Launch / Search / Shortcut
  -> Open Module
  -> Inspect / Compare / Act
  -> Return / Switch / Overlay
```

---

# Global State Model

The app should maintain a small, explicit interaction state.

Recommended state groups:

```text
bootState:
  idle | running | skipped | complete

activeModule:
  overview | deployments | career | aiLab | resume | contact | terminal

activeOverlay:
  none | launchpad | commandPalette | recruiterMode | terminalDrawer

activeInspector:
  none | deployment | careerEvent | aiLabEntry

selectedDeploymentId:
  string | null

selectedCareerEventId:
  string | null

systemStatus:
  workspace.ready
  module.deployments.active
  mode.recruiter.active
  inspector.deployment.open
  command.palette.open
```

State principles:

* Only one primary module is active at a time.
* Only one blocking overlay is active at a time.
* Inspectors may exist inside modules, but global overlays sit above inspectors.
* Escape closes the topmost overlay first.
* The browser URL may reflect modules later, but interaction state should not depend on page scroll.

---

# Workspace Shell

## Definition

The Workspace Shell is the persistent environment for AnuragOS.

It contains:

* System bar.
* Active module area.
* Launchpad trigger.
* Command palette trigger.
* Recruiter Mode trigger.
* Status strip or status rail.
* Optional module rail.
* Overlay host.

The Workspace Shell replaces the current stacked dashboard model.

## Interaction

Trigger:

* Visit `/`.
* Complete boot.
* Skip boot.
* Close overlay with `Esc`.
* Run command `workspace`.

State changes:

* `bootState` moves to `complete` or `skipped`.
* `activeModule` defaults to `overview`.
* `activeOverlay` becomes `none`.
* `systemStatus` becomes `workspace.ready`.

Animation behavior:

* Boot-to-workspace transition should fade or slide in quickly.
* Active module changes should use short crossfade/slide transitions.
* Avoid long cinematic transitions.
* Respect `prefers-reduced-motion` by disabling movement and using opacity only.

Accessibility requirements:

* Main workspace must be a semantic `main` region.
* System bar must be a semantic `header` or `nav` region.
* Active module title must be announced through a heading.
* Status updates should use polite live regions only when useful.
* No critical content should be inaccessible without JavaScript-only gestures.

Keyboard support:

* `Ctrl+K` opens command palette.
* `/` opens command palette when focus is not inside input.
* `L` opens Launchpad.
* `R` opens Recruiter Mode.
* `D`, `J`, `A`, `T` open core modules.
* `Esc` returns from overlay to workspace.

Priority:

* Must Have.

---

# Launchpad

## Definition

Launchpad is the visible app/module launcher.

Modules:

* Recruiter Mode.
* Deployment Explorer.
* Career Journey.
* AI Lab.
* Resume.
* Contact.
* Terminal.

## Interaction

Trigger:

* Click Launchpad control.
* Press `L`.
* Run command `launchpad`.

State changes:

* `activeOverlay` becomes `launchpad`.
* Previous `activeModule` remains remembered.
* Selecting a module closes Launchpad and updates `activeModule`, unless the selected item is Recruiter Mode, which opens `activeOverlay: recruiterMode`.
* `systemStatus` becomes `launchpad.open` while active.

Animation behavior:

* Overlay appears with fast scale/opacity transition.
* Module tiles may stagger subtly, but delay must stay minimal.
* Closing should be faster than opening.
* Reduced motion should disable scale and stagger.

Accessibility requirements:

* Use dialog semantics if Launchpad overlays the workspace.
* Focus moves to first launchable item when opened.
* Focus returns to Launchpad trigger when closed.
* Items must be buttons or links with clear accessible names.
* Use `aria-current` or selected styling for active module.

Keyboard support:

* Arrow keys move between launchpad items.
* Enter or Space activates selected item.
* Esc closes Launchpad.
* Home and End move to first and last item.

Priority:

* Must Have.

---

# Command Palette

## Definition

Command Palette is the fastest interaction path for navigating, inspecting, and acting.

Command groups:

* Navigate.
* Inspect.
* Recruiter.
* Contact.
* System.

Example commands:

* Open Deployment Explorer.
* Inspect Energy CRM Platform.
* Inspect PDF RAG System.
* Open Career Journey.
* Open AI Lab.
* Open Recruiter Mode.
* Open LinkedIn.
* Copy Email.
* Return to Workspace.

## Interaction

Trigger:

* Press `Ctrl+K`.
* Press `/` when not typing.
* Click command control in system bar.

State changes:

* `activeOverlay` becomes `commandPalette`.
* Query state resets or preserves last query based on implementation decision.
* Activating a command may:
  * update `activeModule`,
  * update `selectedDeploymentId`,
  * update `selectedCareerEventId`,
  * open `recruiterMode`,
  * trigger a contact action,
  * or return to `overview`.
* `systemStatus` becomes `command.palette.open`.

Animation behavior:

* Palette opens instantly with subtle opacity/translate transition.
* Result changes should not animate heavily.
* Selected item movement should feel immediate.
* Reduced motion should keep only opacity changes.

Accessibility requirements:

* Use combobox/listbox or command-dialog semantics.
* Focus must move to input on open.
* Results must expose active descendant or roving focus state.
* No keyboard trap: Esc closes, Tab behavior must be intentional.
* Screen readers should receive result count changes politely if feasible.

Keyboard support:

* Typing filters results.
* Arrow Up/Down moves selection.
* Enter activates.
* Esc closes.
* Ctrl+K toggles close when already open.

Priority:

* Must Have.

---

# Recruiter Mode Overlay

## Definition

Recruiter Mode is a focused, global evaluation overlay.

It answers:

* Who is Anurag?
* What role does he fit?
* What has he built?
* What technologies does he use?
* How can a recruiter contact him?

## Interaction

Trigger:

* Click Recruiter control.
* Press `R`.
* Select Recruiter Mode in Launchpad.
* Run command `recruiter`.

State changes:

* `activeOverlay` becomes `recruiterMode`.
* Previous `activeModule` is preserved.
* `systemStatus` becomes `mode.recruiter.active`.
* Selecting a featured deployment closes Recruiter Mode or opens Deployment Inspector above/inside it based on final design decision.

Animation behavior:

* Overlay dims workspace and slides/fades in.
* Content should enter as one coherent panel, not many decorative pieces.
* Closing should return to previous workspace state.
* Reduced motion should remove slide and use opacity only.

Accessibility requirements:

* Use modal dialog semantics.
* Focus moves to overlay heading or first meaningful action.
* Focus is trapped inside overlay until closed.
* Esc closes overlay.
* Close button must have accessible label.
* Resume, LinkedIn, and Email actions must be real links/buttons.

Keyboard support:

* `R` opens when no text input is focused.
* Esc closes.
* Tab cycles through actions.
* Enter activates focused action.
* Arrow keys may move between featured deployments if implemented as a selectable list.

Priority:

* Must Have.

---

# Deployment Inspector

## Definition

Deployment Inspector is the main proof surface for engineering credibility.

It replaces generic project cards with an inspectable systems interface.

Core areas:

* Deployment list.
* Category filter.
* Selected deployment summary.
* Problem and solution.
* Architecture.
* Tech stack.
* Challenges.
* Outcomes.
* Evidence and links.
* Public visibility notes for CRM projects.

## Interaction

Trigger:

* Open Deployment Explorer from Launchpad.
* Press `D`.
* Run command `deployments`.
* Select a deployment from command palette.
* Select a featured deployment from Recruiter Mode.

State changes:

* `activeModule` becomes `deployments`.
* `selectedDeploymentId` becomes selected deployment.
* `activeInspector` becomes `deployment`.
* `systemStatus` becomes `inspector.deployment.open`.
* CRM deployment selection may set contextual status `privacy.crm.public-safe`.

Animation behavior:

* Deployment list remains stable while inspector content transitions.
* Inspector changes should use fast crossfade/slide.
* Category filters should animate selection state, not layout dramatically.
* Architecture blocks can reveal progressively, but only if it improves comprehension.

Accessibility requirements:

* Deployment list should be a semantic list or tab/listbox pattern.
* Selected deployment must be announced visually and semantically.
* Inspector heading must update on selection.
* Links to GitHub or evidence must have clear labels.
* Public-safe notes should be visible text, not tooltip-only content.

Keyboard support:

* `D` opens Deployment Explorer.
* Arrow keys move through deployment list.
* Enter selects deployment.
* Filter controls are reachable by Tab.
* Esc returns to previous module or clears inspector selection based on context.

Priority:

* Must Have.

---

# Career Journey Explorer

## Definition

Career Journey Explorer turns experience into an interactive progression.

Core events:

* UPES.
* Umbeo Technologies.
* Celebal Technologies.
* PG-DAC.
* CentraLogic.
* Enterprise Systems Builder.
* AI Systems Builder.

## Interaction

Trigger:

* Open Career Journey from Launchpad.
* Press `J`.
* Run command `journey` or `experience`.
* Select an event from command palette.

State changes:

* `activeModule` becomes `career`.
* `selectedCareerEventId` becomes selected event.
* `activeInspector` becomes `careerEvent`.
* `systemStatus` becomes `module.career.active`.

Animation behavior:

* Timeline path can animate active progress subtly.
* Selecting an event updates detail panel with a fast transition.
* Avoid complex scroll-driven animations.
* Reduced motion should show instant state changes.

Accessibility requirements:

* Timeline must be navigable as a list, tabs, or stepper.
* Each event must expose title, date, and type.
* Selected event must be clear for screen readers.
* Detail panel must have a heading tied to selected event.

Keyboard support:

* `J` opens Career Journey.
* Arrow Left/Right or Up/Down moves through timeline events.
* Enter selects focused event.
* Home and End jump to first and latest event.
* Esc returns to Workspace or previous module.

Priority:

* Should Have for initial interaction shell.
* Must Have before final MVP.

---

# Keyboard Shortcuts

## Shortcut Map

Recommended global shortcuts:

```text
Ctrl+K or /  Open Command Palette
L            Open Launchpad
R            Open Recruiter Mode
D            Open Deployment Explorer
J            Open Career Journey
A            Open AI Lab
T            Open Terminal
Esc          Close top overlay / return to previous state
Enter        Activate focused item
Arrow keys   Move active selection where applicable
Home/End     Jump in launchpad, command results, timeline, or deployment list
```

## Interaction

Trigger:

* Keyboard input when focus is not inside text input, textarea, or command query.

State changes:

* Shortcuts update `activeOverlay`, `activeModule`, or selected inspector state.
* Esc follows overlay hierarchy and closes the topmost active layer.

Animation behavior:

* Shortcut-triggered transitions should be fast.
* Keyboard interactions should feel immediate.
* Avoid delayed decorative animation after keyboard input.

Accessibility requirements:

* Shortcuts must be optional.
* Visible controls must exist for every shortcut.
* Shortcuts should not interfere with browser or assistive technology conventions.
* Provide a command palette item or help surface listing shortcuts.

Keyboard support:

* Keyboard support is the feature itself.
* Must guard against triggering shortcuts while typing.

Priority:

* Must Have for core overlays.
* Should Have for all modules.

---

# State Transitions

## Transition Rules

Workspace ready:

```text
boot.complete -> activeModule.overview -> systemStatus.workspace.ready
```

Open Launchpad:

```text
activeOverlay.none -> activeOverlay.launchpad
systemStatus.workspace.ready -> systemStatus.launchpad.open
```

Launch module:

```text
activeOverlay.launchpad -> activeOverlay.none
activeModule.previous -> activeModule.selected
systemStatus -> module.selected.active
```

Open Command Palette:

```text
activeOverlay.none -> activeOverlay.commandPalette
systemStatus -> command.palette.open
```

Run inspect command:

```text
activeOverlay.commandPalette -> activeOverlay.none
activeModule -> deployments
activeInspector -> deployment
selectedDeploymentId -> selected
systemStatus -> inspector.deployment.open
```

Open Recruiter Mode:

```text
activeOverlay.none -> activeOverlay.recruiterMode
systemStatus -> mode.recruiter.active
previousModule preserved
```

Close overlay:

```text
activeOverlay.top -> previous activeOverlay or none
systemStatus -> previous module status
focus -> original trigger
```

## Animation Behavior

General rules:

* Use short durations.
* Prefer opacity, transform, and layout-aware transitions.
* Avoid scroll-jacking.
* Avoid animation that delays reading.
* Disable or simplify motion for `prefers-reduced-motion`.

Recommended duration bands:

* Micro interaction: 80-140ms.
* Overlay enter: 160-220ms.
* Overlay exit: 100-160ms.
* Module switch: 180-260ms.
* Boot sequence: maximum 3-4 seconds, skippable.

---

# Overlay Hierarchy

Overlay order from highest to lowest:

```text
1. Critical system notice
2. Command Palette
3. Recruiter Mode
4. Launchpad
5. Terminal Drawer
6. Module Inspector
7. Workspace Module
8. Workspace Background
```

Rules:

* Command Palette should sit above everything because it is a control surface.
* Recruiter Mode should block normal workspace interaction while open.
* Launchpad should block workspace but not command palette.
* Terminal drawer may be non-blocking if docked, blocking if full-screen on mobile.
* Module Inspector belongs inside the active module unless opened from a global command.
* Esc closes the highest open layer.
* Focus must never escape a modal overlay.

---

# Workspace Memory

Workspace Memory defines what AnuragOS remembers during a visitor session so the workspace feels continuous instead of page-like.

Memory should improve orientation without becoming invasive or requiring accounts, analytics, or backend storage.

## Last Opened Module

Definition:

* The most recent primary module opened by the visitor.
* Allowed values match `activeModule`: `overview`, `deployments`, `career`, `aiLab`, `resume`, `contact`, `terminal`.

Behavior:

* When the visitor returns to Workspace from an overlay, the last opened module remains active.
* If the visitor reloads during the same browser session, AnuragOS may restore the last opened module.
* If the visitor starts a fresh session, default to `overview`.
* Recruiter Mode does not replace Last Opened Module because it is an overlay, not a primary module.

Purpose:

* Preserve context while moving through launchpad, command palette, terminal, and recruiter mode.

Persistence:

* Store in session state.
* Optional `sessionStorage` only.
* Do not persist across long-term visits until privacy and behavior are reviewed.

## Recently Viewed Deployments

Definition:

* A short ordered list of deployment IDs inspected during the current session.

Behavior:

* Add a deployment when its inspector opens.
* Move a deployment to the top if reopened.
* Keep the list short, recommended maximum 3.
* Display as a lightweight "Recent" group in Launchpad or Command Palette.
* Never imply live tracking or analytics.

Purpose:

* Help engineering visitors compare systems quickly.
* Make the workspace feel stateful and useful.

Persistence:

* Session-only.
* Clear on new browser session.

## Current Focus Area

Definition:

* The system-level focus inferred from current module or selected content.

Allowed examples:

```text
overview
enterprise-systems
distributed-systems
ai-systems
career-journey
recruiter-evaluation
contact-ready
```

Behavior:

* Selecting Energy CRM sets focus to `enterprise-systems`.
* Selecting Multi-Tenant CRM sets focus to `distributed-systems`.
* Selecting PDF RAG or AI Ticket Assistant sets focus to `ai-systems`.
* Opening Career Journey sets focus to `career-journey`.
* Opening Recruiter Mode sets focus to `recruiter-evaluation`.
* Opening Contact sets focus to `contact-ready`.

Purpose:

* Drive meaningful system status text.
* Keep the OS metaphor tied to actual visitor behavior.

Persistence:

* Derived from active state where possible.
* Session-only when explicitly stored.

## Session Persistence Rules

Rules:

* Persist only interaction state that helps orientation.
* Do not persist personal data entered by the user.
* Do not use backend storage for MVP.
* Do not use tracking-style language in the UI.
* Keep persistence transparent through ordinary workspace behavior.
* Always provide a clear path back to default Workspace.

Recommended session memory:

```text
lastOpenedModule
recentlyViewedDeploymentIds
selectedDeploymentId
selectedCareerEventId
currentFocusArea
bootCompleted
```

Reset behavior:

* `Restart Boot` command clears `bootCompleted` and returns to boot sequence.
* `Return to Workspace` command keeps recent context but returns `activeModule` to `overview`.
* New browser session starts from `overview` unless a deliberate resume behavior is approved later.

Accessibility:

* Restored state must not trap focus.
* If restoring a module, focus should land on the module heading or main region.
* Status text should announce restored context only if it changes what the user sees.

---

# Animation Stack Recommendation

## Options Considered

### Framer Motion

Strengths:

* Already installed in the project.
* Strong React ergonomics.
* Good support for layout transitions, shared layout, AnimatePresence, and gesture-like UI transitions.
* Well-suited for overlays, module switches, launchpad, command palette, and inspector transitions.
* Mature enough for production portfolio interactions.

Weaknesses:

* Larger than Motion One.
* Can be overused if every component gets animated.

### GSAP

Strengths:

* Excellent for complex timelines and highly choreographed animation.
* Strong for canvas/SVG-heavy creative sites.

Weaknesses:

* More imperative than this app needs.
* Heavier mental model for React state-driven UI.
* Overpowered for MVP workspace interactions.
* Higher risk of animation becoming spectacle.

### Motion One

Strengths:

* Lightweight.
* Web Animations API based.
* Good for simple transitions.

Weaknesses:

* Less ergonomic for complex React overlay state.
* Fewer high-level patterns for shared layout and mounted/unmounted transitions.
* Would add another animation decision despite Framer Motion already being present.

### React Spring

Strengths:

* Good physics-based animation.
* Useful for natural gesture or spring interactions.

Weaknesses:

* Less direct fit for crisp OS/workspace transitions.
* Spring-heavy motion can feel playful or floaty if not restrained.
* Not needed for the current interaction model.

## Recommendation

Use Framer Motion.

Reasoning:

* It is already part of the dependency set.
* It fits React and Next.js component state well.
* It can handle the required interaction architecture:
  * Boot-to-workspace transition.
  * Launchpad overlay.
  * Command palette overlay.
  * Recruiter Mode overlay.
  * Module switching.
  * Deployment inspector transitions.
  * Career timeline active-state transitions.
* It supports a restrained animation system without introducing a new animation library.

## Motion Rules For AnuragOS

Use Framer Motion for:

* Overlay enter/exit.
* Active module transitions.
* Inspector content changes.
* Launchpad tile reveal.
* Boot completion transition.
* Subtle active-state movement.

Do not use Framer Motion for:

* Constant ambient decoration.
* Large hero spectacle.
* Long scroll animations.
* Animating every card or text block.
* Effects that delay reading.

Implementation principle:

```text
Motion should communicate state change.
Motion should not become the product.
```

---

# Next Planning Step

Before implementation resumes, create low-fidelity interaction wireframes for:

* Workspace default state.
* Launchpad overlay.
* Command palette.
* Recruiter Mode overlay.
* Deployment Explorer.
* Career Journey Explorer.
* Mobile workspace model.

Only after those are accepted should Milestone 4 restart.
