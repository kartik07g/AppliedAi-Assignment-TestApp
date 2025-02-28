from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from Models.Models import Question, SessionLocal
from sqlalchemy.orm import Session
import random

from Resources.Test import TestFront

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def healthcheck():
    return {"Status is running"}

@app.get("/backend/test/questions/")
def get_random_questionss(db: Session = Depends(get_db)):
    # Fetch 10 random MCQs
    return TestFront().get_questions(db)

@app.post("/backend/test/submit/")
def submit_answers(data: dict, db: Session = Depends(get_db)):
    return TestFront().submit_answers(data, db)


