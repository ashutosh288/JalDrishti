import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

export function DeadManSwitch() {
  const { isDangerZone } = useTheme();
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [showWarning, setShowWarning] = useState(false);

  const handleCheckIn = useCallback(() => {
    setTimeRemaining(30 * 60); // Reset to 30 minutes
    setShowWarning(false);
    toast({
      title: "Check-in Successful",
      description: "Timer reset. Stay safe!",
    });
  }, [toast]);

  const triggerEmergency = useCallback(() => {
    toast({
      title: "🚨 EMERGENCY ALERT SENT",
      description: "Your supervisor has been notified with your last known location.",
      variant: "destructive",
    });
    
    // Vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
    
    setIsActive(false);
    setTimeRemaining(30 * 60);
  }, [toast]);

  useEffect(() => {
    if (isDangerZone && !isActive) {
      setIsActive(true);
      toast({
        title: "Dead Man's Switch Activated",
        description: "Check in every 30 minutes or an alert will be sent to your supervisor.",
      });
    }

    if (!isDangerZone && isActive) {
      setIsActive(false);
      setTimeRemaining(30 * 60);
      setShowWarning(false);
    }
  }, [isDangerZone, isActive, toast]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        // Show warning at 5 minutes
        if (newTime === 5 * 60) {
          setShowWarning(true);
        }
        
        // Trigger emergency at 0
        if (newTime <= 0) {
          triggerEmergency();
          return 30 * 60;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, triggerEmergency]);

  if (!isDangerZone) return null;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <>
      {/* Persistent Timer Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-20 right-4 z-40"
      >
        <div className={`glass-card rounded-full px-4 py-2 border ${
          showWarning ? 'border-destructive/50 bg-destructive/10' : 'border-secondary/30'
        }`}>
          <div className="flex items-center gap-2">
            <Shield className={`w-4 h-4 ${showWarning ? 'text-destructive animate-pulse' : 'text-secondary'}`} />
            <span className={`text-sm font-mono font-semibold ${
              showWarning ? 'text-destructive' : 'text-foreground'
            }`}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Warning Modal */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <div className="glass-card rounded-2xl border border-destructive/50 p-6 max-w-md w-full">
              <div className="text-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="inline-block p-4 rounded-full bg-destructive/20 mb-4"
                >
                  <AlertTriangle className="w-12 h-12 text-destructive" />
                </motion.div>
                <h2 className="font-display text-2xl font-bold text-destructive mb-2">
                  Check-In Required!
                </h2>
                <p className="text-muted-foreground mb-4">
                  Less than 5 minutes remaining. Please check in to confirm your safety.
                </p>
                <div className="flex items-center justify-center gap-2 text-3xl font-mono font-bold text-destructive mb-6">
                  <Clock className="w-8 h-8" />
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
              </div>
              
              <Button
                onClick={handleCheckIn}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg py-6"
              >
                <Shield className="w-5 h-5 mr-2" />
                Check In Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
