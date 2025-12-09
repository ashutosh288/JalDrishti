import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Clock } from "lucide-react";
import { Button } from "./ui/button";

export function ReminderWidget() {
  const [showReminder, setShowReminder] = useState(false);
  const [nextReading, setNextReading] = useState("");

  useEffect(() => {
    // Calculate next reading time (every 6 hours)
    const calculateNextReading = () => {
      const now = new Date();
      const hours = now.getHours();
      const nextSlot = Math.ceil((hours + 1) / 6) * 6;
      const nextTime = new Date(now);
      nextTime.setHours(nextSlot, 0, 0, 0);
      
      if (nextSlot >= 24) {
        nextTime.setDate(nextTime.getDate() + 1);
        nextTime.setHours(0, 0, 0, 0);
      }
      
      return nextTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    };

    setNextReading(calculateNextReading());

    // Show reminder every 2 hours
    const interval = setInterval(() => {
      setShowReminder(true);
      setNextReading(calculateNextReading());
    }, 2 * 60 * 60 * 1000);

    // Show initial reminder after 5 seconds
    const timeout = setTimeout(() => setShowReminder(true), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {showReminder && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="glass-card rounded-xl border border-secondary/30 p-4 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary/20">
                  <Bell className="w-5 h-5 text-secondary animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-1">
                    Reading Reminder
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Next water level reading scheduled at:
                  </p>
                  <div className="flex items-center gap-2 text-secondary font-semibold">
                    <Clock className="w-4 h-4" />
                    <span>{nextReading}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowReminder(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
