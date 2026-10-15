import {
  IconArrowRight,
  IconArrowsExchange,
  IconBasket,
  IconBrandLinkedin,
  IconBuildingStore,
  IconChartLine,
  IconCheck,
  IconPlus,
  IconClockHour4,
  IconCreditCard,
  IconDoorExit,
  IconHeartHandshake,
  IconInfoCircle,
  IconMail,
  IconMessageCircle,
  IconPlugConnected,
  IconReceipt,
  IconScan,
  IconSend,
  IconShieldCheck,
  IconStopwatch,
  IconTags,
  IconUsers,
  IconUserStar,
} from "@tabler/icons-react";
import { appPath } from "@agent-native/core/client/api-path";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT, FAQ, FAQ_SECTION, PILOT, SITE_IMAGES } from "@/models/selfswift-content";
import { useEnquiryFormViewModel } from "@/view-models/use-enquiry-form";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { SectionShell } from "./section-shell";

// Icons follow the item order in PILOT.owners.measure / build.
const MEASURE_ICONS = [IconStopwatch, IconUsers, IconClockHour4, IconTags, IconMessageCircle, IconDoorExit];
const BUILD_ICONS = [IconScan, IconBasket, IconCreditCard, IconReceipt, IconPlugConnected, IconShieldCheck];

const CARD = "rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8";
const LABEL = "font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-primary";

function FoundingSpots() {
  const owners = PILOT.owners;
  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-2xl shadow-primary/25 sm:p-8">
      <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-primary-foreground/10 blur-2xl" />
      <p className="relative font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-primary-foreground/75">{owners.ctaNote}</p>
      <div className="relative mt-5 grid grid-cols-2 gap-3">
        {[1, 2].map((spot) => (
          <div key={spot} className="rounded-2xl border border-dashed border-primary-foreground/40 bg-primary-foreground/[0.07] p-4">
            <span className="font-display text-4xl font-semibold leading-none tabular-nums">0{spot}</span>
            <span className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-primary-foreground motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-primary-foreground" />
              </span>
              {owners.spotLabel} {owners.spotStatus}
            </span>
          </div>
        ))}
      </div>
      <Button asChild size="lg" variant="secondary" className="relative mt-6 h-12 w-full rounded-full text-[0.9375rem] font-semibold">
        <a href="#connect">
          {owners.cta}
          <IconArrowRight className="size-4" />
        </a>
      </Button>
    </div>
  );
}

