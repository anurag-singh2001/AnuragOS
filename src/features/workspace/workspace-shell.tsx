"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Contact,
  FileText,
  FlaskConical,
  Layers3,
  Map,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { deployments } from "@/data";
import { useWorkspaceState } from "@/features/workspace/workspace-state";
import type {
  FocusArea,
  SystemStatus,
  WorkspaceModule,
} from "@/features/workspace/workspace-types";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LaunchpadOverlay } from "./launchpad-overlay";
import { CommandPaletteOverlay } from "./command-palette-overlay";

const featuredDeploymentIds = [
  "energy-crm-platform",
  "multi-tenant-crm-platform",
  "pdf-rag-system",
  "ai-ticket-assistant",
];

const featuredDeployments = featuredDeploymentIds
  .map((id) => deployments.find((deployment) => deployment.id === id))
  .filter((deployment) => deployment !== undefined);

const moduleContext: Record<
  WorkspaceModule,
  {
    label: string;
    headline: string;
    description: string;
  }
> = {
  overview: {
    label: "Overview",
    headline: "Start with the strongest evidence.",
    description:
      "AnuragOS is organized around systems, career trajectory, AI direction, and direct contact paths.",
  },
  deployments: {
    label: "Deployments",
    headline: "Inspect Anurag's strongest systems.",
    description:
      "Enterprise CRM platforms, distributed workflows, and applied AI systems are the primary proof layer.",
  },
  career: {
    label: "Career Journey",
    headline: "Follow the path into enterprise systems.",
    description:
      "The journey moves from software foundations into CentraLogic, utility CRM platforms, and AI systems direction.",
  },
  aiLab: {
    label: "AI Lab",
    headline: "See the current AI systems direction.",
    description:
      "RAG workflows, AI ticket automation, coding agents, and MCP learning form the forward-looking workspace.",
  },
  resume: {
    label: "Resume",
    headline: "Review the recruiter-ready profile.",
    description:
      "Resume content is available through the workspace, while a focused recruiter overlay remains a later interaction layer.",
  },
  contact: {
    label: "Contact",
    headline: "Use the direct professional contact path.",
    description:
      "LinkedIn and email are the primary contact actions. GitHub remains secondary proof.",
  },
  terminal: {
    label: "Terminal",
    headline: "Command interaction is reserved for the next layer.",
    description:
      "Terminal remains part of AnuragOS, but it should support exploration rather than dominate the product.",
  },
};

const focusLabels: Record<FocusArea, string> = {
  overview: "Overview",
  "enterprise-systems": "Enterprise systems",
  "distributed-systems": "Distributed systems",
  "ai-systems": "AI systems",
  "career-journey": "Career journey",
  "recruiter-evaluation": "Recruiter evaluation",
  "contact-ready": "Contact ready",
  terminal: "Terminal",
};

const statusLabels: Record<SystemStatus, string> = {
  "workspace.ready": "Workspace ready",
  "module.overview.active": "Overview ready",
  "module.deployments.active": "Exploring featured systems",
  "module.career.active": "Reviewing career path",
  "module.aiLab.active": "Exploring AI direction",
  "module.resume.active": "Resume path ready",
  "module.contact.active": "Contact path ready",
  "module.terminal.active": "Terminal path ready",
  "mode.recruiter.active": "Recruiter view active",
  "inspector.deployment.open": "Inspecting a deployment",
  "command.palette.open": "Command search open",
  "launchpad.open": "Launchpad open",
  "terminal.drawer.open": "Terminal drawer open",
};

