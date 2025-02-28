import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/css/Summary.css"; // Import the CSS file

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result || {};

  useEffect(() => {
    window.history.replaceState(null, "", "/summary"); // Replaces history entry
  }, []);

  return (
    <div className="summary-container">
      <h1 className="summary-title">Test Summary</h1>
      <p className="summary-text">Correct Answers: {result.correct_answers} / 10</p>
      <p className="summary-text">Score: {result.score}</p>
      <button onClick={() => navigate("/")} className="restart-button">
        Restart Test
      </button>
    </div>
  );
};

export default Summary;
