import {
  IconArrowRight,
  IconCircleCheck,
  IconCreditCard,
  IconGift,
  IconPlugConnected,
  IconReceipt,
  IconScan,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { BASKET_STAGES, DEMO_BASKET_ITEMS, HERO, SITE_IMAGES } from "@/models/selfswift-content";

import { Ticker } from "./ticker";

const TRUST_POINTS = [
  { icon: IconPlugConnected, label: "Works with your existing POS" },
  { icon: IconCreditCard, label: "Card and digital wallet payments" },
  { icon: IconGift, label: "Loyalty cards and offers in review" },
  { icon: IconReceipt, label: "Printed or digital receipts" },
] as const;

// Where each detected-item chip floats around the headline (desktop only).
const CHIP_POSITIONS = ["left-[4%] top-[30%]", "right-[5%] top-[24%]", "right-[8%] bottom-[30%]"];

const TOTAL_LABEL = `$${DEMO_BASKET_ITEMS.reduce((sum, item) => sum + item.unitPrice, 0).toFixed(2)}`;

function delay(ms: number) {
  return { animationDelay: `${ms}ms` };
}

/** Each word slides up from behind its own mask, one after another. */
function RevealWords({ text, start, className = "" }: { text: string; start: number; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
          <span className="animate-word-up inline-block" style={delay(start + index * 110)}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Spotlight hero: full-screen, dark, cinematic. `dark` scopes the dark theme tokens to the section
 * so it reads the same in light and dark mode. The previous design lives in hero-section-classic.tsx.
 */
export function HeroSection() {
  return (
    <section id="product" className="dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img src={SITE_IMAGES.kioskStore} alt="" className="animate-ken-burns absolute inset-0 size-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_80%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)]" />
        {/* RFID read rings rippling out from behind the headline. */}
        <div className="absolute left-1/2 top-[45%] size-0">
          {[0, 1, 2].map((ring) => (
            <span
              key={ring}
              className="animate-rfid-ripple absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
              style={delay(ring * 1300)}
            />
          ))}
          <span className="absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]" />
        </div>
      </div>

      {/* Detected items appear one by one, as if the kiosk is reading the basket. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {DEMO_BASKET_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className={`animate-fade-up absolute ${CHIP_POSITIONS[index]}`}
            style={delay(1300 + index * 350)}
          >
            <div
              className="animate-float flex items-center gap-3 rounded-2xl border border-foreground/10 bg-card/60 py-2.5 pl-2.5 pr-4 shadow-2xl backdrop-blur-xl"
              style={delay(index * -2000)}
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <IconCircleCheck className="size-5" />
              </span>
              <span>
                <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-primary">{BASKET_STAGES[0]}</span>
                <span className="block text-sm font-semibold">{item.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {item.variant} · ${item.unitPrice.toFixed(2)}
                </span>
              </span>
            </div>
          </div>
        ))}
        <div className="animate-fade-up absolute bottom-[28%] left-[7%]" style={delay(2500)}>
          <div className="animate-float flex items-center gap-3 rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-2xl shadow-primary/30" style={delay(-1000)}>
            <IconScan className="size-5" />
            <span>
              <span className="block text-xs opacity-80">{DEMO_BASKET_ITEMS.length} items · Total</span>
              <span className="block font-display text-xl font-semibold">{TOTAL_LABEL}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-16 pt-32 text-center">
        <a
          href={HERO.tertiaryCta.href}
          className="animate-fade-up group inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 py-1 pl-1 pr-3.5 text-[0.8125rem] font-medium backdrop-blur transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="rounded-full bg-primary px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-primary-foreground">New</span>
          RFID-ready self-checkout for fashion retail
          <IconArrowRight className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
        </a>

        <h1 className="mt-8 font-display text-[clamp(3.25rem,9vw,8.25rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          <RevealWords text={HERO.headline[0]} start={150} />
          <RevealWords text={HERO.headline[1]} start={420} className="text-primary" />
        </h1>

        <p className="animate-fade-up mt-8 max-w-2xl text-pretty text-lg leading-8 text-foreground/75 sm:text-xl" style={delay(800)}>
          {HERO.body}
        </p>

        <div className="animate-fade-up mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row" style={delay(950)}>
          <Button asChild size="lg" className="group h-13 w-full rounded-full px-7 text-base font-semibold shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.8)] sm:w-auto">
            <a href={HERO.primaryCta.href}>
              {HERO.primaryCta.label}
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-13 w-full rounded-full border-foreground/20 bg-foreground/5 px-7 text-base font-semibold backdrop-blur hover:bg-foreground/10 sm:w-auto">
            <a href={HERO.secondaryCta.href}>{HERO.secondaryCta.label}</a>
          </Button>
        </div>

        <ul
          className="animate-fade-up mt-14 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 text-left backdrop-blur-xl md:grid-cols-4"
          style={delay(1150)}
        >
          {TRUST_POINTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 bg-background/70 p-4 text-sm text-foreground/85">
              <Icon className="size-5 shrink-0 text-primary" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <Ticker />
    </section>
  );
}
