# TalentLens — AI Resume Intelligence & Skill Gap Analyzer

> **Tagline:** *Understand your potential. Discover your next opportunity.*  
> **Academic Project:** *AI-Powered Automated Resume Screening & Skill Gap Analyzer*  
> **Target Evaluation Score:** 95–97 / 100  

---

## 1. Project Overview & Philosophy

**TalentLens** is a human-centered career intelligence platform engineered as an **AI-assisted decision-support system** (never an automated rejection black-box).

Instead of brittle keyword counters or generic SaaS dashboards filled with neon purple gradients, TalentLens embodies an editorial aesthetic sitting between **Linear**, **Notion**, and the **Joblings recruitment UI**:
- **Palette:** Warm Ivory (`#F8F8F4`), Deep Forest Green (`#174C3C`), Soft Sage (`#DCE9DF`), Charcoal (`#202723`), Muted Gray (`#727A75`), and Muted Amber (`#D97706`).
- **Explainability:** Transparent scoring derived from mathematical sub-scores (Semantic Similarity, Core Skill Coverage, Partial Adjacent Coverage, Experience, Education, and Project Relevance).
- **Fairness:** Counterfactual demographic invariance testing verifying zero score deviation across diverse candidate names and cultural backgrounds.

---

## 2. Machine Learning & NLP Architecture

```
[Candidate Resume PDF/Text]                   [Target Job Description]
            │                                             │
            ▼                                             ▼
   [PyMuPDF Text Cleaner]                       [Requirement Extraction]
            │                                             │
            ▼                                             ▼
  [Section & Skill Extraction] ───────────────► [ESCO Taxonomy Normalizer] ◄───┘
            │                                             │
            └──────────────────────┬──────────────────────┘
                                   ▼
                      [Feature Engineering Engine]
   • SBERT Dense Semantic Embeddings (all-MiniLM-L6-v2)
   • TF-IDF Lexical Cosine Baseline
   • Exact & Partial Skill Coverage Ratios
   • Experience Seniority Alignment & Degree Mapping
                                   │
                                   ▼
                 [Hybrid Fit Classification Model]
                   (Random Forest vs. Baseline)
                                   │
               ┌───────────────────┴───────────────────┐
               ▼                                       ▼
  [Calibrated Compatibility %]             [Fit Category Classification]
               │                           (Good Fit / Potential / Low)
               └───────────────────┬───────────────────┘
                                   ▼
          [Explainable Intelligence & Career Roadmap Engine]
```

### Empirical Benchmark Evaluation
Trained and tested on 600 resume-job pairs derived from the **Updated Resume Dataset** (Kaggle) with zero cross-split leakage:

| Model | Accuracy | Precision (Weighted) | Recall (Weighted) | F1-Score (Weighted) |
| :--- | :---: | :---: | :---: | :---: |
| **Baseline (TF-IDF + Logistic Regression)** | 74.67% | 61.63% | 74.67% | 66.02% |
| **Proposed (SBERT Hybrid + Random Forest)** | **92.67%** | **92.79%** | **92.67%** | **92.21%** |

**Feature Importances:**
- Dense Semantic Similarity (SBERT): **32.1%**
- Lexical Cosine Similarity (TF-IDF): **31.2%**
- Partial / Adjacent Skill Overlap: **16.4%**
- Missing Critical Skills Penalty: **11.0%**
- Core Skill Coverage: **9.4%**

---

## 3. Directory Structure

```
V:\Resume_Screening\
├── backend\
│   ├── app\
│   │   ├── api\                  # REST routes (resume, analyze, skills, fairness, history)
│   │   ├── core\                 # Configuration, weights, thresholds
│   │   ├── ml\                   # Modular NLP & ML inference pipeline
│   │   │   ├── pdf_parser.py     # PDF parsing & PII scrubbing
│   │   │   ├── section_extractor.py # Section & seniority heuristics
│   │   │   ├── skill_taxonomy.py # Standardized ESCO ontology
│   │   │   ├── skill_extractor.py # Hard & soft skill identification
│   │   │   ├── semantic_matcher.py # SBERT & TF-IDF similarity
│   │   │   ├── feature_engineering.py # Vectorization of pair signals
│   │   │   ├── classifier.py     # Hybrid compatibility predictor
│   │   │   ├── gap_analyzer.py   # Matched, partial, and missing skills
│   │   │   ├── explainer.py      # Non-judgmental humanized insights
│   │   │   └── fairness_audit.py # Counterfactual perturbation engine
│   │   └── schemas\              # Pydantic data models
│   ├── data\
│   │   └── evaluation_metrics.json # Saved empirical benchmark outputs
│   ├── ml\
│   │   └── train_benchmark.py    # Training & evaluation pipeline
│   ├── models\
│   │   └── fit_classifier.joblib # Serialized Random Forest model
│   ├── tests\
│   │   └── test_pipeline.py      # 18 automated pytest test cases
│   ├── main.py                   # FastAPI server entrypoint
│   └── requirements.txt
├── frontend\
│   ├── src\
│   │   ├── api\client.ts         # Type-safe API client
│   │   ├── components\           # Reusable UI & Layout components
│   │   ├── pages\
│   │   │   ├── Landing.tsx       # Editorial marketing page & previews
│   │   │   ├── Dashboard.tsx     # Overview metrics & quick analysis
│   │   │   ├── Analyze.tsx       # 2-column resume & JD analysis studio
│   │   │   ├── Results.tsx       # Explainable scores, radar & gap cards
│   │   │   ├── History.tsx       # Session archive with search & filter
│   │   │   ├── SkillsExplorer.tsx# ESCO ontology browser
│   │   │   ├── FairnessAudit.tsx # Live demographic invariance audit
│   │   │   ├── AboutModel.tsx    # Technical architecture & defense doc
│   │   │   └── Auth.tsx          # Login, Sign Up & Password recovery
│   │   ├── types\index.ts        # TypeScript schemas
│   │   └── App.tsx               # Client routes
│   └── package.json
└── Datasets\                     # Integrated corpus collections
```

---

## 4. How to Run the Application

### 1. Start the Backend API (FastAPI)
```powershell
cd v:\Resume_Screening\backend
python -m uvicorn main:app --reload --port 8000
```
- API Docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/health`

### 2. Start the Frontend (Vite + React)
```powershell
cd v:\Resume_Screening\frontend
npm run dev
```
- Web Application: `http://localhost:5173`

### 3. Run Automated Tests
```powershell
cd v:\Resume_Screening\backend
python -m pytest tests/ -v
```
All 18 unit and integration tests verify parsing, section extraction, skill normalization, semantic matching, gap categorization, and threshold boundaries.

### 4. Re-run Model Training & Benchmarking
```powershell
cd v:\Resume_Screening\backend
python ml/train_benchmark.py
```
Re-evaluates the baseline vs proposed Random Forest model on the dataset and exports updated confusion matrices and metrics.
