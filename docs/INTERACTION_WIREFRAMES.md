# INTERACTION_WIREFRAMES.md

Last updated: 2026-05-30

---

# Purpose

Define low-fidelity ASCII wireframes for the approved AnuragOS interaction architecture.

These wireframes finalize the intended interaction design before implementation resumes.

Rules:

* These are interaction wireframes, not visual mockups.
* Do not treat boxes as card requirements.
* Do not copy retro desktop styling from references.
* Preserve AnuragOS as a modern interactive engineering workspace.
* Every critical path must be reachable through visible controls and keyboard interactions.

---

# 1. Workspace Default State

## Layout

```text
+--------------------------------------------------------------------------------+
| AnuragOS                          workspace.ready        [Cmd] [Launch] [Recruiter] |
+--------------------------------------------------------------------------------+
| Status Rail                                                                    |
| focus: overview                                                                |
| module: overview                                                               |
| recent: none                                                                   |
+----------------------+---------------------------------------------------------+
| Module Rail          | Active Workspace: Overview                              |
| > Overview           |                                                         |
|   Deployments        |  ANURAG SINGH                                           |
|   Career Journey     |  Full Stack Software Engineer                           |
|   AI Lab             |  Enterprise Systems Builder -> AI Systems Engineering   |
|   Resume             |                                                         |
|   Contact            |  Current Focus                                          |
|   Terminal           |  Building scalable enterprise systems and intelligent   |
|                      |  software powered by modern AI technologies.            |
|                      |                                                         |
|                      |  Quick Launch                                           |
|                      |  [Deployment Explorer] [Career Journey] [AI Lab]        |
|                      |  [Recruiter Mode] [Resume] [Contact]                    |
+----------------------+---------------------------------------------------------+
| Shortcuts: Ctrl+K Command | L Launchpad | R Recruiter | D Deployments | J Journey |
+--------------------------------------------------------------------------------+
```

## Active State

* `activeModule: overview`
* `activeOverlay: none`
* `activeInspector: none`
* `systemStatus: workspace.ready`
* `currentFocusArea: overview`

## Overlay Behavior

* Launchpad opens above Workspace.
* Command Palette opens above all non-critical overlays.
* Recruiter Mode opens as blocking modal over Workspace.
* Terminal may open as drawer without replacing overview.

## Keyboard Behavior

* `Ctrl+K` or `/`: open Command Palette.
* `L`: open Launchpad.
* `R`: open Recruiter Mode.
* `D`: open Deployment Explorer.
* `J`: open Career Journey.
* `A`: open AI Lab.
* `T`: open Terminal Drawer.
* Arrow keys move within the module rail if focused.

## Status Updates

* On load: `workspace.ready`.
* On module hover/focus: optional preview text in status rail.
* On quick launch: status changes to selected module state.

---

# 2. Launchpad Overlay

## Layout

```text
+--------------------------------------------------------------------------------+
| AnuragOS                          launchpad.open         [Cmd] [Close Esc]      |
+--------------------------------------------------------------------------------+
| Workspace dimmed but still visible                                              |
|                                                                                |
|                      +----------------------------------+                       |
|                      | Launchpad                        |                       |
|                      | Open a workspace module          |                       |
|                      +----------------------------------+                       |
|                      | > Recruiter Mode                 |                       |
|                      |   Deployment Explorer            |                       |
|                      |   Career Journey                 |                       |
|                      |   AI Lab                         |                       |
|                      |   Resume                         |                       |
|                      |   Contact                        |                       |
|                      |   Terminal                       |                       |
|                      +----------------------------------+                       |
|                      | Recent: PDF RAG System           |                       |
|                      +----------------------------------+                       |
+--------------------------------------------------------------------------------+
```

## Active State

* `activeOverlay: launchpad`
* Previous `activeModule` preserved.
* Highlighted launch item uses roving focus.
* Recent deployments may appear if session memory exists.

## Overlay Behavior

* Blocks workspace pointer interaction.
* Does not replace active module.
* Selecting a module closes Launchpad.
* Selecting Recruiter Mode closes Launchpad and opens Recruiter Mode overlay.

## Keyboard Behavior

