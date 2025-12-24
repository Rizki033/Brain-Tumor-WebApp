from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat import router as chat_router

app = FastAPI(title="NeuroScan Brain Tumor Chatbot API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include chat router
app.include_router(chat_router, prefix="/api")

@app.get("/")
def root():
    return {
        "message": "NeuroScan AI API is running",
        "endpoints": {
            "chat": "/api/chat",
            "health": "/health",
            "docs": "/docs"
        }
    }

@app.get("/health")
def health():
    from app.core.config import OPENAI_API_KEY
    return {
        "status": "healthy",
        "api_key_configured": bool(OPENAI_API_KEY)
    }
