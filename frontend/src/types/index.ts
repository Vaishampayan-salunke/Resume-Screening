// Core shared types matching the FastAPI Pydantic schemas

export interface SkillDetail {
  name: string;
  canonical_name: string;
  category: string;
  level_or_context?: string;
  is_required?: boolean;
  match_status: 'matched' | 'partial' | 'missing';
  importance: 'Critical' | 'High' | 'Medium' | 'Nice-to-have';
  why_required?: string;
  learning_priority?: number;
  suggested_resources: string[];
  evidence_confidence?: 'High' | 'Medium' | 'Low';
  evidence_source?: string;
}

export interface BreakdownScores {
  semantic_similarity: number;
  skill_coverage: number;
  partial_skill_coverage: number;
  experience_alignment: number;
  education_alignment: number;
  project_relevance: number;
}

export interface ExplanationReport {
  verdict_summary: string;
  positive_highlights: string[];
  key_growth_opportunities: string[];
  encouragement_note: string;
}

export interface ProjectSuggestion {
  title: string;
  description: string;
  target_skills: string[];
  difficulty: string;
  estimated_time: string;
}

export interface CareerRoadmap {
  target_role: string;
  current_readiness_level: string;
  recommended_learning_order: string[];
  suggested_projects: ProjectSuggestion[];
  actionable_resume_tips: string[];
}

export interface AnalysisResult {
  id: string;
  resume_id: string;
  job_title: string;
  company?: string;
  overall_compatibility: number;
  fit_category: 'Good Fit' | 'Potential Fit' | 'Low Fit';
  breakdown: BreakdownScores;
  matched_skills: SkillDetail[];
  partial_skills: SkillDetail[];
  missing_skills: SkillDetail[];
  explanation: ExplanationReport;
  career_roadmap: CareerRoadmap;
  created_at: string;
}

export interface ParsedResume {
  id: string;
  filename: string;
  raw_text: string;
  cleaned_text: string;
  candidate_name?: string;
  email?: string;
  phone?: string;
  sections: Record<string, string>;
  skills: string[];
  education: string[];
  experience_years: number;
  projects: string[];
  certifications: string[];
  created_at: string;
  ats_score?: number;
  bullet_improvements?: { original: string; improved: string; reason: string }[];
}

export interface JobDescriptionInput {
  title: string;
  company?: string;
  location?: string;
  employment_type?: string;
  experience_level?: string;
  description: string;
  target_skills?: string[];
}

export interface FairnessEvaluationResult {
  original_score: number;
  perturbed_scores: Record<string, number>;
  score_variance: number;
  max_delta: number;
  is_demographically_fair: boolean;
  summary: string;
}

// --- Phase 2 Extended Types ---

export interface UserProfile {
  full_name: string;
  email: string;
  career_stage: 'Student' | 'Fresher' | 'Professional' | 'Career Switcher';
  target_role: string;
  experience_years: number;
  degree?: string;
  institution?: string;
  graduation_year?: string;
  preferred_locations: string[];
  preferred_work_mode: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible';
  profile_summary: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  skills_with_evidence: {
    skill: string;
    category: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
    confidence: 'High' | 'Medium' | 'Low';
    evidence_source: string;
  }[];
}

export interface CareerPath {
  id: string;
  title: string;
  compatibility_score: number;
  fit_category: 'Strong Fit' | 'Potential Fit' | 'Growth Match';
  salary_range: string;
  description: string;
  growth_outlook: string;
  skills_possessed: string[];
  skills_to_develop: string[];
  common_responsibilities: string[];
  typical_progression: string[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  logo_letter: string;
  location: string;
  country: 'India' | 'Global' | 'Remote';
  work_mode: 'Remote' | 'Hybrid' | 'On-site';
  employment_type: 'Full-time' | 'Internship' | 'Contract';
  experience_level: 'Entry-level' | 'Fresher' | 'Internship' | 'Mid-Senior';
  salary?: string;
  description: string;
  required_skills: string[];
  preferred_skills: string[];
  compatibility_score?: number;
  alignment_category?: 'Ready to Explore' | 'Growth Opportunity';
  source: string;
  apply_url: string;
  posted_date: string;
}

export interface RoadmapPhase {
  phase_number: number;
  phase_title: string;
  estimated_weeks: string;
  skills: {
    name: string;
    description: string;
    resources: { title: string; provider: string; type: 'Free' | 'Paid'; url: string }[];
    is_completed: boolean;
  }[];
  portfolio_project: {
    title: string;
    description: string;
    deliverables: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  };
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Technical' | 'HR' | 'Project' | 'Behavioral';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  target_skill?: string;
  sample_hint?: string;
}

export interface InterviewAnswerFeedback {
  technical_correctness_score: number; // 0-100
  conceptual_clarity_score: number;    // 0-100
  completeness_score: number;          // 0-100
  strengths: string[];
  growth_areas: string[];
  improved_sample_answer: string;
  star_framework_coaching?: string;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  job_url: string;
  current_status: 'Saved' | 'Applied' | 'Assessment' | 'Interview' | 'Offer' | 'Rejected' | 'Withdrawn';
  applied_date: string;
  interview_date?: string;
  notes: string;
  salary_expectation?: string;
  updated_at: string;
}
