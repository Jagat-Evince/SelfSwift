import type { ReactNode } from "react";

export type SectionTone = "base" | "muted" | "accent" | "primary" | "ink";

const TONE_CLASS: Record<SectionTone, string> = {
  base: "bg-background",
  muted: "bg-muted/40",
  accent: "bg-gradient-to-b from-accent/70 via-background to-background",
  primary: "bg-primary text-primary-foreground",
  // `dark` scopes the dark theme tokens to this section, so cards and text keep their contrast.
  ink: "dark bg-background text-foreground",
};

interface SectionShellProps {
  id: string;
  tone: SectionTone;
  children: ReactNode;
  /** Rendered below the container, edge to edge. */
  fullWidth?: ReactNode;
  /** Extra full-bleed background layer (image, shapes) behind the content. */
  decor?: ReactNode;
}

export function SectionShell({ id, tone, children, fullWidth, decor }: SectionShellProps) {
  return (
    // overflow-clip (not hidden) clips decoration without becoming a scroll container, so sticky children still work.
    <section id={id} className={`relative scroll-mt-10 overflow-clip py-24 md:scroll-mt-2 ${TONE_CLASS[tone]}`}>
      {tone === "muted" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(hsl(var(--foreground)/0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,transparent,black_20%,black_80%,transparent)]"
        />
      ) : null}
      {tone === "primary" ? (
        <>
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-primary-foreground/10 blur-3xl" />
        </>
      ) : null}
      {tone === "ink" ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.045)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.045)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]" />
          <div className="absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      ) : null}
      {decor ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {decor}
        </div>
      ) : null}
      <div className="relative mx-auto max-w-7xl space-y-14 px-5">{children}</div>
      {fullWidth ? <div className="relative mt-14">{fullWidth}</div> : null}
    </section>
  );
}
