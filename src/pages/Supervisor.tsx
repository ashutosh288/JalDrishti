import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  CheckCircle,
  XCircle,
  MessageSquare,
  TrendingUp,
  MapPin,
  Users,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { IndiaMap } from "@/components/dashboard/IndiaMap";

const pendingReadings = [
  { id: 1, siteId: "YAM-DEL-001", worker: "Ramesh K.", level: "4.2m", confidence: 94, time: "10 min ago" },
  { id: 2, siteId: "GNG-PAT-003", worker: "Suresh M.", level: "3.8m", confidence: 87, time: "25 min ago" },
  { id: 3, siteId: "BRM-GUW-002", worker: "Priya S.", level: "5.1m", confidence: 91, time: "45 min ago" },
];

const citizenUploads = [
  { id: 1, location: "Near Yamuna Bridge", trustScore: 72, time: "1 hr ago", image: "/images/yamuna-river.jpg" },
  { id: 2, location: "Ganga Ghat Area", trustScore: 85, time: "2 hrs ago", image: "/images/ganga-river.jpg" },
];

const tamperAlerts = [
  { id: 1, siteId: "BRM-GUW-002", reason: "GPS Spoofing Detected", time: "2 hrs ago" },
  { id: 2, siteId: "YAM-DEL-001", reason: "Edited Image Detected", time: "5 hrs ago" },
];

export default function Supervisor() {
  const navigate = useNavigate();
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  const handleRoleChange = (value: string) => {
    if (value === "central") navigate("/admin");
    else if (value === "field") navigate("/field-worker");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Supervisor <span className="text-secondary text-glow-cyan">Dashboard</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Monitor field workers and approve submissions
            </p>
          </div>
          <Select defaultValue="supervisor" onValueChange={handleRoleChange}>
            <SelectTrigger className="w-40 bg-card/50 border-secondary/20">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="central">Central Admin</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="field">Field Worker</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Workers", value: "24", icon: Users, color: "secondary" },
            { label: "Pending Reviews", value: "12", icon: Clock, color: "warning" },
            { label: "Approved Today", value: "45", icon: CheckCircle, color: "success" },
            { label: "Tamper Alerts", value: "3", icon: AlertTriangle, color: "destructive" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl border border-secondary/20 p-4"
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", `bg-${stat.color}/20`)}>
                  <stat.icon className={cn("w-5 h-5", `text-${stat.color}`)} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-display font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="readings" className="space-y-6">
          <TabsList className="bg-card/50 border border-secondary/20">
            <TabsTrigger value="readings">Pending Readings</TabsTrigger>
            <TabsTrigger value="map">Site Risk Map</TabsTrigger>
            <TabsTrigger value="citizen">Citizen Uploads</TabsTrigger>
            <TabsTrigger value="tamper">Tamper Alerts</TabsTrigger>
          </TabsList>

          {/* Pending Readings Tab */}
          <TabsContent value="readings" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                Approve/Reject Panel
              </h3>
              <div className="space-y-3">
                {pendingReadings.map((reading, index) => (
                  <motion.div
                    key={reading.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-card/50 border border-border/50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{reading.siteId}</p>
                        <p className="text-xs text-muted-foreground">
                          By {reading.worker} • {reading.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-secondary">{reading.level}</p>
                        <p className="text-xs text-muted-foreground">
                          AI Confidence: <span className="text-success">{reading.confidence}%</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-success hover:bg-success/90">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="border-destructive text-destructive">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline" className="border-secondary/50">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Site Risk Map Tab */}
          <TabsContent value="map" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Site Risk Map
                </h3>
              </div>
              <div className="h-80 rounded-lg overflow-hidden border border-border/50">
                <IndiaMap />
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-xs text-muted-foreground">Green - Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-xs text-muted-foreground">Yellow - Caution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs text-muted-foreground">Orange - High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span className="text-xs text-muted-foreground">Red - Critical</span>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Citizen Uploads Tab */}
          <TabsContent value="citizen" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                Citizen Upload Queue
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {citizenUploads.map((upload, index) => (
                  <motion.div
                    key={upload.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-card/50 border border-border/50 rounded-lg"
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      <img src={upload.image} alt="Citizen upload" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{upload.location}</p>
                        <p className="text-xs text-muted-foreground">{upload.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">AI Trust Score</p>
                        <p className={cn("text-lg font-bold", upload.trustScore >= 80 ? "text-success" : "text-warning")}>
                          {upload.trustScore}%
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verify
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-destructive text-destructive">
                        <XCircle className="w-4 h-4 mr-1" />
                        Discard
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Tamper Alerts Tab */}
          <TabsContent value="tamper" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl border border-destructive/30 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Tamper Alerts
                </h3>
              </div>
              <div className="space-y-3">
                {tamperAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/30 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Site: {alert.siteId}</p>
                        <p className="text-xs text-destructive">{alert.reason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                      <Button variant="outline" size="sm" className="mt-2 border-destructive/50 text-destructive">
                        Investigate
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
