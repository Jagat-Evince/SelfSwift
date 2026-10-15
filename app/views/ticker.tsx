import { IconSparkles } from "@tabler/icons-react";

import { TICKER_PHRASES } from "@/models/selfswift-content";

export function Ticker() {
  const loop = [...TICKER_PHRASES, ...TICKER_PHRASES];

  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-card/40 py-5 backdrop-blur [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {loop.map((phrase, index) => (
          <span
            key={`${phrase}-${index}`}
            className="flex items-center gap-10 font-display text-lg text-muted-foreground"
          >
            {phrase}
            <IconSparkles className="size-4 text-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}
