import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  Scan,
  CheckCircle,
  AlertTriangle,
  Sliders,
  Link2,
  Eye,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { GPSStatusIndicator } from "@/components/dashboard/GPSStatusIndicator";
import { QRScanner } from "@/components/QRScanner";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AIGauge() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(false);
  const [aiConfidence, setAiConfidence] = useState(87);
  const [manualAdjust, setManualAdjust] = useState(false);
  const [waterLevel, setWaterLevel] = useState([5.2]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setCapturedImage(true);
      toast({
        title: "Image Captured",
        description: "AI analysis in progress...",
      });
    }, 2000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Reading Securely Logged ✅",
        description: "Blockchain Hash: 0x7f8e...3a2b",
      });
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            AI + AR <span className="text-secondary text-glow-cyan">Gauge Overlay</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Capture water level readings with AI-powered AR overlay detection
          </p>
        </motion.div>

        {/* GPS Status */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <GPSStatusIndicator
              isInsideGeofence={true}
              accuracy={8}
              coordinates={{ lat: 28.6139, lng: 77.209 }}
            />
          </div>
          <QRScanner onScan={(siteId) => toast({ title: "Site Verified", description: `Site ${siteId} confirmed` })} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AR Camera Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-xl border border-secondary/20 overflow-hidden"
          >
            <div className="p-4 border-b border-secondary/20">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-secondary" />
                <h3 className="font-display text-sm font-semibold text-foreground">
                  AR Camera Preview
                </h3>
              </div>
            </div>

            {/* Camera View */}
            <div className="relative aspect-[4/3] bg-primary/50">
              {/* AR Lens Effect Border */}
              <div className="absolute inset-4 rounded-xl border-2 border-secondary/50 animate-pulse-glow">
                {/* Corner Markers */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-accent" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-accent" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-accent" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-accent" />
              </div>

              {/* Water Level Line */}
              {capturedImage && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute left-8 right-8 top-1/2 -translate-y-1/2"
                >
                  <div className="h-0.5 bg-accent glow-lime" />
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-accent text-accent-foreground text-xs font-mono rounded">
                    {waterLevel[0]}m
                  </div>
                </motion.div>
              )}

              {/* Ripple Water Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Scanning Animation */}
              {isCapturing && (
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent"
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2, ease: "linear" }}
                />
              )}

              {/* Placeholder Text */}
              {!capturedImage && !isCapturing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-secondary/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Point camera at gauge marker
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Capture Buttons */}
            <div className="p-4 flex gap-3">
              <Button
                onClick={handleCapture}
                disabled={isCapturing}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                {isCapturing ? (
                  <>
                    <Scan className="w-4 h-4 mr-2 animate-spin" />
                    Capturing...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Capture
                  </>
                )}
              </Button>
              <Button variant="outline" className="border-secondary/30 text-foreground">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </motion.div>

          {/* AI Analysis Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* AI Confidence */}
            <div className="glass-card rounded-xl border border-secondary/20 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm font-semibold text-foreground">
                  AI Detection Results
                </h3>
                {capturedImage && (
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1",
                      aiConfidence >= 80
                        ? "bg-success/20 text-success"
                        : "bg-warning/20 text-warning"
                    )}
                  >
                    {aiConfidence >= 80 ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    AI Tamper Scan: {aiConfidence >= 80 ? "Passed" : "Warning"}
                  </span>
                )}
              </div>

              {/* Confidence Ring */}
              <div className="flex items-center justify-center my-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted/30"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#aiGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 352" }}
                      animate={{
                        strokeDasharray: capturedImage
                          ? `${(aiConfidence / 100) * 352} 352`
                          : "0 352",
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00E0FF" />
                        <stop offset="100%" stopColor="#B8F94B" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-display font-bold text-secondary">
                      {capturedImage ? aiConfidence : "--"}%
                    </span>
                    <span className="text-xs text-muted-foreground">Confidence</span>
                  </div>
                </div>
              </div>

              {/* Detected Values */}
              {capturedImage && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Detected Level</p>
                    <p className="text-lg font-display font-bold text-foreground">
                      {waterLevel[0]}m
                    </p>
                  </div>
                  <div className="bg-card/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">Site Status</p>
                    <p className="text-lg font-display font-bold text-warning">Warning</p>
                  </div>
                </div>
              )}
            </div>

            {/* Manual Adjustment */}
            {capturedImage && aiConfidence < 80 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="glass-card rounded-xl border border-warning/30 p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-warning" />
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      Manual Adjustment
                    </h3>
                  </div>
                  <span className="text-xs text-warning">Low confidence detected</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Adjust water level reading
                    </p>
                    <Slider
                      value={waterLevel}
                      onValueChange={setWaterLevel}
                      min={0}
                      max={10}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0m</span>
                      <span className="text-accent font-semibold">{waterLevel[0]}m</span>
                      <span>10m</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            {capturedImage && !submitted && (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-secondary to-accent text-secondary-foreground font-display font-semibold"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Link2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <Link2 className="w-5 h-5 mr-2" />
                    Submit Reading to Blockchain
                  </>
                )}
              </Button>
            )}

            {/* Success State */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-xl border border-success/50 p-5 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                </motion.div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  Reading Securely Logged
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Immutable proof stored on blockchain
                </p>
                <div className="bg-card/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                  <p className="font-mono text-sm text-secondary">
                    0x7f8e9d2c1b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e...3a2b
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
