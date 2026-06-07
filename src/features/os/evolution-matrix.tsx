import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MatrixStep = {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  icon: string;
};

const MATRIX_STEPS: MatrixStep[] = [
  {
    id: "step-1",
    icon: "🎓",
    title: "The Foundation",
    subtitle: "UPES & C-DAC PG-DAC",
    content: "Graduated with a B.Tech in CS (2020-2024), followed by a C-DAC Post Graduate Diploma in Advanced Computing (PG-DAC) to solidify core computer science and backend engineering fundamentals."
  },
  {
    id: "step-2",
    icon: "💻",
    title: "The Core",
    subtitle: "Software Engineer",
    content: "Joined CentraLogic in April 2025. Focused on delivering robust backend services and integrating frontends into massive enterprise workflows."
  },
  {
    id: "step-3",
    icon: "🏗️",
    title: "The Builder",
    subtitle: "Enterprise Systems",
    content: "Architecting high-volume CRM platforms using C#, ASP.NET Core, Node.js, Cosmos DB, and Kafka. Handling multi-tenant data and event-driven distributed systems."
  },
  {
    id: "step-4",
    icon: "🧠",
    title: "The Horizon",
    subtitle: "AI Systems Builder",
    content: "Evolving toward agentic software engineering. Building production-grade RAG pipelines, automating operational tickets, and orchestrating models via LangChain and Ollama."
  }
];

export function EvolutionMatrix() {
  const [activeStep, setActiveStep] = useState<string>(MATRIX_STEPS[0].id);

  const activeContent = MATRIX_STEPS.find(s => s.id === activeStep);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0c0e1a]/80 p-5 mt-6 mb-6">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
        The Evolution Matrix
      </h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Steps Navigator */}
        <div className="flex md:flex-col gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0 md:w-1/3 shrink-0">
          {MATRIX_STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-all ${
                activeStep === step.id
                  ? "bg-cyan-500/15 border border-cyan-500/30"
                  : "bg-transparent border border-transparent hover:bg-white/5"
              }`}
            >
              <span className={`text-sm ${activeStep === step.id ? "opacity-100" : "opacity-40"}`}>
                {step.icon}
              </span>
              <div>
                <p className={`text-xs font-bold ${activeStep === step.id ? "text-cyan-300" : "text-white/60"}`}>
                  {index + 1}. {step.title}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="flex-1 bg-black/40 rounded-lg border border-white/[0.04] p-4 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold mb-1">
                {activeContent?.title}
              </h4>
              <h5 className="text-lg font-semibold text-white mb-3">
                {activeContent?.subtitle}
              </h5>
              <p className="text-sm leading-relaxed text-white/70">
                {activeContent?.content}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
