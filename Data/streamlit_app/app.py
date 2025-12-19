import streamlit as st
import cv2
import numpy as np
from utils.model_loader import load_model
from utils.preprocess import preprocess

@st.cache_resource
def get_model():
    return load_model()

model = get_model()

st.title("Brain Tumor Detection System")

uploaded = st.file_uploader("Upload MRI Image", ["jpg", "png"])

if uploaded:
    img = cv2.imdecode(
        np.frombuffer(uploaded.read(), np.uint8), 1
    )
    st.image(img, caption="Uploaded MRI")

    if st.button("Analyze"):
        x = preprocess(img)
        prob = model(x).item()

        if prob >= 0.5:
            st.error(f"Tumor detected (confidence: {prob:.2f})")
        else:
            st.success(f"No tumor detected (confidence: {1-prob:.2f})")
