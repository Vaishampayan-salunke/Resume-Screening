import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', style = {}, onClick, hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl ${hover ? 'cursor-pointer transition-all hover:-translate-y-0.5' : ''} ${className}`}
      style={{
        background: '#fff',
        border: '1px solid #E5E8E6',
        boxShadow: '0 1px 3px rgba(32,39,35,0.06), 0 4px 16px rgba(23,76,60,0.03)',
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  color?: string;
  trend?: { value: string; positive: boolean };
}

export function StatCard({ label, value, sub, icon, color = '#174C3C', trend }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium mb-1" style={{ color: '#9BA5A0' }}>{label}</div>
          <div className="text-2xl font-bold" style={{ color: '#202723', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
            {value}
          </div>
          {sub && <div className="text-xs mt-1" style={{ color: '#9BA5A0' }}>{sub}</div>}
          {trend && (
            <div className="flex items-center gap-1 mt-1.5">
              <span className="text-xs font-medium" style={{ color: trend.positive ? '#174C3C' : '#D97706' }}>
                {trend.positive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs" style={{ color: '#9BA5A0' }}>vs last week</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}14` }}
          >
            <div style={{ color }}>{icon}</div>
          </div>
        )}
      </div>
    </Card>
  );
}
