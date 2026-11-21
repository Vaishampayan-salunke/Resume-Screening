import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const VARIANTS = {
  primary: {
    bg: '#174C3C', color: '#fff', border: '#174C3C',
    hover: '#113A2E',
  },
  secondary: {
    bg: '#DCE9DF', color: '#174C3C', border: '#C6DACB',
    hover: '#C6DACB',
  },
  ghost: {
    bg: 'transparent', color: '#727A75', border: '#E5E8E6',
    hover: '#F0F5F1',
  },
  danger: {
    bg: '#FEE2E2', color: '#991B1B', border: '#FECACA',
    hover: '#FECACA',
  },
};

const SIZES = {
  sm: { fontSize: '12px', padding: '6px 12px', gap: '5px' },
  md: { fontSize: '13px', padding: '9px 16px', gap: '7px' },
  lg: { fontSize: '14px', padding: '12px 22px', gap: '8px' },
};

export default function Button({
  children, onClick, type = 'button', variant = 'primary',
  size = 'md', disabled = false, loading = false, fullWidth = false, className = '',
}: ButtonProps) {
  const v = VARIANTS[variant];
  const s = SIZES[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-semibold rounded-lg transition-all ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        fontSize: s.fontSize,
        padding: s.padding,
        gap: s.gap,
        background: v.bg,
        color: v.color,
        border: `1px solid ${v.border}`,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        letterSpacing: '-0.01em',
      }}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
}
