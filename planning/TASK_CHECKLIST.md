# TalentLens Phase 2 — Implementation Task Checklist

## Phase 1: Planning & Architecture
- [x] Inspect existing workspace, datasets, and codebase.
- [x] Create `PROJECT_PLAN.md`
- [x] Create `SYSTEM_ARCHITECTURE.md`
- [x] Create `DATABASE_SCHEMA.md`
- [x] Create `API_SPECIFICATION.md`
- [x] Create `ML_PIPELINE.md`
- [x] Create `DEVELOPMENT_ROADMAP.md`
- [x] Create `TASK_CHECKLIST.md`

## Phase 2: Design & Frontend Foundations
- [ ] Implement enhanced 4-group Sidebar navigation (`Sidebar.tsx`)
- [ ] Build Unified Career Profile Page (`/profile`)
- [ ] Build Career Discovery & Path Simulator Page (`/careers`)
- [ ] Build Company & Job Opportunity Explorer Page (`/jobs`)
- [ ] Build Personalized Learning Roadmap Page (`/learning`)
- [ ] Build AI Interview Studio Page (`/interview`)
- [ ] Build Application Tracker Kanban Board Page (`/applications`)
- [ ] Build Resume Improvement Studio (`/resume/improve`)
- [ ] Upgrade Dashboard with Career Readiness & Next Best Action
- [ ] Update Client API Services & Types (`api/client.ts`, `types/index.ts`)

## Phase 3: Backend Services & Database
- [ ] Add `python-docx` support for `.docx` resume extraction
- [ ] Build Career Discovery & Simulation endpoints (`/api/careers`)
- [ ] Build Job Listings Search, Filter, and Matching endpoints (`/api/jobs`)
- [ ] Build Learning Roadmap Generator & Progress endpoints (`/api/learning`)
- [ ] Build AI Interview Studio Question Generator & Evaluator endpoints (`/api/interviews`)
- [ ] Build Application Tracker CRUD endpoints (`/api/applications`)
- [ ] Build Profile & User Settings endpoints (`/api/profile`)

## Phase 4: ML & NLP Pipeline
- [ ] Multi-page resume text parser supporting both PDF and DOCX
- [ ] PII scrub before embedding (name, email, phone)
- [ ] Profile Evidence confidence scoring (High/Medium/Low based on section grounding)
- [ ] Calibrated 6-dimension compatibility calculation
- [ ] SBERT + Random Forest inference serving

## Phase 5: Integration & Verification
- [ ] Connect all frontend pages to live FastAPI endpoints
- [ ] Run backend unit tests (`pytest tests/`)
- [ ] Run frontend production compilation (`npm run build`)
- [ ] Verify complete user flow from onboarding to interview prep and application tracking
