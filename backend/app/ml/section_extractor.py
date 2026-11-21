import re
from typing import Dict, List, Tuple

SECTION_PATTERNS = {
    "summary": [
        r"^(professional\s+)?summary",
        r"^profile",
        r"^objective",
        r"^about\s+me",
    ],
    "skills": [
        r"^(technical\s+)?skills",
        r"^technologies",
        r"^competencies",
        r"^core\s+competencies",
        r"^tools\s+(&|and)\s+technologies",
        r"^tech\s+stack",
    ],
    "experience": [
        r"^(work\s+|professional\s+)?experience",
        r"^employment\s+history",
        r"^work\s+history",
        r"^internships?",
    ],
    "education": [
        r"^education",
        r"^academic\s+background",
        r"^qualifications",
        r"^degrees?",
    ],
    "projects": [
        r"^(academic\s+|personal\s+)?projects",
        r"^key\s+projects",
        r"^portfolio",
    ],
    "certifications": [
        r"^certifications?",
        r"^licenses?",
        r"^courses?",
        r"^achievements?",
    ]
}

class SectionExtractor:
    @staticmethod
    def extract_sections(text: str) -> Dict[str, str]:
        """Split resume text into recognized standard sections using regex heading detection."""
        lines = text.split("\n")
        sections: Dict[str, List[str]] = {
            "summary": [],
            "skills": [],
            "experience": [],
            "education": [],
            "projects": [],
            "certifications": [],
            "general": []
        }
        
        current_section = "general"
        
        for line in lines:
            line_str = line.strip()
            if not line_str:
                continue
                
            # Check if this line looks like a header (short, title case or upper case, matches keyword)
            matched_header = None
            clean_line = re.sub(r'[^a-zA-Z\s]', '', line_str).lower().strip()
            
            if len(clean_line.split()) <= 4:
                for section_name, patterns in SECTION_PATTERNS.items():
                    for pattern in patterns:
                        if re.match(pattern, clean_line):
                            matched_header = section_name
                            break
                    if matched_header:
                        break
            
            if matched_header:
                current_section = matched_header
            else:
                sections[current_section].append(line_str)
        
        # Collapse lines into joined text blocks
        return {
            sec: "\n".join(content_lines).strip()
            for sec, content_lines in sections.items()
            if content_lines
        }

    @staticmethod
    def estimate_experience_years(experience_text: str, full_text: str) -> float:
        """Heuristic calculation of total years of experience from dates and keywords."""
        text_to_search = experience_text if experience_text else full_text
        
        # Look for phrases like "3+ years", "4 years of experience", etc.
        exp_phrases = re.findall(r'(\d+(?:\.\d+)?)\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|work)', text_to_search, re.IGNORECASE)
        if exp_phrases:
            try:
                scores = [float(x) for x in exp_phrases if float(x) <= 40]
                if scores:
                    return max(scores)
            except ValueError:
                pass

        # Look for year ranges like 2019 - 2023, 2021-Present, etc.
        year_ranges = re.findall(r'\b(20\d{2}|19\d{2})\s*(?:-|–|to)\s*(20\d{2}|present|current)\b', text_to_search, re.IGNORECASE)
        total_span = 0.0
        current_year = 2026
        
        for start, end in year_ranges:
            try:
                start_yr = int(start)
                end_yr = current_year if end.lower() in ['present', 'current'] else int(end)
                if end_yr >= start_yr and (end_yr - start_yr) <= 30:
                    total_span += (end_yr - start_yr)
            except ValueError:
                continue
                
        if total_span > 0:
            return min(total_span, 30.0)
            
        # Default baseline for college / entry-level
        return 1.5 if "intern" in text_to_search.lower() else 0.5
