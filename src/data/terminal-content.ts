export const terminalQuotes = [
  // Engineering Philosophy (40%)
  "Build systems, not just features.",
  "Understanding the problem is usually harder than writing the code.",
  "A simple solution that survives production beats a clever solution that doesn't.",
  "The best architecture is the one future-you can still understand.",
  "Every abstraction hides a tradeoff.",
  "Code scales. Complexity scales faster.",
  "Good software is built twice: once in your head and once in the editor.",
  "The fastest code is the code that never had to run.",
  "Features attract users. Reliability keeps them.",
  "The goal isn't writing more code. The goal is solving the problem.",
  
  // Learning Journey (25%)
  "The fastest way to learn is to build something slightly beyond your comfort zone.",
  "Every interview rejection exposed a gap I eventually closed.",
  "Most learning happened after projects failed, not after they succeeded.",
  "Courses taught concepts. Projects taught reality.",
  "You don't truly understand a technology until you've debugged it at 2 AM.",
  "The gap between knowing and building is where growth happens.",
  "Learning compounds faster than people expect.",
  "Every project starts with confidence and ends with humility.",
  "Progress usually looks small until you compare it to last year.",
  "The best teachers were bugs, deadlines, and production issues.",

  // AI & Software Development (20%)
  "AI is changing how software gets built, not why software gets built.",
  "Coding agents accelerate execution, not understanding.",
  "The real skill is knowing what should be built.",
  "AI can generate code. Engineers generate direction.",
  "The future belongs to engineers who can combine systems thinking with AI.",
  "Prompting is useful. Understanding systems is essential.",
  "Models are powerful. Context is everything.",
  "The value isn't in generating code. The value is making good decisions.",
  "RAG taught me that retrieval is often harder than generation.",
  "Every AI system is still a software system.",

  // Career Reflections
  "My first goal was getting a software job. Now it's building systems that matter.",
  "Enterprise systems taught me scale. AI systems taught me exploration.",
  "Every company teaches a different lesson.",
  "The journey from student projects to production systems changes how you think.",
  "Real users expose assumptions faster than any code review.",
  "Building for production forces better decisions.",
  "Growth happens when responsibility increases.",
  "The most valuable skills aren't always listed on a resume.",
  "Software engineering is a long game.",
  "The goal is not to know everything. The goal is to keep learning.",

  // Developer Humor (10%)
  "The bug was not in the code. The bug was in my assumptions.",
  "Works on my machine. Famous last words.",
  "There is always one more edge case.",
  "I fixed the bug and created three new ones.",
  "Nothing teaches humility like production logs.",
  "The solution was obvious immediately after finding it.",
  "The issue was DNS. Until proven otherwise.",
  "I spent two hours debugging a typo.",
  "Every TODO eventually becomes a feature request.",
  "The compiler is often kinder than production.",

  // AnuragOS Specific (5%)
  "Most portfolios show projects. AnuragOS shows how everything connects.",
  "Projects explain what I built. Systems explain how I think.",
  "The graph is not a skills chart. It's a map of my journey.",
  "Every node in AnuragOS represents something I learned.",
  "This OS is less about achievements and more about evolution.",
  "The goal was never to build a portfolio. The goal was to build something worth exploring.",
  "Software engineering is the thread connecting every module in this system.",
  "The most important feature of AnuragOS is curiosity.",
  "Every deployment tells a story. Every story teaches a lesson.",
  "This system is still under construction, just like its creator."
];

export const terminalFortunes = [
  "Today you will discover the bug was in the requirements.",
  "You will spend an hour debugging and learn something valuable.",
  "The next side project will teach more than expected.",
  "A successful build is just a temporary state before the next refactor.",
  "You will finally understand that legacy system... right before it is decommissioned.",
  "The best documentation is the one you write today.",
];

export const terminalEasterEggs = [
  "Why I chose C-DAC PG-DAC: I wanted to go deeper into systems engineering, backend architectures, and production-level code, which standard B.Tech curriculums often skim over.",
  "My journey into AI systems started when I realized that RAG could transform how enterprises interact with their vast document silos, leading to the PDF RAG System.",
  "During my data science internship at Celebal Technologies, I realized my true passion was not just analyzing data, but building the distributed systems that process it.",
  "The Energy CRM Platform taught me that enterprise software is 20% writing code and 80% understanding business workflows.",
];

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
};

export const terminalQuiz: QuizQuestion[] = [
  {
    question: "Which technology is used in the PDF RAG System?",
    options: ["React Native", "Local LLM & Vector DB", "PHP", "Ruby on Rails"],
    answerIndex: 1,
  },
  {
    question: "Which company am I currently working at?",
    options: ["Google", "Celebal Technologies", "Umbeo", "CentraLogic"],
    answerIndex: 3,
  },
  {
    question: "What came after UPES in my educational journey?",
    options: ["Master's Degree", "C-DAC PG-DAC", "Bootcamp", "PhD"],
    answerIndex: 1,
  },
  {
    question: "Which of these is my primary 'Hero Deployment'?",
    options: ["PDF RAG System", "Multi-Tenant CRM", "Energy CRM Platform", "E-commerce App"],
    answerIndex: 2,
  },
];
