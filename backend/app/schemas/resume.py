from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class SkillDetail(BaseModel):
    name: str
    canonical_name: str
    category: str = "General"  # e.g., "Programming Languages", "Machine Learning", "DevOps & Cloud", "Data Engineering", "Soft Skills"
    level_or_context: Optional[str] = None
    is_required: bool = True
    match_status: str = "missing"  # "matched", "partial", "missing"
    importance: str = "Medium"  # "Critical", "High", "Medium", "Nice-to-have"
    why_required: Optional[str] = None
    learning_priority: Optional[int] = None  # 1 (Urgent), 2 (Core), 3 (Secondary)
    suggested_resources: List[str] = Field(default_factory=list)

class ResumeSection(BaseModel):
    name: str
    content: str
    confidence: float = 1.0

class ParsedResume(BaseModel):
    id: str
    filename: str
    raw_text: str
    cleaned_text: str
    candidate_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    sections: Dict[str, str] = Field(default_factory=dict)
    skills: List[str] = Field(default_factory=list)
    education: List[str] = Field(default_factory=list)
    experience_years: float = 0.0
    projects: List[str] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class JobDescriptionInput(BaseModel):
    title: str = Field(..., example="Machine Learning Engineer")
    company: Optional[str] = Field(None, example="GreenTech Innovations")
    location: Optional[str] = Field(None, example="Remote / New York, NY")
    employment_type: Optional[str] = Field(None, example="Full-time")
    experience_level: Optional[str] = Field(None, example="Mid-Senior (2+ years)")
    description: str = Field(..., min_length=20, example="Looking for an ML engineer with Python, PyTorch, SQL, and Docker...")
    target_skills: Optional[List[str]] = Field(default_factory=list)

class BreakdownScores(BaseModel):
    semantic_similarity: float = Field(..., description="Sentence-BERT cosine similarity score (0-100)")
    skill_coverage: float = Field(..., description="Exact required skills coverage (0-100)")
    partial_skill_coverage: float = Field(..., description="Related/taxonomic skill coverage (0-100)")
    experience_alignment: float = Field(..., description="Experience years & seniority alignment (0-100)")
    education_alignment: float = Field(..., description="Degree and discipline alignment (0-100)")
    project_relevance: float = Field(..., description="Project semantic relevance (0-100)")

class ProjectSuggestion(BaseModel):
    title: str
    description: str
    target_skills: List[str]
    difficulty: str  # Beginner, Intermediate, Advanced
    estimated_time: str

class CareerRoadmap(BaseModel):
    target_role: str
    current_readiness_level: str  # "Ready to Apply", "Interview Ready with Refinements", "Focused Skill Building Required"
    recommended_learning_order: List[str]
    suggested_projects: List[ProjectSuggestion]
    actionable_resume_tips: List[str]

class ExplanationReport(BaseModel):
    verdict_summary: str
    positive_highlights: List[str]
    key_growth_opportunities: List[str]
    encouragement_note: str

class AnalysisResult(BaseModel):
    id: str
    resume_id: str
    job_title: str
    company: Optional[str] = None
    overall_compatibility: float = Field(..., description="Combined calibrated score (0-100)")
    fit_category: str = Field(..., description="Good Fit, Potential Fit, or Low Fit")
    breakdown: BreakdownScores
    matched_skills: List[SkillDetail]
    partial_skills: List[SkillDetail]
    missing_skills: List[SkillDetail]
    explanation: ExplanationReport
    career_roadmap: CareerRoadmap
    created_at: datetime = Field(default_factory=datetime.utcnow)

class FairnessTestInput(BaseModel):
    resume_text: str
    job_description: str
    names_to_test: List[str] = Field(default_factory=lambda: [
        "Alex Miller", "Priya Sharma", "Amina Al-Mansoor", "David Cohen", "Chen Wei", "Marcus Washington"
    ])

class FairnessEvaluationResult(BaseModel):
    original_score: float
    perturbed_scores: Dict[str, float]
    score_variance: float
    max_delta: float
    is_demographically_fair: bool
    summary: str
