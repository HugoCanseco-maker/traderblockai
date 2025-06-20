from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.predict import router as predict_router

app = FastAPI()

# ✅ Allow frontend on Vercel to fetch predictions
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://traderblockai.com"],  # Later: ["https://traderblockai.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
