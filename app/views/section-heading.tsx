import type { ReactNode } from "react";

import { Reveal } from "./reveal";

interface SectionHeadingProps {
  kicker?: string;
  children: ReactNode;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
}

export function SectionHeading({ kicker, children, description, align = "left", inverted = false }: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const kickerTone = inverted ? "text-primary-foreground/80" : "text-primary";
  const kickerRule = inverted ? "bg-primary-foreground/80" : "bg-primary";
  const bodyTone = inverted ? "text-primary-foreground/80" : "text-muted-foreground";
  return (
    <Reveal className={`max-w-2xl space-y-4 ${alignment}`}>
      {kicker ? (
        <p className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] ${kickerTone}`}>
          <span className={`kicker-rule h-px w-6 ${kickerRule}`} />
          {kicker}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{children}</h2>
      {description ? <p className={`text-base leading-relaxed sm:text-lg ${bodyTone}`}>{description}</p> : null}
    </Reveal>
  );
}
