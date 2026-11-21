r"""
Backend Integration Tests for TalentLens Core ML Pipeline.
Tests are run from: v:\Resume_Screening\backend\
Command: python -m pytest tests/ -v
"""
import sys
from pathlib import Path

# Add backend root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

import pytest
from app.ml.pdf_parser import DocumentParser
from app.ml.section_extractor import SectionExtractor
from app.ml.skill_extractor import SkillExtractor
from app.ml.semantic_matcher import SemanticMatcher
from app.ml.gap_analyzer import SkillGapAnalyzer
from app.ml.feature_engineering import FeatureEngineer
from app.ml.classifier import FitClassifier

# --- Sample Fixtures ---
SAMPLE_RESUME = """
Priya Sharma
priya.sharma@email.com | +91-9876543210

SUMMARY
Enthusiastic Computer Science graduate with strong Python programming, 
machine learning, and deep learning skills. 1.5 years internship experience.

SKILLS
Python, PyTorch, Scikit-Learn, Machine Learning, SQL, Pandas, NumPy, React, Git

EXPERIENCE
ML Research Intern | AI Labs | 2025–2026
- Built classification pipeline using Random Forest with 92% accuracy
- Implemented NLP models with spaCy for entity extraction

EDUCATION
B.E. Computer Science | XYZ University | 2022–2026

PROJECTS
1. Smart Resume Parser - NLP-based resume section extraction using transformers
2. E-Commerce Recommendation System - Collaborative filtering using matrix factorization
"""

SAMPLE_JOB = """
Machine Learning Engineer — Mid Level (2+ years)
We are looking for an ML Engineer with strong experience in Python, PyTorch, 
Deep Learning, SQL, and Docker. Must have knowledge of REST APIs and Scikit-Learn.
Good understanding of Natural Language Processing preferred.
"""


class TestDocumentParser:
    def test_clean_text_removes_extra_whitespace(self):
        raw = "Hello  World  \n\n\n  Test"
        cleaned = DocumentParser.clean_text(raw)
        assert "  " not in cleaned

    def test_extract_contact_info_email(self):
        contact = DocumentParser.extract_contact_info(SAMPLE_RESUME)
        assert contact["email"] == "priya.sharma@email.com"

    def test_scrub_pii_removes_email(self):
        scrubbed = DocumentParser.scrub_pii_for_ml("Contact: test@example.com")
        assert "test@example.com" not in scrubbed
        assert "[EMAIL_ANONYMIZED]" in scrubbed


class TestSectionExtractor:
    def test_extracts_skills_section(self):
        sections = SectionExtractor.extract_sections(SAMPLE_RESUME)
        assert "skills" in sections
        assert len(sections["skills"]) > 5

    def test_extracts_education_section(self):
        sections = SectionExtractor.extract_sections(SAMPLE_RESUME)
        assert "education" in sections

    def test_estimate_experience_years_from_dates(self):
        years = SectionExtractor.estimate_experience_years("", SAMPLE_RESUME)
        assert 0 <= years <= 10


class TestSkillExtractor:
    def test_extracts_known_skills(self):
        skills = SkillExtractor.get_skill_names(SAMPLE_RESUME)
        assert "Python" in skills
        assert "Machine Learning" in skills

    def test_extracts_from_jd(self):
        skills = SkillExtractor.get_skill_names(SAMPLE_JOB)
        assert "Python" in skills
        assert "PyTorch" in skills

    def test_no_duplicates(self):
        skills = SkillExtractor.get_skill_names(SAMPLE_RESUME)
        assert len(skills) == len(set(skills))


class TestSkillGapAnalyzer:
    def test_matched_skills_detected(self):
        cand_skills = ["Python", "Machine Learning", "SQL", "Scikit-Learn", "Pandas"]
        job_skills = ["Python", "Machine Learning", "PyTorch", "Docker"]
        matched, partial, missing, _, _ = SkillGapAnalyzer.analyze_gaps(cand_skills, job_skills)
        matched_names = [m.canonical_name for m in matched]
        assert "Python" in matched_names
        assert "Machine Learning" in matched_names

    def test_missing_skills_detected(self):
        cand_skills = ["Python", "React"]
        job_skills = ["Python", "Docker", "Kubernetes"]
        matched, partial, missing, _, _ = SkillGapAnalyzer.analyze_gaps(cand_skills, job_skills)
        missing_names = [m.canonical_name for m in missing]
        assert "Docker" in missing_names

    def test_coverage_percentages_in_range(self):
        cand = ["Python", "SQL"]
        job = ["Python", "SQL", "Docker"]
        _, _, _, exact_cov, _ = SkillGapAnalyzer.analyze_gaps(cand, job)
        assert 0 <= exact_cov <= 100


class TestSemanticMatcher:
    def test_tfidf_returns_valid_score(self):
        matcher = SemanticMatcher()
        score = matcher.compute_tfidf_similarity("Python Machine Learning", "Python Machine Learning AI")
        assert 0.0 <= score <= 1.0

    def test_identical_texts_score_high(self):
        matcher = SemanticMatcher()
        score = matcher.compute_tfidf_similarity("Python Machine Learning", "Python Machine Learning")
        assert score > 0.9

    def test_empty_text_returns_zero(self):
        matcher = SemanticMatcher()
        score = matcher.compute_tfidf_similarity("", "some text")
        assert score == 0.0


class TestFitClassifier:
    def test_good_fit_threshold(self):
        from app.schemas.resume import BreakdownScores
        clf = FitClassifier()
        breakdown = BreakdownScores(
            semantic_similarity=90.0,
            skill_coverage=88.0,
            partial_skill_coverage=92.0,
            experience_alignment=85.0,
            education_alignment=100.0,
            project_relevance=80.0
        )
        score, category = clf.predict_compatibility(breakdown)
        assert category == "Good Fit"
        assert 75 <= score <= 100

    def test_low_fit_threshold(self):
        from app.schemas.resume import BreakdownScores
        clf = FitClassifier()
        breakdown = BreakdownScores(
            semantic_similarity=20.0,
            skill_coverage=10.0,
            partial_skill_coverage=15.0,
            experience_alignment=10.0,
            education_alignment=50.0,
            project_relevance=15.0
        )
        score, category = clf.predict_compatibility(breakdown)
        assert category == "Low Fit"
        assert score < 50

    def test_score_always_bounded(self):
        from app.schemas.resume import BreakdownScores
        clf = FitClassifier()
        breakdown = BreakdownScores(
            semantic_similarity=100.0, skill_coverage=100.0,
            partial_skill_coverage=100.0, experience_alignment=100.0,
            education_alignment=100.0, project_relevance=100.0
        )
        score, _ = clf.predict_compatibility(breakdown)
        assert 0 <= score <= 100
