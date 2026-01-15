import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Agents & Automations | Autonomous Intelligence Systems",
  description: "Engineered autonomous AI agents and workflow automation systems. Scale operations, reduce costs, and maintain competitive advantage through intelligent decision-making.",
  keywords: "AI agents, automation, workflow automation, autonomous systems, artificial intelligence, business automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
