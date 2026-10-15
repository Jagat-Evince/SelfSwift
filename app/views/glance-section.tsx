import {
  IconArrowUpRight,
  IconBroadcast,
  IconBuilding,
  IconBuildingStore,
  IconHammer,
  IconUsers,
  IconWorld,
} from "@tabler/icons-react";

import { GLANCE } from "@/models/selfswift-content";

import { Reveal } from "./reveal";

const FACT_ICONS = {
  what: IconBroadcast,
  status: IconHammer,
  who: IconBuildingStore,
  where: IconWorld,
  partners: IconUsers,
  builder: IconBuilding,
} as const;

export function GlanceSection() {
  return (
    <section id="glance" aria-labelledby="glance-title" className="relative scroll-mt-16 border-y border-border/60 bg-muted/40 py-16 md:scroll-mt-[4.5rem] md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-border/70 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="glance-title" className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {GLANCE.title[0]} <span className="text-muted-foreground">{GLANCE.title[1]}</span>
            </h2>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-3.5 py-1.5 text-[0.8125rem] font-medium text-primary">
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              {GLANCE.tag}
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-3">
            {GLANCE.facts.map((fact) => {
              const Icon = FACT_ICONS[fact.id];
              return (
                <div key={fact.id} className="flex flex-col gap-4 bg-card p-6 transition-colors hover:bg-accent/40 md:p-8">
                  <dt className="flex items-center gap-3 text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                      <Icon className="size-[1.125rem]" />
                    </span>
                    {fact.label}
                  </dt>
                  <dd className="font-display text-lg font-semibold leading-snug tracking-tight text-pretty md:text-xl">
                    {"href" in fact ? (
                      <a
                        href={fact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 underline decoration-primary/40 decoration-2 underline-offset-[6px] transition-colors hover:text-primary hover:decoration-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {fact.value}
                        <IconArrowUpRight className="size-4" aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : (
                      fact.value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
