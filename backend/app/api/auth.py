from datetime import timedelta
from typing import Annotated
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select

from app.core.auth import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    create_access_token,
    get_password_hash,
    verify_password,
    get_current_patient,
)
from app.db.models import Patient, SessionDep
from app.schemas.auth import PatientCreate, PatientRead, PatientUpdate, Token, Login
from app.services.email import send_verification_email

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=PatientRead)
def register(patient: PatientCreate, session: SessionDep):
    # Check if patient exists
    statement = select(Patient).where(Patient.email == patient.email)
    existing_patient = session.exec(statement).first()
    if existing_patient:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    # Create new patient
    verification_token = str(uuid.uuid4())
    hashed_password = get_password_hash(patient.password)
    
    new_patient = Patient(
        first_name=patient.first_name,
        last_name=patient.last_name,
        email=patient.email,
        hashed_password=hashed_password,
        gender=patient.gender,
        age=patient.age,
        verification_token=verification_token,
        is_verified=False
    )
    
    session.add(new_patient)
    session.commit()
    session.refresh(new_patient)
    
    # Send verification email
    send_verification_email(new_patient.email, verification_token)
    
    return new_patient

@router.post("/login", response_model=Token)
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep):
    # Retrieve user
    statement = select(Patient).where(Patient.email == form_data.username)
    patient = session.exec(statement).first()
    
    if not patient or not verify_password(form_data.password, patient.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    if not patient.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account not verified. Please check your email.",
        )
        
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": patient.email}, expires_delta=access_token_expires
    )
    
    return Token(access_token=access_token, token_type="bearer", patient=patient)

@router.get("/verify")
def verify_email(token: str, session: SessionDep):
    statement = select(Patient).where(Patient.verification_token == token)
    patient = session.exec(statement).first()
    
    if not patient:
        raise HTTPException(status_code=400, detail="Invalid verification token")
        
    if patient.is_verified:
        return {"message": "Email already verified"}
        
    patient.is_verified = True
    patient.verification_token = None
    session.add(patient)
    session.commit()
    
    return {"message": "Email successfully verified. You can now login."}

@router.get("/me", response_model=PatientRead)
def read_users_me(current_patient: Patient = Depends(get_current_patient)):
    return current_patient

@router.put("/me", response_model=PatientRead)
def update_user_me(
    profile_update: PatientUpdate,
    session: SessionDep,
    current_patient: Patient = Depends(get_current_patient)
):
    if profile_update.first_name:
        current_patient.first_name = profile_update.first_name
    if profile_update.last_name:
        current_patient.last_name = profile_update.last_name
    if profile_update.age:
        current_patient.age = profile_update.age
    if profile_update.gender:
        current_patient.gender = profile_update.gender
    if profile_update.password:
        current_patient.hashed_password = get_password_hash(profile_update.password)
        
    session.add(current_patient)
    session.commit()
    session.refresh(current_patient)
    return current_patient
