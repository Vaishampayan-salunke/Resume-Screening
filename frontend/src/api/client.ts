import type {
  ParsedResume,
  AnalysisResult,
  FairnessEvaluationResult,
  UserProfile,
  CareerPath,
  JobListing,
  RoadmapPhase,
  InterviewQuestion,
  InterviewAnswerFeedback,
  JobApplication
} from '../types';

const BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  health: () => request<{ status: string; app: string }>('/health'),

  // Resume Upload & Extraction
  uploadResume: async (file: File): Promise<ParsedResume> => {
    const form = new FormData();
    form.append('file', file);
    return request<ParsedResume>('/resume/upload', { method: 'POST', body: form });
  },

  getResume: (id: string): Promise<ParsedResume> =>
    request<ParsedResume>(`/resume/${id}`),

  getResumeImprovement: (id: string): Promise<{ ats_score: number; bullet_improvements: { original: string; improved: string; reason: string }[]; section_checklist: { section: string; status: 'present' | 'missing' | 'incomplete'; recommendation: string }[] }> =>
    request(`/resume/${id}/improve`),

  // Analysis & Matching
  analyze: (payload: {
    resume_id?: string;
    resume_text?: string;
    job: {
      title: string;
      company?: string;
      location?: string;
      employment_type?: string;
      experience_level?: string;
      description: string;
      target_skills?: string[];
    };
  }): Promise<AnalysisResult> =>
    request<AnalysisResult>('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),

  getAnalysis: (id: string): Promise<AnalysisResult> =>
    request<AnalysisResult>(`/analyze/${id}`),

  getHistory: (): Promise<AnalysisResult[]> =>
    request<AnalysisResult[]>('/history'),

  clearHistory: () =>
    request('/history', { method: 'DELETE' }),

  // Career Explorer & Simulation
  getCareerRecommendations: (): Promise<CareerPath[]> =>
    request<CareerPath[]>('/careers/recommendations'),

  simulateCareerSkills: (payload: { current_skills: string[]; added_skills: string[]; role_id: string }): Promise<{ original_score: number; projected_score: number; delta: number; unlocked_competencies: string[] }> =>
    request('/careers/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }),

  // Opportunities & Job Search
  getJobs: (params?: { q?: string; country?: string; work_mode?: string; type?: string; exp?: string }): Promise<JobListing[]> => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return request<JobListing[]>(`/jobs${qs ? `?${qs}` : ''}`);
  },

  getJobById: (id: string): Promise<JobListing> =>
    request<JobListing>(`/jobs/${id}`),

  matchJobWithProfile: (jobId: string): Promise<{ job: JobListing; match_score: number; matched_skills: string[]; missing_skills: string[]; why_aligned: string }> =>
    request(`/jobs/${jobId}/match`, { method: 'POST' }),

  saveJob: (jobId: string): Promise<{ saved: boolean }> =>
    request(`/jobs/${jobId}/save`, { method: 'POST' }),

  // Learning Roadmaps
  getLearningRoadmap: (role?: string): Promise<{ target_role: string; phases: RoadmapPhase[] }> => {
    const qs = role ? `?role=${encodeURIComponent(role)}` : '';
    return request(`/learning/roadmap${qs}`);
  },

  toggleLearningProgress: (skillName: string, completed: boolean): Promise<{ success: boolean }> =>
    request('/learning/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill_name: skillName, completed })
    }),

  // AI Interview Studio
  getInterviewQuestions: (role: string, mode: string): Promise<InterviewQuestion[]> =>
    request(`/interviews/questions?role=${encodeURIComponent(role)}&mode=${encodeURIComponent(mode)}`),

  evaluateInterviewAnswer: (payload: { question_id: string; question: string; answer: string; target_role: string }): Promise<InterviewAnswerFeedback> =>
    request<InterviewAnswerFeedback>('/interviews/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }),

  // Application Tracker
  getApplications: (): Promise<JobApplication[]> =>
    request<JobApplication[]>('/applications'),

  createApplication: (payload: Partial<JobApplication>): Promise<JobApplication> =>
    request<JobApplication>('/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }),

  updateApplicationStatus: (id: string, status: string, notes?: string): Promise<JobApplication> =>
    request<JobApplication>(`/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes })
    }),

  deleteApplication: (id: string): Promise<{ success: boolean }> =>
    request(`/applications/${id}`, { method: 'DELETE' }),

  // User Profile & Preferences
  getUserProfile: (): Promise<UserProfile> =>
    request<UserProfile>('/profile/me'),

  updateUserProfile: (profile: Partial<UserProfile>): Promise<UserProfile> =>
    request<UserProfile>('/profile/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    }),

  // Skill Taxonomy
  getSkills: (params?: { category?: string; search?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return request<{ canonical_name: string; category: string; importance: string; why_required: string; resources: string[] }[]>(
      `/skills${qs ? `?${qs}` : ''}`
    );
  },

  // Fairness Audit
  runFairnessAudit: (payload: {
    resume_text: string;
    job_description: string;
    names_to_test?: string[];
  }): Promise<FairnessEvaluationResult> =>
    request<FairnessEvaluationResult>('/fairness/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
};
