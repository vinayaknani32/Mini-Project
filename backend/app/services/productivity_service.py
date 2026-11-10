from typing import List, Dict, Any
from sqlalchemy.orm import Session
from ..models.task import DailyTask

class ProductivityService:
    @classmethod
    def get_stats(cls, db: Session) -> Dict[str, Any]:
        tasks = db.query(DailyTask).all()
        total = len(tasks)
        completed = sum(1 for t in tasks if t.is_completed)
        pending = total - completed
        
        completion_rate = round((completed / total) * 100, 1) if total > 0 else 0.0
        high_priority_pending = sum(1 for t in tasks if not t.is_completed and t.priority.lower() == "high")

        # Focus score calculation based on completion rate
        focus_score = int(min(max(completion_rate * 0.8 + 20, 20), 100)) if total > 0 else 85

        schedule = [
            {"time": "09:00 AM - 10:30 AM", "activity": "Deep Work: Core High-Priority Project Milestone", "energy": "High"},
            {"time": "10:45 AM - 11:30 AM", "activity": "Technical Skill Upgrading & Reading", "energy": "Medium"},
            {"time": "11:30 AM - 12:30 PM", "activity": "Resume Tailoring & Job Applications", "energy": "High"},
            {"time": "02:00 PM - 03:00 PM", "activity": "Mock Interview Practice & Feedback Review", "energy": "Medium"},
            {"time": "04:30 PM - 05:00 PM", "activity": "Daily Review & Planning Tomorrow's Top 3 Tasks", "energy": "Low"}
        ]

        tips = [
            "Protect your morning 90-minute block for high-leverage work without interruptions.",
            "Group similar administrative tasks (emails, status checks) into a single 30-minute afternoon sprint.",
            "Apply the 2-minute rule: if a task takes under two minutes, execute it immediately.",
            "End each workday by staging tomorrow's desk and defining your top 3 non-negotiables."
        ]

        return {
            "total_tasks": total,
            "completed_tasks": completed,
            "pending_tasks": pending,
            "completion_rate": completion_rate,
            "high_priority_pending": high_priority_pending,
            "today_focus_score": focus_score,
            "ai_productivity_tips": tips,
            "suggested_daily_schedule": schedule
        }

    @classmethod
    def seed_initial_tasks(cls, db: Session):
        """Seed starter tasks if database is empty."""
        if db.query(DailyTask).count() == 0:
            sample_tasks = [
                DailyTask(
                    title="Tailor Resume for Senior AI Engineer JD",
                    description="Run Matcher tool, apply suggested bullet rewrites, and export PDF",
                    category="Career",
                    priority="high",
                    estimated_minutes=45,
                    deadline="Today, 5:00 PM",
                    is_completed=True
                ),
                DailyTask(
                    title="Complete Mock Interview Session for Technical Architecture",
                    description="Record answers for system design and API performance questions",
                    category="Career",
                    priority="high",
                    estimated_minutes=30,
                    deadline="Today, 3:00 PM",
                    is_completed=False
                ),
                DailyTask(
                    title="Study Advanced FastAPI Async & SQL Indexing",
                    description="Review connection pooling and non-blocking background workers",
                    category="Learning",
                    priority="medium",
                    estimated_minutes=60,
                    deadline="Tomorrow",
                    is_completed=False
                ),
                DailyTask(
                    title="Update LinkedIn Headline with Key Technical Keywords",
                    description="Incorporate verified skills: FastAPI, Python, React, Scikit-learn",
                    category="Productivity",
                    priority="low",
                    estimated_minutes=15,
                    deadline="This Friday",
                    is_completed=True
                )
            ]
            db.add_all(sample_tasks)
            db.commit()

