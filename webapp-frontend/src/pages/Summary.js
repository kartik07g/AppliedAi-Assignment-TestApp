import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Summary = () => {
  const location = useLocation();
  console.log("Received result in Summary:", location.state?.result);
  const navigate = useNavigate();
  const result = location.state?.result || {};

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Test Summary</h1>
      <p>Correct Answers: {result.correct_answers} / 10</p>
      <p>Score: {result.score}</p>
      <button onClick={() => navigate("/")} className="mt-4 p-2 bg-green-500 text-white">
        Restart Test
      </button>
    </div>
  );
};

export default Summary;
