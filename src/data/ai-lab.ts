import type { AiLabEntry } from "@/types/content";

export const aiLabEntries: AiLabEntry[] = [
  {
    id: "pdf-rag-system-lab",
    title: "PDF RAG System",
    category: "RAG",
    status: "Current",
    description:
      "AI system for retrieving and reasoning over PDF content using LangChain, Qdrant, Redis, BullMQ, Ollama, Node.js, and React.",
    evidence: ["Deployment entry: PDF RAG System", "Resume project link"],
    relatedDeploymentIds: ["pdf-rag-system"],
    tools: ["LangChain", "Qdrant", "Redis", "BullMQ", "Ollama", "Node.js", "React"],
    notes: ["Represents current AI engineering direction."],
  },
  {
    id: "ai-ticket-assistant-lab",
    title: "AI Ticket Assistant",
    category: "Experiment",
    status: "Current",
    description:
      "AI workflow automation project using Node.js, MongoDB, Inngest, and Gemini API for ticket-processing flows.",
    evidence: ["Deployment entry: AI Ticket Assistant", "Resume project link"],
    relatedDeploymentIds: ["ai-ticket-assistant"],
    tools: ["Node.js", "MongoDB", "Inngest", "Gemini API"],
    notes: ["Shows AI applied to operational workflow automation."],
  },
  {
    id: "ai-coding-agents",
    title: "AI Coding Agents",
    category: "Agents",
    status: "Current",
    description:
      "Active exploration of AI-assisted development workflows using Claude, Codex, and agentic software development patterns.",
    evidence: ["Resume-confirmed developer tools", "AnuragOS planning and implementation workflow"],
    relatedDeploymentIds: [],
    tools: ["Claude", "Codex", "Antigravity"],
    notes: ["Should be presented as active exploration, not production AI-agent deployment."],
  },
  {
    id: "mcp-learning",
    title: "MCP",
    category: "MCP",
    status: "Planned",
    description:
      "Learning track for tool and context integration patterns in AI systems and agentic workflows.",
    evidence: ["Content migration active-learning direction"],
    relatedDeploymentIds: [],
    tools: ["MCP"],
    notes: ["Needs experiment log before being elevated beyond planned status."],
  },
  {
    id: "agent-orchestration",
    title: "Agent Orchestration",
    category: "Agents",
    status: "Future",
    description:
      "Future direction for coordinating multiple AI tools, workflows, and intelligent enterprise application patterns.",
    evidence: ["Content migration future direction"],
    relatedDeploymentIds: [],
    tools: [],
    notes: ["Keep future-facing and avoid overstating current production experience."],
  },
];
