import React, { useState, useEffect } from "react";
import { fetchQuestions, submitAnswers } from "../apiClient";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if questions are stored in localStorage
    const storedQuestions = localStorage.getItem("mcqQuestions");

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions)); // Use stored questions
    } else {
      fetchQuestions().then((fetchedQuestions) => {
        localStorage.setItem("mcqQuestions", JSON.stringify(fetchedQuestions)); // Save to localStorage
        setQuestions(fetchedQuestions);
      });
    }

    // Load previous answers if they exist
    const storedAnswers = localStorage.getItem("mcqAnswers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  const handleAnswer = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
    localStorage.setItem("mcqAnswers", JSON.stringify(updatedAnswers)); // Persist answers
  };

  const handleSubmit = async () => {
    const result = await submitAnswers(answers);
    console.log("Navigating with result:", result);
    
    // Clear localStorage after submission
    localStorage.removeItem("mcqQuestions");
    localStorage.removeItem("mcqAnswers");

    navigate("/summary", { state: { result }, replace: true });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">MCQ Test</h1>
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={index}
            handleAnswer={(answer) => handleAnswer(q.id, answer)} // Pass question ID
          />
        ))
      ) : (
        <p>Loading questions...</p>
      )}
      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white">
        Submit
      </button>
    </div>
  );
};

export default Test;
