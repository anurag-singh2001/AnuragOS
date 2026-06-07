"use client";

import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { achievements } from "@/data/achievements";
import { certificates } from "@/data/certificates";

export function ResumeApp() {
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>,
  );

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-5">
        <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
        <p className="mt-1 text-sm font-medium text-cyan-400">
          {profile.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          {profile.tagline}
        </p>
        {profile.location && (
          <p className="mt-1 text-xs text-white/30">📍 {profile.location}</p>
        )}
      </div>

      {/* Experience */}
      <section className="mt-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {exp.role}
                  </h3>
                  <p className="text-xs text-cyan-400/70">{exp.company}</p>
                </div>
                <span className="shrink-0 text-[10px] text-white/30">
                  {exp.duration}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/50">
                {exp.summary}
              </p>
              <ul className="mt-2 space-y-1">
                {exp.achievements.map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 text-[11px] text-white/40"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-cyan-500/40" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          Skills
        </h2>
        <div className="space-y-3">
          {Object.entries(groupedSkills).map(([category, catSkills]) => (
            <div key={category}>
              <p className="mb-1.5 text-[10px] font-medium text-white/30">
                {category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {catSkills
                  .sort((a, b) => a.displayPriority - b.displayPriority)
                  .map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] text-white/60"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="mt-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          Achievements
        </h2>
        <div className="space-y-2">
          {achievements.map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-3 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3"
            >
              <span className="mt-0.5 text-sm">🏆</span>
              <div>
                <p className="text-xs font-medium text-white/70">{a.title}</p>
                <p className="mt-0.5 text-[10px] text-white/30">
                  {a.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section className="mt-6 pb-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
          Certificates
        </h2>
        <div className="space-y-2">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-white/[0.01] p-3"
            >
              <div>
                <p className="text-xs font-medium text-white/70">
                  {cert.name}
                </p>
                <p className="mt-0.5 text-[10px] text-white/30">
                  {cert.issuer}
                </p>
              </div>
              <span className="shrink-0 text-[10px] text-white/20">
                {cert.year}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
