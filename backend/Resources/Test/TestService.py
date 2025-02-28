from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from fastapi import HTTPException
import random

from Resources.Test.TestServiceInterface import TestServiceInterface
from Models.Models import Question

class TestService(TestServiceInterface):

    def fetch_random_questions(self, db: Session):
        try:
            questions = db.query(Question).order_by(Question.id).all()
            if not questions:
                raise HTTPException(status_code=404, detail="No questions found in the database.")

            random.shuffle(questions)
            return questions[:10] 

        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

    def evaluate_answers(self, data: dict, db: Session):
        try:
            if not isinstance(data, dict) or "answers" not in data or not isinstance(data["answers"], dict):
                raise HTTPException(status_code=400, detail="Invalid input data format.")

            correct_count = 0
            total = len(data["answers"])
            attempted_questions = []

            for q_id, chosen_answer in data["answers"].items():
                if not isinstance(q_id, (int, str)) or not isinstance(chosen_answer, str):
                    raise HTTPException(status_code=400, detail="Invalid question ID or answer format.")

                question = db.query(Question).filter(Question.id == q_id).first()

                if question:
                    is_correct = question.correct_option == chosen_answer
                    if is_correct:
                        correct_count += 1

                    attempted_questions.append({
                        "question_id": question.id,
                        "question_text": question.question,
                        "chosen_answer": chosen_answer,
                        "correct_answer": question.correct_option,
                        "is_correct": is_correct
                    })
                else:
                    attempted_questions.append({
                        "question_id": q_id,
                        "chosen_answer": chosen_answer,
                        "correct_answer": None,
                        "is_correct": False,
                        "error": "Question not found in the database"
                    })

            return {
                "total_questions": total,
                "correct_answers": correct_count,
                "score": f"{(correct_count / 10) * 100:.2f}%" if total > 0 else "0%",
                "attempted_questions": attempted_questions
            }

        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
