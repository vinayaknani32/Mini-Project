from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class MatchAnalyzeRequest(BaseModel):
    resume_id: Optional[int] = None
    resume_text: Optional[str] = None
    job_description: str
    target_job_title: Optional[str] = "Sr. Project Manager"
    company_name: Optional[str] = "Tech Innovations Inc."

class BulletRewriteItem(BaseModel):
    id: int
    weak_bullet: str
    suggested_rewrite: str
    impact_reason: str

class ATSCheckItem(BaseModel):
    label: str
    status: str # pass, warning, fail
    score: int
    details: str

class TimelineEvent(BaseModel):
    year: str
    role_or_stage: str
    start_day: int
    end_day: int
    tag: str # Normal, Promotion, Annotated Gap
    color: str # emerald, amber, blue

class HeatmapRow(BaseModel):
    category: str # "Match", "Partial Match", "Keywords", "Missing"
    tech_core: int
    agile_process: int
    leadership: int
    data_tools: int
    cloud_ops: int
    soft_skills: int

class ResumeJdMatchResponse(BaseModel):
    id: Optional[int] = None
    job_title: str
    company_name: Optional[str] = None
    
    # Core scores
    overall_match_score: float
    ats_compatibility_score: float
    skills_match_score: float
    experience_match_score: float
    education_match_score: float
    
    # Hero summary badges
    detected_experience_years: str
    top_skills_summary: str
    education_verified_status: str
    
    # Skills breakdown
    matching_skills: List[str]
    missing_technical_skills: List[str]
    missing_soft_skills: List[str]
    important_missing_keywords: List[str]
    
    # Qualitative insights
    strengths: List[str]
    weaknesses: List[str]
    improvement_suggestions: List[str]
    recommended_projects_to_highlight: List[str]
    suggested_professional_summary: str
    
    # Dashboard specific visual datasets (from UI screenshot)
    timeline_events: List[TimelineEvent]
    sentiment_tone: Dict[str, float] # e.g. {"Leadership": 85, "Technical": 78, "Collaborative": 92}
    heatmap_matrix: List[HeatmapRow]
    ats_checks: List[ATSCheckItem]
    bullet_rewrites: List[BulletRewriteItem]
    
    disclaimer: str = "This match score is an estimated compatibility measure based on keyword and semantic analysis, not a guaranteed ATS result or hiring decision."

