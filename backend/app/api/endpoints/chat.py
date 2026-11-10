from fastapi import APIRouter
from ...schemas.chat import ChatRequest, ChatResponse
from ...services.gemini_service import gemini_service

router = APIRouter(prefix="/chat", tags=["AI Career Chatbot"])

@router.post("/message", response_model=ChatResponse)
async def chat_message(request: ChatRequest):
    reply = await gemini_service.generate_chat_reply(
        message=request.message,
        history=request.history
    )
    
    suggested = [
        "How do I improve my resume's ATS score?",
        "What questions will I be asked for a Project Manager role?",
        "How do I structure bullet points using the STAR method?",
        "What are the best habits for daily engineering productivity?"
    ]
    return {
        "reply": reply,
        "suggested_prompts": suggested
    }

