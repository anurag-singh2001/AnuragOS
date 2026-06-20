"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOS } from "@/features/os/window-manager";

const bootMessages = [
  "Initializing kernel...",
  "Loading system modules...",
  "Mounting data volumes...",
  "Starting network interfaces...",
  "Loading deployment registry...",
  "Indexing AI lab entries...",
  "Compiling career timeline...",
  "Starting terminal service...",
  "System ready.",
];

export function BootSequence() {
  const { state, completeBoot, openApp } = useOS();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  function finishBoot() {
    setVisible(false);
    setTimeout(() => {
      completeBoot();
      if (state.preferences.restoreSession && state.preferences.lastActiveAppId) {
        openApp(state.preferences.lastActiveAppId);
      }
    }, 400);
  }

  function skipBoot() {
    setVisible(false);
    setTimeout(() => {
      completeBoot();
      if (state.preferences.restoreSession && state.preferences.lastActiveAppId) {
        openApp(state.preferences.lastActiveAppId);
      }
    }, 200);
  }

  useEffect(() => {
    if (state.bootPhase !== "idle") return;

    if (state.preferences.fastBoot) {
      skipBoot();
      return;
    }

    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= bootMessages.length - 1) {
          clearInterval(msgInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 300);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 200);

    const doneTimeout = setTimeout(() => {
      finishBoot();
    }, 3200);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      clearTimeout(doneTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.bootPhase, completeBoot]);

  if (state.bootPhase === "ready") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080a12]"
          onClick={skipBoot}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
              skipBoot();
            }
          }}
          aria-label="Skip boot sequence"
        >
          {/* Gradient glow behind logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 mb-8"
          >
            <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl">
              AnuragOS
            </h1>
            <p className="mt-2 text-center font-mono text-xs text-cyan-400/60">
              v1.0 — Engineering Workspace
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 w-72">
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          {/* Boot messages */}
          <div className="relative z-10 mt-6 h-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={messageIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-xs text-cyan-400/80"
              >
                {bootMessages[messageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Skip hint */}
          <p className="relative z-10 mt-8 text-xs text-white/20">
            Click or press any key to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
