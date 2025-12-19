import importlib, traceback, sys
try:
    m = importlib.import_module('utils.model_loader')
    print('module file =', m.__file__)
    print('attributes =', [n for n in dir(m) if not n.startswith('__')])
    print('load_model =', getattr(m, 'load_model', None))
    import inspect
    try:
        print('\n--- source via inspect.getsource ---')
        print(inspect.getsource(m))
    except Exception as e:
        print('\ninspect.getsource failed:', e)
        print('reading file raw:')
        print(open(m.__file__, 'r', encoding='utf-8').read())
except Exception:
    traceback.print_exc()
    sys.exit(1)
