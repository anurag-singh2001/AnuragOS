"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deployments } from "@/data";
import type { Deployment } from "@/types/content";

const categories = [
  "All",
  ...Array.from(new Set(deployments.map((d) => d.category))),
];

export function DeploymentsApp() {
  const [selectedId, setSelectedId] = useState<string | null>(
    deployments[0]?.id ?? null,
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? deployments
      : deployments.filter((d) => d.category === activeCategory);

  const selected = deployments.find((d) => d.id === selectedId) ?? null;

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0 overflow-y-auto border-b md:border-b-0 md:border-r border-white/[0.06] bg-[#0d0f1a]/80">
        {/* Category filters */}
        <div className="flex flex-wrap gap-1 border-b border-white/[0.06] p-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-cyan-500/20 text-cyan-300"
                  : "text-white/40 hover:bg-white/5 hover:text-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Deployment list */}
        <div className="p-2 flex md:block overflow-x-auto md:overflow-x-visible gap-1 md:gap-0">
          {filtered.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`mb-1 shrink-0 md:shrink w-auto md:w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
                selectedId === d.id
                  ? "bg-cyan-500/15 text-white border border-cyan-500/20"
                  : "text-white/60 border border-transparent hover:bg-white/[0.04] hover:text-white/80"
              }`}
            >
              <p className="text-xs font-medium leading-tight whitespace-nowrap md:whitespace-normal">{d.title}</p>
              <p className="mt-1 text-[10px] text-white/30">{d.category}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <DeploymentDetail deployment={selected} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DeploymentDetail({ deployment }: { deployment: Deployment }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            {deployment.title}
          </h2>
          <span className="shrink-0 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-medium text-cyan-400">
            {deployment.category}
          </span>
        </div>
        <p className="mt-3 text-xs md:text-sm leading-relaxed text-white/60">
          {deployment.summary}
        </p>
      </div>

      {/* Problem & Solution */}
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoBlock title="Problem" content={deployment.problem} />
        <InfoBlock title="Solution" content={deployment.solution} />
      </div>


      {/* Architecture */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
          Architecture
        </h3>
        <div className="flex flex-wrap gap-2">
          {deployment.architecture.map((item) => (
            <span
              key={item}
              className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/60"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {deployment.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-medium text-cyan-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Challenges */}
      {deployment.challenges.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
            Challenges
          </h3>
          <ul className="space-y-1.5">
            {deployment.challenges.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2 text-xs md:text-sm text-white/50"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/50" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Outcome */}
      <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
        <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-cyan-400/60">
          Outcome
        </h3>
        <p className="text-xs md:text-sm leading-relaxed text-white/70">
          {deployment.outcome}
        </p>
      </div>

      {/* Links */}
      {deployment.links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {deployment.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-cyan-400 transition-colors hover:bg-white/[0.06]"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}


    </div>
  );
}

function InfoBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/40">
        {title}
      </h3>
      <p className="text-xs md:text-sm leading-relaxed text-white/60">{content}</p>
    </div>
  );
}


