interface ScoreDialProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export default function ScoreDial({ score, size = 160, strokeWidth = 12, label, sublabel }: ScoreDialProps) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;
  const gap = circumference - filled;

  const color = score >= 75 ? '#174C3C' : score >= 50 ? '#D97706' : '#DC2626';
  const trackColor = score >= 75 ? '#DCE9DF' : score >= 50 ? '#FEF3C7' : '#FEE2E2';

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={trackColor} strokeWidth={strokeWidth}
          />
          {/* Fill */}
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${gap}`}
            style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        {/* Center text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ top: 0, left: 0 }}
        >
          <div
            className="text-3xl font-bold"
            style={{ color: '#202723', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif' }}
          >
            {Math.round(score)}%
          </div>
          {label && (
            <div className="text-xs font-medium mt-0.5" style={{ color }}>
              {label}
            </div>
          )}
        </div>
      </div>
      {sublabel && (
        <div className="text-sm text-center" style={{ color: '#727A75' }}>{sublabel}</div>
      )}
    </div>
  );
}
