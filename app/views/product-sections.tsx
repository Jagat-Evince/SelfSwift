import {
  IconAlertTriangle,
  IconBarcode,
  IconBasket,
  IconBuildingWarehouse,
  IconCashRegister,
  IconChartHistogram,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCreditCard,
  IconCreditCardPay,
  IconHourglassHigh,
  IconListCheck,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlugConnected,
  IconRotateClockwise,
  IconScan,
  IconTag,
  IconX,
} from "@tabler/icons-react";
import { appPath } from "@agent-native/core/client/api-path";

import { Button } from "@/components/ui/button";
import { BEYOND, CHALLENGE, FUTURE, KIOSK_STAGES, SITE_IMAGES } from "@/models/selfswift-content";
import { useExitScenarioViewModel, useRackReadViewModel } from "@/view-models/use-beyond-demo";
import { useFutureExplorerViewModel } from "@/view-models/use-future-explorer";
import { STAGE_DURATION_MS, useKioskJourneyViewModel } from "@/view-models/use-kiosk-journey";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { PhotoStrip } from "./photo-strip";
import { SectionShell } from "./section-shell";

const STAGE_ICONS = {
  recognise: IconScan,
  review: IconListCheck,
  pay: IconCreditCard,
  connect: IconPlugConnected,
} as const;

function stageProgressStyle(paused: boolean) {
  return {
    "--stage-duration": `${STAGE_DURATION_MS}ms`,
    animationPlayState: paused ? "paused" : "running",
  } as React.CSSProperties;
}

// One icon per CHALLENGE.<key>.flow step, in order.
const FLOW_ICONS = {
  without: [IconHourglassHigh, IconBarcode, IconCashRegister],
  with: [IconBasket, IconListCheck, IconCreditCardPay],
} as const;

interface ChallengeBadgeProps {
  label: string;
  Icon: typeof IconCheck;
  highlight: boolean;
}

function ChallengeBadge({ label, Icon, highlight }: ChallengeBadgeProps) {
  // "Without SelfSwift" -> lead "Without", subject "SelfSwift"; the subject is styled per state.
  const [lead, ...rest] = label.split(" ");
  const subject = rest.join(" ");

  if (!highlight) {
    return (
      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 py-1 pl-1 pr-3.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-white/85 shadow-lg backdrop-blur-md">
        <span className="flex size-6 items-center justify-center rounded-full bg-white/10 ring-1 ring-inset ring-white/20">
          <Icon className="size-3.5" stroke={2.25} />
        </span>
        {lead}
        <span className="text-white/55 line-through decoration-white/60 decoration-[1.5px]">{subject}</span>
      </span>
    );
  }

  return (
    <span className="absolute left-4 top-4 inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/25 bg-gradient-to-r from-primary to-primary/85 py-1 pl-1 pr-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.8)]">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
      <span aria-hidden className="animate-flow-line absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <span className="relative flex size-6 items-center justify-center rounded-full bg-primary-foreground text-primary shadow-sm">
        <Icon className="size-3.5" stroke={2.75} />
      </span>
      <span className="relative">
        {lead} <span className="font-bold">{subject}</span>
      </span>
      <span aria-hidden className="relative ml-0.5 flex size-2">
        <span className="absolute inset-0 rounded-full bg-primary-foreground/70 motion-safe:animate-ping" />
        <span className="relative size-2 rounded-full bg-primary-foreground" />
      </span>
    </span>
  );
}

