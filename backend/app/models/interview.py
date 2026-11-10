from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from datetime import datetime
from ..database import Base

class InterviewSession(Base):
    __tablename__ = "interview_sessions"

    id = Column(Integer, primary_key=True, index=True)
    target_role = Column(String(150), default="Full Stack AI Engineer")
    experience_level = Column(String(50), default="Mid-Senior")
    overall_score = Column(Float, default=0.0)
    feedback_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("interview_sessions.id"), nullable=True)
    question_type = Column(String(50), default="technical") # technical, hr, behavioral
    question_text = Column(Text, nullable=False)
    sample_answer = Column(Text, nullable=True)
    user_response = Column(Text, nullable=True)
    score = Column(Float, default=0.0)
    feedback = Column(Text, nullable=True)
    strengths = Column(Text, nullable=True)
    improvements = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

