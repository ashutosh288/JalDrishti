import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DataProvider } from "@/contexts/DataContext";
import Index from "./pages/Index";
import AIGauge from "./pages/AIGauge";
import Evidence from "./pages/Evidence";
import Community from "./pages/Community";
import Drone from "./pages/Drone";
import Alerts from "./pages/Alerts";
import Blockchain from "./pages/Blockchain";
import Admin from "./pages/Admin";
import Supervisor from "./pages/Supervisor";
import FieldWorker from "./pages/FieldWorker";
import PublicPortal from "./pages/PublicPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <DataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai-gauge" element={<AIGauge />} />
              <Route path="/evidence" element={<Evidence />} />
              <Route path="/community" element={<Community />} />
              <Route path="/drone" element={<Drone />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/blockchain" element={<Blockchain />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/supervisor" element={<Supervisor />} />
              <Route path="/field-worker" element={<FieldWorker />} />
              <Route path="/public" element={<PublicPortal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DataProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
