/* ------------------------------------------------------------------ */
/* System Guide — Content Source                                       */
/* All content derived from RESUME_ANALYSIS.md & CONTENT_MIGRATION.md */
/* ------------------------------------------------------------------ */

/* ---- Types ---- */

export type GuideAction = {
  label: string;
  appId: string;
};

export type GuideQuestion = {
  id: string;
  question: string;
  answer: string;
  actions: GuideAction[];
  relatedQuestionIds: string[];
  categoryId: string;
};

export type GuideCategory = {
  id: string;
  label: string;
  icon: string;
  description: string;
  questionIds: string[];
};

export type ExplorationPath = {
  id: string;
  label: string;
  icon: string;
  description: string;
  /** Ordered list of steps — each step opens a module */
  steps: { label: string; appId: string }[];
};

export type AppContextHint = {
  appId: string;
  heading: string;
  description: string;
  suggestedQuestionIds: string[];
};

export type TourStep = {
  label: string;
  description: string;
  appId: string;
};

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export const guideCategories: GuideCategory[] = [
  {
    id: "cat-journey",
    label: "My Journey",
    icon: "🧭",
    description: "From UPES to enterprise and AI systems engineering.",
    questionIds: ["q-who", "q-journey", "q-education"],
  },
  {
    id: "cat-building",
    label: "What I\u2019m Building",
    icon: "🚀",
    description: "Major deployments and current engineering work.",
    questionIds: ["q-built", "q-strongest", "q-crm"],
  },
  {
    id: "cat-enterprise",
    label: "Enterprise Systems",
    icon: "🏗️",
    description: "CRM platforms, distributed services, and event-driven architecture.",
    questionIds: ["q-enterprise", "q-crm", "q-scalable"],
  },
  {
    id: "cat-ai",
    label: "AI Systems",
    icon: "🧠",
    description: "RAG pipelines, AI automation, and agentic workflows.",
    questionIds: ["q-ai", "q-rag", "q-ai-ticket"],
  },
  {
    id: "cat-learning",
    label: "Learning Journey",
    icon: "📚",
    description: "Active learning areas and future engineering direction.",
    questionIds: ["q-learning", "q-certificates", "q-future"],
  },
  {
    id: "cat-os",
    label: "How This OS Works",
    icon: "💻",
    description: "Understanding AnuragOS as an interactive portfolio.",
    questionIds: ["q-os", "q-start", "q-terminal"],
  },
  {
    id: "cat-start",
    label: "Where To Start",
    icon: "🗺️",
    description: "Suggested starting points for different visitors.",
    questionIds: ["q-start", "q-recruiter"],
  },
];

/* ------------------------------------------------------------------ */
/* Questions                                                           */
/* ------------------------------------------------------------------ */

