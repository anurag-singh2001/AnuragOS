"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timeline } from "@/data/timeline";
import { experience } from "@/data/experience";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { cn } from "@/lib/utils";

export function CareerApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { isMobile } = useBreakpoints();
  const sorted = [...timeline].sort(
    (a, b) => a.displayPriority - b.displayPriority,
  );

  const selectedEvent = sorted.find((e) => e.id === selectedId);
  const relatedExperience = selectedEvent?.relatedExperienceId
    ? experience.find((exp) => exp.id === selectedEvent.relatedExperienceId)
    : null;

  return (
    <div className="flex h-full relative">
      {/* Timeline */}
      <div
        className={cn(
          "shrink-0 overflow-y-auto border-r border-white/[0.06] p-5 transition-all",
          isMobile ? (selectedId ? "hidden" : "w-full border-r-0") : "w-72"
        )}
      >
        <h2 className="mb-4 text-sm font-semibold text-white/80">
          Career Timeline
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-cyan-500/40 via-blue-500/30 to-purple-500/20" />

          {sorted.map((event) => {
            const isSelected = selectedId === event.id;
            return (
              <button
                key={event.id}
                onClick={() => setSelectedId(event.id)}
                className={`relative mb-4 w-full pl-8 text-left transition-colors ${
                  isSelected ? "text-white" : "text-white/50 hover:text-white/70"
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute left-1.5 top-1 h-3 w-3 rounded-full border-2 transition-colors ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                      : "border-white/20 bg-[#0a0c16]"
                  }`}
                />
                <p className="text-xs font-medium">{event.title}</p>
                <p className="mt-0.5 text-[10px] text-white/30">
                  {event.date}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-medium ${
                    event.type === "Career"
                      ? "bg-blue-500/15 text-blue-300"
                      : event.type === "Education"
                        ? "bg-green-500/15 text-green-300"
                        : "bg-purple-500/15 text-purple-300"
                  }`}
                >
                  {event.type}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <div
        className={cn(
          "flex-1 overflow-y-auto p-6 transition-all",
          isMobile ? (selectedId ? "block w-full" : "hidden") : "block"
        )}
      >
        <AnimatePresence mode="wait">
          {selectedEvent ? (
            <motion.div
              key={selectedEvent.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="space-y-5"
            >
              {isMobile && (
                <button
                  onClick={() => setSelectedId(null)}
                  className="flex items-center gap-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  ← Back to Timeline
                </button>
              )}
              <div>
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                    selectedEvent.type === "Career"
                      ? "bg-blue-500/15 text-blue-300"
                      : selectedEvent.type === "Education"
                        ? "bg-green-500/15 text-green-300"
                        : "bg-purple-500/15 text-purple-300"
                  }`}
                >
                  {selectedEvent.type}
                </span>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  {selectedEvent.title}
                </h2>
                <p className="mt-1 font-mono text-xs text-cyan-400/60">
                  {selectedEvent.date}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-white/60">
                {selectedEvent.description}
              </p>

              {relatedExperience && (
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
                    {relatedExperience.company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-white/70">
                    {relatedExperience.role}
                  </p>
                  <p className="mt-0.5 text-xs text-white/40">
                    {relatedExperience.duration}
                    {relatedExperience.location
                      ? ` · ${relatedExperience.location}`
                      : ""}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {relatedExperience.summary}
                  </p>

                  {relatedExperience.achievements.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {relatedExperience.achievements.map((a) => (
                        <li
                          key={a}
                          className="flex items-start gap-2 text-xs text-white/50"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-500/50" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}

                  {relatedExperience.techStack.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {relatedExperience.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full items-center justify-center"
            >
              <p className="text-sm text-white/30">
                Select a timeline event to inspect
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
