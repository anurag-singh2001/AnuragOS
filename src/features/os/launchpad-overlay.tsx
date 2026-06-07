"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOS, APP_REGISTRY } from "@/features/os/window-manager";

export function LaunchpadOverlay() {
  const { state, toggleLaunchpad, openApp } = useOS();

  if (!state.launchpadOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/60 p-6 backdrop-blur-2xl"
        onClick={toggleLaunchpad}
      >
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px] animate-pulse" />
        </div>

        {/* Content container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Launchpad
            </h2>
            <p className="mt-1 text-xs text-white/40">
              Double-click or tap to launch workspaces
            </p>
          </div>

          {/* Grid of Apps */}
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
            {APP_REGISTRY.map((app, index) => (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => {
                  openApp(app.id);
                  toggleLaunchpad();
                }}
                className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/[0.04] bg-white/[0.01] p-4 transition-all hover:scale-105 hover:bg-white/[0.05] hover:border-cyan-500/30 shadow-lg shadow-black/25"
              >
                <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform duration-200">
                  {app.icon}
                </span>
                <span className="text-[11px] font-semibold text-white/60 group-hover:text-white/90 transition-colors">
                  {app.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* ESC Hint */}
          <p className="mt-10 text-[10px] text-white/20">
            Press ESC or click anywhere outside to close
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
