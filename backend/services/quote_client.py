# backend/services/quote_client.py

import yfinance as yf

def fetch_stock_quote(symbol: str):
    stock = yf.Ticker(symbol)
    data = stock.history(period="2d")

    if len(data) < 2:
        raise ValueError("Not enough data for quote")

    # Today and yesterday
    today = data.iloc[-1]
    yesterday = data.iloc[-2]

    return {
        "c": round(today["Close"], 2),     # current price
        "pc": round(yesterday["Close"], 2), # previous close
        "h": round(today["High"], 2),
        "l": round(today["Low"], 2)
    }
