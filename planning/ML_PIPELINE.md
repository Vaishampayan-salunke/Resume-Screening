# TalentLens Phase 2 — Machine Learning & NLP Pipeline

## 1. Information Extraction (Resume & Job Parsing)
- **PDF Extraction:** PyMuPDF (`fitz`) and `pypdf` with fallback text normalization.
- **DOCX Extraction:** `python-docx` extracting paragraphs and tabular content.
- **PII Scrubbing:** Pre-processing regex scrubbers for email, phone, and candidate name before embedding, ensuring demographic invariance.
- **Section Segmentation:** Heuristic heading classification for Summary, Skills, Experience, Education, Projects, and Certifications.
- **Skill Extraction:** Hybrid dictionary matcher with boundary checks + ESCO taxonomy canonical mapping.
- **Profile Evidence Grounding:** Attaches an evidence confidence rating:
  - *High:* Skill found in Projects or Work Experience descriptions.
  - *Medium:* Skill listed in dedicated technical skill section with adjacent technologies.
  - *Low:* Keyword mentioned in passing without supporting project evidence.

---

## 2. Representation & Embeddings
- **Dense Semantic Representation:** Sentence-BERT (`sentence-transformers/all-MiniLM-L6-v2`) generating 384-dimensional dense vectors.
- **Lexical Baseline:** TF-IDF n-gram vectorizer (ngram_range=(1,2), max_features=5000) for baseline comparison.
- **Similarity Computation:** Cosine similarity scaled to $[0, 100]$.

---

## 3. Hybrid Compatibility Formulation
The compatibility index is computed from 6 evidence-grounded dimensions:

$$S = 0.25 \cdot M + 0.25 \cdot K_{\text{core}} + 0.15 \cdot E + 0.15 \cdot P + 0.10 \cdot K_{\text{pref}} + 0.10 \cdot D$$

Where:
- $M$: Semantic Similarity (SBERT dense cosine similarity).
- $K_{\text{core}}$: Core Required Skill Coverage ratio.
- $K_{\text{pref}}$: Preferred/Adjacent Skill Coverage ratio.
- $E$: Experience Seniority Alignment (ratio of evidenced years to required threshold).
- $P$: Project Semantic Relevance (similarity between candidate project portfolio and role duties).
- $D$: Education Alignment (degree and academic field concordance).

### Fit Categories:
- **Strong Alignment ($S \ge 75\%$):** Candidate satisfies critical foundational competencies.
- **Developing Alignment ($50\% \le S < 75\%$):** High potential with actionable targeted skill gaps.
- **Early Alignment ($S < 50\%$):** Clear learning opportunity requiring foundational progression.

---

## 4. Career Discovery & Simulation Engine
- **Vectorized Role Profiles:** Canonical representations of major technical career paths (Data Scientist, ML Engineer, Backend Developer, DevOps Engineer, Full Stack Python Developer, Cloud Architect, Data Analyst).
- **Profile Scoring:** Evaluates candidate skills against each career path's core competency requirements.
- **What-If Simulation:** Recalculates projected compatibility when hypothetical skills ($S_{\text{hypo}}$) are added:
  $$\Delta_{\text{score}} = S(\text{Profile} \cup S_{\text{hypo}}, \text{Role}) - S(\text{Profile}, \text{Role})$$

---

## 5. Empirical Benchmark Validation
Validated on 600 real resume-job pairs from the **Updated Resume Dataset** (stratified 75/25 split):
- **Baseline (TF-IDF + Logistic Regression):** Accuracy = 74.67%, F1 = 66.02%
- **Proposed (SBERT Hybrid + Random Forest):** Accuracy = 92.67%, F1 = 92.21%
- **Feature Importances:** SBERT Semantic (32.1%), Lexical Cosine (31.2%), Partial/Adjacent Overlap (16.4%), Missing Penalty (11.0%), Core Coverage (9.4%).
