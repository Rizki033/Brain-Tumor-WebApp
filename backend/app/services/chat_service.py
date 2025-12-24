from app.services.ai_client import AIClient

ai_client = AIClient()

def generate_answer(question: str, prediction: str, confidence: float) -> str:
    """
    Generate an answer using Groq AI based on the question and diagnosis info
    
    Args:
        question: User's question
        prediction: Brain tumor prediction (e.g., "Glioma", "Meningioma")
        confidence: Confidence score (0.0 to 1.0)
        
    Returns:
        AI-generated response
    """
    
    # Build context-aware prompt
    prompt = f"""You are assisting with a brain tumor detection system called NeuroScan AI.

Current Diagnosis Context:
- Predicted Tumor Type: {prediction}
- Confidence Level: {confidence:.1%}

User's Question:
{question}

Instructions:
- If the user asks about their diagnosis, explain what "{prediction}" means in simple terms
- Mention the confidence level if relevant
- Provide helpful, accurate medical information
- Be empathetic and supportive
- ALWAYS emphasize this is AI-assisted detection and requires confirmation by medical professionals
- Encourage consultation with neurologists or oncologists
- Keep response clear and concise (2-3 paragraphs)

Respond helpfully:"""

    return ai_client.ask(prompt)