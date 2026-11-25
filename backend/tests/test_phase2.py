import os
import io
import pytest
from fastapi.testclient import TestClient
from main import app
from app.ml.pdf_parser import parse_resume_file
import docx

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "TalentLens" in data["app"]

def test_docx_parser():
    """Verify DOCX generation and parsing works cleanly."""
    doc = docx.Document()
    doc.add_heading("Jane Doe - Senior ML Engineer", 0)
    doc.add_paragraph("Email: jane.doe@example.com | Phone: +1 555-0199")
    doc.add_paragraph("Skills: Python, PyTorch, Scikit-Learn, Docker, Kubernetes, SQL")
    doc.add_paragraph("Built recommendation systems and fine-tuned BERT models.")
    
    file_stream = io.BytesIO()
    doc.save(file_stream)
    docx_bytes = file_stream.getvalue()
    
    parsed = parse_resume_file(docx_bytes, filename="test_resume.docx")
    assert "text" in parsed
    assert "Python" in parsed["text"]
    assert "BERT" in parsed["text"]
    assert parsed["metadata"]["file_format"] == "docx"
    # PII scrubbing check
    assert "jane.doe@example.com" not in parsed["text"]
    assert "[EMAIL_ANONYMIZED]" in parsed["text"]

def test_career_recommendations():
    """Verify career paths recommendation API."""
    response = client.get("/api/careers/recommendations")
    assert response.status_code == 200
    paths = response.json()
    assert len(paths) >= 3
    assert any("Machine Learning" in p["title"] or "Data Scientist" in p["title"] for p in paths)

def test_career_simulation():
    """Verify Career Path Simulator what-if calculation."""
    payload = {
        "current_skills": ["Python", "SQL", "Pandas"],
        "acquired_skills": ["PyTorch", "Docker"],
        "target_role": "Machine Learning Engineer"
    }
    response = client.post("/api/careers/simulate", json=payload)
    assert response.status_code == 200
    sim = response.json()
    assert sim["simulated_score"] >= sim["baseline_score"]
    assert sim["delta"] >= 0
    assert "Docker" in sim["newly_unlocked_capabilities"]

def test_jobs_api():
    """Verify Job discovery, filtering, and role alignment."""
    # List jobs
    response = client.get("/api/jobs")
    assert response.status_code == 200
    jobs = response.json()
    assert len(jobs) >= 4
    
    # Filter by country
    india_res = client.get("/api/jobs?country=India")
    assert india_res.status_code == 200
    for j in india_res.json():
        assert j["country"] == "India"
        
    # Match job with candidate
    first_job_id = jobs[0]["id"]
    match_res = client.post(f"/api/jobs/{first_job_id}/match")
    assert match_res.status_code == 200
    match_data = match_res.json()
    assert "match_score" in match_data
    assert "matched_skills" in match_data
    assert "why_aligned" in match_data

def test_learning_roadmap():
    """Verify 7-phase learning roadmap generation."""
    response = client.get("/api/learning/roadmap?role=Data+Scientist")
    assert response.status_code == 200
    data = response.json()
    assert "phases" in data
    assert len(data["phases"]) >= 4
    first_phase = data["phases"][0]
    assert "portfolio_project" in first_phase
    assert len(first_phase["skills"]) > 0

    # Toggle skill progress
    toggle_res = client.post("/api/learning/progress", json={"skill_name": "Docker", "completed": True})
    assert toggle_res.status_code == 200
    assert toggle_res.json()["success"] is True

def test_interview_studio():
    """Verify interview questions retrieval and STAR feedback evaluation."""
    # Questions
    q_res = client.get("/api/interviews/questions?role=Data+Scientist&mode=Technical")
    assert q_res.status_code == 200
    questions = q_res.json()
    assert len(questions) > 0
    
    # Evaluate answer
    eval_payload = {
        "question_id": questions[0]["id"],
        "question": questions[0]["question"],
        "answer": (
            "In my previous project at university, we noticed data leakage because feature scaling was done "
            "before train-test split. To fix this, I redesigned the pipeline using Scikit-Learn Pipelines and GroupKFold, "
            "which eliminated the test inflation and improved our model's real-world validation accuracy by 14%."
        ),
        "target_role": "Data Scientist"
    }
    eval_res = client.post("/api/interviews/evaluate", json=eval_payload)
    assert eval_res.status_code == 200
    feedback = eval_res.json()
    assert feedback["technical_correctness_score"] >= 75
    assert feedback["completeness_score"] >= 70
    assert len(feedback["strengths"]) > 0
    assert "STAR Framework Analysis" in feedback["star_framework_coaching"]

def test_application_tracker_crud():
    """Verify application tracker CRUD cycle."""
    # List
    initial_res = client.get("/api/applications")
    assert initial_res.status_code == 200
    initial_count = len(initial_res.json())
    
    # Create
    new_app = {
        "company": "Google",
        "role": "Associate AI Engineer",
        "location": "Bengaluru, India (Hybrid)",
        "job_url": "https://careers.google.com",
        "current_status": "Applied",
        "notes": "Applied with resume v2 highlighting transformer embeddings.",
        "salary_expectation": "₹28 - ₹35 LPA"
    }
    create_res = client.post("/api/applications", json=new_app)
    assert create_res.status_code == 200
    created = create_res.json()
    app_id = created["id"]
    assert created["company"] == "Google"
    
    # Update
    update_res = client.put(f"/api/applications/{app_id}", json={"status": "Interview", "notes": "Invited for Phone Screen"})
    assert update_res.status_code == 200
    updated = update_res.json()
    assert updated["current_status"] == "Interview"
    assert updated["notes"] == "Invited for Phone Screen"
    
    # Delete
    del_res = client.delete(f"/api/applications/{app_id}")
    assert del_res.status_code == 200
    assert del_res.json()["success"] is True

def test_user_profile():
    """Verify Profile retrieval and update with grounded evidence."""
    # Get profile
    profile_res = client.get("/api/profile/me")
    assert profile_res.status_code == 200
    prof = profile_res.json()
    assert "full_name" in prof
    assert "skills_with_evidence" in prof
    assert len(prof["skills_with_evidence"]) > 0
    
    # Update profile
    update_res = client.put("/api/profile/me", json={"target_role": "Lead Data Scientist", "experience_years": 2.5})
    assert update_res.status_code == 200
    updated_prof = update_res.json()
    assert updated_prof["target_role"] == "Lead Data Scientist"
    assert updated_prof["experience_years"] == 2.5
