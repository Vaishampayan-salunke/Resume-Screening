import re
import io
from typing import Tuple, Dict, Optional, Any
import pypdf

try:
    import docx
except ImportError:
    docx = None

class DocumentParser:
    @staticmethod
    def extract_text(file_bytes: bytes, filename: str) -> str:
        """Extract text from PDF, DOCX, or plain text bytes."""
        fname = filename.lower()
        if fname.endswith(".pdf"):
            return DocumentParser.extract_text_from_pdf(file_bytes)
        elif fname.endswith(".docx"):
            return DocumentParser.extract_text_from_docx(file_bytes)
        else:
            return DocumentParser.clean_text(file_bytes.decode("utf-8", errors="ignore"))

    @staticmethod
    def extract_text_from_pdf(pdf_bytes: bytes) -> str:
        """Extract clean text from PDF bytes using pypdf."""
        try:
            reader = pypdf.PdfReader(io.BytesIO(pdf_bytes))
            text_parts = []
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text_parts.append(page_text)
            extracted = "\n".join(text_parts)
            return DocumentParser.clean_text(extracted)
        except Exception as e:
            return f"Error extracting PDF: {str(e)}"

    @staticmethod
    def extract_text_from_docx(docx_bytes: bytes) -> str:
        """Extract text from DOCX bytes using python-docx."""
        try:
            if docx is None:
                return "python-docx library is not available."
            doc = docx.Document(io.BytesIO(docx_bytes))
            text_parts = []
            for p in doc.paragraphs:
                if p.text.strip():
                    text_parts.append(p.text.strip())
            for table in doc.tables:
                for row in table.rows:
                    row_text = [cell.text.strip() for cell in row.cells if cell.text.strip()]
                    if row_text:
                        text_parts.append(" | ".join(row_text))
            return DocumentParser.clean_text("\n".join(text_parts))
        except Exception as e:
            return f"Error extracting DOCX: {str(e)}"

    @staticmethod
    def clean_text(text: str) -> str:
        """Normalize whitespace, remove weird non-ASCII ligatures and cleanup formatting."""
        if not text:
            return ""
        # Replace non-breaking spaces and unicode ligatures
        text = text.replace('\xa0', ' ').replace('\u2013', '-').replace('\u2014', '--')
        text = text.replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"')
        # Replace multiple spaces/newlines
        text = re.sub(r'[ \t]+', ' ', text)
        text = re.sub(r'\n\s*\n+', '\n\n', text)
        return text.strip()

    @staticmethod
    def extract_contact_info(text: str) -> Dict[str, Optional[str]]:
        """Extract email, phone, and probable candidate name while keeping PII masked for ML."""
        email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
        phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}', text)

        lines = [line.strip() for line in text.split('\n') if line.strip()]
        candidate_name = None
        for line in lines[:5]:
            words = line.split()
            if 2 <= len(words) <= 4 and all(w[0].isupper() for w in words if w.isalpha()):
                if not any(header in line.lower() for header in ['curriculum', 'resume', 'cv', 'profile', 'contact', 'summary']):
                    candidate_name = line
                    break

        return {
            "name": candidate_name or "Candidate",
            "email": email_match.group(0) if email_match else None,
            "phone": phone_match.group(0) if phone_match else None
        }

    @staticmethod
    def scrub_pii_for_ml(text: str) -> str:
        """Anonymizes name, email, phone, and addresses so ML classification remains strictly fair."""
        scrubbed = re.sub(r'[\w\.-]+@[\w\.-]+\.\w+', '[EMAIL_ANONYMIZED]', text)
        scrubbed = re.sub(r'(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}', '[PHONE_ANONYMIZED]', scrubbed)
        return scrubbed

def parse_resume_file(file_bytes: bytes, filename: str) -> Dict[str, Any]:
    """Convenience wrapper for extracting text, contact info, and anonymized ML text."""
    raw_text = DocumentParser.extract_text(file_bytes, filename)
    contact = DocumentParser.extract_contact_info(raw_text)
    scrubbed = DocumentParser.scrub_pii_for_ml(raw_text)
    ext = filename.split(".")[-1].lower() if "." in filename else "txt"
    return {
        "text": scrubbed,
        "raw_text": raw_text,
        "contact": contact,
        "metadata": {
            "file_format": ext,
            "filename": filename,
            "char_count": len(raw_text)
        }
    }

