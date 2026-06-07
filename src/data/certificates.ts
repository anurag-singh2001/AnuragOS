import type { Certificate } from "@/types/content";

export const certificates: Certificate[] = [
  {
    id: "pg-dac",
    name: "C-DAC Post Graduate Diploma in Advanced Computing (PG-DAC)",
    issuer: "Institute for Advanced Computing and Software Development, Pune",
    year: "2024 - 2025",
    relatedSkills: ["Advanced Computing", "Software Development"],
    relatedTimelineEventId: "pg-dac",
    needsCredentialLink: false,
  },
  {
    id: "oracle-genai",
    name: "Oracle Cloud Infrastructure Generative AI Certified Professional",
    issuer: "Oracle",
    year: "2024",
    relatedSkills: ["Generative AI", "AI Systems"],
    needsCredentialLink: false,
  },
  {
    id: "deep-learning-fundamentals",
    name: "Deep Learning Fundamentals",
    issuer: "Cognitive Class.ai IBM",
    year: "2023",
    relatedSkills: ["Deep Learning", "Machine Learning"],
    needsCredentialLink: false,
  },
  {
    id: "postman-api-fundamentals",
    name: "Postman API Fundamentals Student Expert Certification",
    issuer: "Postman",
    year: "2023",
    relatedSkills: ["REST APIs", "Postman"],
    needsCredentialLink: false,
  },
  {
    id: "google-cloud-genai",
    name: "Introduction to Generative AI",
    issuer: "Google Cloud",
    year: "2023",
    relatedSkills: ["Generative AI"],
    needsCredentialLink: false,
  },
  {
    id: "claude-code-in-action",
    name: "Claude Code in Action",
    issuer: "Anthropic",
    year: "2025",
    relatedSkills: ["Claude", "AI-assisted development"],
    needsCredentialLink: false,
  },
];
