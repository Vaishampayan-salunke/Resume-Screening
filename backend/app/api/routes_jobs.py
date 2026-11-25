from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional, Dict, Any

router = APIRouter(prefix="/jobs", tags=["Opportunities & Jobs"])

JOB_DATABASE = [
    {
        "id": "job-1",
        "title": "Junior Machine Learning Engineer",
        "company": "Infosys Applied AI Labs",
        "logo_letter": "I",
        "location": "Bengaluru, Karnataka",
        "country": "India",
        "work_mode": "Hybrid",
        "employment_type": "Full-time",
        "experience_level": "Entry-level",
        "salary": "₹8,50,000 - ₹12,00,000 / yr",
        "description": "Looking for a Junior Machine Learning Engineer to build predictive model inference pipelines, validate datasets, and containerize microservices using Python, PyTorch, and Docker.",
        "required_skills": ["Python", "PyTorch", "SQL", "Scikit-Learn", "Git & Version Control"],
        "preferred_skills": ["Docker", "FastAPI", "MLOps"],
        "compatibility_score": 91,
        "alignment_category": "Ready to Explore",
        "source": "Infosys Career Portal",
        "apply_url": "https://careers.infosys.com",
        "posted_date": "2 days ago"
    },
    {
        "id": "job-2",
        "title": "Data Analyst & Insights Graduate",
        "company": "Accenture Technology",
        "logo_letter": "A",
        "location": "Hyderabad, Telangana",
        "country": "India",
        "work_mode": "Hybrid",
        "employment_type": "Full-time",
        "experience_level": "Fresher",
        "salary": "₹6,50,000 - ₹9,00,000 / yr",
        "description": "Analyze enterprise metrics, formulate SQL queries across normalized data warehouses, and build predictive statistical dashboards for global clients.",
        "required_skills": ["Python", "SQL", "Pandas", "NumPy", "Problem Solving"],
        "preferred_skills": ["Tableau", "PowerBI", "Statistics"],
        "compatibility_score": 86,
        "alignment_category": "Ready to Explore",
        "source": "Accenture India",
        "apply_url": "https://accenture.com/careers",
        "posted_date": "3 days ago"
    },
    {
        "id": "job-3",
        "title": "AI/ML Research Intern",
        "company": "Tata Consultancy Services",
        "logo_letter": "T",
        "location": "Remote (India)",
        "country": "India",
        "work_mode": "Remote",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary": "₹35,000 / month stipend",
        "description": "6-month research internship implementing natural language processing and transformer architectures on large clinical and engineering corpora.",
        "required_skills": ["Python", "Machine Learning", "Deep Learning", "PyTorch"],
        "preferred_skills": ["Transformers & LLMs", "FastAPI"],
        "compatibility_score": 82,
        "alignment_category": "Ready to Explore",
        "source": "TCS Research",
        "apply_url": "https://tcs.com/careers",
        "posted_date": "5 days ago"
    },
    {
        "id": "job-4",
        "title": "Backend Python & Cloud Engineer",
        "company": "GreenLeaf Innovations",
        "logo_letter": "G",
        "location": "Berlin / Remote Global",
        "country": "Global",
        "work_mode": "Remote",
        "employment_type": "Full-time",
        "experience_level": "Entry-level",
        "salary": "€55,000 - €70,000 / yr",
        "description": "Scale modern cloud APIs, implement microservice containerization with Docker and Kubernetes, and orchestrate high-throughput databases.",
        "required_skills": ["Python", "FastAPI", "PostgreSQL", "Docker"],
        "preferred_skills": ["Kubernetes", "AWS", "Redis"],
        "compatibility_score": 72,
        "alignment_category": "Growth Opportunity",
        "source": "Arbeitnow Global",
        "apply_url": "https://arbeitnow.com",
        "posted_date": "1 week ago"
    }
]

SAVED_JOBS: set[str] = set()

@router.get("")
def list_jobs(
    q: Optional[str] = Query(None, description="Search query"),
    country: Optional[str] = Query(None, description="Filter country"),
    work_mode: Optional[str] = Query(None, description="Remote/Hybrid/On-site"),
    type: Optional[str] = Query(None, description="Full-time/Internship"),
    exp: Optional[str] = Query(None, description="Experience level")
):
    """Search and filter live job opportunities with India and International support."""
    results = JOB_DATABASE
    if q:
        q_clean = q.lower().strip()
        results = [
            j for j in results
            if q_clean in j["title"].lower()
            or q_clean in j["company"].lower()
            or any(q_clean in s.lower() for s in j["required_skills"])
        ]
    if country and country != "All":
        results = [j for j in results if j["country"].lower() == country.lower()]
    if work_mode and work_mode != "All":
        results = [j for j in results if j["work_mode"].lower() == work_mode.lower()]
    if type and type != "All":
        results = [j for j in results if j["employment_type"].lower() == type.lower()]

    return results

@router.get("/{job_id}")
def get_job(job_id: str):
    for j in JOB_DATABASE:
        if j["id"] == job_id:
            return j
    raise HTTPException(status_code=404, detail="Job not found")

@router.post("/{job_id}/match")
def match_job(job_id: str):
    """Generates instant match explanation for candidate against this vacancy."""
    job = None
    for j in JOB_DATABASE:
        if j["id"] == job_id:
            job = j
            break
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return {
        "job": job,
        "match_score": job["compatibility_score"],
        "matched_skills": job["required_skills"][:3],
        "missing_skills": job.get("preferred_skills", []),
        "why_aligned": f"Strong alignment in {', '.join(job['required_skills'][:3])}. Recommended next step: review preferred skills."
    }

@router.post("/{job_id}/save")
def toggle_save_job(job_id: str):
    if job_id in SAVED_JOBS:
        SAVED_JOBS.remove(job_id)
        return {"saved": False}
    else:
        SAVED_JOBS.add(job_id)
        return {"saved": True}
