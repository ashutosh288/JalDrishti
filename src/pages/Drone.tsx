import { motion } from "framer-motion";
import {
  Plane,
  MapPin,
  Camera,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play,
  Video,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const droneFleet = [
  { id: "DRN-001", status: "in-flight", site: "Brahmaputra - Guwahati", battery: 78, eta: "12 min" },
  { id: "DRN-002", status: "completed", site: "Ganga - Varanasi", battery: 45, eta: "-" },
  { id: "DRN-003", status: "pending", site: "Krishna - Vijayawada", battery: 100, eta: "Queue: 2" },
  { id: "DRN-004", status: "in-flight", site: "Godavari - Nashik", battery: 62, eta: "8 min" },
];

const recentVerifications = [
  { id: 1, site: "Yamuna - Delhi", time: "2 hrs ago", match: 98, status: "verified" },
  { id: 2, site: "Ganga - Patna", time: "4 hrs ago", match: 94, status: "verified" },
  { id: 3, site: "Brahmaputra - Dibrugarh", time: "6 hrs ago", match: 76, status: "mismatch" },
];

export default function Drone() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Drone <span className="text-secondary text-glow-cyan">Verification System</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              AI-powered aerial verification for remote site monitoring
            </p>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90">
            <Plane className="w-4 h-4 mr-2" />
            Request Drone
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Active Drones", value: "4", icon: Plane, color: "secondary" },
            { label: "In-Flight", value: "2", icon: Play, color: "accent" },
            { label: "Completed Today", value: "47", icon: CheckCircle, color: "success" },
            { label: "Pending Queue", value: "8", icon: Clock, color: "warning" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl border border-secondary/20 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", `bg-${stat.color}/20`)}>
                  <stat.icon className={cn("w-5 h-5", `text-${stat.color}`)} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Drone Fleet Status */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Fleet Status
                </h3>
                <span className="text-xs text-muted-foreground">Live updates</span>
              </div>

              <div className="space-y-3">
                {droneFleet.map((drone, index) => (
                  <motion.div
                    key={drone.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border",
                      drone.status === "in-flight" && "bg-accent/5 border-accent/30",
                      drone.status === "completed" && "bg-success/5 border-success/30",
                      drone.status === "pending" && "bg-card/50 border-secondary/20"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          drone.status === "in-flight" && "bg-accent/20",
                          drone.status === "completed" && "bg-success/20",
                          drone.status === "pending" && "bg-secondary/20"
                        )}
                      >
                        <Plane
                          className={cn(
                            "w-6 h-6",
                            drone.status === "in-flight" && "text-accent animate-pulse",
                            drone.status === "completed" && "text-success",
                            drone.status === "pending" && "text-secondary"
                          )}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{drone.id}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{drone.site}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Battery */}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Battery</p>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              drone.battery > 50 ? "bg-success" : drone.battery > 20 ? "bg-warning" : "bg-destructive"
                            )}
                            style={{ width: `${drone.battery}%` }}
                          />
                        </div>
                        <p className="text-xs text-foreground mt-1">{drone.battery}%</p>
                      </div>

                      {/* ETA */}
                      <div className="text-center min-w-[60px]">
                        <p className="text-xs text-muted-foreground mb-1">ETA</p>
                        <p className="text-sm font-semibold text-foreground">{drone.eta}</p>
                      </div>

                      {/* Status */}
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold capitalize",
                          drone.status === "in-flight" && "bg-accent/20 text-accent",
                          drone.status === "completed" && "bg-success/20 text-success",
                          drone.status === "pending" && "bg-warning/20 text-warning"
                        )}
                      >
                        {drone.status.replace("-", " ")}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Live Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-secondary" />
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    Live Drone Feed
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-destructive"
                  />
                  <span className="text-xs text-destructive">LIVE</span>
                </div>
              </div>

              <div className="aspect-video bg-primary/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Simulated feed */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
                <div className="text-center relative z-10">
                  <Camera className="w-12 h-12 text-secondary/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">DRN-001 - Brahmaputra Site</p>
                </div>

                {/* Overlay Info */}
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded px-3 py-2">
                  <p className="text-xs text-foreground font-mono">ALT: 120m | SPD: 12m/s</p>
                </div>
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded px-3 py-2">
                  <p className="text-xs text-foreground font-mono">26.1445°N, 91.7362°E</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Verifications */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                Recent Verifications
              </h3>

              <div className="space-y-3">
                {recentVerifications.map((verification, index) => (
                  <motion.div
                    key={verification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "p-3 rounded-lg border",
                      verification.status === "verified" ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">{verification.site}</p>
                      {verification.status === "verified" ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{verification.time}</span>
                      <span
                        className={cn(
                          "text-xs font-semibold",
                          verification.match >= 90 ? "text-success" : "text-warning"
                        )}
                      >
                        {verification.match}% match
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Drone Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                This Month
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Missions Completed</span>
                    <span className="text-foreground font-semibold">847</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Verification Accuracy</span>
                    <span className="text-foreground font-semibold">96.4%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Anomalies Detected</span>
                    <span className="text-foreground font-semibold">23</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-warning rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
