from fastapi import APIRouter
from .endpoints import match, resume, career, interview, tasks, chat, settings

api_router = APIRouter()

api_router.include_router(match.router)
api_router.include_router(resume.router)
api_router.include_router(career.router)
api_router.include_router(interview.router)
api_router.include_router(tasks.router)
api_router.include_router(chat.router)
api_router.include_router(settings.router)

