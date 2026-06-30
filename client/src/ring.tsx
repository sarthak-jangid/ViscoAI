type ScoreRingProps = {
  score: number;
};

export function ScoreRing({ score }: ScoreRingProps) {
  const radius = 26;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;

  const safeScore = Math.min(Math.max(score, 0), 100);

  const strokeDashoffset =
    circumference - (safeScore / 100) * circumference;

  // Decide colors based on ATS score
  let startColor = "#ef4444"; // Red
  let endColor = "#dc2626";

  if (safeScore >= 80) {
    startColor = "#22c55e"; // Green
    endColor = "#16a34a";
  } else if (safeScore >= 60) {
    startColor = "#eab308"; // Yellow
    endColor = "#facc15";
  } else if (safeScore >= 40) {
    startColor = "#f97316"; // Orange
    endColor = "#ea580c";
  }

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 64 64"
      className="-rotate-90"
    >
      {/* Background */}
      <circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={stroke}
      />

      {/* Progress */}
      <circle
        cx="32"
        cy="32"
        r={radius}
        fill="none"
        stroke="url(#scoreGradient)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className="transition-all duration-700 ease-out"
      />

      {/* Score */}
      <text
        x="31.5"
        y="34"
        textAnchor="middle"
        dominantBaseline="middle"
        transform="rotate(90 32 32)"
        fill={endColor}
        fontSize="19.5"
        fontWeight="700"
      >
        {safeScore}
      </text>

      {/* Dynamic Gradient */}
      <defs>
        <linearGradient
          id="scoreGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
    </svg>
  );
}