from fastapi import APIRouter
from typing import List
from app.schemas.resume import AnalysisResult
from app.api.routes_analyze import ANALYSIS_HISTORY

router = APIRouter(prefix="/history", tags=["Analysis History"])

@router.get("", response_model=List[AnalysisResult])
def get_history():
    """Retrieve all past analyses run in the current session."""
    return ANALYSIS_HISTORY

@router.delete("")
def clear_history():
    """Clears past analyses upon user consent for privacy compliance."""
    ANALYSIS_HISTORY.clear()
    return {"message": "Analysis history cleared successfully."}
