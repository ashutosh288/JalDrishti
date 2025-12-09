import { Heart, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm md:text-base">JalDrishti</h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              AI + AR powered smart water level monitoring for India's rivers. Building safer communities through technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm md:text-base">Quick Links</h3>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-secondary transition-colors">Dashboard</a></li>
              <li><a href="/ai-gauge" className="hover:text-secondary transition-colors">AI Gauge</a></li>
              <li><a href="/blockchain" className="hover:text-secondary transition-colors">Blockchain Logs</a></li>
              <li><a href="/community" className="hover:text-secondary transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm md:text-base">Contact</h3>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span className="break-all">support@jaldrishti.gov.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span>1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Government Initiative */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm md:text-base">Initiative</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-3">
              Smart India Hackathon 2025
            </p>
            <p className="text-xs text-muted-foreground">
              Developed for India's Digital Governance Vision
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              © 2025 JalDrishti. All rights reserved. | Government of India
            </p>
            <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1.5">
              Made with <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-destructive fill-destructive" /> by{" "}
              <span className="font-semibold text-foreground underline underline-offset-2 decoration-secondary">
                Team SwasthyaSutra
              </span>
            </p>
          </div>
          <p className="text-xs text-muted-foreground/70 text-center mt-3 md:mt-4">
            Smart India Hackathon 2025 | Building Digital India
          </p>
        </div>
      </div>
    </footer>
  );
}
