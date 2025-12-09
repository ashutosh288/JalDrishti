import { useState } from "react";
import { motion } from "framer-motion";
import {
  Link2,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  RefreshCw,
  Download,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const blockchainRecords = [
  {
    id: "REC-2024-00847",
    siteId: "YAM-DEL-001",
    siteName: "Yamuna - Delhi",
    timestamp: "2024-01-15 14:32:05",
    hash: "0x7f8e9d2c1b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e",
    status: "verified",
    userId: "FW-2847",
    waterLevel: "5.2m",
  },
  {
    id: "REC-2024-00846",
    siteId: "GNG-VAR-003",
    siteName: "Ganga - Varanasi",
    timestamp: "2024-01-15 13:45:22",
    hash: "0x3a2b1c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    status: "verified",
    userId: "FW-1923",
    waterLevel: "4.8m",
  },
  {
    id: "REC-2024-00845",
    siteId: "BRM-GUW-002",
    siteName: "Brahmaputra - Guwahati",
    timestamp: "2024-01-15 12:18:47",
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    status: "pending",
    userId: "FW-3421",
    waterLevel: "6.1m",
  },
  {
    id: "REC-2024-00844",
    siteId: "GDV-NSK-004",
    siteName: "Godavari - Nashik",
    timestamp: "2024-01-15 11:52:33",
    hash: "0x9f8e7d6c5b4a3210fedcba9876543210abcdef12",
    status: "failed",
    userId: "FW-0891",
    waterLevel: "3.4m",
  },
  {
    id: "REC-2024-00843",
    siteId: "KRS-VJW-005",
    siteName: "Krishna - Vijayawada",
    timestamp: "2024-01-15 10:30:15",
    hash: "0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d",
    status: "verified",
    userId: "FW-5672",
    waterLevel: "4.2m",
  },
];

export default function Blockchain() {
  const [autoVerify, setAutoVerify] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
              Blockchain <span className="text-secondary text-glow-cyan">Log Viewer</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Immutable record verification and audit trail
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={autoVerify} onCheckedChange={setAutoVerify} />
              <span className="text-sm text-muted-foreground">Auto-verify (10 min)</span>
            </div>
            <Button variant="outline" className="border-secondary/30">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Records", value: "12,847", icon: Link2, color: "secondary" },
            { label: "Verified", value: "12,621", icon: CheckCircle, color: "success" },
            { label: "Pending", value: "198", icon: Clock, color: "warning" },
            { label: "Failed", value: "28", icon: XCircle, color: "destructive" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl border border-secondary/20 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={cn("w-8 h-8", `text-${stat.color}`)} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl border border-secondary/20 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID, hash, or site..."
                  className="pl-10 bg-card/50 border-secondary/20"
                />
              </div>
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-card/50 border-secondary/20">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-card/50 border-secondary/20">
                <SelectValue placeholder="Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="yamuna">Yamuna</SelectItem>
                <SelectItem value="ganga">Ganga</SelectItem>
                <SelectItem value="brahmaputra">Brahmaputra</SelectItem>
              </SelectContent>
            </Select>

            <Input type="date" className="w-40 bg-card/50 border-secondary/20" />

            <Button variant="outline" className="border-secondary/30">
              <Filter className="w-4 h-4 mr-2" />
              Apply
            </Button>
          </div>
        </div>

        {/* Records Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl border border-secondary/20 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary/20 bg-card/50">
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Record ID
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Site
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Water Level
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Hash
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {blockchainRecords.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-secondary/10 hover:bg-card/30 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-mono text-sm text-foreground">{record.id}</p>
                      <p className="text-xs text-muted-foreground">{record.userId}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-foreground">{record.siteName}</p>
                      <p className="text-xs text-muted-foreground font-mono">{record.siteId}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-foreground">{record.timestamp}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-semibold text-secondary">{record.waterLevel}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-mono text-xs text-secondary truncate max-w-[150px]">
                        {record.hash}
                      </p>
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                          record.status === "verified" && "bg-success/20 text-success",
                          record.status === "pending" && "bg-warning/20 text-warning",
                          record.status === "failed" && "bg-destructive/20 text-destructive"
                        )}
                      >
                        {record.status === "verified" && <CheckCircle className="w-3 h-3" />}
                        {record.status === "pending" && <Clock className="w-3 h-3" />}
                        {record.status === "failed" && <XCircle className="w-3 h-3" />}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {record.status !== "verified" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <RefreshCw className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-secondary/20">
            <p className="text-sm text-muted-foreground">
              Showing 1-5 of 12,847 records
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-secondary/30" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="border-secondary/30">
                Next
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
