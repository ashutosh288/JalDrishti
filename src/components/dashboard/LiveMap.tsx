import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample monitoring sites
const monitoringSites = [
  { id: 1, name: "Yamuna - Delhi", lat: 28.6139, lng: 77.209, status: "normal" },
  { id: 2, name: "Ganga - Varanasi", lat: 25.3176, lng: 82.9739, status: "warning" },
  { id: 3, name: "Brahmaputra - Guwahati", lat: 26.1445, lng: 91.7362, status: "critical" },
  { id: 4, name: "Godavari - Nashik", lat: 19.9975, lng: 73.7898, status: "normal" },
  { id: 5, name: "Krishna - Vijayawada", lat: 16.5062, lng: 80.648, status: "warning" },
];

const statusColors = {
  normal: "#22c55e",
  warning: "#f59e0b",
  critical: "#ef4444",
};

export function LiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl border border-secondary/20 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary/20">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-secondary" />
          <h3 className="font-display text-sm font-semibold text-foreground">
            Live Monitoring Sites
          </h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Maximize2 className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="relative h-[400px] bg-primary/50">
        {/* India Map SVG Background */}
        <svg
          viewBox="0 0 800 900"
          className="absolute inset-0 w-full h-full opacity-30"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M400 100 L450 150 L500 200 L550 250 L600 350 L650 450 L600 550 L550 650 L500 750 L400 800 L300 750 L250 650 L200 550 L150 450 L200 350 L250 250 L300 200 L350 150 Z"
            fill="none"
            stroke="hsl(187 100% 45% / 0.3)"
            strokeWidth="2"
          />
        </svg>

        {/* Site Markers */}
        {monitoringSites.map((site, index) => {
          // Approximate position mapping
          const x = ((site.lng - 68) / (97 - 68)) * 100;
          const y = ((37 - site.lat) / (37 - 8)) * 100;

          return (
            <motion.div
              key={site.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute group cursor-pointer"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Pulse Ring */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{ backgroundColor: statusColors[site.status as keyof typeof statusColors] }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />

              {/* Marker */}
              <div
                className="relative w-4 h-4 rounded-full border-2 border-background"
                style={{ backgroundColor: statusColors[site.status as keyof typeof statusColors] }}
              />

              {/* Tooltip */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="glass-intense px-3 py-2 rounded-lg whitespace-nowrap">
                  <p className="text-xs font-semibold text-foreground">{site.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">Status: {site.status}</p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass-intense rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-2">Status Legend</p>
          <div className="flex gap-4">
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-foreground capitalize">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
