import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Search, History,
  ShieldCheck, BookOpen, Settings, HelpCircle, ChevronRight
} from 'lucide-react';

const NAV = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Analyze Resume', to: '/analyze', icon: Search },
  { label: 'History', to: '/history', icon: History },
  { label: 'Skill Explorer', to: '/skills', icon: BookOpen },
  { label: 'Fairness Audit', to: '/fairness', icon: ShieldCheck },
  { label: 'About & Model', to: '/about', icon: FileText },
];

const BOTTOM_NAV = [
  { label: 'Settings', to: '/settings', icon: Settings },
  { label: 'Help Center', to: '/help', icon: HelpCircle },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-56 flex flex-col"
      style={{ background: '#fff', borderRight: '1px solid #E5E8E6', zIndex: 40 }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: '#E5E8E6' }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
            style={{ background: '#174C3C', fontFamily: 'Manrope, Inter, sans-serif' }}
          >
            TL
          </div>
          <div>
            <div className="text-sm font-bold" style={{ color: '#202723', letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
              TalentLens
            </div>
            <div className="text-xs" style={{ color: '#727A75' }}>Career Intelligence</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, to, icon: Icon }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group"
              style={{
                color: isActive ? '#174C3C' : '#727A75',
                background: isActive ? '#DCE9DF' : 'transparent',
                fontWeight: isActive ? '600' : '400',
              }}
            >
              <Icon size={16} style={{ color: isActive ? '#174C3C' : '#9BA5A0', flexShrink: 0 }} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={12} style={{ color: '#174C3C', opacity: 0.5 }} />}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="px-3 py-4 border-t space-y-0.5" style={{ borderColor: '#E5E8E6' }}>
        {BOTTOM_NAV.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all"
            style={{ color: '#9BA5A0' }}
          >
            <Icon size={16} style={{ flexShrink: 0 }} />
            <span>{label}</span>
          </NavLink>
        ))}

        {/* User Chip */}
        <div
          className="mt-3 flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer"
          style={{ background: '#F0F5F1' }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
            style={{ background: '#174C3C' }}
          >
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate" style={{ color: '#202723' }}>Alex Candidate</div>
            <div className="text-xs truncate" style={{ color: '#9BA5A0' }}>Free Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
