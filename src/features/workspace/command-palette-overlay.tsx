"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useWorkspaceState } from "@/features/workspace/workspace-state";
import { deployments } from "@/data";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  label: string;
  category: "Inspect" | "Navigate" | "Recruiter" | "Action" | "System";
  action: () => void;
};

export function CommandPaletteOverlay() {
  const { state, setActiveModule, setActiveOverlay, clearOverlay, selectDeployment } = useWorkspaceState();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.activeOverlay === "commandPalette") {
      setQuery("");
      setActiveIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [state.activeOverlay]);

  // early return removed from here

  const commands: Command[] = [
    // Inspect
    ...deployments.map((d) => ({
      id: `inspect-${d.id}`,
      label: `Inspect ${d.title}`,
      category: "Inspect" as const,
      action: () => {
        setActiveModule("deployments");
        selectDeployment(d.id);
        clearOverlay();
      },
    })),
    // Navigate
    { id: "nav-deployments", label: "Open Deployment Explorer", category: "Navigate", action: () => { setActiveModule("deployments"); clearOverlay(); } },
    { id: "nav-career", label: "Open Career Journey", category: "Navigate", action: () => { setActiveModule("career"); clearOverlay(); } },
    { id: "nav-ai", label: "Open AI Lab", category: "Navigate", action: () => { setActiveModule("aiLab"); clearOverlay(); } },
    { id: "nav-resume", label: "Open Resume", category: "Navigate", action: () => { setActiveModule("resume"); clearOverlay(); } },
    { id: "nav-contact", label: "Open Contact", category: "Navigate", action: () => { setActiveModule("contact"); clearOverlay(); } },
    { id: "nav-terminal", label: "Open Terminal", category: "Navigate", action: () => { setActiveModule("terminal"); clearOverlay(); } },
    // Recruiter
    { id: "recruiter", label: "Open Recruiter Mode", category: "Recruiter", action: () => { setActiveOverlay("recruiterMode"); } },
    // Action
    { id: "action-email", label: "Copy Email", category: "Action", action: () => { navigator.clipboard.writeText("hello@anuragsingh.com"); clearOverlay(); } },
    { id: "action-linkedin", label: "Open LinkedIn", category: "Action", action: () => { window.open("https://linkedin.com/in/anuragsingh", "_blank"); clearOverlay(); } },
    // System
    { id: "sys-workspace", label: "Return to Workspace", category: "System", action: () => { setActiveModule("overview"); clearOverlay(); } },
  ];

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  // Group commands for rendering
  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, Command[]>);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && filteredCommands.length > 0) {
      e.preventDefault();
      filteredCommands[activeIndex].action();
    } else if (e.key === "Escape") {
      e.preventDefault();
      clearOverlay();
    }
  }

  // Effect to scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  if (state.activeOverlay !== "commandPalette") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 p-4 pt-[15vh] sm:p-6 sm:pt-[20vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={(e) => {
        if (e.target === e.currentTarget) clearOverlay();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-2xl overflow-hidden rounded-xl border bg-surface shadow-2xl"
      >
        <div className="flex items-center border-b px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            className="flex h-14 w-full bg-transparent px-3 py-4 text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <span className="text-xs text-muted-foreground">Esc to close</span>
        </div>

        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">No results found.</p>
          ) : (
            Object.entries(groupedCommands).map(([category, categoryCommands], groupIndex, array) => {
              const previousGroupsItemCount = array
                .slice(0, groupIndex)
                .reduce((sum, [, cmds]) => sum + cmds.length, 0);

              return (
                <div key={category} className="mb-2 last:mb-0">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                    {category}
                  </div>
                  {categoryCommands.map((command, index) => {
                    const globalIndex = previousGroupsItemCount + index;
                    const isActive = globalIndex === activeIndex;

                    return (
                      <button
                        key={command.id}
                        data-index={globalIndex}
                        onClick={command.action}
                        onMouseEnter={() => setActiveIndex(globalIndex)}
                        className={cn(
                          "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary hover:text-secondary-foreground"
                        )}
                      >
                        {command.label}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
