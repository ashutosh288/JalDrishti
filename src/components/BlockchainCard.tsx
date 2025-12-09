import { motion } from "framer-motion";
import { Link2, Copy, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface BlockchainCardProps {
  recordId: string;
  timestamp: string;
  txHash: string;
  status: "verified" | "pending" | "failed";
}

export function BlockchainCard({ recordId, timestamp, txHash, status }: BlockchainCardProps) {
  const copyHash = () => {
    navigator.clipboard.writeText(txHash);
    toast({
      title: "Hash Copied",
      description: "Transaction hash copied to clipboard",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl border border-secondary/20 p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-secondary" />
          <h4 className="font-display text-sm font-semibold text-foreground">
            Blockchain Record
          </h4>
        </div>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1",
            status === "verified" && "bg-success/20 text-success",
            status === "pending" && "bg-warning/20 text-warning",
            status === "failed" && "bg-destructive/20 text-destructive"
          )}
        >
          {status === "verified" && <CheckCircle className="w-3 h-3" />}
          {status === "pending" && <Clock className="w-3 h-3" />}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Record ID</p>
          <p className="text-sm font-mono text-foreground">{recordId}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
          <p className="text-sm text-foreground">{timestamp}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-mono text-secondary truncate flex-1">{txHash}</p>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={copyHash}>
              <Copy className="w-3 h-3 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm" className="flex-1 border-secondary/30 text-secondary hover:bg-secondary/10">
          <CheckCircle className="w-4 h-4 mr-2" />
          Verify Integrity
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
