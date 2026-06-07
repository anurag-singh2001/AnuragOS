"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOS } from "@/features/os/window-manager";
import { profile } from "@/data/profile";
import { recruiterSummary } from "@/data/recruiter-summary";
import { deployments } from "@/data";
import { EvolutionMatrix } from "@/features/os/evolution-matrix";

export function RecruiterOverlay() {
  const { state, toggleRecruiterMode, openApp } = useOS();

  const featuredDeps = recruiterSummary.featuredDeploymentIds
    .map((id) => deployments.find((d) => d.id === id))
    .filter((d) => d !== undefined);

  if (!state.recruiterModeOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
        onClick={toggleRecruiterMode}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e1a]/98 shadow-2xl shadow-black/60 backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-white/[0.06] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400/60">
                  Recruiter Mode
                </p>
                <h2 className="mt-2 text-xl font-bold text-white">
                  {profile.name}
                </h2>
                <p className="mt-1 text-sm text-cyan-400/80">
                  {profile.title}
                </p>
              </div>
              <button
                onClick={toggleRecruiterMode}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-white/50 transition-colors hover:bg-white/[0.06]"
              >
                Close ✕
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              {recruiterSummary.headline}
            </p>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
            <EvolutionMatrix />

            {/* Featured Systems */}
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                Featured Systems
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {featuredDeps.map((dep) => (
                  <button
                    key={dep.id}
                    onClick={() => {
                      openApp("deployments");
                      toggleRecruiterMode();
                    }}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-left transition-colors hover:border-cyan-500/20 hover:bg-white/[0.04]"
                  >
                    <p className="text-xs font-medium text-white/80">
                      {dep.title}
                    </p>
                    <p className="mt-0.5 text-[10px] text-cyan-400/50">
                      {dep.category}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Core Technologies */}
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {recruiterSummary.coreTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-medium text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Direction */}
            <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400/60">
                Preferred Direction
              </p>
              <p className="mt-1 text-sm text-white/70">
                {recruiterSummary.preferredRoleDirection}
              </p>
            </div>

            {/* Contact actions */}
            <div className="flex flex-wrap gap-2">
              {profile.contactLinks
                .filter((l) => l.priority === "primary")
                .map((link) => (
                  <a
                    key={link.type}
                    href={link.href}
                    target={link.type === "email" ? undefined : "_blank"}
                    rel={
                      link.type === "email"
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="flex-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 py-2.5 text-center text-xs font-medium text-cyan-300 transition-colors hover:bg-cyan-500/20"
                  >
                    {link.label} →
                  </a>
                ))}
            </div>

            {/* Availability */}
            {recruiterSummary.availability && (
              <p className="text-center text-xs text-white/30">
                {recruiterSummary.availability}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
