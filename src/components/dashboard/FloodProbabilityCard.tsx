import { motion } from "framer-motion";
import { Droplets, TrendingUp, CloudRain } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloodProbabilityCardProps {
  probability: number;
  trend: "rising" | "stable" | "falling";
  rainfallIntensity: "low" | "moderate" | "high" | "severe";
}

const getRiskLevel = (prob: number) => {
  if (prob < 25) return { level: "Low", color: "text-success", bg: "bg-success/20" };
  if (prob < 50) return { level: "Moderate", color: "text-warning", bg: "bg-warning/20" };
  if (prob < 75) return { level: "High", color: "text-orange-500", bg: "bg-orange-500/20" };
  return { level: "Severe", color: "text-destructive", bg: "bg-destructive/20" };
};

export function FloodProbabilityCard({
  probability,
  trend,
  rainfallIntensity,
}: FloodProbabilityCardProps) {
  const risk = getRiskLevel(probability);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "glass-card p-5 rounded-xl border",
        probability >= 75 ? "border-destructive/50 animate-border-glow" : "border-secondary/20"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", risk.bg)}>
            <Droplets className={cn("w-5 h-5", risk.color)} />
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground">
              Flood Probability
            </h3>
            <p className="text-xs text-muted-foreground">Real-time assessment</p>
          </div>
        </div>
        <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", risk.bg, risk.color)}>
          {risk.level}
        </span>
      </div>

      {/* Progress Ring */}
      <div className="flex items-center justify-center my-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 352" }}
              animate={{ strokeDasharray: `${(probability / 100) * 352} 352` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E0FF" />
                <stop offset="100%" stopColor={probability >= 75 ? "#ef4444" : "#B8F94B"} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-3xl font-display font-bold", risk.color)}>
              {probability}%
            </span>
            <span className="text-xs text-muted-foreground">Risk Score</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground">Water Trend</span>
          </div>
          <p className="text-sm font-semibold text-foreground capitalize">{trend}</p>
        </div>
        <div className="bg-card/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <CloudRain className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground">Rainfall</span>
          </div>
          <p className="text-sm font-semibold text-foreground capitalize">{rainfallIntensity}</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Based on water level trend + rainfall intensity
      </p>
    </motion.div>
  );
}