export const guideQuestions: GuideQuestion[] = [
  /* ---- My Journey ---- */
  {
    id: "q-who",
    question: "Who are you?",
    answer:
      "I am Anurag Singh, a Full Stack Software Engineer at CentraLogic India Pvt. Ltd., based in Pune. I build enterprise CRM platforms for UK gas and electricity suppliers using ASP.NET Core, Node.js, Fastify, React, Cosmos DB, Kafka, and Elasticsearch. I am evolving toward AI Systems Engineering — building RAG pipelines, AI automation workflows, and exploring agentic software development.",
    actions: [
      { label: "Open Resume", appId: "resume" },
      { label: "Open Career Journey", appId: "career" },
    ],
    relatedQuestionIds: ["q-journey", "q-built", "q-ai"],
    categoryId: "cat-journey",
  },
  {
    id: "q-journey",
    question: "Tell me about your journey.",
    answer:
      "I started with a B.Tech in Computer Science from UPES, Dehradun (2020-2024). During college, I interned at Umbeo Technologies as a Full Stack Developer and at Celebal Technologies as a Data Science Intern. After graduating, I completed a C-DAC PG-DAC from IACSD, Pune (2024-2025) to strengthen my backend and systems engineering skills. I then joined CentraLogic as a Software Developer Engineer in April 2025, where I build enterprise CRM platforms and distributed systems for UK utility suppliers.",
    actions: [
      { label: "Open Career Journey", appId: "career" },
    ],
    relatedQuestionIds: ["q-who", "q-education", "q-enterprise"],
    categoryId: "cat-journey",
  },
  {
    id: "q-education",
    question: "What is your educational background?",
    answer:
      "B.Tech in Computer Science and Engineering from UPES, Dehradun (2020-2024, CGPA 7.45). C-DAC Post Graduate Diploma in Advanced Computing (PG-DAC) from IACSD, Pune (2024-2025, 67.3%). The C-DAC PG-DAC program solidified my foundation in backend engineering, databases, and systems design.",
    actions: [
      { label: "Open Career Journey", appId: "career" },
    ],
    relatedQuestionIds: ["q-journey", "q-certificates"],
    categoryId: "cat-journey",
  },

  /* ---- What I'm Building ---- */
  {
    id: "q-built",
    question: "What have you built?",
    answer:
      "My major deployments include: (1) Energy CRM Platform — an enterprise CRM for a UK gas supplier built with ASP.NET Core, Angular, Cosmos DB, and Elasticsearch. (2) Multi-Tenant CRM Platform — a distributed CRM for UK utility services using Node.js, Fastify, React, PostgreSQL, and Kafka. (3) PDF RAG System — an AI retrieval system using LangChain, Qdrant, BullMQ, Redis, and Ollama. (4) AI Ticket Assistant — an AI automation workflow using Node.js, MongoDB, Inngest, and Gemini API.",
    actions: [
      { label: "Open Deployments", appId: "deployments" },
      { label: "Open Engineering Graph", appId: "engineering-graph" },
      { label: "Open AI Lab", appId: "ai-lab" },
    ],
    relatedQuestionIds: ["q-strongest", "q-crm", "q-rag"],
    categoryId: "cat-building",
  },
  {
    id: "q-strongest",
    question: "What is your strongest project?",
    answer:
      "The Energy CRM Platform is my most impactful professional deployment. I built scalable backend APIs and business workflows that improved backend response efficiency and workflow processing by approximately 25%. It uses ASP.NET Core, Azure Cosmos DB, and Elasticsearch for a UK gas supplier, handling enterprise-scale utility operations. This is my strongest demonstration of enterprise systems engineering.",
    actions: [
      { label: "Open Deployments", appId: "deployments" },
    ],
    relatedQuestionIds: ["q-built", "q-crm", "q-enterprise"],
    categoryId: "cat-building",
  },
  {
    id: "q-crm",
    question: "Tell me about the CRM platforms.",
    answer:
      "I work on two CRM platforms at CentraLogic. The Energy CRM serves a UK gas supplier — built with ASP.NET Core, Angular, Azure Cosmos DB, and Elasticsearch. The Multi-Tenant CRM serves UK utility suppliers — built with Node.js, Fastify, React, Prisma ORM, PostgreSQL, and Kafka for event-driven distributed workflow processing. Both are enterprise-grade systems handling complex business workflows.",
    actions: [
      { label: "Open Deployments", appId: "deployments" },
    ],
    relatedQuestionIds: ["q-strongest", "q-enterprise", "q-scalable"],
    categoryId: "cat-building",
  },

  /* ---- Enterprise Systems ---- */
  {
    id: "q-enterprise",
    question: "What is your enterprise systems experience?",
    answer:
      "At CentraLogic, I build enterprise CRM platforms for UK utility suppliers. My work spans scalable backend APIs, business workflows, search infrastructure with Elasticsearch, data handling with Cosmos DB and PostgreSQL, event-driven architecture with Kafka, and distributed service coordination. I work across both ASP.NET Core and Node.js/Fastify stacks.",
    actions: [
      { label: "Open Deployments", appId: "deployments" },
      { label: "Open Engineering Graph", appId: "engineering-graph" },
    ],
    relatedQuestionIds: ["q-crm", "q-scalable", "q-built"],
    categoryId: "cat-enterprise",
  },
  {
    id: "q-scalable",
    question: "How do you handle scalable architectures?",
    answer:
      "I use event-driven architecture with Kafka for distributed workflow processing, decoupling services for high throughput and resilience. On the data layer, I work with Azure Cosmos DB for scalable NoSQL storage and Elasticsearch for high-performance search. On the backend, I use ASP.NET Core and Node.js/Fastify to build RESTful APIs that handle enterprise-scale utility operations.",
    actions: [
      { label: "Open Engineering Graph", appId: "engineering-graph" },
    ],
    relatedQuestionIds: ["q-enterprise", "q-crm"],
    categoryId: "cat-enterprise",
  },

  /* ---- AI Systems ---- */
  {
    id: "q-ai",
    question: "Why AI Systems?",
    answer:
      "AI transforms static applications into dynamic, context-aware systems. I am building toward AI Systems Engineering — not just using models as black boxes, but engineering the infrastructure around them: retrieval pipelines, vector databases, queue-based processing, workflow orchestration, and agentic automation. My PDF RAG System and AI Ticket Assistant are concrete steps in this direction.",
    actions: [
      { label: "Open AI Lab", appId: "ai-lab" },
    ],
    relatedQuestionIds: ["q-rag", "q-ai-ticket", "q-learning"],
    categoryId: "cat-ai",
  },
  {
    id: "q-rag",
    question: "Tell me about the PDF RAG System.",
    answer:
      "The PDF RAG System is an AI retrieval application for processing PDF content and enabling question-answering workflows over document knowledge. It uses Node.js for the backend, LangChain for orchestration, Qdrant as a vector database, BullMQ and Redis for asynchronous processing, React for the frontend, and Ollama for local model interaction. It represents my current AI engineering direction.",
    actions: [
      { label: "Open AI Lab", appId: "ai-lab" },
      { label: "Open Deployments", appId: "deployments" },
    ],
    relatedQuestionIds: ["q-ai", "q-ai-ticket", "q-learning"],
    categoryId: "cat-ai",
  },
  {
    id: "q-ai-ticket",
    question: "What is the AI Ticket Assistant?",
    answer:
      "The AI Ticket Assistant is an AI-assisted workflow automation system for ticket processing. It uses Node.js, MongoDB, Inngest for workflow orchestration, and Gemini API for AI-assisted triage and processing. It demonstrates practical AI automation beyond standalone model experiments — combining AI capabilities with real operational workflows.",
    actions: [
      { label: "Open AI Lab", appId: "ai-lab" },
      { label: "Open Deployments", appId: "deployments" },
    ],
    relatedQuestionIds: ["q-ai", "q-rag"],
    categoryId: "cat-ai",
  },

  /* ---- Learning Journey ---- */
  {
    id: "q-learning",
    question: "What are you learning?",
    answer:
      "I am actively exploring: Model Context Protocol (MCP) for standardizing how AI models access external tools and data. Agentic workflows and multi-agent systems for autonomous software development. Claude Code and AI coding agents for developer productivity. These build on my existing RAG and AI automation work toward production-grade AI systems engineering.",
    actions: [
      { label: "Open AI Lab", appId: "ai-lab" },
      { label: "Open Engineering Graph", appId: "engineering-graph" },
    ],
    relatedQuestionIds: ["q-ai", "q-future", "q-certificates"],
    categoryId: "cat-learning",
  },
  {
    id: "q-certificates",
    question: "What certifications do you hold?",
    answer:
      "Oracle Cloud Infrastructure Generative AI Certified Professional. Deep Learning Fundamentals by Cognitive Class.ai (IBM). Postman API Fundamentals Student Expert Certification. Introduction to Generative AI by Google Cloud. Claude Code in Action by Anthropic.",
    actions: [
      { label: "Open Resume", appId: "resume" },
    ],
    relatedQuestionIds: ["q-education", "q-learning"],
    categoryId: "cat-learning",
  },
  {
    id: "q-future",
    question: "Where are you heading?",
    answer:
      "My direction is AI Systems Engineering, agentic software development, and intelligent enterprise applications. I want to build production-grade AI systems that go beyond wrappers — engineering retrieval infrastructure, agent orchestration, and AI workflow platforms. The goal is to combine enterprise systems experience with AI capabilities.",
    actions: [
      { label: "Open AI Lab", appId: "ai-lab" },
      { label: "Open Career Journey", appId: "career" },
    ],
    relatedQuestionIds: ["q-ai", "q-learning"],
    categoryId: "cat-learning",
  },

  /* ---- How This OS Works ---- */
  {
    id: "q-os",
    question: "How does this OS work?",
    answer:
      "AnuragOS is an interactive portfolio designed as an operating system. Each application represents a facet of my engineering identity. Deployments shows my major projects. Career Journey maps my professional timeline. AI Lab tracks my AI experiments and learning. Engineering Graph visualizes how my projects, technologies, and concepts connect. You can open apps from the desktop, dock, Launchpad, or Command Palette (Ctrl+K).",
    actions: [
      { label: "Open Engineering Graph", appId: "engineering-graph" },
    ],
    relatedQuestionIds: ["q-start", "q-terminal", "q-who"],
    categoryId: "cat-os",
  },
  {
    id: "q-start",
    question: "Where should I start?",
    answer:
      "If you are a recruiter, try Recruiter Mode (press R) for a quick professional summary. If you want to explore my projects, open Deployments. If you want to understand how my skills and projects connect, open the Engineering Graph. If you are interested in my AI direction, open AI Lab. If you want the full story, open Career Journey.",
    actions: [
      { label: "Open Deployments", appId: "deployments" },
      { label: "Open Engineering Graph", appId: "engineering-graph" },
      { label: "Open AI Lab", appId: "ai-lab" },
      { label: "Open Career Journey", appId: "career" },
    ],
    relatedQuestionIds: ["q-os", "q-recruiter", "q-who"],
    categoryId: "cat-start",
  },
  {
    id: "q-recruiter",
    question: "I am a recruiter. What should I see?",
    answer:
      "Press R to open Recruiter Mode — it provides a focused professional summary with my key projects, core technologies, and preferred direction. For deeper exploration: Deployments shows my project portfolio with architecture and outcomes. Resume provides a traditional resume view. Career Journey maps my professional timeline. Contact has my LinkedIn and email.",
    actions: [
      { label: "Open Resume", appId: "resume" },
      { label: "Open Deployments", appId: "deployments" },
      { label: "Open Contact", appId: "contact" },
    ],
    relatedQuestionIds: ["q-start", "q-who", "q-strongest"],
    categoryId: "cat-start",
  },
  {
    id: "q-terminal",
    question: "How do I use the Terminal?",
    answer:
      "The Terminal is a fully functional command-line interface. You can type 'help' to see all available commands. Try typing 'whoami', 'skills', or 'projects' to view my profile data. You can also run 'cat resume.md' or 'neofetch' for system info. There's even a hidden 'snake' command to play a mini-game, and you can change the visual theme with 'matrix [color]'.",
    actions: [
      { label: "Open Terminal", appId: "terminal" },
    ],
    relatedQuestionIds: ["q-os", "q-start"],
    categoryId: "cat-os",
  },
];

