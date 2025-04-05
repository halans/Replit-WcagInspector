interface ScoreCircleProps {
  score: number;
  label: string;
}

export default function ScoreCircle({ score, label }: ScoreCircleProps) {
  // Calculate the stroke dashoffset based on the score
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (score / 100) * circumference;
  
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 80) return "hsl(142, 76%, 36%)"; // green-600
    if (score >= 60) return "hsl(43, 96%, 50%)";  // amber-400
    return "hsl(0, 84%, 60%)";                    // red-500
  };
  
  return (
    <div className="relative w-full h-full">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Score circle background */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke="hsl(0, 0%, 90%)" 
          strokeWidth="8"
          aria-hidden="true"
          className="dark:stroke-gray-700"
        />
        {/* Score circle foreground */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          fill="transparent" 
          stroke={getScoreColor()} 
          strokeWidth="8" 
          strokeDasharray={circumference} 
          strokeDashoffset={dashoffset} 
          transform="rotate(-90 50 50)"
          aria-hidden="true"
        />
        <text 
          x="50" 
          y="45" 
          fontSize="18" 
          textAnchor="middle" 
          fill="hsl(0, 0%, 7%)" 
          fontWeight="bold"
          aria-hidden="true"
          className="dark:fill-white"
        >
          {score}%
        </text>
        <text 
          x="50" 
          y="65" 
          fontSize="10" 
          textAnchor="middle" 
          fill="hsl(215, 14%, 46%)"
          aria-hidden="true"
          className="dark:fill-gray-400"
        >
          {label}
        </text>
      </svg>
      
      {/* Screen reader text */}
      <div className="sr-only">Overall accessibility score: {score} percent</div>
    </div>
  );
}
