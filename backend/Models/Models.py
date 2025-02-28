import time
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL")

# Retry database connection if MySQL isn't ready
MAX_RETRIES = 10
for i in range(MAX_RETRIES):
    try:
        engine = create_engine(DATABASE_URL)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        print("✅ Connected to MySQL successfully!")
        break
    except Exception as e:
        print(f"❌ MySQL not ready, retrying in 5s... ({i+1}/{MAX_RETRIES})")
        time.sleep(5)
else:
    print("⛔ Failed to connect to MySQL. Exiting...")
    exit(1)

Base = declarative_base()

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String(500), index=True)  
    option_a = Column(String(100))  
    option_b = Column(String(100))
    option_c = Column(String(100))
    option_d = Column(String(100))
    correct_option = Column(String(1))  # Stores 'a', 'b', 'c', or 'd'

Base.metadata.create_all(bind=engine)
