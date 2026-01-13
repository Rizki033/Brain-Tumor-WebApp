from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.services.diagnosis_service import get_diagnosis
from app.core.auth import create_access_token, verify_password, CurrentPatient, get_current_patient
from app.db.models import Patient, SessionDep
import shutil
import os

router = APIRouter()

# login endpoint removed in favor of auth.py

@router.get("/patient/dashboard")
async def patient_dashboard(current_patient: Patient = CurrentPatient):
    """
    Protected endpoint for authenticated patients.
    Returns patient's dashboard information.
    """
    return {
        "message": f"Welcome {current_patient.first_name} {current_patient.last_name}",
        "patient_id": current_patient.id,
        "age": current_patient.age,
        "dashboard_data": {
            "total_scans": 0,
            "recent_predictions": []
        }
    }

@router.post("/predict")
async def predict(
    file: UploadFile = File(...),
    current_patient: Patient = Depends(get_current_patient)
):
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
