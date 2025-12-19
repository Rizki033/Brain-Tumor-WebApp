import io
p='utils/preprocess.py'
s=open(p,'rb').read()
print('bytes len',len(s))
print('first 200 bytes repr:\n',repr(s[:200]))
print('\n--- lines repr ---')
for i,l in enumerate(s.splitlines()):
    print(i+1,repr(l))
