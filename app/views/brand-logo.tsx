export function BrandLogo() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" aria-hidden className="size-8 shrink-0 transition-transform duration-300 group-hover:-rotate-6">
        <defs>
          <linearGradient id="selfswift-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(var(--primary))" />
            <stop offset="1" stopColor="hsl(var(--primary) / 0.7)" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#selfswift-mark)" />
        {/* Price tag with a check: one tag, checkout done. */}
        <g transform="rotate(-25 16 16)">
          <path
            d="M7.5 16 12.8 10.5H23a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H12.8Z"
            fill="hsl(var(--primary-foreground))"
          />
          <circle cx="11.6" cy="16" r="1.3" fill="hsl(var(--primary))" />
          <path
            d="m15.6 16.1 2 2 3.8-4"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight">
        Self<span className="text-primary">Swift</span>
      </span>
    </span>
  );
}
