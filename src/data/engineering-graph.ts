export type NodeCategory = 
  | "deployment" 
  | "technology" 
  | "experience" 
  | "company"
  | "concept" 
  | "learning" 
  | "focus"
  | "certificate"
  | "achievement";

export interface GraphNodeData {
  id: string;
  label: string;
  category: NodeCategory;
  description: string;
  details?: Record<string, string>;
  paths?: string[]; // IDs of paths this node belongs to
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  label?: string;
}

// Graph Exploration Modes
export type GraphMode = "journey" | "project" | "technology" | "ai" | "enterprise" | "future";

export const engineeringNodes: GraphNodeData[] = [
  // --- FOCUS AREAS ---
  {
    id: "focus-enterprise",
    label: "Enterprise Systems Builder",
    category: "focus",
    description: "Architecting resilient, scalable platforms capable of handling complex business workflows.",
    paths: ["path-enterprise"],
    details: {
      "Why it matters": "Scalability and maintainability are critical for enterprise success.",
      "Current Status": "Actively building CRM platforms for UK utility suppliers.",
    },
  },
  {
    id: "focus-ai",
    label: "AI Systems Builder",
    category: "focus",
    description: "Integrating intelligent agents and vector search to create context-aware automated solutions.",
    paths: ["path-ai", "path-learning"],
    details: {
      "Why it matters": "AI transforms static applications into dynamic, proactive systems.",
      "Current Status": "Developing RAG pipelines and automating ticket flows.",
    },
  },

  // --- COMPANIES ---
  {
    id: "comp-centralogic",
    label: "CentraLogic",
    category: "company",
    description: "Enterprise solutions provider focusing on scalable cloud platforms.",
    paths: ["path-enterprise", "path-ai"],
    details: {
      "Tenure": "April 2025 - Present",
      "Impact": "Delivered massive CRM platforms for UK utility suppliers.",
    },
  },
  {
    id: "comp-celebal",
    label: "Celebal Technologies",
    category: "company",
    description: "IT services specializing in Data Science and Enterprise Cloud.",
    paths: ["path-ai", "path-learning"],
    details: {
      "Tenure": "May 2023 - July 2023",
      "Impact": "Gained hands-on exposure to data science and fundamental machine learning algorithms.",
    },
  },

  // --- EXPERIENCES ---
  {
    id: "exp-se",
    label: "Software Engineer",
    category: "experience",
    description: "Core backend architecture, event-driven microservices, and frontend integration.",
    paths: ["path-enterprise", "path-ai"],
    details: {
      "Company": "CentraLogic",
      "Focus": "ASP.NET Core, Node.js, Fastify, React, Kafka",
    },
  },

  // --- DEPLOYMENTS ---
  {
    id: "proj-energy-crm",
    label: "Energy CRM Platform",
    category: "deployment",
    description: "Enterprise CRM platform supporting utility business workflows.",
    paths: ["path-enterprise"],
    details: {
      "Problem": "Utility CRM workflows require reliable handling of customer and energy data.",
      "Solution": "Built scalable backend APIs and business workflows for enterprise-scale utility operations.",
      "Outcome": "Improved backend response efficiency and workflow processing by approximately 25%.",
      "Stack": "ASP.NET Core, Angular, Azure Cosmos DB, Elasticsearch",
    },
  },
  {
    id: "proj-multi-tenant-crm",
    label: "Multi-Tenant CRM Platform",
    category: "deployment",
    description: "Multi-tenant CRM platform for UK utility suppliers.",
    paths: ["path-enterprise"],
    details: {
      "Problem": "Suppliers need tenant-aware CRM workflows that coordinate distributed operations.",
      "Solution": "Contributed backend services using Node.js and Fastify, with Kafka-based event-driven processing.",
      "Outcome": "Successfully deployed distributed workflow processing across multiple tenants.",
      "Stack": "Node.js, Fastify, React, PostgreSQL, Kafka",
    },
  },
  {
    id: "proj-rag-ai",
    label: "PDF RAG System",
    category: "deployment",
    description: "AI retrieval system for question-answering workflows over document knowledge.",
    paths: ["path-ai"],
    details: {
      "Problem": "Extracting insights from unstructured manuals.",
      "Solution": "Vector embeddings stored in Qdrant with LangChain orchestrator.",
      "Outcome": "Connected backend services, queues, vector search, and model workflows.",
      "Stack": "Node.js, LangChain, React, Qdrant, Ollama",
    },
  },

  // --- CONCEPTS ---
  {
    id: "concept-eda",
    label: "Event-Driven Architecture",
    category: "concept",
    description: "Decoupling services through asynchronous message passing.",
    paths: ["path-enterprise"],
    details: {
      "Why it matters": "Enables massive scalability and fault isolation.",
      "Current Status": "Applied in Multi-Tenant CRM using Kafka.",
    },
  },
  {
    id: "concept-agentic",
    label: "Agentic AI",
    category: "concept",
    description: "Autonomous LLM agents capable of multi-step reasoning and tool use.",
    paths: ["path-ai", "path-learning"],
    details: {
      "Why it matters": "Moves beyond simple chatbots to systems that take real actions.",
      "Current Status": "Actively learning multi-agent orchestration.",
    },
  },

  // --- LEARNING AREAS ---
  {
    id: "learn-claude",
    label: "Claude Code",
    category: "learning",
    description: "Integrating Anthropic's Claude into automated coding workflows.",
    paths: ["path-learning", "path-ai"],
    details: {
      "Focus": "Agentic coding and CLI automation.",
      "Status": "Active Exploration",
    },
  },
  {
    id: "learn-mcp",
    label: "Model Context Protocol",
    category: "learning",
    description: "Standardizing how AI models access external data and tools.",
    paths: ["path-ai", "path-learning"],
    details: {
      "Focus": "Reducing integration overhead for new AI tools.",
      "Status": "Active Exploration",
    },
  },

  // --- TECHNOLOGIES ---
  {
    id: "tech-csharp",
    label: "C# / ASP.NET Core",
    category: "technology",
    description: "Robust enterprise framework for building highly scalable backend systems.",
    paths: ["path-enterprise"],
    details: {
      "What it is": "A cross-platform, high-performance framework by Microsoft.",
      "Where I used it": "Energy CRM Platform.",
      "Learning depth": "Advanced",
    },
  },
  {
    id: "tech-nodejs",
    label: "Node.js / Fastify",
    category: "technology",
    description: "Asynchronous, event-driven JavaScript runtime.",
    paths: ["path-enterprise", "path-ai"],
    details: {
      "What it is": "JavaScript runtime environment.",
      "Where I used it": "Multi-Tenant CRM Platform, RAG System.",
      "Learning depth": "Advanced",
    },
  },
  {
    id: "tech-react",
    label: "React",
    category: "technology",
    description: "Library for building component-based user interfaces.",
    paths: ["path-enterprise", "path-ai"],
    details: {
      "What it is": "Declarative UI framework.",
      "Where I used it": "Multi-Tenant CRM Platform, RAG System.",
      "Learning depth": "Advanced",
    },
  },
  {
    id: "tech-kafka",
    label: "Kafka",
    category: "technology",
    description: "Distributed event streaming platform.",
    paths: ["path-enterprise"],
    details: {
      "What it is": "High-throughput message broker.",
      "Where I used it": "Multi-Tenant CRM Platform backbone.",
      "Learning depth": "Intermediate",
    },
  },
  {
    id: "tech-qdrant",
    label: "Qdrant",
    category: "technology",
    description: "Vector similarity search engine.",
    paths: ["path-ai"],
    details: {
      "What it is": "Specialized DB for high-dimensional vectors.",
      "Where I used it": "PDF RAG System.",
      "Learning depth": "Intermediate",
    },
  },
  {
    id: "tech-cosmos",
    label: "Azure Cosmos DB",
    category: "technology",
    description: "Fully managed NoSQL database for modern app development.",
    paths: ["path-enterprise"],
    details: {
      "What it is": "Multi-model database service.",
      "Where I used it": "Energy CRM Platform.",
      "Learning depth": "Intermediate",
    },
  },
];

