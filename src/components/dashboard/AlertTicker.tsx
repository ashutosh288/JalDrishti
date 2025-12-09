import { motion } from "framer-motion";
import { AlertTriangle, Radio } from "lucide-react";

const alerts = [
  { id: 1, message: "CRITICAL: Brahmaputra water level exceeded danger mark at Guwahati", severity: "critical" },
  { id: 2, message: "WARNING: Heavy rainfall predicted in Krishna basin for next 24 hours", severity: "warning" },
  { id: 3, message: "INFO: Yamuna water quality monitoring resumed after maintenance", severity: "info" },
  { id: 4, message: "ALERT: Drone verification completed for Godavari Site #42", severity: "info" },
];

export function AlertTicker() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-xl border border-secondary/20 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-destructive/10 border-b border-destructive/30">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Radio className="w-4 h-4 text-destructive" />
        </motion.div>
        <span className="text-xs font-semibold text-destructive uppercase tracking-wider">
          Live Alert Feed
        </span>
      </div>

      {/* Ticker */}
      <div className="relative h-10 overflow-hidden">
        <motion.div
          className="absolute whitespace-nowrap flex items-center h-full"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...alerts, ...alerts].map((alert, index) => (
            <div key={index} className="flex items-center gap-2 mx-8">
              <AlertTriangle
                className={`w-4 h-4 ${
                  alert.severity === "critical"
                    ? "text-destructive"
                    : alert.severity === "warning"
                    ? "text-warning"
                    : "text-secondary"
                }`}
              />
              <span className="text-sm text-foreground">{alert.message}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
