export type BootState = "idle" | "running" | "skipped" | "complete";

export type WorkspaceModule =
  | "overview"
  | "deployments"
  | "career"
  | "aiLab"
  | "resume"
  | "contact"
  | "terminal";

export type WorkspaceOverlay =
  | "none"
  | "launchpad"
  | "commandPalette"
  | "recruiterMode"
  | "terminalDrawer";

export type WorkspaceInspector = "none" | "deployment" | "careerEvent" | "aiLabEntry";

export type FocusArea =
  | "overview"
  | "enterprise-systems"
  | "distributed-systems"
  | "ai-systems"
  | "career-journey"
  | "recruiter-evaluation"
  | "contact-ready"
  | "terminal";

export type SystemStatus =
  | "workspace.ready"
  | "module.overview.active"
  | "module.deployments.active"
  | "module.career.active"
  | "module.aiLab.active"
  | "module.resume.active"
  | "module.contact.active"
  | "module.terminal.active"
  | "mode.recruiter.active"
  | "inspector.deployment.open"
  | "command.palette.open"
  | "launchpad.open"
  | "terminal.drawer.open";

export type WorkspaceMemory = {
  lastOpenedModule: WorkspaceModule;
  recentlyViewedDeploymentIds: string[];
  currentFocusArea: FocusArea;
};

export type WorkspaceState = {
  bootState: BootState;
  activeModule: WorkspaceModule;
  activeOverlay: WorkspaceOverlay;
  activeInspector: WorkspaceInspector;
  selectedDeploymentId: string | null;
  selectedCareerEventId: string | null;
  currentFocusArea: FocusArea;
  systemStatus: SystemStatus;
  memory: WorkspaceMemory;
  hydrated: boolean;
};