* Arrow Up/Down or grid arrows move selection.
* Enter or Space opens selected item.
* Esc closes and returns focus to Launchpad trigger.
* Home/End move to first/last item.
* `Ctrl+K` opens Command Palette above Launchpad.

## Status Updates

* Open: `launchpad.open`.
* Item focus: `launchpad.focus.deployments`, `launchpad.focus.recruiter`, etc.
* Select module: `module.selected.active`.

---

# 3. Command Palette

## Layout

```text
+--------------------------------------------------------------------------------+
| Workspace dimmed                                                               |
|                                                                                |
|                    +----------------------------------------+                  |
|                    | Command Palette                 Esc    |                  |
|                    +----------------------------------------+                  |
|                    | / inspect rag                         |                  |
|                    +----------------------------------------+                  |
|                    | Inspect                               |                  |
|                    | > Inspect PDF RAG System              |                  |
|                    |   Inspect AI Ticket Assistant         |                  |
|                    |                                        |                  |
|                    | Navigate                              |                  |
|                    |   Open Deployment Explorer            |                  |
|                    |   Open AI Lab                         |                  |
|                    |                                        |                  |
|                    | Recruiter                             |                  |
|                    |   Open Recruiter Mode                 |                  |
|                    +----------------------------------------+                  |
+--------------------------------------------------------------------------------+
```

## Active State

* `activeOverlay: commandPalette`
* Query state active.
* Highlighted result active.
* Previous module and overlay context remembered.

## Overlay Behavior

* Sits above Launchpad, Recruiter Mode, Terminal Drawer, and Inspectors.
* Activating a command closes palette.
* Inspect commands can switch module and open inspector in one action.

## Keyboard Behavior

* Typing filters commands.
* Arrow Up/Down changes active result.
* Enter activates result.
* Esc closes.
* `Ctrl+K` toggles close.
* Tab behavior should be controlled and predictable.

## Status Updates

* Open: `command.palette.open`.
* Query: `command.palette.searching`.
* Result active: `command.result.inspect-pdf-rag.focused`.
* Command activated: target status, such as `inspector.deployment.open`.

---

# 4. Recruiter Mode Overlay

## Layout

```text
+--------------------------------------------------------------------------------+
| Workspace dimmed                                      mode.recruiter.active     |
|                                                                                |
|        +----------------------------------------------------------------+      |
|        | Recruiter Mode                                           [X]   |      |
|        +----------------------------------------------------------------+      |
|        | Anurag Singh                                                  |      |
|        | Software Engineer building enterprise systems and intelligent  |      |
|        | applications.                                                 |      |
|        +--------------------+--------------------+----------------------+      |
|        | Current Role       | Core Stack         | Featured Deployments |      |
|        | CentraLogic        | ASP.NET Core       | > Energy CRM         |      |
|        | Enterprise CRM     | Node.js / Fastify  |   Multi-Tenant CRM   |      |
|        | Distributed flows  | Kafka / Postgres   |   PDF RAG System     |      |
|        | AI direction       | LangChain / Qdrant |   AI Ticket Assist.  |      |
|        +--------------------+--------------------+----------------------+      |
|        | Direction: AI Systems Engineering + intelligent enterprise apps |      |
|        +----------------------------------------------------------------+      |
|        | [View Resume] [Open LinkedIn] [Email] [Inspect Selected]       |      |
|        +----------------------------------------------------------------+      |
+--------------------------------------------------------------------------------+
```

## Active State

* `activeOverlay: recruiterMode`
* Previous `activeModule` preserved.
* Featured deployment list can have active selection.
* `currentFocusArea: recruiter-evaluation`

## Overlay Behavior

* Blocking modal.
* Background remains visible but inert.
* Selecting "Inspect Selected" opens Deployment Inspector or switches to Deployment Explorer.
* Closing returns to previous module.

## Keyboard Behavior

* `R`: opens Recruiter Mode when no input is focused.
* Tab cycles actions.
* Arrow Up/Down moves featured deployment selection if list is interactive.
* Enter activates focused action.
* Esc closes and restores focus.

## Status Updates

* Open: `mode.recruiter.active`.
* Featured selection: `mode.recruiter.deployment.pdf-rag.focused`.
* Resume action: `action.resume.open`.
* Contact action: `action.contact.email`.

---

# 5. Deployment Explorer

## Layout

