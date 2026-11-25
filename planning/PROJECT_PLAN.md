# TalentLens Phase 2 — Comprehensive Project Plan

## 1. Executive Summary & Product Vision
**TalentLens** is an AI-powered career intelligence, skill development, and job discovery platform.
It acts as a personal career mentor and decision-support system for college students, fresh graduates, and professionals across Indian and international job markets.

### Key Philosophy
- **Decision-Support, Not Autonomous Gatekeeping:** TalentLens never issues automatic rejection decisions or guarantees job offers.
- **Explainability Over Black-Box Scores:** Every score is broken down into evidence-based signals (Semantic Similarity, Skill Coverage, Experience, Education, Projects).
- **Continuous Career Companion:** Unifies the student profile across resume parsing, career path discovery, real job exploration, skill roadmap generation, mock interviews, and application tracking.

---

## 2. Platform Modules & Scope

### Area A: Career Intelligence
1. **Personalized Career Dashboard (`/dashboard`)**: Career readiness gauge, top recommended career paths, skill proficiency distribution, recommended opportunities, and dynamic "Your Next Best Action".
2. **Unified Career Profile (`/profile`)**: Structured student identity, education, experience, and skills linked to verifiable *Profile Evidence* (Confidence: High/Medium/Low, Source: Projects/Internships/Mentions).
3. **AI Resume Studio & Improvement Hub (`/analyze`, `/resume/improve`)**: PDF & DOCX extraction, section segmentation, ATS readability audit, and actionable bullet-point rewriting (Google XYZ framework).
4. **Career Discovery & Simulator (`/careers`)**: Multi-role recommendations based on existing competencies, progression maps, and the *Career Path Simulator* ("What if I learn Docker and Kubernetes?").
5. **Analysis History & Archive (`/history`)**: Historical reports, progression comparisons, and privacy-compliant data export/deletion.

### Area B: Opportunities
6. **Company & Job Explorer (`/jobs`)**: Filterable job database (India/Global, remote/onsite, internships/entry-level/experienced), company intelligence profiles, and external application links.
7. **Job Compatibility Engine (`/results/:id`, `/jobs/:id/match`)**: Transparent hybrid matching, core vs. preferred skill coverage, and the "Why am I recommended for this job?" explainability report.
8. **Application & Career Tracker (`/applications`)**: Kanban & table tracking (Saved, Applied, Assessment, Interview, Offer, Rejected), interview dates, notes, and milestones.

### Area C: Growth & Preparation
9. **Personalized Learning Roadmap (`/learning`)**: Phase-by-phase roadmaps for target roles, curated free/paid verified resources (freeCodeCamp, Coursera, Kaggle, official documentation), and practical portfolio projects.
10. **Skill Explorer (`/skills`)**: Searchable ESCO-aligned skill taxonomy, industry importance, related skills, and learning timeframes.
11. **AI Interview Studio (`/interview`)**: Role-specific mock interview workspace with Technical, HR, and Project modes; text answer submission; STAR framework guidance and constructive evaluation.

### Area D: Trust & Transparency
12. **AI Transparency & Fairness Audit (`/fairness`, `/about`)**: Counterfactual demographic perturbation testing, clear documentation of model boundaries, and ethical guidelines.

---

## 3. Team Responsibilities & Execution Milestones
- **Member 1 (Frontend & Product Experience):**
  - Design system tokens (Forest green `#155642`, Warm ivory `#F8F8F4`, Sage `#DCE9DF`, Charcoal `#202A26`).
  - Responsive layouts, navigation sidebar with 4-group hierarchy.
  - Interactive career discovery simulator, application Kanban board, interview studio UI.
- **Member 2 (Backend, Database & ML):**
  - Modular FastAPI routes & SQLAlchemy database models.
  - PDF & DOCX multi-page parser with PII scrub.
  - SBERT semantic matcher, ESCO skill normalizer, and hybrid compatibility model.
  - Adzuna / provider-based job aggregation layer with offline fallback.
