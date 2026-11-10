from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    category: str = "Career"
    priority: str = "medium"
    estimated_minutes: int = 30
    deadline: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    priority: Optional[str] = None
    estimated_minutes: Optional[int] = None
    deadline: Optional[str] = None
    is_completed: Optional[bool] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    category: str
    priority: str
    estimated_minutes: int
    deadline: Optional[str] = None
    is_completed: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ProductivityStats(BaseModel):
    total_tasks: int
    completed_tasks: int
    pending_tasks: int
    completion_rate: float
    high_priority_pending: int
    today_focus_score: int
    ai_productivity_tips: List[str]
    suggested_daily_schedule: List[dict]

