from pydantic import BaseModel
from typing import List, Optional

class InterviewGenerateRequest(BaseModel):
    role_title: str = "Business Marketing"
    experience_level: str = "Mid-Level"
    question_count: int = 5
    include_technical: bool = True
    include_hr: bool = True

class QuestionItem(BaseModel):
    id: int
    type: str # Technical, HR, Behavioral
    question: str
    sample_answer: str
    tips: str

class InterviewGenerateResponse(BaseModel):
    role_title: str
    questions: List[QuestionItem]

class EvaluateAnswerRequest(BaseModel):
    question: str
    sample_answer: Optional[str] = None
    user_answer: str
    role_title: Optional[str] = "Software Developer"

class EvaluateAnswerResponse(BaseModel):
    score: float # 0 - 100
    strengths: List[str]
    improvements: List[str]
    communication_feedback: str
    suggested_model_answer: str