```text
+--------------------------------------------------------------------------------+
| AnuragOS                          module.deployments.active [Cmd] [Launch]     |
+--------------------------------------------------------------------------------+
| Status Rail                                                                    |
| focus: enterprise-systems                                                      |
| selected: Energy CRM Platform                                                   |
| privacy: crm.public-safe                                                       |
+----------------------+---------------------------------------------------------+
| Module Rail          | Deployment Explorer                                     |
|   Overview           | Systems presented by problem, architecture, and outcome |
| > Deployments        |                                                         |
|   Career Journey     | Filters: [All] [Enterprise] [Distributed] [AI] [Full]   |
|   AI Lab             |                                                         |
|                      | +-------------------------------+---------------------+ |
| Deployment List      | | Selected System               | Evidence            | |
| > Energy CRM         | | Energy CRM Platform           | Resume-confirmed    | |
|   Multi-Tenant CRM   | | Enterprise Systems            | No public link      | |
|   PDF RAG System     | | ASP.NET Core / Angular        | Public-safe only    | |
|   AI Ticket Assist.  | | Cosmos DB / Elasticsearch     |                     | |
|   AgriMart           | |                               | [Open Inspector]    | |
|   AI Resume Analyzer | +-------------------------------+---------------------+ |
+----------------------+---------------------------------------------------------+
```

## Active State

* `activeModule: deployments`
* `selectedDeploymentId: energy-crm-platform`
* `activeInspector: deployment`
* `systemStatus: module.deployments.active`
* `currentFocusArea: enterprise-systems`

## Overlay Behavior

* Deployment Explorer is a primary module, not an overlay.
* Inspector may appear inline or as right-side panel.
* Command Palette can open above it.
* Recruiter Mode can open above it and preserve selected deployment.

## Keyboard Behavior

* `D`: opens Deployment Explorer.
* Arrow Up/Down moves through deployment list.
* Enter selects deployment.
* Tab reaches filters and inspector actions.
* Esc clears inspector focus or returns to Overview depending on context.

## Status Updates

* Open: `module.deployments.active`.
* Select CRM deployment: `privacy.crm.public-safe`.
* Select AI deployment: `focus.ai-systems`.
* Open inspector: `inspector.deployment.open`.

---

# 6. Deployment Inspector

## Layout

```text
+--------------------------------------------------------------------------------+
| Deployment Inspector                         inspector.deployment.open  [Back] |
+--------------------------------------------------------------------------------+
| PDF RAG System                                                                |
| AI Systems Deployment                                                          |
+--------------------------------------+-----------------------------------------+
| Problem                              | Solution                                 |
| PDF knowledge is difficult to search | RAG workflow with ingestion, retrieval, |
| and reason over manually.            | vector search, queues, and local models.|
+--------------------------------------+-----------------------------------------+
| Architecture                         | Tech Stack                               |
| React UI                             | Node.js                                  |
| Node API                             | LangChain                                |
| BullMQ + Redis                       | Qdrant                                   |
| Qdrant vector database               | Redis / BullMQ                           |
| Ollama runtime                       | Ollama                                   |
+--------------------------------------+-----------------------------------------+
| Challenges                           | Outcome                                  |
| retrieval quality                    | Practical AI systems direction           |
| document ingestion                   | Connects backend, queues, vectors, AI    |
| async workflow design                | Strong recruiter/interview signal        |
+--------------------------------------+-----------------------------------------+
| Evidence: [GitHub] [Related AI Lab]                                            |
+--------------------------------------------------------------------------------+
```

## Active State

* `activeModule: deployments`
* `activeInspector: deployment`
* `selectedDeploymentId: pdf-rag-system`
* `systemStatus: inspector.deployment.open`
* `recentlyViewedDeploymentIds` includes selected deployment.

## Overlay Behavior

* Can be inline panel inside Deployment Explorer.
* Can be focused full inspector on smaller screens.
* Command Palette opens above inspector.
* Recruiter Mode may open above inspector without losing selected deployment.

## Keyboard Behavior

* Arrow Up/Down can move to previous/next deployment when inspector is focused.
* Tab moves through links and section controls.
* Esc returns to Deployment Explorer list.
* Enter activates focused evidence link.

## Status Updates

