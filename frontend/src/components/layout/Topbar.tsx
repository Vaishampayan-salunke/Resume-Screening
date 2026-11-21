import { Bell, Plus, Search } from 'lucide-react';

interface TopbarProps {
  title?: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header
      className="fixed top-0 right-0 h-14 flex items-center px-6 gap-4"
      style={{
        left: '224px',
        background: '#fff',
        borderBottom: '1px solid #E5E8E6',
        zIndex: 30,
      }}
    >
      {/* Page Title */}
      {title && (
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold truncate" style={{ color: '#202723', letterSpacing: '-0.01em' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs truncate" style={{ color: '#9BA5A0' }}>{subtitle}</p>
          )}
        </div>
      )}

      {/* Search Bar */}
      {!title && (
        <div
          className="flex-1 max-w-md flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}
        >
          <Search size={14} style={{ color: '#9BA5A0', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search skills, analyses, or roles..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#202723' }}
          />
          <kbd
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: '#E5E8E6', color: '#9BA5A0', fontFamily: 'monospace' }}
          >
            ⌘K
          </kbd>
        </div>
      )}

      <div className="flex items-center gap-2 ml-auto">
        {/* Notification */}
        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-sage-100"
          style={{ color: '#727A75' }}
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: '#174C3C' }}
          />
        </button>

        {/* CTA */}
        <a
          href="/analyze"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
          style={{ background: '#174C3C' }}
        >
          <Plus size={13} />
          New Analysis
        </a>
      </div>
    </header>
  );
}
