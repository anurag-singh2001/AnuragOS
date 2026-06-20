"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { useOS } from "@/features/os/window-manager";
import { cn } from "@/lib/utils";
import { buildLogEntries, vNextData, JourneyStage } from "@/data/build-log";

// Mapping for quick timeline strip
const TIMELINE_STRIP = [
  { year: "2026", label: "AI Systems", stage: "AI Systems Builder" },
  { year: "2025", label: "Enterprise Sys.", stage: "Enterprise Systems Builder" },
  { year: "2025", label: "CentraLogic", stage: "Software Engineer" },
  { year: "2024", label: "C-DAC", stage: "C-DAC" },
  { year: "2020", label: "UPES", stage: "UPES Student" }
];

export function BuildLogApp() {
  const { isMobile } = useBreakpoints();
  const { openApp } = useOS();
  
  const [activeStage, setActiveStage] = useState<JourneyStage>("AI Systems Builder");

  // Calculate Statistics
  const stats = useMemo(() => {
    return {
      milestones: buildLogEntries.length,
      projects: buildLogEntries.filter(e => e.category === "Projects").length,
      certifications: buildLogEntries.filter(e => e.category === "Certification").length,
      yearsBuilding: new Date().getFullYear() - 2020,
      currentVersion: "v5.0"
    };
  }, []);

  // Group entries
  const groupedEntries = useMemo(() => {
    const groups: Record<string, typeof buildLogEntries> = {};
    buildLogEntries.forEach(entry => {
      if (!groups[entry.stage]) groups[entry.stage] = [];
      groups[entry.stage].push(entry);
    });
    return groups;
  }, []);

  return (
    <div className="flex h-full flex-col bg-[#050508] text-white">
      {/* Header & Stats */}
      <div className="shrink-0 border-b border-white/[0.08] bg-[#0c0e1a]/90 p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Build Log
        </h2>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <div className="flex flex-col">
            <span className="text-white/40 uppercase tracking-widest text-[9px]">Milestones</span>
            <span className="font-mono text-cyan-400 mt-0.5">{stats.milestones}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/40 uppercase tracking-widest text-[9px]">Projects</span>
            <span className="font-mono text-cyan-400 mt-0.5">{stats.projects}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/40 uppercase tracking-widest text-[9px]">Certifications</span>
            <span className="font-mono text-cyan-400 mt-0.5">{stats.certifications}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/40 uppercase tracking-widest text-[9px]">Years Building</span>
            <span className="font-mono text-cyan-400 mt-0.5">{stats.yearsBuilding}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white/40 uppercase tracking-widest text-[9px]">Current Version</span>
            <span className="font-mono text-cyan-400 mt-0.5">{stats.currentVersion}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cn("flex flex-1 overflow-hidden", isMobile ? "flex-col" : "flex-row")}>
        
        {/* Timeline Strip (Sidebar on Desktop, Top Scroll on Mobile) */}
        <div className={cn(
          "shrink-0 border-white/[0.08] bg-[#0a0c16]/50 overflow-y-auto no-scrollbar",
          isMobile ? "border-b flex flex-row overflow-x-auto p-4 gap-4" : "border-r w-48 p-6 flex flex-col gap-6"
        )}>
          {/* vNext Link */}
          <button
            onClick={() => setActiveStage("vNext")}
            className={cn(
              "text-left group transition-all",
              isMobile ? "shrink-0 border-r border-white/10 pr-4" : "border-b border-white/10 pb-4"
            )}
          >
            <span className="block text-[10px] font-mono text-purple-400/60 mb-0.5 group-hover:text-purple-400">Future</span>
            <span className="text-sm font-semibold text-white/80 group-hover:text-white">vNext</span>
          </button>

          {TIMELINE_STRIP.map(item => (
            <button
              key={item.stage}
              onClick={() => setActiveStage(item.stage as JourneyStage)}
              className="text-left group transition-all shrink-0"
            >
              <span className="block text-[10px] font-mono text-cyan-400/60 mb-0.5 group-hover:text-cyan-400">
                {item.year} →
              </span>
              <span className={cn(
                "text-sm font-medium transition-colors",
                activeStage === item.stage ? "text-cyan-400 font-bold" : "text-white/60 group-hover:text-white/90"
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Scrollable Main Views */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar scroll-smooth">
          
          {/* Active Stage Renderer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              
              {activeStage === "vNext" ? (
                /* vNext Special View */
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold tracking-tight text-white">vNext</h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
                      {vNextData.status}
                    </span>
                  </div>
                  <p className="text-white/60 leading-relaxed">
                    This section represents active exploration and future architecture goals. The focus is shifting from pure enterprise systems toward deeply integrated intelligent workflows.
                  </p>
                  
                  <div className="mt-8">
                    <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-semibold">Currently Exploring</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {vNextData.exploring.map(topic => (
                        <div key={topic} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
                            <span className="text-sm font-medium text-white/90">{topic}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Journey Stage View */
                <div className="space-y-10">
                  <div className="flex items-end gap-4 border-b border-white/10 pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                      {activeStage}
                    </h1>
                    {groupedEntries[activeStage]?.[0]?.versionBadge && (
                      <span className="mb-1.5 px-2 py-0.5 rounded-md bg-white/5 text-white/50 font-mono text-xs border border-white/10">
                        {groupedEntries[activeStage][0].versionBadge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-8">
                    {groupedEntries[activeStage]?.map(entry => (
                      <div key={entry.id} className="group relative pl-6 border-l-2 border-white/10 hover:border-cyan-500/40 transition-colors">
                        
                        {/* Dot indicator */}
                        <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#0a0c16] border-2 border-white/20 group-hover:border-cyan-400 group-hover:bg-cyan-400 transition-colors" />

                        <div className="flex flex-col gap-1.5 mb-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-lg font-semibold text-white/95">{entry.title}</h3>
                            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-medium border border-cyan-500/20">
                              {entry.category}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-white/40">{entry.date}</span>
                        </div>

                        <p className="text-sm text-white/70 leading-relaxed mb-4">
                          {entry.shortSummary}
                        </p>

                        <div className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-4 mb-4">
                          <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-2">Key Takeaways</h4>
                          <ul className="space-y-2">
                            {entry.keyTakeaways.map((takeaway, idx) => (
                              <li key={idx} className="flex gap-2 text-sm text-white/60">
                                <span className="text-cyan-500/50 mt-0.5">•</span>
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {entry.relatedTechnologies && entry.relatedTechnologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {entry.relatedTechnologies.map(tech => (
                              <span key={tech} className="px-2 py-1 rounded-md bg-white/5 text-white/50 text-[10px] font-medium">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {entry.relatedModules && entry.relatedModules.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {entry.relatedModules.map(mod => (
                              <button
                                key={mod.appId}
                                onClick={() => openApp(mod.appId)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-medium transition-colors border border-blue-500/20 hover:border-blue-500/40"
                              >
                                {mod.label} <span className="text-[10px]">↗</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
