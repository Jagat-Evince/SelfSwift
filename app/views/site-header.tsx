import { IconArrowRight, IconArrowUpRight, IconMenu2, IconMoon, IconSun, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/models/selfswift-content";
import { useActiveSectionViewModel } from "@/view-models/use-active-section";
import { useScrolledViewModel } from "@/view-models/use-scrolled";
import { useThemeViewModel } from "@/view-models/use-theme";

import { BrandLogo } from "./brand-logo";

const CONTACT_HREF = "#connect";
const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

interface SiteHeaderProps {
  /** The page opens on a dark hero: render light-on-dark until the header gets its own background. */
  overDark?: boolean;
}

export function SiteHeader({ overDark = false }: SiteHeaderProps) {
  const theme = useThemeViewModel();
  const scrolled = useScrolledViewModel();
  const activeSection = useActiveSectionViewModel(SECTION_IDS);
  const isActive = (href: string) => href.slice(1) === activeSection;
  const [menuOpen, setMenuOpen] = useState(false);
  // The drawer locks page scroll, so jump to the chosen section only after it has closed.
  const pendingHref = useRef<string | null>(null);

  const goFromMenu = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    pendingHref.current = href;
    setMenuOpen(false);
  };

  const themeLabel = theme.isDark ? "Switch to light mode" : "Switch to dark mode";
  const ThemeIcon = theme.isDark ? IconSun : IconMoon;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b text-foreground transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || menuOpen
          ? "border-border/70 bg-background/85 shadow-[0_8px_30px_-12px_hsl(var(--foreground)/0.18)] backdrop-blur-xl"
          : `border-transparent bg-transparent ${overDark ? "dark" : ""}`
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 md:h-[4.5rem]">
        <a href="#" aria-label="SelfSwift home" className="group shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <BrandLogo />
        </a>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={active ? "location" : undefined}
                    className={`group relative inline-flex h-10 items-center px-3.5 text-[0.9375rem] font-medium transition-colors hover:text-foreground focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 bottom-1 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:border-l lg:border-border/70 lg:pl-5">
          <Button variant="ghost" size="icon" onClick={theme.toggle} aria-label={themeLabel} title={themeLabel} className="size-10 rounded-full">
            <ThemeIcon className="size-[1.125rem]" />
          </Button>

          <Button asChild className="hidden h-10 rounded-full px-5 text-sm font-semibold sm:inline-flex">
            <a href={CONTACT_HREF} className="group">
              Connect with us
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu" className="size-10 rounded-full lg:hidden">
                <IconMenu2 className="size-[1.125rem]" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              showClose={false}
              aria-describedby={undefined}
              className="flex w-full flex-col gap-0 p-0 sm:max-w-sm"
              onCloseAutoFocus={(event) => {
                const href = pendingHref.current;
                pendingHref.current = null;
                if (!href) return;
                event.preventDefault();
                window.location.hash = href;
              }}
            >
              <SheetTitle className="sr-only">Site menu</SheetTitle>

              <div className="flex h-16 items-center justify-between border-b border-border/70 px-5">
                <BrandLogo />
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu" className="size-10 rounded-full">
                    <IconX className="size-5" />
                  </Button>
                </SheetClose>
              </div>

              <nav aria-label="Primary mobile" className="flex-1 overflow-y-auto px-5 py-4">
                <p className="pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Menu</p>
                <ul className="divide-y divide-border/70">
                  {NAV_LINKS.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          onClick={goFromMenu(link.href)}
                          aria-current={active ? "location" : undefined}
                          className={`group flex items-center justify-between py-4 font-display text-xl font-medium tracking-tight transition-colors hover:text-primary focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                            active ? "text-primary" : ""
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className={`h-5 w-0.5 rounded-full bg-primary transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                            />
                            {link.label}
                          </span>
                          <IconArrowUpRight
                            className={`size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary ${
                              active ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="space-y-3 border-t border-border/70 px-5 py-5">
                <Button asChild className="h-12 w-full rounded-full text-base font-semibold">
                  <a href={CONTACT_HREF} onClick={goFromMenu(CONTACT_HREF)}>
                    Connect with us
                    <IconArrowRight className="size-4" />
                  </a>
                </Button>
                <Button variant="outline" onClick={theme.toggle} className="h-12 w-full rounded-full text-base">
                  <ThemeIcon className="size-4" />
                  {theme.isDark ? "Light mode" : "Dark mode"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
