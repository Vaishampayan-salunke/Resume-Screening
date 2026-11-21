from fastapi import APIRouter
from app.schemas.resume import FairnessTestInput, FairnessEvaluationResult
from app.ml.fairness_audit import fairness_auditor

router = APIRouter(prefix="/fairness", tags=["Fairness & Bias Audit"])

@router.post("/audit", response_model=FairnessEvaluationResult)
def run_fairness_audit(payload: FairnessTestInput):
    """
    Executes a counterfactual demographic perturbation audit.
    Tests the candidate resume across diverse ethnic and gender names
    to prove zero score deviation and verify fairness compliance.
    """
    return fairness_auditor.audit_demographic_invariance(
        resume_text=payload.resume_text,
        job_description=payload.job_description,
        names=payload.names_to_test
    )