function ChallengeSection() {
  const flows = [
    {
      key: "without",
      data: CHALLENGE.without,
      Icon: IconX,
      highlight: false,
      image: SITE_IMAGES.storeQueue,
      alt: "Shoppers waiting for a cashier to scan clothing",
    },
    {
      key: "with",
      data: CHALLENGE.with,
      Icon: IconCheck,
      highlight: true,
      image: SITE_IMAGES.basketCheckout,
      alt: "Tagged apparel recognised at a SelfSwift kiosk",
    },
  ] as const;

  return (
    <SectionShell id="challenge" tone="base">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
        <SectionHeading kicker={CHALLENGE.kicker}>
          {CHALLENGE.headline[0]} <span className="block text-primary">{CHALLENGE.headline[1]}</span>
        </SectionHeading>
        <Reveal delay={100}>
          <p className="max-w-xl text-pretty text-lg leading-8 text-foreground/70 lg:border-l lg:border-border/70 lg:pl-8">
            {CHALLENGE.body}
          </p>
        </Reveal>
      </div>

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-8">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 z-10 hidden size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background font-display text-sm font-bold tracking-wider text-muted-foreground shadow-xl md:flex"
        >
          VS
        </div>

        {flows.map(({ key, data, Icon, highlight, image, alt }, index) => (
          <Reveal key={key} delay={index * 150} className="h-full">
            <article
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card transition-[transform,box-shadow] duration-500 ${
                highlight
                  ? "border-primary/40 shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.55)] ring-1 ring-primary/20 hover:-translate-y-1.5"
                  : "border-border/70 shadow-sm"
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  className={`aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                    highlight ? "" : "grayscale-[0.85] contrast-[0.95]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
                <ChallengeBadge label={data.label} Icon={Icon} highlight={highlight} />
              </div>

              <div className="flex flex-1 flex-col gap-7 p-6 pt-2 sm:p-8 sm:pt-2">
                <h3 className={`font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem] ${highlight ? "" : "text-foreground/80"}`}>
                  {data.heading}
                </h3>

                <div
                  className={`relative rounded-2xl border px-2 pb-4 pt-5 ${
                    highlight ? "border-primary/20 bg-primary/[0.04]" : "border-border/70 bg-muted/30"
                  }`}
                >
                  {/* Connector runs between the first and last node centres (1/6 and 5/6 of the width). */}
                  <div aria-hidden className="absolute inset-x-[16.67%] top-[2.65rem] h-0.5 overflow-hidden rounded-full">
                    {highlight ? (
                      <>
                        <div className="absolute inset-0 bg-primary/30" />
                        <div className="animate-flow-line absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent" />
                      </>
                    ) : (
                      <div className="absolute inset-0 border-t-2 border-dashed border-muted-foreground/30" />
                    )}
                  </div>

                  <ol className="relative grid grid-cols-3">
                    {data.flow.map((step, stepIndex) => {
                      const StepIcon = FLOW_ICONS[key][stepIndex];
                      const isLast = stepIndex === data.flow.length - 1;
                      const nodeTone = highlight
                        ? isLast
                          ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.7)]"
                          : "border-primary/40 bg-card text-primary shadow-[0_6px_18px_-8px_hsl(var(--primary)/0.6)]"
                        : "border-border bg-card text-muted-foreground";
                      return (
                        <li key={step} className="flex flex-col items-center gap-3 px-1 text-center">
                          <span className="relative">
                            {highlight && isLast ? (
                              <span aria-hidden className="absolute inset-0 rounded-2xl bg-primary/40 motion-safe:animate-ping" />
                            ) : null}
                            <span className={`relative flex size-11 items-center justify-center rounded-2xl border ${nodeTone}`}>
                              <StepIcon className="size-5" stroke={1.75} />
                            </span>
                            <span
                              className={`absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full border bg-background font-mono text-[0.625rem] font-semibold ${
                                highlight ? "border-primary/40 text-primary" : "border-border text-muted-foreground"
                              }`}
                            >
                              {stepIndex + 1}
                            </span>
                          </span>
                          <span className={`text-[0.8125rem] font-semibold leading-tight sm:text-sm ${highlight ? "" : "text-foreground/70"}`}>
                            {step}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <ul className="space-y-3 border-t border-border/70 pt-6 text-[0.9375rem]">
                  {data.points.map((point) => (
                    <li key={point} className={`flex gap-3 ${highlight ? "text-foreground/85" : "text-muted-foreground"}`}>
                      <span
                        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
                          highlight ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-3" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

function ExperienceSection() {
  const journey = useKioskJourneyViewModel();

  return (
    <SectionShell id="experience" tone="muted">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="space-y-8">
          <SectionHeading kicker="Inside the experience">
            More than a screen. <span className="block text-primary">A connected purchase.</span>
          </SectionHeading>
          <Reveal delay={100}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              From recognising the pieces to recording the sale, see how SelfSwift brings the physical kiosk,
              shopper checkout and store systems into one product.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              One purchase. Four connected moments.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <ol className="relative">
              {journey.stages.map((item, index) => {
                const active = index === journey.index;
                const done = index < journey.index;
                const isLast = index === journey.stages.length - 1;
                const StageIcon = STAGE_ICONS[item.id];
                return (
                  <li key={item.id} className="relative">
                    {/* Connector sits in the gap between this node and the next one (node centre = 2.125rem). */}
                    {isLast ? null : (
                      <span
                        aria-hidden
                        className={`absolute -bottom-2 left-[2.125rem] top-[3.75rem] -translate-x-1/2 transition-colors duration-500 ${
                          done ? "w-0.5 rounded-full bg-primary" : "border-l-2 border-dashed border-border"
                        }`}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => journey.select(index)}
                      aria-current={active ? "step" : undefined}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        active
                          ? "border-primary/30 bg-card shadow-[0_18px_40px_-20px_hsl(var(--primary)/0.5)]"
                          : "border-transparent hover:bg-card/60"
                      }`}
                    >
                      <span
                        className={`relative flex size-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                          active
                            ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.7)]"
                            : done
                              ? "border-primary/40 bg-card text-primary"
                              : "border-border bg-card text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {done ? <IconCheck className="size-5" stroke={2.25} /> : <StageIcon className="size-5" stroke={1.75} />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block font-mono text-[0.6875rem] uppercase tracking-[0.14em] ${active ? "text-primary" : "text-muted-foreground"}`}>
                          Step {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={`mt-0.5 block font-medium ${active ? "text-foreground" : "text-foreground/75"}`}>{item.title}</span>
                        {active ? (
                          <span aria-hidden className="mt-2.5 block h-1 overflow-hidden rounded-full bg-primary/15">
                            <span
                              key={journey.cycle}
                              className="animate-stage-progress block h-full rounded-full bg-primary"
                              style={stageProgressStyle(journey.paused)}
                            />
                          </span>
                        ) : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="relative">
            <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/25 via-transparent to-primary/10 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_40px_100px_-40px_hsl(var(--primary)/0.45)]">
              <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span aria-hidden className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-foreground/15" />
                    <span className="size-2.5 rounded-full bg-foreground/15" />
                    <span className="size-2.5 rounded-full bg-primary/60" />
                  </span>
                  <span className="truncate font-mono text-xs text-muted-foreground">SelfSwift / Product concept</span>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider ${
                    journey.paused ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  <span className="relative flex size-1.5">
                    {journey.paused ? null : <span className="absolute inset-0 rounded-full bg-primary motion-safe:animate-ping" />}
                    <span className={`relative size-1.5 rounded-full ${journey.paused ? "bg-muted-foreground" : "bg-primary"}`} />
                  </span>
                  {journey.paused ? "Paused" : "Live demo"}
                </span>
              </div>

              <div className="p-3">
                <div className="relative overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={SITE_IMAGES.kioskJourneyGif}
                    alt="Animated SelfSwift kiosk showing RFID recognition, basket review, payment, receipt and connected store records"
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Story-style segments; the running one advances the journey when it fills. */}
                  <div aria-hidden className="absolute inset-x-3 bottom-3 flex gap-1.5">
                    {journey.stages.map((item, index) => (
                      <span key={item.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                        {index < journey.index ? <span className="block h-full bg-white" /> : null}
                        {index === journey.index ? (
                          <span
                            key={journey.cycle}
                            className="animate-stage-progress block h-full bg-white"
                            style={stageProgressStyle(journey.paused)}
                            onAnimationEnd={journey.advance}
                          />
                        ) : null}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div key={journey.stage.id} className="animate-fade-up relative space-y-4 px-6 pb-6 pt-3 sm:px-8 sm:pb-8">
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-0 select-none font-display text-[6.5rem] font-bold leading-none tracking-tighter text-primary/[0.07] sm:right-8"
                >
                  {String(journey.index + 1).padStart(2, "0")}
                </span>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-primary">
                  Stage {journey.index + 1} of {KIOSK_STAGES.length} · {journey.stage.title}
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{journey.stage.heading}</h3>
                <p className="max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground">{journey.stage.body}</p>
                <p className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/[0.06] p-3 text-sm font-medium">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    {(() => {
                      const CalloutIcon = STAGE_ICONS[journey.stage.id];
                      return <CalloutIcon className="size-4" />;
                    })()}
                  </span>
                  {journey.stage.callout}
                </p>

                <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="size-9 rounded-full" onClick={journey.previous} aria-label="Previous stage">
                      <IconChevronLeft className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-9 rounded-full" onClick={journey.advance} aria-label="Next stage">
                      <IconChevronRight className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-full" onClick={journey.togglePaused}>
                      {journey.paused ? <IconPlayerPlay className="size-3.5" /> : <IconPlayerPause className="size-3.5" />}
                      {journey.paused ? "Resume" : "Pause"}
                      <span className="sr-only"> kiosk journey</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-full" onClick={journey.restart}>
                      <IconRotateClockwise className="size-3.5" />
                      Restart
                      <span className="sr-only"> kiosk journey</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

// Device-style widget shell that floats over each Beyond card's photo.
function DemoScreen({ label, live, children }: { label: string; live: boolean; children: React.ReactNode }) {
  return (
    <div className="relative z-10 mx-4 -mt-20 overflow-hidden rounded-2xl border border-border bg-background/95 p-4 text-foreground shadow-2xl shadow-black/20 backdrop-blur-xl sm:mx-6 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
        <span className="relative flex size-2">
          {live ? <span className="absolute inset-0 rounded-full bg-primary motion-safe:animate-ping" /> : null}
          <span className={`relative size-2 rounded-full ${live ? "bg-primary" : "bg-muted-foreground/40"}`} />
        </span>
      </div>
      {children}
    </div>
  );
}

function RackDemo() {
  const rack = useRackReadViewModel(BEYOND.rack.tags.length);
  const lit = rack.state !== "idle";
  const status =
    rack.state === "ready" ? BEYOND.rack.status : rack.state === "reading" ? BEYOND.rack.readingStatus : BEYOND.rack.idleStatus;

  return (
    <DemoScreen label={BEYOND.rack.previewLabel} live={rack.state === "reading"}>
      <div className="relative grid grid-cols-3 gap-2 overflow-hidden rounded-xl">
        {BEYOND.rack.tags.map((tag, index) => (
          <span
            key={tag}
            style={{ transitionDelay: lit ? `${index * rack.tagStaggerMs}ms` : "0ms" }}
            className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-all duration-300 ${
              lit
                ? "border-primary/50 bg-primary/10 text-foreground"
                : "border-border bg-muted/60 text-muted-foreground"
            }`}
          >
            <IconTag className={`size-5 transition-colors duration-300 ${lit ? "text-primary" : ""}`} style={{ transitionDelay: lit ? `${index * rack.tagStaggerMs}ms` : "0ms" }} />
            {tag}
          </span>
        ))}
        {rack.state === "reading" ? (
          <span aria-hidden className="animate-flow-line pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
        ) : null}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p aria-live="polite" className="truncate text-sm font-semibold">
            {status}
          </p>
          <p className="font-mono text-[0.6875rem] text-muted-foreground">
            {rack.state === "ready" ? BEYOND.rack.tags.length : 0} / {BEYOND.rack.tags.length} tags
          </p>
        </div>
        <Button size="sm" className="shrink-0 rounded-full" onClick={rack.read} disabled={rack.state === "reading"}>
          <IconScan className="size-3.5" />
          {rack.state === "ready" ? BEYOND.rack.resetCta : BEYOND.rack.cta}
        </Button>
      </div>
    </DemoScreen>
  );
}

function ExitDemo() {
  const exit = useExitScenarioViewModel();
  const antenna = exit.alert ? "bg-destructive" : "bg-primary";

  return (
    <DemoScreen label={BEYOND.exit.previewLabel} live={!exit.alert}>
      <div
        className={`flex items-center gap-4 rounded-xl border p-2 pr-3 transition-colors ${
          exit.alert ? "border-destructive/50 bg-destructive/10" : "border-primary/25 bg-primary/[0.06]"
        }`}
      >
        {/* Door gate: two antennas either side of the exit. */}
        <div aria-hidden className="relative flex h-16 w-24 shrink-0 items-end justify-between rounded-lg border border-border bg-background px-3 pb-2">
          <span className={`relative h-12 w-1.5 rounded-full transition-colors ${antenna}`}>
            {exit.alert ? <span className="absolute inset-0 rounded-full bg-destructive motion-safe:animate-ping" /> : null}
          </span>
          <span className={`mb-1 flex size-7 items-center justify-center rounded-full transition-colors ${exit.alert ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}>
            {exit.alert ? <IconAlertTriangle className="size-4" /> : <IconCheck className="size-4" />}
          </span>
          <span className={`relative h-12 w-1.5 rounded-full transition-colors ${antenna}`}>
            {exit.alert ? <span className="absolute inset-0 rounded-full bg-destructive motion-safe:animate-ping" /> : null}
          </span>
        </div>
        <div aria-live="polite" className="min-w-0">
          <p className="text-sm font-semibold">{exit.alert ? BEYOND.exit.alertStatus : BEYOND.exit.status}</p>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            {exit.alert ? BEYOND.exit.alertSupporting : BEYOND.exit.supporting}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">{BEYOND.exit.prompt}</p>
        <Button
          size="sm"
          variant={exit.alert ? "default" : "outline"}
          className="shrink-0 rounded-full"
          onClick={exit.toggle}
          aria-pressed={exit.alert}
        >
          {exit.alert ? <IconCheck className="size-3.5" /> : <IconAlertTriangle className="size-3.5" />}
          {exit.alert ? BEYOND.exit.resetCta : BEYOND.exit.cta}
        </Button>
      </div>
    </DemoScreen>
  );
}

interface BeyondCardProps {
  number: string;
  content: { imageLabel: string; kicker: string; heading: string; body: string };
  image: string;
  alt: string;
  demo: React.ReactNode;
}

function BeyondCard({ number, content, image, alt, demo }: BeyondCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card text-foreground shadow-2xl shadow-black/10">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 py-1 pl-1 pr-3.5 text-xs font-semibold text-white backdrop-blur-md">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary font-mono text-[0.625rem] text-primary-foreground">
            {number}
          </span>
          {content.imageLabel}
        </span>
      </div>

      {demo}

      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{content.kicker}</p>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-[1.75rem]">{content.heading}</h3>
        <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{content.body}</p>
      </div>
    </article>
  );
}

function BeyondSection() {
  return (
    <SectionShell id="how-it-works" tone="base">
      <div aria-hidden className="pointer-events-none absolute -inset-x-[50vw] -bottom-24 -top-24 -z-0">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_45%_55%_at_50%_45%,black,transparent)]" />
        <div className="absolute left-1/2 top-[35%] size-[40rem] -translate-x-[80%] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute left-1/2 top-[55%] size-[34rem] -translate-x-[10%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
        <SectionHeading kicker={BEYOND.kicker}>
          {BEYOND.headline[0]} <span className="block text-primary">{BEYOND.headline[1]}</span>
        </SectionHeading>
        <Reveal delay={100}>
          <p className="max-w-xl text-pretty text-lg leading-8 text-foreground/70 lg:border-l lg:border-border/70 lg:pl-8">
            {BEYOND.body}
          </p>
        </Reveal>
      </div>

      <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* "One tag" bridge linking the rack to the door. */}
        <div aria-hidden className="absolute left-1/2 top-[18%] z-20 hidden -translate-x-1/2 items-center lg:flex">
          <span className="h-px w-8 border-t-2 border-dashed border-primary/50" />
          <span className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xl shadow-primary/30">
            <IconTag className="size-3.5" />
            {BEYOND.connector}
          </span>
          <span className="h-px w-8 border-t-2 border-dashed border-primary/50" />
        </div>

        <Reveal className="h-full">
          <BeyondCard
            number="01"
            content={BEYOND.rack}
            image={SITE_IMAGES.rackCount}
            alt="Store associate using an RFID reader beside a rack of tagged clothing"
            demo={<RackDemo />}
          />
        </Reveal>
        <Reveal delay={150} className="h-full">
          <BeyondCard
            number="02"
            content={BEYOND.exit}
            image={SITE_IMAGES.doorExit}
            alt="Shopper carrying clothing and shoes through boutique exit antennas"
            demo={<ExitDemo />}
          />
        </Reveal>
      </div>
    </SectionShell>
  );
}

const FUTURE_TAB_ICONS = { warehouse: IconBuildingWarehouse, data: IconChartHistogram } as const;

// One illustrative photo per step, in FUTURE.tabs[n].steps order.
const FUTURE_SLIDES = {
  warehouse: [
    { src: SITE_IMAGES.warehouse, alt: "Apparel warehouse associate scanning tagged cartons with an RFID reader" },
    { src: SITE_IMAGES.rackCount, alt: "Associate reading tagged clothing on a rack with an RFID reader" },
    { src: appPath("/images/store/store-organization.jpg"), alt: "A stocked boutique floor with clothing on rope-hung rails" },
  ],
  data: [
    { src: appPath("/images/store/browsing-shirts.jpg"), alt: "A shopper browsing shirts on a clothing rack" },
    { src: appPath("/images/store/forever21-sm-aura.jpg"), alt: "A clothing store interior with sized ranges across categories" },
    { src: appPath("/images/store/mall-shopping.jpg"), alt: "A shopper with bags riding an escalator in a shopping mall" },
  ],
} as const;

function SlideCaption({ index, total, title, area }: { index: number; total: number; title: string; area: string }) {
  return (
    <div
      key={index}
      className="animate-fade-up absolute inset-x-4 bottom-4 flex items-end gap-4 rounded-2xl border border-white/15 bg-black/45 p-4 text-white shadow-2xl backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5"
    >
      <span className="font-display text-5xl font-semibold leading-none tracking-tighter tabular-nums sm:text-6xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1 pb-1">
        <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/65">
          {area} · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="mt-1 block text-lg font-semibold leading-snug text-balance sm:text-xl">{title}</span>
      </span>
    </div>
  );
}

function FutureSection() {
  const explorer = useFutureExplorerViewModel();
  const { tab } = explorer;

  return (
    <SectionShell id="future" tone="accent">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
        <SectionHeading kicker={FUTURE.kicker}>
          {FUTURE.headline[0]} <span className="block text-primary">{FUTURE.headline[1]}</span>
        </SectionHeading>
        <Reveal delay={100}>
          <p className="max-w-xl text-pretty text-lg leading-8 text-foreground/70">{FUTURE.body}</p>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div
          role="tablist"
          aria-label={FUTURE.kicker}
          className="relative grid w-full grid-cols-2 rounded-2xl border border-border/70 bg-card/80 p-1.5 shadow-sm backdrop-blur sm:mx-auto sm:max-w-2xl sm:rounded-full"
        >
          <span
            aria-hidden
            className="absolute bottom-1.5 left-1.5 top-1.5 w-[calc(50%-0.375rem)] rounded-xl bg-primary shadow-lg shadow-primary/30 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] sm:rounded-full"
            style={{ transform: `translateX(${explorer.tabIndex * 100}%)` }}
          />
          {explorer.tabs.map((item, index) => {
            const active = index === explorer.tabIndex;
            const Icon = FUTURE_TAB_ICONS[item.id];
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`future-tab-${item.id}`}
                aria-selected={active}
                aria-controls="future-panel"
                onClick={() => explorer.selectTab(index)}
                className={`relative z-10 flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-center text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:rounded-full sm:px-5 ${
                  active ? "text-primary-foreground" : "text-foreground/65 hover:text-foreground"
                }`}
              >
                <Icon className="hidden size-4 shrink-0 sm:block" />
                {item.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div
        key={tab.id}
        role="tabpanel"
        id="future-panel"
        aria-labelledby={`future-tab-${tab.id}`}
        className="animate-fade-up grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl shadow-black/10">
          {/* All slides stay mounted so the next photo is loaded and can crossfade in. */}
          {FUTURE_SLIDES[tab.id].map((slide, index) => {
            const active = index === explorer.stepIndex;
            return (
              <img
                key={slide.src}
                src={slide.src}
                alt={active ? slide.alt : ""}
                aria-hidden={!active || undefined}
                loading="lazy"
                className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out ${
                  active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/90 backdrop-blur-md sm:left-5 sm:top-5">
            <span className="size-1.5 rounded-full bg-primary" />
            {FUTURE.imageBadge} · {FUTURE.imageTag}
          </span>

          <span aria-hidden className="absolute right-4 top-4 flex gap-1.5 sm:right-5 sm:top-6">
            {tab.steps.map((step, index) => (
              <span
                key={step}
                className={`h-1 rounded-full transition-all duration-500 ${index === explorer.stepIndex ? "w-6 bg-white" : "w-1.5 bg-white/45"}`}
              />
            ))}
          </span>

          <SlideCaption index={explorer.stepIndex} total={tab.steps.length} title={tab.steps[explorer.stepIndex]} area={tab.area} />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{tab.area}</p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-[2.5rem] sm:leading-[1.1]">{tab.heading}</h3>
          <p className="mt-5 text-pretty text-lg leading-8 text-foreground/70">{tab.body}</p>

          <ol className="scroll-stagger mt-8 border-t border-border/70">
            {tab.steps.map((step, index) => {
              const active = index === explorer.stepIndex;
              return (
                <li key={step} className="border-b border-border/70">
                  <button
                    type="button"
                    onClick={() => explorer.selectStep(index)}
                    aria-pressed={active}
                    className="group relative flex w-full items-baseline gap-5 py-4 pl-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-y-3 left-0 w-[3px] rounded-full bg-primary transition-transform duration-300 ${active ? "scale-y-100" : "scale-y-0"}`}
                    />
                    <span
                      className={`font-display text-3xl font-semibold tabular-nums tracking-tight transition-colors duration-300 ${
                        active ? "text-primary" : "text-foreground/20 group-hover:text-foreground/40"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-lg font-medium transition-colors duration-300 ${
                        active ? "text-foreground" : "text-foreground/55 group-hover:text-foreground/80"
                      }`}
                    >
                      {step}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <figure className="mt-8 flex gap-4">
            <span aria-hidden className="font-display text-5xl leading-none text-primary/40">“</span>
            <div>
              <figcaption className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
                {FUTURE.principleLabel}
              </figcaption>
              <blockquote className="mt-1.5 text-pretty text-lg font-medium leading-relaxed">{tab.outcome}</blockquote>
            </div>
          </figure>
        </div>
      </div>
    </SectionShell>
  );
}

export function ProductSections() {
  return (
    <>
      <ChallengeSection />
      <PhotoStrip />
      <ExperienceSection />
      <BeyondSection />
      <FutureSection />
    </>
  );
}
