# app/main.py

<<<<<<< HEAD
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
=======
from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, HTTPException
>>>>>>> 048af25f (refactor auth, api, frontend)
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from tempfile import NamedTemporaryFile
import os
import uuid
from PIL import Image
import io

from app.model import segment_brain_tumor, load_model
from app.utils import preprocess_nifti, postprocess_nifti
<<<<<<< HEAD
from app.core.auth import get_current_patient
from app.db.models import Patient

import torch

from app.db.models import create_db_and_tables
from app.db.models import create_db_and_tables
from app.api import auth, diagnosis

app = FastAPI(
    title="Brain Tumor Detection API",
    description="API for detecting brain tumors from MRI images using a U-Net model.",
    version="1.0.0"
=======
from app.db.models import create_db_and_tables
from app.api.auth import router as auth_router
from app.api.diagnosis import router as diagnosis_router

import torch

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    # Load model
    global model
    model = load_model()
    yield

app = FastAPI(
    title="Brain Tumor Segmentation API",
    description="API for segmenting brain tumors from MRI images. Supports both regular images (PNG, JPG) and NIfTI files.",
    version="1.0.0",
    lifespan=lifespan
>>>>>>> 048af25f (refactor auth, api, frontend)
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
# Create tables on startup
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Include routers
app.include_router(auth.router)
app.include_router(diagnosis.router)

# Load the model at startup
model = load_model()
=======
app.include_router(auth_router)
app.include_router(diagnosis_router)

# Load the model at startup (removed global call, moved to lifespan)
# model = load_model()
>>>>>>> 048af25f (refactor auth, api, frontend)

@app.get("/", tags=["Health Check"])
def read_root():
    """
    Health check endpoint to verify that the API is running.
    """
    return {"message": "Brain Tumor Segmentation API is running!"}

@app.post("/segment/", tags=["Segmentation"], response_class=FileResponse)
async def segment_image(
    current_patient: Patient = Depends(get_current_patient),
    file: UploadFile = File(...)
):
    """
    Segment brain tumors from an MRI image.
    
    - **file**: The MRI image file to segment. Supports PNG, JPG, and NIfTI formats.
    
    Returns:
    - A binary mask image where white pixels represent the tumor.
    """
    # Get file extension
    file_extension = os.path.splitext(file.filename)[1].lower()
    
    # Create a unique filename
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    
    # Save the uploaded file
    with NamedTemporaryFile(delete=False, suffix=file_extension) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name
    
    try:
        # Check if the file is a NIfTI file
        if file_extension in ['.nii', '.gz', '.nii.gz']:
            # Process NIfTI file
            image = preprocess_nifti(tmp_path)
            with torch.no_grad():
                output = model(image)
            mask_path = postprocess_nifti(output, tmp_path)
            return FileResponse(mask_path, filename="tumor_mask.nii.gz")
        else:
            # Process regular image (PNG, JPG, etc.)
            result_image = segment_brain_tumor(tmp_path, model=model)
            
            # Save the result to a temporary file
            result_path = f"temp_{unique_filename}"
            result_image.save(result_path)
            
            return FileResponse(result_path, filename="tumor_mask.png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")
    finally:
        # Clean up temporary files
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)

# Customize OpenAPI schema
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title="Brain Tumor Segmentation API",
        version="1.0.0",
        description="API for segmenting brain tumors from MRI images. Supports both regular images (PNG, JPG) and NIfTI files.",
        routes=app.routes,
    )
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
