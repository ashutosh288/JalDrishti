import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "cyan" | "lime" | "warning" | "danger";
}

const variantStyles = {
  default: "border-secondary/20",
  cyan: "border-secondary/40 bg-secondary/5",
  lime: "border-accent/40 bg-accent/5",
  warning: "border-warning/40 bg-warning/5",
  danger: "border-destructive/40 bg-destructive/5",
};

const iconVariantStyles = {
  default: "bg-secondary/20 text-secondary",
  cyan: "bg-secondary/30 text-secondary",
  lime: "bg-accent/30 text-accent",
  warning: "bg-warning/30 text-warning",
  danger: "bg-destructive/30 text-destructive",
};

export function StatsCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  variant = "default",
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card p-5 rounded-xl border",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-2xl font-display font-bold text-foreground">
            {value}
          </p>
          
          {trend && trendValue && (
            <div className="flex items-center gap-1 mt-2">
              {trend === "up" && (
                <TrendingUp className="w-3 h-3 text-success" />
              )}
              {trend === "down" && (
                <TrendingDown className="w-3 h-3 text-destructive" />
              )}
              {trend === "neutral" && (
                <Minus className="w-3 h-3 text-muted-foreground" />
              )}
              <span
                className={cn(
                  "text-xs",
                  trend === "up" && "text-success",
                  trend === "down" && "text-destructive",
                  trend === "neutral" && "text-muted-foreground"
                )}
              >
                {trendValue}
              </span>
            </div>
          )}
        </div>

        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconVariantStyles[variant]
          )}
        >
          {icon}
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] animate-shimmer opacity-30" />
      </div>
    </motion.div>
  );
}
