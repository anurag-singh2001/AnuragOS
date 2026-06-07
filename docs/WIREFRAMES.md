# WIREFRAMES.md

Last updated: 2026-05-30

---

# Purpose

This document defines low-fidelity ASCII wireframes for AnuragOS.

These wireframes align with `CONTENT_MIGRATION.md`: AnuragOS should feature enterprise systems, distributed systems, and AI systems. Legacy student projects are not used as featured portfolio content.

---

# Wireframe Principles

* Show AnuragOS as an engineering command center, not a traditional dashboard template.
* Prioritize recruiter clarity above decorative complexity.
* Present projects as deployments with system context.
* Keep Terminal useful but secondary.
* Keep all interactions accessible without keyboard-only discovery.

---

# Boot Sequence

```text
+--------------------------------------------------------------------------------+
| AnuragOS Boot                                                                  |
+--------------------------------------------------------------------------------+
| Initializing Engineering Command Center...                                      |
|                                                                                |
| [ok] Profile loaded: Anurag Singh                                               |
| [ok] Current role: Software Engineer                                            |
| [ok] Focus: Enterprise Systems + AI Systems                                     |
| [ok] Featured deployments indexed                                               |
|                                                                                |
| Progress: [########################------]                                      |
|                                                                                |
|                                                        [Skip Boot]              |
+--------------------------------------------------------------------------------+
```

Behavior:

* Maximum 3-4 seconds.
* Skippable.
* Transitions into Dashboard with system-ready state.

---

# Dashboard

```text
+--------------------------------------------------------------------------------+
| AnuragOS       Deployments Experience AI Lab Terminal Resume Contact [Recruiter]|
+--------------------------------------------------------------------------------+
| SYSTEM: ANURAG SINGH                                      STATUS: BUILDING AI   |
| Software Engineer | Enterprise Systems Builder | AI Systems Builder             |
|                                                                                |
| Current Focus                                                                  |
| Building scalable enterprise systems and intelligent software powered by modern |
| AI technologies.                                                               |
+--------------------------------------+-----------------------------------------+
| Recruiter Snapshot                    | Featured Deployments                    |
| - CentraLogic Software Engineer        | 01 Energy CRM Platform                  |
| - Enterprise CRM platforms             | 02 Multi-Tenant CRM Platform            |
| - Distributed systems + AI systems     | 03 PDF RAG System                       |
| - Resume and contact ready             | 04 AI Ticket Assistant                  |
| [Open Recruiter Mode]                  | [View Deployments]                      |
+--------------------------------------+-----------------------------------------+
| System Status                         | AI Lab Preview                           |
| Role: Software Engineer                | Current: PDF RAG, AI Ticket Assistant   |
| Stack: .NET, Node, React, Kafka        | Learning: MCP, agents, AI dev tools     |
| Direction: AI Systems Engineering      | [Open AI Lab]                            |
+--------------------------------------+-----------------------------------------+
```

---

# Deployments

```text
+--------------------------------------------------------------------------------+
| Deployments                                                                    |
| Systems presented by problem, architecture, tradeoffs, and outcome.             |
+--------------------------------------------------------------------------------+
| [All] [Enterprise] [Distributed] [AI Systems] [Full Stack]                      |
+--------------------------------------------------------------------------------+
| +---------------------------+ +---------------------------+                    |
| | Energy CRM Platform       | | Multi-Tenant CRM Platform |                    |
| | Enterprise Systems        | | Distributed Systems       |                    |
| | ASP.NET Core / Angular    | | Node / Fastify / Kafka    |                    |
| | Cosmos DB / Elasticsearch | | React / PostgreSQL        |                    |
| | [Inspect Deployment]      | | [Inspect Deployment]      |                    |
| +---------------------------+ +---------------------------+                    |
| +---------------------------+ +---------------------------+                    |
| | PDF RAG System            | | AI Ticket Assistant       |                    |
| | AI Systems                | | AI Automation             |                    |
| | LangChain / Qdrant        | | Node / MongoDB / Inngest  |                    |
| | Redis / Ollama            | | Gemini API                |                    |
| | [Inspect Deployment]      | | [Inspect Deployment]      |                    |
| +---------------------------+ +---------------------------+                    |
| +---------------------------+ +---------------------------+                    |
| | AgriMart                  | | AI Resume Analyzer        |                    |
| | Full Stack Systems        | | Applied AI                |                    |
| | Spring Boot / React / SQL | | Flask / ML / Similarity   |                    |
| | [Inspect Deployment]      | | [Inspect Deployment]      |                    |
| +---------------------------+ +---------------------------+                    |
+--------------------------------------------------------------------------------+
```

---

# Deployment Detail

```text
+--------------------------------------------------------------------------------+
| Deployments / PDF RAG System                         [Evidence] [Back]          |
+--------------------------------------------------------------------------------+
| Role: AI Systems Deployment                                                   |
| Summary: Retrieval system for reasoning over PDF content with AI workflows.     |
+--------------------------------------+-----------------------------------------+
| Problem                              | Solution                                 |
| PDF knowledge is difficult to search  | RAG workflow with ingestion, vector       |
| and reason over in normal workflows.  | retrieval, queueing, and local models.    |
+--------------------------------------+-----------------------------------------+
| Architecture                          | Tech Stack                               |
| React UI                              | Node.js                                  |
| Node API                              | LangChain                                |
| BullMQ + Redis processing             | Qdrant                                   |
| Qdrant vector store                   | Redis / BullMQ                           |
| Ollama model runtime                  | Ollama                                   |
+--------------------------------------+-----------------------------------------+
| Challenges                            | Outcome                                  |
| - Retrieval quality                   | Shows practical AI systems direction      |
| - Document ingestion                  | Connects backend, queues, vectors, AI     |
| - Async workflow design               | Strong recruiter and interview signal     |
+--------------------------------------------------------------------------------+
```

