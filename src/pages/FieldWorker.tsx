import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  MapPin,
  CloudOff,
  Upload,
  Shield,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Wifi,
  WifiOff,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAppData } from "@/contexts/DataContext";
import { FloodProbabilityCard } from "@/components/dashboard/FloodProbabilityCard";
import { GPSStatusIndicator } from "@/components/dashboard/GPSStatusIndicator";

const offlineQueue = [
  { id: 1, siteId: "YAM-DEL-001", time: "10:30 AM", status: "pending" },
  { id: 2, siteId: "GNG-PAT-003", time: "09:15 AM", status: "pending" },
];

export default function FieldWorker() {
  const navigate = useNavigate();
  const { isOnline } = useAppData();
  const [gpsAccuracy, setGpsAccuracy] = useState(12);
  const [captureEnabled, setCaptureEnabled] = useState(gpsAccuracy < 15);

  const handleRoleChange = (value: string) => {
    if (value === "central") navigate("/admin");
    else if (value === "supervisor") navigate("/supervisor");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header with GPS Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Field Worker <span className="text-accent text-glow-lime">Mobile</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Capture and submit water level readings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <GPSStatusIndicator accuracy={gpsAccuracy} isInsideGeofence={gpsAccuracy < 15} />
            <Select defaultValue="field" onValueChange={handleRoleChange}>
              <SelectTrigger className="w-40 bg-card/50 border-secondary/20">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="central">Central Admin</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="field">Field Worker</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Connection Status Banner */}
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-3 bg-warning/20 border border-warning/30 rounded-lg"
          >
            <WifiOff className="w-5 h-5 text-warning" />
            <p className="text-sm text-warning">
              You're offline. Readings will be saved and synced when connection returns.
            </p>
          </motion.div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Capture Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-xl border border-secondary/20 p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-secondary" />
              <h3 className="font-display text-sm font-semibold text-foreground">
                Capture Reading
              </h3>
            </div>

            {/* Camera Preview Placeholder */}
            <div className="aspect-video bg-primary/50 rounded-lg border-2 border-dashed border-secondary/30 flex items-center justify-center mb-4">
              <div className="text-center">
                <Camera className="w-12 h-12 text-secondary/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Camera Preview</p>
                <p className="text-xs text-muted-foreground">AR Overlay Ready</p>
              </div>
            </div>

            {/* GPS Accuracy Warning */}
            {gpsAccuracy >= 15 && (
              <div className="flex items-center gap-2 p-3 bg-warning/20 border border-warning/30 rounded-lg mb-4">
                <MapPin className="w-4 h-4 text-warning" />
                <p className="text-xs text-warning">
                  GPS accuracy too low ({gpsAccuracy}m). Move to open sky for better signal.
                </p>
              </div>
            )}

            {/* Capture Button */}
            <Button
              className={cn(
                "w-full h-12 text-lg font-semibold",
                captureEnabled
                  ? "bg-accent hover:bg-accent/90 text-primary"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              disabled={!captureEnabled}
            >
              <Camera className="w-5 h-5 mr-2" />
              {captureEnabled ? "Capture Reading" : "Waiting for GPS..."}
            </Button>

            {/* AR Gauge Button */}
            <Button
              variant="outline"
              className="w-full mt-3 border-secondary/30"
            >
              <Droplets className="w-4 h-4 mr-2 text-secondary" />
              Activate AR Gauge Overlay
            </Button>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Flood Probability Card */}
            <FloodProbabilityCard probability={42} trend="rising" rainfallIntensity="moderate" />

            {/* AI Fraud Detection Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  AI Fraud Detection
                </h3>
              </div>
              <div className="flex items-center justify-between p-3 bg-success/10 border border-success/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-foreground">Status: Passed</span>
                </div>
                <span className="text-xs text-muted-foreground">Last scan: Just now</span>
              </div>
            </motion.div>

            {/* Blockchain Hash Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-xl border border-accent/20 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-accent" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Blockchain Hash
                </h3>
              </div>
              <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-xs font-mono text-accent break-all">
                  0x7f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3e2d1c
                </p>
                <p className="text-xs text-muted-foreground mt-2">Immutable proof generated</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Offline Queue */}
        {offlineQueue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl border border-warning/30 p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <CloudOff className="w-5 h-5 text-warning" />
              <h3 className="font-display text-sm font-semibold text-foreground">
                Offline Queue ({offlineQueue.length} pending)
              </h3>
            </div>
            <div className="space-y-2">
              {offlineQueue.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-card/50 border border-border/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
                      <Upload className="w-4 h-4 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.siteId}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-warning/20 text-warning rounded-full">
                    Pending Sync
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
