import cv2
import numpy as np
import torch

__all__ = ['preprocess']


def preprocess(img):
    """Preprocess an OpenCV image for the model.

    - Resizes to 128x128
    - Normalizes to [0,1]
    - Converts to CHW and adds batch dimension
    - Returns a torch.float32 tensor
    """
    # Accept grayscale or BGR color images
    if img.ndim == 2:
        # HxW (grayscale) -> convert to 3-channel
        img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)

    # Ensure color images are HxWxC
    img = cv2.resize(img, (128, 128))
    img = img / 255.0
    img = np.transpose(img, (2, 0, 1))  # HWC -> CHW
    img = img[np.newaxis, :, :, :]
    return torch.tensor(img, dtype=torch.float32)
