import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import axios from "axios";

interface MonitoringSite {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: "normal" | "warning" | "critical";
  waterLevel: number;
  dangerLevel: number;
  state: string;
}

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info";
  location: string;
  time: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "critical" | "warning" | "info" | "success";
  read: boolean;
  time: string;
}

interface Stats {
  activeSites: number;
  anomaliesDetected: number;
  verifiedSubmissions: number;
  communityReports: number;
}

interface FloodProbability {
  percentage: number;
  trend: string;
  rainfallIntensity: string;
  prediction24h: string;
}

interface TrustMetrics {
  aiConfidence: number;
  blockchainValid: boolean;
  droneVerified: boolean;
}

interface WaterLevelData {
  time: string;
  level: number;
}

interface OfflineQueueItem {
  id: string;
  type: string;
  data: any;
  timestamp: number;
}

interface AppData {
  stats: Stats;
  monitoringSites: MonitoringSite[];
  recentAlerts: Alert[];
  floodProbability: FloodProbability;
  trustMetrics: TrustMetrics;
  waterLevelHistory: WaterLevelData[];
  notifications: Notification[];
  offlineQueue: OfflineQueueItem[];
}

interface DataContextType {
  data: AppData | null;
  isLoading: boolean;
  isOnline: boolean;
  error: string | null;
  refetch: () => void;
  updateStats: (key: keyof Stats, value: number) => void;
  markNotificationRead: (id: number) => void;
  addToOfflineQueue: (item: Omit<OfflineQueueItem, "id" | "timestamp">) => void;
  syncOfflineQueue: () => void;
  unreadNotifications: number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const FALLBACK_DATA: AppData = {
  stats: { activeSites: 247, anomaliesDetected: 8, verifiedSubmissions: 1847, communityReports: 324 },
  monitoringSites: [
    { id: 1, name: "Yamuna - Delhi", lat: 28.6139, lng: 77.209, status: "normal", waterLevel: 4.2, dangerLevel: 6.5, state: "Delhi" },
    { id: 2, name: "Ganga - Varanasi", lat: 25.3176, lng: 82.9739, status: "warning", waterLevel: 5.8, dangerLevel: 6.0, state: "Uttar Pradesh" },
    { id: 3, name: "Brahmaputra - Guwahati", lat: 26.1445, lng: 91.7362, status: "critical", waterLevel: 7.2, dangerLevel: 7.0, state: "Assam" },
    { id: 4, name: "Godavari - Nashik", lat: 19.9975, lng: 73.7898, status: "normal", waterLevel: 3.1, dangerLevel: 5.5, state: "Maharashtra" },
    { id: 5, name: "Krishna - Vijayawada", lat: 16.5062, lng: 80.648, status: "warning", waterLevel: 4.9, dangerLevel: 5.2, state: "Andhra Pradesh" },
  ],
  recentAlerts: [
    { id: "ALT-2847", title: "Critical Water Level", message: "Brahmaputra river exceeded danger mark", severity: "critical", location: "Guwahati, Assam", time: "5 min ago" },
  ],
  floodProbability: { percentage: 42, trend: "rising", rainfallIntensity: "moderate", prediction24h: "45%" },
  trustMetrics: { aiConfidence: 87, blockchainValid: true, droneVerified: false },
  waterLevelHistory: [
    { time: "00:00", level: 4.2 }, { time: "08:00", level: 4.8 }, { time: "16:00", level: 5.0 }, { time: "24:00", level: 4.4 },
  ],
  notifications: [
    { id: 1, title: "New Alert", message: "Critical water level at Brahmaputra", type: "critical", read: false, time: "5 min ago" },
  ],
  offlineQueue: [],
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Try to fetch from local JSON file
      const response = await axios.get("/data.json", { timeout: 5000 });
      setData(response.data);
      // Cache data for offline use
      localStorage.setItem("jaldrishti-cached-data", JSON.stringify(response.data));
    } catch (err) {
      console.warn("Failed to fetch data, using cached/fallback:", err);
      // Try cached data first
      const cached = localStorage.getItem("jaldrishti-cached-data");
      if (cached) {
        setData(JSON.parse(cached));
      } else {
        setData(FALLBACK_DATA);
      }
      if (!navigator.onLine) {
        setError("You are offline. Showing cached data.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      fetchData();
    };
    const handleOffline = () => {
      setIsOnline(false);
      setError("You are offline. Changes will sync when connection is restored.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [fetchData]);

  const updateStats = (key: keyof Stats, value: number) => {
    if (data) {
      setData({
        ...data,
        stats: { ...data.stats, [key]: value },
      });
    }
  };

  const markNotificationRead = (id: number) => {
    if (data) {
      setData({
        ...data,
        notifications: data.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      });
    }
  };

  const addToOfflineQueue = (item: Omit<OfflineQueueItem, "id" | "timestamp">) => {
    const newItem: OfflineQueueItem = {
      ...item,
      id: `offline-${Date.now()}`,
      timestamp: Date.now(),
    };
    if (data) {
      const newQueue = [...data.offlineQueue, newItem];
      setData({ ...data, offlineQueue: newQueue });
      localStorage.setItem("jaldrishti-offline-queue", JSON.stringify(newQueue));
    }
  };

  const syncOfflineQueue = () => {
    if (data && isOnline && data.offlineQueue.length > 0) {
      // Simulate sync - in real app, this would POST to server
      console.log("Syncing offline queue:", data.offlineQueue);
      setData({ ...data, offlineQueue: [] });
      localStorage.removeItem("jaldrishti-offline-queue");
    }
  };

  const unreadNotifications = data?.notifications.filter((n) => !n.read).length || 0;

  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        isOnline,
        error,
        refetch: fetchData,
        updateStats,
        markNotificationRead,
        addToOfflineQueue,
        syncOfflineQueue,
        unreadNotifications,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useAppData must be used within a DataProvider");
  }
  return context;
}
