"use client";

import { useEffect, useRef } from "react";

export function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx || !canvas) return;

      // Clear with dark void background
      ctx.fillStyle = "#05070f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(0, 243, 255, 0.07)";
      ctx.lineWidth = 1;

      // Draw horizon
      const horizonY = canvas.height * 0.45;

      // Draw horizontal lines (moving perspective grid)
      offset = (offset + 0.6) % 40;
      for (let y = horizonY; y < canvas.height; y += 40) {
        // Perspective multiplier based on depth
        const progress = (y - horizonY + offset) / (canvas.height - horizonY);
        const currentY = horizonY + progress * (canvas.height - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, currentY);
        ctx.lineTo(canvas.width, currentY);
        ctx.stroke();
      }

      // Draw vertical perspective lines vanishing at the center horizon
      const center = canvas.width / 2;
      const step = 80;
      for (let x = -canvas.width * 2; x < canvas.width * 3; x += step) {
        ctx.beginPath();
        ctx.moveTo(center, horizonY);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw a subtle cyan glowing horizon line
      ctx.strokeStyle = "rgba(0, 243, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#00f3ff";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(canvas.width, horizonY);
      ctx.stroke();

      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

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
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}
