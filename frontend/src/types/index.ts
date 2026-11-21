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
