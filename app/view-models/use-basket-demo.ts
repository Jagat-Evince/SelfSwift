import { useEffect, useMemo, useState } from "react";

import { BASKET_STAGES, DEMO_BASKET_ITEMS, DEMO_CURRENCY } from "@/models/selfswift-content";

const AUTOPLAY_MS = 2600;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: DEMO_CURRENCY,
});

export function useBasketDemoViewModel() {
  const [stageIndex, setStageIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setStageIndex((index) => (index + 1) % BASKET_STAGES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  const items = DEMO_BASKET_ITEMS.map((item) => ({
    ...item,
    unitPriceLabel: currencyFormatter.format(item.unitPrice),
  }));

  const total = useMemo(
    () => DEMO_BASKET_ITEMS.reduce((sum, item) => sum + item.unitPrice, 0),
    [],
  );

  const isComplete = stageIndex === BASKET_STAGES.length - 1;

  return {
    items,
    itemCount: items.length,
    totalLabel: currencyFormatter.format(total),
    stages: BASKET_STAGES,
    stageIndex,
    isComplete,
    advance: () => {
      setPaused(true);
      setStageIndex((index) => (index + 1) % BASKET_STAGES.length);
    },
  };
}
