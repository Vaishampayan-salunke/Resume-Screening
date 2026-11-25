import re
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter(prefix="/interviews", tags=["AI Interview Studio"])

class EvaluateRequest(BaseModel):
    question_id: str
    question: str
    answer: str
    target_role: str

QUESTION_BANK: Dict[str, List[Dict[str, Any]]] = {
    "Data Scientist": [
        {
            "id": "ds-tech-1",
            "question": "How do you detect and handle data leakage in predictive modeling pipelines?",
            "category": "Technical",
            "difficulty": "Medium",
            "target_skill": "Machine Learning Validation",
            "sample_hint": "Discuss temporal vs feature leakage, train/test splitting before preprocessing, and GroupKFold."
        },
        {
            "id": "ds-tech-2",
            "question": "Explain the difference between ROC-AUC and PR-AUC. When would you prefer PR-AUC for classification?",
            "category": "Technical",
            "difficulty": "Medium",
            "target_skill": "Model Evaluation",
            "sample_hint": "Focus on extreme class imbalance where true negatives dominate."
        },
        {
            "id": "ds-proj-1",
            "question": "Walk me through an end-to-end data science project you built. What was the business impact and key challenge?",
            "category": "Project",
            "difficulty": "Medium",
            "target_skill": "End-to-End ML Pipeline",
            "sample_hint": "Structure using the STAR framework: Situation, Task, Action, and quantifiable Result."
        },
        {
            "id": "ds-hr-1",
            "question": "How do you explain complex machine learning decisions or model outputs to non-technical stakeholders?",
            "category": "HR",
            "difficulty": "Easy",
            "target_skill": "Technical Communication",
            "sample_hint": "Mention feature attribution techniques like SHAP, business analogies, and framing metrics in revenue or risk reduction."
        }
    ],
    "Machine Learning Engineer": [
        {
            "id": "mle-tech-1",
            "question": "How do you optimize inference latency for deep learning models when deploying to production?",
            "category": "Technical",
            "difficulty": "Hard",
            "target_skill": "Model Serving & Optimization",
            "sample_hint": "Mention quantization (INT8), ONNX Runtime / TensorRT, model pruning, and batch inference."
        },
        {
            "id": "mle-tech-2",
            "question": "How do you monitor and remediate concept drift and data drift in live inference endpoints?",
            "category": "Technical",
            "difficulty": "Hard",
            "target_skill": "MLOps & Monitoring",
            "sample_hint": "Discuss KS-tests, Population Stability Index (PSI), ground truth latency, and automated retraining triggers."
        },
        {
            "id": "mle-proj-1",
            "question": "Describe a scenario where a model performed well during cross-validation but degraded severely in production. How did you diagnose it?",
            "category": "Project",
            "difficulty": "Medium",
            "target_skill": "Production Debugging",
            "sample_hint": "Focus on feature pipeline divergence between training and serving, missing input handling, and logs analysis."
        },
        {
            "id": "mle-hr-1",
            "question": "Tell me about a time you disagreed with a colleague on architectural trade-offs between model accuracy and system throughput.",
            "category": "HR",
            "difficulty": "Medium",
            "target_skill": "Cross-Functional Collaboration",
            "sample_hint": "Focus on objective A/B testing, SLA benchmarks, and finding a consensus."
        }
    ],
    "Frontend Developer": [
        {
            "id": "fe-tech-1",
            "question": "How does React 18 Concurrent Rendering work, and when would you leverage useDeferredValue or useTransition?",
            "category": "Technical",
            "difficulty": "Medium",
            "target_skill": "React Architecture",
            "sample_hint": "Explain interruptible rendering, prioritizing urgent user inputs over non-urgent list updates."
        },
        {
            "id": "fe-tech-2",
            "question": "How do you optimize Core Web Vitals (especially LCP, CLS, and INP) in single page and server-rendered web applications?",
            "category": "Technical",
            "difficulty": "Medium",
            "target_skill": "Web Performance",
            "sample_hint": "Mention asset preloading, image sizing, font display swap, and avoiding blocking main-thread tasks."
        },
        {
            "id": "fe-proj-1",
            "question": "Describe a complex component or state architecture you designed. How did you ensure accessibility and maintainability?",
            "category": "Project",
            "difficulty": "Medium",
            "target_skill": "Component Design & a11y",
            "sample_hint": "Discuss keyboard navigation, ARIA attributes, semantic HTML, and testability."
        },
        {
            "id": "fe-hr-1",
            "question": "How do you handle scope changes or evolving design requirements during an active sprint?",
            "category": "HR",
            "difficulty": "Easy",
            "target_skill": "Agile Delivery",
            "sample_hint": "Discuss transparent communication, trade-off estimation, and modular component design."
        }
    ],
    "Backend Developer": [
        {
            "id": "be-tech-1",
            "question": "How do you design a high-throughput idempotency mechanism for payment or order creation APIs?",
            "category": "Technical",
            "difficulty": "Hard",
            "target_skill": "API Resilience",
            "sample_hint": "Explain client-supplied Idempotency-Keys, Redis/Postgres atomic locks, and caching responses."
        },
        {
            "id": "be-tech-2",
            "question": "When would you choose PostgreSQL indexing types like GIN or BRIN over a standard B-Tree index?",
            "category": "Technical",
            "difficulty": "Medium",
            "target_skill": "Database Optimization",
            "sample_hint": "BRIN for naturally sorted append-only time series; GIN for JSONB and full-text search."
        },
        {
            "id": "be-proj-1",
            "question": "Explain how you resolved a critical production incident involving database connection pool exhaustion or high latency.",
            "category": "Project",
            "difficulty": "Medium",
            "target_skill": "Incident Response & Reliability",
            "sample_hint": "Use the STAR framework highlighting root cause (unindexed slow query or leak) and permanent prevention."
        },
        {
            "id": "be-hr-1",
            "question": "How do you balance rapid delivery of new features against accumulating technical debt and test coverage?",
            "category": "HR",
            "difficulty": "Easy",
            "target_skill": "Engineering Stewardship",
            "sample_hint": "Advocate for boy-scout rule, 20% refactor allocations, and clear regression metrics."
        }
    ]
}

