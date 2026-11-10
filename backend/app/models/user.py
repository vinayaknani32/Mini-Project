from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from ..database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), default="Alex Mercer")
    email = Column(String(120), nullable=True)
    current_title = Column(String(120), default="Software Developer")
    target_role = Column(String(120), default="Senior AI Engineer")
    education_level = Column(String(100), default="Master of Science in Computer Science")
    years_experience = Column(Integer, default=3)
    skills = Column(Text, default="Python, React, Machine Learning, FastApi, SQL, Git")
    career_goals = Column(Text, nullable=True)
    gemini_api_key = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

