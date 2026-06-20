"use client";

import { useOS } from "@/features/os/window-manager";
import { useState } from "react";

const desktopShortcuts = [
  { id: "projects", label: "Projects", icon: "🚀", appId: "deployments" },
  { id: "career", label: "Career", icon: "💼", appId: "career" },
  { id: "ai-lab", label: "AI Lab", icon: "🔬", appId: "ai-lab" },
  { id: "engineering-graph", label: "Engineering Graph", icon: "🕸️", appId: "engineering-graph" },
  { id: "build-log", label: "Build Log", icon: "📖", appId: "build-log" },
  { id: "resume", label: "Resume", icon: "📄", appId: "resume" },
  { id: "terminal", label: "Terminal", icon: "⌨️", appId: "terminal" },
  { id: "contact", label: "Contact", icon: "✉️", appId: "contact" },
  { id: "settings", label: "Settings", icon: "⚙️", appId: "settings" },
];

export function Desktop() {
  const { state, openApp } = useOS();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleShortcutClick = (id: string) => {
    setSelectedId(id);
  };

  const handleShortcutDoubleClick = (appId: string) => {
    openApp(appId);
  };

  // Support single tap for mobile screens (width < 768px)
  const handleShortcutTouch = (appId: string) => {
    if (window.innerWidth < 768) {
      openApp(appId);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1] pt-12 pb-20 overflow-y-auto"
      onClick={() => setSelectedId(null)}
    >
      {/* Desktop gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080a12]/50" />

      {/* Desktop shortcuts */}
      {state.preferences.showDesktopIcons && (
        <div className="relative z-10 grid auto-rows-[90px] grid-cols-[repeat(auto-fill,80px)] gap-4 p-6 select-none">
          {desktopShortcuts.map((shortcut) => {
            const isSelected = selectedId === shortcut.id;

            return (
              <button
                key={shortcut.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShortcutClick(shortcut.id);
                }}
                onDoubleClick={() => handleShortcutDoubleClick(shortcut.appId)}
                onTouchEnd={() => handleShortcutTouch(shortcut.appId)}
                className={`group flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 transition-all ${
                  isSelected
                    ? "bg-cyan-500/15 border border-cyan-500/30 shadow-[0_0_8px_rgba(0,255,255,0.15)]"
                    : "border border-transparent hover:bg-white/[0.04] hover:border-white/5"
                }`}
                title={`Open ${shortcut.label}`}
                aria-label={`Open ${shortcut.label}`}
              >
                <span className={`text-2xl drop-shadow-md transition-transform duration-200 group-hover:scale-105 ${
                  isSelected ? "scale-105" : ""
                }`}>
                  {shortcut.icon}
                </span>
                <span className={`text-center text-[10px] font-medium leading-tight drop-shadow transition-colors ${
                  isSelected ? "text-cyan-300 font-semibold" : "text-white/70 group-hover:text-white/95"
                }`}>
                  {shortcut.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
