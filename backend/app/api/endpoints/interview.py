from fastapi import APIRouter
from ...schemas.interview import (
    InterviewGenerateRequest,
    InterviewGenerateResponse,
    EvaluateAnswerRequest,
    EvaluateAnswerResponse
)
from ...services.interview_service import InterviewService

router = APIRouter(prefix="/interview", tags=["Interview Prep"])

@router.post("/generate", response_model=InterviewGenerateResponse)
async def generate_interview(request: InterviewGenerateRequest):
    questions = await InterviewService.generate_questions(
        role_title=request.role_title,
        experience_level=request.experience_level
    )
    return {
        "role_title": request.role_title,
        "questions": questions
    }

@router.post("/evaluate", response_model=EvaluateAnswerResponse)
async def evaluate_answer(request: EvaluateAnswerRequest):
    feedback = await InterviewService.evaluate_response(
        question=request.question,
        sample_answer=request.sample_answer,
        user_answer=request.user_answer,
        role_title=request.role_title or "Candidate"
    )
    return feedback

