import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/css/Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="title">Welcome to the MCQ Test</h1>
      <button onClick={() => navigate("/test")} className="start-button">
        Start Test
      </button>
    </div>
  );
};

export default Home;
