from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from datetime import datetime
from ..database import Base

class JobMatchHistory(Base):
    __tablename__ = "job_matches"

    id = Column(Integer, primary_key=True, index=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=True)
    job_title = Column(String(200), default="Target Job Role")
    company_name = Column(String(200), nullable=True)
    job_description = Column(Text, nullable=False)
    
    # Core Match Scores
    overall_match_score = Column(Float, default=85.0)
    ats_compatibility_score = Column(Float, default=88.0)
    skills_match_score = Column(Float, default=82.0)
    experience_match_score = Column(Float, default=80.0)
    education_match_score = Column(Float, default=90.0)
    
    # Candidate Summary Stats
    experience_years_detected = Column(Float, default=5.0)
    education_status = Column(String(100), default="Verified (MSc)")
    top_matching_skills = Column(String(300), default="Python, Agile, Leadership")
    
    # Detailed JSON analyses
    match_details_json = Column(Text, nullable=True)
    skill_gap_heatmap_json = Column(Text, nullable=True)
    bullet_rewrites_json = Column(Text, nullable=True)
    ats_checks_json = Column(Text, nullable=True)
    timeline_events_json = Column(Text, nullable=True)
    sentiment_tone_json = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)

