"use client";

import { useCallback, useRef } from "react";
import type { OSWindowPosition } from "@/features/os/os-types";

type UseDraggableOptions = {
  onMove: (position: OSWindowPosition) => void;
  onDragStart?: () => void;
  initialPosition: OSWindowPosition;
  enabled?: boolean;
};

export function useDraggable({
  onMove,
  onDragStart,
  initialPosition,
  enabled = true,
}: UseDraggableOptions) {
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const currentPos = useRef(initialPosition);
  currentPos.current = initialPosition;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!enabled) return;
      if ((e.target as HTMLElement).closest("[data-no-drag]")) return;

      dragging.current = true;
      offset.current = {
        x: e.clientX - currentPos.current.x,
        y: e.clientY - currentPos.current.y,
      };

      onDragStart?.();

      const handlePointerMove = (ev: PointerEvent) => {
        if (!dragging.current) return;
        const newX = Math.max(0, ev.clientX - offset.current.x);
        const newY = Math.max(28, ev.clientY - offset.current.y);
        onMove({ x: newX, y: newY });
      };

      const handlePointerUp = () => {
        dragging.current = false;
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [enabled, onMove, onDragStart],
  );

  return { handlePointerDown };
}
