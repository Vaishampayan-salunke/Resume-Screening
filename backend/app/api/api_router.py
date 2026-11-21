from fastapi import APIRouter
from app.api.routes_resume import router as resume_router
from app.api.routes_analyze import router as analyze_router
from app.api.routes_skills import router as skills_router
from app.api.routes_fairness import router as fairness_router
from app.api.routes_history import router as history_router

api_router = APIRouter()
api_router.include_router(resume_router)
api_router.include_router(analyze_router)
api_router.include_router(skills_router)
api_router.include_router(fairness_router)
api_router.include_router(history_router)
