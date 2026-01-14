from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select

from app.core.auth import create_access_token, verify_password, get_password_hash
from app.db.models import Doctor, SessionDep
from app.schemas.doctor import DoctorCreate, DoctorRead
from app.schemas.token import Token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/signup", response_model=DoctorRead)
async def signup(doctor: DoctorCreate, session: SessionDep):
    # Check if doctor already exists
    statement = select(Doctor).where(Doctor.email == doctor.email)
    existing_doctor = session.exec(statement).first()
    if existing_doctor:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    hashed_password = get_password_hash(doctor.password)
    new_doctor = Doctor(
        name=doctor.name,
        email=doctor.email,
        competency_doc=doctor.competency_doc,
        hashed_password=hashed_password
    )
    session.add(new_doctor)
    session.commit()
    session.refresh(new_doctor)
    return new_doctor

@router.post("/login", response_model=Token)
async def login(session: SessionDep, form_data: OAuth2PasswordRequestForm = Depends()):
    statement = select(Doctor).where(Doctor.email == form_data.username)
    doctor = session.exec(statement).first()
    
    if not doctor or not verify_password(form_data.password, doctor.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = create_access_token(data={"sub": doctor.email})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "doctor": doctor
    }
