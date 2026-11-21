import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from app.ml.pdf_parser import DocumentParser
from app.ml.section_extractor import SectionExtractor
from app.ml.skill_extractor import SkillExtractor
from app.schemas.resume import ParsedResume

router = APIRouter(prefix="/resume", tags=["Resume"])

# In-memory store for parsed resumes in this academic prototype session
RESUME_STORE: dict[str, ParsedResume] = {}

@router.post("/upload", response_model=ParsedResume)
async def upload_resume(file: UploadFile = File(...)):
    """Upload and parse a PDF or text resume into structured sections and skills."""
    if not (file.filename.endswith(".pdf") or file.filename.endswith(".txt")):
        raise HTTPException(status_code=400, detail="Only .pdf and .txt files are supported.")

    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds maximum 10MB limit.")

    # Extract text
    if file.filename.endswith(".pdf"):
        raw_text = DocumentParser.extract_text_from_pdf(content)
    else:
        raw_text = content.decode("utf-8", errors="ignore")

    cleaned_text = DocumentParser.clean_text(raw_text)
    if not cleaned_text or len(cleaned_text) < 30:
        raise HTTPException(status_code=422, detail="Unable to extract meaningful text from this document.")

    contact = DocumentParser.extract_contact_info(cleaned_text)
    sections = SectionExtractor.extract_sections(cleaned_text)
    skills = SkillExtractor.get_skill_names(cleaned_text)
    experience_years = SectionExtractor.estimate_experience_years(sections.get("experience", ""), cleaned_text)

    # Extract education degrees
    edu_text = sections.get("education", "")
    education_list = [line.strip() for line in edu_text.split('\n') if line.strip()][:3]

    # Extract projects
    proj_text = sections.get("projects", "")
    project_list = [line.strip() for line in proj_text.split('\n') if line.strip()][:4]

    # Extract certifications
    cert_text = sections.get("certifications", "")
    cert_list = [line.strip() for line in cert_text.split('\n') if line.strip()][:3]

    resume_id = str(uuid.uuid4())
    parsed = ParsedResume(
        id=resume_id,
        filename=file.filename,
        raw_text=raw_text,
        cleaned_text=cleaned_text,
        candidate_name=contact["name"],
        email=contact["email"],
        phone=contact["phone"],
        sections=sections,
        skills=skills,
        education=education_list,
        experience_years=experience_years,
        projects=project_list,
        certifications=cert_list
    )

    RESUME_STORE[resume_id] = parsed
    return parsed

@router.get("/{resume_id}", response_model=ParsedResume)
def get_resume(resume_id: str):
    """Retrieve previously parsed resume by ID."""
    if resume_id not in RESUME_STORE:
        raise HTTPException(status_code=404, detail="Resume not found.")
    return RESUME_STORE[resume_id]
