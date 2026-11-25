import { Link } from 'react-router-dom';
import {
  FileText, Compass, Briefcase, GraduationCap, Mic,
  ArrowRight, Plus, Sparkles, CheckCircle2, TrendingUp,
  Clock, ShieldCheck
} from 'lucide-react';
import { Card, StatCard } from '../components/ui/Card';
import { FitBadge, SkillBadge } from '../components/ui/Badge';

export default function Dashboard() {
  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  })();

  return (
    <div className="space-y-7 max-w-6xl">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: '#202A26', fontFamily: 'Manrope, sans-serif' }}
            >
              {greeting}, Alex! 👋
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
              Career Profile Active
            </span>
          </div>
          <p style={{ color: '#727A75', fontSize: '14px' }}>
            Your career command center · Grounded career intelligence, skill growth, and verified opportunities.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/analyze">
            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
              style={{ background: '#155642' }}
            >
              <Plus size={14} /> New Resume Analysis
            </button>
          </Link>
          <Link to="/interview">
            <button
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors hover:bg-gray-100"
              style={{ borderColor: '#E5E8E6', color: '#202A26', background: '#FFFFFF' }}
            >
              <Mic size={14} /> Practice Interview
            </button>
          </Link>
        </div>
      </div>

      {/* Dynamic "Your Next Best Move" Action Card */}
      <Card
        className="p-5 border-l-4"
        style={{
          background: 'linear-gradient(90deg, #F0F5F1 0%, #FFFFFF 100%)',
          borderColor: '#155642',
          borderLeftWidth: '5px'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: '#155642' }}>
              <Sparkles size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-green-900 uppercase tracking-wide">
                Your Next Best Move
              </div>
              <h2 className="text-sm font-bold text-gray-900 mt-0.5">
                Strengthen Docker containerization to unlock 3 High-Match Openings
              </h2>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Your ML & Python competencies are strong (89%). Completing Phase 6 of your Learning Roadmap will elevate your profile for Infosys and TCS vacancies.
              </p>
            </div>
          </div>

          <Link
            to="/learning"
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg text-white flex-shrink-0 self-start sm:self-center"
            style={{ background: '#155642' }}
          >
            Open Roadmap <ArrowRight size={12} />
          </Link>
        </div>
      </Card>

      {/* Key Metric Gauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Career Readiness Index"
          value="78%"
          sub="For Machine Learning roles"
          icon={<TrendingUp size={18} />}
          trend={{ value: '6% this month', positive: true }}
        />
        <StatCard
          label="Matched Opportunities"
          value="14"
          sub="Ready to explore"
          icon={<Briefcase size={18} />}
          trend={{ value: '4 new vacancies', positive: true }}
        />
        <StatCard
          label="Verified Skills"
          value="24"
          sub="Grounded in evidence"
          icon={<CheckCircle2 size={18} />}
        />
        <StatCard
          label="Active Applications"
          value="4"
          sub="1 Interview scheduled"
          icon={<Clock size={18} />}
          color="#D97706"
        />
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Career Pathways & Matching Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Recommended Career Pathways */}
          <Card className="p-5">
            <div className="flex items-center justify-between pb-3.5 border-b mb-4" style={{ borderColor: '#F0F5F1' }}>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Recommended Career Pathways</h2>
                <p className="text-[11px] text-gray-500">Based on your evidenced skills and project background</p>
              </div>
              <Link to="/careers" className="text-xs font-semibold text-green-900 hover:underline flex items-center gap-1">
                Explore all paths <ArrowRight size={11} />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Data Analyst', score: 89, tag: 'Strong Fit', salary: '₹6.5L - ₹12L', growth: '+23% YoY', skills: ['Python', 'SQL', 'Pandas'] },
                { title: 'Full Stack Python Developer', score: 84, tag: 'Strong Fit', salary: '₹7L - ₹14L', growth: 'High startup demand', skills: ['Python', 'FastAPI', 'React'] },
                { title: 'Machine Learning Engineer', score: 78, tag: 'Potential Fit', salary: '₹8.5L - ₹18L', growth: 'GenAI expansion', skills: ['PyTorch', 'ML', 'Scikit-Learn'] }
              ].map(path => (
                <div
                  key={path.title}
                  className="p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50 transition-colors"
                  style={{ borderColor: '#E5E8E6', background: '#FAFAF8' }}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">{path.title}</span>
                      <FitBadge category={path.tag} />
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1">
                      {path.salary} · {path.growth}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {path.skills.map(s => <SkillBadge key={s} label={s} size="sm" variant="matched" />)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-base font-bold text-green-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {path.score}%
                      </div>
                      <span className="text-[9px] text-gray-400">alignment</span>
                    </div>
                    <Link
                      to="/careers"
                      className="p-1.5 rounded-lg border hover:bg-gray-100 text-gray-600"
                    >
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Matched Job Vacancies */}
          <Card className="p-5">
            <div className="flex items-center justify-between pb-3.5 border-b mb-4" style={{ borderColor: '#F0F5F1' }}>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Latest Matching Openings</h2>
                <p className="text-[11px] text-gray-500">Live opportunities aligned to your profile</p>
              </div>
              <Link to="/jobs" className="text-xs font-semibold text-green-900 hover:underline flex items-center gap-1">
                View all jobs <ArrowRight size={11} />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { company: 'Infosys Applied AI', role: 'Junior ML Engineer', location: 'Bengaluru (Hybrid)', score: 91, salary: '₹8.5L - ₹12L' },
                { company: 'Accenture Tech', role: 'Data Analyst Graduate', location: 'Hyderabad (Hybrid)', score: 86, salary: '₹6.5L - ₹9L' },
                { company: 'Tata Consultancy Services', role: 'AI/ML Research Intern', location: 'Remote (India)', score: 82, salary: '₹35k/mo stipend' },
              ].map(j => (
                <div key={j.role} className="p-3.5 rounded-xl border flex items-center justify-between hover:bg-gray-50 transition-colors" style={{ borderColor: '#E5E8E6' }}>
                  <div>
                    <div className="text-xs font-bold text-gray-900">{j.role}</div>
                    <div className="text-[11px] text-gray-500">{j.company} · {j.location} · {j.salary}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-green-900">{j.score}% match</span>
                    <Link to="/jobs" className="text-xs font-semibold text-green-900 hover:underline">
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Skill Growth & Quick Navigation */}
        <div className="space-y-6">
          {/* Skill Proficiency & Evidence Gauge */}
          <Card className="p-5">
            <div className="pb-3 border-b mb-3" style={{ borderColor: '#F0F5F1' }}>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                Demonstrated Competencies
              </h2>
              <p className="text-[11px] text-gray-500">Grounded in project & work evidence</p>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Python', confidence: 'High', source: '2 Projects' },
                { name: 'PyTorch', confidence: 'High', source: 'ML Capstone' },
                { name: 'SQL', confidence: 'Medium', source: 'Coursework' },
                { name: 'FastAPI', confidence: 'High', source: 'Backend API' },
                { name: 'Docker', confidence: 'Low', source: 'Basic mention' },
              ].map(s => (
                <div key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <div>
                    <div className="text-xs font-bold text-gray-800">{s.name}</div>
                    <div className="text-[10px] text-gray-500">{s.source}</div>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: s.confidence === 'High' ? '#DCE9DF' : s.confidence === 'Medium' ? '#FEF3C7' : '#FEE2E2',
                      color: s.confidence === 'High' ? '#155642' : s.confidence === 'Medium' ? '#92400E' : '#991B1B',
                    }}
                  >
                    {s.confidence}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t text-center">
              <Link to="/profile" className="text-xs font-semibold text-green-900 hover:underline">
                View Full Career Profile & Evidence ➔
              </Link>
            </div>
          </Card>

          {/* Quick Shortcuts to Features */}
          <Card className="p-5">
            <div className="pb-3 border-b mb-3" style={{ borderColor: '#F0F5F1' }}>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                Quick Actions
              </h2>
            </div>
            <div className="space-y-2">
              <Link to="/analyze" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700">
                <FileText size={14} className="text-green-800" />
                <span>Upload & Parse New Resume</span>
              </Link>
              <Link to="/careers" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700">
                <Compass size={14} className="text-green-800" />
                <span>Simulate Learning Impact</span>
              </Link>
              <Link to="/interview" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700">
                <Mic size={14} className="text-green-800" />
                <span>Practice Technical Mock Interview</span>
              </Link>
              <Link to="/fairness" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700">
                <ShieldCheck size={14} className="text-green-800" />
                <span>Run Demographic Fairness Audit</span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
