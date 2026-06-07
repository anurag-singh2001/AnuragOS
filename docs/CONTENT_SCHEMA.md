# CONTENT_SCHEMA.md

Last updated: 2026-05-30

---

# Purpose

This document defines the structured content model that powers AnuragOS.

It is implementation-agnostic. It does not define TypeScript interfaces, database tables, or component props. It defines what content must exist, how it should be shaped, and how each content type supports the AnuragOS product experience.

The source of truth is the new positioning from `CONTENT_MIGRATION.md`: Anurag Singh as a Software Engineer, Enterprise Systems Builder, and AI Systems Builder.

---

# Schema Principles

* Content should be structured before it becomes UI.
* Deployments should replace generic project cards.
* Recruiter-facing content should prioritize current professional identity.
* Legacy student projects should not be featured unless explicitly reintroduced later.
* Fields should support Dashboard, Recruiter Mode, Deployments, Experience, AI Lab, Timeline, Resume, Terminal, and Contact.
* Unknown or private details should be marked as gaps rather than invented.

---

# Profile

## Purpose

Defines the primary identity shown across Dashboard, Recruiter Mode, Resume, Contact, metadata, and Terminal responses.

## Fields

* Name
* Title
* Tagline
* Bio
* Current Focus
* Location
* Contact Links

## Required Fields

* Name
* Title
* Tagline
* Bio
* Current Focus
* Contact Links

## Optional Fields

* Location
* Resume Link
* Availability
* Social Handle

## Example Content

```text
Name: Anurag Singh
Title: Full Stack Software Engineer
Tagline: Enterprise Systems Builder evolving toward AI Systems Engineering.
Bio: Software Engineer building scalable enterprise software and intelligent applications, with experience across CRM platforms, distributed systems, and applied AI workflows.
Current Focus: Building scalable enterprise systems and intelligent software powered by modern AI technologies.
Location: Pune / India context from resume; public display needs confirmation
Contact Links:
  - LinkedIn: https://www.linkedin.com/in/anurag-singh-2001/
  - Email: anuragrazarwal@gmail.com
  - GitHub: https://github.com/anurag-singh2001
  - Twitter/X: https://twitter.com/Anuragsingh3935
  - Phone: Excluded from public website
```

---

# Experience

## Purpose

Defines professional and educational experience for Experience, Timeline, Recruiter Mode, Resume, and Terminal summaries.

## Fields

* Company
* Role
* Duration
* Location
* Summary
* Tech Stack
* Achievements
* Projects

## Required Fields

* Company
* Role
* Duration
* Summary

## Optional Fields

* Location
* Tech Stack
* Achievements
* Projects
* Priority
* Public Visibility Notes

## Example Content

```text
Company: CentraLogic India Pvt. Ltd.
Role: Software Developer Engineer
Duration: April 2025 - Present
Location: Pune
Summary: Current professional role focused on enterprise CRM platforms for UK gas and electricity suppliers, business workflows, scalable services, event-driven systems, workflow automation, and AI-powered operational insights.
Tech Stack:
  - ASP.NET Core
  - Angular
  - Azure Cosmos DB
  - Elasticsearch
  - Node.js
  - Fastify
  - React
  - PostgreSQL
  - Kafka
Achievements:
  - Improved backend response efficiency and workflow processing by approximately 25%.
  - Built scalable backend APIs and business workflows for enterprise-scale utility operations.
  - Worked with Kafka-based event-driven architecture for distributed workflow processing.
Projects:
  - Energy CRM Platform for UK Gas Supplier
  - Multi-Tenant CRM Platform for UK Utility Services
```

Supporting examples:

```text
Company: Celebal Technologies
Role: Data Science Intern
Duration: May - July 2023
Location: Online
Summary: Early exposure to data science, machine learning, and algorithmic problem solving.

Company: Umbeo Technologies
Role: Full Stack Developer Intern
Duration: May - July 2022
Location: Dehradun
Summary: Early full-stack development experience and beginning of the engineering journey.
```

---

# Deployment

## Purpose

Defines portfolio systems. Deployments are the core proof layer for Dashboard, Recruiter Mode, Deployments, AI Lab, Resume, and Terminal.

## Fields

* Title
* Category
* Priority
* Problem
* Solution
* Architecture
* Tech Stack
* Challenges
* Outcome
* Links
* Featured Status

## Required Fields

