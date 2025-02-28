import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/css/Summary.css";

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result || {};

  useEffect(() => {
    window.history.replaceState(null, "", "/summary");
  }, []);

  return (
    <div className="summary-container">
      <h1 className="summary-title">Test Summary</h1>
      <p className="summary-text">Correct Answers: {result.correct_answers} / 10</p>
      <p className="summary-text">Score: {result.score}</p>

      {/* Display Attempted Questions */}
      <h2 className="summary-subtitle">Attempted Questions</h2>
      <div className="attempted-questions">
        {result.attempted_questions?.map((q, index) => (
          <div key={q.question_id} className="question-card">
            <p><strong>Q{index + 1}:</strong> {q.question_text}</p>
            
            {/* Display chosen answer */}
            <p className={q.is_correct ? "correct-answer" : "incorrect-answer"}>
              <strong>Your Answer:</strong> {q.chosen_answer.toUpperCase()}: {q.chosen_answer_text}
            </p>

            {/* Display correct answer */}
            <p><strong>Correct Answer:</strong> {q.correct_answer.toUpperCase()}: {q.correct_answer_text}</p>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/")} className="restart-button">
        Restart Test
      </button>
    </div>
  );
};

export default Summary;
