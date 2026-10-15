import { useState } from "react";

import { FUTURE } from "@/models/selfswift-content";

/** Future-expansion explorer: one tab per area, one highlighted step within the tab. */
export function useFutureExplorerViewModel() {
  const [tabIndex, setTabIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  return {
    tabs: FUTURE.tabs,
    tabIndex,
    tab: FUTURE.tabs[tabIndex],
    stepIndex,
    selectTab: (index: number) => {
      setTabIndex(index);
      setStepIndex(0);
    },
    selectStep: setStepIndex,
  };
}
