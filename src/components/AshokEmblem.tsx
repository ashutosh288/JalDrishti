interface AshokEmblemProps {
  size?: number;
}

export default function AshokEmblem({ size = 40 }: AshokEmblemProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className="opacity-80"
    >
      {/* Simplified Ashoka Emblem - Lion Capital Outline */}
      <g stroke="currentColor" strokeWidth="1.5" fill="none" className="text-secondary">
        {/* Base Platform */}
        <path d="M20 85 L80 85 L75 75 L25 75 Z" />
        
        {/* Abacus with Lions (simplified) */}
        <rect x="25" y="55" width="50" height="20" rx="2" />
        
        {/* Dharma Chakra (Ashoka Chakra) */}
        <circle cx="50" cy="65" r="8" />
        <g className="text-accent" stroke="currentColor">
          {[...Array(24)].map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x1 = 50 + 4 * Math.cos(angle);
            const y1 = 65 + 4 * Math.sin(angle);
            const x2 = 50 + 7 * Math.cos(angle);
            const y2 = 65 + 7 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.5" />;
          })}
        </g>
        
        {/* Lions (simplified as shapes) */}
        <ellipse cx="35" cy="45" rx="8" ry="12" />
        <ellipse cx="65" cy="45" rx="8" ry="12" />
        <ellipse cx="50" cy="40" rx="10" ry="15" />
        
        {/* Crown details */}
        <path d="M35 33 L35 28 M50 25 L50 20 M65 33 L65 28" strokeLinecap="round" />
      </g>
      
      {/* Satyameva Jayate text placeholder - small line */}
      <text
        x="50"
        y="95"
        textAnchor="middle"
        className="fill-muted-foreground"
        fontSize="6"
        fontFamily="serif"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
}
