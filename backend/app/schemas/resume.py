from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ResumeAnalysisResponse(BaseModel):
    id: Optional[int] = None
    filename: str
    overall_score: float
    formatting_score: float
    content_score: float
    impact_score: float
    candidate_name: Optional[str] = None
    contact_info: Dict[str, Any] = {}
    extracted_sections: List[str] = []
    missing_sections: List[str] = []
    identified_skills: List[str] = []
    strengths: List[str] = []
    weaknesses: List[str] = []
    improvement_suggestions: List[str] = []
    grammar_spelling_issues: List[Dict[str, str]] = []
    word_count: int = 0

