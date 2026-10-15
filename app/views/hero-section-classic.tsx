import {
  IconArrowRight,
  IconCircleCheck,
  IconCreditCard,
  IconGift,
  IconPlugConnected,
  IconReceipt,
  IconScan,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HERO, SITE_IMAGES } from "@/models/selfswift-content";
import { useBasketDemoViewModel } from "@/view-models/use-basket-demo";

import { GlassPanel } from "./glass-panel";
import { Ticker } from "./ticker";

const TRUST_POINTS = [
  { icon: IconPlugConnected, label: "Works with your existing POS" },
  { icon: IconCreditCard, label: "Card and digital wallet payments" },
  { icon: IconGift, label: "Loyalty cards and offers in review" },
  { icon: IconReceipt, label: "Printed or digital receipts" },
] as const;

function delay(ms: number) {
  return { animationDelay: `${ms}ms` };
}

function BasketDemo() {
  const basket = useBasketDemoViewModel();

  return (
    <GlassPanel className="animate-float w-full space-y-5 border-white/20 p-5 shadow-2xl sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="relative flex size-5 items-center justify-center text-primary">
            <IconScan className="size-4" />
          </span>
          All three styles recognised
        </div>
        <Badge variant="outline">Demo · USD</Badge>
      </div>

      <div className="space-y-2">
        <div className="flex gap-1.5">
          {basket.stages.map((stage, index) => (
            <div
              key={stage}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-700 ${
                index <= basket.stageIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {basket.stages.map((stage, index) => (
            <span key={stage} className={index === basket.stageIndex ? "text-primary" : ""}>
              {stage}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-display text-base font-semibold">Your basket</h3>
        <ul className="divide-y divide-border/70">
          {basket.items.map((item, index) => (
            <li
              key={item.id}
              className="animate-fade-up flex items-center justify-between py-3"
              style={delay(150 + index * 120)}
            >
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.variant}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{item.unitPriceLabel}</p>
                <p className="text-xs text-muted-foreground">Qty 1</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-border/70 pt-4">
        <div>
          <p className="text-xs text-muted-foreground">{basket.itemCount} items · Total</p>
          <p className="font-display text-2xl font-semibold tracking-tight">{basket.totalLabel}</p>
        </div>
        <Button onClick={basket.advance} className="rounded-full">
          {basket.isComplete ? (
            <>
              <IconCircleCheck className="size-4" /> Start again
            </>
          ) : (
            "Review basket"
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">RFID tags recognised together</p>
    </GlassPanel>
  );
}

export function HeroSectionClassic() {
  // shortcut: top padding matches the fixed SiteHeader height (h-16, md:h-[4.5rem]); update both together.
  return (
    <section id="product" className="relative isolate overflow-hidden pt-16 md:pt-[4.5rem]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="animate-gradient-shift absolute -left-32 -top-24 size-[36rem] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute -right-24 top-1/3 size-[30rem] rounded-full bg-secondary-foreground/15 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-24">
        <div className="max-w-2xl">
          <a
            href={HERO.tertiaryCta.href}
            className="animate-fade-up group inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.06] py-1 pl-1 pr-3.5 text-[0.8125rem] font-medium text-foreground/85 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="rounded-full bg-primary px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-primary-foreground">New</span>
            RFID-ready self-checkout for fashion retail
            <IconArrowRight className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="mt-8 font-display text-[clamp(2.75rem,5.6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
            <span className="animate-fade-up block" style={delay(80)}>
              {HERO.headline[0]}
            </span>
            <span className="animate-fade-up block text-primary" style={delay(200)}>
              {HERO.headline[1]}
            </span>
          </h1>

          <p className="animate-fade-up mt-6 max-w-[34rem] text-pretty text-lg leading-8 text-foreground/70 sm:text-[1.1875rem]" style={delay(420)}>
            {HERO.body}
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(520)}>
            <Button asChild size="lg" className="group h-12 rounded-full px-6 text-[0.9375rem] font-semibold shadow-[0_10px_32px_-12px_hsl(var(--primary)/0.7)]">
              <a href={HERO.primaryCta.href}>
                {HERO.primaryCta.label}
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-border bg-transparent px-6 text-[0.9375rem] font-semibold hover:bg-accent">
              <a href={HERO.secondaryCta.href}>{HERO.secondaryCta.label}</a>
            </Button>
          </div>

          <ul className="animate-fade-up mt-12 grid gap-x-8 gap-y-4 border-t border-border/70 pt-8 sm:grid-cols-2" style={delay(640)}>
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-foreground/80">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <Icon className="size-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up relative lg:pl-6" style={delay(200)}>
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-tr from-primary/40 via-transparent to-secondary-foreground/30 blur-2xl" />
          <div className="relative rounded-[2rem] bg-gradient-to-br from-white/25 via-white/5 to-primary/30 p-px shadow-2xl">
            <div className="relative overflow-hidden rounded-[calc(2rem-1px)]">
              <img
                src={SITE_IMAGES.kioskStore}
                alt="Illustrative SelfSwift checkout kiosk with apparel and sneakers in a contemporary fashion boutique"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="animate-scan-beam absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-primary/35 to-transparent" />
            </div>
          </div>
          <div className="animate-float absolute -left-4 top-8 hidden items-center gap-2 rounded-full border border-white/20 bg-card/70 px-4 py-2 text-xs font-medium shadow-xl backdrop-blur-2xl sm:flex">
            <span className="size-2 rounded-full bg-primary" />
            RFID recognition
          </div>
          <div
            className="animate-float absolute -right-3 top-28 hidden items-center gap-2 rounded-full border border-white/20 bg-card/70 px-4 py-2 text-xs font-medium shadow-xl backdrop-blur-2xl sm:flex"
            style={{ animationDelay: "-3s" }}
          >
            <IconReceipt className="size-3.5 text-primary" />
            Receipt issued
          </div>
          <div className="relative -mt-24 px-4 sm:-mt-28 sm:px-8 lg:-ml-10 lg:mr-10 lg:px-0">
            <BasketDemo />
          </div>
        </div>
      </div>
      <Ticker />
    </section>
  );
}
