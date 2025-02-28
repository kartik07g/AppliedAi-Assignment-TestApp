from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from Models.Models import Question, SessionLocal
from sqlalchemy.orm import Session
import random

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

@app.get("/questions/")
def get_random_questions(db: Session = Depends(get_db)):
    # Fetch 10 random MCQs
    questions = db.query(Question).order_by(Question.id).all()
    random.shuffle(questions)
    result = jsonable_encoder(questions[:10])

    for question in result:
        question.pop("correct_option", None)

    return result

@app.post("/submit/")
def submit_answers(data: dict, db: Session = Depends(get_db)):
    correct_count = 0
    total = len(data.get('answers'))

    for q_id, answer in data.get('answers').items():
        question = db.query(Question).filter(Question.id == q_id).first()
        if question and question.correct_option == answer:
            correct_count += 1

    return {
        "total_questions": total,
        "correct_answers": correct_count,
        "score": f"{(correct_count / total) * 100:.2f}%"
    }
