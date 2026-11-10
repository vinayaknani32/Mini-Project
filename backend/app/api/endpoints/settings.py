from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional

from ...database import get_db
from ...models.user import UserProfile
from ...services.gemini_service import gemini_service

router = APIRouter(prefix="/settings", tags=["Settings"])

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    current_title: Optional[str] = None
    target_role: Optional[str] = None
    education_level: Optional[str] = None
    years_experience: Optional[int] = None
    skills: Optional[str] = None
    gemini_api_key: Optional[str] = None

@router.get("/")
def get_user_settings(db: Session = Depends(get_db)):
    profile = db.query(UserProfile).first()
    if not profile:
        profile = UserProfile()
        db.add(profile)
        db.commit()
        db.refresh(profile)
    
    # Mask API key for security
    masked_key = ""
    if profile.gemini_api_key:
        masked_key = profile.gemini_api_key[:6] + "..." + profile.gemini_api_key[-4:]

    return {
        "id": profile.id,
        "full_name": profile.full_name,
        "email": profile.email,
        "current_title": profile.current_title,
        "target_role": profile.target_role,
        "education_level": profile.education_level,
        "years_experience": profile.years_experience,
        "skills": profile.skills,
        "gemini_api_key_masked": masked_key,
        "has_custom_key": bool(profile.gemini_api_key)
    }

@router.post("/")
def update_user_settings(data: ProfileUpdate, db: Session = Depends(get_db)):
    profile = db.query(UserProfile).first()
    if not profile:
        profile = UserProfile()
        db.add(profile)

    if data.full_name is not None: profile.full_name = data.full_name
    if data.email is not None: profile.email = data.email
    if data.current_title is not None: profile.current_title = data.current_title
    if data.target_role is not None: profile.target_role = data.target_role
    if data.education_level is not None: profile.education_level = data.education_level
    if data.years_experience is not None: profile.years_experience = data.years_experience
    if data.skills is not None: profile.skills = data.skills
    
    if data.gemini_api_key:
        profile.gemini_api_key = data.gemini_api_key
        gemini_service.update_key(data.gemini_api_key)

    db.commit()
    db.refresh(profile)

    return {"status": "success", "message": "Settings updated successfully"}

