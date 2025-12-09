import { ReactNode, useState, createContext, useContext } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { SOSButton } from "@/components/SOSButton";
import { ChatAssistant } from "@/components/ChatAssistant";
import { FallSimulation } from "@/components/FallSimulation";
import { Footer } from "@/components/Footer";
import { ReminderWidget } from "@/components/ReminderWidget";
import { DeadManSwitch } from "@/components/DeadManSwitch";

interface MainLayoutProps {
  children: ReactNode;
}

// Create context for sidebar state
export const SidebarContext = createContext<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}>({
  collapsed: false,
  setCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="min-h-screen animated-bg flex flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <div 
            className="flex-1 flex flex-col transition-all duration-300"
            style={{ marginLeft: collapsed ? 80 : 280 }}
          >
            <Navbar />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-6 flex-1 overflow-x-hidden"
            >
              {children}
            </motion.main>
            <Footer />
          </div>
        </div>
        <SOSButton />
        <ChatAssistant />
        <FallSimulation />
        <ReminderWidget />
        <DeadManSwitch />
      </div>
    </SidebarContext.Provider>
  );
}
