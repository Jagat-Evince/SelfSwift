import { useEffect, useState } from "react";

export function useScrolledViewModel(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = (event: Event) => {
      const target = event.target;
      const top = target instanceof HTMLElement ? target.scrollTop : window.scrollY;
      setScrolled(top > threshold);
    };
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, [threshold]);

  return scrolled;
}
