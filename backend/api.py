from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from Models.Models import SessionLocal
from Resources.Test import TestFront 

# Initialize FastAPI app
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


# Health check endpoint
@app.get("/")
def healthcheck():
    return {"status": "running"}

# Test-related endpoints
@app.get("/backend/test/questions/")
def get_random_questions(db: Session = Depends(get_db)):
    return TestFront().get_questions(db)

@app.post("/backend/test/submit/")
def submit_answers(data: dict, db: Session = Depends(get_db)):
    return TestFront().submit_answers(data, db)
