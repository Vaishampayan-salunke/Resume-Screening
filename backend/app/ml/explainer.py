from typing import List, Dict, Any
from app.schemas.resume import (
    ExplanationReport,
    CareerRoadmap,
    ProjectSuggestion,
    SkillDetail,
    BreakdownScores
)

# Project archetypes mapped to missing skill areas
PROJECT_ARCHETYPES = {
    "Docker": ProjectSuggestion(
        title="Containerized Microservice & CI/CD Pipeline",
        description="Containerize a multi-service web application using Docker and Docker Compose with GitHub Actions for automated linting and build testing.",
        target_skills=["Docker", "CI/CD Pipelines", "Git & Version Control"],
        difficulty="Intermediate",
        estimated_time="1-2 Weeks"
    ),
    "PyTorch": ProjectSuggestion(
        title="End-to-End Deep Learning Classifier with PyTorch",
        description="Train a convolutional neural network or transfer-learning vision/NLP model with custom Dataset classes, validation loops, and TensorBoard logging.",
        target_skills=["PyTorch", "Deep Learning", "Machine Learning"],
        difficulty="Intermediate",
        estimated_time="2-3 Weeks"
    ),
    "Natural Language Processing": ProjectSuggestion(
        title="Semantic Document Search & Topic Modeling Engine",
        description="Build an intelligent document retrieval system utilizing Sentence-Transformers, vector embeddings, and cosine ranking with an interactive UI.",
        target_skills=["Natural Language Processing", "Transformers & LLMs", "Python"],
        difficulty="Advanced",
        estimated_time="2-4 Weeks"
    ),
    "SQL": ProjectSuggestion(
        title="Complex Schema Optimization & Analytics Dashboard",
        description="Design a normalized relational schema with indexing, CTEs, window functions, and analytics queries connected to a visualization dashboard.",
        target_skills=["SQL", "PostgreSQL", "Data Engineering"],
        difficulty="Beginner to Intermediate",
        estimated_time="1 Week"
    ),
    "FastAPI": ProjectSuggestion(
        title="Production ML Inference Microservice API",
        description="Develop an asynchronous REST API deploying ML models with Pydantic request validation, background worker tasks, and automated OpenAPI documentation.",
        target_skills=["FastAPI", "Python", "Docker"],
        difficulty="Intermediate",
        estimated_time="1-2 Weeks"
    ),
    "Kubernetes": ProjectSuggestion(
        title="Scalable Cluster Deployment with Helm & Ingress",
        description="Deploy a multi-replica application on local Minikube or cloud Kubernetes with ConfigMaps, Secrets, health probes, and rolling updates.",
        target_skills=["Kubernetes", "Docker", "Cloud & DevOps"],
        difficulty="Advanced",
        estimated_time="2-3 Weeks"
    ),
    "React": ProjectSuggestion(
        title="Interactive Analytics Dashboard Web Application",
        description="Build a responsive single-page application using modern React hooks, TypeScript, and state management consuming RESTful endpoints.",
        target_skills=["React", "TypeScript", "JavaScript"],
        difficulty="Intermediate",
        estimated_time="2 Weeks"
    )
}

DEFAULT_PROJECT = ProjectSuggestion(
    title="Comprehensive Capstone Project Demonstrating Core Domain Competencies",
    description="Build an end-to-end full-stack or machine learning application solving a real-world workflow problem, complete with automated tests and a live demo.",
    target_skills=["Problem Solving", "Git & Version Control", "Python"],
    difficulty="Intermediate",
    estimated_time="3 Weeks"
)

