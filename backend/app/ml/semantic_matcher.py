import numpy as np
from typing import Tuple, Optional
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging

logger = logging.getLogger(__name__)

class SemanticMatcher:
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        self.model_name = model_name
        self._sbert_model = None
        self._tfidf_vectorizer = TfidfVectorizer(
            stop_words='english',
            max_features=5000,
            ngram_range=(1, 2)
        )

    @property
    def sbert_model(self):
        """Lazy load SentenceTransformer model to keep startup snappy and memory clean."""
        if self._sbert_model is None:
            try:
                from sentence_transformers import SentenceTransformer
                logger.info(f"Loading SentenceTransformer: {self.model_name}")
                self._sbert_model = SentenceTransformer(self.model_name)
            except Exception as e:
                logger.warning(f"Could not load SentenceTransformer ({e}). Falling back to TF-IDF.")
                self._sbert_model = False
        return self._sbert_model

    def compute_tfidf_similarity(self, resume_text: str, job_text: str) -> float:
        """Baseline TF-IDF Cosine Similarity calculation (0.0 to 1.0)."""
        if not resume_text.strip() or not job_text.strip():
            return 0.0
        try:
            tfidf_matrix = self._tfidf_vectorizer.fit_transform([resume_text, job_text])
            sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            return float(np.clip(sim, 0.0, 1.0))
        except Exception as e:
            logger.error(f"TF-IDF similarity error: {e}")
            return 0.0

    def compute_sbert_similarity(self, resume_text: str, job_text: str) -> float:
        """Deep contextual similarity using Sentence-BERT embeddings (0.0 to 1.0)."""
        if not resume_text.strip() or not job_text.strip():
            return 0.0

        model = self.sbert_model
        if model is False or model is None:
            # Fallback to TF-IDF
            return self.compute_tfidf_similarity(resume_text, job_text)

        try:
            # Generate normalized dense embeddings
            embeddings = model.encode([resume_text, job_text], normalize_embeddings=True)
            # Cosine similarity of normalized unit vectors is simply dot product
            sim = float(np.dot(embeddings[0], embeddings[1]))
            # Rescale slightly from [-1, 1] to [0, 1]
            scaled = (sim + 1.0) / 2.0
            return float(np.clip(scaled, 0.0, 1.0))
        except Exception as e:
            logger.error(f"SBERT similarity error: {e}")
            return self.compute_tfidf_similarity(resume_text, job_text)

    def compare_baseline_and_semantic(self, resume_text: str, job_text: str) -> Tuple[float, float]:
        """Returns (tfidf_baseline_score, sbert_score) for academic benchmark reports."""
        tfidf_score = self.compute_tfidf_similarity(resume_text, job_text)
        sbert_score = self.compute_sbert_similarity(resume_text, job_text)
        return round(tfidf_score * 100, 2), round(sbert_score * 100, 2)

# Global singleton instance
semantic_matcher = SemanticMatcher()
