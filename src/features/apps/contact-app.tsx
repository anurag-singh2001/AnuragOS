"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

export function ContactApp() {
  const [copied, setCopied] = useState(false);

  const emailLink = profile.contactLinks.find((l) => l.type === "email");

  function copyEmail() {
    if (!emailLink) return;
    navigator.clipboard.writeText(emailLink.displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        {/* Profile card */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-3xl shadow-lg">
            👤
          </div>
          <h2 className="mt-3 text-lg font-semibold text-white">
            {profile.name}
          </h2>
          <p className="mt-0.5 text-xs text-cyan-400/70">{profile.title}</p>
          {profile.location && (
            <p className="mt-1 text-xs text-white/30">
              📍 {profile.location}
            </p>
          )}
          {profile.availability && (
            <p className="mt-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] font-medium text-green-300 inline-block">
              {profile.availability}
            </p>
          )}
        </div>

        {/* Contact links */}
        <div className="space-y-2">
          {profile.contactLinks.map((link) => (
            <a
              key={link.type}
              href={link.href}
              target={link.type === "email" ? undefined : "_blank"}
              rel={link.type === "email" ? undefined : "noopener noreferrer"}
              className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.05] hover:border-cyan-500/20"
            >
              <span className="text-lg">
                {link.type === "linkedin"
                  ? "💼"
                  : link.type === "email"
                    ? "📧"
                    : link.type === "github"
                      ? "🐙"
                      : link.type === "twitter"
                        ? "🐦"
                        : "🔗"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white/80">
                  {link.label}
                </p>
                <p className="truncate text-[10px] text-white/30">
                  {link.displayValue}
                </p>
              </div>
              {link.priority === "primary" && (
                <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[9px] font-medium text-cyan-300">
                  Primary
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Copy email */}
        {emailLink && (
          <button
            onClick={copyEmail}
            className="w-full rounded-lg border border-cyan-500/30 bg-cyan-500/10 py-2.5 text-xs font-medium text-cyan-300 transition-colors hover:bg-cyan-500/20"
          >
            {copied ? "✓ Copied to clipboard!" : "📋 Copy Email Address"}
          </button>
        )}
      </div>
    </div>
  );
}
