import numpy as np
import re
from typing import Dict, Any, List
from app.ml.semantic_matcher import semantic_matcher
from app.ml.gap_analyzer import SkillGapAnalyzer
from app.ml.section_extractor import SectionExtractor
from app.schemas.resume import BreakdownScores

EDUCATION_LEVELS = {
    "phd": 5, "ph.d": 5, "doctorate": 5,
    "master": 4, "m.s": 4, "m.tech": 4, "mtech": 4, "msc": 4, "mba": 4,
    "bachelor": 3, "b.e": 3, "b.tech": 3, "btech": 3, "bsc": 3, "b.s": 3, "bca": 3,
    "associate": 2, "diploma": 2, "high school": 1
}

class FeatureEngineer:
    @staticmethod
    def extract_features(
        resume_text: str,
        job_text: str,
        resume_sections: Dict[str, str],
        candidate_skills: List[str],
        job_required_skills: List[str],
        experience_years: float = 1.0
    ) -> Dict[str, Any]:
        """Vectorizes a resume-job pair into interpretable engineering features."""
        
        # 1. Semantic Similarity via Sentence-BERT
        sbert_sim = semantic_matcher.compute_sbert_similarity(resume_text, job_text)
        tfidf_sim = semantic_matcher.compute_tfidf_similarity(resume_text, job_text)

        # 2. Skill Gap and Coverage Analysis
        matched, partial, missing, exact_cov, partial_cov = SkillGapAnalyzer.analyze_gaps(
            candidate_skills, job_required_skills
        )

        # 3. Experience Alignment
        # Search JD for experience requirements (e.g. "2+ years", "3-5 years")
        exp_match = re.search(r'(\d+)\+?\s*(?:to\s*\d+)?\s*(?:years?|yrs?)', job_text, re.IGNORECASE)
        req_exp = float(exp_match.group(1)) if exp_match else 2.0
        exp_ratio = min(experience_years / max(req_exp, 1.0), 1.0)
        exp_score = exp_ratio * 100.0

        # 4. Education Alignment
        edu_text = (resume_sections.get("education", "") + " " + resume_text).lower()
        cand_edu_level = 0
        for edu_key, score in EDUCATION_LEVELS.items():
            if re.search(r'\b' + re.escape(edu_key) + r'\b', edu_text):
                cand_edu_level = max(cand_edu_level, score)
        if cand_edu_level == 0:
            cand_edu_level = 3  # Assume bachelor's baseline for college prototypes

        # Job requested degree
        job_edu_level = 3
        for edu_key, score in EDUCATION_LEVELS.items():
            if re.search(r'\b' + re.escape(edu_key) + r'\b', job_text.lower()):
                job_edu_level = max(job_edu_level, score)

        edu_alignment = min((cand_edu_level / max(job_edu_level, 1.0)) * 100.0, 100.0)

        # 5. Project Relevance
        project_text = resume_sections.get("projects", "")
        if project_text.strip():
            proj_relevance = semantic_matcher.compute_sbert_similarity(project_text, job_text) * 100.0
        else:
            proj_relevance = sbert_sim * 85.0  # Derive from overall context

        breakdown = BreakdownScores(
            semantic_similarity=round(sbert_sim * 100.0, 1),
            skill_coverage=round(exact_cov, 1),
            partial_skill_coverage=round(partial_cov, 1),
            experience_alignment=round(exp_score, 1),
            education_alignment=round(edu_alignment, 1),
            project_relevance=round(proj_relevance, 1)
        )

        # Vector for scikit-learn classifier: [sbert_sim, tfidf_sim, exact_cov/100, partial_cov/100, exp_ratio, edu_alignment/100, len(missing)]
        vector = np.array([
            sbert_sim,
            tfidf_sim,
            exact_cov / 100.0,
            partial_cov / 100.0,
            exp_ratio,
            edu_alignment / 100.0,
            float(len(missing))
        ], dtype=np.float32)

        return {
            "breakdown": breakdown,
            "vector": vector,
            "matched_skills": matched,
            "partial_skills": partial,
            "missing_skills": missing
        }
