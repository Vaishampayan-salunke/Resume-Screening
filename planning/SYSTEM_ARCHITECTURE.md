# TalentLens Phase 2 — System Architecture

```
                                  [Client Browser]
                 (React 19 + TypeScript + Vite + Tailwind CSS)
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   │               TanStack Query              │
                   │               REST API Client             │
                   └─────────────────────┬─────────────────────┘
                                         │ HTTP/JSON
                                         ▼
                             [FastAPI Backend Engine]
                                (Uvicorn / Python)
                                         │
          ┌──────────────────────────────┼──────────────────────────────┐
          ▼                              ▼                              ▼
 [Core API Routers]            [Database Layer]              [ML & NLP Services]
 • /api/auth                   • SQLAlchemy ORM              • Resume Parser (PyMuPDF & docx)
 • /api/profile                • SQLite / PostgreSQL         • Skill Extractor & ESCO Normalizer
 • /api/resumes                • Repository Services         • SBERT Semantic Matcher (all-MiniLM-L6-v2)
 • /api/careers                • User Ownership Checks       • Hybrid Compatibility Engine
 • /api/jobs                                                 • Career Recommender & Simulator
 • /api/learning                                             • Learning Roadmap Generator
 • /api/interviews                                           • AI Interview Evaluator
 • /api/applications                                         • Fairness Perturbation Auditor
 • /api/fairness                                                        │
          │                                                             ▼
          ▼                                                   [External Integrations]
 [Data Export & Files]                                        • Adzuna Job Search API (Provider)
 • Local Storage (Dev)                                        • ESCO Skill Taxonomy Knowledge Base
 • PDF Report Exporter                                        • Curated Learning Resource Repos
```

## Service Decoupling
1. **Frontend:** React application with client-side routing, query caching, and responsive editorial layout.
2. **Backend API:** FastAPI services utilizing Pydantic models for strict contract verification and validation.
3. **ML Engine:** Standalone Python modules that run locally without requiring third-party cloud LLM API dependencies, ensuring zero external vendor lock-in and offline operability for university defense.
4. **Data Layer:** Relational models supporting candidate profiles, multi-version resumes, job descriptions, learning milestones, and application states.
