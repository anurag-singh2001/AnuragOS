"use client";

import { useOS } from "@/features/os/window-manager";
import type { WallpaperStyle, MatrixColor } from "@/features/os/os-types";

const wallpapers = [
  { id: "rain" as WallpaperStyle, label: "Digital Rain", preview: "🌧️" },
  { id: "grid" as WallpaperStyle, label: "Cyber Grid", preview: "📐" },
  { id: "void" as WallpaperStyle, label: "Deep Void", preview: "🌌" },
];

const colors = [
  { id: "cyan" as MatrixColor, name: "Cyan", class: "bg-[#00f3ff]" },
  { id: "green" as MatrixColor, name: "Green", class: "bg-[#00ff66]" },
  { id: "amber" as MatrixColor, name: "Amber", class: "bg-[#ffb300]" },
  { id: "red" as MatrixColor, name: "Red", class: "bg-[#ff3333]" },
];

import { useState, useEffect, useCallback } from "react";

export function SettingsApp() {
  const { state, setWallpaper, setMatrixColor, updatePreferences } = useOS();
  const [stats, setStats] = useState({
    prefsStored: false,
    tourCompleted: false,
    guideHistoryCount: 0,
  });

  const refreshStats = useCallback(() => {
    try {
      const guideMem = localStorage.getItem("anuragos-system-guide-memory");
      let guideCount = 0;
      if (guideMem) {
        const parsed = JSON.parse(guideMem);
        guideCount = parsed.recentlyViewedQuestionIds?.length || 0;
      }

      setStats({
        prefsStored: !!localStorage.getItem("anuragos-preferences"),
        tourCompleted: !!localStorage.getItem("anuragos-tour-completed"),
        guideHistoryCount: guideCount,
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  const handleResetPreferences = () => {
    localStorage.removeItem("anuragos-preferences");
    window.location.reload();
  };

  const handleResetTour = () => {
    localStorage.removeItem("anuragos-tour-completed");
    localStorage.removeItem("anuragos-system-guide-memory");
    refreshStats();
  };

  const handleFactoryReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  const Toggle = ({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
      <div>
        <p className="text-xs font-medium text-white/70">{label}</p>
        <p className="mt-0.5 pr-4 text-[10px] text-white/40">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all ${
          checked ? "border-cyan-500 bg-cyan-500/20" : "border-white/10 bg-white/5"
        }`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-1.5 shadow-[0_0_8px_rgba(0,255,255,0.8)] bg-cyan-400" : "-translate-x-1.5 opacity-50"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto p-6">
      <h2 className="text-lg font-semibold text-white">System Preferences</h2>
      <p className="mt-1 text-xs text-white/40">Configure AnuragOS Behavior</p>

      {/* Workspace */}
      <section className="mt-6 space-y-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500/70">
          Workspace
        </h3>
        <Toggle
          label="Show Desktop Icons"
          desc="Display application shortcuts directly on the desktop."
          checked={state.preferences.showDesktopIcons}
          onChange={(v) => updatePreferences({ showDesktopIcons: v })}
        />
        <Toggle
          label="Restore Previous Session"
          desc="Automatically reopen the last active app on boot."
          checked={state.preferences.restoreSession}
          onChange={(v) => updatePreferences({ restoreSession: v })}
        />
      </section>

      {/* Startup & Boot */}
      <section className="mt-6 space-y-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500/70">
          Startup
        </h3>
        <Toggle
          label="Fast Boot Mode"
          desc="Skip the system initialization animation."
          checked={state.preferences.fastBoot}
          onChange={(v) => updatePreferences({ fastBoot: v })}
        />
      </section>

      {/* Window Manager */}
      <section className="mt-6 space-y-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500/70">
          Window Manager
        </h3>
        <Toggle
          label="Reduce Motion"
          desc="Disable UI animations and window transitions."
          checked={state.preferences.reduceMotion}
          onChange={(v) => updatePreferences({ reduceMotion: v })}
        />
      </section>

      {/* Terminal */}
      <section className="mt-6 space-y-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500/70">
          Terminal
        </h3>
        <Toggle
          label="Auto-Scroll"
          desc="Automatically scroll to the newest terminal output."
          checked={state.preferences.terminalAutoScroll}
          onChange={(v) => updatePreferences({ terminalAutoScroll: v })}
        />
      </section>

      {/* Personalization */}
      <section className="mt-6 space-y-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500/70">
          Personalization
        </h3>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-xs font-medium text-white/70">Wallpaper Style</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {wallpapers.map((wp) => (
              <button
                key={wp.id}
                onClick={() => setWallpaper(wp.id)}
                className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:scale-102 ${
                  state.wallpaper === wp.id
                    ? "border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_8px_rgba(0,255,255,0.1)]"
                    : "border-white/[0.06] hover:border-white/10 hover:bg-white/[0.01]"
                }`}
              >
                <span className="text-2xl">{wp.preview}</span>
                <span className="text-[10px] text-white/50">{wp.label}</span>
              </button>
            ))}
          </div>
        </div>

        {state.wallpaper === "rain" && (
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="text-xs font-medium text-white/70">Digital Rain Color</p>
            <div className="mt-3 flex gap-3">
              {colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setMatrixColor(c.id)}
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                    state.matrixColor === c.id
                      ? "border-white scale-110 shadow-lg"
                      : "border-transparent hover:scale-105"
                  }`}
                  title={c.name}
                  aria-label={`Select ${c.name} matrix rain color`}
                >
                  <span className={`h-6 w-6 rounded-full ${c.class}`} />
                  {state.matrixColor === c.id && (
                    <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-30 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Storage & State */}
      <section className="mt-6 space-y-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-cyan-500/70">
          Storage & State
        </h3>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <div className="flex justify-between border-b border-white/[0.06] pb-2">
            <span className="text-xs text-white/40">Preferences Stored</span>
            <span className="text-xs text-white/70">{stats.prefsStored ? "✓" : "✗"}</span>
          </div>
          <div className="flex justify-between border-b border-white/[0.06] pb-2 pt-1">
            <span className="text-xs text-white/40">Tour Completed</span>
            <span className="text-xs text-white/70">{stats.tourCompleted ? "✓" : "✗"}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-xs text-white/40">Guide History</span>
            <span className="text-xs text-white/70">{stats.guideHistoryCount} Items</span>
          </div>
        </div>
      </section>

      {/* Advanced Resets */}
      <section className="mt-6 mb-8 space-y-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-red-500/70">
          Advanced
        </h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleResetPreferences}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left text-xs font-medium text-white/70 hover:bg-white/[0.04] transition-colors"
          >
            Reset Preferences
          </button>
          <button
            onClick={handleResetTour}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left text-xs font-medium text-white/70 hover:bg-white/[0.04] transition-colors"
          >
            Reset Tour Progress
          </button>
          <button
            onClick={handleFactoryReset}
            className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-left text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors"
          >
            Factory Reset OS
          </button>
        </div>
      </section>
    </div>
  );
}
