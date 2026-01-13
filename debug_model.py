import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'backend'))
import torch
from app.model import load_model, preprocess_image
from PIL import Image
import os

def debug_inference():
    # Load model
    model = load_model()
    print("Model loaded.")
    
    # Find a sample image
    # Try to find an image in the frontend assets or current dir
    image_path = "frontend/src/Assets/mri_scan_overlay.png"
    if not os.path.exists(image_path):
        # Create a dummy image if not found (28x28 noise)
        print("Sample image not found, creating dummy noise image...")
        img = Image.fromarray(torch.randint(0, 255, (100, 100, 3), dtype=torch.uint8).numpy())
    else:
        print(f"Testing with {image_path}")
        img = Image.open(image_path).convert('RGB')

    # Test with different preprocessings
    
    # 1. Current preprocessing (Normalize 0.5)
    print("\n--- Test 1: Current Preprocessing (Normalize 0.5) ---")
    tensor1 = preprocess_image(img)
    with torch.no_grad():
        out1 = model(tensor1)
        prob1 = torch.sigmoid(out1).item()
    print(f"Raw Output: {out1.item()}")
    print(f"Probability: {prob1:.4f}")
    
    # 2. No Normalization (Just Resize + ToTensor)
    print("\n--- Test 2: No Normalization (Just [0, 1]) ---")
    import torchvision.transforms as transforms
    t2 = transforms.Compose([
        transforms.Resize((28, 28)),
        transforms.ToTensor()
    ])
    tensor2 = t2(img).unsqueeze(0)
    with torch.no_grad():
        out2 = model(tensor2)
        prob2 = torch.sigmoid(out2).item()
    print(f"Raw Output: {out2.item()}")
    print(f"Probability: {prob2:.4f}")

if __name__ == "__main__":
    debug_inference()