class ExplanationEngine:
    @staticmethod
    def generate_explanation(
        overall_score: float,
        fit_category: str,
        breakdown: BreakdownScores,
        matched: List[SkillDetail],
        partial: List[SkillDetail],
        missing: List[SkillDetail],
        target_role: str
    ) -> tuple[ExplanationReport, CareerRoadmap]:
        """
        Produces human-centered, transparent, and encouraging career intelligence.
        Explains every factor clearly without opaque jargon or judgmental tone.
        """
        # 1. Highlights
        highlights = []
        if matched:
            top_matched = [m.canonical_name for m in matched[:4]]
            highlights.append(f"Strong foundation verified in key required technologies: {', '.join(top_matched)}.")
        if breakdown.semantic_similarity >= 70:
            highlights.append(f"High contextual alignment ({breakdown.semantic_similarity}%) between your project background and this position's scope.")
        elif breakdown.semantic_similarity >= 50:
            highlights.append("Your background demonstrates transferable conceptual problem-solving patterns relevant to this role.")
            
        if breakdown.education_alignment >= 80:
            highlights.append("Academic degree requirements and foundational coursework align cleanly with this role's baseline expectations.")

        if not highlights:
            highlights.append("Clear foundational technical aptitude with multiple opportunities for targeted upskilling.")

        # 2. Key Growth Opportunities
        growth_opportunities = []
        if missing:
            critical_missing = [m.canonical_name for m in missing if m.importance == "Critical"]
            if critical_missing:
                growth_opportunities.append(
                    f"Acquiring high-priority core competencies in {', '.join(critical_missing[:3])} will produce the fastest score improvement."
                )
            other_missing = [m.canonical_name for m in missing if m.importance != "Critical"]
            if other_missing:
                growth_opportunities.append(
                    f"Secondary technologies like {', '.join(other_missing[:3])} can be learned on the job or demonstrated via portfolio projects."
                )
        if partial:
            partial_names = [p.canonical_name for p in partial[:3]]
            growth_opportunities.append(
                f"You have adjacent experience related to {', '.join(partial_names)}; bridging these into exact tool usage will strengthen your candidacy."
            )

        if not growth_opportunities:
            growth_opportunities.append("Your profile satisfies the core specifications. Focus on highlighting quantitative project metrics and architectural leadership.")

        # 3. Verdict Summary
        if fit_category == "Good Fit":
            verdict = (
                f"Your profile demonstrates substantial alignment ({overall_score}%) with the {target_role} requirements. "
                "You possess the primary technical competencies and domain experience required to deliver value quickly."
            )
            encouragement = "You are in a competitive position for this profile. Refine your resume bullet points with measurable impact and proceed with confidence."
            readiness = "Ready to Apply & Interview"
        elif fit_category == "Potential Fit":
            verdict = (
                f"Your profile shows strong potential ({overall_score}%) for the {target_role} position. "
                "While your core competencies and problem-solving patterns match well, bridging a few key skill gaps will make your profile stand out."
            )
            encouragement = (
                "Every missing skill is simply an exciting learning opportunity. "
                "Focus on the recommended learning order below to rapidly boost your compatibility."
            )
            readiness = "Strong Candidate with Targeted Refinements"
        else:
            verdict = (
                f"Your profile currently exhibits early-stage alignment ({overall_score}%) for this specific {target_role} posting. "
                "This indicates an opportunity to strategically expand your toolset rather than a reflection of your potential."
            )
            encouragement = (
                "Career pivots and growth journeys start here. By completing the prioritized projects below, "
                "you can systematically bridge your skill gaps and unlock competitive readiness."
            )
            readiness = "Focused Skill Building Recommended"

        explanation_report = ExplanationReport(
            verdict_summary=verdict,
            positive_highlights=highlights,
            key_growth_opportunities=growth_opportunities,
            encouragement_note=encouragement
        )

        # 4. Career Roadmap & Learning Order
        learning_order = []
        for m in missing:
            learning_order.append(f"{m.canonical_name} ({m.category} — Priority {m.learning_priority})")
        for p in partial:
            learning_order.append(f"{p.canonical_name} (Deepen existing knowledge)")

        if not learning_order:
            learning_order = ["System Design & Architecture", "Performance Optimization", "Open Source Contributions"]

        # 5. Suggested Projects
        suggested_projects = []
        for m in missing[:3]:
            proj = PROJECT_ARCHETYPES.get(m.canonical_name)
            if proj and proj not in suggested_projects:
                suggested_projects.append(proj)
        
        if not suggested_projects:
            suggested_projects.append(DEFAULT_PROJECT)

        # 6. Actionable Resume Tips
        resume_tips = [
            "Quantify your accomplishments using the Google XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'.",
            f"Add a dedicated 'Technical Skills' section clearly highlighting your proficiency in {', '.join([m.canonical_name for m in matched[:4]]) if matched else 'core languages'}.",
            "Highlight links to live web demos, GitHub repositories, and architectural documentation for your top 2 projects.",
            "Tailor project descriptions to echo the terminology and tools specified in the target job description."
        ]

        career_roadmap = CareerRoadmap(
            target_role=target_role,
            current_readiness_level=readiness,
            recommended_learning_order=learning_order[:6],
            suggested_projects=suggested_projects,
            actionable_resume_tips=resume_tips
        )

        return explanation_report, career_roadmap