* Title
* Category
* Priority
* Problem
* Solution
* Tech Stack
* Featured Status

## Optional Fields

* Architecture
* Challenges
* Outcome
* Links
* Evidence
* Screenshots
* Public Visibility Notes

## Example Content

```text
Title: Energy CRM Platform for UK Gas Supplier
Category: Enterprise Systems
Priority: Highest
Problem: Utility CRM workflows require reliable handling of customer, energy, and operational business data.
Solution: Enterprise CRM platform supporting business workflows through APIs, frontend interfaces, search, and scalable data storage.
Architecture:
  - ASP.NET Core services
  - Angular frontend
  - Azure Cosmos DB data layer
  - Elasticsearch search infrastructure
Tech Stack:
  - ASP.NET Core
  - Angular
  - Azure Cosmos DB
  - Elasticsearch
Challenges:
  - Enterprise workflow complexity
  - Search and data modeling
  - Production reliability expectations
Outcome: Demonstrates enterprise APIs, business workflow modeling, search infrastructure, and utility industry systems experience.
Links: No public CRM link. Use resume-described content only.
Featured Status: Hero Deployment
```

```text
Title: PDF RAG System
Category: AI Systems
Priority: Highest
Problem: Users need to retrieve and reason over PDF content through an AI-assisted workflow.
Solution: RAG system combining document processing, retrieval, queueing, vector search, and local model interaction.
Architecture:
  - React frontend
  - Node.js backend
  - LangChain orchestration
  - Qdrant vector database
  - BullMQ and Redis processing
  - Ollama model runtime
Tech Stack:
  - Node.js
  - LangChain
  - React
  - Qdrant
  - BullMQ
  - Redis
  - Ollama
Challenges:
  - Document ingestion
  - Retrieval quality
  - Async processing
  - Local AI workflow constraints
Outcome: Represents current AI engineering direction.
Links: Needs GitHub or demo link
Featured Status: Featured
```

---

# Skill

## Purpose

Defines skills by engineering domain without skill percentages. Skills support Dashboard, Recruiter Mode, Resume, Deployments, and Terminal responses.

## Fields

* Category
* Name
* Proficiency Area
* Related Deployments

## Required Fields

* Category
* Name
* Proficiency Area

## Optional Fields

* Related Deployments
* Evidence
* Display Priority

## Example Content

```text
Category: Backend
Name: Node.js
Proficiency Area: API development, service design, AI workflow backends
Related Deployments:
  - Multi-Tenant CRM Platform
  - PDF RAG System
  - AI Ticket Assistant
```

```text
Category: Distributed Systems
Name: Kafka
Proficiency Area: Event-driven architecture and distributed service communication
Related Deployments:
  - Multi-Tenant CRM Platform for UK Utility Services
```

```text
Category: AI Systems
Name: LangChain
Proficiency Area: RAG orchestration and AI application workflows
Related Deployments:
  - PDF RAG System
```

---

# Timeline Event

## Purpose

Defines the story arc from education to enterprise systems and AI systems. Used by Timeline, Experience, Dashboard summaries, and Terminal.

## Fields

* Title
* Type
* Description
* Date

Allowed Type values:

* Education
* Career
* Achievement
* Learning

## Required Fields

* Title
* Type
* Description
* Date

## Optional Fields

* Related Experience
* Related Deployment
* Evidence
* Display Priority

## Example Content

```text
Title: UPES
Type: Education
Description: Computer Science foundation and early software development journey.
Date: Needs confirmation
```

```text
Title: Software Engineer
Type: Career
Description: Professional engineering role focused on enterprise systems, CRM platforms, and production-oriented software.
Date: Needs confirmation
```

```text
Title: AI Systems Builder
Type: Learning
Description: Current direction into RAG systems, AI agents, MCP, and intelligent enterprise applications.
Date: Current
```

---

# AI Lab Entry

## Purpose

Defines AI exploration content for AI Lab, Dashboard previews, Recruiter Mode, Deployments cross-links, and Terminal.

## Fields

* Title
* Category
* Status
* Description
* Evidence

Allowed Category values:

* RAG
* Agents
* MCP
* Experiment
* Learning

Allowed Status values:

* Current
* Planned
* Future

## Required Fields

* Title
* Category
* Status
* Description

## Optional Fields

* Evidence
* Related Deployment
* Tools
* Notes

