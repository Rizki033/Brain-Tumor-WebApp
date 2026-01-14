from __future__ import annotations

from dataclasses import dataclass

import cv2
import numpy as np
import torch


@dataclass(frozen=True)
class PreprocessConfig:
    image_size: int = 128


def load_and_preprocess_image(path: str, cfg: PreprocessConfig = PreprocessConfig()) -> torch.Tensor:
    """Loads an image from disk and returns a tensor shaped (1, 3, H, W).

    Matches the notebook preprocessing:
    - cv2.imread (BGR)
    - resize to 128x128
    - BGR -> RGB
    - channel-first (C,H,W)
    - float32 and scaled to [0,1] by dividing by 255
    """

    img = cv2.imread(path)
    if img is None:
        raise FileNotFoundError(f"Could not read image: {path}")

    img = cv2.resize(img, (cfg.image_size, cfg.image_size))
    b, g, r = cv2.split(img)
    img = cv2.merge([r, g, b])

    img = img.astype(np.float32)
    img = img / 255.0

    # HWC -> CHW
    img = np.transpose(img, (2, 0, 1))

    tensor = torch.from_numpy(img).unsqueeze(0)  # (1,3,H,W)
    return tensor