export const engineeringEdges: GraphEdgeData[] = [
  // Core Identity -> Companies
  { id: "e-focus-ent-comp", source: "focus-enterprise", target: "comp-centralogic" },
  { id: "e-focus-ai-comp", source: "focus-ai", target: "comp-centralogic" },
  
  // Companies -> Experience
  { id: "e-comp-exp", source: "comp-centralogic", target: "exp-se" },
  { id: "e-celebal-exp", source: "comp-celebal", target: "exp-se" },

  // Experience -> Deployments
  { id: "e-exp-proj1", source: "exp-se", target: "proj-energy-crm" },
  { id: "e-exp-proj2", source: "exp-se", target: "proj-multi-tenant-crm" },
  { id: "e-exp-proj3", source: "exp-se", target: "proj-rag-ai" },

  // Concepts -> Deployments
  { id: "e-eda-proj2", source: "concept-eda", target: "proj-multi-tenant-crm" },
  { id: "e-agentic-proj3", source: "concept-agentic", target: "proj-rag-ai" },
  
  // Concepts -> Tech/Learning
  { id: "e-eda-kafka", source: "concept-eda", target: "tech-kafka" },
  { id: "e-agentic-mcp", source: "concept-agentic", target: "learn-mcp" },
  { id: "e-agentic-claude", source: "concept-agentic", target: "learn-claude" },
  
  // Tech -> Deployments
  { id: "e-csharp-proj1", source: "tech-csharp", target: "proj-energy-crm" },
  { id: "e-cosmos-proj1", source: "tech-cosmos", target: "proj-energy-crm" },
  
  { id: "e-nodejs-proj2", source: "tech-nodejs", target: "proj-multi-tenant-crm" },
  { id: "e-react-proj2", source: "tech-react", target: "proj-multi-tenant-crm" },
  { id: "e-kafka-proj2", source: "tech-kafka", target: "proj-multi-tenant-crm" },
  
  { id: "e-nodejs-proj3", source: "tech-nodejs", target: "proj-rag-ai" },
  { id: "e-react-proj3", source: "tech-react", target: "proj-rag-ai" },
  { id: "e-qdrant-proj3", source: "tech-qdrant", target: "proj-rag-ai" },
];
