from pydantic import BaseModel, EmailStr
from typing import Optional
from app.db.models import PatientGender

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    gender: PatientGender
    age: Optional[int] = None

class PatientCreate(PatientBase):
    password: str

class PatientRead(PatientBase):
    id: int
    is_verified: bool

    class Config:
        from_attributes = True

class PatientUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    gender: Optional[PatientGender] = None
    age: Optional[int] = None
    password: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str
    patient: PatientRead

class TokenData(BaseModel):
    email: Optional[str] = None

class Login(BaseModel):
    username: str 
    password: str
