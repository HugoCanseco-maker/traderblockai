from fastapi import APIRouter, Query
import pandas as pd  # ✅ REQUIRED for DataFrame conversion

from backend.services.sentiment import fetch_sentiment
from backend.services.quote_client import fetch_stock_quote
from backend.features.extract_features import extract_features
from backend.model.train_xgboost_model import predict

router = APIRouter()

@router.get("/predict")
def get_prediction(symbol: str = Query(...), risk: str = Query("Moderate")):
    quote = fetch_stock_quote(symbol)
    news_summary = f"{symbol} price near ${quote['c']} with increased retail volume"
    sentiment = fetch_sentiment(news_summary)
    
    features_dict = extract_features(quote, sentiment)  # still returns a dict
    features = pd.DataFrame([features_dict])  # ✅ wrap in DataFrame

    try:
        prediction = predict(features, risk)
    except Exception as e:
        return {
            "recommendation": "N/A",
            "confidence": 0,
            "movement": 0,
            "explanation": f"⚠️ Model error: {str(e)}"
        }

    return {
        "symbol": symbol,
        "risk": risk,
        "quote": quote,
        "recommendation": prediction.get("recommendation", "N/A"),
        "confidence": round(prediction.get("confidence", 0), 4),
        "movement": round(prediction.get("movement", 0), 4),
        "explanation": prediction.get("explanation", "✅ Prediction generated successfully.")
    }
