from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from Resources.Test.TestServiceInterface import TestServiceInterface
from Resources.Test.TestService import TestService

class TestFront:
    def __init__(self):
        self.test_service: TestServiceInterface = TestService()

    def get_questions(self, db: Session):
        questions = self.test_service.fetch_random_questions(db)
        result = jsonable_encoder(questions)

        for question in result:
            question.pop("correct_option", None)

        return result

    def submit_answers(self, data: dict, db: Session):
        return self.test_service.evaluate_answers(data, db)
