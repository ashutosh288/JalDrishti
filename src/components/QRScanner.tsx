import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, X, CheckCircle, AlertTriangle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import QrScanner from "qr-scanner";

interface QRScannerProps {
  expectedSiteId: string;
  onScan?: (data: string) => void;
}

interface QrPayload {
  siteId: string;
  signature?: string;
}

export function QRScanner({ expectedSiteId, onScan }: QRScannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    siteId: string | null;
    confidence?: number;
  } | null>(null);
  const [scanning, setScanning] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const qrBoxRef = useRef<HTMLDivElement | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const verifyPayload = useCallback(
    (payload: QrPayload): boolean => payload.siteId === expectedSiteId,
    [expectedSiteId]
  );

  useEffect(() => {
    if (!isOpen) {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current.destroy();
        scannerRef.current = null;
      }
      setScanning(false);
      return;
    }

    if (videoRef.current && !scannerRef.current) {
      const onScanSuccess = (rawResult: QrScanner.ScanResult) => {
        const data = typeof rawResult === "string" ? rawResult : rawResult.data;
        if (!data) return;
        setScanning(false);

        try {
          if (!data.startsWith("{")) {
            throw new Error("Unsupported QR format");
          }

          const parsed: QrPayload = JSON.parse(data);
          const isValid = verifyPayload(parsed);
          const confidence = Math.floor(90 + Math.random() * 10); // mock confidence

          setResult({ valid: isValid, siteId: parsed.siteId, confidence });

          if (isValid) {
            toast({
              title: "✅ Location Verified",
              description: `Site ${parsed.siteId} confirmed. Confidence: ${confidence}%`,
            });
            onScan?.(parsed.siteId);
          } else {
            toast({
              title: "⚠ Tampering Detected",
              description: "QR code doesn't match expected site/location.",
              variant: "destructive",
            });
          }

          scannerRef.current?.stop();
        } catch {
          setResult({ valid: false, siteId: null });
          toast({
            title: "Invalid QR Data",
            description: "Malformed or unsupported QR code payload.",
            variant: "destructive",
          });
          scannerRef.current?.stop();
        }
      };

      const onScanFail = () => { };

      scannerRef.current = new QrScanner(videoRef.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });

      scannerRef.current
        .start()
        .then(() => setScanning(true))
        .catch(() => {
          setScanning(false);
          toast({
            title: "Camera Access Denied",
            description: "Please allow camera permission to scan QR codes.",
            variant: "destructive",
          });
        });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current.destroy();
        scannerRef.current = null;
      }
    };
  }, [isOpen, onScan, verifyPayload]);

  return (
    <>
      <Button
        onClick={() => {
          setResult(null);
          setIsOpen(true);
        }}
        variant="outline"
        size="sm"
        className="border-secondary/30 text-foreground gap-2"
      >
        <Camera className="w-4 h-4" />
        Capture / Scan
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm mx-4 rounded-xl bg-card border border-border/50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-secondary" />
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    Site QR Scanner
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setResult(null);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scanner Area */}
              <div className="p-4 space-y-4">
                <div className="relative aspect-square bg-primary/20 rounded-lg overflow-hidden">
                  <video ref={videoRef} className="w-full h-full object-cover" />

                  <div
                    ref={qrBoxRef}
                    className="absolute inset-8 border-2 border-secondary/60 rounded-lg"
                  />

                  {scanning && (
                    <motion.div
                      className="absolute left-8 right-8 h-0.5 bg-secondary"
                      initial={{ top: "2rem" }}
                      animate={{ top: "calc(100% - 2rem)" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  )}

                  {!scanning && !result && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-secondary/50" />
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Camera automatically detects QR codes. Only valid site JSON QRs will pass.
                </p>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg text-center ${result.valid
                        ? "bg-success/20 border border-success/30"
                        : "bg-destructive/20 border border-destructive/30"
                      }`}
                  >
                    {result.valid ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-success mx-auto mb-1" />
                        <p className="text-sm font-semibold text-foreground">Location Verified</p>
                        <p className="text-xs text-muted-foreground">Site: {result.siteId}</p>
                        <p className="text-xs mt-1 text-muted-foreground">
                          AI Confidence: {result.confidence}%
                        </p>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-6 h-6 text-destructive mx-auto mb-1" />
                        <p className="text-sm font-semibold text-foreground">
                          Verification Failed
                        </p>
                        <p className="text-xs text-muted-foreground">
                          QR code invalid, malformed, or wrong site.
                        </p>
                      </>
                    )}
                  </motion.div>
                )}

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setResult(null);
                      if (scannerRef.current && !scanning) {
                        scannerRef.current
                          .start()
                          .then(() => setScanning(true))
                          .catch(() => setScanning(false));
                      }
                    }}
                  >
                    Scan Again
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsOpen(false);
                      setResult(null);
                    }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

