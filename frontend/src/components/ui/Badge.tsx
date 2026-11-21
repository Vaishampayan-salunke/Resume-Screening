interface BadgeProps {
  label: string;
  variant?: 'matched' | 'partial' | 'missing' | 'critical' | 'high' | 'medium' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
}

const BADGE_STYLES = {
  matched: { bg: '#DCE9DF', color: '#174C3C', border: '#C6DACB' },
  partial: { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' },
  missing: { bg: '#FEE2E2', color: '#991B1B', border: '#FECACA' },
  critical: { bg: '#FEE2E2', color: '#991B1B', border: '#FECACA' },
  high: { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' },
  medium: { bg: '#F0F5F1', color: '#3A5944', border: '#C6DACB' },
  neutral: { bg: '#F8F8F4', color: '#727A75', border: '#E5E8E6' },
};

export function SkillBadge({ label, variant = 'neutral', size = 'sm', dot = false }: BadgeProps) {
  const style = BADGE_STYLES[variant] || BADGE_STYLES.neutral;
  const fontSize = size === 'sm' ? '11px' : '13px';
  const padding = size === 'sm' ? '2px 8px' : '4px 12px';

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-medium"
      style={{
        fontSize,
        padding,
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        lineHeight: 1.5,
      }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: style.color }}
        />
      )}
      {label}
    </span>
  );
}

interface FitBadgeProps {
  category: 'Good Fit' | 'Potential Fit' | 'Low Fit' | string;
}

export function FitBadge({ category }: FitBadgeProps) {
  const map: Record<string, { bg: string; color: string; border: string }> = {
    'Good Fit': { bg: '#DCE9DF', color: '#174C3C', border: '#C6DACB' },
    'Potential Fit': { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' },
    'Low Fit': { bg: '#FEE2E2', color: '#991B1B', border: '#FECACA' },
  };
  const s = map[category] || map['Potential Fit'];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
      {category}
    </span>
  );
}

export function ImportanceBadge({ importance }: { importance: string }) {
  const variant = importance === 'Critical' ? 'critical' : importance === 'High' ? 'high' : 'medium';
  return <SkillBadge label={importance} variant={variant} dot />;
}
