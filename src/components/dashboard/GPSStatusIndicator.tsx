import { motion } from "framer-motion";
import { MapPin, Signal, Shield, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GPSStatusIndicatorProps {
  isInsideGeofence: boolean;
  accuracy: number;
  coordinates?: { lat: number; lng: number };
}

export function GPSStatusIndicator({
  isInsideGeofence,
  accuracy,
  coordinates,
}: GPSStatusIndicatorProps) {
  const isAccuracyGood = accuracy < 15;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-card rounded-xl p-4 border",
        isInsideGeofence ? "border-success/50" : "border-destructive/50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Status Icon */}
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              isInsideGeofence ? "bg-success/20" : "bg-destructive/20"
            )}
          >
            {isInsideGeofence ? (
              <Shield className={cn("w-5 h-5", isInsideGeofence ? "text-success" : "text-destructive")} />
            ) : (
              <AlertTriangle className="w-5 h-5 text-destructive" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-sm font-semibold",
                  isInsideGeofence ? "text-success" : "text-destructive"
                )}
              >
                {isInsideGeofence ? "Inside Geofence Zone" : "Outside Zone – Reading Not Allowed"}
              </span>
              {isInsideGeofence && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-success"
                />
              )}
            </div>
            {coordinates && (
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {coordinates.lat.toFixed(4)}°N, {coordinates.lng.toFixed(4)}°E
              </p>
            )}
          </div>
        </div>

        {/* Accuracy Indicator */}
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <Signal className={cn("w-4 h-4", isAccuracyGood ? "text-success" : "text-warning")} />
            <span className="text-xs text-muted-foreground">GPS Accuracy</span>
          </div>
          <p className={cn("text-sm font-semibold", isAccuracyGood ? "text-success" : "text-warning")}>
            ±{accuracy}m
          </p>
          {!isAccuracyGood && (
            <p className="text-xs text-warning mt-1">Move to open sky</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
