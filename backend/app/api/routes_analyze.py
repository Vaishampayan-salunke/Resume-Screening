import uuid
from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.api.routes_resume import RESUME_STORE
from app.schemas.resume import (
    JobDescriptionInput,
    AnalysisResult,
    ParsedResume
)
from app.ml.feature_engineering import FeatureEngineer
from app.ml.classifier import fit_classifier
from app.ml.skill_extractor import SkillExtractor
from app.ml.section_extractor import SectionExtractor
from app.ml.explainer import ExplanationEngine

router = APIRouter(prefix="/analyze", tags=["Analysis"])

# Session history store
ANALYSIS_HISTORY: list[AnalysisResult] = []

class AnalyzeRequest(BaseModel):
    resume_id: Optional[str] = None
    resume_text: Optional[str] = None
    job: JobDescriptionInput

@router.post("", response_model=AnalysisResult)
def perform_analysis(req: AnalyzeRequest):
    """
    Performs end-to-end NLP & Machine Learning compatibility analysis,
    generating calibrated decision-support scores, skill gaps, and explainability report.
    """
    # 1. Resolve Resume Text & Skills
    if req.resume_id:
        if req.resume_id not in RESUME_STORE:
            raise HTTPException(status_code=404, detail="Specified resume ID was not found.")
        parsed_resume = RESUME_STORE[req.resume_id]
        resume_text = parsed_resume.cleaned_text
        candidate_skills = parsed_resume.skills
        sections = parsed_resume.sections
        exp_years = parsed_resume.experience_years
    elif req.resume_text and len(req.resume_text.strip()) > 30:
        resume_text = req.resume_text.strip()
        sections = SectionExtractor.extract_sections(resume_text)
        candidate_skills = SkillExtractor.get_skill_names(resume_text)
        exp_years = SectionExtractor.estimate_experience_years(sections.get("experience", ""), resume_text)
    else:
        raise HTTPException(
            status_code=400,
            detail="Either a valid resume_id or resume_text with at least 30 characters must be provided."
        )

    # 2. Extract Job Requirements & Skills
    job_text = req.job.description
    extracted_job_skills = SkillExtractor.get_skill_names(job_text)
    
    # Merge any manually specified target skills
    if req.job.target_skills:
        for s in req.job.target_skills:
            if s not in extracted_job_skills:
                extracted_job_skills.append(s)

    if not extracted_job_skills:
        extracted_job_skills = ["Python", "SQL", "Git & Version Control"]

    # 3. Feature Engineering & Multi-factor Scoring
    features = FeatureEngineer.extract_features(
        resume_text=resume_text,
        job_text=job_text,
        resume_sections=sections,
        candidate_skills=candidate_skills,
        job_required_skills=extracted_job_skills,
        experience_years=exp_years
    )

    breakdown = features["breakdown"]
    matched_skills = features["matched_skills"]
    partial_skills = features["partial_skills"]
    missing_skills = features["missing_skills"]

    # 4. Predict Compatibility & Fit Category
    overall_score, fit_category = fit_classifier.predict_compatibility(breakdown)

    # 5. Generate Humanized Explainability & Career Roadmap
    target_role = req.job.title or "Target Position"
    explanation_report, career_roadmap = ExplanationEngine.generate_explanation(
        overall_score=overall_score,
        fit_category=fit_category,
        breakdown=breakdown,
        matched=matched_skills,
        partial=partial_skills,
        missing=missing_skills,
        target_role=target_role
    )

    result_id = str(uuid.uuid4())
    result = AnalysisResult(
        id=result_id,
        resume_id=req.resume_id or "adhoc-resume",
        job_title=target_role,
        company=req.job.company,
        overall_compatibility=overall_score,
        fit_category=fit_category,
        breakdown=breakdown,
        matched_skills=matched_skills,
        partial_skills=partial_skills,
        missing_skills=missing_skills,
        explanation=explanation_report,
        career_roadmap=career_roadmap
    )

    ANALYSIS_HISTORY.insert(0, result)
    return result

@router.get("/{analysis_id}", response_model=AnalysisResult)
def get_analysis_by_id(analysis_id: str):
    """Retrieve previous analysis result by ID."""
    for item in ANALYSIS_HISTORY:
        if item.id == analysis_id:
            return item
    raise HTTPException(status_code=404, detail="Analysis result not found.")
