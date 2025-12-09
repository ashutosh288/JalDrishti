import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Zap, Loader2, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppData } from "@/contexts/DataContext";
import { toast } from "@/hooks/use-toast";

const suggestions = [
  "Verify hash",
  "Submit reading",
  "Check alerts",
  "View drone status",
];

const responses: Record<string, string> = {
  "verify hash": "To verify a blockchain hash, go to the Evidence page and click 'Verify Integrity'. The system will validate the hash against the blockchain ledger.",
  "submit reading": "Navigate to AI-AR Gauge page, capture an image using the camera, and click 'Submit Reading' to log your water level measurement securely.",
  "check alerts": "Current alerts: 1 Critical (Brahmaputra), 2 Warnings (Krishna, Mahanadi). Visit the Alerts page for detailed information.",
  "view drone status": "Drone verification is coming soon! This feature will enable AI-based drone images for remote site validation.",
  "default": "I can help you with water level monitoring, blockchain verification, alerts, and more. Try asking about hash verification or submitting readings.",
};

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "👋 Hello! I'm JalBot, your AI assistant. How can I help you today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { data } = useAppData();
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        handleSend(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice input error",
          description: "Could not process voice input. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak now",
      });
    }
  };

  const handleSend = (text?: string) => {
    const msgText = text || message;
    if (!msgText.trim()) return;

    setChat((prev) => [...prev, { role: "user", text: msgText }]);
    setMessage("");
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      const lowerMsg = msgText.toLowerCase();
      let response = responses.default;
      
      for (const key in responses) {
        if (lowerMsg.includes(key)) {
          response = responses[key];
          break;
        }
      }

      // Add dynamic data
      if (lowerMsg.includes("site") || lowerMsg.includes("status")) {
        const criticalSites = data?.monitoringSites.filter(s => s.status === "critical").length || 0;
        response = `Currently monitoring ${data?.stats.activeSites || 247} sites. ${criticalSites} site(s) in critical status. Check the dashboard for live updates.`;
      }

      setChat((prev) => [...prev, { role: "bot", text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 left-[300px] z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="absolute bottom-14 left-0 w-72 rounded-xl bg-card border border-border/50 overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="bg-secondary/10 p-3 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xs font-semibold text-foreground">
                      JalBot
                    </h3>
                    <p className="text-[10px] text-accent">AI Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="h-56 p-3 overflow-y-auto space-y-2">
              {chat.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${
                    msg.role === "user"
                      ? "ml-auto bg-secondary/20 text-foreground"
                      : "bg-card border border-border/50 text-foreground"
                  } rounded-lg p-2 max-w-[85%]`}
                >
                  <p className="text-xs">{msg.text}</p>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-[10px]">JalBot is typing...</span>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="px-3 pb-2">
              <div className="flex flex-wrap gap-1">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="text-[10px] px-2 py-1 rounded-full bg-secondary/10 border border-border/50 text-secondary hover:bg-secondary/20 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-2 border-t border-border/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Type or speak..."}
                  className="flex-1 h-8 bg-card/50 border-border/50 text-xs"
                  disabled={isListening}
                />
                <Button
                  type="button"
                  size="icon"
                  variant={isListening ? "destructive" : "outline"}
                  className={`h-8 w-8 ${isListening ? "animate-pulse" : ""}`}
                  onClick={toggleVoiceInput}
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="h-8 w-8 bg-secondary hover:bg-secondary/90"
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-4 h-4 text-secondary" />
      </motion.button>
    </div>
  );
}