function OwnersPanel() {
  const owners = PILOT.owners;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
        <div className={`${CARD} flex flex-col justify-center`}>
          <h3 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{owners.heading}</h3>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-8 text-foreground/70">{owners.body}</p>
        </div>
        <FoundingSpots />
      </div>

      {/* The exchange: what partners get on one side, what we ask on the other. */}
      <div className={`${CARD} relative grid gap-8 lg:grid-cols-2 lg:gap-16`}>
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-primary shadow-lg lg:flex"
        >
          <IconArrowsExchange className="size-5" />
        </span>
        <span aria-hidden className="absolute bottom-8 left-1/2 top-8 hidden w-px bg-border lg:block" />
        <div>
          <p className={LABEL}>{owners.get.title}</p>
          <ul className="mt-5 space-y-4">
            {owners.get.items.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <IconCheck className="size-3" stroke={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={LABEL}>{owners.ask.title}</p>
          <ol className="mt-5 space-y-4">
            {owners.ask.items.map((item, index) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-foreground/80">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border font-mono text-[0.625rem] font-semibold text-muted-foreground">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className={CARD}>
          <p className={LABEL}>{owners.store.title}</p>
          <ul className="mt-5 divide-y divide-border/70">
            {owners.store.items.map((item) => (
              <li key={item} className="flex items-center gap-3 py-3 text-[0.9375rem] font-medium first:pt-0 last:pb-0">
                <IconBuildingStore className="size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={CARD}>
          <p className={LABEL}>{owners.measure.title}</p>
          <ul className="scroll-stagger mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {owners.measure.items.map((item, index) => {
              const Icon = MEASURE_ICONS[index];
              return (
                <li key={item} className="flex flex-col gap-3 rounded-2xl bg-muted/60 p-4">
                  <Icon className="size-5 text-primary" />
                  <span className="text-sm font-medium leading-snug">{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={CARD}>
        <p className={LABEL}>{owners.steps.title}</p>
        <ol className="scroll-stagger relative mt-8 grid gap-8 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute left-5 right-5 top-5 hidden h-0.5 bg-gradient-to-r from-primary via-primary/40 to-border md:block" />
          {owners.steps.items.map((step, index) => (
            <li key={step.title} className="relative flex gap-4 md:flex-col">
              <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-semibold text-primary-foreground ring-4 ring-card">
                {index + 1}
              </span>
              <span>
                <span className="block font-semibold">{step.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{step.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className={CARD}>
        <p className={LABEL}>{owners.build.title}</p>
        <p className="mt-2 text-sm text-muted-foreground">{owners.build.note}</p>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-3">
          {owners.build.items.map((item, index) => {
            const Icon = BUILD_ICONS[index];
            return (
              <li key={item.title} className="group flex gap-4 bg-card p-5 transition-colors hover:bg-primary/[0.04]">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold leading-snug">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.body}</span>
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 flex gap-3 text-sm leading-relaxed text-muted-foreground">
          <IconInfoCircle className="mt-0.5 size-4 shrink-0" />
          {owners.build.footnote}
        </p>
      </div>
    </div>
  );
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <IconCheck className="size-3" stroke={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function VeteransPanel() {
  const veterans = PILOT.veterans;
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-foreground p-6 text-background sm:p-10">
        <div aria-hidden className="absolute -bottom-24 -right-24 size-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{veterans.heading}</h3>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-8 text-background/75">{veterans.body}</p>
          </div>
          <Button asChild size="lg" className="h-12 w-full rounded-full text-[0.9375rem] font-semibold lg:w-auto lg:justify-self-end">
            <a href="#connect">
              {veterans.cta}
              <IconArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>

      <div className="scroll-stagger grid gap-6 lg:grid-cols-3">
        {[veterans.who, veterans.do, veterans.get].map((group) => (
          <div key={group.title} className={CARD}>
            <p className={LABEL}>{group.title}</p>
            <CheckList items={group.items} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PilotSection() {
  const [audience, setAudience] = useState<(typeof PILOT.audiences)[number]["id"]>("owners");
  const panelTop = useRef<HTMLDivElement>(null);

  // Panels differ in height, so when switching from deep inside one, jump back to the panel start
  // instead of leaving the reader past the end of the shorter one.
  const selectAudience = (id: typeof audience) => {
    const el = panelTop.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start" });
    setAudience(id);
  };

  return (
    <SectionShell
      id="pilot"
      tone="base"
      decor={
        // Faded store-floor photo behind the heading, dissolving into the page before the panels start.
        <div className="absolute inset-x-0 top-0 h-[36rem] [mask-image:linear-gradient(180deg,black,transparent)]">
          <img src={appPath("/images/store/store-organization.jpg")} alt="" className="size-full object-cover opacity-[0.14] grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>
      }
    >
      <SectionHeading kicker={PILOT.kicker}>
        {PILOT.headline[0]} <span className="block text-primary">{PILOT.headline[1]}</span>
      </SectionHeading>

      {/* Tabs and panel share a parent so the tab bar stays pinned for the whole panel. */}
      <div ref={panelTop} className="scroll-mt-[4.5rem] md:scroll-mt-[5rem]">
        {/* shortcut: top offset clears the fixed SiteHeader (h-16, md:h-[4.5rem]); update both together. */}
        <div className="sticky top-[4.5rem] z-30 -mx-2 mb-6 rounded-[1.375rem] border border-border/70 bg-background/85 p-2 shadow-lg shadow-black/5 backdrop-blur-xl md:top-[5rem]">
          <div role="tablist" aria-label={PILOT.kicker} className="grid gap-2 sm:grid-cols-2">
            {PILOT.audiences.map((item) => {
              const active = item.id === audience;
              const Icon = item.id === "owners" ? IconBuildingStore : IconUserStar;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`pilot-tab-${item.id}`}
                  aria-selected={active}
                  aria-controls="pilot-panel"
                  onClick={() => selectAudience(item.id)}
                  className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "border-transparent hover:bg-muted/70"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                      active ? "bg-primary-foreground/15" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{item.label}</span>
                    <span className={`block truncate text-xs ${active ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{item.note}</span>
                  </span>
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      active ? "border-primary-foreground" : "border-border"
                    }`}
                  >
                    {active ? <span className="size-2 rounded-full bg-primary-foreground" /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div key={audience} role="tabpanel" id="pilot-panel" aria-labelledby={`pilot-tab-${audience}`} className="animate-fade-up">
          {audience === "owners" ? <OwnersPanel /> : <VeteransPanel />}
        </div>
      </div>
    </SectionShell>
  );
}

const ENQUIRY_ICONS = { retailer: IconBuildingStore, advisor: IconUserStar, investor: IconChartLine, partner: IconHeartHandshake } as const;
const FIELD = "h-11 rounded-xl bg-background";

function ContactSection() {
  const form = useEnquiryFormViewModel();
  const copy = CONTACT.form;

  return (
    <SectionShell id="connect" tone="muted">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-start lg:gap-16">
        <div className="space-y-8 lg:sticky lg:top-28">
          <SectionHeading kicker={CONTACT.kicker}>
            {CONTACT.headline[0]} <span className="block text-primary">{CONTACT.headline[1]}</span>
          </SectionHeading>
          <Reveal delay={100}>
            <p className="max-w-lg text-pretty text-lg leading-8 text-foreground/70">{CONTACT.body}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {CONTACT.areas.map((area) => (
                <li key={area} className="flex items-center gap-2 text-sm font-medium">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <IconMail className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">Email</span>
                  <span className="block truncate font-semibold group-hover:text-primary">{CONTACT.email}</span>
                </span>
              </a>
              <a
                href={CONTACT.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="relative shrink-0">
                  <img src={SITE_IMAGES.founder} alt="" className="size-11 rounded-xl object-cover" loading="lazy" />
                  <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-md bg-primary text-primary-foreground ring-2 ring-card">
                    <IconBrandLinkedin className="size-3" />
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">LinkedIn</span>
                  <span className="block truncate font-semibold group-hover:text-primary">{CONTACT.linkedin.label}</span>
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          {/* Composer: the inquiry reads like a new email to the team. */}
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-2xl shadow-black/10">
            <div className="flex items-center gap-3 border-b border-border/70 bg-muted/40 px-5 py-3">
              <span aria-hidden className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-foreground/15" />
                <span className="size-2.5 rounded-full bg-foreground/15" />
                <span className="size-2.5 rounded-full bg-primary/60" />
              </span>
              <span className="text-sm font-semibold">{copy.title}</span>
              <span className="ml-auto truncate font-mono text-xs text-muted-foreground">To: {CONTACT.email}</span>
            </div>

            {form.submitted ? (
              <div role="status" className="flex flex-col items-center gap-4 px-6 py-16 text-center sm:px-10">
                <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30">
                  <IconSend className="size-7" />
                </span>
                <p className="max-w-sm text-pretty text-lg font-medium">{copy.sent}</p>
                <Button variant="outline" className="rounded-full" onClick={() => form.selectType(form.type)}>
                  {copy.title}
                </Button>
              </div>
            ) : (
              <form onSubmit={form.submit} className="space-y-7 p-5 sm:p-8">
                <fieldset>
                  <legend className={LABEL}>{copy.iAm}</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {form.types.map((item) => {
                      const active = form.type === item.id;
                      const Icon = ENQUIRY_ICONS[item.id];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => form.selectType(item.id)}
                          className={`flex flex-col items-start gap-3 rounded-2xl border p-3 text-left text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                            active
                              ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                              : "border-border bg-background hover:border-primary/40"
                          }`}
                        >
                          <Icon className={`size-5 ${active ? "" : "text-primary"}`} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="grid gap-4 sm:grid-cols-2">
                  <legend className={`${LABEL} mb-3`}>{copy.aboutYou}</legend>
                  <div className="space-y-2">
                    <Label htmlFor="enquiry-name">{copy.name}</Label>
                    <Input id="enquiry-name" name="name" required maxLength={100} autoComplete="name" className={FIELD} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="enquiry-email">{copy.email}</Label>
                    <Input id="enquiry-email" name="email" type="email" required maxLength={255} autoComplete="email" className={FIELD} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="enquiry-org">{copy.organization}</Label>
                    <Input id="enquiry-org" name="organization" required maxLength={150} autoComplete="organization" className={FIELD} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="enquiry-role">{copy.role}</Label>
                    <Input id="enquiry-role" name="role" maxLength={100} autoComplete="organization-title" className={FIELD} />
                  </div>
                </fieldset>

                <fieldset className="grid gap-4 sm:grid-cols-2">
                  <legend className={`${LABEL} mb-3`}>{copy.aboutBusiness}</legend>
                  <div className="space-y-2">
                    <Label htmlFor="enquiry-region">{copy.region}</Label>
                    <Input id="enquiry-region" name="region" required maxLength={100} autoComplete="country-name" className={FIELD} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="enquiry-stores">
                      {copy.stores} <span className="font-normal text-muted-foreground">({copy.optional.toLowerCase()})</span>
                    </Label>
                    <Input id="enquiry-stores" name="stores" inputMode="numeric" maxLength={50} className={FIELD} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <span className="text-sm font-medium" id="enquiry-sells-label">
                      {copy.sells} <span className="font-normal text-muted-foreground">({copy.optional.toLowerCase()})</span>
                    </span>
                    <div role="radiogroup" aria-labelledby="enquiry-sells-label" className="flex flex-wrap gap-2">
                      {copy.sellsOptions.map((option) => (
                        <label
                          key={option}
                          className="cursor-pointer rounded-full border border-border bg-background px-3.5 py-1.5 text-sm transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
                        >
                          <input type="radio" name="sells" value={option} className="sr-only" />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="enquiry-message">{copy.message}</Label>
                    <Textarea id="enquiry-message" name="message" rows={4} maxLength={2000} className="rounded-xl bg-background" />
                  </div>
                </fieldset>

                {/* Honeypot for bots; hidden from people and assistive tech. */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label>
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="flex flex-col gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-start gap-3 text-sm text-muted-foreground">
                    <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-[hsl(var(--primary))]" />
                    {copy.consent}
                  </label>
                  <Button type="submit" size="lg" className="h-12 shrink-0 rounded-full px-6 text-[0.9375rem] font-semibold">
                    {copy.submit}
                    <IconSend className="size-4" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

type FaqTopic = (typeof FAQ_SECTION.topics)[number]["id"];

function FaqSection() {
  const [topic, setTopic] = useState<FaqTopic | "all">("all");
  const filters = [{ id: "all" as const, label: FAQ_SECTION.allLabel }, ...FAQ_SECTION.topics];
  const visible = FAQ.filter((item) => topic === "all" || item.topic === topic);

  return (
    <SectionShell id="faq" tone="base">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading kicker={FAQ_SECTION.kicker}>
            {FAQ_SECTION.headline[0]} <span className="block text-primary">{FAQ_SECTION.headline[1]}</span>
          </SectionHeading>

          <Reveal delay={100}>
            <div role="group" aria-label="Filter questions by topic" className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
              {filters.map((item) => {
                const active = topic === item.id;
                const count = item.id === "all" ? FAQ.length : FAQ.filter((faq) => faq.topic === item.id).length;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTopic(item.id)}
                    className={`flex items-center justify-between gap-4 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:rounded-xl lg:py-3 ${
                      active ? "border-primary bg-primary text-primary-foreground" : "border-border/70 bg-card/70 hover:border-primary/40"
                    }`}
                  >
                    {item.label}
                    <span className={`font-mono text-xs ${active ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                      {String(count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="hidden rounded-2xl bg-foreground p-5 text-background lg:block">
              <p className="font-display text-lg font-semibold">{FAQ_SECTION.help.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-background/70">{FAQ_SECTION.help.body}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button asChild size="sm" className="rounded-full">
                  <a href="#connect">
                    {FAQ_SECTION.help.cta}
                    <IconArrowRight className="size-3.5" />
                  </a>
                </Button>
                <a href={`mailto:${CONTACT.email}`} className="text-sm font-medium text-background/80 underline-offset-4 hover:underline">
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <ol key={topic} className="scroll-stagger animate-fade-up divide-y divide-border/70 border-y border-border/70">
          {visible.map((item) => {
            const number = FAQ.indexOf(item) + 1;
            return (
              <li key={item.question}>
                {/* Same `name` makes the native accordion exclusive: opening one closes the others. */}
                <details name="faq" className="group relative">
                  <summary className="flex cursor-pointer list-none items-baseline gap-5 py-5 pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                    <span className="w-7 shrink-0 font-mono text-xs tabular-nums text-muted-foreground transition-colors group-open:text-primary">
                      {String(number).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-lg font-medium leading-snug transition-colors group-hover:text-primary">{item.question}</span>
                    <span className="flex size-8 shrink-0 items-center justify-center self-center rounded-full border border-border transition-all duration-300 group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-primary-foreground">
                      <IconPlus className="size-4" />
                    </span>
                  </summary>
                  <div className="relative mb-6 ml-12 mr-12 border-l-2 border-primary pl-5">
                    <p className="text-pretty text-[0.9375rem] leading-relaxed text-foreground/75">{item.answer}</p>
                  </div>
                </details>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionShell>
  );
}

export function ContactSections() {
  return (
    <>
      <ContactSection />
      <FaqSection />
    </>
  );
}
