import torch

try:
    path = 'backend/models/brain_tumor_model.pth'
    checkpoint = torch.load(path, map_location=torch.device('cpu'))
    
    print(f"Type: {type(checkpoint)}")
    if isinstance(checkpoint, dict):
        print("Keys:", checkpoint.keys())
        if 'state_dict' in checkpoint:
            print("State Dict Keys Sample:", list(checkpoint['state_dict'].keys())[:5])
        else:
            print("State Dict Keys Sample:", list(checkpoint.keys())[:5])
    else:
        print("Model Object:", checkpoint)
        print("Architecture:", checkpoint.__class__.__name__)
except Exception as e:
    print(f"Error: {e}")
