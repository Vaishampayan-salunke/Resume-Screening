import { Cpu, Database, Network, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';

export default function AboutModel() {
  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: '#DCE9DF', color: '#174C3C' }}>
          <Award size={12} /> Academic ML Capstone Demonstration
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#202723', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>
          Architecture, Models & Benchmark Evaluation
        </h1>
        <p style={{ color: '#727A75', fontSize: '15px', lineHeight: 1.65 }}>
          Comprehensive technical documentation of the NLP parsing pipeline, multi-factor feature engineering,
          hybrid classification architecture, and empirical evaluation metrics.
        </p>
      </div>

      {/* 1. Project Objective & Vision */}
      <Card className="p-6 mb-6">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: '#202723' }}>
          <Cpu size={16} style={{ color: '#174C3C' }} /> 1. System Objective & Paradigm
        </h2>
        <p className="text-xs mb-3" style={{ color: '#3A4440', lineHeight: 1.7 }}>
          Traditional Applicant Tracking Systems (ATS) rely on brittle keyword heuristics that penalize candidates for synonym variance
          and lack explainability. <strong>TalentLens</strong> re-architects resume analysis into an
          <strong> AI-assisted decision-support system</strong>. It combines transformer-based semantic embeddings (Sentence-BERT),
          standardized skill taxonomy normalization (ESCO), structured feature engineering, and scikit-learn classifiers to generate
          transparent, explainable compatibility breakdowns and actionable learning pathways.
        </p>
        <div className="p-3.5 rounded-xl text-xs" style={{ background: '#F0F5F1', color: '#174C3C', border: '1px solid #DCE9DF' }}>
          <strong>Core Principle:</strong> TalentLens provides diagnostic feedback to help applicants grow. It is mathematically designed to be non-punitive and demographically invariant.
        </div>
      </Card>

      {/* 2. End-to-End Pipeline Diagram */}
      <Card className="p-6 mb-6">
        <h2 className="text-base font-bold mb-4 flex items-center gap-2" style={{ color: '#202723' }}>
          <Network size={16} style={{ color: '#174C3C' }} /> 2. Hybrid NLP & ML Pipeline Architecture
        </h2>
        <div className="p-5 rounded-xl font-mono text-xs overflow-x-auto" style={{ background: '#202723', color: '#DCE9DF', lineHeight: 1.7 }}>
          <pre>{`[Candidate Resume PDF / Text]                 [Job Description Posting]
           │                                                │
           ▼                                                ▼
  [PyMuPDF / Text Extractor]                    [Requirement Cleaner]
           │                                                │
           ▼                                                ▼
 [Section Chunker (Exp/Edu/Proj)]               [Skill & Requirement Extractor]
           │                                                │
           ▼                                                ▼
   [SkillSpan / NER Pattern Matching] ───► [ESCO Taxonomy Normalizer] ◄───┘
           │                                                │
           └───────────────────────┬────────────────────────┘
                                   ▼
                    [Feature Engineering Matrix]
  ┌────────────────────────────────┬────────────────────────────────┐
  │ • SBERT Semantic Similarity    │ • Exact Skill Coverage Ratio   │
  │ • TF-IDF Baseline Cosine Sim   │ • Partial/Taxonomic Overlap    │
  │ • Experience Alignment Score   │ • Education Degree Alignment   │
  │ • Project Semantic Relevance   │ • Critical Gaps Penalty Vector │
  └────────────────────────────────┬────────────────────────────────┘
                                   │
                                   ▼
                  [Hybrid Fit Classification Engine]
                  (Logistic Regression vs Random Forest)
                                   │
              ┌────────────────────┴────────────────────┐
              ▼                                         ▼
   [Calibrated Score (0-100%)]              [Decision Support Category]
   (Multi-factor Weighted Index)             (Good Fit / Potential / Low)
              │                                         │
              └────────────────────┬────────────────────┘
                                   ▼
          [Explainability Engine & Career Roadmap Generator]
              │
              ▼
   [TalentLens Modern Editorial React Dashboard]`}</pre>
        </div>
      </Card>

      {/* 3. Benchmark Evaluation Results */}
      <Card className="p-6 mb-6">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: '#202723' }}>
          <Award size={16} style={{ color: '#174C3C' }} /> 3. Empirical Model Evaluation & Baseline Comparison
        </h2>
        <p className="text-xs mb-4" style={{ color: '#727A75' }}>
          Evaluated on real resumes from the benchmark datasets (Kaggle Updated Resume & Haider Maseeh collections),
          split 75/25 stratified train/test with zero leakage across categories.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F0F5F1', borderBottom: '1px solid #DCE9DF' }}>
                <th className="p-3 font-semibold" style={{ color: '#174C3C' }}>Model Pipeline</th>
                <th className="p-3 font-semibold" style={{ color: '#174C3C' }}>Accuracy</th>
                <th className="p-3 font-semibold" style={{ color: '#174C3C' }}>Precision (Weighted)</th>
                <th className="p-3 font-semibold" style={{ color: '#174C3C' }}>Recall (Weighted)</th>
                <th className="p-3 font-semibold" style={{ color: '#174C3C' }}>F1-Score (Weighted)</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#E5E8E6' }}>
              <tr>
                <td className="p-3 font-medium" style={{ color: '#202723' }}>Baseline: TF-IDF + Logistic Regression</td>
                <td className="p-3" style={{ color: '#3A4440' }}>74.67%</td>
                <td className="p-3" style={{ color: '#3A4440' }}>61.63%</td>
                <td className="p-3" style={{ color: '#3A4440' }}>74.67%</td>
                <td className="p-3" style={{ color: '#3A4440' }}>66.02%</td>
              </tr>
              <tr style={{ background: '#F8F8F4' }}>
                <td className="p-3 font-bold" style={{ color: '#174C3C' }}>Proposed: SBERT Hybrid + Random Forest</td>
                <td className="p-3 font-bold" style={{ color: '#174C3C' }}>92.67%</td>
                <td className="p-3 font-bold" style={{ color: '#174C3C' }}>92.79%</td>
                <td className="p-3 font-bold" style={{ color: '#174C3C' }}>92.67%</td>
                <td className="p-3 font-bold" style={{ color: '#174C3C' }}>92.21%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Feature Importances */}
        <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: '#727A75' }}>
          Random Forest Feature Gini Importances
        </h3>
        <div className="space-y-2">
          {[
            { name: 'SBERT Dense Contextual Semantic Similarity', weight: 32.1 },
            { name: 'TF-IDF Lexical Cosine Similarity', weight: 31.2 },
            { name: 'Partial / Taxonomic Adjacent Skill Overlap', weight: 16.4 },
            { name: 'Missing Critical Skills Penalty', weight: 10.9 },
            { name: 'Core Skill Coverage (Exact ESCO Matches)', weight: 9.4 },
          ].map(f => (
            <div key={f.name}>
              <div className="flex justify-between text-xs mb-1" style={{ color: '#3A4440' }}>
                <span>{f.name}</span>
                <span className="font-semibold" style={{ color: '#174C3C' }}>{f.weight}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F0F5F1' }}>
                <div className="h-full rounded-full" style={{ width: `${f.weight * 2.8}%`, background: '#174C3C' }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Datasets & Citations */}
      <Card className="p-6 mb-6">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: '#202723' }}>
          <Database size={16} style={{ color: '#174C3C' }} /> 4. Datasets, Sources & Attributions
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-lg" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
            <div className="font-semibold mb-1" style={{ color: '#202723' }}>Updated Resume Dataset (Kaggle)</div>
            <p style={{ color: '#727A75', lineHeight: 1.6 }}>962 real resumes classified across 25 distinct technical domains with full skills and project text.</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
            <div className="font-semibold mb-1" style={{ color: '#202723' }}>SkillSpan Dataset (NAACL 2022)</div>
            <p style={{ color: '#727A75', lineHeight: 1.6 }}>11,543 sentences annotated with hard skill and knowledge spans for entity extraction training.</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
            <div className="font-semibold mb-1" style={{ color: '#202723' }}>ESCO Skill Knowledge Base</div>
            <p style={{ color: '#727A75', lineHeight: 1.6 }}>European Skills, Competences and Occupations ontology providing canonical normalization aliases.</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#F8F8F4', border: '1px solid #E5E8E6' }}>
            <div className="font-semibold mb-1" style={{ color: '#202723' }}>LinkedIn & Naukri Job Postings</div>
            <p style={{ color: '#727A75', lineHeight: 1.6 }}>Real-world job requirement corpuses used for calibrating domain expectations and skill frequencies.</p>
          </div>
        </div>
      </Card>

      {/* 5. Fairness, Privacy & Limitations */}
      <Card className="p-6">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: '#202723' }}>
          <ShieldCheck size={16} style={{ color: '#174C3C' }} /> 5. Privacy Guarantees & Known Limitations
        </h2>
        <div className="space-y-3 text-xs" style={{ color: '#3A4440', lineHeight: 1.7 }}>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={14} style={{ color: '#174C3C', flexShrink: 0, marginTop: 2 }} />
            <span><strong>PII Scrubbing:</strong> Names, contact emails, phone numbers, and physical addresses are automatically anonymized before vectorized ML representation.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={14} style={{ color: '#174C3C', flexShrink: 0, marginTop: 2 }} />
            <span><strong>No Permanent Retention:</strong> Uploaded resumes reside ephemerally in session memory and can be permanently deleted with one click.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={14} style={{ color: '#174C3C', flexShrink: 0, marginTop: 2 }} />
            <span><strong>Known Limitation:</strong> Deep domain-specific jargon or novel proprietary frameworks outside the ESCO taxonomy map to semantic representations rather than exact skill nodes.</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
