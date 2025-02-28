import React, { useState, useEffect } from "react";
import { fetchQuestions, submitAnswers } from "../apiClient";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    const result = await submitAnswers(answers);
    console.log("Navigating with result:", result);
    navigate("/summary", { state: { result } });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">MCQ Test</h1>
      {questions.map((q, index) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={index}
          handleAnswer={(answer) => handleAnswer(q.id, answer)} // Pass question ID instead of index
        />
      ))}
      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white">
        Submit
      </button>
    </div>
  );
};

export default Test;
