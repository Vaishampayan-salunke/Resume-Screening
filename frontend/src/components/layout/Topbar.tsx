import { Bell, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopbarProps {
  title?: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header
      className="fixed top-0 right-0 h-14 flex items-center px-6 gap-4"
      style={{
        left: '240px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E8E6',
        zIndex: 30,
      }}
    >
      {/* Page Title */}
      {title ? (
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold truncate" style={{ color: '#202A26', letterSpacing: '-0.01em' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs truncate" style={{ color: '#727A75' }}>{subtitle}</p>
          )}
        </div>
      ) : (
        /* Global Search Bar */
        <div
          className="flex-1 max-w-md flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}
        >
          <Search size={14} style={{ color: '#727A75', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search roles, skills, or job postings (e.g. Python, Docker, Infosys)..."
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: '#202A26' }}
          />
          <kbd
            className="text-[10px] px-1.5 py-0.5 rounded font-mono"
            style={{ background: '#E5E8E6', color: '#727A75' }}
          >
            ⌘K
          </kbd>
        </div>
      )}

      <div className="flex items-center gap-2.5 ml-auto">
        {/* Notification */}
        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
          style={{ color: '#727A75' }}
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: '#155642' }}
          />
        </button>

        {/* Action CTA */}
        <Link
          to="/analyze"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 shadow-sm"
          style={{ background: '#155642' }}
        >
          <Plus size={13} />
          Analyze Resume
        </Link>
      </div>
    </header>
  );
}
