import json
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from Models.Models import Question, SessionLocal

def insert_mcqs():
    db = SessionLocal()

    with open("questions.json", "r") as f:
        mcqs = json.load(f)

    db_questions = [Question(**q) for q in mcqs]

    db.add_all(db_questions)
    db.commit()
    db.close()
    
    print(f"{len(db_questions)} MCQs added to MySQL database.")

if __name__ == "__main__":
    insert_mcqs()
