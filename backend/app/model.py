import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from PIL import Image
import torchvision.transforms as transforms
import signal
import sys
import io

def signal_handler(sig, frame):
    print('Application shutting down gracefully...')
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)

class BrainTumorCNN(nn.Module):
    """Model architecture aligned with backend/app/models/main.ipynb training notebook."""

    def __init__(self):
        super(BrainTumorCNN, self).__init__()
        self.cnn_model = nn.Sequential(
            nn.Conv2d(in_channels=3, out_channels=6, kernel_size=5),
            nn.Tanh(),
            nn.AvgPool2d(kernel_size=2, stride=5),
            nn.Conv2d(in_channels=6, out_channels=16, kernel_size=5),
            nn.Tanh(),
            nn.AvgPool2d(kernel_size=2, stride=5),
        )
        self.fc_model = nn.Sequential(
            nn.Linear(in_features=256, out_features=120),
            nn.Tanh(),
            nn.Linear(in_features=120, out_features=84),
            nn.Tanh(),
            nn.Linear(in_features=84, out_features=1),
        )

    def forward(self, x):
        x = self.cnn_model(x)
        x = x.view(x.size(0), -1)
        x = self.fc_model(x)
        return x

def load_model():
    try:
        model = BrainTumorCNN()
        # Use absolute path resolving to avoid CWD issues
        import os
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, "models/brain_tumor_model.pth")
        
        state_dict = torch.load(model_path, map_location=torch.device('cpu'))
        model.load_state_dict(state_dict)
        model.eval()
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        raise

def preprocess_image(image_source):
    # Training notebook uses RGB images resized to 128x128 and normalized by /255.
    if isinstance(image_source, Image.Image):
        image = image_source.convert('RGB')
    elif isinstance(image_source, (bytes, bytearray)):
        image = Image.open(io.BytesIO(image_source)).convert('RGB')
    else:
        # Accept file path or file-like objects (e.g. BytesIO)
        image = Image.open(image_source).convert('RGB')

    transform = transforms.Compose([
        transforms.Resize((128, 128)),
        transforms.ToTensor(),  # outputs float32 in [0,1], channel-first
    ])

    image_tensor = transform(image).unsqueeze(0)  # [1, 3, 128, 128]
    return image_tensor

def predict_tumor(image_source, model=None):
    try:
        if model is None:
            model = load_model()
        
        image_tensor = preprocess_image(image_source)
        
        with torch.no_grad():
            output = model(image_tensor)
            # Binary classification (sigmoid)
            probability = torch.sigmoid(output).item()
            prediction = 1 if probability > 0.5 else 0
            
        return prediction, probability
    
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        raise

# Keep existing name for backward compatibility or refactor services
def segment_brain_tumor(image_source, model=None):
    # Since this is now a classifier, we don't return a mask
    # We return the original image or a dummy for now
    # The service will be updated to use predict_tumor instead
    pred, prob = predict_tumor(image_source, model)
    return pred, prob
