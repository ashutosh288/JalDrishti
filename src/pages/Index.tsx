import { motion } from "framer-motion";
import { MapPin, Users, AlertTriangle, FileCheck } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { IndiaMap } from "@/components/dashboard/IndiaMap";
import { WaterLevelChart } from "@/components/dashboard/WaterLevelChart";
import { AlertTicker } from "@/components/dashboard/AlertTicker";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { FloodProbabilityCard } from "@/components/dashboard/FloodProbabilityCard";
import { TrustMeter } from "@/components/dashboard/TrustMeter";
import { useAppData } from "@/contexts/DataContext";

export default function Index() {
  const { data } = useAppData();

  return (
    <MainLayout>
      <div className="space-y-4">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-xl font-bold text-foreground mb-0.5">
              Welcome to <span className="text-secondary text-glow-cyan">JalDrishti</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Smart Water Level Monitoring • Last updated: Just now
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/30">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-success"
            />
            <span className="text-xs text-success font-medium">All Systems Operational</span>
          </div>
        </motion.div>

        <AlertTicker />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatsCard
            title="Active Sites"
            value={data?.stats.activeSites.toString() || "247"}
            icon={<MapPin className="w-4 h-4" />}
            trend="up"
            trendValue="+12 this month"
            variant="cyan"
          />
          <StatsCard
            title="Anomalies"
            value={data?.stats.anomaliesDetected.toString() || "8"}
            icon={<AlertTriangle className="w-4 h-4" />}
            trend="down"
            trendValue="-3 yesterday"
            variant="warning"
          />
          <StatsCard
            title="Verified"
            value={data?.stats.verifiedSubmissions.toLocaleString() || "1,847"}
            icon={<FileCheck className="w-4 h-4" />}
            trend="up"
            trendValue="+156 today"
            variant="lime"
          />
          <StatsCard
            title="Community"
            value={data?.stats.communityReports.toString() || "324"}
            icon={<Users className="w-4 h-4" />}
            trend="up"
            trendValue="+48 this week"
            variant="default"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <IndiaMap />
          </div>
          <div className="space-y-4">
            <FloodProbabilityCard
              probability={data?.floodProbability.percentage || 42}
              trend={(data?.floodProbability.trend as "rising" | "falling" | "stable") || "rising"}
              rainfallIntensity={(data?.floodProbability.rainfallIntensity as "low" | "moderate" | "high" | "severe") || "moderate"}
            />
            <TrustMeter
              aiConfidence={data?.trustMetrics.aiConfidence || 87}
              blockchainValid={data?.trustMetrics.blockchainValid ?? true}
              droneVerified={data?.trustMetrics.droneVerified ?? false}
            />
          </div>
        </div>

        {/* Charts and Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WaterLevelChart />
          <div className="glass-card rounded-xl border border-border/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Recent Alerts
                </h3>
              </div>
              <span className="text-xs text-muted-foreground cursor-pointer hover:text-secondary">View all →</span>
            </div>
            <div className="space-y-2">
              {(data?.recentAlerts || []).map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AlertCard {...alert} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
