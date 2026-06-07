"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOS } from "@/features/os/window-manager";
import { deployments } from "@/data";
import { profile } from "@/data/profile";

type CommandItem = {
  id: string;
  label: string;
  category: string;
  action: () => void;
};

export function CommandPalette() {
  const { state, toggleCommandPalette, openApp } = useOS();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<CommandItem[]>(
    () => [
      // Apps
      { id: "open-deployments", label: "Open Deployments", category: "Apps", action: () => { openApp("deployments"); toggleCommandPalette(); } },
      { id: "open-career", label: "Open Career Journey", category: "Apps", action: () => { openApp("career"); toggleCommandPalette(); } },
      { id: "open-ai-lab", label: "Open AI Lab", category: "Apps", action: () => { openApp("ai-lab"); toggleCommandPalette(); } },
      { id: "open-resume", label: "Open Resume", category: "Apps", action: () => { openApp("resume"); toggleCommandPalette(); } },
      { id: "open-contact", label: "Open Contact", category: "Apps", action: () => { openApp("contact"); toggleCommandPalette(); } },
      { id: "open-terminal", label: "Open Terminal", category: "Apps", action: () => { openApp("terminal"); toggleCommandPalette(); } },
      { id: "open-settings", label: "Open Settings", category: "Apps", action: () => { openApp("settings"); toggleCommandPalette(); } },

      // Deployments
      ...deployments.map((d) => ({
        id: `inspect-${d.id}`,
        label: `Inspect ${d.title}`,
        category: "Deployments",
        action: () => { openApp("deployments"); toggleCommandPalette(); },
      })),

      // Contact
      ...profile.contactLinks.map((link) => ({
        id: `contact-${link.type}`,
        label: `Open ${link.label}`,
        category: "Contact",
        action: () => { window.open(link.href, "_blank"); toggleCommandPalette(); },
      })),
    ],
    [openApp, toggleCommandPalette],
  );

  const filtered = query.trim()
    ? commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.category.toLowerCase().includes(query.toLowerCase()),
      )
    : commands;

  useEffect(() => {
    if (state.commandPaletteOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [state.commandPaletteOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
    } else if (e.key === "Escape") {
      toggleCommandPalette();
    }
  }

  if (!state.commandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 pt-[15vh] backdrop-blur-sm"
        onClick={toggleCommandPalette}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-lg overflow-hidden rounded-xl border border-white/[0.08] bg-[#0e101a]/98 shadow-2xl shadow-black/60 backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
            <span className="text-sm text-white/30">⌘</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search commands, apps, projects..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
              aria-label="Command palette search"
            />
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-white/30">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-72 overflow-y-auto py-2">
            {filtered.length === 0 ? (
              <p className="px-4 py-6 text-center text-xs text-white/20">
                No results found
              </p>
            ) : (
              (() => {
                let lastCategory = "";
                return filtered.map((cmd, index) => {
                  const showCategory = cmd.category !== lastCategory;
                  lastCategory = cmd.category;
                  return (
                    <div key={cmd.id}>
                      {showCategory && (
                        <p className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-white/20">
                          {cmd.category}
                        </p>
                      )}
                      <button
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                          selectedIndex === index
                            ? "bg-cyan-500/10 text-white"
                            : "text-white/60 hover:bg-white/[0.03]"
                        }`}
                      >
                        <span className="flex-1">{cmd.label}</span>
                        {selectedIndex === index && (
                          <span className="text-[10px] text-cyan-400/50">
                            Enter ↵
                          </span>
                        )}
                      </button>
                    </div>
                  );
                });
              })()
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