# Generic questions for fallback
GENERIC_QUESTIONS = [
    {
        "id": "gen-tech-1",
        "question": "What is your approach to writing testable, modular code and managing external dependencies?",
        "category": "Technical",
        "difficulty": "Medium",
        "target_skill": "Software Design Principles",
        "sample_hint": "Mention dependency injection, unit/integration testing, and clear separation of concerns."
    },
    {
        "id": "gen-proj-1",
        "question": "Describe a challenging technical problem you solved recently. What was your systematic debugging process?",
        "category": "Project",
        "difficulty": "Medium",
        "target_skill": "Problem Solving",
        "sample_hint": "Walk through observation, reproduction, root-cause isolation, and regression verification."
    },
    {
        "id": "gen-hr-1",
        "question": "Can you give an example of a project where you collaborated with cross-functional teammates under tight deadlines?",
        "category": "HR",
        "difficulty": "Easy",
        "target_skill": "Teamwork & Time Management",
        "sample_hint": "Highlight clear communication, iterative milestones, and accountability."
    }
]

@router.get("/questions")
def get_interview_questions(
    role: str = Query("Data Scientist", description="Target role"),
    mode: str = Query("Technical", description="Question category or 'All'")
):
    """Retrieve curated interview questions by role and category."""
    matched_role = None
    for r in QUESTION_BANK:
        if r.lower() in role.lower() or role.lower() in r.lower():
            matched_role = r
            break
            
    questions = QUESTION_BANK.get(matched_role or "Data Scientist", GENERIC_QUESTIONS)
    
    if mode and mode != "All":
        filtered = [q for q in questions if q["category"].lower() == mode.lower()]
        return filtered if filtered else questions
        
    return questions


