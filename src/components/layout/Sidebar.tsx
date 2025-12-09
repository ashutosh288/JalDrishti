import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Scan,
  FileCheck,
  Users,
  AlertTriangle,
  Link2,
  Shield,
  ChevronLeft,
  ChevronRight,
  Plane,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import JalDrishtiLogo from "@/components/JalDrishtiLogo";
import { useSidebar } from "./MainLayout";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "AI-AR Gauge", url: "/ai-gauge", icon: Scan },
  { title: "Dual Evidence", url: "/evidence", icon: FileCheck },
  { title: "Community", url: "/community", icon: Users },
  { title: "Drone Reports", url: "/drone", icon: Plane },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Blockchain Logs", url: "/blockchain", icon: Link2 },
  { title: "Admin Dashboard", url: "/admin", icon: Shield },
  { title: "Public Portal", url: "/public", icon: Globe },
];

export function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col glass-intense border-r border-secondary/20"
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-secondary/20">
        <div className="flex items-center gap-3">
          <JalDrishtiLogo size={collapsed ? 40 : 48} />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="font-display text-xl font-bold text-secondary text-glow-cyan">
                  JalDrishti
                </h1>
                <p className="text-xs text-muted-foreground">Smart Water Monitor</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300",
                "hover:bg-secondary/10",
                isActive && "bg-secondary/20 glow-cyan"
              )}
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-secondary rounded-r-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon */}
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors flex-shrink-0",
                  isActive ? "text-secondary" : "text-muted-foreground group-hover:text-secondary"
                )}
              />

              {/* Label */}
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Ripple Effect on Hover */}
              <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-radial from-secondary/10 to-transparent" />
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-secondary/20">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-secondary" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* JalPulse Orb */}
      <div className="absolute bottom-20 right-4">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-3 h-3 rounded-full bg-accent"
          style={{ boxShadow: "0 0 20px hsl(83 92% 63% / 0.8)" }}
        />
      </div>
    </motion.aside>
  );
}
