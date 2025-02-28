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
        attempted_questions = []

        for q_id, chosen_answer in data.get('answers', {}).items():
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

        return {
            "total_questions": total,
            "correct_answers": correct_count,
            "score": f"{(correct_count / 10) * 100:.2f}%" if total > 0 else "0%",
            "attempted_questions": attempted_questions  # Send detailed attempted questions
        }
