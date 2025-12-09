import { motion } from "framer-motion";
import { Sun, Moon, Zap } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: "light" as const, icon: Sun, label: "Light" },
    { id: "dark" as const, icon: Moon, label: "Dark" },
    { id: "boost" as const, icon: Zap, label: "Boost" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-card/50 border border-border/50">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={cn(
            "relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors",
            theme === t.id
              ? "text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {theme === t.id && (
            <motion.div
              layoutId="theme-indicator"
              className={cn(
                "absolute inset-0 rounded-md",
                t.id === "boost" ? "bg-accent" : "bg-secondary"
              )}
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <t.icon className="relative w-3.5 h-3.5" />
          <span className="relative hidden sm:inline">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
