import { useState } from 'react';
import { ShieldCheck, Play, AlertCircle, CheckCircle2, UserCheck, Scale } from 'lucide-react';
import { api } from '../api/client';
import type { FairnessEvaluationResult } from '../types';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

const SAMPLE_RESUME = `Priya Sharma
priya.sharma@domain.edu | +91-9876543210

PROFESSIONAL SUMMARY
Computer Science graduate with 1.5 years internship experience in machine learning pipelines, deep learning models, and backend microservices.

SKILLS
Python, PyTorch, Scikit-Learn, SQL, Pandas, NumPy, Docker, Git, REST APIs, FastAPI

EXPERIENCE
ML Engineering Intern | DataTech Labs | 2025 - 2026
- Built Random Forest and neural network classifiers with 92% validation accuracy
- Containerized data preprocessing microservices with Docker and GitHub Actions

EDUCATION
B.Tech Computer Science | National Institute of Technology | 2022 - 2026

PROJECTS
1. Smart Resume Matcher - NLP entity extraction and Sentence-BERT semantic similarity
2. Sentiment Classification Engine - Fine-tuned DistilBERT on customer feedback datasets`;

const SAMPLE_JOB = `Senior Machine Learning Engineer
We are seeking an ML Engineer with hands-on proficiency in Python, PyTorch, SQL, Docker, and Scikit-Learn.
Experience building production APIs with FastAPI and background in NLP is strongly preferred.`;

export default function FairnessAudit() {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [jobText, setJobText] = useState(SAMPLE_JOB);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FairnessEvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAudit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.runFairnessAudit({
        resume_text: resumeText,
        job_description: jobText
      });
      setResult(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Fairness audit failed. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={20} style={{ color: '#174C3C' }} />
          <h1 className="text-2xl font-bold" style={{ color: '#202723', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
            Experimental Fairness & Demographic Invariance Audit
          </h1>
        </div>
        <p style={{ color: '#727A75', fontSize: '14px' }}>
          Verify that compatibility scores are invariant to protected demographic identities via live counterfactual perturbation testing.
        </p>
      </div>

      {/* Principles Callout */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4" style={{ background: '#F0F5F1', border: '1px solid #DCE9DF' }}>
          <div className="flex items-center gap-2 mb-1 font-semibold text-xs" style={{ color: '#174C3C' }}>
            <Scale size={14} /> Counterfactual Fairness
          </div>
          <p className="text-xs" style={{ color: '#3A4440', lineHeight: 1.6 }}>
            The ML model processes scrubbed representations. Names, gender, and regional indicators are stripped prior to scoring.
          </p>
        </Card>

        <Card className="p-4" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
          <div className="flex items-center gap-2 mb-1 font-semibold text-xs" style={{ color: '#202723' }}>
            <UserCheck size={14} /> Demographic Invariance
          </div>
          <p className="text-xs" style={{ color: '#727A75', lineHeight: 1.6 }}>
            Perturbation testing swaps candidate names across diverse ethnic and gender groups while keeping qualifications identical.
          </p>
        </Card>

        <Card className="p-4" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
          <div className="flex items-center gap-2 mb-1 font-semibold text-xs" style={{ color: '#202723' }}>
            <ShieldCheck size={14} /> Decision Support Only
          </div>
          <p className="text-xs" style={{ color: '#727A75', lineHeight: 1.6 }}>
            TalentLens is an advisory diagnostic tool for candidates, explicitly avoiding automated rejection decisions.
          </p>
        </Card>
      </div>

      {/* Test Playground */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-5">
          <label className="text-xs font-semibold block mb-2" style={{ color: '#3A4440' }}>
            Candidate Resume Input (Editable)
          </label>
          <textarea
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            rows={10}
            className="w-full text-xs rounded-lg p-3 outline-none resize-none"
            style={{ border: '1px solid #E5E8E6', background: '#FAFAF8', color: '#202723', lineHeight: 1.6 }}
          />
        </Card>

        <Card className="p-5">
          <label className="text-xs font-semibold block mb-2" style={{ color: '#3A4440' }}>
            Target Job Description (Editable)
          </label>
          <textarea
            value={jobText}
            onChange={e => setJobText(e.target.value)}
            rows={10}
            className="w-full text-xs rounded-lg p-3 outline-none resize-none"
            style={{ border: '1px solid #E5E8E6', background: '#FAFAF8', color: '#202723', lineHeight: 1.6 }}
          />
        </Card>
      </div>

      <div className="mb-6 flex justify-end">
        <Button onClick={runAudit} loading={loading}>
          <Play size={13} /> Run Live Demographic Invariance Audit
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-xl mb-6 flex items-start gap-2.5" style={{ background: '#FEE2E2', border: '1px solid #FECACA' }}>
          <AlertCircle size={16} style={{ color: '#DC2626', flexShrink: 0, marginTop: 1 }} />
          <div className="text-xs" style={{ color: '#991B1B' }}>{error}</div>
        </div>
      )}

      {/* Results Box */}
      {result && (
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4 border-b mb-6" style={{ borderColor: '#F0F5F1' }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} style={{ color: '#174C3C' }} />
              <h2 className="text-sm font-bold" style={{ color: '#202723' }}>
                Audit Findings & Parity Report
              </h2>
            </div>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                background: result.is_demographically_fair ? '#DCE9DF' : '#FEE2E2',
                color: result.is_demographically_fair ? '#174C3C' : '#991B1B',
              }}
            >
              {result.is_demographically_fair ? 'PASSED: 100% Invariant' : 'AUDIT WARNING'}
            </span>
          </div>

          <p className="text-xs mb-6 p-3.5 rounded-xl" style={{ background: '#F0F5F1', color: '#174C3C', border: '1px solid #DCE9DF', lineHeight: 1.65 }}>
            {result.summary}
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
              <div className="text-xs mb-1" style={{ color: '#9BA5A0' }}>Original Score</div>
              <div className="text-2xl font-bold" style={{ color: '#202723', fontFamily: 'Manrope, sans-serif' }}>
                {result.original_score}%
              </div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
              <div className="text-xs mb-1" style={{ color: '#9BA5A0' }}>Max Score Delta (Δ)</div>
              <div className="text-2xl font-bold" style={{ color: '#174C3C', fontFamily: 'Manrope, sans-serif' }}>
                {result.max_delta.toFixed(2)}%
              </div>
              <div className="text-xs" style={{ color: '#9BA5A0' }}>Threshold: &lt; 0.5%</div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
              <div className="text-xs mb-1" style={{ color: '#9BA5A0' }}>Statistical Variance (σ²)</div>
              <div className="text-2xl font-bold" style={{ color: '#174C3C', fontFamily: 'Manrope, sans-serif' }}>
                {result.score_variance.toFixed(4)}
              </div>
              <div className="text-xs" style={{ color: '#9BA5A0' }}>Zero variance = perfect parity</div>
            </div>
          </div>

          <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#727A75' }}>
            Perturbed Name Test Matrix
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(result.perturbed_scores).map(([name, score]) => (
              <div key={name} className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#FAFAF8', border: '1px solid #E5E8E6' }}>
                <span className="text-xs font-medium" style={{ color: '#202723' }}>{name}</span>
                <span className="text-xs font-bold" style={{ color: '#174C3C' }}>{score}%</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
