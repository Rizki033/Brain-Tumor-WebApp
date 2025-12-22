from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import time
import random

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Simulating processing delay for "Anti-Gravity" feel
    time.sleep(2.0) 
    
    try:
        # Verify it's an image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        image.verify()
        
        # Mock Inference Logic
        # In a real scenario, this would be: transform -> model -> output
        # Here we simulate the AI's confidence and diagnosis
        
        is_tumor = random.choices([True, False], weights=[0.7, 0.3])[0]
        
        if is_tumor:
            label = random.choice(["Meningioma", "Glioma", "Pituitary"])
            severity = "High"
            conf = random.uniform(88.0, 99.9)
        else:
            label = "No Tumor"
            severity = "None"
            conf = random.uniform(92.0, 99.9)
            
        return {
            "diagnosis": label,
            "confidence": round(conf, 1),
            "severity": severity,
            "type": label
        }

    except Exception as e:
        return {"error": f"Invalid file: {str(e)}"}

@app.get("/")
def read_root():
    return {"status": "Brain Tumor AI Backend (Simulated) Running"}
