export type BuildCategory = "Education" | "Career" | "Projects" | "Learning" | "Certification" | "AnuragOS";
export type JourneyStage = "UPES Student" | "C-DAC" | "Software Engineer" | "Enterprise Systems Builder" | "AI Systems Builder" | "vNext";

export type BuildLogEntry = {
  id: string;
  stage: JourneyStage;
  versionBadge: string;
  title: string;
  date: string;
  category: BuildCategory;
  shortSummary: string;
  keyTakeaways: string[];
  relatedTechnologies?: string[];
  relatedModules?: {
    appId: string;
    label: string;
  }[];
};

export const vNextData = {
  exploring: ["MCP", "Agentic AI", "AI Coding Agents", "Enterprise AI Integration"],
  status: "Under Active Development"
};

export const buildLogEntries: BuildLogEntry[] = [
  // AI Systems Builder (v5.0)
  {
    id: "anuragos-launch",
    stage: "AI Systems Builder",
    versionBadge: "v5.0",
    title: "AnuragOS & AI Lab",
    date: "June 2026",
    category: "AnuragOS",
    shortSummary: "Built a fully immersive, agentic OS environment to act as a portfolio and central storytelling hub.",
    keyTakeaways: [
      "Mastered MCP (Model Context Protocol) and AI Agent integration.",
      "Designed an expansive desktop UI using Next.js and Framer Motion.",
      "Architected a complex Window Manager using React Context and reducers."
    ],
    relatedTechnologies: ["Next.js", "TailwindCSS", "TypeScript", "Framer Motion"],
    relatedModules: [
      { appId: "ai-lab", label: "Open AI Lab" }
    ]
  },
  {
    id: "pdf-rag",
    stage: "AI Systems Builder",
    versionBadge: "v5.0",
    title: "PDF RAG Chatbot",
    date: "May 2026",
    category: "Projects",
    shortSummary: "Developed a Retrieval-Augmented Generation (RAG) system for intelligently questioning PDF documents.",
    keyTakeaways: [
      "Built a robust FastAPI backend for processing documents via LangChain.",
      "Utilized Pinecone for scalable vector similarity search.",
      "Integrated React flow for the conversational frontend."
    ],
    relatedTechnologies: ["Python", "FastAPI", "Pinecone", "LangChain", "React"],
    relatedModules: [
      { appId: "deployments", label: "Open Deployments" }
    ]
  },
  // Enterprise Systems Builder (v4.0)
  {
    id: "energy-crm",
    stage: "Enterprise Systems Builder",
    versionBadge: "v4.0",
    title: "UK Energy CRM Platform",
    date: "2025 - Present",
    category: "Career",
    shortSummary: "Engineering highly scalable CRM platforms for UK gas and electricity utility providers.",
    keyTakeaways: [
      "Integrated Redpanda/Kafka for asynchronous, event-driven business workflows.",
      "Scaled PostgreSQL databases for high-volume transactions.",
      "Built resilient microservices architecture mapping complex business logic."
    ],
    relatedTechnologies: ["Node.js", "Fastify", "PostgreSQL", "Kafka", "Prisma"],
    relatedModules: [
      { appId: "deployments", label: "Open Deployments" },
      { appId: "career", label: "Open Career Journey" }
    ]
  },
  // Software Engineer (v3.0)
  {
    id: "centralogic-join",
    stage: "Software Engineer",
    versionBadge: "v3.0",
    title: "Joined CentraLogic",
    date: "April 2025",
    category: "Career",
    shortSummary: "Transitioned from academic projects to writing production-ready code in an enterprise environment.",
    keyTakeaways: [
      "Learned to navigate large legacy and greenfield codebases.",
      "Shifted focus from simply building features to ensuring reliability and scale.",
      "Collaborated heavily with cross-functional teams."
    ],
    relatedTechnologies: ["ASP.NET Core", "Angular", "Azure Cosmos DB", "Elasticsearch"],
    relatedModules: [
      { appId: "career", label: "Open Career Journey" },
      { appId: "engineering-graph", label: "Open Engineering Graph" }
    ]
  },
  // C-DAC (v2.0)
  {
    id: "cdac-grad",
    stage: "C-DAC",
    versionBadge: "v2.0",
    title: "PG-DAC Completion",
    date: "2024 - 2025",
    category: "Education",
    shortSummary: "Completed an intensive Post Graduate Diploma in Advanced Computing, cementing backend engineering skills.",
    keyTakeaways: [
      "Gained deep knowledge in Java, Spring Framework, and J2EE.",
      "Developed a strong understanding of database systems and Linux.",
      "Transformed academic understanding into industry-ready practices."
    ],
    relatedTechnologies: ["Java", "Spring Framework", "Hibernate", ".NET", "Linux"],
    relatedModules: [
      { appId: "career", label: "Open Career Journey" }
    ]
  },
  // UPES Student (v1.0)
  {
    id: "celebal-intern",
    stage: "UPES Student",
    versionBadge: "v1.0",
    title: "Data Science Intern at Celebal",
    date: "May - July 2023",
    category: "Career",
    shortSummary: "Gained exposure to machine learning algorithms and data science paradigms.",
    keyTakeaways: [
      "Implemented fundamental machine learning algorithms.",
      "Discovered an interest in backend systems and data processing."
    ],
    relatedTechnologies: ["Python", "Machine Learning", "Data Science"]
  },
  {
    id: "umbeo-intern",
    stage: "UPES Student",
    versionBadge: "v1.0",
    title: "Full Stack Intern at Umbeo",
    date: "May - July 2022",
    category: "Career",
    shortSummary: "First real-world full-stack development experience building client projects.",
    keyTakeaways: [
      "Developed a React-based location mapping feature.",
      "Delivered production websites using WordPress and PHP."
    ],
    relatedTechnologies: ["React.js", "WordPress", "PHP"]
  },
  {
    id: "upes-start",
    stage: "UPES Student",
    versionBadge: "v1.0",
    title: "B.Tech Computer Science",
    date: "2020 - 2024",
    category: "Education",
    shortSummary: "Built foundational computer science knowledge in algorithms, operating systems, and databases.",
    keyTakeaways: [
      "Developed a strong grounding in Data Structures and Algorithms.",
      "Explored diverse computer science domains from networking to software engineering."
    ],
    relatedTechnologies: ["Java", "JavaScript", "C++", "SQL"]
  }
];
