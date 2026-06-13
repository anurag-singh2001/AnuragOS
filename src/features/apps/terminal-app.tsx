"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { profile } from "@/data/profile";
import { deployments } from "@/data";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { achievements } from "@/data/achievements";
import { timeline } from "@/data/timeline";
import { terminalQuotes, terminalFortunes, terminalEasterEggs, terminalQuiz } from "@/data/terminal-content";
import { useOS } from "@/features/os/window-manager";
import type { MatrixColor } from "@/features/os/os-types";

type TerminalLine = {
  type: "input" | "output" | "error" | "system";
  content: string;
};

const WELCOME_MESSAGE = `AnuragOS Terminal v1.1
Type 'help' for available commands.
Try typing 'snake' to play a mini-game!
──────────────────────────────────────`;

const README_CONTENT = `# Welcome to AnuragOS!
This is a highly immersive, macOS-inspired visitor desktop environment.
Designed & developed to showcase a state-of-the-art developer portfolio.

## Key Features:
- Draggable, resizable glassmorphism windows
- Dynamic wallpaper controls (Digital Rain, Cyber Grid, Deep Void)
- Interactive, queryable terminal shell
- Live micro-calculators & interactive project demos
- Integrated command palette search (Ctrl+K)
- Fast recruiter summary overlay (R)`;

const RESUME_MD_CONTENT = `# Anurag Singh
## Software Engineer
- **Languages**: TypeScript, JavaScript, Python, C++, SQL
- **Frameworks**: Next.js, React, Node.js, Express, TailwindCSS
- **Tools**: Git, Docker, Redpanda, PostgreSQL, MongoDB, Redis
- **Deployments**: Energy CRM Platform, Multi-Tenant CRM, PDF RAG Chatbot

Type 'experience' or 'skills' for deep summaries.`;

const CONTACT_TXT_CONTENT = `Primary Email: anuragsingh.dev25@gmail.com
GitHub: github.com/anurag-singh
LinkedIn: linkedin.com/in/anurag-singh
Twitter/X: twitter.com/anurag_singh`;

