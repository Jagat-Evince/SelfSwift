import { useEffect, useState } from "react";

// A section becomes active once its top passes this fraction of the viewport height.
const ACTIVATION_LINE = 0.35;

/**
 * Scroll-spy: returns the id of the section the reader is in, or null above the first one.
 * Sections may appear in the page in a different order than `ids`, so the active one is the
 * section whose top is lowest while still above the activation line.
 */
export function useActiveSectionViewModel(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVATION_LINE;
      let best: { id: string; top: number } | null = null;
      for (const id of key.split("|")) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= line && bottom > 0 && (!best || top > best.top)) best = { id, top };
      }
      setActive(best?.id ?? null);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    // The page scrolls inside the app's <main>, not the window, so listen in the capture phase.
    window.addEventListener("scroll", schedule, { capture: true, passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key]);

  return active;
}
