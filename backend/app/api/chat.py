from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import generate_answer

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    """
    Chat endpoint - receives questions and returns AI responses
    
    Args:
        req: ChatRequest containing question, prediction, and confidence
        
    Returns:
        ChatResponse with AI-generated answer
    """
    try:
        print(f" Received chat request")
        print(f"   Question: {req.question}")
        print(f"   Prediction: {req.prediction}")
        print(f"   Confidence: {req.confidence}")
        
        # Validate input
        if not req.question or not req.question.strip():
            raise HTTPException(status_code=400, detail="Question cannot be empty")
        
        # Generate answer using Groq AI
        answer = generate_answer(
            question=req.question,
            prediction=req.prediction,
            confidence=req.confidence,
            history=req.history
        )
        
        print(f" Generated answer: {answer[:100]}...")
        return ChatResponse(answer=answer)
        
    except HTTPException:
        raise
    except Exception as e:
        print(f" Chat endpoint error: {repr(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to generate response: {str(e)}"
        )

