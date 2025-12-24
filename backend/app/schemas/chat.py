from pydantic import BaseModel

class ChatRequest(BaseModel):
    """Request model for chat endpoint"""
    question: str
    prediction: str = "Unknown"
    confidence: float = 0.0

class ChatResponse(BaseModel):
    """Response model for chat endpoint"""
    answer: str