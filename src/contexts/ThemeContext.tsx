import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light" | "boost";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDangerZone: boolean;
  setDangerZone: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("jaldrishti-theme");
    return (saved as Theme) || "dark";
  });
  
  const [isDangerZone, setDangerZone] = useState(() => {
    return localStorage.getItem("jaldrishti-danger-zone") === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "boost");
    root.classList.add(theme);
    localStorage.setItem("jaldrishti-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("jaldrishti-danger-zone", isDangerZone.toString());
    document.documentElement.classList.toggle("danger-zone", isDangerZone);
  }, [isDangerZone]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDangerZone, setDangerZone }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
