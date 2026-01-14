from __future__ import annotations

import argparse
import json
from pathlib import Path

import torch

from brain_tumor.model import create_model


def _maybe_validate_onnx(onnx_path: Path) -> None:
    try:
        import onnx  # type: ignore

        onnx_model = onnx.load(str(onnx_path))
        onnx.checker.check_model(onnx_model)
    except Exception:
        # Optional dependency; validation is best-effort.
        return


def main() -> int:
    parser = argparse.ArgumentParser(description="Export brain tumor CNN for deployment")
    parser.add_argument("--weights", required=True, help="Path to .pth state_dict")
    parser.add_argument("--outdir", default="artifacts", help="Output directory")
    parser.add_argument("--opset", type=int, default=17, help="ONNX opset")
    args = parser.parse_args()

    outdir = Path(args.outdir)
    outdir.mkdir(parents=True, exist_ok=True)

    device = torch.device("cpu")
    model = create_model(device=device)
    state = torch.load(args.weights, map_location=device)
    model.load_state_dict(state)
    model.eval()

    # Example input (batch, channels, height, width)
    example = torch.zeros(1, 3, 128, 128, dtype=torch.float32)

    # 1) TorchScript (easy deployment server-side)
    ts_path = outdir / "brain_tumor_cnn.torchscript.pt"
    scripted = torch.jit.trace(model, example)
    scripted.save(str(ts_path))

    # 2) ONNX (good for browser via onnxruntime-web)
    onnx_path = outdir / "brain_tumor_cnn.onnx"
    torch.onnx.export(
        model,
        example,
        str(onnx_path),
        input_names=["input"],
        output_names=["prob"],
        dynamic_axes={"input": {0: "batch"}, "prob": {0: "batch"}},
        opset_version=args.opset,
    )
    _maybe_validate_onnx(onnx_path)

    # 3) Metadata for frontend/backend preprocessing
    metadata = {
        "input": {"layout": "NCHW", "dtype": "float32", "shape": ["batch", 3, 128, 128]},
        "preprocess": {
            "resize": [128, 128],
            "color": "RGB",
            "scale": "divide_by_255",
        },
        "output": {"name": "prob", "activation": "sigmoid"},
        "labels": {"0": "healthy", "1": "tumor"},
        "threshold": 0.5,
    }
    (outdir / "metadata.json").write_text(json.dumps(metadata, indent=2))

    print(f"Wrote {ts_path}")
    print(f"Wrote {onnx_path}")
    print(f"Wrote {outdir / 'metadata.json'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
