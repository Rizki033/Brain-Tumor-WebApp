from typing import Annotated, Optional
from datetime import datetime

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

from enum import StrEnum

from sqlmodel import SQLModel, Field
from sqlalchemy import Column        
from sqlalchemy.types import Enum


# ---------------------- Doctor Model ---------------------
class Doctor(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    email: str | None = Field(default=None, index=True)
    hashed_password: str
    competency_doc: str
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"server_default": "CURRENT_TIMESTAMP"}
    )

    def create_patient():
        # logic of patient' account creation
        return
    
    def delete_patient():
        # logic of patient' account creation
        return
    
    def sign_report():
        # logic of patient' account creation
        return
    

# ---------------------- The Class Gender Enum ---------------------
class PatientGender(str, Enum):
    MALE = "male"
    FEMALE = "female"

# ---------------------- Patient Model ---------------------
class Patient(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    first_name: str = Field(index=True)
    last_name: str = Field(index=True) 
    gender: PatientGender
    age: int | None = Field(default=None, index=True)  
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"server_default": "CURRENT_TIMESTAMP"}
    )

# ---------------------- The Class Gender Enum ---------------------
class PredictionStatus(str, Enum):
    PENDING = "pending"
    REVIEWED = "reviewed"
    SIGNED = "signed"

# ---------------------- Patient Model ---------------------
class Prediction(SQLModel, table=True):
    id: int | None = Field(
        default=None, 
        primary_key=True
    )
    id_patient: int = Field(
        default=None, 
        primary_key=True, 
        foreign_key="patient.id"
    )
    id_doctor: int | None = Field(
        default=None, 
        primary_key=True, 
        foreign_key="doctor.id"
    )
    img_path_mri: str = Field(index=True)
    airesult: str = Field(index=True) 
    doctor_notes: str = Field(index=True) 
    status: PredictionStatus
    age: int | None = Field(default=None, index=True)  
    uploaded_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"server_default": "CURRENT_TIMESTAMP"}
    )    

# ---------------------- Patient Model ---------------------
class Raport(SQLModel, table=True):
    id: int | None = Field(
        default=None, 
        primary_key=True
    )
    id_prediction: int = Field(
        default=None, 
        primary_key=True, 
        foreign_key="prediction.id"
    )
    id_doctor: int | None = Field(
        default=None, 
        primary_key=True, 
        foreign_key="doctor.id"
    )
    pdf_path: str = Field(index=True)
    signed_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"server_default": "CURRENT_TIMESTAMP"}
    )    
