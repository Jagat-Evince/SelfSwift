import { BrandLogo } from "./brand-logo";

/** Shown while the client boots and the session resolves; server-rendered, so markup only. */
export function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading SelfSwift"
      className="relative isolate flex h-screen w-full flex-col items-center justify-center gap-8 overflow-hidden bg-background text-foreground"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.04)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_50%_45%_at_50%_50%,black,transparent)]" />
        <div className="absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[110px]" />
      </div>

      <div className="scale-125">
        <BrandLogo />
      </div>

      <div aria-hidden className="h-[3px] w-40 overflow-hidden rounded-full bg-foreground/10">
        <div className="animate-loader-bar h-full w-2/5 rounded-full bg-primary" />
      </div>
    </div>
  );
}
