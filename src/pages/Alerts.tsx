import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Radio,
  Plus,
  Send,
  Volume2,
  Filter,
  Calendar,
  MapPin,
  Waves,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCard } from "@/components/dashboard/AlertCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const alertHistory = [
  {
    id: "ALT-2847",
    title: "Critical Water Level",
    message: "Brahmaputra river has exceeded danger mark by 0.5m. Immediate attention required.",
    severity: "critical" as const,
    location: "Guwahati, Assam",
    time: "5 min ago",
  },
  {
    id: "ALT-2846",
    title: "Heavy Rainfall Warning",
    message: "IMD predicts heavy rainfall in Krishna basin. Pre-emptive measures advised.",
    severity: "warning" as const,
    location: "Vijayawada, AP",
    time: "23 min ago",
  },
  {
    id: "ALT-2845",
    title: "Drone Verification Complete",
    message: "Aerial verification completed for Godavari Site #42. All readings confirmed.",
    severity: "info" as const,
    location: "Nashik, MH",
    time: "1 hr ago",
  },
  {
    id: "ALT-2844",
    title: "Water Level Rising",
    message: "Ganga water level rising steadily. Currently 0.3m below warning level.",
    severity: "warning" as const,
    location: "Patna, Bihar",
    time: "2 hr ago",
  },
  {
    id: "ALT-2843",
    title: "System Maintenance Complete",
    message: "Sensor calibration completed for Yamuna monitoring station.",
    severity: "info" as const,
    location: "Delhi",
    time: "3 hr ago",
  },
];

export default function Alerts() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);
  const [severity, setSeverity] = useState("warning");

  const handleBroadcast = () => {
    setBroadcasting(true);
    setTimeout(() => {
      setBroadcasting(false);
      setShowCreateModal(false);
      toast({
        title: "Alert Broadcasted 📢",
        description: "Emergency alert sent to all affected regions",
      });
    }, 2000);
  };

  const handleTestAlert = () => {
    toast({
      title: "Test Alert Sent",
      description: "This is a test broadcast simulation",
    });
  };

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
              Emergency <span className="text-destructive">Broadcast Alerts</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Real-time alert management and broadcast system
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-secondary/30"
              onClick={handleTestAlert}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Test Alert
            </Button>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </div>
        </motion.div>

        {/* Active Broadcast Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-xl border border-destructive/50 p-4 relative overflow-hidden"
        >
          {/* Animated Waveform Background */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute inset-0"
              style={{
                background: "repeating-linear-gradient(90deg, transparent, transparent 20px, hsl(0 84% 60% / 0.3) 20px, hsl(0 84% 60% / 0.3) 22px)",
              }}
              animate={{ x: [0, 22] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center"
              >
                <Radio className="w-5 h-5 text-destructive" />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-foreground">Active Broadcast</p>
                <p className="text-xs text-muted-foreground">
                  2 critical alerts broadcasting to 15 sites
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Waves className="w-8 h-8 text-destructive/50" />
              <Button variant="outline" size="sm" className="border-destructive/50 text-destructive">
                View Details
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alert Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter by:</span>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32 bg-card/50 border-secondary/20">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="today">
                <SelectTrigger className="w-32 bg-card/50 border-secondary/20">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Alert List */}
            <div className="space-y-3">
              {alertHistory.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AlertCard {...alert} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual Flood Simulation */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                Visual Flood Simulation
              </h3>

              {/* Affected Sites */}
              <div className="space-y-3">
                {[
                  { name: "Brahmaputra - Guwahati", level: 85, status: "critical" },
                  { name: "Krishna - Vijayawada", level: 62, status: "warning" },
                  { name: "Ganga - Patna", level: 45, status: "normal" },
                ].map((site, index) => (
                  <div
                    key={site.name}
                    className={cn(
                      "relative rounded-lg p-3 overflow-hidden border",
                      site.status === "critical" && "border-destructive/50",
                      site.status === "warning" && "border-warning/50",
                      site.status === "normal" && "border-success/50"
                    )}
                  >
                    {/* Animated Water Rise */}
                    <motion.div
                      className={cn(
                        "absolute bottom-0 left-0 right-0",
                        site.status === "critical" && "bg-destructive/30",
                        site.status === "warning" && "bg-warning/30",
                        site.status === "normal" && "bg-success/30"
                      )}
                      initial={{ height: 0 }}
                      animate={{ height: `${site.level}%` }}
                      transition={{ duration: 2, delay: index * 0.3 }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground">{site.name}</p>
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            site.status === "critical" && "text-destructive",
                            site.status === "warning" && "text-warning",
                            site.status === "normal" && "text-success"
                          )}
                        >
                          {site.level}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground capitalize">{site.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Broadcast Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                Broadcast Statistics
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-display font-bold text-destructive">24</p>
                  <p className="text-xs text-muted-foreground">Active Alerts</p>
                </div>
                <div className="bg-card/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-display font-bold text-foreground">847</p>
                  <p className="text-xs text-muted-foreground">This Month</p>
                </div>
                <div className="bg-card/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-display font-bold text-success">98%</p>
                  <p className="text-xs text-muted-foreground">Response Rate</p>
                </div>
                <div className="bg-card/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-display font-bold text-secondary">4.2m</p>
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Create Alert Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card rounded-xl border border-secondary/30 p-6 w-full max-w-md m-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                  Create New Alert
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Severity Level
                    </label>
                    <Select value={severity} onValueChange={setSeverity}>
                      <SelectTrigger className="bg-card/50 border-secondary/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">🔴 Critical</SelectItem>
                        <SelectItem value="warning">🟠 Warning</SelectItem>
                        <SelectItem value="info">🔵 Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Affected Sites
                    </label>
                    <Input
                      placeholder="Select sites..."
                      className="bg-card/50 border-secondary/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Alert Message
                    </label>
                    <textarea
                      className="w-full h-24 rounded-lg bg-card/50 border border-secondary/20 p-3 text-sm text-foreground resize-none focus:outline-none focus:border-secondary/50"
                      placeholder="Enter alert message..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-secondary/30"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleBroadcast}
                      disabled={broadcasting}
                      className="flex-1 bg-destructive hover:bg-destructive/90"
                    >
                      {broadcasting ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          <Radio className="w-4 h-4" />
                        </motion.div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Broadcast
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
