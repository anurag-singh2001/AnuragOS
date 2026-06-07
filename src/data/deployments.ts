import type { Deployment } from "@/types/content";

export const deployments: Deployment[] = [
  {
    id: "energy-crm-platform",
    title: "Energy CRM Platform for UK Gas Supplier",
    category: "Enterprise Systems",
    priority: "highest",
    featuredStatus: "hero",
    summary:
      "Enterprise CRM platform supporting utility business workflows through backend APIs, frontend interfaces, scalable data handling, and search.",
    problem:
      "Utility CRM workflows require reliable handling of customer, energy, and operational business data.",
    solution:
      "Built scalable backend APIs and business workflows for enterprise-scale utility operations, with data storage and search infrastructure supporting operational workflows.",
    architecture: [
      "ASP.NET Core service layer",
      "Angular frontend",
      "Azure Cosmos DB data layer",
      "Elasticsearch search infrastructure",
    ],
    techStack: ["ASP.NET Core", "Angular", "Azure Cosmos DB", "Elasticsearch"],
    challenges: [
      "Enterprise workflow complexity",
      "Search and data modeling",
      "Production reliability expectations",
      "Frontend and product collaboration across business workflows",
    ],
    outcome:
      "Improved backend response efficiency and workflow processing by approximately 25%, while demonstrating enterprise API, search, and utility systems experience.",
    links: [],
    evidence: ["Resume-confirmed CentraLogic project", "Resume-confirmed 25% improvement"],
    publicVisibilityNotes: [
      "Professional CRM work; no public links, screenshots, or expanded architecture details by default.",
      "Use only resume-described content unless expanded public-safe details are approved.",
    ],
  },
  {
    id: "multi-tenant-crm-platform",
    title: "Multi-Tenant CRM Platform for UK Utility Services",
    category: "Distributed Systems",
    priority: "highest",
    featuredStatus: "hero",
    summary:
      "Multi-tenant CRM platform for UK utility suppliers using event-driven backend services and distributed workflow processing.",
    problem:
      "Utility suppliers need tenant-aware CRM workflows that can coordinate service operations and workflow processing across distributed services.",
    solution:
      "Contributed backend services and APIs using Node.js and Fastify, with Kafka-based event-driven architecture for distributed workflow processing.",
    architecture: [
      "Node.js and Fastify backend services",
      "React frontend",
      "Prisma ORM data access",
      "PostgreSQL database",
      "Kafka event-driven workflow processing",
    ],
    techStack: ["Node.js", "Fastify", "React", "Prisma ORM", "PostgreSQL", "Kafka"],
    challenges: [
      "Multi-tenant platform design",
      "Distributed workflow processing",
      "Service communication and event flow",
      "Intelligent workflow monitoring enhancements",
    ],
    outcome:
      "Shows experience with multi-tenant systems, scalable backend services, event-driven architecture, and AI-driven workflow processing enhancements.",
    links: [],
    evidence: ["Resume-confirmed CentraLogic project"],
    publicVisibilityNotes: [
      "Professional CRM work; no public links, screenshots, or expanded architecture details by default.",
      "Use only resume-described content unless expanded public-safe details are approved.",
    ],
  },
  {
    id: "pdf-rag-system",
    title: "PDF RAG System",
    category: "AI Systems",
    priority: "highest",
    featuredStatus: "featured",
    summary:
      "AI retrieval system for processing PDF content and enabling question-answering workflows over document knowledge.",
    problem:
      "Users need to retrieve and reason over PDF content through an AI-assisted workflow instead of manually searching documents.",
    solution:
      "Built a RAG workflow combining document ingestion, retrieval orchestration, vector search, queue processing, and local model interaction.",
    architecture: [
      "React frontend",
      "Node.js backend",
      "LangChain orchestration",
      "Qdrant vector database",
      "BullMQ and Redis processing",
      "Ollama model runtime",
    ],
    techStack: ["Node.js", "LangChain", "React", "Qdrant", "BullMQ", "Redis", "Ollama"],
    challenges: [
      "Document ingestion",
      "Retrieval quality",
      "Asynchronous processing",
      "Local AI workflow constraints",
    ],
    outcome:
      "Represents the current AI engineering direction by connecting backend services, queues, vector search, and model workflows.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/anurag-singh2001/PDF-RAG-System",
        type: "github",
      },
    ],
    evidence: ["Resume project link", "AI Lab current work"],
    publicVisibilityNotes: [],
  },
  {
    id: "ai-ticket-assistant",
    title: "AI Ticket Assistant",
    category: "AI Automation",
    priority: "highest",
    featuredStatus: "featured",
    summary:
      "AI-assisted workflow automation system for ticket processing and operational support flows.",
    problem:
      "Operational ticket workflows can benefit from AI-assisted triage, monitoring, and processing enhancements.",
    solution:
      "Built an AI automation workflow using Node.js, MongoDB, Inngest, and Gemini API to support ticket-processing flows.",
    architecture: [
      "Node.js backend",
      "MongoDB persistence",
      "Inngest workflow orchestration",
      "Gemini API integration",
    ],
    techStack: ["Node.js", "MongoDB", "Inngest", "Gemini API"],
    challenges: [
      "Workflow orchestration",
      "AI-assisted processing",
      "Operational state management",
    ],
    outcome:
      "Demonstrates practical AI automation and intelligent workflow application beyond standalone model experiments.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/anurag-singh2001/AI-Ticket-Assistant",
        type: "github",
      },
    ],
    evidence: ["Resume project link", "AI Lab current work"],
    publicVisibilityNotes: [],
  },
  {
    id: "agrimart",
    title: "AgriMart",
    category: "Full Stack Systems",
    priority: "medium",
    featuredStatus: "supporting",
    summary: "Full-stack system built with Spring Boot, React, and SQL.",
    problem:
      "Agriculture commerce workflows need an end-to-end web application surface for users, data, and transactions.",
    solution:
      "Built a full-stack application using a Spring Boot backend, React frontend, and SQL database.",
    architecture: ["Spring Boot backend", "React frontend", "SQL database"],
    techStack: ["Spring Boot", "React", "SQL"],
    challenges: ["End-to-end system design", "Frontend and backend integration"],
    outcome: "Provides supporting proof of full-stack application development.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/anurag-singh2001/AgriMart",
        type: "github",
      },
    ],
    evidence: ["Resume project link"],
    publicVisibilityNotes: ["Supporting deployment; should not outrank current professional work."],
  },
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    category: "Applied AI",
    priority: "medium",
    featuredStatus: "supporting",
    summary:
      "Applied AI project using Flask, machine learning, KNN, and cosine similarity for resume analysis.",
    problem:
      "Resume evaluation workflows need structured analysis and similarity-based matching support.",
    solution:
      "Built an applied AI analyzer using Flask and machine learning techniques including KNN and cosine similarity.",
    architecture: [
      "Flask application",
      "Machine learning analysis layer",
      "Similarity scoring workflow",
    ],
    techStack: ["Flask", "Machine Learning", "KNN", "Cosine Similarity"],
    challenges: ["Feature extraction", "Similarity scoring", "Applied AI workflow design"],
    outcome: "Connects earlier applied machine learning work to the broader AI systems journey.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/anurag-singh2001/AI-Resume-Analyzer",
        type: "github",
      },
    ],
    evidence: ["Resume project link"],
    publicVisibilityNotes: ["Supporting deployment; should not outrank current professional work."],
  },
];
