"use client";

import React from "react";
import { QRScanner } from "@/components/QRScanner";

export default function QRValidationPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-background p-8">
            <h1 className="text-2xl font-bold text-foreground">
                QR Detection & Validation Demo
            </h1>
            <p className="text-sm text-muted-foreground text-center max-w-md">
                Scan the generated QR below to verify the site authenticity.
                Expected site ID: <strong>SITE_123</strong>
            </p>

            {/* 🔹 Integrated Scanner */}
            <QRScanner expectedSiteId="SITE_123" />

            {/* Optional helper note */}
            <div className="mt-8 text-xs text-muted-foreground text-center">
                Tip: open <code>verifiedQR.html</code> and scan the displayed QR to see a
                successful verification.
            </div>
        </div>
    );
}