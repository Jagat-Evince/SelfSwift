import {
  IconAlertTriangle,
  IconArrowRight,
  IconArrowUpRight,
  IconBrandLinkedin,
  IconCertificate,
  IconDevices,
  IconHanger,
  IconInfoCircle,
  IconListNumbers,
  IconPlus,
  IconRecycle,
  IconReceiptRefund,
  IconRefresh,
  IconRoute,
  IconScan,
  IconSearch,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { useState } from "react";

import { ROADMAP, SITE_IMAGES, TEAM, USE_CASE_STAGES, USE_CASES } from "@/models/selfswift-content";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { SectionShell } from "./section-shell";

const USE_CASE_ICONS = {
  checkout: IconScan,
  theft: IconAlertTriangle,
  inventory: IconListNumbers,
  replenishment: IconRefresh,
  fitting: IconHanger,
  receiving: IconTruckDelivery,
  finding: IconSearch,
  omnichannel: IconDevices,
  returns: IconReceiptRefund,
  authenticity: IconCertificate,
  traceability: IconRoute,
  resale: IconRecycle,
} as const;


function SplitHeading({ kicker, headline, body }: { kicker: string; headline: readonly [string, string]; body: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
      <SectionHeading kicker={kicker}>
        {headline[0]} <span className="block text-primary">{headline[1]}</span>
      </SectionHeading>
      <Reveal delay={100}>
        <p className="max-w-xl text-pretty text-lg leading-8 text-foreground/70 lg:border-l lg:border-border/70 lg:pl-8">{body}</p>
      </Reveal>
    </div>
  );
}

type StageId = (typeof USE_CASE_STAGES)[number]["id"];

const STAGE_INDEX = Object.fromEntries(USE_CASE_STAGES.map((stage, index) => [stage.id, index])) as Record<StageId, number>;
const STAGE_LABEL = Object.fromEntries(USE_CASE_STAGES.map((stage) => [stage.id, stage.label])) as Record<StageId, string>;

/** Five bars; more filled = sooner. */
function HorizonMeter({ stage, inverted = false }: { stage: StageId; inverted?: boolean }) {
  const filled = USE_CASE_STAGES.length - STAGE_INDEX[stage];
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="flex items-end gap-0.5">
        {USE_CASE_STAGES.map((item, index) => (
          <span
            key={item.id}
            style={{ height: `${6 + index * 2}px` }}
            className={`w-1 rounded-full ${
              index < filled ? (inverted ? "bg-primary-foreground" : "bg-primary") : inverted ? "bg-primary-foreground/25" : "bg-foreground/15"
            }`}
          />
        ))}
      </span>
      <span className={`text-[0.6875rem] font-semibold uppercase tracking-wider ${inverted ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
        {STAGE_LABEL[stage]}
      </span>
    </span>
  );
}

function UseCasesSection() {
  const [filter, setFilter] = useState<StageId | "all">("all");
  const [featured, highlight, ...rest] = USE_CASES.items;
  const matches = (stage: StageId) => filter === "all" || filter === stage;
  const dim = (stage: StageId) => (matches(stage) ? "" : "scale-[0.98] opacity-25 saturate-0");
  const FeaturedIcon = USE_CASE_ICONS[featured.id];
  const HighlightIcon = USE_CASE_ICONS[highlight.id];

  return (
    <SectionShell id="use-cases" tone="muted">
      <SplitHeading kicker={USE_CASES.kicker} headline={USE_CASES.headline} body={USE_CASES.body} />

      <Reveal delay={120}>
        <div role="group" aria-label="Filter use cases by timing" className="flex flex-wrap gap-2">
          {[{ id: "all" as const, label: "All" }, ...USE_CASE_STAGES].map((stage) => {
            const active = filter === stage.id;
            const count = stage.id === "all" ? USE_CASES.items.length : USE_CASES.items.filter((item) => item.stage === stage.id).length;
            return (
              <button
                key={stage.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(stage.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"
                }`}
              >
                {stage.label}
                <span className={`font-mono text-[0.625rem] ${active ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={180}>
        <ul className="scroll-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Featured: what the pilot ships first. */}
          <li
            className={`relative min-h-[22rem] overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-2xl shadow-primary/25 transition-all duration-500 sm:col-span-2 lg:row-span-2 ${dim(featured.stage)}`}
          >
            <img src={SITE_IMAGES.basketCheckout} alt="" aria-hidden loading="lazy" className="absolute inset-0 size-full object-cover opacity-30 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/30" />
            <div className="relative flex h-full flex-col justify-between gap-10 p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary-foreground text-primary shadow-lg">
                  <FeaturedIcon className="size-7" />
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1.5 backdrop-blur">
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 rounded-full bg-primary-foreground motion-safe:animate-ping" />
                    <span className="relative size-2 rounded-full bg-primary-foreground" />
                  </span>
                  <HorizonMeter stage={featured.stage} inverted />
                </span>
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{featured.title}</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-primary-foreground/85">{featured.body}</p>
              </div>
            </div>
          </li>

          <li
            className={`flex flex-col justify-between gap-6 rounded-3xl border border-primary/30 bg-primary/[0.06] p-6 transition-all duration-500 sm:col-span-2 ${dim(highlight.stage)}`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <HighlightIcon className="size-5" />
              </span>
              <HorizonMeter stage={highlight.stage} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">{highlight.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{highlight.body}</p>
            </div>
          </li>

          {rest.map((item) => {
            const Icon = USE_CASE_ICONS[item.id];
            return (
              <li
                key={item.id}
                className={`group flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg ${dim(item.stage)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <HorizonMeter stage={item.stage} />
                </div>
                <div>
                  <h3 className="font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </SectionShell>
  );
}

function RoadmapSection() {
  const last = ROADMAP.phases.length - 1;
  return (
    <SectionShell id="roadmap" tone="ink">
      <SplitHeading kicker={ROADMAP.kicker} headline={ROADMAP.headline} body={ROADMAP.body} />

      <Reveal delay={150}>
        <ol className="scroll-stagger relative grid md:grid-cols-5">
          {/* Desktop road: runs through the milestone row; the lit part ends just past "Now". */}
          <span aria-hidden className="absolute left-0 right-0 top-[4.625rem] hidden h-0.5 bg-border md:block" />
          <span aria-hidden className="absolute left-0 top-[4.625rem] hidden h-0.5 w-[14%] bg-gradient-to-r from-primary to-primary/0 md:block" />

          {ROADMAP.phases.map((phase, index) => {
            const isNow = index === 0;
            return (
              <li key={phase.id} className="relative pb-10 pl-10 last:pb-0 md:pb-0 md:pl-0 md:pr-6">
                {/* Mobile road segment down to the next milestone. */}
                {index < last ? (
                  <span
                    aria-hidden
                    className={`absolute bottom-0 left-[9px] top-6 w-0.5 md:hidden ${isNow ? "bg-gradient-to-b from-primary to-border" : "bg-border"}`}
                  />
                ) : null}

                <span
                  aria-hidden
                  className={`block font-display text-4xl font-semibold leading-none tabular-nums md:h-16 md:text-6xl ${
                    isNow ? "text-primary" : "text-foreground/15"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="absolute left-0 top-2 flex items-center gap-3 md:relative md:top-auto md:mt-0 md:h-5">
                  <span className="relative flex size-5 shrink-0 items-center justify-center">
                    {isNow ? <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" /> : null}
                    <span
                      className={`relative size-5 rounded-full ${
                        isNow ? "bg-primary ring-4 ring-primary/20" : "border-2 border-border bg-background"
                      }`}
                    />
                  </span>
                  {isNow ? (
                    <span className="hidden rounded-full bg-primary px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-primary-foreground md:inline">
                      {ROADMAP.hereLabel}
                    </span>
                  ) : null}
                </span>

                <div className="mt-3 md:mt-6">
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
                    {phase.title}
                    {isNow ? (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-primary-foreground md:hidden">
                        {ROADMAP.hereLabel}
                      </span>
                    ) : null}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isNow ? "text-foreground/85" : "text-muted-foreground"}`}>{phase.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>

      <Reveal>
        <p className="flex max-w-3xl gap-3 border-t border-border/70 pt-6 text-sm leading-relaxed text-muted-foreground">
          <IconInfoCircle className="mt-0.5 size-4 shrink-0" />
          {ROADMAP.note}
        </p>
      </Reveal>
    </SectionShell>
  );
}

function TeamSection() {
  const { founder, open } = TEAM;
  return (
    <SectionShell id="team" tone="accent">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
        <div className="space-y-6">
          <SectionHeading kicker={TEAM.kicker}>
            {TEAM.headline[0]} <span className="block text-primary">{TEAM.headline[1]}</span>
          </SectionHeading>
          <Reveal delay={100}>
            <p className="max-w-xl text-pretty text-lg leading-8 text-foreground/70">
              {TEAM.bodyLead}{" "}
              <a
                href={TEAM.company.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline decoration-primary/50 decoration-2 underline-offset-4 transition-colors hover:text-primary"
              >
                {TEAM.company.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {TEAM.bodyRest}
            </p>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="scroll-stagger grid gap-4 sm:grid-cols-2">
            <figure className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-2xl shadow-black/15">
              <img
                src={SITE_IMAGES.founder}
                alt={founder.alt}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-display text-xl font-semibold leading-tight">{founder.name}</p>
                <p className="mt-1 text-sm text-white/80">{founder.role}</p>
                <p className="mt-0.5 text-xs text-white/60">{founder.note}</p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <IconBrandLinkedin className="size-4" />
                  LinkedIn
                  <IconArrowUpRight className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </figcaption>
            </figure>

            <a
              href="#connect"
              className="group relative flex aspect-[4/5] flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed border-primary/35 bg-card/60 p-6 text-center transition-colors hover:border-primary hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="relative flex size-20 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-primary/15 motion-safe:animate-ping [animation-duration:2.4s]" />
                <span className="relative flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition-transform duration-300 group-hover:rotate-90">
                  <IconPlus className="size-8" />
                </span>
              </span>
              <span>
                <span className="block font-display text-xl font-semibold leading-tight">{open.title}</span>
                <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{open.role}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {open.cta}
                <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

export function VisionSections() {
  return (
    <>
      <UseCasesSection />
      <RoadmapSection />
      <TeamSection />
    </>
  );
}
