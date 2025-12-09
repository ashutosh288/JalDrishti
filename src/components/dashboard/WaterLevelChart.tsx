import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Activity, TrendingUp } from "lucide-react";

const data = [
  { time: "00:00", level: 4.2, danger: 6 },
  { time: "04:00", level: 4.5, danger: 6 },
  { time: "08:00", level: 4.8, danger: 6 },
  { time: "12:00", level: 5.2, danger: 6 },
  { time: "16:00", level: 5.5, danger: 6 },
  { time: "20:00", level: 5.3, danger: 6 },
  { time: "Now", level: 5.1, danger: 6 },
];

export function WaterLevelChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl border border-secondary/20 p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground">
              Real-time Water Level
            </h3>
            <p className="text-xs text-muted-foreground">Yamuna River - Delhi Site</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="text-xs font-semibold text-success">+0.4m today</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00E0FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00E0FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 30% 20% / 0.5)" />
            <XAxis
              dataKey="time"
              stroke="hsl(200 15% 70%)"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              stroke="hsl(200 15% 70%)"
              fontSize={11}
              tickLine={false}
              domain={[0, 8]}
              tickFormatter={(value) => `${value}m`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222 47% 8% / 0.95)",
                border: "1px solid hsl(187 100% 45% / 0.3)",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{ color: "hsl(200 15% 70%)" }}
            />
            <Area
              type="monotone"
              dataKey="level"
              stroke="#00E0FF"
              strokeWidth={2}
              fill="url(#waterGradient)"
            />
            <Line
              type="monotone"
              dataKey="danger"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-secondary/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-secondary" />
          <span className="text-xs text-muted-foreground">Water Level</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-destructive border-dashed" style={{ borderTop: "2px dashed #ef4444" }} />
          <span className="text-xs text-muted-foreground">Danger Threshold</span>
        </div>
      </div>
    </motion.div>
  );
}
