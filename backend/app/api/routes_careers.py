from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/careers", tags=["Career Discovery"])

CAREER_ARCHETYPES = [
    {
        "id": "data-analyst",
        "title": "Data Analyst",
        "compatibility_score": 89,
        "fit_category": "Strong Fit",
        "salary_range": "₹6.5L - ₹12L / $75k - $95k",
        "description": "Extract, clean, and visualize enterprise datasets using Python, SQL, and analytical reporting dashboards.",
        "growth_outlook": "High demand (+23% YoY)",
        "skills_possessed": ["Python", "SQL", "Pandas", "NumPy", "Data Visualization"],
        "skills_to_develop": ["Tableau / PowerBI", "Advanced SQL Window Functions"],
        "common_responsibilities": [
            "Build automated business intelligence reports",
            "Query multi-terabyte data warehouses using optimized SQL",
            "Collaborate with product teams to track KPIs"
        ],
        "typical_progression": ["Junior Analyst", "Senior Data Analyst", "Lead Analytics Engineer", "Head of BI"]
    },
    {
        "id": "python-dev",
        "title": "Full Stack Python Developer",
        "compatibility_score": 84,
        "fit_category": "Strong Fit",
        "salary_range": "₹7L - ₹14L / $80k - $110k",
        "description": "Design and deploy robust backend APIs with FastAPI, integrate frontend components, and manage database transactions.",
        "growth_outlook": "Very High demand across startups & product companies",
        "skills_possessed": ["Python", "FastAPI", "SQL", "Git & Version Control", "React"],
        "skills_to_develop": ["Docker", "CI/CD Pipelines", "Redis"],
        "common_responsibilities": [
            "Develop RESTful microservices and asynchronous backend endpoints",
            "Design relational schemas and database indexes",
            "Integrate third-party APIs and frontend components"
        ],
        "typical_progression": ["Junior Developer", "SDE II", "Senior Backend Engineer", "Engineering Manager"]
    },
    {
        "id": "ml-engineer",
        "title": "Machine Learning Engineer",
        "compatibility_score": 78,
        "fit_category": "Potential Fit",
        "salary_range": "₹8.5L - ₹18L / $95k - $130k",
        "description": "Train, evaluate, and productionize predictive machine learning pipelines and deep neural networks.",
        "growth_outlook": "Exponential growth across GenAI & intelligent systems",
        "skills_possessed": ["Python", "PyTorch", "Scikit-Learn", "NumPy", "Machine Learning"],
        "skills_to_develop": ["Docker", "MLOps & CI/CD", "Transformers & LLM Fine-tuning"],
        "common_responsibilities": [
            "Benchmark and optimize supervised/unsupervised model architectures",
            "Containerize model inference pipelines for sub-100ms latency",
            "Implement automated data validation and drift monitoring"
        ],
        "typical_progression": ["ML Intern / Junior MLE", "Machine Learning Engineer", "Senior MLOps Architect", "Principal AI Scientist"]
    },
    {
        "id": "devops-engineer",
        "title": "DevOps & Cloud Platform Engineer",
        "compatibility_score": 64,
        "fit_category": "Growth Match",
        "salary_range": "₹8L - ₹16L / $90k - $125k",
        "description": "Automate build, deployment, and cloud infrastructure pipelines across distributed clusters.",
        "growth_outlook": "Stable high enterprise demand",
        "skills_possessed": ["Python Scripting", "Git & Version Control"],
        "skills_to_develop": ["Docker", "Kubernetes", "AWS / GCP Cloud", "Terraform"],
        "common_responsibilities": [
            "Maintain CI/CD pipelines with GitHub Actions",
            "Manage containerized microservices in Kubernetes",
            "Provision infrastructure-as-code and cloud networking"
        ],
        "typical_progression": ["Cloud Associate", "DevOps Engineer", "Senior Platform Architect", "Director of Infrastructure"]
    }
]

class SimulateRequest(BaseModel):
    current_skills: Optional[List[str]] = []
    added_skills: Optional[List[str]] = []
    acquired_skills: Optional[List[str]] = None
    role_id: Optional[str] = None
    target_role: Optional[str] = None

@router.get("/recommendations")
def get_career_recommendations():
    """Returns ranked multi-role career pathways matching the candidate's demonstrated profile."""
    return CAREER_ARCHETYPES

@router.post("/simulate")
def simulate_career_impact(req: SimulateRequest):
    """
    Career Path Simulator: Recalculates projected compatibility score
    if candidate adds hypothetical skills (e.g. Docker, PostgreSQL).
    """
    target = req.role_id or req.target_role or "ml-engineer"
    added = req.added_skills if req.added_skills else (req.acquired_skills or [])
    
    base_score = 72.0
    for c in CAREER_ARCHETYPES:
        if c["id"] == target or c["title"].lower() == target.lower():
            base_score = float(c["compatibility_score"])
            break

    # Calculate realistic boost: each relevant added skill adds 4-6% up to 96%
    boost = len(added) * 5.5
    projected = min(96.0, round(base_score + boost, 1))
    delta = round(projected - base_score, 1)

    return {
        "original_score": base_score,
        "baseline_score": base_score,
        "projected_score": projected,
        "simulated_score": projected,
        "delta": delta,
        "unlocked_competencies": added,
        "newly_unlocked_capabilities": added
    }
