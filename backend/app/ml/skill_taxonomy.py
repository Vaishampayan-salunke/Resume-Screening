"""
ESCO-aligned Standardized Skill Ontology & Taxonomy.
Provides canonical skill normalization, semantic alias resolution,
category classification, importance scoring, and learning pathway metadata.
"""

from typing import Dict, Any, List, Optional

SKILL_TAXONOMY: Dict[str, Dict[str, Any]] = {
    # --- Programming Languages ---
    "python": {
        "canonical": "Python",
        "category": "Programming Languages",
        "aliases": ["python", "python3", "py", "python scripting"],
        "importance": "Critical",
        "why_required": "Core language for data science, machine learning backend development, and script automation.",
        "resources": ["Official Python Docs (python.org)", "Real Python (realpython.com)", "LeetCode Python Track"]
    },
    "java": {
        "canonical": "Java",
        "category": "Programming Languages",
        "aliases": ["java", "core java", "java 8", "java 17", "j2se"],
        "importance": "High",
        "why_required": "Enterprise systems, scalable backend services, and high-throughput data processing engines.",
        "resources": ["Oracle Java Documentation", "Java Brains Courses", "Baeldung Tutorials"]
    },
    "javascript": {
        "canonical": "JavaScript",
        "category": "Programming Languages",
        "aliases": ["javascript", "js", "es6", "vanilla js", "ecmascript"],
        "importance": "High",
        "why_required": "Foundational programming language for web client interactivity and modern full-stack workflows.",
        "resources": ["MDN Web Docs", "javascript.info", "Eloquent JavaScript"]
    },
    "typescript": {
        "canonical": "TypeScript",
        "category": "Programming Languages",
        "aliases": ["typescript", "ts"],
        "importance": "High",
        "why_required": "Enables type safety, early compile-time bug detection, and maintainable large-scale frontend architecture.",
        "resources": ["Official TypeScript Handbook", "Total TypeScript by Matt Pocock"]
    },
    "c++": {
        "canonical": "C++",
        "category": "Programming Languages",
        "aliases": ["c++", "cpp", "c/c++"],
        "importance": "High",
        "why_required": "High-performance systems programming, graphics engines, and latency-critical ML inference runtimes.",
        "resources": ["learncpp.com", "CppReference.com"]
    },
    "sql": {
        "canonical": "SQL",
        "category": "Data & Databases",
        "aliases": ["sql", "structured query language", "ansi sql", "pl/sql", "t-sql"],
        "importance": "Critical",
        "why_required": "Essential for querying, aggregating, and extracting structured relational data from enterprise databases.",
        "resources": ["Mode Analytics SQL Tutorial", "SQLBolt", "LeetCode Database 50"]
    },

    # --- Machine Learning & AI ---
    "machine learning": {
        "canonical": "Machine Learning",
        "category": "Machine Learning & AI",
        "aliases": ["machine learning", "ml", "statistical learning", "pattern recognition"],
        "importance": "Critical",
        "why_required": "Core discipline for developing predictive models, pattern classifiers, and automated scoring systems.",
        "resources": ["Andrew Ng's Machine Learning Specialization (Coursera)", "Fast.ai Practical Deep Learning", "Hands-On Machine Learning (Géron)"]
    },
    "deep learning": {
        "canonical": "Deep Learning",
        "category": "Machine Learning & AI",
        "aliases": ["deep learning", "dl", "neural networks", "ann", "cnn", "rnn"],
        "importance": "High",
        "why_required": "Required for complex unstructured data modeling (text, audio, vision) using multi-layer neural networks.",
        "resources": ["Deep Learning by Ian Goodfellow", "Fast.ai", "Stanford CS230"]
    },
    "natural language processing": {
        "canonical": "Natural Language Processing",
        "category": "Machine Learning & AI",
        "aliases": ["natural language processing", "nlp", "text analytics", "text processing"],
        "importance": "Critical",
        "why_required": "Central capability for parsing resumes, extracting skills, text classification, and understanding job postings.",
        "resources": ["Stanford CS224N", "Hugging Face NLP Course", "Speech and Language Processing (Jurafsky & Martin)"]
    },
    "pytorch": {
        "canonical": "PyTorch",
        "category": "Machine Learning & AI",
        "aliases": ["pytorch", "torch"],
        "importance": "Critical",
        "why_required": "De facto industry standard framework for deep learning research and production neural network training.",
        "resources": ["PyTorch.org Tutorials", "Deep Learning with PyTorch Book", "Aladdin Persson PyTorch Series"]
    },
    "tensorflow": {
        "canonical": "TensorFlow",
        "category": "Machine Learning & AI",
        "aliases": ["tensorflow", "tf", "tf2", "keras"],
        "importance": "High",
        "why_required": "End-to-end open source platform for machine learning, model export, and TF Serving pipelines.",
        "resources": ["TensorFlow Developer Certificate Program", "Google Developers TF Tutorials"]
    },
    "scikit-learn": {
        "canonical": "Scikit-Learn",
        "category": "Machine Learning & AI",
        "aliases": ["scikit-learn", "sklearn", "scikit learn"],
        "importance": "Critical",
        "why_required": "Fundamental toolkit for classical machine learning, feature transformers, baselines, and evaluation metrics.",
        "resources": ["Scikit-Learn Official User Guide", "Applied Predictive Modeling (Kuhn)"]
    },
    "transformers": {
        "canonical": "Transformers & LLMs",
        "category": "Machine Learning & AI",
        "aliases": ["transformers", "hugging face", "huggingface", "bert", "distilbert", "sbert", "sentence-transformers", "llms"],
        "importance": "High",
        "why_required": "State-of-the-art attention architectures for semantic embeddings, contextual retrieval, and generative AI.",
        "resources": ["Hugging Face NLP Course", "Sentence-Transformers Documentation (sbert.net)"]
    },

    # --- Data Engineering & Databases ---
    "pandas": {
        "canonical": "Pandas",
        "category": "Data & Databases",
        "aliases": ["pandas", "dataframe", "data wrangling"],
        "importance": "Critical",
        "why_required": "Core library for dataset cleaning, EDA, tabular transformation, and feature engineering.",
        "resources": ["Python for Data Analysis by Wes McKinney", "Pandas Official 10-Minute Guide"]
    },
    "numpy": {
        "canonical": "NumPy",
        "category": "Data & Databases",
        "aliases": ["numpy", "numerical python", "matrix operations"],
        "importance": "High",
        "why_required": "High-performance vector and matrix mathematical computations underlying ML frameworks.",
        "resources": ["NumPy Official Docs", "Stanford CS231n NumPy Tutorial"]
    },
    "postgresql": {
        "canonical": "PostgreSQL",
        "category": "Data & Databases",
        "aliases": ["postgresql", "postgres", "psql"],
        "importance": "High",
        "why_required": "Robust open-source relational database standard for transactional reliability, JSONB, and ACID guarantees.",
        "resources": ["PostgreSQL Tutorial (postgresqltutorial.com)", "Designing Data-Intensive Applications (Kleppmann)"]
    },
    "mongodb": {
        "canonical": "MongoDB",
        "category": "Data & Databases",
        "aliases": ["mongodb", "mongo", "nosql"],
        "importance": "Medium",
        "why_required": "Flexible document storage for polymorphic JSON entities like unstructured resumes and job records.",
        "resources": ["MongoDB University Free Courses", "MongoDB Developer Docs"]
    },
    "spark": {
        "canonical": "Apache Spark",
        "category": "Data & Databases",
        "aliases": ["apache spark", "spark", "pyspark"],
        "importance": "High",
        "why_required": "Distributed computing framework for processing large-scale datasets and distributed batch ML pipelines.",
        "resources": ["Spark: The Definitive Guide (Chambers & Zaharia)", "Databricks Spark Tutorials"]
    },

    # --- Cloud & DevOps ---
    "docker": {
        "canonical": "Docker",
        "category": "Cloud & DevOps",
        "aliases": ["docker", "containerization", "containers", "dockerfile"],
        "importance": "Critical",
        "why_required": "Guarantees reproducible runtime environments across developer machines, CI/CD, and production nodes.",
        "resources": ["Docker Getting Started Guide", "Docker Mastery by Bret Fisher", "DevOps with Docker (University of Helsinki)"]
    },
    "kubernetes": {
        "canonical": "Kubernetes",
        "category": "Cloud & DevOps",
        "aliases": ["kubernetes", "k8s"],
        "importance": "High",
        "why_required": "Container orchestration, auto-scaling, and automated self-healing for cloud-native microservices.",
        "resources": ["Kubernetes The Hard Way by Kelsey Hightower", "Official K8s Documentation"]
    },
    "aws": {
        "canonical": "Amazon Web Services",
        "category": "Cloud & DevOps",
        "aliases": ["aws", "amazon web services", "ec2", "s3", "lambda", "sagemaker"],
        "importance": "High",
        "why_required": "Industry-leading cloud platform hosting backend infrastructure, model endpoints, and storage.",
        "resources": ["AWS Skill Builder", "AWS Certified Cloud Practitioner & Solutions Architect Guides"]
    },
    "gcp": {
        "canonical": "Google Cloud Platform",
        "category": "Cloud & DevOps",
        "aliases": ["gcp", "google cloud", "google cloud platform", "vertex ai", "bigquery"],
        "importance": "High",
        "why_required": "Premier cloud ecosystem for machine learning (Vertex AI), data warehousing (BigQuery), and scalability.",
        "resources": ["Google Cloud Skills Boost", "GCP Professional Machine Learning Engineer Track"]
    },
    "git": {
        "canonical": "Git & Version Control",
        "category": "Cloud & DevOps",
        "aliases": ["git", "github", "gitlab", "version control"],
        "importance": "Critical",
        "why_required": "Foundational requirement for distributed team collaboration, code branching, and CI/CD triggers.",
        "resources": ["Pro Git Book (git-scm.com)", "GitHub Skills Lab"]
    },
    "ci/cd": {
        "canonical": "CI/CD Pipelines",
        "category": "Cloud & DevOps",
        "aliases": ["ci/cd", "continuous integration", "github actions", "jenkins"],
        "importance": "High",
        "why_required": "Automated code linting, unit testing, model validation, and deployment pipelines.",
        "resources": ["GitHub Actions Documentation", "GitLab CI/CD Guide"]
    },

    # --- Web & Backend Frameworks ---
    "fastapi": {
        "canonical": "FastAPI",
        "category": "Web & Backend",
        "aliases": ["fastapi", "fast api"],
        "importance": "High",
        "why_required": "Modern, high-performance asynchronous Python web framework for microservices and ML inference endpoints.",
        "resources": ["Official FastAPI Tutorial (tiangolo.com)", "TestDriven.io FastAPI Guide"]
    },
    "flask": {
        "canonical": "Flask",
        "category": "Web & Backend",
        "aliases": ["flask"],
        "importance": "Medium",
        "why_required": "Lightweight WSGI Python web framework for rapid prototyping and microservices.",
        "resources": ["Miguel Grinberg Flask Mega-Tutorial", "Official Flask Docs"]
    },
    "react": {
        "canonical": "React",
        "category": "Web & Backend",
        "aliases": ["react", "react.js", "reactjs"],
        "importance": "High",
        "why_required": "Dominant component-based frontend library for interactive, stateful web applications.",
        "resources": ["React.dev Official Documentation", "Epic React by Kent C. Dodds"]
    },
    "node.js": {
        "canonical": "Node.js",
        "category": "Web & Backend",
        "aliases": ["node.js", "node", "nodejs"],
        "importance": "High",
        "why_required": "Asynchronous event-driven JavaScript runtime powering enterprise backend services and build pipelines.",
        "resources": ["Node.js Official Documentation", "The Complete Node.js Developer Course"]
    },

    # --- Soft Skills & Methodologies ---
    "communication": {
        "canonical": "Communication Skills",
        "category": "Soft Skills",
        "aliases": ["communication", "verbal communication", "written communication", "presentation skills"],
        "importance": "Critical",
        "why_required": "Enables engineers to articulate complex ML decisions and architectural trade-offs to cross-functional stakeholders.",
        "resources": ["Crucial Conversations Book", "Harvard Business Review Guide to Better Business Writing"]
    },
    "problem solving": {
        "canonical": "Problem Solving",
        "category": "Soft Skills",
        "aliases": ["problem solving", "analytical thinking", "critical thinking"],
        "importance": "Critical",
        "why_required": "Ability to decompose ambiguous real-world requirements into systematic technical solutions.",
        "resources": ["How to Solve It by G. Polya", "MIT OpenCourseWare Problem Solving Techniques"]
    },
    "team collaboration": {
        "canonical": "Team Collaboration",
        "category": "Soft Skills",
        "aliases": ["collaboration", "teamwork", "cross-functional collaboration", "agile", "scrum"],
        "importance": "High",
        "why_required": "Essential for agile sprint planning, code reviews, and working effectively in product engineering squads.",
        "resources": ["Scrum Guide (scrumguides.org)", "Atlassian Agile Coach"]
    }
}

# Build rapid reverse-lookup table: alias -> canonical key
ALIAS_TO_CANONICAL: Dict[str, str] = {}
for key, data in SKILL_TAXONOMY.items():
    ALIAS_TO_CANONICAL[key.lower()] = key
    for alias in data.get("aliases", []):
        ALIAS_TO_CANONICAL[alias.lower()] = key

def normalize_skill(skill_raw: str) -> Optional[Dict[str, Any]]:
    """Returns canonical metadata for a skill string if matched in taxonomy."""
    clean = skill_raw.lower().strip()
    key = ALIAS_TO_CANONICAL.get(clean)
    if key and key in SKILL_TAXONOMY:
        return SKILL_TAXONOMY[key]
    return None
