from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.services.diagnosis_service import get_diagnosis
from app.core.auth import create_access_token, verify_password, CurrentDoctor
from app.db.models import Doctor, SessionDep
import shutil
import os

router = APIRouter()

@router.post("/login")
async def login(
    session: SessionDep,
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    """
    Doctor login endpoint. Returns JWT access token.
    """
    # Find doctor by email
    doctor = session.query(Doctor).filter(Doctor.email == form_data.username).first()

    if not doctor:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Verify password
    if not verify_password(form_data.password, doctor.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token = create_access_token(data={"sub": doctor.email})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "doctor": {
            "id": doctor.id,
            "name": doctor.name,
            "email": doctor.email,
            "competency": doctor.competency_doc
        }
    }

@router.get("/doctor/dashboard")
async def doctor_dashboard(current_doctor: Doctor = CurrentDoctor):
    """
    Protected endpoint for authenticated doctors.
    Returns doctor's dashboard information.
    """
    return {
        "message": f"Welcome Dr. {current_doctor.name}",
        "doctor_id": current_doctor.id,
        "competency": current_doctor.competency_doc,
        "dashboard_data": {
            "total_patients": 0,  # You can implement this later
            "pending_reviews": 0,
            "recent_predictions": []
        }
    }

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