/* ------------------------------------------------------------------ */
/* Exploration Paths                                                   */
/* ------------------------------------------------------------------ */

export const explorationPaths: ExplorationPath[] = [
  {
    id: "path-enterprise",
    label: "Enterprise Systems Builder",
    icon: "🏗️",
    description: "Explore how I build scalable CRM platforms and distributed systems.",
    steps: [
      { label: "Engineering Graph", appId: "engineering-graph" },
      { label: "Deployments", appId: "deployments" },
      { label: "Career Journey", appId: "career" },
    ],
  },
  {
    id: "path-ai",
    label: "AI Systems Builder",
    icon: "🧠",
    description: "Explore my AI engineering direction — RAG, automation, and agents.",
    steps: [
      { label: "AI Lab", appId: "ai-lab" },
      { label: "Deployments", appId: "deployments" },
      { label: "Engineering Graph", appId: "engineering-graph" },
    ],
  },
  {
    id: "path-learning",
    label: "Learning Journey",
    icon: "📚",
    description: "From data science to enterprise systems to AI engineering.",
    steps: [
      { label: "Career Journey", appId: "career" },
      { label: "AI Lab", appId: "ai-lab" },
      { label: "Resume", appId: "resume" },
    ],
  },
  {
    id: "path-origin",
    label: "UPES → C-DAC PG-DAC → Software Engineer",
    icon: "🎓",
    description: "Trace the academic and career progression from student to engineer.",
    steps: [
      { label: "Career Journey", appId: "career" },
      { label: "Deployments", appId: "deployments" },
      { label: "Engineering Graph", appId: "engineering-graph" },
    ],
  },
  {
    id: "path-focus",
    label: "Current Focus",
    icon: "🎯",
    description: "What I am working on right now — enterprise CRM and AI systems.",
    steps: [
      { label: "Deployments", appId: "deployments" },
      { label: "AI Lab", appId: "ai-lab" },
      { label: "Engineering Graph", appId: "engineering-graph" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* App Context Hints                                                   */
/* ------------------------------------------------------------------ */

export const appContextHints: AppContextHint[] = [
  {
    appId: "engineering-graph",
    heading: "Engineering Graph",
    description:
      "This map connects my projects, technologies, experience, and current learning areas. Select nodes to explore relationships.",
    suggestedQuestionIds: ["q-built", "q-enterprise", "q-ai", "q-scalable"],
  },
  {
    appId: "deployments",
    heading: "Deployments",
    description:
      "These are my major engineering projects — from enterprise CRM platforms to AI retrieval systems.",
    suggestedQuestionIds: ["q-strongest", "q-crm", "q-rag", "q-ai-ticket"],
  },
  {
    appId: "ai-lab",
    heading: "AI Lab",
    description:
      "Current AI systems direction, experiments, and active learning tracks in RAG, automation, and agentic workflows.",
    suggestedQuestionIds: ["q-ai", "q-rag", "q-ai-ticket", "q-learning"],
  },
  {
    appId: "career",
    heading: "Career Journey",
    description:
      "My professional timeline — from UPES and internships to CentraLogic and current AI direction.",
    suggestedQuestionIds: ["q-journey", "q-education", "q-enterprise", "q-future"],
  },
  {
    appId: "resume",
    heading: "Resume",
    description:
      "Traditional resume view with experience, skills, achievements, and certifications.",
    suggestedQuestionIds: ["q-who", "q-certificates", "q-education"],
  },
  {
    appId: "contact",
    heading: "Contact",
    description:
      "Get in touch via LinkedIn or email.",
    suggestedQuestionIds: ["q-recruiter", "q-who"],
  },
  {
    appId: "terminal",
    heading: "Terminal",
    description:
      "Explore AnuragOS through command-line interactions.",
    suggestedQuestionIds: ["q-os", "q-start"],
  },
  {
    appId: "settings",
    heading: "Settings",
    description:
      "Customize your AnuragOS experience — wallpapers, colors, and preferences.",
    suggestedQuestionIds: ["q-os"],
  },
];

/* ------------------------------------------------------------------ */
/* 2-Minute Tour                                                       */
/* ------------------------------------------------------------------ */

export const tourSteps: TourStep[] = [
  {
    label: "Engineering Graph",
    description: "See how my projects, technologies, and skills connect.",
    appId: "engineering-graph",
  },
  {
    label: "Deployments",
    description: "Explore my major projects and their architecture.",
    appId: "deployments",
  },
  {
    label: "AI Lab",
    description: "Discover my AI experiments and current learning.",
    appId: "ai-lab",
  },
  {
    label: "Career Journey",
    description: "Walk through my professional timeline.",
    appId: "career",
  },
  {
    label: "Terminal",
    description: "Interact with the OS and try the 'quiz' command.",
    appId: "terminal",
  },
  {
    label: "Resume",
    description: "View my professional details in a clean format.",
    appId: "resume",
  },
  {
    label: "Settings",
    description: "Customize the environment and matrix themes.",
    appId: "settings",
  },
];

/* ------------------------------------------------------------------ */
/* Helper Lookups                                                      */
/* ------------------------------------------------------------------ */

export function getQuestion(id: string): GuideQuestion | undefined {
  return guideQuestions.find((q) => q.id === id);
}

export function getCategory(id: string): GuideCategory | undefined {
  return guideCategories.find((c) => c.id === id);
}

export function getAppContext(appId: string): AppContextHint | undefined {
  return appContextHints.find((h) => h.appId === appId);
}
