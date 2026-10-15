import { SiteFooter } from "@/views/site-footer";
import { SiteHeader } from "@/views/site-header";
import { GlanceSection } from "@/views/glance-section";
import { HeroSection } from "@/views/hero-section";
import { HeroSectionClassic } from "@/views/hero-section-classic";
import { ContactSections, PilotSection } from "@/views/pilot-sections";
import { ProductSections } from "@/views/product-sections";
import { VisionSections } from "@/views/vision-sections";

// Switch the banner: "spotlight" = new full-screen dark hero, "classic" = previous split-layout hero.
const HERO_VARIANT: "spotlight" | "classic" = "spotlight";

export function meta() {
  return [
    { title: "SelfSwift - Intelligent Checkout for Fashion Retail" },
    {
      name: "description",
      content:
        "Explore SelfSwift: RFID-ready self-checkout for clothing and footwear, connected retail workflows, and a focused product vision for global fashion retail.",
    },
  ];
}

export default function HomeRoute() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <SiteHeader overDark={HERO_VARIANT === "spotlight"} />
      <main>
        {HERO_VARIANT === "spotlight" ? (
          <HeroSection />
        ) : (
          <HeroSectionClassic />
        )}
        <GlanceSection />
        <ProductSections />
        <PilotSection />
        <VisionSections />
        <ContactSections />
      </main>
      <SiteFooter />
    </div>
  );
}
