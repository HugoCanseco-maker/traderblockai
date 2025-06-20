from dotenv import load_dotenv
import os

load_dotenv()  # load from .env file
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")

