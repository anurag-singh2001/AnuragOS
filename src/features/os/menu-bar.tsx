"use client";

import { useEffect, useState } from "react";
import { useOS } from "@/features/os/window-manager";

export function MenuBar() {
  const { state, toggleCommandPalette, toggleRecruiterMode, toggleSystemGuide } = useOS();
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    }
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const activeApp = state.activeWindowId
    ? state.windows.find((w) => w.id === state.activeWindowId)
    : null;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-7 items-center justify-between border-b border-white/[0.06] bg-[#0c0e1a]/90 px-4 backdrop-blur-xl">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-xs font-bold text-transparent font-sans">
          AnuragOS
        </span>
        {activeApp && (
          <span className="text-xs font-medium text-white/70">
            {activeApp.title}
          </span>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSystemGuide}
          className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
            state.systemGuideOpen 
              ? "text-blue-400 bg-blue-500/10 border border-blue-500/20" 
              : "text-blue-400/70 hover:bg-white/5 hover:text-blue-300"
          }`}
          title="System Guide (?)"
        >
          🧭 System Guide
        </button>
        <button
          onClick={toggleRecruiterMode}
          className="rounded px-2 py-0.5 text-[10px] font-medium text-cyan-400/80 transition-colors hover:bg-white/5 hover:text-cyan-300"
          title="Recruiter Mode (R)"
        >
          👔 Recruiter
        </button>
        <button
          onClick={toggleCommandPalette}
          className="rounded px-2 py-0.5 text-[10px] text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
          title="Command Palette (⌘K)"
        >
          ⌘K
        </button>
        <span className="font-mono text-[10px] text-white/40">{time}</span>
      </div>
    </header>
  );
}
