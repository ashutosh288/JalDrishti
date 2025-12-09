import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Maximize2, Layers, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/contexts/DataContext";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const statusColors = {
  normal: "#22c55e",
  warning: "#f59e0b",
  critical: "#ef4444",
};

// Custom marker icons
const createMarkerIcon = (status: string) => {
  const color = statusColors[status as keyof typeof statusColors] || statusColors.normal;
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        position: relative;
      ">
        <div style="
          position: absolute;
          width: 32px;
          height: 32px;
          background: ${color};
          border-radius: 50%;
          top: -4px;
          left: -4px;
          opacity: 0.3;
          animation: pulse 2s infinite;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

function MapController({ isFullscreen }: { isFullscreen: boolean }) {
  const map = useMap();
  
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [isFullscreen, map]);

  return null;
}

export function IndiaMap() {
  const { data } = useAppData();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sites = data?.monitoringSites || [];

  // India bounds
  const indiaBounds: [[number, number], [number, number]] = [
    [6.5, 68],
    [35.5, 97.5],
  ];

  const MapContent = () => (
    <MapContainer
      center={[22.5, 82.5]}
      zoom={5}
      className="w-full h-full rounded-lg"
      maxBounds={indiaBounds}
      minZoom={4}
      maxZoom={12}
    >
      <MapController isFullscreen={isFullscreen} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="map-tiles"
      />
      
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={[site.lat, site.lng]}
          icon={createMarkerIcon(site.status)}
        >
          <Popup>
            <div className="p-1 min-w-[150px]">
              <h4 className="font-semibold text-sm mb-1">{site.name}</h4>
              <p className="text-xs text-gray-600 mb-2">{site.state}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Water Level:</span>
                  <span className="font-medium">{site.waterLevel}m</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Danger Level:</span>
                  <span className="font-medium">{site.dangerLevel}m</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Status:</span>
                  <span 
                    className="font-medium capitalize px-1.5 py-0.5 rounded text-white text-[10px]"
                    style={{ backgroundColor: statusColors[site.status as keyof typeof statusColors] }}
                  >
                    {site.status}
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Risk circles */}
      {sites.map((site) => (
        <Circle
          key={`circle-${site.id}`}
          center={[site.lat, site.lng]}
          radius={site.status === "critical" ? 50000 : site.status === "warning" ? 35000 : 20000}
          pathOptions={{
            color: statusColors[site.status as keyof typeof statusColors],
            fillColor: statusColors[site.status as keyof typeof statusColors],
            fillOpacity: 0.15,
            weight: 1,
          }}
        />
      ))}
    </MapContainer>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl border border-border/50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            <h3 className="font-display text-sm font-semibold text-foreground">
              Live Monitoring Sites
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Map Container */}
        <div className="h-[400px] relative">
          <MapContent />
        </div>

        {/* Legend */}
        <div className="p-3 border-t border-border/50 bg-card/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {Object.entries(statusColors).map(([status, color]) => (
                <div key={status} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-muted-foreground capitalize">{status}</span>
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {sites.length} sites active
            </span>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background"
        >
          <div className="absolute top-4 left-4 right-4 z-[1000] flex items-center justify-between">
            <div className="bg-card/95 backdrop-blur-sm rounded-lg px-4 py-2 border border-border/50">
              <h3 className="font-display text-sm font-semibold text-foreground">
                State-Level Risk Heatmap
              </h3>
              <p className="text-xs text-muted-foreground">
                {sites.length} monitoring sites • Click markers for details
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="bg-card/95 backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Legend in fullscreen */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-card/95 backdrop-blur-sm rounded-lg px-4 py-3 border border-border/50">
            <p className="text-xs font-medium text-foreground mb-2">Risk Levels</p>
            <div className="flex flex-col gap-2">
              {Object.entries(statusColors).map(([status, color]) => (
                <div key={status} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-muted-foreground capitalize">{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-full">
            <MapContent />
          </div>
        </motion.div>
      )}
    </>
  );
}
