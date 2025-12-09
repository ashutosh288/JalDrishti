import { motion } from "framer-motion";

interface JalDrishtiLogoProps {
  size?: number;
  animated?: boolean;
}

export default function JalDrishtiLogo({ size = 48, animated = true }: JalDrishtiLogoProps) {
  return (
    <motion.div
      initial={animated ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Glow Ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#glowGradient)"
          strokeWidth="2"
          fill="none"
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Water Drop / Eye Shape */}
        <motion.path
          d="M50 15C50 15 25 45 25 60C25 75 36 85 50 85C64 85 75 75 75 60C75 45 50 15 50 15Z"
          fill="url(#waterGradient)"
          initial={animated ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* AI Eye Iris */}
        <motion.circle
          cx="50"
          cy="58"
          r="12"
          fill="url(#irisGradient)"
          initial={animated ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4, type: "spring" }}
        />

        {/* Eye Pupil with AR Effect */}
        <motion.circle
          cx="50"
          cy="58"
          r="5"
          fill="#020817"
          initial={animated ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        />

        {/* AR Scan Lines */}
        <motion.g
          initial={animated ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.line
            x1="38"
            y1="58"
            x2="62"
            y2="58"
            stroke="#B8F94B"
            strokeWidth="1"
            strokeDasharray="2 2"
            animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.line
            x1="50"
            y1="46"
            x2="50"
            y2="70"
            stroke="#B8F94B"
            strokeWidth="1"
            strokeDasharray="2 2"
            animate={animated ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </motion.g>

        {/* Wave Pattern at Bottom */}
        <motion.path
          d="M30 75 Q40 70 50 75 Q60 80 70 75"
          stroke="#00E0FF"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={animated ? { d: ["M30 75 Q40 70 50 75 Q60 80 70 75", "M30 75 Q40 80 50 75 Q60 70 70 75", "M30 75 Q40 70 50 75 Q60 80 70 75"] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E0FF" />
            <stop offset="50%" stopColor="#B8F94B" />
            <stop offset="100%" stopColor="#00E0FF" />
          </linearGradient>
          <linearGradient id="waterGradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0A2540" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E0FF" />
            <stop offset="100%" stopColor="#0A2540" />
          </radialGradient>
        </defs>
      </svg>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={animated ? {
          boxShadow: [
            "0 0 20px rgba(0, 224, 255, 0.3)",
            "0 0 40px rgba(0, 224, 255, 0.5)",
            "0 0 20px rgba(0, 224, 255, 0.3)",
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
