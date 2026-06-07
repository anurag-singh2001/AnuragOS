"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiLabEntries } from "@/data/ai-lab";

const statusColors: Record<string, string> = {
  Current: "bg-green-500/15 text-green-300 border-green-500/30",
  Planned: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Future: "bg-purple-500/15 text-purple-300 border-purple-500/30",
};

export function AiLabApp() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">AI Lab</h2>
        <p className="mt-1 text-sm text-white/40">
          Current AI systems direction, experiments, and learning tracks.
        </p>
      </div>

      <div className="grid gap-3">
        {aiLabEntries.map((entry) => {
          const isExpanded = expandedId === entry.id;
          return (
            <motion.div
              key={entry.id}
              layout
              className="overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]"
            >
              <button
                onClick={() =>
                  setExpandedId(isExpanded ? null : entry.id)
                }
                className="flex w-full items-start justify-between gap-4 p-4 text-left transition-colors hover:bg-white/[0.02]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-white">
                      {entry.title}
                    </h3>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${
                        statusColors[entry.status] ?? "text-white/40"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/40">
                    {entry.category}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-white/20">
                  {isExpanded ? "▼" : "▶"}
                </span>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/[0.04] p-4 pt-3 space-y-3">
                      <p className="text-sm leading-relaxed text-white/60">
                        {entry.description}
                      </p>

                      {entry.tools.length > 0 && (
                        <div>
                          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/30">
                            Tools
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {entry.tools.map((tool) => (
                              <span
                                key={tool}
                                className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-300"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {entry.notes.length > 0 && (
                        <div className="rounded-md border border-white/[0.04] bg-white/[0.01] p-2.5">
                          {entry.notes.map((note) => (
                            <p
                              key={note}
                              className="text-xs italic text-white/30"
                            >
                              {note}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
