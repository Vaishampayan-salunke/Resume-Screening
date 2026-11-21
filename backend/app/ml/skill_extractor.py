import re
from typing import List, Dict, Set, Any
from app.ml.skill_taxonomy import SKILL_TAXONOMY, ALIAS_TO_CANONICAL, normalize_skill

class SkillExtractor:
    @staticmethod
    def extract_skills(text: str) -> List[Dict[str, Any]]:
        """
        Extracts both technical and soft skills from freeform text,
        normalizing against canonical taxonomy definitions.
        """
        if not text:
            return []

        text_lower = " " + text.lower() + " "
        found_keys: Set[str] = set()

        # Sort aliases by length descending so multi-word phrases match before substrings
        sorted_aliases = sorted(ALIAS_TO_CANONICAL.keys(), key=lambda x: len(x), reverse=True)

        for alias in sorted_aliases:
            # Handle special characters like c++ or node.js safely in regex
            pattern = r'(?<![a-zA-Z0-9_])' + re.escape(alias) + r'(?![a-zA-Z0-9_])'
            if re.search(pattern, text_lower):
                canonical_key = ALIAS_TO_CANONICAL[alias]
                found_keys.add(canonical_key)

        # Build list of normalized skill dictionaries
        results = []
        for key in found_keys:
            data = SKILL_TAXONOMY[key]
            results.append({
                "name": data["canonical"],
                "canonical_name": data["canonical"],
                "category": data["category"],
                "importance": data.get("importance", "Medium"),
                "why_required": data.get("why_required", "Required for technical competency in target domain."),
                "resources": data.get("resources", [])
            })

        # Sort alphabetically by canonical name
        return sorted(results, key=lambda x: x["canonical_name"])

    @staticmethod
    def get_skill_names(text: str) -> List[str]:
        """Convenience method returning canonical string names."""
        skills = SkillExtractor.extract_skills(text)
        return [s["canonical_name"] for s in skills]
