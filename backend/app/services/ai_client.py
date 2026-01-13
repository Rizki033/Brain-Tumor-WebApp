from groq import Groq
from app.core.config import GROQ_API_KEY

try:
    if GROQ_API_KEY:
        client = Groq(api_key=GROQ_API_KEY)
    else:
        client = None
except Exception as e:
    print(f"Failed to initialize Groq client: {e}")
    client = None

class AIClient:
    def ask(self, messages: list) -> str:
        """
        Send a list of messages to Groq AI
        
        Args:
            messages: List of dicts with 'role' and 'content'
        """
        if not GROQ_API_KEY or not client:
            return " AI service is not configured (missing API key)."

        try:
            print(f" Sending {len(messages)} messages to Groq...")
            
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages,
                temperature=0.7,
                max_tokens=500
            )
            
            answer = response.choices[0].message.content
            print(f"Received from Groq: {answer[:100]}...")
            return answer

        except Exception as e:
            print(f" GROQ ERROR: {repr(e)}")
            return f"I'm sorry, I encountered an error: {str(e)}"