from fastapi import FastAPI
from backend.api.predict import router as predict_router
from dotenv import load_dotenv

load_dotenv()  # Load .env ✅

app = FastAPI()
app.include_router(predict_router)
