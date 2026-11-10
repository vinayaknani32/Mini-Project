from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str # user or assistant
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    context_role: Optional[str] = "Job seeker & Career enthusiast"

class ChatResponse(BaseModel):
    reply: str
    suggested_prompts: List[str] = []

