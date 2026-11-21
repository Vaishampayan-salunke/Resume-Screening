import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Zap, Target, TrendingUp, Shield, CheckCircle } from 'lucide-react';

function HeroSection() {
  return (
    <section
      className="min-h-screen flex flex-col"
      style={{ background: '#F8F8F4' }}
    >
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-10 py-5" style={{ borderBottom: '1px solid #E5E8E6', background: '#fff' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ background: '#174C3C' }}>
            TL
          </div>
          <span className="text-base font-bold" style={{ color: '#202723', letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
            TalentLens
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-sm" style={{ color: '#727A75' }}>
          <a href="#how-it-works" className="hover:text-green-800 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-green-800 transition-colors">Features</a>
          <a href="/about" className="hover:text-green-800 transition-colors">About</a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-green-800" style={{ color: '#727A75' }}>
            Sign In
          </Link>
          <Link
            to="/analyze"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: '#174C3C' }}
          >
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center max-w-4xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{ background: '#DCE9DF', color: '#174C3C', border: '1px solid #C6DACB' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-700" />
          AI-Powered Career Intelligence Platform
        </div>

        <h1
          className="text-5xl md:text-6xl font-bold mb-6"
          style={{ color: '#202723', letterSpacing: '-0.03em', lineHeight: '1.1', fontFamily: 'Manrope, sans-serif' }}
        >
          Understand your potential.
          <br />
          <span style={{ color: '#174C3C' }}>Discover your next</span>
          <br />
          opportunity.
        </h1>

        <p className="text-lg mb-10 max-w-2xl" style={{ color: '#727A75', lineHeight: '1.7' }}>
          Discover how your skills align with real job requirements, identify what you're missing,
          and build a clearer path toward your career goals — with full transparency into every AI decision.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <Link
            to="/analyze"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 shadow-lg"
            style={{ background: '#174C3C', boxShadow: '0 4px 20px rgba(23,76,60,0.25)' }}
          >
            <Upload size={16} />
            Analyze My Resume
          </Link>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all"
            style={{ color: '#174C3C', background: '#DCE9DF', border: '1px solid #C6DACB' }}
          >
            Explore How It Works <ArrowRight size={14} />
          </a>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-6 mt-12 text-sm" style={{ color: '#9BA5A0' }}>
          {['No personal data stored permanently', 'Fair & explainable AI', 'Academic research project'].map(t => (
            <div key={t} className="flex items-center gap-1.5">
              <CheckCircle size={13} style={{ color: '#174C3C' }} />
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Preview mockup */}
      <div
        className="mx-auto mb-16 w-full max-w-5xl rounded-2xl overflow-hidden"
        style={{ border: '1px solid #E5E8E6', boxShadow: '0 20px 60px rgba(23,76,60,0.1)' }}
      >
        <div className="flex" style={{ background: '#fff' }}>
          {/* Sidebar preview */}
          <div className="w-40 p-4 hidden md:block" style={{ background: '#fff', borderRight: '1px solid #F0F5F1' }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-5 rounded bg-forest-900 flex items-center justify-center text-xs text-white font-bold" style={{ background: '#174C3C' }}>TL</div>
              <span className="text-xs font-bold" style={{ color: '#202723' }}>TalentLens</span>
            </div>
            {['Dashboard', 'Analyze', 'History', 'Skills', 'Fairness'].map((item, i) => (
              <div key={item} className="flex items-center gap-2 px-2 py-1.5 rounded-lg mb-0.5"
                style={{ background: i === 0 ? '#DCE9DF' : 'transparent', color: i === 0 ? '#174C3C' : '#9BA5A0', fontSize: '11px', fontWeight: i === 0 ? 600 : 400 }}>
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: i === 0 ? '#174C3C' : '#E5E8E6' }} />
                {item}
              </div>
            ))}
          </div>
          {/* Content preview */}
          <div className="flex-1 p-5" style={{ background: '#F8F8F4' }}>
            <div className="text-xs font-semibold mb-4" style={{ color: '#202723' }}>Analysis Overview</div>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[{ l: 'Match Score', v: '78%', c: '#174C3C' }, { l: 'Skills Matched', v: '12', c: '#174C3C' }, { l: 'Skill Gaps', v: '4', c: '#D97706' }, { l: 'Fit Category', v: 'Potential Fit', c: '#D97706' }].map(s => (
                <div key={s.l} className="rounded-lg p-3" style={{ background: '#fff', border: '1px solid #E5E8E6' }}>
                  <div className="text-xs mb-1" style={{ color: '#9BA5A0' }}>{s.l}</div>
                  <div className="text-sm font-bold" style={{ color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="rounded-lg p-4" style={{ background: '#fff', border: '1px solid #E5E8E6' }}>
              <div className="text-xs font-medium mb-3" style={{ color: '#727A75' }}>Skill Coverage Breakdown</div>
              {[{ l: 'Semantic Similarity', v: 82 }, { l: 'Core Skills Coverage', v: 75 }, { l: 'Experience Alignment', v: 80 }].map(b => (
                <div key={b.l} className="mb-2">
                  <div className="flex justify-between text-xs mb-1" style={{ color: '#9BA5A0' }}>
                    <span>{b.l}</span><span style={{ color: '#174C3C', fontWeight: 600 }}>{b.v}%</span>
                  </div>
                  <div className="rounded-full h-1.5 overflow-hidden" style={{ background: '#F0F5F1' }}>
                    <div className="h-full rounded-full" style={{ width: `${b.v}%`, background: '#174C3C' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6" style={{ background: '#fff' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#174C3C' }}>How It Works</div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#202723', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
            From resume to insights in seconds
          </h2>
          <p className="mb-16" style={{ color: '#727A75' }}>
            Our end-to-end AI pipeline processes your resume and job description with real NLP, not keyword matching.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', icon: <Upload size={22} />, t: 'Upload Your Resume', d: 'PDF upload triggers structured parsing: skills, education, experience, and project extraction using NLP.' },
              { n: '02', icon: <Zap size={22} />, t: 'Semantic AI Analysis', d: 'Sentence-BERT computes contextual semantic similarity. Skill taxonomy maps your competencies to ESCO standards.' },
              { n: '03', icon: <Target size={22} />, t: 'Your Personalized Report', d: 'Get transparent breakdowns, ranked skill gaps, suggested learning paths, and actionable resume improvements.' },
            ].map(step => (
              <div key={step.n} className="text-left p-6 rounded-2xl" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
                <div className="text-xs font-semibold mb-4" style={{ color: '#C6DACB' }}>{step.n}</div>
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ background: '#DCE9DF', color: '#174C3C' }}>
                  {step.icon}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#202723' }}>{step.t}</h3>
                <p className="text-sm" style={{ color: '#727A75', lineHeight: 1.65 }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6" style={{ background: '#F8F8F4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#174C3C' }}>Features</div>
            <h2 className="text-3xl font-bold" style={{ color: '#202723', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
              More than a resume scanner
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <TrendingUp size={18} />, t: 'Skill Gap Intelligence', d: 'Categorizes every missing skill by criticality, provides targeted resources and prioritized learning order.' },
              { icon: <Shield size={18} />, t: 'Fairness & Bias Audit', d: 'Counterfactual name perturbation testing proves demographic invariance of every score.' },
              { icon: <Target size={18} />, t: 'Explainable Scores', d: 'No opaque black boxes — every component of your compatibility score is explained in plain language.' },
              { icon: <Zap size={18} />, t: 'Career Roadmap', d: 'Personalized project suggestions and learning paths aligned to your specific target role.' },
              { icon: <CheckCircle size={18} />, t: 'ESCO Skill Taxonomy', d: 'Skills normalized against European Skills, Competences & Occupations standard taxonomy.' },
              { icon: <Upload size={18} />, t: 'History & Comparison', d: 'Track all past analyses, compare scores across different roles, monitor your growth over time.' },
            ].map(f => (
              <div key={f.t} className="p-5 rounded-xl" style={{ background: '#fff', border: '1px solid #E5E8E6' }}>
                <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center" style={{ background: '#DCE9DF', color: '#174C3C' }}>
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: '#202723' }}>{f.t}</h3>
                <p className="text-xs" style={{ color: '#727A75', lineHeight: 1.65 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6" style={{ background: '#174C3C' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white" style={{ letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
            Ready to understand your potential?
          </h2>
          <p className="mb-8" style={{ color: '#A8C7B1' }}>
            Start with one resume. Get intelligent, explainable insights immediately.
          </p>
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#DCE9DF', color: '#174C3C' }}
          >
            Analyze My Resume <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-10 flex flex-col md:flex-row items-center justify-between" style={{ background: '#fff', borderTop: '1px solid #E5E8E6' }}>
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="w-6 h-6 rounded bg-forest-900 flex items-center justify-center text-xs text-white font-bold" style={{ background: '#174C3C' }}>TL</div>
          <span className="text-sm font-bold" style={{ color: '#202723' }}>TalentLens</span>
          <span className="text-xs ml-2" style={{ color: '#9BA5A0' }}>AI Resume Intelligence & Skill Gap Analysis</span>
        </div>
        <div className="text-xs" style={{ color: '#9BA5A0' }}>
          Academic research project · AI-assisted decision-support tool · Not an autonomous hiring system
        </div>
      </footer>
    </section>
  );
}

export default function LandingPage() {
  return <HeroSection />;
}
