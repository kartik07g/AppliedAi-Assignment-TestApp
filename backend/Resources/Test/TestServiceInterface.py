from abc import ABC, abstractmethod
from sqlalchemy.orm import Session

class TestServiceInterface(ABC):
    @abstractmethod
    def fetch_random_questions(self, db: Session):
        pass
    
    @abstractmethod
    def evaluate_answers(self, data: dict, db: Session):
        pass
