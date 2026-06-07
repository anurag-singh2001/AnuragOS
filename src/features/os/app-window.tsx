"use client";

import { motion } from "framer-motion";
import { useOS } from "@/features/os/window-manager";
import { useDraggable } from "@/hooks/use-draggable";
import type { OSWindow } from "@/features/os/os-types";
import { cn } from "@/lib/utils";

type AppWindowProps = {
  window: OSWindow;
  children: React.ReactNode;
};

export function AppWindow({ window: win, children }: AppWindowProps) {
  const { state, closeWindow, minimizeWindow, maximizeWindow, focusWindow, moveWindow } =
    useOS();

  const isActive = state.activeWindowId === win.id;

  const { handlePointerDown } = useDraggable({
    onMove: (pos) => moveWindow(win.id, pos),
    onDragStart: () => focusWindow(win.id),
    initialPosition: win.position,
    enabled: !win.maximized,
  });

  if (win.minimized) return null;

  const style = win.maximized
    ? { top: 28, left: 0, right: 0, bottom: 56, width: "100%", height: "calc(100vh - 84px)" }
    : {
        top: `min(${win.position.y}px, calc(100vh - 120px))`,
        left: `min(${win.position.x}px, calc(100vw - 40px))`,
        width: `min(${win.size.width}px, calc(100vw - 16px))`,
        height: `min(${win.size.height}px, calc(100vh - 100px))`,
      };

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.92, opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(
        "fixed overflow-hidden rounded-xl border shadow-2xl shadow-black/40",
        isActive
          ? "border-white/[0.1] ring-1 ring-cyan-500/20"
          : "border-white/[0.06]",
      )}
      style={{
        ...style,
        zIndex: win.zIndex,
      }}
      onPointerDown={() => {
        if (!isActive) focusWindow(win.id);
      }}
    >
      {/* Title bar */}
      <div
        className={cn(
          "flex h-10 shrink-0 cursor-grab items-center justify-between border-b px-3 active:cursor-grabbing",
          isActive
            ? "border-white/[0.08] bg-[#12141f]/95"
            : "border-white/[0.04] bg-[#0e1019]/95",
        )}
        onPointerDown={handlePointerDown}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-2" data-no-drag>
          <button
            onClick={() => closeWindow(win.id)}
            className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f57] transition-all hover:scale-105 hover:brightness-110"
            title="Close"
            aria-label="Close window"
          >
            <span className="text-[8px] leading-none text-black/0 group-hover:text-black/80 font-bold">
              ✕
            </span>
          </button>
          <button
            onClick={() => minimizeWindow(win.id)}
            className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#febc2e] transition-all hover:scale-105 hover:brightness-110"
            title="Minimize"
            aria-label="Minimize window"
          >
            <span className="text-[8px] leading-none text-black/0 group-hover:text-black/80 font-bold">
              −
            </span>
          </button>
          <button
            onClick={() => maximizeWindow(win.id)}
            className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#28c840] transition-all hover:scale-105 hover:brightness-110"
            title="Maximize"
            aria-label="Maximize window"
          >
            <span className="text-[8px] leading-none text-black/0 group-hover:text-black/80 font-bold">
              ⤢
            </span>
          </button>
        </div>

        {/* Window title */}
        <span className="pointer-events-none select-none text-xs font-medium text-white/50">
          {win.title}
        </span>

        <div className="w-14" /> {/* Spacer for symmetry */}
      </div>

      {/* Content area */}
      <div className="h-[calc(100%-2.5rem)] overflow-auto bg-[#0a0c16]/95 backdrop-blur-xl">
        {children}
      </div>
    </motion.div>
  );
}
