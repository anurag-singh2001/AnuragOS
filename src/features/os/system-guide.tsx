"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOS } from "@/features/os/window-manager";
import {
  guideCategories,
  explorationPaths,
  tourSteps,
  getQuestion,
  getCategory,
  getAppContext,
} from "@/data/system-guide";
import type {
  GuideQuestion,
} from "@/data/system-guide";

/* ------------------------------------------------------------------ */
/* Local Storage Keys                                                  */
/* ------------------------------------------------------------------ */

const LS_KEY_MEMORY = "anuragos-system-guide-memory";
const LS_KEY_TOURED = "anuragos-tour-completed";

type GuideMemory = {
  lastCategoryId: string | null;
  lastQuestionId: string | null;
  recentQuestionIds: string[];
};

function loadMemory(): GuideMemory {
  if (typeof window === "undefined") return { lastCategoryId: null, lastQuestionId: null, recentQuestionIds: [] };
  try {
    const raw = localStorage.getItem(LS_KEY_MEMORY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { lastCategoryId: null, lastQuestionId: null, recentQuestionIds: [] };
}

function saveMemory(memory: GuideMemory) {
  try { localStorage.setItem(LS_KEY_MEMORY, JSON.stringify(memory)); } catch { /* ignore */ }
}

function hasToured(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(LS_KEY_TOURED) === "true";
}

function markToured() {
  try { localStorage.setItem(LS_KEY_TOURED, "true"); } catch { /* ignore */ }
}

/* ------------------------------------------------------------------ */
/* View Types                                                          */
/* ------------------------------------------------------------------ */

type View =
  | { kind: "home" }
  | { kind: "welcome" }
  | { kind: "category"; categoryId: string }
  | { kind: "question"; questionId: string }
  | { kind: "paths" }
  | { kind: "tour"; stepIndex: number }
  | { kind: "recent" };

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function SystemGuide() {
  const { state, toggleSystemGuide, openApp } = useOS();
  const [delayedShow, setDelayedShow] = useState(false);
  const [view, setView] = useState<View>({ kind: "home" });
  const [memory, setMemory] = useState<GuideMemory>(loadMemory);

  // Delay appearance until boot is ready
  useEffect(() => {
    if (state.bootPhase === "ready") {
      const timer = setTimeout(() => setDelayedShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, [state.bootPhase]);

  // Show welcome for first-time visitors
  useEffect(() => {
    if (delayedShow && !hasToured()) {
      setView({ kind: "welcome" });
    }
  }, [delayedShow]);

  const isVisible = state.systemGuideOpen && delayedShow;

  // Resolve active app for context awareness
  const activeWindow = state.activeWindowId
    ? state.windows.find((w) => w.id === state.activeWindowId)
    : null;
  const activeAppId = activeWindow?.appId ?? null;
  const appContext = activeAppId ? getAppContext(activeAppId) : undefined;

  // --- Navigation Helpers ---

  const goHome = useCallback(() => setView({ kind: "home" }), []);

  const goToCategory = useCallback((categoryId: string) => {
    setView({ kind: "category", categoryId });
    setMemory((prev) => {
      const next = { ...prev, lastCategoryId: categoryId };
      saveMemory(next);
      return next;
    });
  }, []);

  const goToQuestion = useCallback((questionId: string) => {
    setView({ kind: "question", questionId });
    setMemory((prev) => {
      const recents = [questionId, ...prev.recentQuestionIds.filter((id) => id !== questionId)].slice(0, 10);
      const next = { ...prev, lastQuestionId: questionId, recentQuestionIds: recents };
      saveMemory(next);
      return next;
    });
  }, []);

  const startTour = useCallback(() => {
    setView({ kind: "tour", stepIndex: 0 });
  }, []);

  const handleAction = useCallback((appId: string) => {
    openApp(appId);
  }, [openApp]);

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 20, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed z-[100] flex flex-col overflow-hidden border border-white/[0.08] bg-[#0a0a0f]/95 shadow-2xl shadow-black/60 backdrop-blur-xl w-[calc(100vw-32px)] md:w-[380px] left-4 md:left-auto right-4 md:right-6 top-16 md:top-10 rounded-2xl md:rounded-xl max-h-[80vh] md:max-h-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5 cursor-default select-none">
            <div className="flex items-center gap-2">
              <span className="text-base">🧭</span>
              <span className="text-white/90 font-bold text-sm tracking-tight">System Guide</span>
            </div>
            <div className="flex items-center gap-2">
              {view.kind !== "home" && view.kind !== "welcome" && (
                <button
                  onClick={goHome}
                  className="text-[10px] text-cyan-400/70 hover:text-cyan-300 font-bold uppercase tracking-wider transition-colors"
                >
                  Home
                </button>
              )}
              <button
                onClick={toggleSystemGuide}
                className="text-white/30 hover:text-white/70 transition-colors text-sm leading-none"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Context-Aware Module Header */}
          {appContext && view.kind === "home" && (
            <div className="border-b border-white/[0.04] bg-cyan-500/[0.03] px-4 py-3">
              <p className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/60 mb-1">
                Active Module: {appContext.heading}
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                {appContext.description}
              </p>
            </div>
          )}

          {/* Content Body */}
          <div className="flex flex-col max-h-[72vh] overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {view.kind === "welcome" && (
                <WelcomeView
                  key="welcome"
                  onStartTour={startTour}
                  onExplore={() => { markToured(); goHome(); }}
                />
              )}
              {view.kind === "home" && (
                <HomeView
                  key="home"
                  appContext={appContext}
                  memory={memory}
                  onSelectCategory={goToCategory}
                  onSelectQuestion={goToQuestion}
                  onViewPaths={() => setView({ kind: "paths" })}
                  onViewRecent={() => setView({ kind: "recent" })}
                  onStartTour={startTour}
                />
              )}
              {view.kind === "category" && (
                <CategoryView
                  key={`cat-${view.categoryId}`}
                  categoryId={view.categoryId}
                  onSelectQuestion={goToQuestion}
                  onBack={goHome}
                />
              )}
              {view.kind === "question" && (
                <QuestionView
                  key={`q-${view.questionId}`}
                  questionId={view.questionId}
                  onSelectQuestion={goToQuestion}
                  onAction={handleAction}
                  onBack={goHome}
                />
              )}
              {view.kind === "paths" && (
                <PathsView
                  key="paths"
                  onAction={handleAction}
                  onBack={goHome}
                />
              )}
              {view.kind === "tour" && (
                <TourView
                  key={`tour-${view.stepIndex}`}
                  stepIndex={view.stepIndex}
                  onAction={handleAction}
                  onNext={() => {
                    const next = (view as { kind: "tour"; stepIndex: number }).stepIndex + 1;
                    if (next < tourSteps.length) {
                      setView({ kind: "tour", stepIndex: next });
                    } else {
                      markToured();
                      goHome();
                    }
                  }}
                  onSkip={() => { markToured(); goHome(); }}
                />
              )}
              {view.kind === "recent" && (
                <RecentView
                  key="recent"
                  memory={memory}
                  onSelectQuestion={goToQuestion}
                  onBack={goHome}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/* Sub-Views                                                           */
/* ================================================================== */

/* --- Welcome --- */

function WelcomeView({ onStartTour, onExplore }: {
  onStartTour: () => void;
  onExplore: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="p-5 space-y-5"
    >
      <div className="text-center space-y-2">
        <p className="text-2xl">👋</p>
        <h3 className="text-lg font-bold text-white">New to AnuragOS?</h3>
        <p className="text-sm text-white/50 leading-relaxed">
          This is an interactive engineering portfolio. Take a quick tour to see the highlights, or explore freely at your own pace.
        </p>
      </div>
      <div className="space-y-2">
        <button
          onClick={onStartTour}
          className="w-full py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-bold hover:bg-cyan-500/20 transition-colors"
        >
          🚀 Start 2-Minute Tour
        </button>
        <button
          onClick={onExplore}
          className="w-full py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/60 text-sm font-medium hover:bg-white/[0.05] transition-colors"
        >
          Explore Freely
        </button>
      </div>
    </motion.div>
  );
}

/* --- Home --- */

function HomeView({
  appContext,
  memory,
  onSelectCategory,
  onSelectQuestion,
  onViewPaths,
  onViewRecent,
  onStartTour,
}: {
  appContext: ReturnType<typeof getAppContext>;
  memory: GuideMemory;
  onSelectCategory: (id: string) => void;
  onSelectQuestion: (id: string) => void;
  onViewPaths: () => void;
  onViewRecent: () => void;
  onStartTour: () => void;
}) {
  // If an app has context, show its suggested questions first
  const contextQuestions = appContext
    ? appContext.suggestedQuestionIds.map(getQuestion).filter(Boolean) as GuideQuestion[]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="p-4 space-y-4"
    >
      {/* Context-aware suggested questions */}
      {contextQuestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/50">
            Suggested
          </p>
          {contextQuestions.slice(0, 3).map((q) => (
            <QuestionButton key={q.id} question={q} onClick={() => onSelectQuestion(q.id)} />
          ))}
        </div>
      )}

      {/* Categories */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">
          Explore
        </p>
        <div className="grid grid-cols-2 gap-2">
          {guideCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex items-start gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5 text-left transition-all hover:bg-white/[0.05] hover:border-cyan-500/20 group"
            >
              <span className="text-sm mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity shrink-0">
                {cat.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-white/70 group-hover:text-cyan-300 transition-colors leading-tight">
                  {cat.label}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onStartTour}
          className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-[10px] font-bold text-cyan-300 hover:bg-cyan-500/20 transition-all"
        >
          🚀 Start 2-Minute Tour
        </button>
        <button
          onClick={onViewPaths}
          className={`rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[10px] font-bold text-white/50 hover:text-cyan-300 hover:border-cyan-500/20 transition-all ${memory.recentQuestionIds.length === 0 ? "col-span-2" : ""}`}
        >
          🗺️ Exploration Paths
        </button>
        {memory.recentQuestionIds.length > 0 && (
          <button
            onClick={onViewRecent}
            className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-[10px] font-bold text-white/50 hover:text-cyan-300 hover:border-cyan-500/20 transition-all"
          >
            🕐 Recently Viewed
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* --- Category View --- */

function CategoryView({
  categoryId,
  onSelectQuestion,
  onBack,
}: {
  categoryId: string;
  onSelectQuestion: (id: string) => void;
  onBack: () => void;
}) {
  const cat = getCategory(categoryId);
  if (!cat) return null;

  const questions = cat.questionIds.map(getQuestion).filter(Boolean) as GuideQuestion[];

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      className="p-4 space-y-4"
    >
      <BackButton onClick={onBack} />
      <div className="flex items-center gap-2.5">
        <span className="text-xl">{cat.icon}</span>
        <div>
          <h3 className="text-base font-bold text-white">{cat.label}</h3>
          <p className="text-xs text-white/40 mt-0.5">{cat.description}</p>
        </div>
      </div>
      <div className="space-y-2">
        {questions.map((q) => (
          <QuestionButton key={q.id} question={q} onClick={() => onSelectQuestion(q.id)} />
        ))}
      </div>
    </motion.div>
  );
}

/* --- Question Detail View --- */

function QuestionView({
  questionId,
  onSelectQuestion,
  onAction,
  onBack,
}: {
  questionId: string;
  onSelectQuestion: (id: string) => void;
  onAction: (appId: string) => void;
  onBack: () => void;
}) {
  const q = getQuestion(questionId);
  if (!q) return null;

  const related = q.relatedQuestionIds.map(getQuestion).filter(Boolean) as GuideQuestion[];
  const cat = getCategory(q.categoryId);

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      className="p-4 space-y-4"
    >
      <BackButton onClick={onBack} />

      {cat && (
        <p className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/50">
          {cat.icon} {cat.label}
        </p>
      )}

      <h3 className="text-base font-bold text-white leading-snug">{q.question}</h3>

      <p className="text-sm text-white/60 leading-relaxed">{q.answer}</p>

      {/* Actions */}
      {q.actions.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase font-bold tracking-widest text-white/25">
            Open Module
          </p>
          <div className="flex flex-wrap gap-1.5">
            {q.actions.map((action) => (
              <button
                key={action.appId}
                onClick={() => onAction(action.appId)}
                className="rounded-lg border border-cyan-500/20 bg-cyan-500/[0.06] px-3 py-1.5 text-[11px] font-bold text-cyan-300/80 hover:bg-cyan-500/15 hover:text-cyan-200 transition-colors"
              >
                {action.label} →
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Related Questions */}
      {related.length > 0 && (
        <div className="space-y-2 pt-1 border-t border-white/[0.04]">
          <p className="text-[10px] uppercase font-bold tracking-widest text-white/25">
            Related
          </p>
          {related.map((rq) => (
            <QuestionButton key={rq.id} question={rq} onClick={() => onSelectQuestion(rq.id)} compact />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* --- Exploration Paths View --- */

function PathsView({
  onAction,
  onBack,
}: {
  onAction: (appId: string) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      className="p-4 space-y-4"
    >
      <BackButton onClick={onBack} />
      <h3 className="text-base font-bold text-white">Exploration Paths</h3>
      <p className="text-xs text-white/40">
        Curated journeys through AnuragOS — each path guides you through multiple modules.
      </p>
      <div className="space-y-3">
        {explorationPaths.map((path) => (
          <div
            key={path.id}
            className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 space-y-2.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{path.icon}</span>
              <div>
                <p className="text-[11px] font-bold text-white/80">{path.label}</p>
                <p className="text-[10px] text-white/35">{path.description}</p>
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {path.steps.map((step, i) => (
                <button
                  key={step.appId}
                  onClick={() => onAction(step.appId)}
                  className="flex items-center gap-1 rounded border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[10px] font-medium text-white/50 hover:text-cyan-300 hover:border-cyan-500/20 transition-all"
                >
                  <span className="text-[9px] text-white/20 font-mono">{i + 1}.</span>
                  {step.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* --- Tour View --- */

function TourView({
  stepIndex,
  onAction,
  onNext,
  onSkip,
}: {
  stepIndex: number;
  onAction: (appId: string) => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  const step = tourSteps[stepIndex];
  const isLast = stepIndex === tourSteps.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="p-5 space-y-4"
    >
      {/* Progress */}
      <div className="flex items-center gap-2">
        {tourSteps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= stepIndex ? "bg-cyan-400" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-[10px] uppercase font-bold tracking-widest text-cyan-400/60">
          Step {stepIndex + 1} of {tourSteps.length}
        </p>
        <h3 className="text-lg font-bold text-white">{step.label}</h3>
        <p className="text-sm text-white/50">{step.description}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onAction(step.appId)}
          className="flex-1 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-bold hover:bg-cyan-500/20 transition-colors"
        >
          Open {step.label}
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/60 text-xs font-medium hover:bg-white/[0.06] transition-colors"
        >
          {isLast ? "✓ Finish Tour" : "Next →"}
        </button>
      </div>

      <button
        onClick={onSkip}
        className="w-full text-center text-[10px] text-white/25 hover:text-white/50 transition-colors"
      >
        Skip Tour
      </button>
    </motion.div>
  );
}

/* --- Recently Viewed --- */

function RecentView({
  memory,
  onSelectQuestion,
  onBack,
}: {
  memory: GuideMemory;
  onSelectQuestion: (id: string) => void;
  onBack: () => void;
}) {
  const recentQuestions = memory.recentQuestionIds
    .map(getQuestion)
    .filter(Boolean) as GuideQuestion[];

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      className="p-4 space-y-4"
    >
      <BackButton onClick={onBack} />
      <h3 className="text-base font-bold text-white">Recently Viewed</h3>
      {recentQuestions.length === 0 ? (
        <p className="text-xs text-white/30">No recently viewed questions yet.</p>
      ) : (
        <div className="space-y-2">
          {recentQuestions.map((q) => (
            <QuestionButton key={q.id} question={q} onClick={() => onSelectQuestion(q.id)} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ================================================================== */
/* Shared UI Elements                                                  */
/* ================================================================== */

function QuestionButton({
  question,
  onClick,
  compact = false,
}: {
  question: GuideQuestion;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg border border-white/[0.05] bg-white/[0.02] transition-all hover:bg-white/[0.05] hover:border-cyan-500/20 group ${
        compact ? "px-3 py-2" : "px-3 py-2.5"
      }`}
    >
      <p className={`font-semibold text-white/70 group-hover:text-cyan-300 transition-colors ${
        compact ? "text-[11px]" : "text-xs"
      }`}>
        {question.question}
      </p>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-[10px] uppercase font-bold tracking-wider text-cyan-500/60 hover:text-cyan-400 flex items-center gap-1 w-fit transition-colors"
    >
      ← Back
    </button>
  );
}
