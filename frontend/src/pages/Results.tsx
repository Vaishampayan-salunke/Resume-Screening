import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2, AlertCircle, Info, TrendingUp, BookOpen,
  ChevronRight, ExternalLink, Lightbulb, ArrowLeft, Download
} from 'lucide-react';
import { api } from '../api/client';
import type { AnalysisResult, SkillDetail } from '../types';
import ScoreDial from '../components/ui/ScoreDial';
import ProgressBar from '../components/ui/ProgressBar';
import { Card } from '../components/ui/Card';
import { SkillBadge, FitBadge, ImportanceBadge } from '../components/ui/Badge';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

function SkillCard({ skill, variant }: { skill: SkillDetail; variant: 'matched' | 'partial' | 'missing' }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="rounded-xl border p-4 cursor-pointer transition-all"
      style={{
        background: variant === 'matched' ? '#F0F5F1' : variant === 'partial' ? '#FFFBF0' : '#FFF',
        borderColor: variant === 'matched' ? '#C6DACB' : variant === 'partial' ? '#FDE68A' : '#FECACA',
      }}
      onClick={() => setExpanded(e => !e)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && setExpanded(x => !x)}
      aria-expanded={expanded}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {variant === 'matched' && <CheckCircle2 size={14} style={{ color: '#174C3C', flexShrink: 0 }} />}
          {variant === 'partial' && <AlertCircle size={14} style={{ color: '#D97706', flexShrink: 0 }} />}
          {variant === 'missing' && <Info size={14} style={{ color: '#DC2626', flexShrink: 0 }} />}
          <span className="text-sm font-medium truncate" style={{ color: '#202723' }}>
            {skill.canonical_name}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <span className="text-xs" style={{ color: '#9BA5A0' }}>{skill.category}</span>
          <ImportanceBadge importance={skill.importance} />
          <ChevronRight size={12} style={{ color: '#C6DACB', transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t space-y-2.5" style={{ borderColor: '#E5E8E6' }}>
          {skill.why_required && (
            <p className="text-xs" style={{ color: '#727A75', lineHeight: 1.65 }}>
              <strong style={{ color: '#3A4440' }}>Why required:</strong> {skill.why_required}
            </p>
          )}
          {variant === 'missing' && skill.learning_priority && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium" style={{ color: '#727A75' }}>Learning Priority:</span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: skill.learning_priority === 1 ? '#FEE2E2' : skill.learning_priority === 2 ? '#FEF3C7' : '#F0F5F1',
                  color: skill.learning_priority === 1 ? '#991B1B' : skill.learning_priority === 2 ? '#92400E' : '#3A5944',
                }}
              >
                {skill.learning_priority === 1 ? '🔴 Urgent' : skill.learning_priority === 2 ? '🟡 Core' : '🟢 Secondary'}
              </span>
            </div>
          )}
          {skill.suggested_resources.length > 0 && (
            <div>
              <div className="text-xs font-medium mb-1.5" style={{ color: '#3A4440' }}>Recommended Resources</div>
              <div className="space-y-1">
                {skill.suggested_resources.slice(0, 3).map(r => (
                  <div key={r} className="flex items-start gap-1.5 text-xs" style={{ color: '#727A75' }}>
                    <ExternalLink size={10} style={{ flexShrink: 0, marginTop: 2 }} />
                    {r}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [result, setResult] = useState<AnalysisResult | null>(
    (location.state as { result?: AnalysisResult })?.result || null
  );
  const [loading, setLoading] = useState(!result);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!result && id) {
      api.getAnalysis(id)
        .then(setResult)
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [id, result]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center animate-pulse" style={{ background: '#DCE9DF' }}>
            <TrendingUp size={20} style={{ color: '#174C3C' }} />
          </div>
          <p className="text-sm" style={{ color: '#9BA5A0' }}>Loading analysis result…</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="max-w-lg py-24 text-center mx-auto">
        <AlertCircle size={32} style={{ color: '#DC2626', margin: '0 auto 16px' }} />
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#202723' }}>Result not found</h2>
        <p className="text-sm mb-6" style={{ color: '#727A75' }}>{error || 'This analysis does not exist or has expired.'}</p>
        <Link to="/analyze" className="text-sm font-medium" style={{ color: '#174C3C' }}>
          ← Run a new analysis
        </Link>
      </div>
    );
  }

  const bd = result.breakdown;
  const radarData = [
    { subject: 'Semantic', value: bd.semantic_similarity },
    { subject: 'Skills', value: bd.skill_coverage },
    { subject: 'Partial', value: bd.partial_skill_coverage },
    { subject: 'Experience', value: bd.experience_alignment },
    { subject: 'Education', value: bd.education_alignment },
    { subject: 'Projects', value: bd.project_relevance },
  ];

  return (
    <div>
      {/* Back + Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Link to="/history" className="flex items-center gap-1.5 text-xs font-medium mb-3 transition-colors hover:text-green-800" style={{ color: '#9BA5A0' }}>
            <ArrowLeft size={12} /> Back to History
          </Link>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#202723', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
            {result.job_title}
          </h1>
          <div className="flex items-center gap-3">
            {result.company && <span className="text-sm" style={{ color: '#727A75' }}>{result.company}</span>}
            <FitBadge category={result.fit_category} />
            <span className="text-xs" style={{ color: '#C6DACB' }}>
              {new Date(result.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-sage-100"
          style={{ border: '1px solid #E5E8E6', color: '#727A75', background: '#fff' }}
          aria-label="Download report"
        >
          <Download size={13} /> Export Report
        </button>
      </div>

      {/* Top Score Row */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {/* Score Dial */}
        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="text-xs font-medium mb-5 text-center" style={{ color: '#727A75' }}>Overall Compatibility</div>
          <ScoreDial
            score={result.overall_compatibility}
            size={180}
            label={result.fit_category}
          />
          <div className="mt-5 text-center max-w-48">
            <p className="text-xs" style={{ color: '#9BA5A0', lineHeight: 1.65 }}>
              Calibrated from {Object.keys(bd).length} signal dimensions using NLP + ML classification.
            </p>
          </div>
        </Card>

        {/* Breakdown Bars */}
        <Card className="p-5">
          <div className="text-xs font-semibold mb-4" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Score Breakdown
          </div>
          <div className="space-y-4">
            <ProgressBar label="Semantic Similarity" value={bd.semantic_similarity} />
            <ProgressBar label="Core Skill Coverage" value={bd.skill_coverage} />
            <ProgressBar label="Partial Skill Coverage" value={bd.partial_skill_coverage} color="#D97706" />
            <ProgressBar label="Experience Alignment" value={bd.experience_alignment} />
            <ProgressBar label="Education Alignment" value={bd.education_alignment} />
            <ProgressBar label="Project Relevance" value={bd.project_relevance} />
          </div>
        </Card>

        {/* Radar Chart */}
        <Card className="p-5">
          <div className="text-xs font-semibold mb-4" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Competency Radar
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E8E6" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#9BA5A0' }} />
              <Radar dataKey="value" stroke="#174C3C" fill="#174C3C" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip
                formatter={(v: unknown) => [`${Number(v || 0).toFixed(1)}%`]}
                contentStyle={{ fontSize: '11px', border: '1px solid #E5E8E6', borderRadius: '8px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Explanation Panel */}
      <Card className="mb-6">
        <div className="px-6 py-5 border-b" style={{ borderColor: '#F0F5F1' }}>
          <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#202723' }}>
            <Lightbulb size={15} style={{ color: '#174C3C' }} />
            Analysis Explanation
          </h2>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-xs font-semibold mb-3" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Verdict
            </div>
            <p className="text-sm" style={{ color: '#3A4440', lineHeight: 1.7 }}>{result.explanation.verdict_summary}</p>
            <div
              className="mt-4 p-3 rounded-xl text-sm"
              style={{ background: '#F0F5F1', color: '#174C3C', border: '1px solid #DCE9DF', lineHeight: 1.65 }}
            >
              💡 {result.explanation.encouragement_note}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold mb-3" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Strengths
            </div>
            <ul className="space-y-2">
              {result.explanation.positive_highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#3A4440' }}>
                  <CheckCircle2 size={13} style={{ color: '#174C3C', flexShrink: 0, marginTop: 3 }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold mb-3" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Growth Opportunities
            </div>
            <ul className="space-y-2">
              {result.explanation.key_growth_opportunities.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#3A4440' }}>
                  <TrendingUp size={13} style={{ color: '#D97706', flexShrink: 0, marginTop: 3 }} />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Skill Gap Analysis */}
      <div className="mb-6">
        <h2 className="text-base font-semibold mb-4" style={{ color: '#202723', letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
          Skill Gap Analysis
        </h2>
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Matched */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={14} style={{ color: '#174C3C' }} />
              <span className="text-sm font-semibold" style={{ color: '#174C3C' }}>
                Matched ({result.matched_skills.length})
              </span>
            </div>
            <div className="space-y-2">
              {result.matched_skills.length === 0 ? (
                <p className="text-xs" style={{ color: '#9BA5A0' }}>No exact matches detected.</p>
              ) : (
                result.matched_skills.map(s => <SkillCard key={s.canonical_name} skill={s} variant="matched" />)
              )}
            </div>
          </div>

          {/* Partial */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={14} style={{ color: '#D97706' }} />
              <span className="text-sm font-semibold" style={{ color: '#D97706' }}>
                Partial Match ({result.partial_skills.length})
              </span>
            </div>
            <div className="space-y-2">
              {result.partial_skills.length === 0 ? (
                <p className="text-xs" style={{ color: '#9BA5A0' }}>No partial matches.</p>
              ) : (
                result.partial_skills.map(s => <SkillCard key={s.canonical_name} skill={s} variant="partial" />)
              )}
            </div>
          </div>

          {/* Missing */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info size={14} style={{ color: '#DC2626' }} />
              <span className="text-sm font-semibold" style={{ color: '#DC2626' }}>
                Learning Opportunities ({result.missing_skills.length})
              </span>
            </div>
            <div className="space-y-2">
              {result.missing_skills.length === 0 ? (
                <p className="text-xs" style={{ color: '#9BA5A0' }}>No critical gaps — excellent match!</p>
              ) : (
                result.missing_skills.map(s => <SkillCard key={s.canonical_name} skill={s} variant="missing" />)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Career Roadmap */}
      <Card>
        <div className="px-6 py-5 border-b" style={{ borderColor: '#F0F5F1' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#202723' }}>
              <BookOpen size={15} style={{ color: '#174C3C' }} />
              Career Development Roadmap
            </h2>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ background: '#DCE9DF', color: '#174C3C' }}
            >
              {result.career_roadmap.current_readiness_level}
            </span>
          </div>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-6">
          {/* Learning Order */}
          <div>
            <div className="text-xs font-semibold mb-3" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Recommended Learning Order
            </div>
            <ol className="space-y-2">
              {result.career_roadmap.recommended_learning_order.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs" style={{ color: '#3A4440' }}>
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center font-semibold flex-shrink-0 text-xs"
                    style={{ background: '#DCE9DF', color: '#174C3C' }}
                  >
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          {/* Suggested Projects */}
          <div className="md:col-span-2">
            <div className="text-xs font-semibold mb-3" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Suggested Portfolio Projects
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {result.career_roadmap.suggested_projects.map(proj => (
                <div
                  key={proj.title}
                  className="p-4 rounded-xl"
                  style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}
                >
                  <div className="text-xs font-semibold mb-1.5" style={{ color: '#202723' }}>{proj.title}</div>
                  <p className="text-xs mb-3" style={{ color: '#727A75', lineHeight: 1.6 }}>{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {proj.target_skills.map(s => <SkillBadge key={s} label={s} size="sm" variant="neutral" />)}
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color: '#9BA5A0' }}>
                    <span>⚡ {proj.difficulty}</span>
                    <span>⏱ {proj.estimated_time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resume Tips */}
        <div className="px-6 pb-6 border-t pt-5" style={{ borderColor: '#F0F5F1' }}>
          <div className="text-xs font-semibold mb-3" style={{ color: '#727A75', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Actionable Resume Improvements
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {result.career_roadmap.actionable_resume_tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-xs" style={{ color: '#3A4440' }}>
                <ChevronRight size={11} style={{ color: '#174C3C', flexShrink: 0, marginTop: 2 }} />
                {tip}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
