# TalentLens Phase 2 — API Specification

Base URL: `/api`

## Authentication & User Profile
- `POST /api/auth/register`: Create user account (`email`, `password`, `full_name`).
- `POST /api/auth/login`: Authenticate and receive JWT token.
- `GET /api/profile/me`: Get authenticated user profile, skills, and preferences.
- `PUT /api/profile/me`: Update profile preferences, education, experience, and contact info.
- `POST /api/profile/skills`: Add or update a user skill with evidence and confidence level.

## Resume Studio & Parser
- `POST /api/resume/upload`: Upload PDF or DOCX file (multipart/form-data). Extracts text, sections, skills, and seniority.
- `GET /api/resume/{id}`: Retrieve parsed resume data.
- `PUT /api/resume/{id}`: Allow user to manually correct extracted sections or skills.
- `GET /api/resume/{id}/improve`: Get actionable resume improvement tips (Google XYZ framework, ATS checklist).

## Matching & Compatibility Analysis
- `POST /api/analyze`: Run hybrid resume-to-job matching. Returns 0-100 score, fit category, 6 breakdown dimensions, skill gaps, and explanation.
- `GET /api/analyze/{id}`: Retrieve prior analysis report.
- `GET /api/history`: List all previous analyses for the authenticated user.
- `DELETE /api/history`: Clear all analysis records (privacy compliance).

## Career Discovery & Simulator
- `GET /api/careers/recommendations`: Recommends top matching career roles based on user profile skills and background.
- `POST /api/careers/simulate`: Simulates compatibility change if user adds hypothetical skills (e.g. "+ Docker, + SQL").

## Company & Job Explorer
- `GET /api/jobs`: Search and filter jobs (query, country, city, remote/onsite, experience level, employment type).
- `GET /api/jobs/{id}`: View full job description, requirements, and company profile.
- `POST /api/jobs/{id}/match`: Instant match of current profile against this job with explainability breakdown.
- `POST /api/jobs/{id}/save`: Toggle saving this job.
- `GET /api/jobs/saved`: List saved jobs.

## Learning Roadmap Center
- `GET /api/learning/roadmap`: Get or generate personalized multi-phase learning path for target role.
- `POST /api/learning/progress`: Toggle completion of a roadmap skill or project.
- `GET /api/skills`: Search ESCO skill ontology with importance, categories, and resources.

## AI Interview Studio
- `POST /api/interviews/sessions`: Start new mock interview session for a target role (modes: technical, hr, project, mock).
- `POST /api/interviews/{id}/answers`: Submit candidate answer to a question and receive immediate structured AI coaching feedback.
- `GET /api/interviews/{id}`: Get full interview session with rubric evaluation and improved answer suggestions.

## Application Tracker
- `GET /api/applications`: Get all tracked applications with status pipeline (Saved, Applied, Assessment, Interview, Offer, Rejected).
- `POST /api/applications`: Add a job to application tracker.
- `PUT /api/applications/{id}`: Update application stage, interview date, or notes.
- `DELETE /api/applications/{id}`: Remove an application record.

## AI Transparency & Fairness
- `POST /api/fairness/audit`: Run counterfactual demographic perturbation audit testing score invariance across names.
- `GET /api/fairness/metrics`: Retrieve empirical benchmark accuracy, F1, and feature importances.
