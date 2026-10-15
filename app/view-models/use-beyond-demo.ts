import { useEffect, useRef, useState } from "react";

export type RackReadState = "idle" | "reading" | "ready";

const TAG_STAGGER_MS = 350;
const SETTLE_MS = 400;

/** Rack-count concept: tags light up one after another, then the selection is ready. */
export function useRackReadViewModel(tagCount: number) {
  const [state, setState] = useState<RackReadState>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const read = () => {
    window.clearTimeout(timer.current);
    setState("reading");
    timer.current = window.setTimeout(() => setState("ready"), tagCount * TAG_STAGGER_MS + SETTLE_MS);
  };

  return { state, read, tagStaggerMs: TAG_STAGGER_MS };
}

/** Door-alert concept: a paid purchase passes; an active tag raises the alert. */
export function useExitScenarioViewModel() {
  const [alert, setAlert] = useState(false);
  return { alert, toggle: () => setAlert((value) => !value) };
}
