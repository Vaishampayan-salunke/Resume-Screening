import type { ParsedResume, AnalysisResult, FairnessEvaluationResult } from '../types';

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

  uploadResume: async (file: File): Promise<ParsedResume> => {
    const form = new FormData();
    form.append('file', file);
    return request<ParsedResume>('/resume/upload', { method: 'POST', body: form });
  },

  getResume: (id: string): Promise<ParsedResume> =>
    request<ParsedResume>(`/resume/${id}`),

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

  getSkills: (params?: { category?: string; search?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return request<{ canonical_name: string; category: string; importance: string }[]>(
      `/skills${qs ? `?${qs}` : ''}`
    );
  },

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
