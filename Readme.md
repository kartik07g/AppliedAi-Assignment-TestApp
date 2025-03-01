# MCQ Test Web App

This project is a web application built using **ReactJS** (frontend) and **FastAPI** (backend), allowing users to take an MCQ test with randomly selected questions from a database. The user answers the questions and receives a summary of their performance.

## Features
- Users can start a test with **10 randomly selected MCQs** from a database.
- Each question has multiple options to choose from.
- After submitting, the user gets a **summary** showing correct and incorrect answers.
- The backend is built with **FastAPI**, while the frontend uses **ReactJS**.
- The app is fully **Dockerized** for easy deployment.

## Tech Stack
- **Frontend:** ReactJS
- **Backend:** FastAPI, SQLAlchemy, MySQL
- **Database:** MySQL
- **Containerization:** Docker, Docker Compose

## Installation and Setup

### Prerequisites
- Docker & Docker Compose installed
- Node.js and npm installed (for local frontend testing)
- Python 3.8+ installed (for local backend testing)

### Steps to Run the Project

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/mcq-test.git
   cd mcq-test
   ```


2. **Run the Application with Docker**
   ```sh
   docker-compose up -d --build
   ```
   This will start:
   - MySQL database
   - FastAPI backend
   - React frontend

4. **Seeding the Database** (Runs Automatically in Docker)
   If you need to manually seed the database, run:
   ```sh
   docker exec -it backend python seed_db.py
   ```

5. **Access the App**
   - **Frontend:** `http://localhost:3000`
   - **Backend API** `http://localhost:5000/`
   - **Database (phpMyAdmin):** `http://localhost:8080`

## API Endpoints
- `GET /backend/test/questions/` → Fetch 10 random questions
- `POST /backend/test/submit/` → Submit answers & receive summary

## Troubleshooting
- If MySQL is not ready, restart the services:
  ```sh
  docker-compose restart db backend
  ```
- If frontend does not load, restart it:
  ```sh
  docker-compose restart react-app
  ```

## Future Improvements
- Add user authentication
- Save test history in DB
- Implement timed tests


