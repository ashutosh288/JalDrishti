import { motion } from "framer-motion";
import { Shield, Brain, Link2, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustMeterProps {
  aiConfidence: number;
  blockchainValid: boolean;
  droneVerified: boolean;
}

export function TrustMeter({ aiConfidence, blockchainValid, droneVerified }: TrustMeterProps) {
  // Calculate overall trust score
  const baseScore = aiConfidence;
  const blockchainBonus = blockchainValid ? 20 : 0;
  const droneBonus = droneVerified ? 15 : 0;
  const totalScore = Math.min(100, Math.round((baseScore * 0.65) + blockchainBonus + droneBonus));

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-accent";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-xl border border-secondary/20 p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-secondary" />
        <h3 className="font-display text-sm font-semibold text-foreground">
          Trust Meter
        </h3>
      </div>

      {/* Circular Score */}
      <div className="flex items-center justify-center my-4">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="48"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            <motion.circle
              cx="56"
              cy="56"
              r="48"
              stroke="url(#trustGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 302" }}
              animate={{ strokeDasharray: `${(totalScore / 100) * 302} 302` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E0FF" />
                <stop offset="100%" stopColor="#B8F94B" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-2xl font-display font-bold", getScoreColor(totalScore))}>
              {totalScore}%
            </span>
            <span className="text-xs text-muted-foreground">Trust</span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground">AI Confidence</span>
          </div>
          <span className={cn("text-sm font-semibold", getScoreColor(aiConfidence))}>
            {aiConfidence}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground">Blockchain</span>
          </div>
          <span className={cn("text-sm font-semibold", blockchainValid ? "text-success" : "text-destructive")}>
            {blockchainValid ? "Verified" : "Pending"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground">Drone Check</span>
          </div>
          <span className={cn("text-sm font-semibold", droneVerified ? "text-success" : "text-muted-foreground")}>
            {droneVerified ? "Confirmed" : "N/A"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
