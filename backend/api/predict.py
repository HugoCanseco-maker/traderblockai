#predict.py
from fastapi import APIRouter, Query
from backend.services.sentiment import fetch_sentiment
from backend.services.quote_client import fetch_stock_quote
from backend.features.extract_features import extract_features
from backend.model.train_xgboost_model import predict

router = APIRouter()

@router.get("/predict")
def get_prediction(
    symbol: str = Query(...),
    risk: str = Query("Moderate")
):
    # Step 1: Fetch stock quote
    quote = fetch_stock_quote(symbol)
    if not quote or "c" not in quote or quote["c"] is None:
        return {
            "error": "Quote data unavailable. Could not fetch live stock price.",
            "symbol": symbol,
            "quote": quote
        }

    # Step 2: Sentiment analysis
    news_summary = f"{symbol} price near ${quote['c']} with increased retail volume"
    sentiment = fetch_sentiment(news_summary)

    # Step 3: Feature extraction
    features = extract_features(quote, sentiment)
    if not features or any(v is None for v in features.values()):
        return {
            "error": "Feature extraction failed.",
            "features": features
        }

    # Step 4: Prediction
    try:
        prediction = predict(features, risk)
    except Exception as e:
        return {
            "error": f"Model prediction failed: {str(e)}"
        }

    return {
        "symbol": symbol,
        "risk": risk,
        "quote": quote,
        "recommendation": prediction.get("recommendation", "N/A"),
        "confidence": prediction.get("confidence", 0),
        "movement": prediction.get("movement", 0),
        "explanation": prediction.get("explanation", "Prediction generated successfully.")
    }
