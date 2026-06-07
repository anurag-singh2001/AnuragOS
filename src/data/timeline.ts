import type { TimelineEvent } from "@/types/content";

export const timeline: TimelineEvent[] = [
  {
    id: "upes-btech",
    title: "B.Tech in Computer Science and Engineering",
    type: "Education",
    date: "2020 - 2024",
    description:
      "Computer Science and Engineering foundation at University of Petroleum and Energy Studies, Dehradun, with CGPA 7.45.",
    relatedExperienceId: "upes-btech",
    evidence: ["Resume-confirmed education"],
    displayPriority: 10,
  },
  {
    id: "umbeo-internship",
    title: "Full Stack Web Developer Intern",
    type: "Career",
    date: "May - July 2022",
    description:
      "Early full-stack development experience at Umbeo Technologies, building client websites and a React.js location-map feature.",
    relatedExperienceId: "umbeo-technologies",
    evidence: ["Resume-confirmed internship"],
    displayPriority: 20,
  },
  {
    id: "celebal-internship",
    title: "Data Science Intern",
    type: "Career",
    date: "May - July 2023",
    description:
      "Data science internship at Celebal Technologies with exposure to machine learning, algorithms, and deep learning direction.",
    relatedExperienceId: "celebal-technologies",
    evidence: ["Resume-confirmed internship"],
    displayPriority: 30,
  },
  {
    id: "pg-dac",
    title: "C-DAC Post Graduate Diploma in Advanced Computing (PG-DAC)",
    type: "Education",
    date: "2024 - 2025",
    description:
      "Advanced computing program at Institute for Advanced Computing and Software Development, Pune, with 67.3% score.",
    relatedExperienceId: "c-dac-pg-dac",
    evidence: ["Resume-confirmed education"],
    displayPriority: 40,
  },
  {
    id: "centralogic-role",
    title: "Software Developer Engineer",
    type: "Career",
    date: "April 2025 - Present",
    description:
      "Professional software engineering role focused on enterprise CRM platforms, distributed systems, business workflows, and production-oriented software.",
    relatedExperienceId: "centralogic",
    evidence: ["Resume-confirmed current role"],
    displayPriority: 50,
  },
  {
    id: "enterprise-systems-builder",
    title: "Enterprise Systems Builder",
    type: "Learning",
    date: "Current",
    description:
      "Current identity shaped by CRM platforms, backend services, search infrastructure, workflow automation, and event-driven architecture.",
    relatedExperienceId: "centralogic",
    evidence: ["Content migration direction", "Resume-confirmed CentraLogic projects"],
    displayPriority: 60,
  },
  {
    id: "ai-systems-builder",
    title: "AI Systems Builder",
    type: "Learning",
    date: "Current",
    description:
      "Current direction into RAG systems, AI automation, coding agents, MCP, and intelligent enterprise applications.",
    relatedDeploymentId: "pdf-rag-system",
    evidence: ["Content migration direction", "Resume-confirmed AI projects"],
    displayPriority: 70,
  },
];
