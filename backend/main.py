from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat import router as chat_router

app = FastAPI(
    title="NeuroScan Brain Tumor Chatbot API",
    description="Medical chatbot powered by Groq AI for brain tumor information",
    version="1.0.0"
)

# CORS Configuration - Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "*"  # Remove this in production, specify exact origins
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include chat router
app.include_router(chat_router, prefix="/api", tags=["chat"])

@app.get("/")
def root():
    """Root endpoint - API info"""
    return {
        "message": "NeuroScan AI API is running",
        "version": "1.0.0",
        "ai_provider": "Groq (Free)",
        "endpoints": {
            "chat": "POST /api/chat",
            "health": "GET /health",
            "docs": "GET /docs"
        }
    }

@app.get("/health")
def health():
    """Health check endpoint"""
    from app.core.config import GROQ_API_KEY
    return {
        "status": "healthy",
        "ai_provider": "Groq",
        "api_key_configured": bool(GROQ_API_KEY)
    }

@app.on_event("startup")
async def startup_event():
    """Run on server startup"""
    print(" NeuroScan AI Backend Starting...")
    print(" AI Provider: Groq (Free)")
    from app.core.config import GROQ_API_KEY
    if GROQ_API_KEY:
        print(f" Groq API Key: {GROQ_API_KEY[:20]}...")
    else:
        print("  WARNING: GROQ_API_KEY not configured!")
