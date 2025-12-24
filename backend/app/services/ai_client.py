from groq import Groq
from app.core.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

class AIClient:
    def ask(self, prompt: str) -> str:
        if not GROQ_API_KEY:
            return " AI service is not configured (missing API key)."

        try:
            print(f" Sending to Groq: {prompt[:100]}...")
            
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {
                        "role": "system", 
                        "content": "You are a helpful medical AI assistant specializing in brain tumors and neurological conditions. Provide clear, empathetic responses and always remind users to consult healthcare professionals."
                    },
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            answer = response.choices[0].message.content
            print(f"Received from Groq: {answer[:100]}...")
            return answer

        except Exception as e:
            print(f" GROQ ERROR: {repr(e)}")
            return f"I'm sorry, I encountered an error: {str(e)}"