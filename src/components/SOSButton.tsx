import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function SOSButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSOS = () => {
    toast({
      title: "🚨 SOS Alert Sent!",
      description: "Emergency signal transmitted to Central Control Room with your coordinates.",
      variant: "destructive",
    });
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 w-72 glass-card p-4 rounded-xl border border-destructive/50"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-semibold text-destructive">
                Emergency SOS
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-muted-foreground mb-4">
              Send immediate alert with your GPS coordinates to the control room.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 text-secondary" />
                <span>Location: 28.6139°N, 77.2090°E</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Phone className="w-3 h-3 text-secondary" />
                <span>Emergency Line: 1800-XXX-XXXX</span>
              </div>
            </div>

            <Button
              onClick={handleSOS}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              Send SOS Signal
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOS Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-14 h-14 rounded-full bg-destructive flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(239, 68, 68, 0.4)",
            "0 0 0 20px rgba(239, 68, 68, 0)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      >
        <AlertCircle className="w-6 h-6 text-destructive-foreground" />
        <span className="absolute -top-1 -right-1 text-xs font-bold bg-foreground text-background px-1.5 py-0.5 rounded-full">
          SOS
        </span>
      </motion.button>
    </div>
  );
}
