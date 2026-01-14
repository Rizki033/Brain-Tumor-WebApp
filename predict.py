from __future__ import annotations

import argparse

import torch

from brain_tumor.model import create_model
from brain_tumor.preprocess import load_and_preprocess_image


def main() -> int:
    parser = argparse.ArgumentParser(description="Brain tumor classifier inference")
    parser.add_argument("--weights", required=True, help="Path to .pth state_dict")
    parser.add_argument("--image", required=True, help="Path to input image")
    parser.add_argument("--threshold", type=float, default=0.5)
    args = parser.parse_args()

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = create_model(device=device)

    state = torch.load(args.weights, map_location=device)
    model.load_state_dict(state)
    model.eval()

    x = load_and_preprocess_image(args.image).to(device)
    with torch.no_grad():
        prob = model(x).squeeze().item()

    label = "tumor" if prob >= args.threshold else "healthy"
    print(f"prob={prob:.6f} label={label}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
