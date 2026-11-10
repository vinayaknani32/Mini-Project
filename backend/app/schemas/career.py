from pydantic import BaseModel, Field
from typing import List, Optional

class CareerProfileInput(BaseModel):
    full_name: Optional[str] = "Alex Mercer"
    education: str = "B.Tech / B.S. in Computer Science"
    skills: List[str] = ["Python", "JavaScript", "SQL", "Machine Learning"]
    interests: List[str] = ["Artificial Intelligence", "Cloud Architecture", "Data Science"]
    years_experience: float = 2.0
    target_industry: Optional[str] = "Tech & AI"

class LearningStep(BaseModel):
    week_or_phase: str
    topic: str
    description: str
    resources: List[str]

class RecommendedRole(BaseModel):
    role_title: str
    match_percentage: float
    salary_range: str
    description: str
    required_skills: List[str]
    missing_skills: List[str]
    demand_level: str # High, Very High, Steady

class CareerGuidanceResponse(BaseModel):
    summary: str
    recommended_roles: List[RecommendedRole]
    missing_skills: List[str]
    roadmap: List[LearningStep]
    recommended_courses: List[dict]
    industry_insights: str

