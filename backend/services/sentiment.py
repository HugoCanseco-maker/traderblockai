import nltk
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from nltk.sentiment.vader import SentimentIntensityAnalyzer

nltk.download("vader_lexicon", quiet=True)
vader = SentimentIntensityAnalyzer()

MODEL_NAME = "ProsusAI/finbert"
finbert_tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
finbert_model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
finbert_model.eval()

def fetch_sentiment(text: str) -> float:
    vader_score = vader.polarity_scores(text)["compound"]

    inputs = finbert_tokenizer(text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        outputs = finbert_model(**inputs)
    logits = outputs.logits.detach().numpy()[0]
    probs = np.exp(logits) / np.sum(np.exp(logits))
    finbert_score = probs[2] - probs[0]

    return round((vader_score + finbert_score) / 2, 4)
