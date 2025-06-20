# backend/model/train_xgboost_model.py

import pandas as pd
import numpy as np
import xgboost as xgb
import joblib
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "xgboost_model.joblib")

def generate_training_data(n=500):
    np.random.seed(42)
    open_ = np.random.normal(150, 5, size=n)
    high = open_ + np.random.normal(2, 1, size=n)
    low = open_ - np.random.normal(2, 1, size=n)
    close = open_ + np.random.normal(0, 2, size=n)
    prev_close = close - np.random.normal(0.5, 1, size=n)
    buzz = np.random.uniform(-1, 1, size=n)

    X = pd.DataFrame({
        "open": open_,
        "high": high,
        "low": low,
        "close": close,
        "prevClose": prev_close,
        "price": close,
        "buzz": buzz
    })

    y = (close > prev_close).astype(int)
    return X, y

def train_model():
    X, y = generate_training_data()
    model = xgb.XGBClassifier(
        n_estimators=100,
        max_depth=3,
        eval_metric="logloss"
    )
    model.fit(X, y)
    joblib.dump(model, MODEL_PATH)
    print(f"✅ Model trained and saved at {MODEL_PATH}")

# ✅ Global model load once (avoid reloading on every call)
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
else:
    raise FileNotFoundError(f"❌ Model file not found at {MODEL_PATH}. Did you run train_model()?")

def predict(features: pd.DataFrame, risk: str):
    try:
        pred = model.predict(features)[0]
        proba = model.predict_proba(features)[0]
        confidence = float(max(proba))

        recommendation = "BUY" if pred == 1 else "SELL"
        movement = float(round((proba[1] - proba[0]) * 100, 2))

        return {
            "recommendation": recommendation,
            "confidence": round(confidence, 4),
            "movement": movement,
            "explanation": f"Prediction generated successfully for {risk} mode."
        }
    except Exception as e:
        return {
            "recommendation": "N/A",
            "confidence": 0,
            "movement": 0,
            "explanation": f"⚠️ Model error: {str(e)}"
        }

if __name__ == "__main__":
    train_model()
