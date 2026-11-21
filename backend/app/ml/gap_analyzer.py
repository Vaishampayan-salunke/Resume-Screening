from typing import List, Dict, Any, Tuple
from app.ml.skill_taxonomy import SKILL_TAXONOMY, normalize_skill
from app.schemas.resume import SkillDetail

# Category-level semantic adjacency map (for detecting partial matches)
CATEGORY_RELATEDNESS = {
    "Programming Languages": ["Web & Backend", "Machine Learning & AI"],
    "Machine Learning & AI": ["Data & Databases", "Programming Languages"],
    "Data & Databases": ["Machine Learning & AI", "Cloud & DevOps"],
    "Cloud & DevOps": ["Web & Backend", "Data & Databases"],
    "Web & Backend": ["Programming Languages", "Cloud & DevOps"],
    "Soft Skills": ["Team Collaboration"]
}

class SkillGapAnalyzer:
    @staticmethod
    def analyze_gaps(
        candidate_skills: List[str],
        job_required_skills: List[str]
    ) -> Tuple[List[SkillDetail], List[SkillDetail], List[SkillDetail], float, float]:
        """
        Calculates Matched, Partial, and Missing skills, and returns
        (matched, partial, missing, exact_coverage_pct, partial_coverage_pct).
        """
        # Lowercase normalize sets
        cand_set = {s.lower().strip() for s in candidate_skills}
        
        # If no skills were detected in JD, extract standard baseline
        if not job_required_skills:
            job_required_skills = ["Python", "SQL", "Git & Version Control"]

        # Collect candidate categories for partial matching
        cand_categories = set()
        for c in cand_set:
            norm = normalize_skill(c)
            if norm:
                cand_categories.add(norm["category"])

        matched: List[SkillDetail] = []
        partial: List[SkillDetail] = []
        missing: List[SkillDetail] = []

        for req in job_required_skills:
            req_norm = normalize_skill(req)
            canonical_name = req_norm["canonical"] if req_norm else req.title()
            category = req_norm["category"] if req_norm else "General"
            importance = req_norm.get("importance", "Medium") if req_norm else "Medium"
            why = req_norm.get("why_required", "Core competency for this role.") if req_norm else "Expected by industry standards."
            resources = req_norm.get("resources", ["Official Documentation", "Coursera / Udemy Courses"]) if req_norm else []

            # Check exact match (either string match or canonical match)
            is_exact = False
            for c in cand_set:
                c_norm = normalize_skill(c)
                c_canonical = c_norm["canonical"] if c_norm else c
                if c.lower() == req.lower() or c_canonical.lower() == canonical_name.lower():
                    is_exact = True
                    break

            if is_exact:
                matched.append(SkillDetail(
                    name=req,
                    canonical_name=canonical_name,
                    category=category,
                    match_status="matched",
                    importance=importance,
                    why_required=why,
                    suggested_resources=resources
                ))
            else:
                # Check for partial match: Candidate has at least one skill in the exact same category
                is_partial = category in cand_categories and category != "General"

                if is_partial:
                    partial.append(SkillDetail(
                        name=req,
                        canonical_name=canonical_name,
                        category=category,
                        match_status="partial",
                        importance=importance,
                        why_required=f"You possess adjacent {category} skills, but {canonical_name} requires targeted practice.",
                        learning_priority=2,
                        suggested_resources=resources
                    ))
                else:
                    # Missing skill
                    priority = 1 if importance == "Critical" else (2 if importance == "High" else 3)
                    missing.append(SkillDetail(
                        name=req,
                        canonical_name=canonical_name,
                        category=category,
                        match_status="missing",
                        importance=importance,
                        why_required=why,
                        learning_priority=priority,
                        suggested_resources=resources
                    ))

        total_req = len(job_required_skills)
        exact_pct = (len(matched) / total_req * 100.0) if total_req > 0 else 100.0
        partial_pct = ((len(matched) + 0.5 * len(partial)) / total_req * 100.0) if total_req > 0 else 100.0

        # Sort missing by priority (1 first, then 2, then 3)
        missing.sort(key=lambda x: x.learning_priority or 3)

        return matched, partial, missing, round(exact_pct, 1), round(partial_pct, 1)
