"use client";

import { useMemo, useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { engineeringNodes, engineeringEdges } from "@/data/engineering-graph";
import { motion, AnimatePresence } from "framer-motion";

const categoryColors: Record<string, string> = {
  focus: "#8b5cf6", // purple
  company: "#eab308", // yellow
  experience: "#3b82f6", // blue
  deployment: "#22c55e", // green
  concept: "#f59e0b", // amber
  learning: "#ec4899", // pink
  technology: "#06b6d4", // cyan
  certificate: "#10b981", // emerald
  achievement: "#ef4444", // red
};

type ActivePath = "none" | "path-enterprise" | "path-ai" | "path-learning";

export function EngineeringGraphApp() {
  
  // Local state for the app (Node Inspector and Path Highlighting)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activePath, setActivePath] = useState<ActivePath>("none");

  // Filter nodes and edges based on active path
  const visibleNodesData = useMemo(() => {
    if (activePath === "none") return engineeringNodes;
    return engineeringNodes.filter(n => n.paths?.includes(activePath));
  }, [activePath]);

  const visibleEdgesData = useMemo(() => {
    if (activePath === "none") return engineeringEdges;
    return engineeringEdges.filter(e => {
      const srcNode = engineeringNodes.find(n => n.id === e.source);
      const tgtNode = engineeringNodes.find(n => n.id === e.target);
      return srcNode?.paths?.includes(activePath) && tgtNode?.paths?.includes(activePath);
    });
  }, [activePath]);

  // Create nodes with static grid positions
  const reactNodes: Node[] = useMemo(() => {
    const yLevels: Record<string, number> = {
      focus: 50,
      company: 150,
      experience: 250,
      deployment: 350,
      concept: 450,
      learning: 550,
      technology: 650,
    };

    const colCounters: Record<string, number> = {
      focus: 0, company: 0, experience: 0, deployment: 0,
      concept: 0, learning: 0, technology: 0, certificate: 0, achievement: 0
    };

    return visibleNodesData.map((data) => {
      const spacing = 200;
      const y = yLevels[data.category] || 750;
      const x = colCounters[data.category] * spacing + 100;
      colCounters[data.category]++;

      return {
        id: data.id,
        position: { x, y },
        data: { label: data.label, category: data.category },
        style: {
          background: "rgba(10, 10, 15, 0.95)",
          border: `1px solid ${categoryColors[data.category] || "#fff"}`,
          color: "#fff",
          borderRadius: "6px",
          padding: "10px",
          fontSize: "12px",
          fontWeight: "600",
          boxShadow: selectedNodeId === data.id 
            ? `0 0 15px ${categoryColors[data.category]}80`
            : "none",
          transition: "all 0.2s ease",
          width: 150,
          textAlign: "center" as const,
        },
      };
    });
  }, [visibleNodesData, selectedNodeId]);

  const reactEdges: Edge[] = useMemo(() => {
    return visibleEdgesData.map((edge) => ({
      ...edge,
      animated: true,
      style: { stroke: "#4b5563", strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#4b5563",
      },
    }));
  }, [visibleEdgesData]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    []
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const selectedNodeData = selectedNodeId 
    ? engineeringNodes.find(n => n.id === selectedNodeId) 
    : null;

  return (
    <div className="flex h-full w-full bg-[#050508] relative overflow-hidden">
      
      {/* Graph Area */}
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={reactNodes}
          edges={reactEdges}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          minZoom={0.5}
          maxZoom={2}
        >
          <Background color="rgba(255,255,255,0.05)" gap={16} size={1} />
          <Controls className="!bg-black/50 !border-white/10 !fill-white" />
        </ReactFlow>

        {/* Path Highlighting Controls */}
        <div className="absolute top-4 left-4 z-10 flex gap-2 bg-black/50 p-2 rounded border border-white/10 backdrop-blur-sm">
          <button 
            onClick={() => setActivePath("none")}
            className={`px-3 py-1.5 text-xs font-semibold rounded ${activePath === "none" ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10"}`}
          >
            Full Journey
          </button>
          <button 
            onClick={() => setActivePath("path-enterprise")}
            className={`px-3 py-1.5 text-xs font-semibold rounded ${activePath === "path-enterprise" ? "bg-green-500/30 text-green-300" : "text-green-500/60 hover:bg-green-500/10"}`}
          >
            Enterprise Systems
          </button>
          <button 
            onClick={() => setActivePath("path-ai")}
            className={`px-3 py-1.5 text-xs font-semibold rounded ${activePath === "path-ai" ? "bg-purple-500/30 text-purple-300" : "text-purple-500/60 hover:bg-purple-500/10"}`}
          >
            AI Systems
          </button>
          <button 
            onClick={() => setActivePath("path-learning")}
            className={`px-3 py-1.5 text-xs font-semibold rounded ${activePath === "path-learning" ? "bg-pink-500/30 text-pink-300" : "text-pink-500/60 hover:bg-pink-500/10"}`}
          >
            Learning Path
          </button>
        </div>
      </div>

      {/* Internal Node Inspector */}
      <AnimatePresence>
        {selectedNodeData && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="w-[320px] h-full border-l border-white/10 bg-[#0a0c14] flex flex-col z-20 shrink-0"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <span className="text-sm font-semibold text-white/90">Node Inspector</span>
              <button 
                onClick={() => setSelectedNodeId(null)}
                className="text-white/40 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 flex flex-col gap-6">
              <div>
                <div 
                  className="inline-block rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide mb-3"
                  style={{ 
                    borderColor: `${categoryColors[selectedNodeData.category]}50`,
                    backgroundColor: `${categoryColors[selectedNodeData.category]}15`,
                    color: categoryColors[selectedNodeData.category]
                  }}
                >
                  {selectedNodeData.category}
                </div>
                <h3 className="text-xl font-bold text-white/95">{selectedNodeData.label}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  {selectedNodeData.description}
                </p>
              </div>
              
              {selectedNodeData.details && (
                <div className="flex flex-col gap-4">
                  {Object.entries(selectedNodeData.details).map(([key, value]) => (
                    <div key={key}>
                      <h4 className="text-[11px] uppercase tracking-wider text-white/40 mb-1">{key}</h4>
                      <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
