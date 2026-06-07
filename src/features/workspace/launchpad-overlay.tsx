"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Contact,
  FileText,
  FlaskConical,
  Layers3,
  Map,
  Terminal as TerminalIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkspaceState } from "@/features/workspace/workspace-state";
import type { WorkspaceModule } from "@/features/workspace/workspace-types";
import { cn } from "@/lib/utils";
import { deployments } from "@/data";

const launchpadItems: Array<{
  id: WorkspaceModule | "recruiterMode";
  label: string;
  icon: typeof Layers3;
}> = [
  { id: "recruiterMode", label: "Recruiter Mode", icon: BriefcaseBusiness },
  { id: "deployments", label: "Deployment Explorer", icon: Layers3 },
  { id: "career", label: "Career Journey", icon: Map },
  { id: "aiLab", label: "AI Lab", icon: FlaskConical },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "contact", label: "Contact", icon: Contact },
  { id: "terminal", label: "Terminal", icon: TerminalIcon },
];

export function LaunchpadOverlay() {
  const { state, setActiveModule, setActiveOverlay, clearOverlay } = useWorkspaceState();
  const focusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Focus first item when opened
    if (state.activeOverlay === "launchpad") {
      const timer = setTimeout(() => {
        focusRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [state.activeOverlay]);

  if (state.activeOverlay !== "launchpad") return null;

  function handleSelect(id: WorkspaceModule | "recruiterMode") {
    if (id === "recruiterMode") {
      setActiveOverlay("recruiterMode");
    } else {
      setActiveModule(id);
      clearOverlay();
    }
  }

  const recentDeployments = state.memory.recentlyViewedDeploymentIds
    .map((id) => deployments.find((d) => d.id === id))
    .filter((d) => d !== undefined);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Launchpad"
    >
      <div className="w-full max-w-lg">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Launchpad</h2>
            <p className="mt-1 text-sm text-muted-foreground">Open a workspace module</p>
          </div>
          <Button variant="ghost" size="icon" onClick={clearOverlay} title="Close Launchpad (Esc)">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {launchpadItems.map((item, index) => {
            const Icon = item.icon;
            const isRecruiter = item.id === "recruiterMode";
            
            return (
              <button
                key={item.id}
                ref={index === 0 ? focusRef : null}
                onClick={() => handleSelect(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center transition-all hover:bg-secondary hover:text-secondary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isRecruiter ? "border-primary/50 bg-primary/5" : "bg-surface"
                )}
              >
                <Icon className={cn("h-8 w-8", isRecruiter ? "text-primary" : "text-muted-foreground")} />
                <span className="text-sm font-medium leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>

        {recentDeployments.length > 0 && (
          <div className="mt-8 rounded-xl border bg-surface p-5">
            <h3 className="text-sm font-medium text-muted-foreground">Recent Systems</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {recentDeployments.map((deployment) => (
                <button
                  key={deployment!.id}
                  onClick={() => {
                    setActiveModule("deployments");
                    clearOverlay();
                    // Will need to dispatch selectDeployment if we wire it directly
                    // but for now, navigating to deployments is fine, or we can use the context
                  }}
                  className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {deployment!.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
