from app.services.ai_client import AIClient

ai_client = AIClient()

def generate_answer(question: str, prediction: str, confidence: float, history: list = None) -> str:
    """
    Generate an answer using Groq AI based on the question, diagnosis info, and history
    
    Args:
        question: User's question
        prediction: Brain tumor prediction
        confidence: Confidence score
        history: List of previous messages [{role: 'user'|'bot', text: '...'}]
        
    Returns:
        AI-generated response
    """
    
    # System prompt
    system_content = f"""You are NeuroScan AI, a helpful medical AI assistant.
Current Patient Context:
- Diagnosis: {prediction}
- Confidence: {confidence:.1%}

Instructions:
- Be empathetic, professional, and concise.
- Explain medical terms simply.
- ALWAYS remind the user that this is an AI-assisted tool and they MUST consult a doctor for official diagnosis.
- Avoid repetitive phrases like "I'm here to help you understand...".
- If the user asks about their specific result, use the context provided.
"""

    messages = [{"role": "system", "content": system_content}]
    
    # Add history (mapping 'bot' to 'assistant' for Groq/OpenAI format)
    if history:
        for msg in history:
            role = "assistant" if msg.get("role") == "bot" else "user"
            messages.append({"role": role, "content": msg.get("text", "")})
    
    # Add current question
    messages.append({"role": "user", "content": question})

    return ai_client.ask(messages)