---

# Experience

```text
+--------------------------------------------------------------------------------+
| Experience                                                                     |
| From software foundations to enterprise systems and AI systems engineering.      |
+--------------------------------------------------------------------------------+
| Timeline                                                                       |
|                                                                                |
| [UPES] -> [PG-DAC] -> [Umbeo] -> [Celebal] -> [CentraLogic] -> [AI Systems]    |
|   |         |          |          |            |                 |             |
| Education  Training   Full stack Data sci.   Software Engineer Current focus   |
+--------------------------------------------------------------------------------+
| Current Role                                                                   |
| CentraLogic India Pvt. Ltd.                                                    |
| Software Engineer working on enterprise CRM, distributed services, search,      |
| business workflows, and production-oriented systems.                            |
+--------------------------------------------------------------------------------+
| [View Resume] [Open Recruiter Mode] [Contact]                                  |
+--------------------------------------------------------------------------------+
```

---

# AI Lab

```text
+--------------------------------------------------------------------------------+
| AI Lab                                                                         |
| Practical AI systems, experiments, and learning tracks.                         |
+--------------------------------------------------------------------------------+
| Current                                                                        |
| +---------------------------+ +---------------------------+                    |
| | PDF RAG System            | | AI Ticket Assistant       |                    |
| | RAG / Vector Search       | | AI Workflow Automation    |                    |
| | LangChain / Qdrant        | | Inngest / Gemini API      |                    |
| +---------------------------+ +---------------------------+                    |
+--------------------------------------------------------------------------------+
| Active Learning                                                                |
| Claude Code | Codex | AI Coding Agents | MCP | Agentic Workflows              |
+--------------------------------------------------------------------------------+
| Future                                                                         |
| AI Resume Assistant | Agent Orchestration | AI Workflow Platforms             |
+--------------------------------------------------------------------------------+
```

---

# Terminal

```text
+--------------------------------------------------------------------------------+
| Terminal                                                                       |
| Command layer for fast exploration. Same content, different interaction mode.   |
+--------------------------------------------------------------------------------+
| Commands                                                                       |
| help | about | experience | deployments | ai | resume | contact               |
+--------------------------------------------------------------------------------+
| > deployments                                                                  |
| 01 Energy CRM Platform            Enterprise Systems                           |
| 02 Multi-Tenant CRM Platform      Distributed Systems                          |
| 03 PDF RAG System                 AI Systems                                   |
| 04 AI Ticket Assistant            AI Automation                                |
| 05 AgriMart                       Full Stack Systems                           |
| 06 AI Resume Analyzer             Applied AI                                   |
|                                                                                |
| > ai                                                                           |
| Current: PDF RAG System, AI Ticket Assistant, AI coding agents                  |
| Planned: MCP, agent orchestration, AI workflow platforms                        |
|                                                                                |
| > _                                                                            |
+--------------------------------------------------------------------------------+
```

---

# Recruiter Mode

```text
+--------------------------------------------------------------------------------+
| Recruiter Mode                                                        [Close]  |
+--------------------------------------------------------------------------------+
| Anurag Singh                                                                  |
| Software Engineer building enterprise systems and intelligent applications.     |
+-------------------------+-------------------------+----------------------------+
| Experience              | Core Technologies       | Featured Deployments       |
| CentraLogic             | ASP.NET Core            | Energy CRM Platform        |
| Enterprise CRM          | Node.js / Fastify       | Multi-Tenant CRM Platform  |
| Distributed systems     | Angular / React         | PDF RAG System             |
| AI systems direction    | Kafka / PostgreSQL      | AI Ticket Assistant        |
+-------------------------+-------------------------+----------------------------+
| Direction                                                                      |
| AI Systems Engineering, agentic software development, intelligent enterprise    |
| applications.                                                                  |
+--------------------------------------------------------------------------------+
| [View Resume] [View Deployments] [LinkedIn] [Email]                            |
+--------------------------------------------------------------------------------+
```

---

# Contact

```text
+--------------------------------------------------------------------------------+
| Contact                                                                        |
| Professional contact paths are intentionally direct.                            |
+--------------------------------------------------------------------------------+
| Primary                                                                        |
| LinkedIn   linkedin.com/in/anurag-singh-2001                    [Open]         |
| Email      anuragrazarwal@gmail.com                             [Copy] [Open]  |
+--------------------------------------------------------------------------------+
| Secondary                                                                      |
| GitHub     github.com/anurag-singh2001                          [Open]         |
| Twitter/X  twitter.com/Anuragsingh3935                          [Open]         |
+--------------------------------------------------------------------------------+
| [Open Recruiter Mode] [View Resume]                                            |
+--------------------------------------------------------------------------------+
```

---

# Open Notes

* Replace placeholder metrics with verified impact numbers when available.
* Add public-safe screenshots or architecture diagrams only after review.
* Keep all deployment details truthful and safe for public portfolio use.
