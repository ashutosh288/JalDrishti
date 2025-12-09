import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Camera,
  MapPin,
  CheckCircle,
  Clock,
  Shield,
  Globe,
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function PublicPortal() {
  const [uploaded, setUploaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trustScore, setTrustScore] = useState(0);

  const handleUpload = () => {
    setUploaded(true);
    // Simulate AI trust score calculation
    setTimeout(() => {
      setTrustScore(78);
    }, 1500);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Report Submitted ✅",
        description: "Your report is awaiting supervisor review",
      });
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 mb-4">
            <Globe className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary">Public Portal</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Citizen <span className="text-secondary text-glow-cyan">Water Report</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Help monitor water levels in your area. Submit photos for AI verification.
          </p>
        </motion.div>

        {/* Upload Section */}
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl border border-secondary/20 p-6"
          >
            {!uploaded ? (
              <>
                {/* Upload Area */}
                <div
                  onClick={handleUpload}
                  className="border-2 border-dashed border-secondary/30 rounded-xl p-12 text-center hover:border-secondary/50 transition-colors cursor-pointer"
                >
                  <Camera className="w-16 h-16 text-secondary/50 mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Upload Water Level Photo
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tap to capture or upload from gallery
                  </p>
                  <Button className="bg-secondary hover:bg-secondary/90">
                    <Camera className="w-4 h-4 mr-2" />
                    Open Camera
                  </Button>
                </div>

                {/* GPS Info */}
                <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-success/10 border border-success/30 rounded-lg">
                  <MapPin className="w-4 h-4 text-success" />
                  <span className="text-sm text-foreground">
                    Auto GPS detection enabled
                  </span>
                  <span className="text-xs text-success ml-auto">Active</span>
                </div>
              </>
            ) : (
              <>
                {/* Uploaded Preview */}
                <div className="aspect-video bg-primary/30 rounded-lg mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-success mx-auto mb-2" />
                      <p className="text-sm text-foreground">Photo uploaded</p>
                    </div>
                  </div>
                </div>

                {/* GPS Detection */}
                <div className="flex items-center gap-2 px-4 py-3 bg-success/10 border border-success/30 rounded-lg mb-4">
                  <MapPin className="w-4 h-4 text-success" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Location Detected</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      28.6139°N, 77.2090°E • Yamuna River, Delhi
                    </p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>

                {/* AI Trust Score */}
                <div className="glass rounded-xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-secondary" />
                      <span className="text-sm font-semibold text-foreground">
                        AI Trust Score
                      </span>
                    </div>
                    {trustScore > 0 && (
                      <span
                        className={cn(
                          "text-lg font-display font-bold",
                          trustScore >= 80 ? "text-success" : trustScore >= 60 ? "text-warning" : "text-destructive"
                        )}
                      >
                        {trustScore}%
                      </span>
                    )}
                  </div>

                  {trustScore === 0 ? (
                    <div className="flex items-center justify-center py-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock className="w-6 h-6 text-secondary" />
                      </motion.div>
                      <span className="ml-2 text-sm text-muted-foreground">
                        Analyzing image...
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${trustScore}%` }}
                          transition={{ duration: 1 }}
                          className={cn(
                            "h-full rounded-full",
                            trustScore >= 80 ? "bg-success" : trustScore >= 60 ? "bg-warning" : "bg-destructive"
                          )}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {trustScore >= 80
                          ? "High quality submission - ready for review"
                          : trustScore >= 60
                          ? "Acceptable quality - may require additional verification"
                          : "Low quality - please retake photo with better visibility"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || trustScore === 0}
                  className="w-full h-12 bg-gradient-to-r from-secondary to-accent text-secondary-foreground font-display font-semibold"
                >
                  {submitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              </>
            )}
          </motion.div>
        ) : (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-xl border border-success/50 p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
            >
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            </motion.div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              Submitted Successfully!
            </h2>
            <p className="text-muted-foreground mb-6">
              Your report is now awaiting supervisor review. Thank you for contributing to water
              monitoring in your community.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/30 rounded-lg">
              <Clock className="w-4 h-4 text-warning" />
              <span className="text-sm text-warning">Pending Review</span>
            </div>

            <div className="mt-6 p-4 bg-card/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Submission ID</p>
              <p className="font-mono text-sm text-foreground">PUB-2024-08472</p>
            </div>

            <Button
              variant="outline"
              className="mt-6 border-secondary/30"
              onClick={() => {
                setUploaded(false);
                setSubmitted(false);
                setTrustScore(0);
              }}
            >
              Submit Another Report
            </Button>
          </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl border border-secondary/20 p-5"
        >
          <h3 className="font-display text-sm font-semibold text-foreground mb-3">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: 1, title: "Upload Photo", desc: "Take a clear photo of the water level marker" },
              { step: 2, title: "AI Analysis", desc: "Our AI verifies and scores your submission" },
              { step: 3, title: "Review & Log", desc: "Supervisors verify and log to blockchain" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary font-display font-bold flex items-center justify-center mx-auto mb-2">
                  {item.step}
                </div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
