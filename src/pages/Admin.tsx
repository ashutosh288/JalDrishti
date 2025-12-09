import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  FileText,
  Download,
  TrendingUp,
  AlertTriangle,
  Clock,
  BarChart3,
  MapPin,
  Plane,
  X,
  Maximize2,
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { cn } from "@/lib/utils";
import { IndiaMap } from "@/components/dashboard/IndiaMap";

const submissionTrends = [
  { date: "Jan 1", submissions: 145, verified: 138 },
  { date: "Jan 5", submissions: 167, verified: 159 },
  { date: "Jan 10", submissions: 189, verified: 181 },
  { date: "Jan 15", submissions: 156, verified: 152 },
];

const accuracyData = [
  { site: "Yamuna", accuracy: 94 },
  { site: "Ganga", accuracy: 91 },
  { site: "Brahmaputra", accuracy: 88 },
  { site: "Godavari", accuracy: 96 },
  { site: "Krishna", accuracy: 93 },
];

const tamperAlerts = [
  { id: 1, siteId: "BRM-GUW-002", reason: "GPS Spoofing Detected", time: "2 hrs ago" },
  { id: 2, siteId: "YAM-DEL-001", reason: "Edited Image Detected", time: "5 hrs ago" },
  { id: 3, siteId: "GNG-PAT-003", reason: "Metadata Mismatch", time: "1 day ago" },
];

export default function Admin() {
  const navigate = useNavigate();
  const [showFullMap, setShowFullMap] = useState(false);

  const handleRoleChange = (value: string) => {
    if (value === "supervisor") navigate("/supervisor");
    else if (value === "field") navigate("/field-worker");
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">
              Admin <span className="text-secondary text-glow-cyan">Dashboard</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Central administration and analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="central" onValueChange={handleRoleChange}>
              <SelectTrigger className="w-40 bg-card/50 border-secondary/20">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="central">Central Admin</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="field">Field Worker</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-secondary hover:bg-secondary/90">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-card/50 border border-secondary/20">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="tamper">Tamper Alerts</TabsTrigger>
            <TabsTrigger value="drone">Drone Verification</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Total Users", value: "1,247", icon: Users, trend: "+12%", color: "secondary" },
                { label: "Submissions Today", value: "347", icon: FileText, trend: "+8%", color: "accent" },
                { label: "Avg Accuracy", value: "94.2%", icon: TrendingUp, trend: "+2.1%", color: "success" },
                { label: "Avg Response Time", value: "4.2m", icon: Clock, trend: "-15%", color: "warning" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl border border-secondary/20 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-display font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                      <p className={cn("text-xs mt-1", stat.trend.startsWith("+") ? "text-success" : "text-warning")}>
                        {stat.trend} from last week
                      </p>
                    </div>
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", `bg-${stat.color}/20`)}>
                      <stat.icon className={cn("w-5 h-5", `text-${stat.color}`)} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Submission Trends */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-xl border border-secondary/20 p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    Submission Trends
                  </h3>
                  <Select defaultValue="week">
                    <SelectTrigger className="w-24 h-8 bg-card/50 border-secondary/20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={submissionTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 30% 20% / 0.5)" />
                      <XAxis dataKey="date" stroke="hsl(200 15% 70%)" fontSize={11} />
                      <YAxis stroke="hsl(200 15% 70%)" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(222 47% 8% / 0.95)",
                          border: "1px solid hsl(187 100% 45% / 0.3)",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="submissions" stroke="#00E0FF" strokeWidth={2} />
                      <Line type="monotone" dataKey="verified" stroke="#B8F94B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Accuracy by Site */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-xl border border-secondary/20 p-5"
              >
                <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                  Accuracy by Site
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={accuracyData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 30% 20% / 0.5)" />
                      <XAxis type="number" domain={[0, 100]} stroke="hsl(200 15% 70%)" fontSize={11} />
                      <YAxis dataKey="site" type="category" stroke="hsl(200 15% 70%)" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(222 47% 8% / 0.95)",
                          border: "1px solid hsl(187 100% 45% / 0.3)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="accuracy" fill="#00E0FF" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* State-Level Risk Heatmap with Real Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    State-Level Risk Heatmap
                  </h3>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-secondary/30"
                  onClick={() => setShowFullMap(true)}
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  View Full Map
                </Button>
              </div>
              <div className="h-80 rounded-lg overflow-hidden border border-border/50">
                <IndiaMap />
              </div>
              
              {/* Risk Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-xs text-muted-foreground">Low Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-xs text-muted-foreground">Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span className="text-xs text-muted-foreground">Critical</span>
                </div>
              </div>
            </motion.div>
            
            {/* Fullscreen Map Modal */}
            {showFullMap && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      State-Level Risk Heatmap - Full View
                    </h2>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowFullMap(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex-1 p-4">
                  <div className="h-full rounded-xl overflow-hidden border border-border">
                    <IndiaMap />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-8 p-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-success"></div>
                    <span className="text-sm text-muted-foreground">Low Risk (0-25%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-warning"></div>
                    <span className="text-sm text-muted-foreground">Moderate (25-50%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-muted-foreground">High (50-75%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-destructive"></div>
                    <span className="text-sm text-muted-foreground">Critical (75-100%)</span>
                  </div>
                </div>
              </motion.div>
            )}
          </TabsContent>

          {/* Tamper Alerts Tab */}
          <TabsContent value="tamper" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl border border-destructive/30 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Tamper Detection Alerts
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
                        <p className="text-sm font-semibold text-foreground">
                          Site: {alert.siteId}
                        </p>
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

          {/* Drone Verification Tab */}
          <TabsContent value="drone" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Plane className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Drone Verification (Coming Soon)
                </h3>
              </div>

              <div className="h-64 bg-primary/30 rounded-lg flex items-center justify-center border-2 border-dashed border-secondary/30">
                <div className="text-center">
                  <Plane className="w-16 h-16 text-secondary/30 mx-auto mb-3" />
                  <p className="text-lg font-display text-foreground mb-2">
                    AI-based Drone Verification
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Automated drone images for remote site validation. This feature is under
                    development and will be available in the next update.
                  </p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
