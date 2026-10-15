import { useState } from "react";

import { KIOSK_STAGES } from "@/models/selfswift-content";

export const STAGE_DURATION_MS = 5000;

/**
 * Auto-advance is driven by the view's stage progress animation (`advance` on animation end),
 * so pausing freezes the bar and the timer together and reduced motion never auto-rotates.
 * `cycle` changes on every stage entry so the view can restart that animation.
 */
export function useKioskJourneyViewModel() {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (next: number) => {
    setIndex((next + KIOSK_STAGES.length) % KIOSK_STAGES.length);
    setCycle((value) => value + 1);
  };

  return {
    stages: KIOSK_STAGES,
    index,
    stage: KIOSK_STAGES[index],
    cycle,
    paused,
    select: go,
    advance: () => go(index + 1),
    previous: () => go(index - 1),
    togglePaused: () => setPaused((value) => !value),
    restart: () => {
      go(0);
      setPaused(false);
    },
  };
}
