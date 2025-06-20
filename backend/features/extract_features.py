def extract_features(quote_data, sentiment_score):
    return {
        "open": quote_data.get("o", 0),
        "high": quote_data.get("h", 0),
        "low": quote_data.get("l", 0),
        "close": quote_data.get("c", 0),
        "prevClose": quote_data.get("pc", 0),
        "price": quote_data.get("c", 0),  # 👈 Add this line
        "buzz": sentiment_score          # 👈 And make sure it's called 'buzz' too
    }