## Example Content

```text
Title: PDF RAG System
Category: RAG
Status: Current
Description: AI system for retrieving and reasoning over PDF content using LangChain, Qdrant, Redis, BullMQ, Ollama, Node.js, and React.
Evidence:
  - Deployment entry: PDF RAG System
  - Needs GitHub or demo link
```

```text
Title: AI Coding Agents
Category: Agents
Status: Current
Description: Active exploration of AI-assisted development workflows using Claude Code, Codex, and agentic software development patterns.
Evidence:
  - Planning and documentation workflow for AnuragOS
```

```text
Title: MCP
Category: MCP
Status: Planned
Description: Learning track for tool and context integration patterns in AI systems.
Evidence:
  - Needs experiment log
```

---

# Achievement

## Purpose

Defines notable outcomes, wins, milestones, or proof points that can appear in Experience, Resume, Recruiter Mode, and Timeline.

## Fields

* Title
* Description
* Date
* Category

## Required Fields

* Title
* Description
* Date
* Category

## Optional Fields

* Related Experience
* Related Deployment
* Evidence Link
* Metric

## Example Content

```text
Title: Built Enterprise CRM Platform Features
Description: Contributed to production-oriented CRM systems for utility industry workflows.
Date: Needs confirmation
Category: Professional
```

```text
Title: Built PDF RAG System
Description: Created an AI system combining document retrieval, vector search, queue processing, and local model workflows.
Date: Needs confirmation
Category: AI Systems
```

---

# Certificate

## Purpose

Defines verified learning credentials for Resume, Experience, Timeline, and Recruiter Mode when relevant.

## Fields

* Name
* Issuer
* Year
* Credential Link

## Required Fields

* Name
* Issuer
* Year

## Optional Fields

* Credential Link
* Related Skills
* Related Timeline Event

## Example Content

```text
Name: Post Graduate Diploma in Advanced Computing
Issuer: Institute for Advanced Computing and Software Development, Pune
Year: 2024 - 2025
Credential Link: Needs confirmation
```

```text
Name: Oracle Cloud Infrastructure Generative AI Certified Professional
Issuer: Oracle
Year: Needs confirmation
Credential Link: Needs confirmation
```

---

# Recruiter Summary

## Purpose

Defines the 30-second evaluation content for Recruiter Mode and Resume. This schema should be concise, proof-oriented, and always linked to contact paths.

## Fields

* Headline
* Key Points
* Featured Deployments
* Core Technologies
* Resume CTA
* Contact CTA

## Required Fields

* Headline
* Key Points
* Featured Deployments
* Core Technologies
* Contact CTA

## Optional Fields

* Resume CTA
* Availability
* Preferred Role Direction
* Location

## Example Content

```text
Headline: Software Engineer building enterprise systems and intelligent applications.
Key Points:
  - Current Software Developer Engineer experience at CentraLogic India Pvt. Ltd.
  - Builds enterprise CRM platforms and distributed systems.
  - Actively developing AI systems using RAG, agents, LangChain, vector databases, and modern AI tooling.
Featured Deployments:
  - Energy CRM Platform for UK Gas Supplier
  - Multi-Tenant CRM Platform for UK Utility Services
  - PDF RAG System
  - AI Ticket Assistant
Core Technologies:
  - ASP.NET Core
  - Node.js
  - Angular
  - React
  - PostgreSQL
  - Kafka
  - Azure Cosmos DB
  - Elasticsearch
  - LangChain
  - Qdrant
Resume CTA: View or download resume
Contact CTA: Connect on LinkedIn or send email
```

---

# Content Relationships

```text
Profile
  -> Contact Links
  -> Recruiter Summary

Experience
  -> Deployments
  -> Achievements
  -> Skills
  -> Timeline Events

Deployment
  -> Skills
  -> AI Lab Entries
  -> Achievements

AI Lab Entry
  -> Deployments
  -> Skills
  -> Timeline Events

Recruiter Summary
  -> Profile
  -> Experience
  -> Featured Deployments
  -> Skills
  -> Contact Links
```

---

# Content Readiness Checklist

Before implementation, confirm:

* Public location preference.
* CRM deployments should use resume-described content only unless later approved.
* Impact metrics where available.
* Certificate years and credential links.
* Whether Twitter/X remains in Contact.
* Replacement for placeholder link `https://github.com/xxxxx`.
