interface ProgressBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  size?: 'sm' | 'md';
  showValue?: boolean;
}

export default function ProgressBar({ label, value, max = 100, color = '#174C3C', size = 'md', showValue = true }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  const trackH = size === 'sm' ? 4 : 6;
  const displayColor = value >= 75 ? '#174C3C' : value >= 50 ? '#D97706' : '#DC2626';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium" style={{ color: '#3A4440' }}>{label}</span>
        {showValue && (
          <span className="text-xs font-semibold" style={{ color: displayColor }}>
            {Math.round(value)}%
          </span>
        )}
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: trackH, background: '#F0F5F1' }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: color || displayColor,
            transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
    </div>
  );
}
