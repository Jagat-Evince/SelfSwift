import { appPath } from "@agent-native/core/client/api-path";

import { useScrollProgressViewModel } from "@/view-models/use-scroll-progress";

import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { SectionShell } from "./section-shell";

const PHOTOS: { src: string; alt: string; caption: string; credit: string }[] =
  [
    {
      src: appPath("/images/store/store-organization.jpg"),
      alt: "A boutique with clothing on rope-hung rails under industrial pendant lights",
      caption: "The boutique floor",
      credit: "Photo by Clark Street Mercantile, CC0, via Wikimedia Commons",
    },
    {
      src: appPath("/images/store/browsing-shirts.jpg"),
      alt: "A shopper browsing shirts on a crowded clothing rack beside mannequins",
      caption: "Choosing from the rack",
      credit: "Photo by PattayaPatrol, CC BY-SA 4.0, via Wikimedia Commons",
    },
    {
      src: appPath("/images/store/fitting-room-theory.jpg"),
      alt: "A bright fitting room with tall mirrors, curtains and a rail of clothing",
      caption: "Trying it on",
      credit: "Photo by WestportWiki, CC BY-SA 3.0, via Wikimedia Commons",
    },
    {
      src: appPath("/images/store/mall-shopping.jpg"),
      alt: "A shopper with bags riding an escalator in a shopping mall",
      caption: "Between stores",
      credit: "Photo by freestocks.org, CC0, via Wikimedia Commons",
    },
    {
      src: appPath("/images/store/forever21-sm-aura.jpg"),
      alt: "A Forever 21 store inside the SM Aura Premier mall in Bonifacio Global City, Manila",
      caption: "Clothing store interior",
      credit: "Photo by Hans Olav Lien, CC BY-SA 3.0, via Wikimedia Commons",
    },
  ];

const COLUMN_COUNT = 5;
const CARDS_PER_COLUMN = 4;
// Columns past the first two only appear once there is room for them.
const COLUMN_VISIBILITY = [
  "flex",
  "flex",
  "hidden sm:flex",
  "hidden lg:flex",
  "hidden xl:flex",
];
const ASPECTS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[3/5]",
  "aspect-[4/3]",
];
// How far each column travels across the whole scroll of the section.
const TRAVEL = "clamp(160px, 22vw, 300px)";

interface GalleryCard {
  key: string;
  photo: (typeof PHOTOS)[number];
  photoIndex: number;
  aspect: string;
  // Photos repeat across columns; only the first copy is announced to assistive tech.
  decorative: boolean;
}

function buildColumns(): GalleryCard[][] {
  const announced = new Set<number>();
  return Array.from({ length: COLUMN_COUNT }, (_, column) =>
    Array.from({ length: CARDS_PER_COLUMN }, (_, row) => {
      const photoIndex = (column * 2 + row) % PHOTOS.length;
      const decorative = announced.has(photoIndex);
      announced.add(photoIndex);
      return {
        key: `${column}-${row}`,
        photo: PHOTOS[photoIndex],
        photoIndex,
        aspect: ASPECTS[(column + row * 2) % ASPECTS.length],
        decorative,
      };
    }),
  );
}

const COLUMNS = buildColumns();

function columnTransform(column: number) {
  // Odd columns (1st, 3rd, 5th) rise as the section scrolls; even columns sink from above.
  const offset =
    column % 2 === 0
      ? "var(--scroll-progress, 0.5) * -1"
      : "(var(--scroll-progress, 0.5) - 1)";
  return { transform: `translate3d(0, calc(${offset} * ${TRAVEL}), 0)` };
}

function licenseOf(credit: string) {
  return credit.match(/CC[^,]*/)?.[0] ?? "Photo";
}

function GalleryPhotoCard({ card }: { card: GalleryCard }) {
  const { photo, photoIndex, aspect, decorative } = card;
  return (
    <figure
      aria-hidden={decorative || undefined}
      className="group rounded-2xl border border-border/70 bg-card p-1.5 shadow-[0_18px_40px_-24px_hsl(var(--foreground)/0.45)] transition-colors duration-300 hover:border-primary/40"
    >
      <div className={`relative overflow-hidden rounded-xl bg-muted ${aspect}`}>
        <img
          src={photo.src}
          alt={decorative ? "" : photo.alt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[0.625rem] text-white/90 backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-primary" />
          {String(photoIndex + 1).padStart(2, "0")}/
          {String(PHOTOS.length).padStart(2, "0")}
        </span>
        <span className="absolute right-2.5 top-2.5 rounded-full bg-black/55 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-wider text-white/80 backdrop-blur-md">
          {licenseOf(photo.credit)}
        </span>
      </div>
      <figcaption className="flex items-start gap-2.5 px-1.5 pb-1 pt-2.5">
        <span
          aria-hidden
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-xs font-semibold text-primary ring-1 ring-inset ring-primary/25"
        >
          {photo.caption.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium leading-tight">
            {photo.caption}
          </span>
          <span className="mt-0.5 block text-[0.625rem] leading-snug text-muted-foreground">
            {photo.credit}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function PhotoStrip() {
  const galleryRef = useScrollProgressViewModel<HTMLDivElement>();

  return (
    <SectionShell
      id="gallery"
      tone="ink"
      fullWidth={<Gallery galleryRef={galleryRef} />}
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
        <SectionHeading kicker="On the store floor">
          Tags, kiosks and{" "}
          <span className="italic text-primary">the people who use them.</span>
        </SectionHeading>
        <Reveal delay={100}>
          <p className="max-w-xl text-pretty text-lg leading-8 text-foreground/70 lg:border-l lg:border-border/70 lg:pl-8">
            From the rack to the fitting room to the moment a shopper walks out.
            These are the places SelfSwift is built for.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function Gallery({
  galleryRef,
}: {
  galleryRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <Reveal>
      <div
        ref={galleryRef}
        className="relative h-[38rem] overflow-hidden px-3 [mask-image:linear-gradient(180deg,transparent,black_12%,black_88%,transparent)] sm:h-[46rem] sm:px-4 lg:h-[52rem]"
      >
        <div className="flex gap-3 sm:gap-4">
          {COLUMNS.map((cards, column) => (
            <div
              key={column}
              style={columnTransform(column)}
              className={`${COLUMN_VISIBILITY[column]} min-w-0 flex-1 flex-col gap-3 will-change-transform sm:gap-4`}
            >
              {cards.map((card) => (
                <GalleryPhotoCard key={card.key} card={card} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
