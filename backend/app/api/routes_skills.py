from fastapi import APIRouter, Query
from typing import List, Dict, Any
from app.ml.skill_taxonomy import SKILL_TAXONOMY

router = APIRouter(prefix="/skills", tags=["Skills Taxonomy"])

@router.get("", response_model=List[Dict[str, Any]])
def list_skills(
    category: str = Query(None, description="Filter by skill category"),
    search: str = Query(None, description="Search skill name or alias")
):
    """Retrieve standardized ESCO-aligned skills ontology with resources and categories."""
    results = []
    search_clean = search.lower().strip() if search else None

    for key, data in SKILL_TAXONOMY.items():
        if category and data.get("category", "").lower() != category.lower():
            continue
        if search_clean:
            match = False
            if search_clean in key or search_clean in data["canonical"].lower():
                match = True
            for alias in data.get("aliases", []):
                if search_clean in alias.lower():
                    match = True
                    break
            if not match:
                continue

        results.append({
            "key": key,
            "canonical_name": data["canonical"],
            "category": data["category"],
            "importance": data.get("importance", "Medium"),
            "why_required": data.get("why_required", ""),
            "resources": data.get("resources", [])
        })

    return sorted(results, key=lambda x: x["canonical_name"])

@router.get("/categories", response_model=List[str])
def list_categories():
    """Returns list of distinct skill categories."""
    categories = sorted(list({data["category"] for data in SKILL_TAXONOMY.values()}))
    return categories
