# backend/services/sentiment.py

import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Download the VADER lexicon silently (only once)
nltk.download("vader_lexicon", quiet=True)

# Initialize the VADER sentiment analyzer
vader = SentimentIntensityAnalyzer()

def fetch_sentiment(text: str) -> float:
    """Returns a sentiment score between -1 (negative) and 1 (positive)."""
    score = vader.polarity_scores(text)["compound"]
    return round(score, 4)
