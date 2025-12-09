import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  Image,
  Layers,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  Shield,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { TrustMeter } from "@/components/dashboard/TrustMeter";
import { toast } from "@/hooks/use-toast";

export default function Evidence() {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      toast({
        title: "Hash Verified ✅",
        description: "Evidence integrity confirmed on blockchain",
      });
    }, 2000);
  };

  const copyHash = () => {
    navigator.clipboard.writeText("0x7f8e9d2c1b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e3a2b");
    toast({
      title: "Hash Copied",
      description: "Transaction hash copied to clipboard",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            Tamper-Proof <span className="text-secondary text-glow-cyan">Dual Evidence</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            View paired evidence with blockchain verification
          </p>
        </motion.div>

        {/* Dual Evidence Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Captured Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-xl border border-secondary/20 overflow-hidden"
          >
            <div className="p-4 border-b border-secondary/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Captured Image
                </h3>
              </div>
              <span className="text-xs text-muted-foreground">Original Photo</span>
            </div>

            <div className="aspect-video bg-primary/30 relative overflow-hidden">
              {/* Sample Field Capture Image - Ganga River Scene */}
              <img 
                src="/images/ganga-river.jpg"
                alt="Field capture - Ganga river at Varanasi ghat with water level monitoring markers"
                className="w-full h-full object-cover"
              />

              {/* Burned Metadata */}
              <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm rounded px-2 py-1">
                <p className="text-xs font-mono text-foreground">
                  2024-01-15 14:32:05 IST
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  28.6139°N, 77.2090°E
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  ID: FW-2847
                </p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>GPS coordinates hard-burned on image</span>
              </div>
            </div>
          </motion.div>

          {/* AR Overlay Snapshot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-xl border border-accent/30 overflow-hidden"
          >
            <div className="p-4 border-b border-accent/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  AR Overlay Snapshot
                </h3>
              </div>
              <span className="text-xs text-accent">AI Processed</span>
            </div>

            <div className="aspect-video bg-primary/30 relative overflow-hidden">
              {/* AR Overlay Snapshot - Enhanced with AI Detection */}
              <img 
                src="/images/ganga-ar-overlay.jpg"
                alt="AR Overlay - AI-powered water level detection on Ganga river with measurement indicators"
                className="w-full h-full object-cover"
              />

              {/* AR Detection Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute left-8 right-8 top-1/2 -translate-y-1/2"
              >
                <div className="h-1 bg-accent glow-lime rounded-full" />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-accent text-accent-foreground text-xs font-mono font-bold rounded">
                  5.2m
                </div>
              </motion.div>

              {/* AI Confidence Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-success/20 border border-success/50 rounded-full">
                <span className="text-xs font-semibold text-success">AI: 87%</span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4 text-accent" />
                <span>AI-detected water level with AR overlay</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hash Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-xl border border-secondary/20 p-5"
            >
              <div className="flex items-center gap-2 mb-6">
                <FileCheck className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  Blockchain Record Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-card/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Record ID</p>
                  <p className="font-mono text-sm text-foreground">REC-2024-00847</p>
                </div>
                <div className="bg-card/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                  <p className="text-sm text-foreground">2024-01-15 14:32:05 IST</p>
                </div>
                <div className="bg-card/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Site Location</p>
                  <p className="text-sm text-foreground">Ganga - Varanasi</p>
                </div>
              </div>

              <div className="bg-card/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">Blockchain Transaction Hash</p>
                  <Button variant="ghost" size="sm" onClick={copyHash} className="h-6 px-2">
                    <Copy className="w-3 h-3 mr-1" />
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
                <p className="font-mono text-sm text-secondary break-all">
                  0x7f8e9d2c1b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e3a2b
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleVerify}
                  disabled={verifying}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  {verifying ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : verified ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verified ✓
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Verify Integrity
                    </>
                  )}
                </Button>
                <Button variant="outline" className="border-secondary/30">
                  <Clock className="w-4 h-4 mr-2" />
                  View Audit Trail
                </Button>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Trust Meter */}
          <TrustMeter aiConfidence={87} blockchainValid={verified} droneVerified={false} />
        </div>
      </div>
    </MainLayout>
  );
}
