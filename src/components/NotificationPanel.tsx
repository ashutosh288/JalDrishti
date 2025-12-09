import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/contexts/DataContext";
import { cn } from "@/lib/utils";

export function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, markNotificationRead, unreadNotifications } = useAppData();

  const getIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <Info className="w-4 h-4 text-secondary" />;
    }
  };

  const getBgColor = (type: string, read: boolean) => {
    if (read) return "bg-card/30";
    switch (type) {
      case "critical":
        return "bg-destructive/10 border-l-2 border-l-destructive";
      case "warning":
        return "bg-warning/10 border-l-2 border-l-warning";
      case "success":
        return "bg-success/10 border-l-2 border-l-success";
      default:
        return "bg-secondary/10 border-l-2 border-l-secondary";
    }
  };

  const panelContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            style={{ zIndex: 99998 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Floating Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-16 right-4 w-80 sm:w-96 rounded-xl bg-card border border-border shadow-2xl overflow-hidden"
            style={{ zIndex: 99999, maxHeight: 'calc(100vh - 100px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
              <h3 className="font-display text-base font-semibold text-foreground">
                Notifications
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {data?.notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "p-3 border-b border-border/30 cursor-pointer hover:bg-card/50 transition-colors",
                    getBgColor(notification.type, notification.read)
                  )}
                  onClick={() => markNotificationRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={cn(
                            "text-sm font-medium truncate",
                            notification.read
                              ? "text-muted-foreground"
                              : "text-foreground"
                          )}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-secondary"
              >
                <Check className="w-3 h-3 mr-1" />
                Mark all as read
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-8 w-8"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-4 h-4 text-foreground" />
        {unreadNotifications > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center border-2 border-background"
          >
            {unreadNotifications}
          </motion.span>
        )}
      </Button>

      {createPortal(panelContent, document.body)}
    </>
  );
}