export function WorkspaceShell() {
  const { state, setActiveModule, setActiveOverlay, selectDeployment, resetWorkspace, clearOverlay } = useWorkspaceState();
  const activeContext = moduleContext[state.activeModule];

  // Global Keyboard Shortcuts
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "Escape") {
        clearOverlay();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setActiveOverlay("commandPalette");
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        setActiveOverlay("commandPalette");
        return;
      }

      if (e.key.toLowerCase() === "l") {
        e.preventDefault();
        setActiveOverlay("launchpad");
        return;
      }

      // Add R for recruiter, D for deployments, etc., if desired based on ARCHITECTURE.md
      if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        setActiveOverlay("recruiterMode");
        return;
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [setActiveOverlay, clearOverlay]);

  function inspectDeployment(deploymentId: string) {
    setActiveModule("deployments");
    selectDeployment(deploymentId);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SystemBar
        status={statusLabels[state.systemStatus]}
        onExplore={() => setActiveModule("deployments")}
        onReset={resetWorkspace}
      />

      <main className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[20rem_1fr] lg:px-6">
        <ContextPanel />

        <section
          className="min-h-[calc(100vh-7rem)] rounded-lg border bg-surface text-surface-foreground"
          aria-labelledby="workspace-heading"
        >
          <div className="border-b px-5 py-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-normal text-muted-foreground">
                  {focusLabels[state.currentFocusArea]}
                </p>
                <motion.h1
                  id="workspace-heading"
                  key={activeContext.headline}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.14 }}
                  className="mt-2 text-2xl font-semibold tracking-normal md:text-3xl"
                >
                  {activeContext.headline}
                </motion.h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {activeContext.description}
                </p>
              </div>
              <span className="rounded-sm border px-3 py-2 text-sm text-muted-foreground">
                {statusLabels[state.systemStatus]}
              </span>
            </div>
          </div>

          <div className="grid gap-6 p-5 xl:grid-cols-[1fr_22rem]">
            <DiscoverySurface onInspectDeployment={inspectDeployment} />
            <QuickActions
              onOpenModule={setActiveModule}
              onInspectDeployment={inspectDeployment}
              activeModule={state.activeModule}
            />
          </div>
        </section>
      </main>

      <OverlayHost />
    </div>
  );
}

function SystemBar({
  status,
  onExplore,
  onReset,
}: {
  status: string;
  onExplore: () => void;
  onReset: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <div>
          <p className="text-sm font-semibold">AnuragOS</p>
          <motion.p
            key={status}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.12 }}
            className="text-xs text-muted-foreground"
          >
            {status}
          </motion.p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={onExplore}>
            Explore Systems
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onReset} title="Reset workspace memory">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </header>
  );
}

function ContextPanel() {
  const { state } = useWorkspaceState();
  const recentDeployments =
    state.memory.recentlyViewedDeploymentIds
      .map((id) => deployments.find((deployment) => deployment.id === id)?.title)
      .filter((title) => title !== undefined)
      .join(", ") || "Nothing yet";

  return (
    <aside className="rounded-lg border bg-surface p-4 text-surface-foreground lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
      <h2 className="text-sm font-semibold tracking-normal">Workspace Context</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Start with systems. The rest of the workspace stays quiet until requested.
      </p>

      <div className="mt-5 grid gap-4">
        <ContextItem label="Current focus" value={focusLabels[state.currentFocusArea]} />
        <ContextItem
          label="Last opened"
          value={moduleContext[state.memory.lastOpenedModule].label}
        />
        <ContextItem label="Recently viewed" value={recentDeployments} />
      </div>

      <div className="mt-6 rounded-lg border bg-background p-4">
        <p className="text-sm font-medium">Primary proof</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Enterprise CRM, distributed systems, RAG, and AI automation are the first exploration
          path.
        </p>
      </div>
    </aside>
  );
}

function ContextItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b pb-3 last:border-b-0 last:pb-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.12 }}
        className="mt-1 text-sm font-medium"
      >
        {value}
      </motion.p>
    </div>
  );
}

