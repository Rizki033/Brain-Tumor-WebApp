import os
import sys
import traceback

print('cwd=', os.getcwd())
# Ensure local package resolution
sys.path.insert(0, os.getcwd())

for name in ('utils.model_loader', 'utils.preprocess'):
    print('\n--- IMPORTING', name, '---')
    try:
        if name in sys.modules:
            del sys.modules[name]
        m = __import__(name, fromlist=['*'])
        print('module file:', getattr(m, '__file__', None))
        attrs = [n for n in dir(m) if not n.startswith('__')]
        print('attrs:', attrs)
        print('repr(load_model):', getattr(m, 'load_model', None))
        print('repr(preprocess):', getattr(m, 'preprocess', None))
    except Exception:
        traceback.print_exc()

# Try compiling the files to check for syntax errors
for path in (
    os.path.join('utils', 'model_loader.py'),
    os.path.join('utils', 'preprocess.py'),
):
    print('\n--- COMPILING', path, '---')
    try:
        src = open(path, 'r', encoding='utf-8').read()
        compile(src, path, 'exec')
        print('OK')
    except Exception:
        traceback.print_exc()
