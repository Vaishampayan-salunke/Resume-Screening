import uuid
from datetime import datetime
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/applications", tags=["Application Tracker"])

class ApplicationCreate(BaseModel):
    company: str
    role: str
    location: Optional[str] = "Bengaluru, India (Hybrid)"
    job_url: Optional[str] = "https://linkedin.com/jobs"
    current_status: Optional[str] = "Saved"
    applied_date: Optional[str] = None
    interview_date: Optional[str] = None
    notes: Optional[str] = ""
    salary_expectation: Optional[str] = ""

class ApplicationUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
    interview_date: Optional[str] = None
    salary_expectation: Optional[str] = None

# In-memory storage seeded with realistic sample data
APPLICATIONS_DB: List[Dict[str, Any]] = [
    {
        "id": "app-1",
        "company": "Razorpay",
        "role": "Data Scientist I - Risk Analytics",
        "location": "Bengaluru, India (Hybrid)",
        "job_url": "https://razorpay.com/careers",
        "current_status": "Interview",
        "applied_date": "2026-11-10",
        "interview_date": "2026-11-28",
        "notes": "Round 1 Technical Screening passed. Reviewing fraud detection feature engineering.",
        "salary_expectation": "₹22 - ₹28 LPA",
        "updated_at": "2026-11-20"
    },
    {
        "id": "app-2",
        "company": "Swiggy",
        "role": "Machine Learning Engineer - Search & Ranking",
        "location": "Bengaluru / Remote",
        "job_url": "https://careers.swiggy.com",
        "current_status": "Assessment",
        "applied_date": "2026-11-15",
        "interview_date": None,
        "notes": "Take-home offline coding assessment on two-tower recommendation embeddings submitted.",
        "salary_expectation": "₹24 - ₹30 LPA",
        "updated_at": "2026-11-18"
    },
    {
        "id": "app-3",
        "company": "Zepto",
        "role": "Associate AI Engineer - Logistics & Forecasting",
        "location": "Mumbai, India (On-site)",
        "job_url": "https://zeptonow.com/careers",
        "current_status": "Applied",
        "applied_date": "2026-11-22",
        "interview_date": None,
        "notes": "Submitted tailored resume highlighting PyTorch and time-series demand forecasting project.",
        "salary_expectation": "₹18 - ₹24 LPA",
        "updated_at": "2026-11-22"
    },
    {
        "id": "app-4",
        "company": "Postman",
        "role": "Backend Engineer - Platform Insights",
        "location": "Bengaluru, India (Remote)",
        "job_url": "https://postman.com/careers",
        "current_status": "Saved",
        "applied_date": "2026-11-24",
        "interview_date": None,
        "notes": "Target application. Need to refine API design and Redis caching bullet points first.",
        "salary_expectation": "₹25 - ₹32 LPA",
        "updated_at": "2026-11-24"
    }
]

@router.get("", response_model=List[Dict[str, Any]])
def list_applications():
    """Retrieve all tracked job applications."""
    return APPLICATIONS_DB


@router.post("", response_model=Dict[str, Any])
def create_application(payload: ApplicationCreate):
    """Log a new job application."""
    today = datetime.now().strftime("%Y-%m-%d")
    app_id = f"app-{uuid.uuid4().hex[:6]}"
    
    new_app = {
        "id": app_id,
        "company": payload.company,
        "role": payload.role,
        "location": payload.location or "Remote",
        "job_url": payload.job_url or "#",
        "current_status": payload.current_status or "Saved",
        "applied_date": payload.applied_date or today,
        "interview_date": payload.interview_date,
        "notes": payload.notes or "",
        "salary_expectation": payload.salary_expectation or "",
        "updated_at": today
    }
    APPLICATIONS_DB.insert(0, new_app)
    return new_app


@router.put("/{app_id}", response_model=Dict[str, Any])
def update_application(app_id: str, payload: ApplicationUpdate):
    """Update application stage, notes, or interview dates."""
    for app in APPLICATIONS_DB:
        if app["id"] == app_id:
            if payload.status is not None:
                app["current_status"] = payload.status
            if payload.notes is not None:
                app["notes"] = payload.notes
            if payload.interview_date is not None:
                app["interview_date"] = payload.interview_date
            if payload.salary_expectation is not None:
                app["salary_expectation"] = payload.salary_expectation
            app["updated_at"] = datetime.now().strftime("%Y-%m-%d")
            return app
            
    raise HTTPException(status_code=404, detail="Application not found")


@router.delete("/{app_id}")
def delete_application(app_id: str):
    """Remove a job application from tracker."""
    global APPLICATIONS_DB
    before_len = len(APPLICATIONS_DB)
    APPLICATIONS_DB = [app for app in APPLICATIONS_DB if app["id"] != app_id]
    
    if len(APPLICATIONS_DB) == before_len:
        raise HTTPException(status_code=404, detail="Application not found")
        
    return {"success": True, "message": "Application deleted"}
