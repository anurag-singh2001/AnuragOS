"use client";

import { useEffect } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useOS } from "@/features/os/window-manager";
import { DigitalRain } from "@/features/os/digital-rain";
import { CyberGrid } from "@/features/os/cyber-grid";
import { DeepVoid } from "@/features/os/deep-void";
import { BootSequence } from "@/features/os/boot-sequence";
import { MenuBar } from "@/features/os/menu-bar";
import { Desktop } from "@/features/os/desktop";
import { Dock } from "@/features/os/dock";
import { AppWindow } from "@/features/os/app-window";
import { CommandPalette } from "@/features/os/command-palette";
import { RecruiterOverlay } from "@/features/os/recruiter-overlay";
import { LaunchpadOverlay } from "@/features/os/launchpad-overlay";
import { SystemGuide } from "@/features/os/system-guide";

import { DeploymentsApp } from "@/features/apps/deployments-app";
import { CareerApp } from "@/features/apps/career-app";
import { AiLabApp } from "@/features/apps/ai-lab-app";
import { ResumeApp } from "@/features/apps/resume-app";
import { ContactApp } from "@/features/apps/contact-app";
import { TerminalApp } from "@/features/apps/terminal-app";
import { SettingsApp } from "@/features/apps/settings-app";
import { EngineeringGraphApp } from "@/features/apps/engineering-graph-app";
import { BuildLogApp } from "@/features/apps/build-log-app";

const APP_COMPONENTS: Record<string, React.ComponentType> = {
  deployments: DeploymentsApp,
  career: CareerApp,
  "ai-lab": AiLabApp,
  "engineering-graph": EngineeringGraphApp,
  resume: ResumeApp,
  contact: ContactApp,
  terminal: TerminalApp,
  settings: SettingsApp,
  "build-log": BuildLogApp,
};

export function OSDesktop() {
  const {
    state,
    toggleCommandPalette,
    toggleRecruiterMode,
    toggleLaunchpad,
    toggleSystemGuide,
    closeWindow,
    closeAllOverlays,
  } = useOS();

  // Global keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Ctrl+K / Cmd+K — command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      // Escape — close overlays or top window
      if (e.key === "Escape") {
        if (state.commandPaletteOpen || state.recruiterModeOpen || state.launchpadOpen) {
          closeAllOverlays();
        } else if (state.activeWindowId) {
          closeWindow(state.activeWindowId);
        }
        return;
      }

      // Only letter shortcuts when not typing
      if (isTyping) return;

      if (e.key === "r" || e.key === "R") {
        toggleRecruiterMode();
      }

      if (e.key === "l" || e.key === "L") {
        toggleLaunchpad();
      }

      if (e.key === "?") {
        toggleSystemGuide();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    state,
    toggleCommandPalette,
    toggleRecruiterMode,
    toggleLaunchpad,
    toggleSystemGuide,
    closeWindow,
    closeAllOverlays,
  ]);

  return (
    <MotionConfig reducedMotion={state.preferences.reduceMotion ? "always" : "user"}>
      <div className="fixed inset-0 overflow-hidden bg-[#080a12]">
        {/* Wallpapers */}
        {state.wallpaper === "rain" && <DigitalRain />}
        {state.wallpaper === "grid" && <CyberGrid />}
        {state.wallpaper === "void" && <DeepVoid />}

        {/* Gradient overlays for depth */}
        <div className="pointer-events-none fixed inset-0 z-[0] bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10" />
        <div className="pointer-events-none fixed inset-0 z-[0] bg-[radial-gradient(ellipse_at_top,_rgba(0,200,255,0.05)_0%,_transparent_60%)]" />

        {/* Boot sequence */}
        <BootSequence />

        {/* Desktop layer - only show after boot */}
        {state.bootPhase === "ready" && (
          <>
            <MenuBar />
            <Desktop />

            {/* Windows */}
            <AnimatePresence>
              {state.windows
                .filter((w) => !w.minimized)
                .map((win) => {
                  const AppComponent = APP_COMPONENTS[win.appId];
                  if (!AppComponent) return null;
                  return (
                    <AppWindow key={win.id} window={win}>
                      <AppComponent />
                    </AppWindow>
                  );
                })}
            </AnimatePresence>

            <Dock />
            <CommandPalette />
            <RecruiterOverlay />
            <LaunchpadOverlay />
            <SystemGuide />
          </>
        )}
      </div>
    </MotionConfig>
  );
}
