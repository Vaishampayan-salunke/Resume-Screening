from fastapi import APIRouter
from app.api.routes_resume import router as resume_router
from app.api.routes_analyze import router as analyze_router
from app.api.routes_skills import router as skills_router
from app.api.routes_fairness import router as fairness_router
from app.api.routes_history import router as history_router
from app.api.routes_careers import router as careers_router
from app.api.routes_jobs import router as jobs_router
from app.api.routes_learning import router as learning_router
from app.api.routes_interviews import router as interviews_router
from app.api.routes_applications import router as applications_router
from app.api.routes_profile import router as profile_router

api_router = APIRouter()
api_router.include_router(resume_router)
api_router.include_router(analyze_router)
api_router.include_router(skills_router)
api_router.include_router(fairness_router)
api_router.include_router(history_router)
api_router.include_router(careers_router)
api_router.include_router(jobs_router)
api_router.include_router(learning_router)
api_router.include_router(interviews_router)
api_router.include_router(applications_router)
api_router.include_router(profile_router)
