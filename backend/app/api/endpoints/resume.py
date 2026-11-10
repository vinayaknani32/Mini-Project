from pathlib import Path
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ...database import get_db
from ...models.resume import Resume
from ...schemas.resume import ResumeAnalysisResponse
from ...services.document_parser import DocumentParser
from ...services.resume_analyzer import ResumeAnalyzer
from ...config import settings

router = APIRouter(prefix="/resume", tags=["Resume Analyzer"])

@router.post("/upload", response_model=ResumeAnalysisResponse)
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload and analyze a PDF or DOCX resume."""
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in settings.ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only .pdf, .docx, and .txt files are supported")

    save_path = settings.UPLOAD_DIR / file.filename
    content = await file.read()
    with open(save_path, "wb") as f:
        f.write(content)

    # Parse and analyze
    parsed = DocumentParser.parse_document(save_path)
    analysis = ResumeAnalyzer.analyze(parsed["raw_text"], file.filename)

    # Save to database
    resume_record = Resume(
        filename=file.filename,
        file_path=str(save_path),
        file_type=file_ext.replace(".", ""),
        file_size_kb=len(content) / 1024,
        extracted_text=parsed["raw_text"],
        overall_score=analysis["overall_score"],
        formatting_score=analysis["formatting_score"],
        content_score=analysis["content_score"],
        impact_score=analysis["impact_score"]
    )
    db.add(resume_record)
    db.commit()
    db.refresh(resume_record)

    analysis["id"] = resume_record.id
    return analysis

@router.get("/list")
async def list_resumes(db: Session = Depends(get_db)):
    """List uploaded resumes."""
    resumes = db.query(Resume).order_by(Resume.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "filename": r.filename,
            "file_type": r.file_type,
            "overall_score": r.overall_score,
            "created_at": r.created_at.isoformat()
        }
        for r in resumes
    ]

