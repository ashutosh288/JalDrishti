import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Cloud, RefreshCw } from "lucide-react";
import { useAppData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";

export function OfflineIndicator() {
  const { isOnline, data, syncOfflineQueue } = useAppData();
  const queueLength = data?.offlineQueue.length || 0;

  return (
    <AnimatePresence>
      {(!isOnline || queueLength > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
            isOnline
              ? "bg-warning/20 text-warning border border-warning/30"
              : "bg-destructive/20 text-destructive border border-destructive/30"
          }`}
        >
          {isOnline ? (
            <>
              <Cloud className="w-3.5 h-3.5" />
              <span>{queueLength} pending sync</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-5 px-1.5 text-xs"
                onClick={syncOfflineQueue}
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline Mode</span>
              {queueLength > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-destructive/30 text-[10px]">
                  {queueLength} queued
                </span>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
