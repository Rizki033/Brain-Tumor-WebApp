from typing import Annotated, Optional
from datetime import datetime

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select


# ---------------------- Model Doctor ---------------------
class Doctor(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    email: str | None = Field(default=None, index=True)
    hashed_password: str
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
        sa_column_kwargs={"server_default": "CURRENT_TIMESTAMP"}  # SQLite loves this!
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
    