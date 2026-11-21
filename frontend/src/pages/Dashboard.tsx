import { Link } from 'react-router-dom';
import { FileText, Zap, TrendingUp, Clock, ArrowRight, Plus } from 'lucide-react';
import { Card, StatCard } from '../components/ui/Card';
import { FitBadge } from '../components/ui/Badge';

const MOCK_HISTORY = [
  { id: '1', job_title: 'Machine Learning Engineer', company: 'DeepThought AI', overall_compatibility: 82, fit_category: 'Good Fit', created_at: '2026-11-19T14:30:00Z' },
  { id: '2', job_title: 'Full Stack Python Developer', company: 'GreenCloud', overall_compatibility: 65, fit_category: 'Potential Fit', created_at: '2026-11-18T10:00:00Z' },
  { id: '3', job_title: 'Data Scientist', company: 'Analytics Corp', overall_compatibility: 73, fit_category: 'Potential Fit', created_at: '2026-11-17T09:00:00Z' },
];

export default function Dashboard() {
  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  })();

  return (
    <div>
      {/* Welcome Banner */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ color: '#202723', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}
          >
            {greeting}, Alex. 👋
          </h1>
          <p style={{ color: '#727A75', fontSize: '14px' }}>
            Let's move your career forward — your skill intelligence dashboard.
          </p>
        </div>
        <Link
          to="/analyze"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 shadow-sm"
          style={{ background: '#174C3C' }}
        >
          <Plus size={15} />
          New Analysis
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Analyses Run"
          value="12"
          sub="This month"
          icon={<FileText size={18} />}
          trend={{ value: '3 more', positive: true }}
        />
        <StatCard
          label="Average Match"
          value="73%"
          sub="Across all roles"
          icon={<Zap size={18} />}
          trend={{ value: '5%', positive: true }}
        />
        <StatCard
          label="Skills Identified"
          value="24"
          sub="Unique competencies"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          label="Skill Gaps Found"
          value="8"
          sub="Across all analyses"
          icon={<Clock size={18} />}
          color="#D97706"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Analyses */}
        <div className="lg:col-span-2">
          <Card>
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F0F5F1' }}>
              <div>
                <h2 className="text-sm font-semibold" style={{ color: '#202723' }}>Recent Analyses</h2>
                <p className="text-xs mt-0.5" style={{ color: '#9BA5A0' }}>Your latest resume–job compatibility checks</p>
              </div>
              <Link to="/history" className="text-xs font-medium transition-colors" style={{ color: '#174C3C' }}>
                View all <ArrowRight size={11} className="inline" />
              </Link>
            </div>
            <div className="divide-y" style={{ borderColor: '#F0F5F1' }}>
              {MOCK_HISTORY.map(item => (
                <Link
                  key={item.id}
                  to={`/results/${item.id}`}
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors group"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: '#DCE9DF', color: '#174C3C' }}
                    >
                      {item.job_title.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: '#202723' }}>{item.job_title}</div>
                      <div className="text-xs truncate" style={{ color: '#9BA5A0' }}>
                        {item.company} · {new Date(item.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <div className="text-right hidden sm:block">
                      <div
                        className="text-base font-bold"
                        style={{
                          color: item.overall_compatibility >= 75 ? '#174C3C' : item.overall_compatibility >= 50 ? '#D97706' : '#DC2626',
                          fontFamily: 'Manrope, sans-serif',
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {item.overall_compatibility}%
                      </div>
                    </div>
                    <FitBadge category={item.fit_category as 'Good Fit' | 'Potential Fit' | 'Low Fit'} />
                    <ArrowRight size={14} style={{ color: '#C6DACB' }} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Quick Analysis CTA */}
          <Card className="mt-4" style={{ background: 'linear-gradient(135deg, #174C3C 0%, #1E6E55 100%)', border: 'none' }}>
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Ready for your next analysis?</h3>
                <p className="text-xs" style={{ color: '#A8C7B1' }}>
                  Upload a resume and paste a job description to get your instant compatibility report.
                </p>
              </div>
              <Link
                to="/analyze"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90 flex-shrink-0 ml-4"
                style={{ background: '#DCE9DF', color: '#174C3C' }}
              >
                Start <ArrowRight size={12} />
              </Link>
            </div>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="space-y-5">
          {/* Top Skills */}
          <Card>
            <div className="px-5 py-4 border-b" style={{ borderColor: '#F0F5F1' }}>
              <h3 className="text-sm font-semibold" style={{ color: '#202723' }}>Your Top Skills</h3>
              <p className="text-xs mt-0.5" style={{ color: '#9BA5A0' }}>Identified across all resumes</p>
            </div>
            <div className="p-5 space-y-3">
              {[
                { name: 'Python', pct: 95, cat: 'Languages' },
                { name: 'Machine Learning', pct: 88, cat: 'ML & AI' },
                { name: 'SQL', pct: 80, cat: 'Data' },
                { name: 'PyTorch', pct: 75, cat: 'ML & AI' },
                { name: 'React', pct: 68, cat: 'Frontend' },
              ].map(s => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: '#3A4440' }}>{s.name}</span>
                    <span className="text-xs" style={{ color: '#9BA5A0' }}>{s.cat}</span>
                  </div>
                  <div className="rounded-full h-1.5 overflow-hidden" style={{ background: '#F0F5F1' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${s.pct}%`, background: '#174C3C' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Missing Skills */}
          <Card>
            <div className="px-5 py-4 border-b" style={{ borderColor: '#F0F5F1' }}>
              <h3 className="text-sm font-semibold" style={{ color: '#202723' }}>Priority Skill Gaps</h3>
              <p className="text-xs mt-0.5" style={{ color: '#9BA5A0' }}>Most frequently missing across analyses</p>
            </div>
            <div className="p-5 space-y-2.5">
              {[
                { name: 'Docker', priority: 1, cat: 'DevOps' },
                { name: 'Kubernetes', priority: 1, cat: 'DevOps' },
                { name: 'Deep Learning', priority: 2, cat: 'ML & AI' },
                { name: 'NLP / Transformers', priority: 2, cat: 'ML & AI' },
              ].map(g => (
                <div
                  key={g.name}
                  className="flex items-center justify-between p-2.5 rounded-lg"
                  style={{ background: g.priority === 1 ? '#FEF3C7' : '#F8F8F4', border: `1px solid ${g.priority === 1 ? '#FDE68A' : '#E5E8E6'}` }}
                >
                  <span className="text-xs font-medium" style={{ color: '#202723' }}>{g.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: '#9BA5A0' }}>{g.cat}</span>
                    <span
                      className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                      style={{
                        background: g.priority === 1 ? '#FDE68A' : '#E5E8E6',
                        color: g.priority === 1 ? '#92400E' : '#727A75'
                      }}
                    >
                      P{g.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