@router.post("/evaluate")
def evaluate_interview_answer(payload: EvaluateRequest):
    """
    Evaluates candidate's spoken or written answer with rubric scoring and coaching.
    Uses multi-dimensional semantic heuristics and STAR framework validation.
    """
    text = payload.answer.strip()
    words = re.findall(r"\b\w+\b", text)
    word_count = len(words)
    
    strengths = []
    growth_areas = []
    
    # 1. Base length & completeness heuristic
    if word_count < 25:
        completeness = max(35, word_count * 2)
        growth_areas.append("Your response was very brief. Aim for 80-150 words to provide thorough technical depth and context.")
    elif word_count < 70:
        completeness = 70 + int((word_count - 25) * 0.4)
        strengths.append("Good concise overview.")
        growth_areas.append("You could strengthen the answer by including specific metrics, tools, or real-world trade-offs.")
    else:
        completeness = min(96, 85 + int((word_count - 70) * 0.2))
        strengths.append("Thorough and detailed response demonstrating solid context.")

    # 2. STAR Framework check
    star_indicators = {
        "Situation": ["context", "situation", "project", "when", "while", "background"],
        "Task": ["task", "goal", "challenge", "objective", "needed to", "requirement"],
        "Action": ["implemented", "built", "designed", "used", "created", "analyzed", "applied", "configured", "wrote"],
        "Result": ["resulted", "achieved", "improved", "reduced", "increased", "%", "metric", "outcome", "successfully"]
    }
    
    star_hits = {key: any(re.search(rf"\b{kw}\b", text, re.IGNORECASE) for kw in kws) for key, kws in star_indicators.items()}
    star_count = sum(1 for v in star_hits.values() if v)
    
    if star_hits["Action"]:
        strengths.append("Clear description of the actions you personally took.")
    else:
        growth_areas.append("Specify the exact actions and technical steps you executed rather than general theory.")
        
    if star_hits["Result"]:
        strengths.append("Good inclusion of concrete results or impact metrics.")
    else:
        growth_areas.append("Close your answer with quantifiable results (e.g., latency reduction, accuracy increase, or team adoption).")

    # 3. Technical Correctness & Conceptual Clarity
    tech_keywords = [
        "pipeline", "model", "validation", "metric", "performance", "architecture",
        "database", "api", "cache", "async", "testing", "scale", "query", "schema",
        "react", "state", "hook", "component", "latency", "drift", "feature", "dataset"
    ]
    tech_hit_count = sum(1 for kw in tech_keywords if re.search(rf"\b{kw}\b", text, re.IGNORECASE))
    
    technical_correctness = min(95, 60 + tech_hit_count * 7 + (10 if word_count > 50 else 0))
    conceptual_clarity = min(94, 65 + star_count * 6 + (8 if word_count >= 60 else 0))
    
    if tech_hit_count >= 3:
        strengths.append("Effective use of precise industry and engineering terminology.")
    elif tech_hit_count == 0:
        growth_areas.append("Incorporate explicit domain terminology and named libraries/algorithms.")

    # 4. Generate structured model answer
    improved_sample = (
        f"In my previous work on {payload.target_role} applications, I tackled a similar challenge. "
        f"Specifically, regarding '{payload.question}', the best-practice approach begins with isolating the requirements "
        f"and establishing verifiable baselines. For example, by structuring the solution modularly and incorporating automated "
        f"validation gates, we eliminated edge-case regressions and achieved a 35% improvement in operational throughput. "
        f"Always conclude by discussing how you monitor performance continuously in production."
    )
    
    star_coaching = (
        f"STAR Framework Analysis: You successfully covered {star_count}/4 elements "
        f"({', '.join(k for k, v in star_hits.items() if v) if star_count > 0 else 'None'}). "
        "For maximum impact in technical interviews, clearly demarcate: Situation -> Task -> Action -> Result."
    )

    return {
        "technical_correctness_score": technical_correctness,
        "conceptual_clarity_score": conceptual_clarity,
        "completeness_score": completeness,
        "strengths": strengths if strengths else ["Clear and responsive communication tone."],
        "growth_areas": growth_areas if growth_areas else ["Keep practicing with diverse scenario constraints."],
        "improved_sample_answer": improved_sample,
        "star_framework_coaching": star_coaching
    }
