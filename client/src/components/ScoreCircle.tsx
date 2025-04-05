interface ScoreCircleProps {
  score: number;
  label: string;
}

export default function ScoreCircle({ score, label }: ScoreCircleProps) {
  // Calculate the stroke dashoffset based on the score
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (score / 100) * circumference;
  
  // Determine score rating and colors
  const getScoreRating = () => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Great";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    if (score >= 50) return "Poor";
    return "Critical";
  };

  // Get gradient IDs and colors based on score
  const getGradientInfo = () => {
    if (score >= 80) {
      return {
        id: "greenGradient",
        from: "hsl(142, 76%, 45%)",
        to: "hsl(160, 84%, 39%)",
        text: "hsl(142, 76%, 45%)",
        darkText: "hsl(142, 76%, 55%)",
        bgColor: "rgba(34, 197, 94, 0.05)", // green bg
        ring: "rgba(34, 197, 94, 0.2)"
      };
    }
    if (score >= 60) {
      return {
        id: "amberGradient",
        from: "hsl(43, 96%, 50%)",
        to: "hsl(36, 100%, 45%)",
        text: "hsl(43, 96%, 50%)",
        darkText: "hsl(43, 96%, 60%)",
        bgColor: "rgba(245, 158, 11, 0.05)", // amber bg
        ring: "rgba(245, 158, 11, 0.2)"
      };
    }
    return {
      id: "redGradient",
      from: "hsl(0, 84%, 60%)",
      to: "hsl(350, 90%, 50%)",
      text: "hsl(0, 84%, 60%)",
      darkText: "hsl(0, 84%, 70%)",
      bgColor: "rgba(239, 68, 68, 0.05)", // red bg
      ring: "rgba(239, 68, 68, 0.2)"
    };
  };
  
  const gradientInfo = getGradientInfo();
  const scoreRating = getScoreRating();
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Light ring effect */}
      <div 
        className="absolute inset-0 rounded-full" 
        style={{ 
          background: `radial-gradient(circle, ${gradientInfo.bgColor} 10%, transparent 70%)` 
        }}
      />
      
      <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100">
        {/* Define gradients and filters */}
        <defs>
          <linearGradient id={gradientInfo.id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientInfo.from} />
            <stop offset="100%" stopColor={gradientInfo.to} />
          </linearGradient>
          
          <filter id="scoreGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={gradientInfo.ring} floodOpacity="0.8" />
          </filter>
        </defs>
        
        {/* Decorative small dots/ticks around the circle */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15) * (Math.PI / 180);
          const x = 50 + (radius + 6) * Math.cos(angle);
          const y = 50 + (radius + 6) * Math.sin(angle);
          
          return (
            <circle 
              key={i} 
              cx={x} 
              cy={y} 
              r="0.8" 
              fill={i % 6 === 0 ? gradientInfo.from : "#CBD5E1"}
              className={i % 6 === 0 ? "" : "dark:fill-gray-700"}
              opacity={i % 6 === 0 ? 1 : 0.5}
              aria-hidden="true"
            />
          );
        })}
        
        {/* Score circle background */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke="hsl(0, 0%, 92%)" 
          strokeWidth="10"
          aria-hidden="true"
          className="dark:stroke-gray-800/80"
        />
        
        {/* Score circle track (slightly thinner than background) */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius - 0.5} 
          fill="transparent" 
          stroke="hsl(0, 0%, 96%)" 
          strokeWidth="8"
          aria-hidden="true"
          className="dark:stroke-gray-700/50"
        />
        
        {/* Score circle foreground with gradient */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke={`url(#${gradientInfo.id})`}
          strokeWidth="10" 
          strokeDasharray={circumference} 
          strokeDashoffset={dashoffset} 
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          aria-hidden="true"
          filter="url(#scoreGlow)"
        />
        
        {/* Center circle with white background */}
        <circle
          cx="50"
          cy="50"
          r="32"
          fill="white"
          className="dark:fill-gray-900"
          aria-hidden="true"
          filter="url(#softShadow)"
        />
        
        {/* Score text */}
        <text 
          x="50" 
          y="42" 
          fontSize="22" 
          textAnchor="middle" 
          fill={gradientInfo.text}
          fontWeight="bold"
          aria-hidden="true"
          className={`drop-shadow-sm dark:fill-[${gradientInfo.darkText}]`}
        >
          {score}%
        </text>
        
        {/* Rating text */}
        <text 
          x="50" 
          y="56" 
          fontSize="11" 
          textAnchor="middle" 
          fill={gradientInfo.text}
          fontWeight="medium"
          aria-hidden="true"
          className={`dark:fill-[${gradientInfo.darkText}]`}
        >
          {scoreRating}
        </text>
        
        {/* Label text */}
        <text 
          x="50" 
          y="70" 
          fontSize="9" 
          textAnchor="middle" 
          fill="hsl(215, 14%, 45%)"
          fontWeight="normal"
          aria-hidden="true"
          className="dark:fill-gray-500"
        >
          {label}
        </text>
      </svg>
      
      {/* Screen reader text */}
      <div className="sr-only">Overall accessibility score: {score} percent. Rating: {scoreRating}</div>
    </div>
  );
}
