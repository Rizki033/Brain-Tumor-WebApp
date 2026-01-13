from typing import Annotated, Optional
from datetime import datetime
from enum import Enum

from fastapi import Depends, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select

from sqlalchemy import Column

sqlite_file_name = "brain_tumor.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False} # Allows to use the same connection in different threads
engine = create_engine(sqlite_url, connect_args=connect_args)

# Create the database tables

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Dependency to get DB session
def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

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

    def create_patient(self):
        # logic of patient account creation
        pass

    def delete_patient(self):
        # logic of patient account deletion
        pass

    def sign_report(self):
        # logic of report signing
        pass
    

# ---------------------- Patient Gender Enum ---------------------
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

# ---------------------- The Class Prediction Enum ---------------------
class PredictionStatus(str, Enum):
    PENDING = "pending"
    REVIEWED = "reviewed"
    SIGNED = "signed"

# ---------------------- Prediction Model ---------------------
class Prediction(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    id_patient: int = Field(default=None, foreign_key="patient.id" )#primary_key=True)-> it's not a primary key
    id_doctor: int | None = Field(default=None,foreign_key="doctor.id")# primary_key=True, It's not a primary key
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

# ---------------------- Report Model ---------------------
class Report(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    id_prediction: int = Field(default=None, foreign_key="prediction.id")
    id_doctor: int | None = Field(default=None, foreign_key="doctor.id")
    pdf_path: str = Field(index=True)
    signed_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"server_default": "CURRENT_TIMESTAMP"}
    )    
