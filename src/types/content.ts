export type ContactLinkType = "email" | "linkedin" | "github" | "twitter" | "portfolio";

export type ContactLink = {
  label: string;
  type: ContactLinkType;
  href: string;
  displayValue: string;
  priority: "primary" | "secondary";
};

export type Profile = {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  currentFocus: string;
  location?: string;
  availability?: string;
  resumeLink?: string;
  contactLinks: ContactLink[];
  publicNotes: string[];
};

export type DeploymentCategory =
  | "Enterprise Systems"
  | "Distributed Systems"
  | "AI Systems"
  | "AI Automation"
  | "Full Stack Systems"
  | "Applied AI";

export type DeploymentPriority = "highest" | "medium" | "low";

export type DeploymentFeaturedStatus = "hero" | "featured" | "supporting";

export type DeploymentLink = {
  label: string;
  href: string;
  type: "github" | "demo" | "case-study" | "private";
};

export type Deployment = {
  id: string;
  title: string;
  category: DeploymentCategory;
  priority: DeploymentPriority;
  featuredStatus: DeploymentFeaturedStatus;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  challenges: string[];
  outcome: string;
  links: DeploymentLink[];
  evidence: string[];
  publicVisibilityNotes: string[];
};

export type ExperiencePriority = "highest" | "medium" | "low";

export type Experience = {
  id: string;
  company: string;
  role: string;
  duration: string;
  location?: string;
  summary: string;
  techStack: string[];
  achievements: string[];
  relatedDeploymentIds: string[];
  priority: ExperiencePriority;
  publicVisibilityNotes: string[];
};

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Databases"
  | "Distributed Systems"
  | "Search & Processing"
  | "AI Systems"
  | "Developer Tools"
  | "Operating Systems";

export type Skill = {
  name: string;
  category: SkillCategory;
  proficiencyArea: string;
  relatedDeploymentIds: string[];
  evidence: string[];
  displayPriority: number;
};

export type TimelineEventType = "Education" | "Career" | "Achievement" | "Learning";

export type TimelineEvent = {
  id: string;
  title: string;
  type: TimelineEventType;
  date: string;
  description: string;
  relatedExperienceId?: string;
  relatedDeploymentId?: string;
  evidence: string[];
  displayPriority: number;
};

export type AiLabCategory = "RAG" | "Agents" | "MCP" | "Experiment" | "Learning";

export type AiLabStatus = "Current" | "Planned" | "Future";

export type AiLabEntry = {
  id: string;
  title: string;
  category: AiLabCategory;
  status: AiLabStatus;
  description: string;
  evidence: string[];
  relatedDeploymentIds: string[];
  tools: string[];
  notes: string[];
};

export type AchievementCategory =
  | "Professional"
  | "AI Systems"
  | "Open Source"
  | "Learning"
  | "Achievement";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: AchievementCategory;
  relatedExperienceId?: string;
  relatedDeploymentId?: string;
  evidenceLink?: string;
  metric?: string;
};

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialLink?: string;
  relatedSkills: string[];
  relatedTimelineEventId?: string;
  needsCredentialLink: boolean;
};

export type RecruiterSummary = {
  headline: string;
  keyPoints: string[];
  featuredDeploymentIds: string[];
  coreTechnologies: string[];
  resumeCta?: string;
  contactCta: string;
  availability?: string;
  preferredRoleDirection: string;
  location?: string;
};
