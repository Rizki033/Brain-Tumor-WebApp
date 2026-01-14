from pydantic import BaseModel, EmailStr

class DoctorBase(BaseModel):
    name: str
    email: EmailStr
    competency_doc: str

class DoctorCreate(DoctorBase):
    password: str

class DoctorRead(DoctorBase):
    id: int

class DoctorLogin(BaseModel):
    email: EmailStr
    password: str