export function TerminalApp() {
  const { state, setMatrixColor, setWallpaper } = useOS();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeGame, setActiveGame] = useState<"none" | "snake">("none");

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Quiz State
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  // Snake Game State
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
  ]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 5, y: 5 });
  const [dir, setDir] = useState<{ x: number; y: number }>({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeGame === "none" && state.preferences.terminalAutoScroll) {
      scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [lines, activeGame, state.preferences.terminalAutoScroll]);

  // Execute terminal commands
  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim();
      const parts = trimmed.split(" ");
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      const newLines: TerminalLine[] = [
        ...lines,
        { type: "input", content: `anurag@os:~$ ${cmd}` },
      ];

      if (activeQuiz) {
        const currentQ = terminalQuiz[quizIndex];
        const answerVal = parseInt(trimmed, 10);
        let newScore = quizScore;

        if (!isNaN(answerVal) && answerVal >= 1 && answerVal <= currentQ.options.length) {
          if (answerVal - 1 === currentQ.answerIndex) {
            newLines.push({ type: "output", content: "✅ Correct!\n" });
            newScore += 1;
            setQuizScore(newScore);
          } else {
            newLines.push({ type: "error", content: `❌ Incorrect. The correct answer was: ${currentQ.options[currentQ.answerIndex]}\n` });
          }

          const nextIndex = quizIndex + 1;
          if (nextIndex < terminalQuiz.length) {
            setQuizIndex(nextIndex);
            const nextQ = terminalQuiz[nextIndex];
            newLines.push({ type: "system", content: `Question ${nextIndex + 1}/${terminalQuiz.length}:\n${nextQ.question}\n${nextQ.options.map((o, i) => `  ${i + 1}. ${o}`).join("\n")}\n\nType your answer (1-${nextQ.options.length}):` });
          } else {
            setActiveQuiz(false);
            newLines.push({ type: "system", content: `Quiz Complete! Your score: ${newScore}/${terminalQuiz.length}\nType 'help' to see other commands.` });
          }
        } else if (command === "exit" || command === "quit") {
          setActiveQuiz(false);
          newLines.push({ type: "system", content: `Quiz exited. Final score: ${quizScore}/${terminalQuiz.length}` });
        } else {
          newLines.push({ type: "error", content: `Invalid input. Type a number between 1 and ${currentQ.options.length}, or 'exit' to quit.` });
        }

        setLines(newLines);
        setHistory((prev) => [cmd, ...prev].slice(0, 50));
        setHistoryIndex(-1);
        return;
      }

      if (command === "clear") {
        setLines([]);
        return;
      }

      if (command === "snake") {
        setActiveGame("snake");
        setSnake([
          { x: 10, y: 10 },
          { x: 10, y: 11 },
        ]);
        setFood({ x: Math.floor(Math.random() * 19), y: Math.floor(Math.random() * 19) });
        setDir({ x: 0, y: -1 });
        setScore(0);
        setGameOver(false);
        return;
      }

      switch (command) {
        case "help":
          newLines.push({
            type: "output",
            content: `Available commands:
  help        Show this help message
  whoami      Display profile information
  about       About Anurag Singh
  skills      List technical skills
  projects    List deployed projects
  experience  Show work experience
  contact     Show contact information
  neofetch    System information
  quote       Read an engineering reflection
  fortune     Get a developer fortune
  easteregg   Discover a hidden journey detail
  achievement Show a professional milestone
  origin      View my chronological journey
  now         See my current focus
  why         Why this OS exists
  quiz        Test your knowledge of AnuragOS
  snake       Play a retro Snake mini-game
  matrix      Change rain color (matrix cyan/green/amber/red)
  cat [file]  View file contents (e.g. cat README.md, cat resume.md)
  date        Show current date and time
  pwd         Print working directory
  ls          List directory contents
  clear       Clear terminal`,
          });
          break;

        case "whoami":
          newLines.push({
            type: "output",
            content: `${profile.name}\n${profile.title}\n${profile.tagline}`,
          });
          break;

        case "about":
          newLines.push({
            type: "output",
            content: `╔══════════════════════════════════════╗
║         ANURAG SINGH                ║
║     Software Engineer               ║
╚══════════════════════════════════════╝

${profile.bio}

Current Focus:
${profile.currentFocus}

Location: ${profile.location ?? "Remote"}
Status: ${profile.availability ?? "Available"}`,
          });
          break;

        case "skills": {
          const grouped = skills.reduce(
            (acc, skill) => {
              if (!acc[skill.category]) acc[skill.category] = [];
              acc[skill.category].push(skill.name);
              return acc;
            },
            {} as Record<string, string[]>,
          );

          newLines.push({
            type: "output",
            content: Object.entries(grouped)
              .map(([cat, names]) => `[${cat}]\n  ${names.join(", ")}`)
              .join("\n\n"),
          });
          break;
        }

        case "projects":
          newLines.push({
            type: "output",
            content: deployments
              .map(
                (d, i) =>
                  `${i + 1}. ${d.title}\n   Category: ${d.category}\n   ${d.summary}`,
              )
              .join("\n\n"),
          });
          break;

        case "experience":
          newLines.push({
            type: "output",
            content: experience
              .map(
                (e) =>
                  `${e.role} @ ${e.company}\n  ${e.duration}${e.location ? ` · ${e.location}` : ""}\n  ${e.summary}`,
              )
              .join("\n\n"),
          });
          break;

        case "contact":
          newLines.push({
            type: "output",
            content: profile.contactLinks
              .map((l) => `${l.label}: ${l.displayValue} ${l.priority === "primary" ? "(Primary)" : ""}`)
              .join("\n"),
          });
          break;

        case "neofetch":
          newLines.push({
            type: "output",
            content: `        ╭──────────────────╮
   ◢██◣  │ AnuragOS v1.1    │
  ◢████◣ │                  │
 ◢██████◣│ User: ${profile.name}
  ◢████◣ │ Role: ${profile.title}
   ◢██◣  │ Location: ${profile.location ?? "N/A"}
        ╰──────────────────╯
        
  OS:     AnuragOS 1.1 (NextJS 15)
  Shell:  anuragOS-terminal
  Theme:  Cyberpunk Dark
  Uptime: Since May 2026`,
          });
          break;

        case "quote": {
          const randomQuote = terminalQuotes[Math.floor(Math.random() * terminalQuotes.length)];
          newLines.push({ type: "output", content: `\n"${randomQuote}"\n` });
          break;
        }

        case "fortune": {
          const randomFortune = terminalFortunes[Math.floor(Math.random() * terminalFortunes.length)];
          newLines.push({ type: "output", content: `\n🔮 ${randomFortune}\n` });
          break;
        }

        case "easteregg": {
          const randomEgg = terminalEasterEggs[Math.floor(Math.random() * terminalEasterEggs.length)];
          newLines.push({ type: "output", content: `\n🥚 ${randomEgg}\n` });
          break;
        }

        case "achievement": {
          const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
          newLines.push({ 
            type: "output", 
            content: `\n🏆 ${randomAchievement.title}\n   Date: ${randomAchievement.date}\n   ${randomAchievement.description}\n` 
          });
          break;
        }

        case "origin": {
          const originPath = timeline
            .sort((a, b) => a.displayPriority - b.displayPriority)
            .map((t) => t.title)
            .join("\n↓\n");
          newLines.push({ type: "output", content: `\n${originPath}\n` });
          break;
        }

        case "now": {
          newLines.push({ type: "output", content: `\nCurrent Focus:\n${profile.currentFocus}\n` });
          break;
        }

        case "why": {
          newLines.push({
            type: "output",
            content: `\nAnuragOS exists because standard portfolios are static resumes.\nI build systems, connected knowledge graphs, and interactive environments.\nThis OS is a reflection of how I approach engineering: modular, discoverable, and built for exploration.\n`
          });
          break;
        }

        case "quiz": {
          setActiveQuiz(true);
          setQuizIndex(0);
          setQuizScore(0);
          const firstQ = terminalQuiz[0];
          newLines.push({ 
            type: "system", 
            content: `\nStarting AnuragOS Knowledge Quiz...\n\nQuestion 1/${terminalQuiz.length}:\n${firstQ.question}\n${firstQ.options.map((o, i) => `  ${i + 1}. ${o}`).join("\n")}\n\nType your answer (1-${firstQ.options.length}):` 
          });
          break;
        }

        case "date":
          newLines.push({ type: "output", content: new Date().toString() });
          break;

        case "pwd":
          newLines.push({ type: "output", content: "/home/anurag/workspace" });
          break;

        case "ls":
          newLines.push({
            type: "output",
            content: `drwxr-xr-x  deployments/
drwxr-xr-x  career/
drwxr-xr-x  ai-lab/
-rw-r--r--  resume.md
-rw-r--r--  contact.txt
-rw-r--r--  README.md`,
          });
          break;

        case "cat": {
          const file = args[0];
          if (!file) {
            newLines.push({ type: "error", content: "Usage: cat [filename]" });
          } else if (file.toLowerCase() === "readme.md") {
            newLines.push({ type: "output", content: README_CONTENT });
          } else if (file.toLowerCase() === "resume.md") {
            newLines.push({ type: "output", content: RESUME_MD_CONTENT });
          } else if (file.toLowerCase() === "contact.txt") {
            newLines.push({ type: "output", content: CONTACT_TXT_CONTENT });
          } else {
            newLines.push({ type: "error", content: `cat: ${file}: No such file or directory` });
          }
          break;
        }

        case "matrix": {
          const color = args[0]?.toLowerCase();
          if (["cyan", "green", "amber", "red"].includes(color)) {
            setMatrixColor(color as MatrixColor);
            setWallpaper("rain");
            newLines.push({ type: "system", content: `Digital Rain color set to ${color}.` });
          } else {
            newLines.push({ type: "error", content: "Usage: matrix [cyan | green | amber | red]" });
          }
          break;
        }

        case "echo":
          newLines.push({ type: "output", content: args.join(" ") });
          break;

        case "":
          break;

        default:
          newLines.push({
            type: "error",
            content: `command not found: ${command}. Type 'help' for available commands.`,
          });
      }

      setLines(newLines);
      setHistory((prev) => [cmd, ...prev].slice(0, 50));
      setHistoryIndex(-1);
    },
    [lines, activeQuiz, quizIndex, quizScore, setMatrixColor, setWallpaper],
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (activeGame === "snake") return;

    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  }

  // Snake Game Loop Logic
  useEffect(() => {
    if (activeGame !== "snake" || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { x: head.x + dir.x, y: head.y + dir.y };

        // Wall collisions (wrapped around)
        if (newHead.x < 0) newHead.x = 19;
        if (newHead.x >= 20) newHead.x = 0;
        if (newHead.y < 0) newHead.y = 19;
        if (newHead.y >= 20) newHead.y = 0;

        // Self-collision checks
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Eat food checks
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          setFood({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameIntervalRef.current = setInterval(moveSnake, 110);
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    };
  }, [activeGame, dir, food, gameOver]);

  // Capture Snake game key controls
  useEffect(() => {
    if (activeGame !== "snake") return;

    const handleGameKeys = (e: KeyboardEvent) => {
      if (["ArrowUp", "KeyW"].includes(e.code) && dir.y === 0) {
        setDir({ x: 0, y: -1 });
      } else if (["ArrowDown", "KeyS"].includes(e.code) && dir.y === 0) {
        setDir({ x: 0, y: 1 });
      } else if (["ArrowLeft", "KeyA"].includes(e.code) && dir.x === 0) {
        setDir({ x: -1, y: 0 });
      } else if (["ArrowRight", "KeyD"].includes(e.code) && dir.x === 0) {
        setDir({ x: 1, y: 0 });
      }
    };

    window.addEventListener("keydown", handleGameKeys);
    return () => window.removeEventListener("keydown", handleGameKeys);
  }, [activeGame, dir]);

  return (
    <div
      className="flex h-full flex-col bg-[#050709] font-mono text-[16px] md:text-sm"
      onClick={() => {
        if (activeGame === "none") inputRef.current?.focus();
      }}
    >
      {activeGame === "snake" ? (
        /* Snake Game UI */
        <div className="flex flex-1 flex-col items-center justify-center p-4">
          <div className="mb-2 flex w-full max-w-[280px] items-center justify-between text-xs text-white/50">
            <span>Score: <strong className="text-cyan-400">{score}</strong></span>
            <span>Controls: <strong>WASD / Arrows</strong></span>
          </div>

          {/* Snake Board Grid */}
          <div
            className="relative grid h-[280px] w-[280px] border border-white/10 bg-[#07090f]"
            style={{
              gridTemplateColumns: "repeat(20, 1fr)",
              gridTemplateRows: "repeat(20, 1fr)",
            }}
          >
            {Array.from({ length: 400 }).map((_, idx) => {
              const x = idx % 20;
              const y = Math.floor(idx / 20);

              const isSnake = snake.some((s) => s.x === x && s.y === y);
              const isHead = snake[0].x === x && snake[0].y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={idx}
                  className={`h-full w-full border-[0.5px] border-white/[0.02] ${
                    isHead
                      ? "bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.7)] rounded-sm"
                      : isSnake
                        ? "bg-cyan-600/70"
                        : isFood
                          ? "bg-red-400 animate-pulse rounded-full"
                          : ""
                  }`}
                />
              );
            })}

            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm text-center">
                <span className="text-sm font-bold text-red-400">GAME OVER</span>
                <span className="mt-1 text-[11px] text-white/50">Final Score: {score}</span>
                <button
                  onClick={() => {
                    setSnake([
                      { x: 10, y: 10 },
                      { x: 10, y: 11 },
                    ]);
                    setFood({ x: 5, y: 5 });
                    setDir({ x: 0, y: -1 });
                    setScore(0);
                    setGameOver(false);
                  }}
                  className="mt-4 rounded bg-cyan-500/20 border border-cyan-400/40 px-3 py-1 text-xs text-cyan-300 hover:bg-cyan-500/30"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setActiveGame("none");
              setLines((l) => [...l, { type: "system", content: "Snake game exited. Returned to prompt." }]);
            }}
            className="mt-4 text-xs text-white/30 hover:text-white/60 underline"
          >
            Exit Game
          </button>
        </div>
      ) : (
        /* Regular Terminal CLI */
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 pb-20 md:pb-4">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap leading-relaxed ${
                line.type === "input"
                  ? "text-cyan-300"
                  : line.type === "error"
                    ? "text-red-400"
                    : line.type === "system"
                      ? "text-cyan-500/70"
                      : "text-white/70"
              }`}
            >
              {line.content}
            </div>
          ))}

          {/* Input line */}
          <div className="mt-1 flex items-center gap-1">
            <span className="text-cyan-300">anurag@os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white/90 outline-none caret-cyan-400 text-[16px] md:text-sm"
              autoFocus
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        </div>
      )}
    </div>
  );
}
