import { motion } from "framer-motion";
import {
  Users,
  Upload,
  MapPin,
  Camera,
  Award,
  Trophy,
  Star,
  CheckCircle,
  Clock,
  Plane,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const leaderboard = [
  { rank: 1, name: "Rajesh Kumar", badge: "Jal Rakshak", points: 2450, reports: 127, verified: 98 },
  { rank: 2, name: "Priya Sharma", badge: "Top Reporter", points: 2180, reports: 98, verified: 94 },
  { rank: 3, name: "Amit Singh", badge: "Field Expert", points: 1920, reports: 85, verified: 96 },
  { rank: 4, name: "Sunita Devi", badge: "Rising Star", points: 1650, reports: 72, verified: 92 },
  { rank: 5, name: "Vikram Reddy", badge: "Contributor", points: 1420, reports: 63, verified: 89 },
];

const recentUploads = [
  { id: 1, location: "Ganga - Patna", status: "verified", trustScore: 94, time: "2 min ago" },
  { id: 2, location: "Yamuna - Agra", status: "pending", trustScore: 78, time: "15 min ago" },
  { id: 3, location: "Godavari - Rajahmundry", status: "verified", trustScore: 91, time: "1 hr ago" },
];

export default function Community() {
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
              Community <span className="text-secondary text-glow-cyan">Monitoring Portal</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Citizen collaboration for water level monitoring
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/30">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="text-sm text-accent font-medium">Your Rank: #42</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Submit Water Level Report
                </h3>
              </div>

              <div className="border-2 border-dashed border-secondary/30 rounded-xl p-8 text-center hover:border-secondary/50 transition-colors cursor-pointer">
                <Camera className="w-12 h-12 text-secondary/50 mx-auto mb-3" />
                <p className="text-sm text-foreground mb-1">
                  Capture or Upload Image
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  GPS location will be auto-captured
                </p>
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Camera className="w-4 h-4 mr-2" />
                  Open Camera
                </Button>
              </div>

              {/* GPS Tag Bubble */}
              <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-success/10 border border-success/30 rounded-lg">
                <MapPin className="w-4 h-4 text-success" />
                <span className="text-xs text-foreground">
                  Auto-location: <span className="font-mono">28.6139°N, 77.2090°E</span>
                </span>
                <span className="text-xs text-success ml-auto">GPS Active</span>
              </div>
            </motion.div>

            {/* Drone Assist Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-secondary" />
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    Drone Assist Status
                  </h3>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-warning/20 text-warning">
                  In-Flight
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-card/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-display font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="bg-card/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-display font-bold text-warning">2</p>
                  <p className="text-xs text-muted-foreground">In-Flight</p>
                </div>
                <div className="bg-card/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-display font-bold text-success">47</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>

              {/* Mini Video Thumbnail Placeholder */}
              <div className="mt-4 aspect-video bg-primary/30 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Plane className="w-8 h-8 text-secondary/50 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Live drone feed</p>
                </div>
              </div>
            </motion.div>

            {/* AI Authenticity Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                AI Authenticity Radar
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                Comparing public vs drone vs official reading alignment
              </p>

              <div className="flex items-center justify-center py-4">
                <div className="relative w-48 h-48">
                  {/* Radar circles */}
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="absolute inset-0 border border-secondary/20 rounded-full"
                      style={{
                        transform: `scale(${i * 0.25})`,
                      }}
                    />
                  ))}
                  {/* Data points */}
                  <div className="absolute w-3 h-3 rounded-full bg-secondary" style={{ top: "20%", left: "50%", transform: "translate(-50%, -50%)" }} />
                  <div className="absolute w-3 h-3 rounded-full bg-accent" style={{ top: "40%", left: "80%", transform: "translate(-50%, -50%)" }} />
                  <div className="absolute w-3 h-3 rounded-full bg-warning" style={{ top: "60%", left: "30%", transform: "translate(-50%, -50%)" }} />
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-xs text-muted-foreground">Official</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-xs text-muted-foreground">Drone</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-xs text-muted-foreground">Public</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Leaderboard Section */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-xl border border-accent/20 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-accent" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Top Contributors
                </h3>
              </div>

              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      user.rank <= 3 ? "bg-accent/5 border border-accent/20" : "bg-card/50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                        user.rank === 1 && "bg-yellow-500/20 text-yellow-500",
                        user.rank === 2 && "bg-gray-400/20 text-gray-400",
                        user.rank === 3 && "bg-orange-600/20 text-orange-600",
                        user.rank > 3 && "bg-muted text-muted-foreground"
                      )}
                    >
                      {user.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3 text-accent" />
                        <span className="text-xs text-accent">{user.badge}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-display font-bold text-foreground">
                        {user.points}
                      </p>
                      <p className="text-xs text-muted-foreground">pts</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Gamification Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-accent" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Your Progress
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Level 4: Field Expert</span>
                    <span className="text-accent">780 / 1000 XP</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card/50 rounded-lg p-3 text-center">
                    <p className="text-xl font-display font-bold text-foreground">23</p>
                    <p className="text-xs text-muted-foreground">Reports</p>
                  </div>
                  <div className="bg-card/50 rounded-lg p-3 text-center">
                    <p className="text-xl font-display font-bold text-success">91%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  220 more XP to unlock "Jal Rakshak" badge
                </p>
              </div>
            </motion.div>

            {/* Recent Uploads */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <h3 className="font-display text-sm font-semibold text-foreground mb-4">
                Recent Community Uploads
              </h3>

              <div className="space-y-3">
                {recentUploads.map((upload) => (
                  <div key={upload.id} className="flex items-center gap-3 p-2 bg-card/50 rounded-lg">
                    <div className="w-10 h-10 bg-primary/30 rounded-lg flex items-center justify-center">
                      <Camera className="w-4 h-4 text-secondary/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{upload.location}</p>
                      <div className="flex items-center gap-2">
                        {upload.status === "verified" ? (
                          <CheckCircle className="w-3 h-3 text-success" />
                        ) : (
                          <Clock className="w-3 h-3 text-warning" />
                        )}
                        <span className="text-xs text-muted-foreground">{upload.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-sm font-semibold",
                        upload.trustScore >= 90 ? "text-success" : "text-warning"
                      )}>
                        {upload.trustScore}%
                      </p>
                      <p className="text-xs text-muted-foreground">Trust</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