* Open: `inspector.deployment.open`.
* AI deployment: `focus.ai-systems`.
* GitHub focus: `evidence.github.available`.
* CRM inspector: `privacy.crm.public-safe`.

---

# 7. Career Journey Explorer

## Layout

```text
+--------------------------------------------------------------------------------+
| AnuragOS                          module.career.active [Cmd] [Launch]          |
+--------------------------------------------------------------------------------+
| Status Rail                                                                    |
| focus: career-journey                                                          |
| selected: CentraLogic                                                          |
+----------------------+---------------------------------------------------------+
| Module Rail          | Career Journey Explorer                                |
|   Overview           | From foundations to enterprise systems and AI systems   |
|   Deployments        |                                                         |
| > Career Journey     | Timeline                                                |
|   AI Lab             | [UPES] -> [Umbeo] -> [Celebal] -> [PG-DAC] -> [Centra] |
|                      |                                      -> [AI Systems]   |
|                      |                                                         |
|                      | Selected Event                                          |
|                      | CentraLogic India Private Limited                       |
|                      | Software Developer Engineer                             |
|                      | April 2025 - Present | Pune                            |
|                      |                                                         |
|                      | Related Deployments                                     |
|                      | [Energy CRM] [Multi-Tenant CRM]                         |
|                      |                                                         |
|                      | [Open Recruiter Mode] [View Resume] [Contact]           |
+----------------------+---------------------------------------------------------+
```

## Active State

* `activeModule: career`
* `selectedCareerEventId: centralogic-role`
* `activeInspector: careerEvent`
* `systemStatus: module.career.active`
* `currentFocusArea: career-journey`

## Overlay Behavior

* Career Journey is a primary module.
* Selecting related deployment can open Deployment Inspector.
* Recruiter Mode can open above journey.
* Command Palette can jump to any event.

## Keyboard Behavior

* `J`: opens Career Journey.
* Arrow Left/Right moves along timeline.
* Enter selects focused event.
* Home/End jump to first/latest event.
* Tab reaches related deployments and CTAs.
* Esc returns to Overview or clears event focus.

## Status Updates

* Open: `module.career.active`.
* Event focus: `career.centralogic.focused`.
* Related deployment focus: `career.related.energy-crm.focused`.
* AI direction event: `focus.ai-systems`.

---

# 8. AI Lab Workspace

## Layout

```text
+--------------------------------------------------------------------------------+
| AnuragOS                          module.aiLab.active [Cmd] [Launch]           |
+--------------------------------------------------------------------------------+
| Status Rail                                                                    |
| focus: ai-systems                                                              |
| current: PDF RAG, AI Ticket Assistant, AI Coding Agents                        |
+----------------------+---------------------------------------------------------+
| Module Rail          | AI Lab Workspace                                       |
|   Overview           | Practical AI systems, experiments, and learning tracks |
|   Deployments        |                                                         |
|   Career Journey     | Current                                                 |
| > AI Lab             | > PDF RAG System          RAG / Vector Search          |
|                      |   AI Ticket Assistant     AI Workflow Automation       |
|                      |   AI Coding Agents        Agentic Development          |
|                      |                                                         |
|                      | Planned                                                 |
|                      |   MCP                     Tool/context integration     |
|                      |                                                         |
|                      | Future                                                  |
|                      |   Agent Orchestration     Multi-agent workflows        |
|                      |                                                         |
|                      | Detail Panel                                            |
|                      | PDF RAG uses LangChain, Qdrant, Redis, BullMQ, Ollama. |
+----------------------+---------------------------------------------------------+
```

## Active State

* `activeModule: aiLab`
* `activeInspector: aiLabEntry`
* `systemStatus: module.aiLab.active`
* `currentFocusArea: ai-systems`

## Overlay Behavior

* AI Lab is a primary module.
* Related deployment links can open Deployment Inspector.
* Command Palette can jump to AI Lab entries.
* Recruiter Mode can open above AI Lab.

## Keyboard Behavior

* `A`: opens AI Lab.
* Arrow Up/Down moves through lab entries.
* Enter selects entry.
* Tab reaches related deployment and evidence links.
* Esc returns to Overview or clears selected entry.

## Status Updates

* Open: `module.aiLab.active`.
* Current entry: `ai-lab.current.pdf-rag`.
* Planned entry: `ai-lab.planned.mcp`.
* Future entry: `ai-lab.future.agent-orchestration`.

