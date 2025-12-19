import torch
import torch.nn as nn
import torch.nn.functional as F
from pathlib import Path

__all__ = ["CNN", "load_model"]

class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.cnn_model = nn.Sequential(
            nn.Conv2d(3, 6, 5),
            nn.Tanh(),
            nn.AvgPool2d(2, 5),
            nn.Conv2d(6, 16, 5),
            nn.Tanh(),
            nn.AvgPool2d(2, 5)
        )

        self.fc_model = nn.Sequential(
            nn.Linear(256, 120),
            nn.Tanh(),
            nn.Linear(120, 84),
            nn.Tanh(),
            nn.Linear(84, 1)
        )

    def forward(self, x):
        x = self.cnn_model(x)
        x = x.view(x.size(0), -1)
        x = self.fc_model(x)
        return torch.sigmoid(x)


def _find_model_file(name='brain_tumor_model.pth', max_up=5):
    """Search up to `max_up` parent directories for `name` and return its path.
    Raises FileNotFoundError if the file cannot be found."""
    p = Path(__file__).resolve()
    for i in range(max_up + 1):
        if i < len(p.parents):
            candidate = p.parents[i] / name
        else:
            candidate = None
        if candidate and candidate.exists():
            return str(candidate)
    raise FileNotFoundError(f"'{name}' not found (searched up to {max_up} parents from {p})")


def load_model(model_path: str | None = None):
    """Load and return a CNN model. If `model_path` is None then the function searches
    upward from this file for `brain_tumor_model.pth`."""
    if model_path is None:
        model_path = _find_model_file()

    model = CNN()
    state = torch.load(model_path, map_location='cpu')

    # Common checkpoint formats: direct state_dict or {'state_dict': ...} or {'model_state_dict': ...}
    if isinstance(state, dict):
        if 'model_state_dict' in state:
            state = state['model_state_dict']
        elif 'state_dict' in state:
            state = state['state_dict']

    model.load_state_dict(state)
    model.eval()
    return model
