import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Phone, MapPin, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

export function FallSimulation() {
  const { isDangerZone } = useTheme();
  const [fallDetected, setFallDetected] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [sosSent, setSosSent] = useState(false);

  const dismissFall = useCallback(() => {
    setFallDetected(false);
    setCountdown(60);
    setSosSent(false);
    toast({
      title: "Alert Dismissed",
      description: "Fall detection alarm cancelled",
    });
  }, []);

  const sendSOS = useCallback(() => {
    setSosSent(true);
    toast({
      title: "🚨 SOS Signal Sent",
      description: "Emergency services and supervisor notified with your location",
      variant: "destructive",
    });
  }, []);

  // Countdown timer when fall detected
  useEffect(() => {
    if (fallDetected && !sosSent && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0 && !sosSent) {
      sendSOS();
    }
  }, [fallDetected, countdown, sosSent, sendSOS]);

  // Simulate fall detection (for demo)
  const simulateFall = () => {
    setFallDetected(true);
    setCountdown(60);
    setSosSent(false);
    // Play alarm sound simulation
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  };

  if (!isDangerZone) return null;

  return (
    <>
      {/* Simulate Fall Button */}
      <motion.button
        onClick={simulateFall}
        className="fixed bottom-24 right-6 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-warning/20 border border-warning/50 text-warning text-xs font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Activity className="w-3.5 h-3.5" />
        Simulate Fall
      </motion.button>

      {/* Fall Detection Modal */}
      <AnimatePresence>
        {fallDetected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md mx-4 p-6 rounded-xl bg-card border-2 border-destructive"
            >
              {/* Pulsing Alert Icon */}
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.4)",
                      "0 0 0 20px rgba(239, 68, 68, 0)",
                      "0 0 0 0 rgba(239, 68, 68, 0)",
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center"
                >
                  <AlertTriangle className="w-10 h-10 text-destructive" />
                </motion.div>
              </div>

              <h2 className="text-xl font-display font-bold text-foreground text-center mb-2">
                {sosSent ? "🚨 SOS Sent" : "Fall Detected!"}
              </h2>

              {sosSent ? (
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Emergency signal has been sent to the control room and your
                    supervisor with your last known location.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-success">
                    <MapPin className="w-4 h-4" />
                    <span>28.6139°N, 77.2090°E</span>
                  </div>
                  <Button onClick={dismissFall} className="w-full">
                    Close
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Are you okay? If you don't respond, SOS will be sent
                    automatically.
                  </p>

                  {/* Countdown */}
                  <div className="flex justify-center">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="44"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-muted/30"
                        />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="44"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-destructive"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "276 276" }}
                          animate={{
                            strokeDasharray: `${(countdown / 60) * 276} 276`,
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-display font-bold text-destructive">
                          {countdown}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={dismissFall}
                      variant="outline"
                      className="border-success text-success hover:bg-success/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      I'm OK
                    </Button>
                    <Button
                      onClick={sendSOS}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Send SOS
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
