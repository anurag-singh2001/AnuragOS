import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnuragOS — Engineering Workspace",
  description:
    "Interactive OS-style portfolio of Anurag Singh — Full Stack Software Engineer building enterprise systems and intelligent applications.",
  keywords: [
    "Anurag Singh",
    "Software Engineer",
    "Portfolio",
    "Full Stack",
    "AI Systems",
    "Enterprise CRM",
    "React",
    "Node.js",
    "ASP.NET Core",
  ],
  authors: [{ name: "Anurag Singh" }],
  openGraph: {
    title: "AnuragOS — Engineering Workspace",
    description:
      "Interactive OS-style portfolio showcasing enterprise systems and AI engineering direction.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
