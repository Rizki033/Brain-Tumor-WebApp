from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.diagnosis_service import get_diagnosis
import shutil
import os

router = APIRouter()

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Endpoint to predict brain tumor from uploaded MRI image.
    Matches frontend call: POST /predict
    """
    try:
        if not file:
            raise HTTPException(status_code=400, detail="No file uploaded")
        
        # Read file content
        contents = await file.read()
        
        # Get diagnosis
        result = get_diagnosis(contents)
        
        return {
            "diagnosis": result["diagnosis"],
            "confidence": result["confidence"],
            "type": result["type"],
            "severity": result["severity"],
            "tumorSize": result["tumorSize"],
            # "patientId" is generated in frontend, but we can echo one if needed or let frontend handle it
        }

    except Exception as e:
        print(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
