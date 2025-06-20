#predict.py
from fastapi import APIRouter, Query

from backend.services.sentiment import fetch_sentiment
from backend.services.quote_client import fetch_stock_quote  # new
from backend.features.extract_features import extract_features
from backend.model.train_xgboost_model import predict

router = APIRouter()

@router.get("/predict")
def get_prediction(
    symbol: str = Query(...),
    risk: str = Query("Moderate")
):
    # LIVE quote using Yahoo Finance
    quote = fetch_stock_quote(symbol)

    # Sample market summary text
    news_summary = f"{symbol} price near ${quote['c']} with increased retail volume"
    sentiment = fetch_sentiment(news_summary)

    features = extract_features(quote, sentiment)
    prediction = predict(features, risk)

    return {
    "symbol": symbol,
    "risk": risk,
    "quote": quote,
    "recommendation": prediction["recommendation"],
    "confidence": prediction["confidence"],
    "explanation": prediction["explanation"]
}