function DiscoverySurface({
  onInspectDeployment,
}: {
  onInspectDeployment: (deploymentId: string) => void;
}) {
  const { state } = useWorkspaceState();

  return (
    <div>
      <div className="rounded-lg border bg-background p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-normal text-muted-foreground">
              Featured Systems
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-normal">
              Choose a system to inspect.
            </h2>
          </div>
          <span className="rounded-sm border px-2 py-1 text-xs text-muted-foreground">
            {featuredDeployments.length} indexed
          </span>
        </div>

        <div className="mt-5 grid gap-3">
          {featuredDeployments.map((deployment) => {
            const isSelected = deployment.id === state.selectedDeploymentId;

            return (
              <button
                key={deployment.id}
                type="button"
                onClick={() => onInspectDeployment(deployment.id)}
                className={cn(
                  "w-full rounded-lg border p-4 text-left transition-colors",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "bg-surface hover:bg-secondary hover:text-secondary-foreground",
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{deployment.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {deployment.summary}
                    </p>
                  </div>
                  <span className="rounded-sm border px-2 py-1 text-xs text-muted-foreground">
                    {deployment.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 rounded-lg border bg-background p-5">
        <h2 className="text-lg font-semibold tracking-normal">What stays quiet for now</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Full module pages, command search, launchpad, recruiter mode, and terminal interactions
          are intentionally hidden until their interaction layers are built.
        </p>
      </div>
    </div>
  );
}

function QuickActions({
  activeModule,
  onOpenModule,
  onInspectDeployment,
}: {
  activeModule: WorkspaceModule;
  onOpenModule: (module: WorkspaceModule) => void;
  onInspectDeployment: (deploymentId: string) => void;
}) {
  const actions: Array<{
    label: string;
    description: string;
    icon: typeof Layers3;
    active: boolean;
    onClick: () => void;
  }> = [
    {
      label: "Inspect Enterprise Systems",
      description: "Start with Energy CRM and utility workflows.",
      icon: Layers3,
      active: activeModule === "deployments",
      onClick: () => onInspectDeployment("energy-crm-platform"),
    },
    {
      label: "Inspect AI Systems",
      description: "Jump to PDF RAG and AI automation direction.",
      icon: FlaskConical,
      active: false,
      onClick: () => onInspectDeployment("pdf-rag-system"),
    },
    {
      label: "Follow Career Path",
      description: "Move toward the journey surface.",
      icon: Map,
      active: activeModule === "career",
      onClick: () => onOpenModule("career"),
    },
    {
      label: "Review Contact Path",
      description: "Keep LinkedIn and email one step away.",
      icon: Contact,
      active: activeModule === "contact",
      onClick: () => onOpenModule("contact"),
    },
    {
      label: "Resume Context",
      description: "Prepare recruiter-facing resume review.",
      icon: FileText,
      active: activeModule === "resume",
      onClick: () => onOpenModule("resume"),
    },
    {
      label: "Recruiter View Later",
      description: "Overlay interaction is intentionally not built yet.",
      icon: BriefcaseBusiness,
      active: false,
      onClick: () => onOpenModule("overview"),
    },
  ];

  return (
    <aside className="rounded-lg border bg-background p-5">
      <h2 className="text-lg font-semibold tracking-normal">Quick Actions</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        These actions change workspace focus without opening pages.
      </p>
      <div className="mt-5 grid gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                action.active
                  ? "border-primary bg-primary/10"
                  : "bg-surface hover:bg-secondary hover:text-secondary-foreground",
              )}
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                <span className="block text-sm font-medium">{action.label}</span>
                <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                  {action.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function OverlayHost() {
  const { state, clearOverlay } = useWorkspaceState();

  return (
    <div id="workspace-overlay-host" aria-live="polite">
      <AnimatePresence>
        {state.activeOverlay === "launchpad" && <LaunchpadOverlay />}
        {state.activeOverlay === "commandPalette" && <CommandPaletteOverlay />}
        {/* Placeholder for other overlays */}
        {state.activeOverlay !== "none" && state.activeOverlay !== "launchpad" && state.activeOverlay !== "commandPalette" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 flex items-center justify-center bg-background/80 p-6"
          >
            <div className="w-full max-w-md rounded-lg border bg-surface p-5 text-surface-foreground">
              <h2 className="text-lg font-semibold tracking-normal">Workspace Overlay</h2>
              <p className="mt-2 text-sm text-muted-foreground">{statusLabels[state.systemStatus]}</p>
              <Button className="mt-4" variant="secondary" onClick={clearOverlay}>
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
