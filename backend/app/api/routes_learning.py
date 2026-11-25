from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

router = APIRouter(prefix="/learning", tags=["Learning Roadmap"])

ROADMAP_PHASES = [
    {
        "phase_number": 1,
        "phase_title": "Programming & Foundations",
        "estimated_weeks": "Weeks 1 - 2",
        "skills": [
            {
                "name": "Python Programming Core",
                "description": "Object-oriented programming, data structures (dicts, sets, lists), list comprehensions, and generators.",
                "resources": [
                    {"title": "Scientific Computing with Python", "provider": "freeCodeCamp", "type": "Free", "url": "https://freecodecamp.org"},
                    {"title": "Official Python Tutorial", "provider": "Python.org", "type": "Free", "url": "https://docs.python.org"}
                ],
                "is_completed": True
            },
            {
                "name": "Git & GitHub Version Control",
                "description": "Branching, pull requests, resolving merge conflicts, and publishing open-source portfolios.",
                "resources": [
                    {"title": "Git & GitHub Crash Course", "provider": "freeCodeCamp", "type": "Free", "url": "https://freecodecamp.org"},
                    {"title": "Pro Git Book", "provider": "Git-SCM", "type": "Free", "url": "https://git-scm.com/book"}
                ],
                "is_completed": True
            }
        ],
        "portfolio_project": {
            "title": "Command-Line ETL Tool & Data Formatter",
            "description": "Build a modular CLI utility that reads multi-format files, scrubs anomalies, and outputs normalized JSON with pytest coverage.",
            "deliverables": ["Modular Python package", "Automated pytest suite", "Comprehensive README"],
            "difficulty": "Beginner"
        }
    },
    {
        "phase_number": 2,
        "phase_title": "Mathematics, Statistics & SQL",
        "estimated_weeks": "Weeks 3 - 4",
        "skills": [
            {
                "name": "SQL Fundamentals & Analytical Queries",
                "description": "Aggregations, joins, window functions (ROW_NUMBER, RANK), and CTEs for feature engineering.",
                "resources": [
                    {"title": "SQLBolt Interactive Exercises", "provider": "SQLBolt", "type": "Free", "url": "https://sqlbolt.com"},
                    {"title": "Intro to SQL", "provider": "Kaggle Learn", "type": "Free", "url": "https://kaggle.com/learn"}
                ],
                "is_completed": True
            },
            {
                "name": "Linear Algebra & Probability for ML",
                "description": "Vectors, matrix multiplications, eigenvalues, Bayes theorem, probability distributions, and hypothesis testing.",
                "resources": [
                    {"title": "Essence of Linear Algebra", "provider": "3Blue1Brown", "type": "Free", "url": "https://3blue1brown.com"},
                    {"title": "Mathematics for Machine Learning", "provider": "Coursera (Imperial)", "type": "Free", "url": "https://coursera.org"}
                ],
                "is_completed": False
            }
        ],
        "portfolio_project": {
            "title": "Relational Database Performance & Analytics Pipeline",
            "description": "Formulate an analytical reporting dashboard on a multi-table database with complex indexes and window calculations.",
            "deliverables": ["Schema DDL + queries", "Benchmark query execution plan"],
            "difficulty": "Intermediate"
        }
    },
    {
        "phase_number": 3,
        "phase_title": "Data Wrangling & Exploratory Analysis",
        "estimated_weeks": "Weeks 5 - 6",
        "skills": [
            {
                "name": "Pandas & NumPy Vectorization",
                "description": "Multi-indexing, pivot tables, vectorized operations, missing value imputation, and memory optimization.",
                "resources": [
                    {"title": "Pandas Official 10-Minute Walkthrough", "provider": "Pandas Dev Team", "type": "Free", "url": "https://pandas.pydata.org"},
                    {"title": "Data Cleaning Track", "provider": "Kaggle Learn", "type": "Free", "url": "https://kaggle.com/learn"}
                ],
                "is_completed": False
            }
        ],
        "portfolio_project": {
            "title": "Comprehensive EDA on 100k+ Real Job Listings",
            "description": "Process an open job dataset, clean missing fields, and visualize skill co-occurrence networks with insight findings.",
            "deliverables": ["Interactive Jupyter Notebook", "Publication-quality plots", "Executive Summary"],
            "difficulty": "Intermediate"
        }
    },
    {
        "phase_number": 4,
        "phase_title": "Classical Machine Learning",
        "estimated_weeks": "Weeks 7 - 8",
        "skills": [
            {
                "name": "Scikit-Learn Machine Learning Pipelines",
                "description": "Regression, classification (Random Forests, Logistic Regression, XGBoost), hyperparameter tuning, and cross-validation.",
                "resources": [
                    {"title": "Machine Learning Specialization", "provider": "Coursera (DeepLearning.AI)", "type": "Free", "url": "https://coursera.org"},
                    {"title": "Scikit-Learn Official User Guide", "provider": "Scikit-Learn", "type": "Free", "url": "https://scikit-learn.org"}
                ],
                "is_completed": False
            }
        ],
        "portfolio_project": {
            "title": "End-to-End Classification System with Benchmark Evaluation",
            "description": "Build a supervised classification pipeline comparing baseline Logistic Regression against Random Forest with confusion matrix and precision/recall evaluation.",
            "deliverables": ["Serialized .joblib model", "Metrics JSON artifact", "Evaluation Report"],
            "difficulty": "Intermediate"
        }
    },
    {
        "phase_number": 5,
        "phase_title": "Deep Learning & NLP",
        "estimated_weeks": "Weeks 9 - 10",
        "skills": [
            {
                "name": "PyTorch Neural Networks",
                "description": "Tensors, autograd, custom Dataset and DataLoader classes, training loops, and loss functions.",
                "resources": [
                    {"title": "Deep Learning with PyTorch", "provider": "PyTorch.org", "type": "Free", "url": "https://pytorch.org/tutorials"},
                    {"title": "Practical Deep Learning for Coders", "provider": "Fast.ai", "type": "Free", "url": "https://course.fast.ai"}
                ],
                "is_completed": False
            },
            {
                "name": "Sentence-Transformers & Text Embeddings",
                "description": "Dense embedding generation, semantic similarity scoring, and transformer attention fundamentals.",
                "resources": [
                    {"title": "Hugging Face NLP Course", "provider": "Hugging Face", "type": "Free", "url": "https://huggingface.co/course"}
                ],
                "is_completed": False
            }
        ],
        "portfolio_project": {
            "title": "Semantic Document Search & Skill Extraction Engine",
            "description": "Implement dense text retrieval utilizing Sentence-BERT embeddings, cosine ranking, and entity extraction.",
            "deliverables": ["FastAPI semantic search endpoint", "Interactive web demo", "Model card"],
            "difficulty": "Advanced"
        }
    },
    {
        "phase_number": 6,
        "phase_title": "Model Deployment & MLOps",
        "estimated_weeks": "Weeks 11 - 12",
        "skills": [
            {
                "name": "Docker Microservices Containerization",
                "description": "Dockerfiles, multi-stage builds, container isolation, volume mounts, and Docker Compose orchestration.",
                "resources": [
                    {"title": "Docker Getting Started Guide", "provider": "Docker Docs", "type": "Free", "url": "https://docs.docker.com"},
                    {"title": "DevOps with Docker", "provider": "University of Helsinki", "type": "Free", "url": "https://devopswithdocker.com"}
                ],
                "is_completed": False
            },
            {
                "name": "FastAPI Production Model Serving",
                "description": "Asynchronous route handlers, Pydantic schemas, dependency injection, and sub-100ms inference caching.",
                "resources": [
                    {"title": "FastAPI Official Documentation", "provider": "Tiangolo", "type": "Free", "url": "https://fastapi.tiangolo.com"}
                ],
                "is_completed": False
            }
        ],
        "portfolio_project": {
            "title": "Production ML Inference Microservice API",
            "description": "Deploy a containerized REST API with Pydantic request validation, background workers, and automated OpenAPI documentation.",
            "deliverables": ["Dockerfile + compose file", "Swagger interactive docs", "GitHub Actions CI test suite"],
            "difficulty": "Advanced"
        }
    }
]

COMPLETED_SKILLS: set[str] = {"Python Programming Core", "Git & GitHub Version Control", "SQL Fundamentals & Analytical Queries"}

class ProgressPayload(BaseModel):
    skill_name: str
    completed: bool

@router.get("/roadmap")
def get_roadmap(role: Optional[str] = Query(None)):
    target_role = role or "Machine Learning Engineer"
    return {
        "target_role": target_role,
        "phases": ROADMAP_PHASES
    }

@router.post("/progress")
def toggle_progress(payload: ProgressPayload):
    if payload.completed:
        COMPLETED_SKILLS.add(payload.skill_name)
    else:
        COMPLETED_SKILLS.discard(payload.skill_name)
    return {"success": True, "completed": payload.completed}
