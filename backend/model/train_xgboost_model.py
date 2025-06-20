# backend/model/train_xgboost_model.py

import pandas as pd
import numpy as np
import xgboost as xgb
import joblib
import os

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

    y = (close > prev_close).astype(int)  # BUY if price increased
    return X, y

def train_model():
    X, y = generate_training_data()
    model = xgb.XGBClassifier(
        n_estimators=100,
        max_depth=3,
        eval_metric="logloss"
    )
    model.fit(X, y)

    path = os.path.join(os.path.dirname(__file__), "xgboost_model.joblib")
    joblib.dump(model, path)
    print(f"✅ Model trained and saved at {path}")

def predict(features, risk):
    model_path = os.path.join(os.path.dirname(__file__), "xgboost_model.joblib")
    model = joblib.load(model_path)

    # Convert features into DataFrame
    X = pd.DataFrame([features])

    # Predict class and probability
    pred_class = int(model.predict(X)[0])
    pred_proba = float(model.predict_proba(X)[0][1])  # 👈 convert to native float

    return {
        "prediction": "BUY" if pred_class == 1 else "SELL",
        "confidence": round(pred_proba, 4)  # float rounded
    }

if __name__ == "__main__":
    train_model()
