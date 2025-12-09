import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function DangerZoneToggle() {
  const { isDangerZone, setDangerZone } = useTheme();

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors",
        isDangerZone
          ? "bg-destructive/20 border-destructive/50"
          : "bg-card/50 border-border/50"
      )}
    >
      <AlertTriangle
        className={cn(
          "w-3.5 h-3.5",
          isDangerZone ? "text-destructive" : "text-muted-foreground"
        )}
      />
      <span
        className={cn(
          "text-xs font-medium",
          isDangerZone ? "text-destructive" : "text-muted-foreground"
        )}
      >
        Danger Zone
      </span>
      <Switch
        checked={isDangerZone}
        onCheckedChange={setDangerZone}
        className="scale-75"
      />
      {isDangerZone && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-destructive"
        />
      )}
    </div>
  );
}
