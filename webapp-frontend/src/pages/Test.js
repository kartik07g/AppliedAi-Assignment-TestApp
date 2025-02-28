import React, { useState, useEffect } from "react";
import { fetchQuestions, submitAnswers } from "../apiClient";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";
import "../styles/css/Test.css"; // Import the CSS file

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuestions = localStorage.getItem("mcqQuestions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      fetchQuestions().then((fetchedQuestions) => {
        localStorage.setItem("mcqQuestions", JSON.stringify(fetchedQuestions));
        setQuestions(fetchedQuestions);
      });
    }

    const storedAnswers = localStorage.getItem("mcqAnswers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  const handleAnswer = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
    localStorage.setItem("mcqAnswers", JSON.stringify(updatedAnswers));
  };

  const handleSubmit = async () => {
    const result = await submitAnswers(answers);
    console.log("Navigating with result:", result);

    localStorage.removeItem("mcqQuestions");
    localStorage.removeItem("mcqAnswers");

    navigate("/summary", { state: { result }, replace: true });
  };

  return (
    <div className="test-container">
      <h1 className="test-title">MCQ Test</h1>
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={index}
            handleAnswer={(answer) => handleAnswer(q.id, answer)}
          />
        ))
      ) : (
        <p className="loading-text">Loading questions...</p>
      )}
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default Test;
