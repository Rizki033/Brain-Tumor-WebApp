from groq import Groq
import os
import sys

try:
    print("Testing Groq import...")
    client = Groq(api_key="gsk_fake_key")
    print("Groq imported and client initialized successfully (with fake key).")
    sys.exit(0)
except ImportError as e:
    print(f"ImportError: {e}")
    sys.exit(1)
except Exception as e:
    # If API key is invalid, it might error on connection, but import should be fine.
    # We just want to check if the class is importable.
    print(f"Other error (possibly expected): {e}")
    sys.exit(0)