---

# 9. Terminal Drawer

## Layout

```text
+--------------------------------------------------------------------------------+
| Active Workspace remains visible                                                |
|                                                                                |
|                                                                                |
|                                                                                |
|                                                                                |
+--------------------------------------------------------------------------------+
| Terminal Drawer                                         terminal.drawer.open [X]|
+--------------------------------------------------------------------------------+
| anuragos:~$ help                                                               |
| commands: about, deployments, inspect, journey, ai, recruiter, resume, contact |
|                                                                                |
| anuragos:~$ inspect pdf-rag                                                    |
| Opening Deployment Inspector: PDF RAG System                                    |
|                                                                                |
| anuragos:~$ _                                                                  |
+--------------------------------------------------------------------------------+
```

## Active State

* `activeOverlay: terminalDrawer` if drawer is overlay.
* `activeModule` remains preserved.
* Terminal command history is session-only.
* `systemStatus: terminal.drawer.open`

## Overlay Behavior

* Desktop: bottom drawer can be non-blocking or semi-blocking.
* Mobile: terminal should become full-screen modal/drawer.
* Command Palette opens above Terminal Drawer.
* Esc closes drawer or clears command input based on focus state.

## Keyboard Behavior

* `T`: toggles Terminal Drawer.
* Typing enters commands when input focused.
* Enter submits command.
* Arrow Up/Down navigates command history.
* Esc closes if input is empty, otherwise clears input.
* Terminal commands can open modules and inspectors.

## Status Updates

* Open: `terminal.drawer.open`.
* Command recognized: `terminal.command.executed`.
* Unknown command: `terminal.command.unknown`.
* Command opens inspector: `inspector.deployment.open`.

---

# 10. Mobile Workspace

## Layout

```text
+------------------------------------------------+
| AnuragOS             workspace.ready   [Cmd]   |
| [Launch] [Recruiter]                          |
+------------------------------------------------+
| Status: overview | focus: enterprise + AI      |
+------------------------------------------------+
| Active Module: Overview                        |
|                                                |
| Anurag Singh                                   |
| Full Stack Software Engineer                   |
| Enterprise Systems -> AI Systems Engineering   |
|                                                |
| Quick Launch                                   |
| [Deployments]                                  |
| [Career Journey]                               |
| [AI Lab]                                       |
| [Resume] [Contact]                             |
+------------------------------------------------+
| Bottom Controls                                |
| [Home] [Launch] [Cmd] [Recruiter]              |
+------------------------------------------------+
```

Launchpad mobile overlay:

```text
+------------------------------------------------+
| Launchpad                              [Close] |
+------------------------------------------------+
| > Recruiter Mode                               |
|   Deployment Explorer                          |
|   Career Journey                               |
|   AI Lab                                       |
|   Resume                                       |
|   Contact                                      |
|   Terminal                                     |
+------------------------------------------------+
```

## Active State

* Same state model as desktop.
* Module rail collapses into Launchpad and bottom controls.
* Inspectors become full-screen or stacked views.
* Terminal drawer becomes full-screen drawer.

## Overlay Behavior

* Command Palette is full-width top or centered modal.
* Recruiter Mode is full-screen modal.
* Launchpad is full-screen or near-full-screen overlay.
* Deployment Inspector replaces list view with Back control.

## Keyboard Behavior

* External keyboards should support same shortcuts.
* Touch controls must exist for all shortcut actions.
* Focus order follows visible top-to-bottom layout.
* Esc support works for external keyboards.

## Status Updates

* Mobile status is compact: `workspace.ready`, `module.deployments.active`, `mode.recruiter.active`.
* Longer status details can move into a collapsible status panel.
* Focus changes should not create noisy live-region announcements.

---

# Final Interaction Notes

Implementation should resume only after these wireframes are accepted.

Milestone 4 should begin with the interaction shell, not normal content pages:

1. Workspace shell.
2. State model.
3. Launchpad.
4. Command Palette.
5. Recruiter Mode overlay.
6. Deployment Explorer and Inspector.
7. Career Journey Explorer.
8. AI Lab Workspace.
9. Terminal Drawer.
10. Mobile workspace behavior.
