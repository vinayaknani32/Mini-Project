from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime
from ..database import Base

class DailyTask(Base):
    __tablename__ = "daily_tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(50), default="Career") # Career, Learning, Coding, Productivity
    priority = Column(String(20), default="medium") # high, medium, low
    estimated_minutes = Column(Integer, default=30)
    deadline = Column(String(50), nullable=True)
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

