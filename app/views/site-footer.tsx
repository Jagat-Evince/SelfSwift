import {
  IconArrowRight,
  IconArrowUp,
  IconArrowUpRight,
  IconBrandLinkedin,
  IconCode,
  IconMail,
} from "@tabler/icons-react";

import { CONTACT, FOOTER } from "@/models/selfswift-content";
import { Button } from "@/components/ui/button";

import { BrandLogo } from "./brand-logo";
import { Reveal } from "./reveal";

export function SiteFooter() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-8">
        <Reveal>
          {/* A retail hang tag: punched hole, perforation, then the call to action. */}
          <div className="group relative -rotate-1 overflow-hidden rounded-[2rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/30 transition-transform duration-500 hover:rotate-0">
            {/* Abstract RFID signal: rings radiating from the right edge over a fading dot grid. */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--primary-foreground)/0.18)_1.5px,transparent_1.5px)] [background-size:18px_18px] [mask-image:linear-gradient(90deg,transparent_35%,black_80%)]" />
              <div className="absolute right-0 top-1/2 size-0">
                {[160, 260, 360, 460, 560].map((size, index) => (
                  <span
                    key={size}
                    style={{ width: size, height: size, opacity: 0.32 - index * 0.05 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-foreground"
                  />
                ))}
                <span className="absolute left-1/2 top-1/2 size-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/15 motion-safe:animate-ping [animation-duration:3s]" />
                <span className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground/20 blur-md" />
              </div>
            </div>

            <span aria-hidden className="absolute left-7 top-1/2 hidden size-7 -translate-y-1/2 rounded-full bg-background ring-[6px] ring-primary-foreground/20 sm:block" />
            <span aria-hidden className="absolute inset-y-6 left-[4.5rem] hidden border-l-2 border-dashed border-primary-foreground/30 sm:block" />

            <div className="relative flex flex-col gap-8 p-8 sm:pl-28 sm:pr-14 sm:py-14 md:flex-row md:items-end md:justify-between">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em]">
                  <span className="size-1.5 rounded-full bg-primary-foreground" />
                  Start a conversation
                </p>
                <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
                  Investors, partners &amp; retailers
                </h2>
              </div>
              <div className="flex flex-col items-start gap-3 md:items-end">
                <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-7 text-[0.9375rem] font-semibold">
                  <a href="#connect">
                    Get in touch
                    <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>
                <a href={`mailto:${CONTACT.email}`} className="text-sm font-medium text-primary-foreground/80 underline-offset-4 hover:text-primary-foreground hover:underline">
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative overflow-hidden bg-foreground text-background">
        <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 size-[30rem] rounded-full bg-primary/25 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-10 pt-20 lg:grid-cols-[1.1fr_1.4fr_1fr] lg:gap-16">
          <div className="space-y-6">
            {/* The logo's dark-green "Swift" is too low-contrast on this dark footer, so lighten it here. */}
            <div className="flex items-end gap-2 [&_.text-primary]:text-background/60">
              <BrandLogo />
              <span className="pb-0.5 text-sm text-background/55">by EvinceDev</span>
            </div>
            <p className="max-w-xs text-pretty leading-relaxed text-background/70">{FOOTER.tagline}</p>
            <a
              href="#product"
              className="group inline-flex items-center gap-2 rounded-full border border-background/20 px-4 py-2 text-sm font-medium transition-colors hover:border-background hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
            >
              <IconArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
              {FOOTER.backToTop}
            </a>
          </div>

          <nav aria-labelledby="footer-explore">
            <p id="footer-explore" className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-background/50">
              {FOOTER.exploreTitle}
            </p>
            <ul className="scroll-stagger mt-5 grid grid-cols-2 gap-x-8">
              {FOOTER.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-baseline border-b border-background/10 py-2.5 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
                  >
                    <span className="font-medium text-background/85 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-background">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-background/50">{FOOTER.contactTitle}</p>
            <ul className="scroll-stagger mt-5 space-y-2">
              {[
                { href: `mailto:${CONTACT.email}`, label: CONTACT.email, Icon: IconMail, external: false },
                { href: FOOTER.linkedin.href, label: FOOTER.linkedin.label, Icon: IconBrandLinkedin, external: true },
                { href: FOOTER.builtBy.href, label: FOOTER.builtBy.label, Icon: IconCode, external: true },
              ].map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3 rounded-xl border border-background/10 bg-background/[0.04] p-3 transition-colors hover:border-background/30 hover:bg-background/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">{label}</span>
                    <IconArrowUpRight className="size-4 shrink-0 text-background/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-background" />
                    {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark, cropped by the footer's bottom edge. */}
        <div aria-hidden className="relative mx-auto max-w-7xl overflow-hidden px-5">
          <p className="translate-y-[18%] select-none text-center bg-gradient-to-b from-background/20 to-background/0 bg-clip-text font-display text-[22vw] font-bold leading-[0.8] tracking-tighter text-transparent lg:text-[17rem]">
            SelfSwift
          </p>
        </div>

        <div className="relative border-t border-background/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between">
            <p>{FOOTER.copyright}</p>
            <p>
              {FOOTER.poweredBy.lead}{" "}
              <a
                href={FOOTER.poweredBy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-background/80 underline-offset-4 hover:text-background hover:underline"
              >
                {FOOTER.poweredBy.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
