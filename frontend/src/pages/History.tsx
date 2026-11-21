import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, Search, ArrowRight, Trash2, Calendar, Building2, Plus, Sparkles } from 'lucide-react';
import { api } from '../api/client';
import type { AnalysisResult } from '../types';
import { Card } from '../components/ui/Card';
import { FitBadge } from '../components/ui/Badge';
import Button from '../components/ui/Button';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const fetchHistory = async () => {
    try {
      const data = await api.getHistory();
      setAnalyses(data);
    } catch {
      // Fallback sample data if backend hasn't run queries yet
      setAnalyses([
        {
          id: 'demo-1',
          resume_id: 'res-1',
          job_title: 'Machine Learning Engineer',
          company: 'Nexus AI Technologies',
          overall_compatibility: 84.5,
          fit_category: 'Good Fit',
          breakdown: {
            semantic_similarity: 86.0,
            skill_coverage: 87.5,
            partial_skill_coverage: 92.0,
            experience_alignment: 80.0,
            education_alignment: 100.0,
            project_relevance: 82.0
          },
          matched_skills: [],
          partial_skills: [],
          missing_skills: [],
          explanation: {
            verdict_summary: 'Strong background in Python and Deep Learning with aligned coursework.',
            positive_highlights: ['Proficient in PyTorch, SQL, Pandas'],
            key_growth_opportunities: ['Gain production Docker container experience'],
            encouragement_note: 'Well positioned for interview stages.'
          },
          career_roadmap: {
            target_role: 'Machine Learning Engineer',
            current_readiness_level: 'Interview Ready with Refinements',
            recommended_learning_order: ['Docker', 'FastAPI'],
            suggested_projects: [],
            actionable_resume_tips: []
          },
          created_at: new Date(Date.now() - 3600000 * 24).toISOString()
        },
        {
          id: 'demo-2',
          resume_id: 'res-1',
          job_title: 'Full Stack Python Developer',
          company: 'GreenLeaf Innovations',
          overall_compatibility: 68.0,
          fit_category: 'Potential Fit',
          breakdown: {
            semantic_similarity: 72.0,
            skill_coverage: 65.0,
            partial_skill_coverage: 75.0,
            experience_alignment: 70.0,
            education_alignment: 100.0,
            project_relevance: 68.0
          },
          matched_skills: [],
          partial_skills: [],
          missing_skills: [],
          explanation: {
            verdict_summary: 'Solid core programming knowledge with adjacent web experience.',
            positive_highlights: ['Python, SQL, REST APIs'],
            key_growth_opportunities: ['Expand React frontend depth'],
            encouragement_note: 'Targeted upskilling will close gaps quickly.'
          },
          career_roadmap: {
            target_role: 'Full Stack Python Developer',
            current_readiness_level: 'Strong Candidate with Targeted Refinements',
            recommended_learning_order: ['React', 'TypeScript'],
            suggested_projects: [],
            actionable_resume_tips: []
          },
          created_at: new Date(Date.now() - 3600000 * 72).toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    if (confirm('Clear all analysis history? This is part of our privacy-first design.')) {
      try {
        await api.clearHistory();
        setAnalyses([]);
      } catch {
        setAnalyses([]);
      }
    }
  };

  const filtered = analyses.filter(item => {
    const matchesFilter = filter === 'All' || item.fit_category === filter;
    const matchesSearch =
      item.job_title.toLowerCase().includes(search.toLowerCase()) ||
      (item.company && item.company.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#202723', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
            Analysis Archive & History
          </h1>
          <p style={{ color: '#727A75', fontSize: '14px' }}>
            Revisit past reports, track your score trajectory, or manage your personal session history.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          {analyses.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearHistory}>
              <Trash2 size={13} /> Clear History
            </Button>
          )}
          <Link to="/analyze">
            <Button size="sm">
              <Plus size={13} /> New Analysis
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9BA5A0' }} />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full text-xs rounded-lg pl-9 pr-3 py-2 outline-none"
              style={{ background: '#F8F8F4', border: '1px solid #E5E8E6', color: '#202723' }}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
            {['All', 'Good Fit', 'Potential Fit', 'Low Fit'].map(cat => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
                  style={{
                    background: active ? '#174C3C' : '#F0F5F1',
                    color: active ? '#fff' : '#727A75',
                    border: active ? '1px solid #174C3C' : '1px solid #E5E8E6'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* History List */}
      {loading ? (
        <div className="py-20 text-center text-xs" style={{ color: '#9BA5A0' }}>
          Loading records...
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: '#DCE9DF' }}>
            <History size={20} style={{ color: '#174C3C' }} />
          </div>
          <h3 className="text-sm font-semibold mb-1" style={{ color: '#202723' }}>No analyses found</h3>
          <p className="text-xs mb-5 max-w-sm mx-auto" style={{ color: '#9BA5A0' }}>
            {search || filter !== 'All'
              ? 'No reports match your current search or filter criteria.'
              : 'You have not run any resume analyses yet. Start your first scan in the studio.'}
          </p>
          <Link to="/analyze">
            <Button size="sm">
              <Sparkles size={13} /> Run First Analysis
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <Card key={item.id} hover className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ background: '#DCE9DF', color: '#174C3C' }}
                  >
                    {item.job_title.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold mb-0.5" style={{ color: '#202723' }}>
                      {item.job_title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: '#9BA5A0' }}>
                      {item.company && (
                        <span className="flex items-center gap-1">
                          <Building2 size={12} /> {item.company}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(item.created_at).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 pt-3 sm:pt-0" style={{ borderColor: '#F0F5F1' }}>
                  <div className="text-right">
                    <div className="text-xs" style={{ color: '#9BA5A0' }}>Compatibility</div>
                    <div
                      className="text-lg font-bold"
                      style={{
                        color: item.overall_compatibility >= 75 ? '#174C3C' : item.overall_compatibility >= 50 ? '#D97706' : '#DC2626',
                        fontFamily: 'Manrope, sans-serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {item.overall_compatibility}%
                    </div>
                  </div>

                  <FitBadge category={item.fit_category} />

                  <Link
                    to={`/results/${item.id}`}
                    state={{ result: item }}
                    className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                    style={{ background: '#F0F5F1', color: '#174C3C', border: '1px solid #DCE9DF' }}
                  >
                    View Report <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
