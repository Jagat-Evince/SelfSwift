import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`rounded-2xl border border-white/25 bg-card/60 text-card-foreground shadow-xl shadow-black/5 ring-1 ring-inset ring-white/5 backdrop-blur-2xl dark:border-white/10 dark:shadow-black/40 ${className}`}
    >
      {children}
    </div>
  );
}
