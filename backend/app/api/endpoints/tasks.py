from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ...database import get_db
from ...models.task import DailyTask
from ...schemas.task import TaskCreate, TaskUpdate, TaskResponse, ProductivityStats
from ...services.productivity_service import ProductivityService

router = APIRouter(prefix="/tasks", tags=["Productivity Tasks"])

@router.get("/", response_model=List[TaskResponse])
def get_all_tasks(db: Session = Depends(get_db)):
    ProductivityService.seed_initial_tasks(db)
    return db.query(DailyTask).order_by(DailyTask.is_completed.asc(), DailyTask.id.desc()).all()

@router.post("/", response_model=TaskResponse)
def create_task(task_in: TaskCreate, db: Session = Depends(get_db)):
    task = DailyTask(
        title=task_in.title,
        description=task_in.description,
        category=task_in.category,
        priority=task_in.priority,
        estimated_minutes=task_in.estimated_minutes,
        deadline=task_in.deadline
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.patch("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(DailyTask).filter(DailyTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field == "is_completed" and value is True:
            task.completed_at = datetime.utcnow()
        setattr(task, field, value)

    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(DailyTask).filter(DailyTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully", "id": task_id}

@router.get("/stats", response_model=ProductivityStats)
def get_productivity_stats(db: Session = Depends(get_db)):
    ProductivityService.seed_initial_tasks(db)
    return ProductivityService.get_stats(db)

