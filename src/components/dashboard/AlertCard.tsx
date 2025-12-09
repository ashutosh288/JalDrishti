import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, Info, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info";
  location: string;
  time: string;
}

const severityConfig = {
  critical: {
    icon: AlertCircle,
    bgClass: "bg-destructive/10 border-destructive/50",
    iconClass: "text-destructive",
    pulseClass: "bg-destructive",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-warning/10 border-warning/50",
    iconClass: "text-warning",
    pulseClass: "bg-warning",
  },
  info: {
    icon: Info,
    bgClass: "bg-secondary/10 border-secondary/50",
    iconClass: "text-secondary",
    pulseClass: "bg-secondary",
  },
};

export function AlertCard({ id, title, message, severity, location, time }: AlertCardProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "relative p-4 rounded-xl border backdrop-blur-sm",
        config.bgClass,
        severity === "critical" && "animate-border-glow"
      )}
    >
      {/* Pulse indicator for critical */}
      {severity === "critical" && (
        <div className="absolute top-3 right-3">
          <span className="relative flex h-3 w-3">
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", config.pulseClass)} />
            <span className={cn("relative inline-flex rounded-full h-3 w-3", config.pulseClass)} />
          </span>
        </div>
      )}

      <div className="flex gap-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", config.bgClass)}>
          <Icon className={cn("w-5 h-5", config.iconClass)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm text-foreground truncate">{title}</h4>
            <span className="text-xs text-muted-foreground font-mono">#{id}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{message}</p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
