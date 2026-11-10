from fastapi import APIRouter
from ...schemas.career import CareerProfileInput, CareerGuidanceResponse
from ...services.career_service import CareerService

router = APIRouter(prefix="/career", tags=["Career Guidance"])

@router.post("/guidance", response_model=CareerGuidanceResponse)
async def generate_career_guidance(profile: CareerProfileInput):
    """Provides personalized career path, learning roadmap, and courses."""
    guidance = await CareerService.get_career_guidance(
        education=profile.education,
        skills=profile.skills,
        interests=profile.interests,
        years_exp=profile.years_experience
    )
    return guidance

