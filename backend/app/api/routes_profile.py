from typing import List, Optional, Dict, Any
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/profile", tags=["User Profile & Preferences"])

class SkillEvidence(BaseModel):
    skill: str
    category: str
    proficiency: str
    confidence: str
    evidence_source: str

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    career_stage: Optional[str] = None
    target_role: Optional[str] = None
    experience_years: Optional[float] = None
    degree: Optional[str] = None
    institution: Optional[str] = None
    graduation_year: Optional[str] = None
    preferred_locations: Optional[List[str]] = None
    preferred_work_mode: Optional[str] = None
    profile_summary: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    skills_with_evidence: Optional[List[SkillEvidence]] = None

CURRENT_PROFILE: Dict[str, Any] = {
    "full_name": "Aarav Sharma",
    "email": "aarav.sharma@talentlens.internal",
    "career_stage": "Fresher",
    "target_role": "Data Scientist / Machine Learning Engineer",
    "experience_years": 1.2,
    "degree": "B.Tech in Computer Science & Engineering",
    "institution": "National Institute of Technology (NIT)",
    "graduation_year": "2025",
    "preferred_locations": ["Bengaluru", "Hyderabad", "Pune", "Remote"],
    "preferred_work_mode": "Hybrid",
    "profile_summary": "Aspiring Data Scientist with strong foundational knowledge in Python, PyTorch, SQL, and natural language processing. Experienced in building end-to-end ML classification and embedding pipelines.",
    "github_url": "https://github.com/aarav-sharma-ml",
    "linkedin_url": "https://linkedin.com/in/aarav-sharma-ai",
    "portfolio_url": "https://aarav-portfolio.dev",
    "skills_with_evidence": [
        {
            "skill": "Python",
            "category": "Programming Languages",
            "proficiency": "Advanced",
            "confidence": "High",
            "evidence_source": "4 repositories on GitHub, 2 production-grade scripts in uploaded resume"
        },
        {
            "skill": "PyTorch",
            "category": "Machine Learning & AI",
            "proficiency": "Intermediate",
            "confidence": "High",
            "evidence_source": "Resume project: Custom Transformer text summarization architecture"
        },
        {
            "skill": "SQL",
            "category": "Databases & Data Management",
            "proficiency": "Intermediate",
            "confidence": "Medium",
            "evidence_source": "Academic coursework + HackerRank Gold badge in SQL"
        },
        {
            "skill": "FastAPI",
            "category": "Backend & System Design",
            "proficiency": "Intermediate",
            "confidence": "High",
            "evidence_source": "Built REST API endpoints for automated model inference serving"
        },
        {
            "skill": "Docker",
            "category": "DevOps & Cloud",
            "proficiency": "Beginner",
            "confidence": "Low",
            "evidence_source": "Self-reported, verified in single docker-compose.yml configuration"
        },
        {
            "skill": "Natural Language Processing (NLP)",
            "category": "Machine Learning & AI",
            "proficiency": "Intermediate",
            "confidence": "High",
            "evidence_source": "Published B.Tech capstone paper on dense semantic text embeddings"
        }
    ]
}

@router.get("/me", response_model=Dict[str, Any])
def get_user_profile():
    """Retrieve the current logged-in user profile with grounded evidence."""
    return CURRENT_PROFILE


@router.put("/me", response_model=Dict[str, Any])
def update_user_profile(payload: ProfileUpdate):
    """Update profile fields and preferences."""
    global CURRENT_PROFILE
    update_data = payload.model_dump(exclude_unset=True)
    for key, val in update_data.items():
        if val is not None:
            CURRENT_PROFILE[key] = val
    return CURRENT_PROFILE
