# TalentLens Phase 2 — Relational Database Schema

The database model is built with SQLAlchemy and supports PostgreSQL (production/Supabase) and SQLite (local development).

## Entity-Relationship Overview

```
 [users] 1───1 [user_profiles]
    │                │
    ├──1───* [resumes] 1───* [resume_sections]
    │           │
    │           └──1───* [extracted_skills] ───* [skills] ───* [skill_categories]
    │
    ├──1───* [analyses] 1───* [skill_gaps]
    │           │
    │           └──*───1 [job_listings] 1───* [job_requirements]
    │
    ├──1───* [saved_jobs]
    ├──1───* [applications] 1───* [application_status_history]
    ├──1───* [learning_roadmaps] 1───* [roadmap_items]
    └──1───* [interview_sessions] 1───* [interview_qa_items]
```

## Table Specifications

### 1. `users` & `user_profiles`
- `users`: `id` (UUID/Int PK), `email` (unique), `hashed_password`, `full_name`, `created_at`, `updated_at`
- `user_profiles`: `id`, `user_id` (FK), `career_stage`, `target_role`, `experience_years`, `degree`, `institution`, `graduation_year`, `preferred_locations`, `preferred_work_mode` (remote/hybrid/onsite), `profile_summary`, `github_url`, `linkedin_url`, `portfolio_url`

### 2. `resumes` & `resume_sections`
- `resumes`: `id`, `user_id` (FK), `filename`, `file_format` (pdf/docx), `raw_text`, `cleaned_text`, `uploaded_at`, `is_primary`
- `resume_sections`: `id`, `resume_id` (FK), `section_type` (summary, skills, experience, education, projects, certifications), `content`

### 3. `skills` & `user_skills` (Profile Evidence)
- `skills`: `id`, `canonical_name`, `category_id` (FK), `importance`, `description`, `resources_json`
- `user_skills`: `id`, `user_id` (FK), `skill_id` (FK), `proficiency` (beginner/intermediate/advanced), `confidence` (high/medium/low), `evidence_source` (projects/work/education/mention), `evidence_text`

### 4. `job_listings` & `saved_jobs`
- `job_listings`: `id`, `external_id`, `provider` (adzuna/internal), `title`, `company`, `location`, `country`, `work_mode`, `employment_type`, `experience_level`, `salary_min`, `salary_max`, `description`, `required_skills_json`, `source_url`, `posted_at`, `is_active`
- `saved_jobs`: `id`, `user_id` (FK), `job_id` (FK), `saved_at`

### 5. `analyses` & `skill_gaps`
- `analyses`: `id`, `user_id` (FK), `resume_id` (FK), `job_id` (FK nullable), `job_title`, `overall_score`, `fit_category`, `semantic_score`, `skill_coverage_score`, `experience_score`, `education_score`, `project_score`, `explanation_json`, `created_at`
- `skill_gaps`: `id`, `analysis_id` (FK), `skill_name`, `category`, `match_status` (matched/partial/missing), `priority` (1-urgent/2-core/3-secondary), `why_required`, `learning_resource_json`

### 6. `applications` & `application_status_history`
- `applications`: `id`, `user_id` (FK), `job_id` (FK nullable), `company`, `role`, `job_url`, `current_status` (Saved, Applied, Assessment, Interview, Offer, Rejected, Withdrawn), `applied_date`, `interview_date`, `notes`, `salary_offered`, `updated_at`
- `application_status_history`: `id`, `application_id` (FK), `status`, `notes`, `timestamp`

### 7. `learning_roadmaps` & `roadmap_items`
- `learning_roadmaps`: `id`, `user_id` (FK), `target_role`, `total_items`, `completed_items`, `progress_pct`, `created_at`
- `roadmap_items`: `id`, `roadmap_id` (FK), `phase_number`, `phase_title`, `skill_name`, `description`, `resources_json`, `project_suggestion_json`, `is_completed`

### 8. `interview_sessions` & `interview_qa_items`
- `interview_sessions`: `id`, `user_id` (FK), `target_role`, `session_mode` (technical/hr/project/mock), `total_questions`, `completed_questions`, `overall_feedback`, `created_at`
- `interview_qa_items`: `id`, `session_id` (FK), `question`, `category`, `difficulty`, `user_answer`, `technical_score`, `clarity_score`, `feedback_strengths`, `feedback_improvements`, `improved_sample_answer`
