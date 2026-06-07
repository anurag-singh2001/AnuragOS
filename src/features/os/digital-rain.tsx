"use client";

import { useEffect, useRef } from "react";
import { useOS } from "@/features/os/window-manager";

type ColorConfig = {
  primary: string;
  glow: string;
  tailBase: (b: number) => string;
};

const COLOR_MAP: Record<string, ColorConfig> = {
  cyan: {
    primary: "rgba(0, 243, 255, 0.9)",
    glow: "#00f3ff",
    tailBase: (b) => `rgba(0, ${150 + Math.floor(b * 100)}, ${180 + Math.floor(b * 75)}, ${0.3 + b * 0.4})`,
  },
  green: {
    primary: "rgba(0, 255, 102, 0.9)",
    glow: "#00ff66",
    tailBase: (b) => `rgba(0, ${160 + Math.floor(b * 90)}, ${60 + Math.floor(b * 60)}, ${0.3 + b * 0.4})`,
  },
  amber: {
    primary: "rgba(255, 179, 0, 0.9)",
    glow: "#ffb300",
    tailBase: (b) => `rgba(${180 + Math.floor(b * 75)}, ${100 + Math.floor(b * 60)}, 0, ${0.3 + b * 0.4})`,
  },
  red: {
    primary: "rgba(255, 51, 51, 0.9)",
    glow: "#ff3333",
    tailBase: (b) => `rgba(${180 + Math.floor(b * 75)}, 0, ${40 + Math.floor(b * 40)}, ${0.3 + b * 0.4})`,
  },
};

export function DigitalRain() {
  const { state } = useOS();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(state.matrixColor);
  colorRef.current = state.matrixColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let columns: number[] = [];

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";
    const fontSize = 14;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colCount = Math.floor(canvas.width / fontSize);
      columns = Array.from({ length: colCount }, () =>
        Math.floor(Math.random() * -50),
      );
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(8, 10, 18, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const colorConfig = COLOR_MAP[colorRef.current] ?? COLOR_MAP.cyan;

      for (let i = 0; i < columns.length; i++) {
        const charIndex = Math.floor(Math.random() * chars.length);
        const char = chars[charIndex];
        const x = i * fontSize;
        const y = columns[i] * fontSize;

        const brightness = Math.random();
        if (brightness > 0.96) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = colorConfig.glow;
          ctx.shadowBlur = 8;
        } else if (brightness > 0.8) {
          ctx.fillStyle = colorConfig.primary;
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = colorConfig.tailBase(brightness);
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        }
        columns[i]++;
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.4 }}
      aria-hidden="true"
    />
  );
}
