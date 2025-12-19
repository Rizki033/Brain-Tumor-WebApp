import importlib, traceback, sys

print('cwd=', __import__('os').getcwd())

try:
    m = importlib.import_module('utils.preprocess')
    print('preprocess OK, attrs=', [n for n in dir(m) if not n.startswith('__')])
    ml = importlib.import_module('utils.model_loader')
    print('model_loader OK, attrs=', [n for n in dir(ml) if not n.startswith('__')])
    print('load_model repr:', getattr(ml, 'load_model', None))
except Exception:
    traceback.print_exc()
    sys.exit(1)

# Quick runtime test of preprocess
import numpy as np
img = np.zeros((200,200,3), dtype=np.uint8)
from utils.preprocess import preprocess
x = preprocess(img)
print('preprocess output shape:', x.shape, x.dtype)

# Try to locate the model file (this may raise if pth not present)
try:
    print('model file found at:', ml._find_model_file())
except Exception as e:
    print('model file not found (this may be expected):', e)
