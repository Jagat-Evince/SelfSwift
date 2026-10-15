import { useEffect, useRef } from "react";

/**
 * Writes `--scroll-progress` (0 when the element's top enters the viewport bottom, 1 when its
 * bottom leaves the viewport top) onto the element, so CSS can drive scroll-linked motion
 * without React re-rendering on every scroll frame. Reduced motion pins it at 0.5.
 */
export function useScrollProgressViewModel<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--scroll-progress", "0.5");
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = (viewport - rect.top) / (viewport + rect.height);
      el.style.setProperty("--scroll-progress", Math.min(1, Math.max(0, progress)).toFixed(4));
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
  }, []);

  return ref;
}
