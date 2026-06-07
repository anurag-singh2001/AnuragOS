"use client";

import { motion } from "framer-motion";

export function DeepVoid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#04060b]">
      {/* Animated orb 1 */}
      <motion.div
        animate={{
          x: ["-20%", "40%", "-10%"],
          y: ["-10%", "30%", "-20%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-1/4 -top-1/4 h-[80vw] w-[80vw] rounded-full bg-cyan-900/10 blur-[150px]"
      />

      {/* Animated orb 2 */}
      <motion.div
        animate={{
          x: ["20%", "-30%", "10%"],
          y: ["30%", "-10%", "20%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-1/4 -bottom-1/4 h-[70vw] w-[70vw] rounded-full bg-purple-900/10 blur-[130px]"
      />

      {/* Grid overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "20px 20px"
        }}
      />
    </div>
  );
}
