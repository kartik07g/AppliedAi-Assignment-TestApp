import random
from sqlalchemy.orm import Session
from Models.Models import Question
from Resources.Test.TestServiceInterface import TestServiceInterface

class TestService(TestServiceInterface):

    def fetch_random_questions(self, db: Session):
        questions = db.query(Question).order_by(Question.id).all()
        random.shuffle(questions)
        return questions[:10]  # Return only 10 random questions

    def evaluate_answers(self, data: dict, db: Session):
        correct_count = 0
        total = len(data.get('answers', {}))

        for q_id, answer in data.get('answers', {}).items():
            question = db.query(Question).filter(Question.id == q_id).first()
            if question and question.correct_option == answer:
                correct_count += 1

        return {
            "total_questions": total,
            "correct_answers": correct_count,
            "score": f"{(correct_count / 10) * 100:.2f}%" if total > 0 else "0%"
        }
