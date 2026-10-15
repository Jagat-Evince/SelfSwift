import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(mode);
  root.setAttribute("data-theme", mode);
  root.style.colorScheme = mode;
}

export function useThemeViewModel() {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    setMode(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    const next: ThemeMode = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    setMode(next);
  }, []);

  return { mode, isDark: mode === "dark", toggle };
}
