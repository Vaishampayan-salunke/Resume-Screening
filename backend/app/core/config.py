import os
from pathlib import Path
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"
WORKSPACE_DIR = BASE_DIR.parent
DATASETS_DIR = WORKSPACE_DIR / "Datasets"

class Settings(BaseModel):
    APP_NAME: str = "TalentLens AI"
    APP_VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    ENV: str = os.getenv("ENV", "development")
    DEBUG: bool = True
    
    # Matching Weights for Decision Support
    WEIGHT_SEMANTIC: float = 0.35
    WEIGHT_SKILL_EXACT: float = 0.35
    WEIGHT_SKILL_PARTIAL: float = 0.10
    WEIGHT_EXPERIENCE: float = 0.10
    WEIGHT_EDUCATION: float = 0.10

    # Compatibility Thresholds
    THRESHOLD_GOOD_FIT: float = 75.0
    THRESHOLD_POTENTIAL_FIT: float = 50.0

    # File Uploads
    MAX_UPLOAD_SIZE_MB: int = 10
    ALLOWED_EXTENSIONS: list[str] = [".pdf", ".txt"]

    # Transformer Model
    EMBEDDING_MODEL_NAME: str = "sentence-transformers/all-MiniLM-L6-v2"

settings = Settings()
