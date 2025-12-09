import { motion } from "framer-motion";
import { Search, User, MapPin, Cloud, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AshokEmblem from "@/components/AshokEmblem";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DangerZoneToggle } from "@/components/DangerZoneToggle";
import { NotificationPanel } from "@/components/NotificationPanel";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { useAppData } from "@/contexts/DataContext";

export function Navbar() {
  const { isOnline } = useAppData();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-14 bg-gradient-to-r from-primary via-primary/90 to-secondary/80 dark:from-[hsl(220,50%,12%)] dark:via-[hsl(200,45%,15%)] dark:to-[hsl(180,40%,12%)] backdrop-blur-md border-b border-secondary/30 flex items-center justify-between px-4 shadow-lg"
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <AshokEmblem size={28} />
        <div className="hidden md:block">
          <h2 className="font-display text-xs font-semibold text-foreground">
            Government of India
          </h2>
          <p className="text-[10px] text-muted-foreground">Ministry of Jal Shakti</p>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-sm mx-4 hidden lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search sites, alerts..."
            className="pl-9 h-8 bg-card/50 border-border/50 text-xs"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <OfflineIndicator />
        
        {/* Status Indicators */}
        <div className="hidden md:flex items-center gap-2 pr-3 border-r border-border/50">
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={isOnline ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-1.5 h-1.5 rounded-full ${isOnline ? "bg-success" : "bg-destructive"}`}
            />
            <span className="text-[10px] text-muted-foreground">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Weather Widget */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-card/50 border border-border/50">
          <Cloud className="w-3.5 h-3.5 text-secondary" />
          <span className="text-[10px] text-foreground">28°C</span>
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Delhi</span>
        </div>

        <DangerZoneToggle />
        <ThemeToggle />
        <NotificationPanel />

        {/* User Profile */}
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border/50">
          <User className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </motion.header>
  );
}
