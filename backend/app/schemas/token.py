from pydantic import BaseModel

from app.schemas.doctor import DoctorRead

class Token(BaseModel):
    access_token: str
    token_type: str
    doctor: DoctorRead

class TokenData(BaseModel):
    email: str | None = None
