from app.model import predict_tumor
import io
from PIL import Image

def get_diagnosis(image_bytes: bytes):
    """
    Process the uploaded image and return classification results.
    """
    try:
        image_stream = io.BytesIO(image_bytes)
        
        # Get classification results
        prediction, probability = predict_tumor(image_stream)
        
        # Mapping prediction to diagnosis
        # The model returns:
        # - prediction: 0 or 1 based on sigmoid(probability) > 0.5
        # - probability: p(class=1)
        # In most common datasets (folders yes/no), label 1 corresponds to "yes" (tumor).
        has_tumor = prediction == 1
        
        if has_tumor:
            diagnosis = "Tumor Detected"
            confidence = round(probability * 100, 2)
            severity = "Requires Clinical Review"
            tumor_size = "N/A (Classifier)"
            type_ = "Brain Tumor"
        else:
            diagnosis = "No Tumor Detected"
            confidence = round((1 - probability) * 100, 2)
            severity = "Normal"
            tumor_size = "0"
            type_ = "-"
            
        return {
            "diagnosis": diagnosis,
            "confidence": confidence,
            "type": type_,
            "severity": severity,
            "tumorSize": tumor_size,
            # Optional debug fields (safe for UI; remove if you don't want them exposed)
            "rawPrediction": int(prediction),
            "probability": float(probability),
        }

    except Exception as e:
        print(f"Error in diagnosis service: {e}")
        raise e
