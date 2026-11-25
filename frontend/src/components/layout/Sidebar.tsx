import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, User, FileText, Compass, Briefcase, Bookmark,
  Layers, BookOpen, GraduationCap, Mic, ShieldCheck, Info,
  Settings, HelpCircle, ChevronRight, Sparkles
} from 'lucide-react';

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
      { label: 'Career Profile', to: '/profile', icon: User },
    ],
  },
  {
    title: 'CAREER INTELLIGENCE',
    items: [
      { label: 'Resume Studio', to: '/analyze', icon: FileText },
      { label: 'Career Discovery', to: '/careers', icon: Compass, badge: 'New' },
      { label: 'Analysis History', to: '/history', icon: Layers },
    ],
  },
  {
    title: 'OPPORTUNITIES',
    items: [
      { label: 'Explore Jobs', to: '/jobs', icon: Briefcase },
      { label: 'Application Tracker', to: '/applications', icon: Bookmark },
    ],
  },
  {
    title: 'GROWTH CENTER',
    items: [
      { label: 'Learning Roadmap', to: '/learning', icon: GraduationCap },
      { label: 'AI Interview Studio', to: '/interview', icon: Mic, badge: 'AI' },
      { label: 'Skill Taxonomy', to: '/skills', icon: BookOpen },
    ],
  },
  {
    title: 'TRUST & ETHICS',
    items: [
      { label: 'Fairness Audit', to: '/fairness', icon: ShieldCheck },
      { label: 'About & Model', to: '/about', icon: Info },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-60 flex flex-col select-none"
      style={{
        background: '#FFFFFF',
        borderRight: '1px solid #E5E8E6',
        zIndex: 40,
      }}
    >
      {/* Brand Header */}
      <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F0F5F1' }}>
        <NavLink to="/dashboard" className="flex items-center gap-2.5 text-decoration-none">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm"
            style={{ background: '#155642', fontFamily: 'Manrope, sans-serif' }}
          >
            TL
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight" style={{ color: '#202A26', fontFamily: 'Manrope, sans-serif' }}>
              TalentLens
            </div>
            <div className="text-[11px]" style={{ color: '#727A75' }}>
              Career Intelligence
            </div>
          </div>
        </NavLink>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {SECTIONS.map(section => (
          <div key={section.title}>
            <div
              className="px-3 pb-1.5 text-[10px] font-bold tracking-wider uppercase"
              style={{ color: '#9BA5A0', letterSpacing: '0.06em' }}
            >
              {section.title}
            </div>
            <div className="space-y-0.5">
              {section.items.map(({ label, to, icon: Icon, badge }) => {
                const isActive = to === '/dashboard'
                  ? location.pathname === '/dashboard' || location.pathname === '/'
                  : location.pathname.startsWith(to);

                return (
                  <NavLink
                    key={to}
                    to={to}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all group"
                    style={{
                      color: isActive ? '#155642' : '#4A5550',
                      background: isActive ? '#DCE9DF' : 'transparent',
                      fontWeight: isActive ? '600' : '500',
                    }}
                  >
                    <Icon
                      size={15}
                      style={{
                        color: isActive ? '#155642' : '#727A75',
                        flexShrink: 0,
                      }}
                    />
                    <span className="flex-1 truncate">{label}</span>

                    {badge && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: badge === 'AI' ? '#155642' : '#FEF3C7',
                          color: badge === 'AI' ? '#FFFFFF' : '#92400E',
                        }}
                      >
                        {badge}
                      </span>
                    )}

                    {isActive && (
                      <ChevronRight size={12} style={{ color: '#155642', opacity: 0.6 }} />
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Profile Footer */}
      <div className="p-3 border-t space-y-1.5" style={{ borderColor: '#F0F5F1' }}>
        <NavLink
          to="/profile"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all hover:bg-gray-50 cursor-pointer"
          style={{ background: '#F8F8F4' }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
            style={{ background: '#155642' }}
          >
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate" style={{ color: '#202A26' }}>
              Alex Candidate
            </div>
            <div className="text-[10px] truncate" style={{ color: '#727A75' }}>
              B.Tech CS · Final Year
            </div>
          </div>
          <Sparkles size={13} style={{ color: '#155642' }} />
        </NavLink>
      </div>
    </aside>
  );
}
