# app/utils.py

from monai.transforms import Compose, LoadImage, EnsureChannelFirst, ScaleIntensity, ToTensor
import torch
import nibabel as nib
import numpy as np
import os

def preprocess_nifti(path):
    """Preprocess NIfTI files for the model"""
    transforms = Compose([
        LoadImage(image_only=True),
        EnsureChannelFirst(),
        ScaleIntensity(),
        ToTensor()
    ])
    image = transforms(path)
    image = image.unsqueeze(0)  # batch
    return image

def postprocess_nifti(output, reference_path):
    """Postprocess model output for NIfTI files"""
    pred = torch.argmax(output, dim=1).squeeze().numpy()
    affine = nib.load(reference_path).affine
    mask = nib.Nifti1Image(pred.astype(np.uint8), affine)
    output_path = f"output_mask_{os.path.basename(reference_path)}"
    nib.save(mask, output_path)
    return output_path
