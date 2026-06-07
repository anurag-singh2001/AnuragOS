"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useOS, APP_REGISTRY } from "@/features/os/window-manager";

export function Dock() {
  const { state, openApp, toggleLaunchpad } = useOS();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dockItems = [
    { id: "launchpad", label: "Launchpad", icon: "🎛️", isLaunchpad: true },
    ...APP_REGISTRY,
  ];

  return (
    <nav
      className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-end gap-1 rounded-2xl border border-white/[0.08] bg-[#0c0e1a]/80 px-3 py-2 backdrop-blur-2xl"
      aria-label="Application dock"
    >
      {dockItems.map((item, index) => {
        const isLaunchpad = "isLaunchpad" in item;
        const isRunning = !isLaunchpad && state.windows.some((w) => w.appId === item.id);
        const distance =
          hoveredIndex !== null ? Math.abs(hoveredIndex - index) : 999;
        const scale =
          hoveredIndex !== null
            ? distance === 0
              ? 1.45
              : distance === 1
                ? 1.2
                : distance === 2
                  ? 1.05
                  : 1
            : 1;

        return (
          <div
            key={item.id}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-9 whitespace-nowrap rounded-md bg-[#1a1c2e]/95 px-2.5 py-1 text-[10px] font-medium text-white/90 shadow-lg backdrop-blur"
              >
                {item.label}
              </motion.div>
            )}

            <motion.button
              onClick={() => {
                if (isLaunchpad) {
                  toggleLaunchpad();
                } else {
                  openApp(item.id);
                }
              }}
              animate={{ scale }}
              transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-xl shadow-lg shadow-black/30 transition-colors hover:from-white/[0.12] hover:to-white/[0.05]"
              style={{ originY: 1 }}
              title={item.label}
              aria-label={`Open ${item.label}`}
            >
              {item.icon}
            </motion.button>

            {/* Active indicator */}
            {isRunning && (
              <div className="mt-1 h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(0,255,255,0.6)]" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
