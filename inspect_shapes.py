import torch
path = 'backend/app/models/brain_tumor_model.pth'
checkpoint = torch.load(path, map_location=torch.device('cpu'))
for k, v in checkpoint.items():
    print(f"{k}: {v.shape}")
